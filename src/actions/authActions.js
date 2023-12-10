const login = (email, password) => async (dispatch) => {
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
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE', error: error.message });
        throw error;
    }
};

export { login };
