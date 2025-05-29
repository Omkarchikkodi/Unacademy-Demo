// signup.js
import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// signup.js

window.storedOTP = '';
let userEmail = '';
let userPassword = '';
let passwordIsStrong = false;


// Ensure DOM is ready before adding event
document.addEventListener("DOMContentLoaded", () => {

  const googleBtn = document.getElementById("googleSignupBtn");

  if (!googleBtn) {
    console.error("Google Signup Button not found!");
    return;
  }

  googleBtn.addEventListener("click", () => {
    console.log("Google login clicked");

    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const name = user.displayName || deriveNameFromGmail(user.email);
        const email = user.email;

        console.log("Google login successful:", { name, email });

        localStorage.setItem('loggedInUser', JSON.stringify({ name, email }));
        return setDoc(doc(db, 'users', user.uid), { email, name });
      })
      .then(() => {
        window.location.href = "home.html";
      })
      .catch(error => {
        console.error("Google login failed:", error);
        document.getElementById("loginError").innerText = error.message;
      });
  });
});

function deriveNameFromEmail(email) {
  const namePart = email.split('@')[0];
  return namePart.replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

window.generatedOTP = ""; // Global OTP

window.generateOTP = function () {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

window.sendOTP = function () {
  showLoader(); // ⬅️ Show loader here
  const email = document.getElementById("email").value;

  if (!email) {
    showPopup("Please enter a valid email address.");
    hideLoader();
    return;
  }
  if (!passwordIsStrong) {
    showPopup("Please enter a strong password that meets all the conditions before sending OTP.");
    hideLoader();
    return;
  }


  // Hide password rules if password is valid
  document.getElementById("message").style.display = "none";

  window.generatedOTP = window.generateOTP();
  window.storedOTP = window.generatedOTP;
  const templateParams = {
    to_email: email,
    otp: window.generatedOTP
  };

  emailjs.send("service_o6p9vms", "template_64g6qca", templateParams)
    .then(() => {
      document.getElementById("status").innerText = "OTP sent successfully!";
      document.getElementById("otp-section").style.display = "block";
      console.log("Sent OTP:", window.generatedOTP);
      hideLoader(); // ⬅️ Hide loader at end
    }, (error) => {
      document.getElementById("status").innerText = "Failed to send OTP.";
      console.error("Error:", error);
      hideLoader(); // ⬅️ Hide loader at end
    });

};

window.isPasswordStrong = function () {
  const password = document.getElementById("psw").value;

  const isLongEnough = password.length >= 8 && password.length <= 16;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /[0-9]/.test(password);

  console.log("Password check:", {
    password, isLongEnough, hasUppercase, hasLowercase, hasDigit
  });

  return (isLongEnough && hasUppercase && hasLowercase && hasDigit);
}


window.verifyOTP = function () {
  showLoader(); // ⬅️ Show loader here
  const enteredOTP = document.getElementById("otp").value;
  if (enteredOTP === window.generatedOTP.toString()) {
    document.getElementById("verifyStatus").innerText = "✅ OTP Verified!";
    const email = document.getElementById('email').value;
    const password = document.getElementById('psw').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        hideLoader(); // ⬅️ Hide loader at end
        return setDoc(doc(db, 'users', userCredential.user.uid), {
          email
        });
      })
      .then(() => {
        window.location.href = 'login.html';
      })
      .catch(error => {
        document.getElementById("loginError").innerText = error.message;
        hideLoader(); // ⬅️ Hide loader at end
      });
  } else {
    document.getElementById("verifyStatus").innerText = "❌ Invalid OTP!";
  }
};

// Helper function
function deriveNameFromGmail(email) {
  return email.split('@')[0]
    .replace(/[^a-zA-Z]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

var myInput = document.getElementById("psw");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function () {
  document.getElementById("message").style.display = "block";
  if (passwordIsStrong){
    setTimeout(() => {
      document.getElementById("message").style.display = "none";
    }, 200);
  }
}

// When the user clicks outside of the password field, hide the message box
// myInput.onblur = function () {
//   if (passwordIsStrong){
//     setTimeout(() => {
//       document.getElementById("message").style.display = "none";
//     }, 200);
//   }
// };

// When the user starts to type something inside the password field
myInput.onkeyup = function () {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if (myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }

  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if (myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if (myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  // Validate length
  if (myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }

  // At the end of the onkeyup function
  passwordIsStrong = isPasswordStrong();

}

function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

function showPopup(message, duration = 3000) {
  const popup = document.getElementById("customPopup");
  const msgBox = document.getElementById("popupMessage");

  if (popup && msgBox) {
    msgBox.textContent = message;
    popup.classList.add("show");
    popup.classList.remove("hidden");

    setTimeout(() => {
      popup.classList.remove("show");
      popup.classList.add("hidden");
    }, duration);
  }
}
