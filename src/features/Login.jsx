import { useState } from "react";
import MeasurementsInput from "./MeasurementsInput";
// import { useHistory } from "react-router-dom";
import { auth } from "./firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const history = useHistory();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneAuth = () => {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha");
    auth
      .signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
      .then((confirmationResult) => {
        console.log("OTP sent!");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login authentication here.
    if (email === "test@pockettailer.com" && password === "password") {
      // history.push("/home");
    } else {
      alert("Invalid credentials!");
    }
  };

  return (
    // <div className="login-container">
    //   <h2>Login to PocketTailer</h2>
    //   <form onSubmit={handleLogin}>
    //     <label>Email</label>
    //     <input
    //       type="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       required
    //     />

    //     <label>Password</label>
    //     <input
    //       type="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       required
    //     />

    //     <button type="submit">Login</button>
    //   </form>
    //   <MeasurementsInput label="Shoulder Width" />
    // </div>
    <div>
      <input
        type="text"
        placeholder="Enter phone number"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handlePhoneAuth}>Send OTP</button>
      <div id="recaptcha"></div>
    </div>
  );
};

export default Login;
