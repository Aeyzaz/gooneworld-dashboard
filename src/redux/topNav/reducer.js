const INIT_STATE = {
    user: localStorage.getItem('user_id'),
    photouser: localStorage.getItem('photouser'),
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'USER_DATA':
            return { ...state, loading: true };
		case 'GET_PHOTO':
            return { ...state, photouser: action.payload.photouser};
    }
}
