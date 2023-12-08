import React, { Component } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '/@/Routes';
import { Provider } from 'react-redux';
import store from '/@/GlobalStates/store';
import '/@/App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isUserLoggedIn: false,
        };
    }

    handleLoginSuccess = () => {
        this.setState({ isUserLoggedIn: true });
    }

    render() {
        return (
            <Provider store={store}>
                <RouterProvider router={router}/>
            </Provider>
        );
    }
}

export default App;