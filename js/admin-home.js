import { db, auth } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Login Check
onAuthStateChanged(auth, (user) => {
  if (!user || sessionStorage.getItem("adminLogin") !== "true") {
    window.location.href = "admin-login.html";
  }
});

// Logout
const logoutBtn = document.querySelector(".logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    await signOut(auth);
    sessionStorage.removeItem("adminLogin");

    window.location.href = "admin-login.html";
  });
}

// Dashboard Count
async function loadDashboard() {

  const members = await getDocs(collection(db, "members"));
  const notices = await getDocs(collection(db, "notices"));

  let total = 0;
  let pending = 0;
  let approved = 0;

  members.forEach(doc => {
    total++;

    const data = doc.data();

    if (data.status === "Pending") pending++;
    if (data.status === "Approved") approved++;
  });

  document.getElementById("totalMembers").innerText = total;
  document.getElementById("pendingMembers").innerText = pending;
  document.getElementById("approvedMembers").innerText = approved;
  document.getElementById("totalNotices").innerText = notices.size;
}

loadDashboard();