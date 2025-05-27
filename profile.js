document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  if (!user) {
    alert("User not logged in");
    window.location.href = 'login.html';
    return;
  }

  // Static user info
  document.getElementById('userName').textContent    = user.name;
  document.getElementById('userEmail').textContent   = user.email;
  document.getElementById('displayName').textContent = user.name;
  document.getElementById('displayEmail').textContent= user.email;

  // Form fields
  const classSelect    = document.getElementById('classSelect');
  const cityInput      = document.getElementById('city');
  const phoneInput = document.getElementById('phone');
  const stateSelect    = document.getElementById('state');
  const districtSelect = document.getElementById('district');
  const pincodeInput   = document.getElementById('pincode');

  // District options by state
  const districtsByState = {
    Karnataka: [
      "Bagalkote", "Ballari (Bellary)", "Belagavi (Belgaum)", "Bengaluru Rural", "Bengaluru Urban", "Bidar",
      "Chamarajanagara", "Chikkaballapura", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere",
      "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi (Gulbarga)", "Kodagu (Coorg)", "Kolar", "Koppal",
      "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada",
      "Vijayapura (Bijapur)", "Vijayanagara", "Yadgir"
    ],
    Maharashtra: [
      "Mumbai City", "Mumbai Suburban", "Palghar", "Raigad", "Ratnagiri", "Sindhudurg", "Thane", "Kolhapur",
      "Pune", "Sangli", "Satara", "Solapur", "Ahmednagar", "Dhule", "Jalgaon", "Nandurbar", "Nashik",
      "Chhatrapati Sambhajinagar (Aurangabad)", "Beed", "Hingoli", "Jalna", "Latur", "Nanded", "Dharashiv (Osmanabad)",
      "Parbhani", "Akola", "Amravati", "Buldhana", "Washim", "Yavatmal", "Bhandara", "Chandrapur", "Gadchiroli",
      "Gondia", "Nagpur", "Wardha"
    ]
  };

  // Handle state change → populate districts
  stateSelect.addEventListener("change", () => {
    const selectedState = stateSelect.value;
    const districts = districtsByState[selectedState] || [];

    districtSelect.innerHTML = `<option value="">Select District</option>`;
    districts.forEach(district => {
      const option = document.createElement("option");
      option.value = district;
      option.textContent = district;
      districtSelect.appendChild(option);
    });
  });

  // Pre-fill user form data
  classSelect.value  = user.class    || '';
  cityInput.value    = user.city     || '';
  phoneInput.value   = user.phone    || '';
  stateSelect.value  = user.state    || '';

  // 🔄 Trigger the state change so districts populate
  stateSelect.dispatchEvent(new Event('change'));

  districtSelect.value = user.district || '';
  pincodeInput.value   = user.pincode  || '';
});

function saveProfile() {
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  user.class = document.getElementById('classSelect').value;
  user.city = document.getElementById('city').value;
  user.phone = document.getElementById('phone').value;
  user.state = document.getElementById('state').value;
  user.district = document.getElementById('district').value;
  user.pincode = document.getElementById('pincode').value;

  if (!/^\d{6}$/.test(user.pincode)) {
    alert("Pincode must be exactly 6 digits.");
    return;
  }

  localStorage.setItem('loggedInUser', JSON.stringify(user));

  // Show popup
  document.getElementById("popupOverlay").classList.add("show");

  // Redirect after 5 seconds
  setTimeout(() => {
    window.location.href = "home.html";
  }, 5000);
}


function logout() {
  localStorage.removeItem('loggedInUser');
  window.location.href = 'home.html';
}
