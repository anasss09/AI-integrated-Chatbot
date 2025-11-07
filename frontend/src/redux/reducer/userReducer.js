const initialState = {
	fullName: "",
	email: "",
	studyClass: "",
	interests: "",
	profilePic: "",
	isLoggedIn: false,
};

function userReducer(state = { initialState }, action) {
    switch(action.type) {
        case 'SET_USER': 
            return {
                ...state,
                fullName: action.payload.name,
                email: action.payload.email,
                studyClass: action.payload.username,
                interests: action.payload.image,
                profilePic: action.payload.orderHistory,
                isLoggedIn: true
        }

        case 'GET_USER':
            return state
        
        default :
            return state
    }
};

export default userReducer;