import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isLoggedInActions } from "/@/GlobalStates/LoggedIn";
import store from "/@/GlobalStates/store"
const TestComponent = (props) => {
    const isLoggedIn = useSelector((state)=>state.loggedIn.value)
    const dispatch = useDispatch()
    console.log(store.getState())
    console.log(isLoggedIn)
    return <div>
        <span>{isLoggedIn?"yes":"no"} </span>
        <button onClick={()=>dispatch(isLoggedInActions.toggleLogIn())}>toggle</button>
        </div>
}

export default TestComponent