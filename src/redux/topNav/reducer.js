const INIT_STATE = {
    user: localStorage.getItem('user_id'),
    loading: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case 'USER_DATA':
            return { ...state, loading: true };
		default:
			return { ...state};
    }
}
