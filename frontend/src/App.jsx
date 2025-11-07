import React, { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import LoginPage from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "react-hot-toast";
import ChatBot from "./components/ChatBot";

const App = () => {
	const {  authUser, checkAuth, isCheckingAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	return (
		<div>
			<Navbar />

			<Routes>
				<Route
					path="/"
					element={authUser ? <HomePage /> : <Navigate to="/login" />}
				/>
				<Route
					path="/signup"
					element={!authUser ? <SignupPage /> : <Navigate to="/" />}
				/>
				<Route
					path="/login"
					element={!authUser ? <LoginPage /> : <Navigate to="/" />}
				/>

				<Route path="/chat" element={<ChatBot />} />
			</Routes>

			<Toaster />
		</div>
	);
};

export default App;
