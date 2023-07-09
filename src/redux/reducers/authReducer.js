import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT
} from '../actions/authActions';

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
        isAuthenticated: true
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        loading: false,
        error: action.payload
      };  
    case LOGOUT:
      return {
        ...state,
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;
