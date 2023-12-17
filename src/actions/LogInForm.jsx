import { redirect } from "react-router-dom"

const loginAction = async ({params, request}) => {
    const response = await request.formData()
    const email = response.get("email")
    const password = response.get("password")
    // const data = fetch()
    return redirect("/logInForm")
}

export { loginAction };
