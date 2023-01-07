import React, { useState } from "react";
import { auth } from "./firebase-config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function App() {
  const contryCode = "+959";
  const [phoneNumber, setPhoneNumber] = useState(contryCode);
  const [expandForm, setExpandForm] = useState(false);
  const [OTP, setOTP] = useState("");

  const recaptchaVerifie = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        callback: (response) => {
          console.log("prepared phone auth process");
        },
      },
      auth
    );
  };
  const requestOTP = (e) => {
    e.preventDefault();
    if (phoneNumber.length >= 12) {
      setExpandForm(true);
      recaptchaVerifie();
      let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          console.log(123);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const verifyOTP = (e) => {
    let otp = e.target.value;
    setOTP(otp);
    if (otp.length === 6) {
      console.log(otp);
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          // User signed in successfully.
          // ...
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
        });
    }
  };
  return (
    <div>
      <form onSubmit={requestOTP}>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {expandForm === true ? (
          <input type="number" value={OTP} onChange={verifyOTP} />
        ) : (
          <button type="submit">Request Otp</button>
        )}
      </form>
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default App;
