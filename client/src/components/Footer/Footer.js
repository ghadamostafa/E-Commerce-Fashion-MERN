import React from 'react'
import { Link } from 'react-router-dom'
import { Container} from 'react-bootstrap'
const Footer = () => {
    return (
        <footer className="bg-dark text-center text-white">
            <Container className=" p-4 pb-0">
                <section>
                    <p className="d-flex justify-content-center align-items-center">
                        <span className="me-3 mr-2">Register for free </span>
                        <Link className="btn btn-outline-light btn-rounded register-btn" to="/register">Sign up
                        </Link>
                    </p>
                </section>
            </Container>

            {/* Copyrights */}
            <div className="text-center p-3 copy-right-color" >
                © 2020 Copyright:
                 <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
            </div>

        </footer>
    )
}

export default Footer


