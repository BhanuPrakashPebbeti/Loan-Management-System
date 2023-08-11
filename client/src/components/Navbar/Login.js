import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const Login = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [reset, setReset] = useState(false);
    const [signin, setsignin] = useState(false);
    const [msg, setMsg] = useState();
    const [showSpinner, setShowSpinner] = useState(false);
    return (
        <div className="Login">
            <button type="button" className="btn btn-primary mx-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Login
            </button>
            <div className="modal fade text-center" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Login</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control py-2 px-4 rounded-pill"
                                    id="username"
                                    aria-describedby="username"
                                    placeholder="Enter Username or EMail ID"
                                    required
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control py-2 px-4 rounded-pill my-2"
                                    id="password"
                                    aria-describedby="password"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary w-100 mb-4 py-2 px-4 my-2 rounded-pill"

                            >
                                Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;


