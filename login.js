import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

document.querySelector('button[onclick="loginUser()"]').onclick = () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      const name = deriveNameFromEmail(email);
      localStorage.setItem('loggedInUser', JSON.stringify({ name, email }));
      window.location.href = "home.html";
    })
    .catch(error => {
      document.getElementById("loginError").innerText = error.message;
    });
};

function deriveNameFromEmail(email) {
  return email.split('@')[0]
              .replace(/[^a-zA-Z]/g, ' ')
              .replace(/\b\w/g, c => c.toUpperCase());
}

document.querySelector('button[onclick="googleLogin()"]').onclick = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const name = user.displayName || deriveNameFromEmail(user.email);
      const email = user.email;

      localStorage.setItem('loggedInUser', JSON.stringify({ name, email }));
      window.location.href = "home.html";
    })
    .catch(error => {
      document.getElementById("loginError").innerText = error.message;
    });
};
