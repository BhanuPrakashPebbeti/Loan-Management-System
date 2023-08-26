import axios from "axios";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { SERVER_URL } from "../../EditableStuff/Config";
import { useCookies } from 'react-cookie';

function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [reset, setReset] = useState(false);
  const [signin, setsignin] = useState(false);
  const [msg, setMsg] = useState();
  const [showSpinner, setShowSpinner] = useState(false);
  const [cookies, setCookie] = useCookies(['token', 'id'])

  const Login = async (e) => {
    e.preventDefault();
    setMsg("");
    setsignin(true);
    await axios
      .post(
        `${SERVER_URL}/auth/signin`,
        {
          email: email,
          password: password,
        },
      ).then((res) => {
        setCookie('token', res.data.token);
        setCookie('id', res.data.id);
        window.location.reload(true);
      }).catch((err) => {
        console.log(err);
        setMsg(err.message);
        setsignin(false);
      });
  };

  const ResetPassword = async (e) => {
    e.preventDefault();
    setShowSpinner(true);
    setMsg("Sending OTP...");
    try {
      await axios.post(`${SERVER_URL}/auth/forgot?email=${email}`, {},).then((res) => {
        console.log(res);
        if (res.status === 400) {
          setMsg("Employee does not exist with this email");
        } else if (res.status === 200) {
          setMsg("OTP sent to your Mail");
        }
        setShowSpinner(false);
      });
    } catch (err) {
      setMsg(err.response.data.err);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="text-center p-5">
        <h3 className="pb-4">{reset ? <>Reset Password</> : <>Login into your account</>}</h3>
        {msg ? <div className="alert alert-danger">{msg}</div> : null}
        {!reset ? (
          <div className="login-container">
            <form method="POST">
              <div className="form-group mb-3 text-start">
                <div>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control py-2 px-4 rounded-pill"
                    id="email"
                    aria-describedby="email"
                    placeholder="Enter EMail ID"
                    required
                  />
                </div>
              </div>
              <div className="form-group mb-3 text-start">
                <div>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control rounded-pill py-2 px-4 mb-4"
                    id="password"
                    aria-describedby="password"
                    placeholder="Enter Password"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 mb-4 py-2 px-4"
                onClick={Login}
                disabled={signin}
              >
                {signin ? <>Signing in <i className="fa fa-spinner fa-spin"></i></> : <>Sign in</>}
              </button>
            </form>
            <button
              type="reset"
              className="cust btn text-primary"
              onClick={() => {
                setReset(!reset);
                setMsg("");
              }}
            >
              Forget Password?
            </button>
          </div>
        ) : (
          <div className="login-container">
            <form method="POST" onSubmit={ResetPassword}>
              <div className="form-group mb-4 text-start">
                <div>
                  <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control rounded-pill py-2 px-4"
                    id="email"
                    aria-describedby="email"
                    placeholder="Enter EMail ID"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="cust btn btn-primary w-100 mb-4 py-2 px-4"
              >
                Reset Password {
                  showSpinner && <i className="fa fa-spinner fa-spin"></i>
                }
              </button>
            </form>
            <button
              type="reset"
              className="cust btn mb-4"
              onClick={() => {
                setReset(!reset);
                setMsg("");
              }}
            >
              Back to Sign In
            </button>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default Login;