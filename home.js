// document.addEventListener("DOMContentLoaded", function () {
//   const accountBox = document.querySelector(".account-box");
//   const profilePanel = document.getElementById("profilePanel");
//   const userNameEl = document.querySelector(".account-name");
//   const userEmailEl = document.querySelector(".account-email");

//   // Replace with your real user auth logic
//   const user = {
//     name: "Omkar Patil",
//     email: "omkarpatil@example.com",
//     state: "", // Leave empty if missing
//     class: ""  // Leave empty if missing
//   };

//   // Set account info
//   userNameEl.textContent = user.name;
//   userEmailEl.textContent = user.email;

//   // Show profile panel when account is clicked
//   accountBox.addEventListener("click", () => {
//     profilePanel.classList.add("open");

//     // Fill form fields
//     document.getElementById("profileName").value = user.name;
//     document.getElementById("profileEmail").value = user.email;

//     const stateSelect = document.getElementById("profileState");
//     const classSelect = document.getElementById("profileClass");

//     if (user.state) stateSelect.value = user.state;
//     if (user.class) classSelect.value = user.class;
//   });

//   // Close panel when clicking outside
//   window.addEventListener("click", function (e) {
//     if (!profilePanel.contains(e.target) && !accountBox.contains(e.target)) {
//       profilePanel.classList.remove("open");
//     }
//   });

//   // Save handler (optional: send to database)
//   document.getElementById("saveProfile").addEventListener("click", function () {
//     const selectedState = document.getElementById("profileState").value;
//     const selectedClass = document.getElementById("profileClass").value;

//     if (!selectedState || !selectedClass) {
//       alert("Please select both state and class.");
//       return;
//     }

//     // Save to localStorage or send to backend
//     console.log("Saved Profile:");
//     console.log("State:", selectedState);
//     console.log("Class:", selectedClass);

//     // Close the panel
//     profilePanel.classList.remove("open");
//   });
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const user = JSON.parse(localStorage.getItem('loggedInUser'));

//   if (!user) return; // Not logged in

//   document.querySelector('#authSection')?.classList.add('hidden');
//   document.querySelector('#userSection')?.classList.remove('hidden');

//   document.getElementById('userName').textContent = user.name;
//   document.getElementById('userEmail').textContent = user.email;

//   document.getElementById('profileName').textContent = user.name;
//   document.getElementById('profileEmail').textContent = user.email;

//   // Pre-select state/class if saved
//   document.getElementById('stateDropdown').value = user.state || "";
//   document.getElementById('classDropdown').value = user.class || "";
// });


// function showProfileMenu() {
//   document.getElementById('profileDropdown').style.display = 'block';
// }

// function hideProfileMenu() {
//   document.getElementById('profileDropdown').style.display = 'none';
// }

// // Open profile sidebar
// function openProfile() {
//   const user = JSON.parse(localStorage.getItem('loggedInUser'));
//   if (!user) {
//     alert("No user data found.");
//     return;
//   }

//   document.getElementById('profileName').textContent = user.name;
//   document.getElementById('profileEmail').textContent = user.email;
//   document.getElementById('stateDropdown').value = user.state || "";
//   document.getElementById('classDropdown').value = user.class || "";

//   document.getElementById('profilePanel').classList.add('show');
//   document.getElementById('profilePanel').classList.remove('hidden');
//   document.getElementById('profileDropdown').classList.add('hidden');
// }


// function logout() {
//   localStorage.removeItem('loggedInUser');
//   window.location.href = 'home.html';
// }

// function showProfileMenu() {
//   document.getElementById('profileDropdown').style.display = 'block';
// }

// function hideProfileMenu() {
//   document.getElementById('profileDropdown').style.display = 'none';
// }

// function saveProfile() {
//   const user = JSON.parse(localStorage.getItem('loggedInUser'));
//   const state = document.getElementById('stateDropdown').value;
//   const userClass = document.getElementById('classDropdown').value;

//   if (!state || !userClass) {
//     alert("Please select both state and class.");
//     return;
//   }

//   user.state = state;
//   user.class = userClass;
//   localStorage.setItem('loggedInUser', JSON.stringify(user));

//   alert("Profile updated!");
//   document.getElementById('profilePanel').classList.remove('show');
// }




// let hoverTimeout;
// const profileWrapper = document.getElementById('profileWrapper');
// const profileDropdown = document.getElementById('profileDropdown');
// const toggleDropdown = document.getElementById('toggleDropdown');

// toggleDropdown.addEventListener('click', () => {
//   profileDropdown.classList.toggle('hidden');
// });

// // Toggle profile dropdown on click
// document.getElementById('toggleDropdown').addEventListener('click', () => {
//   const dropdown = document.getElementById('profileDropdown');
//   dropdown.classList.toggle('hidden');
// });

// profileWrapper.addEventListener('mouseenter', () => {
//   clearTimeout(hoverTimeout);
//   profileDropdown.classList.remove('hidden');
// });

// profileWrapper.addEventListener('mouseleave', () => {
//   hoverTimeout = setTimeout(() => {
//     profileDropdown.classList.add('hidden');
//   }, 200);
// });

//   document.getElementById("myProfileBtn").addEventListener("click", () => {
//     const user = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (user) {
//       document.getElementById("profileName").textContent = user.name;
//       document.getElementById("profileEmail").textContent = user.email;
//       document.getElementById("stateDropdown").value = user.state || "";
//       document.getElementById("classDropdown").value = user.class || "";
//     }
//     document.getElementById("profilePanel").classList.remove("hidden");
//     profileDropdown.classList.add("hidden");
//   });
















// document.addEventListener("DOMContentLoaded", () => {
//   const profileWrapper = document.getElementById('profileWrapper');
//   const toggleDropdown = document.getElementById('toggleDropdown');
//   const profileDropdown = document.getElementById('profileDropdown');
//   const profilePanel = document.getElementById('profilePanel');
//   const saveBtn = document.querySelector('#profilePanel button');

//   // Toggle dropdown on click
//   toggleDropdown.addEventListener('click', () => {
//     profileDropdown.classList.toggle('hidden');
//   });

//   // Open sidebar when My Profile is clicked
//   window.openProfile = function () {
//     const user = JSON.parse(localStorage.getItem('loggedInUser'));
//     if (!user) {
//       alert("No user data found.");
//       return;
//     }

//     document.getElementById('profileName').textContent = user.name;
//     document.getElementById('profileEmail').textContent = user.email;
//     document.getElementById('stateDropdown').value = user.state || "";
//     document.getElementById('classDropdown').value = user.class || "";

//     profilePanel.classList.add('open');
//     profileDropdown.classList.add('hidden');
//   };

//   // Save button inside sidebar
//   window.saveProfile = function () {
//     const user = JSON.parse(localStorage.getItem('loggedInUser'));
//     const state = document.getElementById('stateDropdown').value;
//     const userClass = document.getElementById('classDropdown').value;

//     if (!state || !userClass) {
//       alert("Please select both state and class.");
//       return;
//     }

//     user.state = state;
//     user.class = userClass;
//     localStorage.setItem('loggedInUser', JSON.stringify(user));
//     alert("Profile updated!");

//     profilePanel.classList.remove('open');
//   };

//   // Logout
//   window.logout = function () {
//     localStorage.removeItem('loggedInUser');
//     window.location.href = 'home.html';
//   };

//   // Show/hide sections on page load
//   const user = JSON.parse(localStorage.getItem('loggedInUser'));
//   if (user) {
//     document.getElementById('authSection')?.classList.add('hidden');
//     document.getElementById('userSection')?.classList.remove('hidden');
//     document.getElementById('userName').textContent = user.name;
//     document.getElementById('userEmail').textContent = user.email;
//   }
// });

// // Toggle profile dropdown on click
// document.getElementById('toggleDropdown').addEventListener('click', () => {
//   const profileDropdown = document.getElementById('profileDropdown');
//   profileDropdown.classList.toggle('hidden');
// });

















document.addEventListener("DOMContentLoaded", () => {
  const profileWrapper = document.getElementById('profileWrapper');
  const toggleDropdown = document.getElementById('toggleDropdown');
  const profileDropdown = document.getElementById('profileDropdown');
  const profilePanel = document.getElementById('profilePanel');

  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) return;

  // Hide auth buttons, show profile info
  document.getElementById('authSection')?.classList.add('hidden');
  document.getElementById('userSection')?.classList.remove('hidden');

  // Set basic info
  document.getElementById('userName').textContent = user.name;
  document.getElementById('userEmail').textContent = user.email;

  // Toggle dropdown on SVG click
  toggleDropdown.addEventListener('click', () => {
    console.log('Dropdown toggle clicked');
    profileDropdown.classList.toggle('hidden');
  });

});

// Open sidebar
function openProfile() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) {
    alert("No user data found.");
    return;
  }

  document.getElementById('profileName').textContent = user.name;
  document.getElementById('profileEmail').textContent = user.email;
  document.getElementById('stateDropdown').value = user.state || "";
  document.getElementById('classDropdown').value = user.class || "";

  document.getElementById('profilePanel').classList.remove('hidden');
  document.getElementById('profilePanel').classList.add('open');
  document.getElementById('profileDropdown').classList.add('hidden');
}

// Save user data
function saveProfile() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const state = document.getElementById('stateDropdown').value;
  const userClass = document.getElementById('classDropdown').value;

  if (!state || !userClass) {
    alert("Please select both state and class.");
    return;
  }

  user.state = state;
  user.class = userClass;
  localStorage.setItem('loggedInUser', JSON.stringify(user));

  alert("Profile updated!");
  document.getElementById('profilePanel').classList.remove('open');
}

// Logout
function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'home.html';
}
