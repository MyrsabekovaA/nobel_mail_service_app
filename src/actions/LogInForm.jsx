import { redirect } from "react-router-dom";
import { isLoggedInActions } from "/@/GlobalStates/LoggedIn";
import store from "/@/GlobalStates/store";

const loginAction = async ({ params, request }) => {
  const response = await request.formData();
  const email = response.get("email");
  const password = response.get("password");
  try {
    const auth = await fetch(
      `https://mail-service-412008.ey.r.appspot.com/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    if ((await auth.status) !== 200) {
      alert("Invalid Credits");
      throw new Error("Invalid credits, try again");
    }
    const { token, user } = await auth.json();
    console.log(token, user);
    console.log(user.name, user.email);
    let { dispatch } = store;
    await dispatch(isLoggedInActions.setTrueLogIn());
    await dispatch(isLoggedInActions.setName({ name: user.name }));
    await dispatch(isLoggedInActions.setEmail({ email: user.email }));
    await dispatch(isLoggedInActions.setToken({ token }));
    return true;
  } catch (err) {
    console.log(err);
    return redirect("/LogInForm");
  }
};

export { loginAction };
