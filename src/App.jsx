import React, { Component} from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import router from '/@/Routes';
import store from '/@/GlobalStates/store';
import { logIn, logOut} from '/@/GlobalStates/LoggedIn';
import '/@/App.css';

class App extends Component {
    componentDidMount() {
        store.dispatch(logIn());
    }

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isUserLoggedIn: false,
    //     };
    // }

    render() {
        return (
            <Provider store={store}>
                <RouterProvider router={router}>
                </RouterProvider>
            </Provider>
        );
    }
}

export default App;