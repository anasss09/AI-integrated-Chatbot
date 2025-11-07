import User from '../model/user.model.js'
import ErrorHandler from '../utils/ErrorHandler.js';

export const postSignUp = async (req, res) => {

    try {
        const { email, fullName, password, studyClass, interests } = req.body;

        const requiredFields = ["email", "fullName", "password", "studyClass", "interests"]
        const incomingFields = Object.keys(req.body);
        const missingFields = requiredFields.filter(
            (field) => !incomingFields.includes(field)
        );

        if (missingFields.length > 0) {
            throw new ErrorHandler(401, `${missingFields.join(",")} is missing`);
        }

        if (password.length < 6) {
            throw new ErrorHandler(400, "Password must be at least 6 characters")
        }

        const existingUser = await User.findOne({
            $or: [{ email }],
        });

        if (existingUser) {
            throw new ErrorHandler(401, "User Already Exist");
        }

        try {

            const user = new User({
                email,
                fullName,
                password,
                studyClass,
                interests
            });

            await user.save();

            const newUser = await User.findOne({
                _id: user._id,
            }).select("-password");

            res.status(200).json({
                message: "Successful",
                user: newUser,
            });

        } catch (error) {
            throw new ErrorHandler(error.statusCode || 500, `While Creating user in DB ${error.message}`)
        }

    } catch (error) {
        console.log(`Error in  Sign up ${error.message}`)
        throw new ErrorHandler(error.statusCode || 500, `Error in  Sign up ${error.message}`)
    }
}

// Generating Access and Refresh Token
const generteAccessTokenAndgenerteRefreshToken = async (userId) => {
	try {
		let user = await User.findOne({
			_id: userId,
		});

		const accessToken = await user.generateAccessToken();
		const refreshToken = await user.generateRefreshToken();


		return {
			accessToken,
			refreshToken
		};
	} catch (error) {
		throw new ErrorHandler(
			500,
			`Error while generating access token and refresh token ${error.message}`
		);
	}
};


export const postLogin = async (req, res, next) => {
	const { email, password } = req.body;

	if (!email) {
		throw new ErrorHandler(401, `Enter username or password !!`);
	}
	if (!password) {
		throw new ErrorHandler(401, "Enter password ");
	}

	let user = await User.findOne({
		$or: [{ email }]
	});

	if (!user) {
		throw new ErrorHandler(401, "User not found");
	}

	const passwordMatch = await user.isPasswordCorrect(password);
	if (!passwordMatch) {
		throw new ErrorHandler(401, "Password Incorrect");
	}

	const { accessToken, refreshToken } = await generteAccessTokenAndgenerteRefreshToken(user._id);

	user.refreshToken = refreshToken
	await user.save()

	user = await User.findOne({
		$or: [
			{ email }
		]
	}).select("-password -refreshToken")

	res.status(200)
		.cookie(`AccessToken`, accessToken, {
			httpOnly: true,
			secure: true, 
			sameSite: "None",
			path: "/"
		})
		.cookie(`RefreshToken`, refreshToken, {
			httpOnly: true,
			secure: true, 
			sameSite: "None",
			path: "/"
		})
		.json({
			success: true,
			message: "Login Successfull",
			user
		});
};

export const postLogout = (req, res) => {
  try {
    res.cookie("AccessToken", "", { maxAge: 0 });
    res.cookie("RefreshToken", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getCheckAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};