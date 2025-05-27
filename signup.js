// signup.js
import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// signup.js

window.storedOTP = '';
let userEmail = '';
let userPassword = '';

function deriveNameFromEmail(email) {
  const namePart = email.split('@')[0];
  return namePart.replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

window.generatedOTP = ""; // Global OTP

window.generateOTP = function () {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

window.sendOTP = function () {
  const email = document.getElementById("email").value;
  if (!email) {
    alert("Please enter a valid email address.");
    return;
  }

  window.generatedOTP = window.generateOTP();
  window.storedOTP = window.generateOTP;
  const templateParams = {
    to_email: email,
    otp: window.generatedOTP
  };

  emailjs.send("service_o6p9vms", "template_64g6qca", templateParams)
    .then(() => {
      document.getElementById("status").innerText = "OTP sent successfully!";
      document.getElementById("otp-section").style.display = "block";
      console.log("Sent OTP:", window.generatedOTP);
    }, (error) => {
      document.getElementById("status").innerText = "Failed to send OTP.";
      console.error("Error:", error);
    });
};

window.verifyOTP = function () {
  const enteredOTP = document.getElementById("otp").value;
  if (enteredOTP === window.generatedOTP.toString()) {
    document.getElementById("verifyStatus").innerText = "✅ OTP Verified!";
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return setDoc(doc(db, 'users', userCredential.user.uid), {
          email
        });
      })
      .then(() => {
        window.location.href = 'login.html';
      })
      .catch(error => alert(error.message));
  } else {
    document.getElementById("verifyStatus").innerText = "❌ Invalid OTP!";
  }
};

