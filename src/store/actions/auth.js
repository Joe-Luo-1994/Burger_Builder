import * as actTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: actTypes.AUTH_START,
	};
};

export const authSuccess = (token, userId) => {
	return {
		type: actTypes.AUTH_SUCCESS,
		idToken: token,
		userId: userId,
	};
};

export const authFail = (error) => {
	return {
		type: actTypes.AUTH_FAIL,
		error: error,
	};
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('localId');
	return {
		type: actTypes.AUTH_LOGOUT,
	};
};

// clear token, userId after an hour
export const checkAuthTimeout = (expirationTime) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	};
};

export const auth = (email, password, isSignUp) => {
	return (dispatch) => {
		dispatch(authStart());
		const authData = {
			email: email,
			password: password,
			returnSecureToken: true,
		};
		let url =
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAqOhn9Vudk4vL1dIYn4hmnqpKO8OPhhq8';
		if (!isSignUp) {
			url =
				'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAqOhn9Vudk4vL1dIYn4hmnqpKO8OPhhq8';
		}
		axios
			.post(url, authData)
			.then((res) => {
				const expirationDate = new Date(
					new Date().getTime() + res.data.expiresIn * 1000
				);
				localStorage.setItem('token', res.data.idToken);
				localStorage.setItem('expirationDate', expirationDate);
				localStorage.setItem('userId', res.data.localId);
				dispatch(authSuccess(res.data.idToken, res.data.localId));
				dispatch(checkAuthTimeout(res.data.expiresIn));
			})
			.catch((err) => {
				dispatch(authFail(err.response.data.error));
			});
	};
};

export const setAuthRedirectPath = (path) => {
	return {
		type: actTypes.SET_AUTH_REDIRECT_PATH,
		path: path,
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		if (!token) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(
				localStorage.getItem('expirationDate')
			);
			if (expirationDate < new Date()) {
				dispatch(logout());
			} else {
				const userId = localStorage.getItem('userId');
				dispatch(authSuccess(token, userId));
				dispatch(
					checkAuthTimeout(
						(expirationDate.getTime() - new Date().getTime()) / 1000
					)
				);
			}
		}
	};
};
