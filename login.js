import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.querySelector('button[onclick="loginUser()"]').onclick = () => {
  showLoader(); // ⬅️ Show loader here
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      const name = deriveNameFromEmail(email);
      localStorage.setItem('loggedInUser', JSON.stringify({ name, email }));
      hideLoader(); // ⬅️ Hide loader at end
      window.location.href = "home.html";
    })
    .catch(error => {
      document.getElementById("loginError").innerText = error.message;
      hideLoader(); // ⬅️ Hide loader at end
    });


};

function deriveNameFromEmail(email) {
  return email.split('@')[0]
    .replace(/[^a-zA-Z]/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());
}

document.querySelector('button[onclick="googleLogin()"]').onclick = () => {
  showLoader(); // ⬅️ Show loader here
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {

      showLoader(); // ⬅️ Show loader here
      const user = result.user;
      const name = user.displayName || deriveNameFromEmail(user.email);
      const email = user.email;

      localStorage.setItem('loggedInUser', JSON.stringify({ name, email }));
      hideLoader(); // ⬅️ Hide loader at end
      window.location.href = "home.html";
    })
    .catch(error => {
      document.getElementById("loginError").innerText = error.message;
      hideLoader(); // ⬅️ Hide loader at end
    });
};

function showLoader() {
  document.getElementById("loader").style.display = "block";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
}


// ✅ Attach to global window so it's callable in HTML onclick
window.sendPasswordReset = sendPasswordReset;

function sendPasswordReset() {
  console.log("Forgot clicked");

  const email = document.getElementById("loginEmail")?.value;

  if (!email) {
    showPopup("Please enter your email in the input field first.");
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      showPopup(`🔑 Password reset email sent to ${email}`);
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        showPopup("❌ No account found with this email.");
      } else if (error.code === "auth/invalid-email") {
        showPopup("❌ Invalid email format.");
      } else {
        showPopup("❌ " + error.message);
      }
    });
}


let popupTimeout;

function showPopup(message, duration = 3000) {
  const popup = document.getElementById("customPopup");
  const msgBox = document.getElementById("popupMessage");

  if (popup && msgBox) {
    // Clear existing timeout
    if (popupTimeout) {
      clearTimeout(popupTimeout);
    }

    msgBox.textContent = message;
    popup.classList.add("show");
    popup.classList.remove("hidden");

    // Hide after duration
    popupTimeout = setTimeout(() => {
      popup.classList.remove("show");
      popup.classList.add("hidden");
    }, duration);
  }
}
