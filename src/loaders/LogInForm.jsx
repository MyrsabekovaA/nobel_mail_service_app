import { redirect } from "react-router-dom"
import { checkToken } from "/@/GlobalStates/LoggedIn"
import store from "/@/GlobalStates/store"

function LoginFormLoader() {
    let {dispatch} = store
    const token = localStorage.getItem("token")
    const name = localStorage.getItem("name")
    const email = localStorage.getItem("email")
    return dispatch(checkToken({token, user:{name, email}}))
}

export default LoginFormLoader