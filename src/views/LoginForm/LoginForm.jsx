import React, {useState} from "react";
import { Navigate, useSubmit } from "react-router-dom";
import {Icon} from '@iconify/react';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill'
import eyeFill from '@iconify-icons/eva/eye-fill';
import Logo from '/Nobel_logo.png';
import {useDispatch, useSelector} from "react-redux";
import "./LoginForm.css"

function FloatingLabelInput({ label, type, value, onChange, id, showPassword, setShowPassword, isPasswordField }) {
    const isActive = value && value.length > 0;

    const handleToggleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };
    return (
        <div className={`relative mb-6 ${isActive ? "active" : ""}`}>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className="peer h-10 w-full border-b-2 border-meta3 text-black placeholder-transparent
                focus:outline-none focus:border-green"
                placeholder={label}
            />
            <label
                htmlFor={id}
                className="absolute left-0 -top-3 text-success text-sm transition-all
                peer-placeholder-shown:text-base peer-placeholder-shown:text-meta3
                peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-success peer-focus:text-sm"
            >
                {label}
            </label>
            {isPasswordField && (
                <button
                    onClick={handleToggleShowPassword}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                    type="button"
                >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                </button>
            )}
        </div>
    );
}
function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    let submit = useSubmit()
    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(password, email)
        await submit({password, email}, {
            method: "post",
            action: "/LogInForm"
        })
    };
    let isLoggedIn = useSelector(state=>state.loggedIn.value)
    if (isLoggedIn) {
        return <Navigate to = {localStorage.getItem("lastRoute") || "/Home"}/>
    }
    console.log(email, password)

    return (
        <div className="custom-gradient flex h-screen items-center justify-center relative">
            <img src={Logo} alt="Logo" className="absolute top-4 left-4 w-10 h-10" />
            <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-lg">
                <h2 className="text-center text-2xl text-success mb-6">Sign in</h2>
                <form>
                    <FloatingLabelInput
                        id="emailInput"
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FloatingLabelInput
                        id="passwordInput"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        isPasswordField={true}
                    />
                    <div className="flex items-center justify-between mt-6">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-success" />
                            <span className="ml-2 text-sm text-gray">Remember Me</span>
                        </label>
                        <a href="#" className="text-sm text-success hover:text-lightgreen">Forgot password?</a>
                    </div>
                    <button className="w-full mt-6 bg-meta3 text-white py-2 px-4 rounded
                    hover:bg-success" onClick={handleSubmit}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;