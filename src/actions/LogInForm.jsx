import { redirect } from "react-router-dom"
import { isLoggedInActions } from "/@/GlobalStates/LoggedIn"
import store from "/@/GlobalStates/store"

const loginAction = async ({params, request}) => {
    const response = await request.formData()
    const email = response.get("email")
    const password = response.get("password")
    try {
        const auth = await fetch("http://52.59.202.2:3000/api/auth/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        if (await auth.status!==200) {
            throw new Error("Invalid credits, try again")
        }
        const {token, user} = await auth.json()
        console.log(token, user)
        console.log(user.name, user.email)
        let {dispatch} = store
        dispatch(isLoggedInActions.setTrueLogIn())
        dispatch(isLoggedInActions.setName({name: user.name}))
        dispatch(isLoggedInActions.setEmail({email: user.email}))
        dispatch(isLoggedInActions.setToken({token}))
        return redirect("/Home")
    } catch(err) {
        alert(err.message)
        return redirect("/LogInForm")
    }
}

export { loginAction };
