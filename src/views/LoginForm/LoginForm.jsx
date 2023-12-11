import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {login} from '/@/actions/authActions';
import {Card, Form, Button, Container, Image, InputGroup, Row, Col} from 'react-bootstrap';
import {Icon} from '@iconify/react';
import eyeOffFill from '@iconify-icons/eva/eye-off-fill'
import eyeFill from '@iconify-icons/eva/eye-fill';
import Logo from '/Nobel_logo.png';
import '/@views/LoginForm/LoginForm.css';
import {useDispatch} from "react-redux";


function FloatingLabelInput({label, type, value, onChange, children, id}) {
    const isActive = value && value.length > 0;
    return (
        <Form.Group className={`floating-label-form-group ${isActive ? "active" : ""}`}>
            <InputGroup>
                <Form.Control
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    className="floating-input"
                    onFocus={(e) => e.currentTarget.parentNode.classList.add('focused')}
                    onBlur={(e) => e.currentTarget.parentNode.classList.remove('focused')}
                />
                {children}
                <Form.Label htmlFor={id} className={`floating-label ${isActive ? "active" : ""}`}>{label}</Form.Label>
            </InputGroup>
        </Form.Group>
    );
}

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await dispatch(login(email, password));
            navigate("/home");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderForm = (
        <Container>
            <Form className="login-inputs">
                <FloatingLabelInput className="mb-3 input"
                                    id="emailInput"
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                />

                <FloatingLabelInput className="mb-3 input pass"
                                    id="passwordInput"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    sPassword={true}
                                    showPassword={showPassword}
                                    setShowPassword={setShowPassword}
                >
                    <Button
                            variant="outline-secondary"
                            onClick={() => setShowPassword(!showPassword)}
                            className="password-button"
                        >
                            <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </Button>
                </FloatingLabelInput>
            </Form>

            <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="Remember Me"
                    checked={rememberMe}
                    className="remember-me"
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
            </Form.Group>

            <Row className="justify-content-end mt-3 mb-3 forgot-link">
                <Col xs="auto">
                    <a href="#" className="text-decoration-underline">Forgot password?</a>
                </Col>
            </Row>
            <Button variant="primary" type="submit" className="w-100 login-button" onClick={handleSubmit}>
                Login
            </Button>
        </Container>
    );

    return (
        <Container fluid className="d-flex align-items-center justify-content-center login-body">
            <Image src={Logo} className="login-image"/>
            <Card className="login-form">
                <Card.Body className="login-card">
                    <Card.Title className="title">Sign in</Card.Title>
                    <Card className='notice'>
                        Temporary Credentials: <br/>
                        Email: 11@11.11 <br/>
                        Password: 1111
                    </Card>
                    {renderForm}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default LoginForm;