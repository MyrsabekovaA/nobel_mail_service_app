import { loginStart, loginSuccess, loginFailure } from "/@/GlobalStates/LoggedIn";

const login = (email, password) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            dispatch(loginFailure());
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        dispatch(loginSuccess());
    } catch (error) {
        dispatch(loginFailure());
        throw error;
    }
};

export { login };