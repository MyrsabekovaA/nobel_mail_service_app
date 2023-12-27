import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider} from "react-redux";
import router from "/@/Routes";
import store from "/@/GlobalStates/store";
import "/@/App.css";

const App = ()=>{
          return (
            <Provider store={store}>
                <RouterProvider router={router}>
                </RouterProvider>
            </Provider>
        );
}

export default App;
