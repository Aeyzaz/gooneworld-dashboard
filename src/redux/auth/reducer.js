import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_SUCCESS,
    LOGOUT_USER
} from 'Constants/actionTypes';

const INIT_STATE = {
    user: localStorage.getItem('user_id'),
    photouser: localStorage.getItem('photouser'),
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loading: true };
        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload };
        case REGISTER_USER:
            return { ...state, loading: true };
        case REGISTER_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload.uid };
        case LOGOUT_USER:
            return { ...state ,user:null};
        case 'GET_PHOTO':
            return { ...state, photouser: action.payload.photouser};
        default: return { ...state };
    }
}
