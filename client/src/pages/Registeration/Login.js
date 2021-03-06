import React,{useState,useContext} from 'react'
import { Container, InputGroup, Form } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import axios from 'axios'
import { Link,useHistory } from 'react-router-dom'
import swal from 'sweetalert';
import AuthContext from '../../context/AuthContext'

const Login = () => {
    const {setLoggedIn }=useContext(AuthContext)
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();
    const [ errorMessage,setErrorMessage ]=useState("");
    const onSubmit = data => {
        const sendDataToServer = async () => {
            try {
                const result=await axios.post(`/login`, data);
                const user=result.data.data;
                sessionStorage.setItem('user',JSON.stringify(user) );
                swal(`login successful,welcome ${user.name} :)`)
                history.push('/')
                setLoggedIn(true);
            } catch (error) {
                setErrorMessage(error.response.data.message);
            }
        }
        sendDataToServer()
    }
    return (
        <Container>
            <div className="sign-up shadow p-3 mb-5 bg-white rounded" 
                onSubmit={handleSubmit(onSubmit)}>
                <h2 className="title">Sign In</h2>
                <Form className="sign-up-form">
                <div className="alert-danger">{errorMessage}</div>
                    {/* email */}
                    <InputGroup className="mt-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text className="icon-color">
                                <i className="fa fa-envelope" aria-hidden="true"></i>
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="email" placeholder="Email" name="email"
                            className={errors.email?"is-invalid":""}
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
                            className={errors.password?"is-invalid":""}
                         ref={register({
                            required: "The Password is required",
                            minLength: { value: 6, message: "Min length is 6" },
                        })} />
                    </InputGroup>
                     {/* display error message */}
                     {errors.password && <div className="alert-danger small mx-auto">
                        {errors.password.message}
                    </div>}

                    {/* login button */}
                    <InputGroup className="mt-3">
                        <Form.Control type="submit" value="Login" className="btn register-btn" />
                    </InputGroup>
                    <Form.Text id="passwordHelpInline" muted>
                        Not Registered Yet?
                        <Link to="/register">Sign Up</Link>
                    </Form.Text>

                </Form>
            </div>
        </Container>
    )
}

export default Login
