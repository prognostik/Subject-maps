import { useState } from "react";
import ReactDOM from "react-dom/client";

import "../../../css/service/user-form.css";

window.React = React;

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isShowError, setIsShowError] = useState(false);
  const [isShowRequestError, setIsShowRequestError] = useState(false);  
  const [isShowSuccess, setIsShowSuccess] = useState(false);
  const [isShowProcessing, setIsShowProcessing] = useState(false);


  console.log("Register");

  function onChangeEmail(event) {
    let newEmail = event.target.value;

    newEmail = newEmail.trim();

    setEmail(newEmail);
  }

  function onChangePassword(event) {
    let newPassword = event.target.value;

    newPassword = newPassword.trim();

    setPassword(newPassword);
  }

  function onSubmit(event) {
    event.preventDefault();

    setIsShowProcessing(false);
    setIsShowSuccess(false);
    setIsShowError(false);
    setIsShowRequestError(false);

    if (email == "" || password == "") {
      setIsShowError(true);
    } else {
      let isEmailFormatCorrect = /^\S+@\S+\.\S+$/.test(email);

      if (isEmailFormatCorrect) {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: "email=" + email + "&password=" + password
        };

        const url = "/register";

        setIsShowProcessing(true);

        fetch(url, options)
          .then(response => response.json())
          .then(data => {
            if (data.registered == true) {
              setIsShowError(false);
              setIsShowSuccess(true);

              //sendLoginRequest(email, password);
            } else {
              setIsShowRequestError(true);
            }
          })
          .catch(error => {
            alert("There was an error during request");
            
            console.log(error); 
          })
          .finally(() => {
            setIsShowProcessing(false);
          });
      }
    } 
  }

  // function sendLoginRequest(email, password) {
  //   const url = "/login";

  //   console.log("Logging in..");

  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     body: "email=" + email + "&password=" + password + "&remember-me=on"
  //   };

  //   fetch(url, options)
  //     .then(response => console.log(response.ok));
  // }
  
  return (
    <form className="userForm" name="f" onSubmit={onSubmit}>               
      <fieldset className="userForm-fieldset">
        <legend>Enter your email and password</legend>

        <div className="userForm-fieldset-warning">
          <span className="userForm-fieldset-warning-strike">Attention</span><p />

          This site works in <span className="userForm-fieldset-warning-strike">TEST mode</span>.<p />

          It may shut down temporarily or permanently at any time.<p />

          Your data may be partially or completely lost and your account 
          may be deleted without prior notice.<p />

          This site is <span className="userForm-fieldset-warning-strike">NOT SECURE</span> (it doesn't use HTTPS). Don't use your
          regular passwords and don't store sensitive data here.
        </div>

        <div>
          {isShowError && <div className="userForm-fieldset-block-alert mError">
            Invalid email or password.
          </div>}

          {isShowRequestError && <div className="userForm-fieldset-block-alert mError">
            Sorry, there was an error during request.
          </div>}          

          {isShowSuccess && <div className="userForm-fieldset-block-alert mSuccess"> 
            You have been successfully registered. You can now <a href="/login">log in</a>.
          </div>}

          {isShowProcessing && <div className="userForm-fieldset-block-alert mInfo"> 
            Processing request...
          </div>}          
        </div>

        <div className="userForm-fieldset-block">
          <label className="userForm-fieldset-block-label" htmlFor="username">Email:</label>
          <input className="userForm-fieldset-block-textfield" type="text" 
                value={email} onChange={onChangeEmail} name="username"  />
        </div>

        <div className="userForm-fieldset-block">        
            <label className="userForm-fieldset-block-label" htmlFor="password">Password:</label>
            <input className="userForm-fieldset-block-textfield" type="password"
                value={password} onChange={onChangePassword} name="password" />
        </div>

        <div className="userForm-fieldset-block">
          <button className="userForm-fieldset-block-button" type="submit">Register</button>
        </div>

      </fieldset>
    </form>
  )
}


const registerEl = document.getElementById("register");

if (registerEl) {
  const root = ReactDOM.createRoot(document.getElementById("register"));

  root.render(<Register />);
}

