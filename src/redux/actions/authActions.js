import { registerUser as Register, loginUser as Login } from "../../services/ApiService";

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const registerRequest = () => ({
  type: REGISTER_REQUEST
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error
});

export const registerUser = (userData) => {
  return (dispatch) => {
    dispatch(registerRequest());
    Register(userData)
      .then(() => {
        dispatch(registerSuccess());
      })
      .catch((error) => {
        dispatch(registerFailure(error.message));
      });
  };
};

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT = 'LOGOUT';

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error
});

export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    Login(credentials)
      .then((response) => {
        const { user, token } = response.data;
        localStorage.setItem('token', token);
        dispatch(loginSuccess(user));
      })
      .catch(error => {
        dispatch(loginFailure(error.message))
      })
  };
};

export const logout = () => ({
  type: LOGOUT,
  isAuthenticated: false
});
