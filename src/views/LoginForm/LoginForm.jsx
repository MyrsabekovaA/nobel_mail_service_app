import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from '/@/actions/authActions';
import { Icon } from '@iconify/react';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill';
import eyeFill from '@iconify-icons/eva/eye-fill';
import Logo from '/Nobel_logo.png';
import '/@views/LoginForm/LoginForm.css';
import {useDispatch} from "react-redux";
import { useDispatch } from "react-redux";

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
                className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-500"
                placeholder={label}
            />
            <label
                htmlFor={id}
                className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-green-500 peer-focus:text-sm"
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
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(login(email, password));
            navigate("/home");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex h-screen bg-gradient-to-b from-white/90 to-green-300 items-center justify-center relative">
            <img src={Logo} alt="Logo" className="absolute top-4 left-4 w-10 h-10" />
            <div className="p-6 max-w-sm w-full bg-white shadow-md rounded-lg">
                <h2 className="text-center text-2xl text-green-800 mb-6">Sign in</h2>
                <form onSubmit={handleSubmit}>
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
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-green-600" />
                            <span className="ml-2 text-sm text-gray-600">Remember Me</span>
                        </label>
                        <a href="#" className="text-sm text-green-600 hover:text-green-500">Forgot password?</a>
                    </div>
                    <button type="submit" className="w-full mt-6 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;