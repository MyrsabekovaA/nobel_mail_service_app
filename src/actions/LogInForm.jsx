import { redirect } from "react-router-dom"

const loginAction = async ({params, request}) => {
    const response = await request.formData()
    const email = response.get("email")
    const password = response.get("password")
    try {
        const data = await fetch("http://localhost:3000/", {
            method: "POST",
            data: {
                email,
                password
            }
        });
        return redirect("/Home")
    } catch(err) {
        redirect("/LogInForm")
    }
}

export { loginAction };
