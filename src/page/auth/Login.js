import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config"
import { GetField } from "../../tools/getform"
import { setCookie } from "../../tools/cookie"
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setLogInState } from '../../reducers/loginstate'
import Alert from "../Alert";
import { useState } from "react";

function Login() {

  let navigate = useNavigate()
  const dispatch = useDispatch()

  let [loginError, setLoginError] = useState(false);
  let [loginMass, setLoginMass] = useState("");

  const onLogin = async (e) => {
    e.preventDefault()

    let v = [];
    let d = GetField(e)
    let error = ``
    let formErr = document.getElementById("form_error")
    let formBtn = document.getElementById("form_submin_button")
    setLoginError(false);
    formBtn.setAttribute("disabled", "")

    if (d.username.length >= 1) {
      v.push(1)
    } else {
      error += `
      Please enter username.<br />
      `
    }

    if (d.password.length >= 1) {
      v.push(1)
    } else {
      error += `
      Please enter password.<br />
      `
    }

    setTimeout(async () => {
      if (v.length !== 2) {
        setLoginMass(error)
        formBtn.removeAttribute("disabled")
        setLoginError(true)
        setTimeout(() => {
          setLoginError(false)
        }, 15000);
        return
      }

      const json = JSON.stringify(d);

      const res = await axios.post(config.backend + 'auth/login', json, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.data.status) {
        formBtn.removeAttribute("disabled")
        setCookie("USER_TOKEN", res.data.token)
        dispatch(setLogInState())
        navigate("/note")
        e.target.reset()
      } else if (!res.data.status) {
        setLoginMass("Username or Password is invalid.")
        formBtn.removeAttribute("disabled")
        setLoginError(true)
        setTimeout(() => {
          setLoginError(false)
        }, 15000);
      };

    }, 1000)

  }

  return (
    <>
      <Link to="/">
        <h1 className="auth-title">
          Note
        </h1>
      </Link>
      <Alert show={loginError} event={() => setLoginError(false)} massage={loginMass} color={"red"} top={true} />
      <div className="auth-con">
        <h2>
          Login
        </h2>
        <form onSubmit={onLogin} className="auth-form">
          <div id="form_error" className="alert alert-red hide"></div>
          <div className="input-group my-15">
            <label for="username" >Username:</label>
            <input type="text" id="username" placeholder="Username" name="username" />
          </div>
          <div className="input-group my-15">
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="Password" name="password" />
          </div>
          <div className="my-15">
            <button type="submit" id="form_submin_button" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
        <Link to="/register" className="link">Don't have an account?</Link>
      </div>
    </>
  );
}

export default Login;
