import React, { useRef, useState, useContext } from 'react'
import { Container, InputGroup, FormControl, Form } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { Link, useHistory } from 'react-router-dom'
import './Register.css'
import axios from 'axios'
import swal from 'sweetalert';
import AuthContext from '../../context/AuthContext'

const Register = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const { setLoggedIn } = useContext(AuthContext)
    const history = useHistory();
    const password = useRef({});
    password.current = watch("password", "");
    const [errorMessage, setErrorMessage] = useState("");
    const onSubmit = data => {
        const sendDataToServer = async () => {
            try {
                const result = await axios.post(`/register`, data);
                const user = result.data.data;
                swal(`your registeration completed successfully ,welcome ${user.name} :)`)
                history.push('/');
                setLoggedIn(true)
            } catch (error) {
                setErrorMessage(error.response.data.message);
            }
        }
        sendDataToServer()
    }

    return (
        <Container>
            <div className="sign-up shadow p-3 mb-5 bg-white rounded">
                <h2 className="title">Sign Up</h2>
                <Form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="alert-danger">{errorMessage}</div>
                    {/* user name */}
                    <InputGroup className="mt-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text className="icon-color" >
                                <i className="fa fa-user fa-fw "></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl placeholder="Username" type="text" name="name"
                            className={errors.name ? "is-invalid" : ""}
                            ref={register({
                                required: "The Username is required",
                                minLength: { value: 4, message: "Min length is 4" },
                                maxLength: { value: 30, message: "Max length exceeded" }
                            })} />
                    </InputGroup>
                    {/* display error message */}
                    {errors.name && <div className="alert-danger small mx-auto">
                        {errors.name.message}
                    </div>}

                    {/* Email */}
                    <InputGroup className="mt-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text className="icon-color">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="email" placeholder="Email" name="email"
                            className={errors.email ? "is-invalid" : ""}
                            ref={register({
                                required: "The Email is required",
                                pattern: { value: /\S+@\S+\.\S+/, message: "Email is not valid" },
                            })} />
                    </InputGroup>
                    {/* display error message */}
                    {errors.email && <div className="alert-danger small mx-auto">
                        {errors.email.message}
                    </div>}

                    {/* password */}
                    <InputGroup className="mt-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text className="icon-color">
                                <i className="fa fas fa-lock "></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="password" placeholder="Password" name="password"
                            className={errors.password ? "is-invalid" : ""}
                            ref={register({
                                required: "The Password is required",
                                minLength: { value: 6, message: "Min length is 6" },
                            })} />
                    </InputGroup>
                    {/* display error message */}
                    {errors.password && <div className="alert-danger small mx-auto">
                        {errors.password.message}
                    </div>}

                    {/* repeat password */}
                    <InputGroup className="mt-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text className="icon-color">
                                <i className="fa fas fa-lock "></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="password" placeholder="Repeat your password"
                            className={errors.confirmPassword ? "is-invalid" : ""} name="confirmPassword"
                            ref={register({
                                required: "This field is required",
                                validate: value =>
                                    value === password.current || "The password doesn't match"
                            })} />
                    </InputGroup>
                    {/* display error message */}
                    {errors.confirmPassword && <div className="alert-danger small mx-auto">
                        {errors.confirmPassword.message}
                    </div>}

                    {/* regiser button */}
                    <InputGroup className="mt-3">
                        <Form.Control type="submit" value="Register" className="btn register-btn" />
                    </InputGroup>
                    <Form.Text id="passwordHelpInline" muted>
                        Already Registered ? <Link to="/login"> Sign In</Link>
                    </Form.Text>

                </Form>
            </div>
        </Container>
    )
}

export default Register
