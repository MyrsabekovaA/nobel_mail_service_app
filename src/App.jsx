import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "/@/Routes";
import store from "/@/GlobalStates/store";
import "/@/App.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  );
};

export default App;
