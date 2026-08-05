import { db, auth } from "./firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

onAuthStateChanged(auth, async (user) => {

  if (!user || sessionStorage.getItem("adminLogin") !== "true") {
    window.location.href = "admin-login.html";
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("Member ID not found!");
    window.location.href = "admin.html";
    return;
  }

  try {

    const snap = await getDoc(doc(db, "members", id));

    if (!snap.exists()) {
      alert("Member not found!");
      window.location.href = "admin.html";
      return;
    }

    const d = snap.data();

    document.getElementById("profilePhoto").src =
      d.photoURL || "../images/default-user.png";

    document.getElementById("fullName").textContent =
      d.fullName || "";

    document.getElementById("memberId").textContent =
      d.memberId || "";

    document.getElementById("fatherName").textContent =
      d.fatherName || "";

    document.getElementById("mobile").textContent =
      d.mobile || "";

    document.getElementById("email").textContent =
      d.email || "";

    document.getElementById("bloodGroup").textContent =
      d.bloodGroup || "";

    document.getElementById("occupation").textContent =
      d.occupation || "";

    document.getElementById("address").textContent =
      d.address || "";

    document.getElementById("dob").textContent =
      d.dob || "";

    document.getElementById("idCardBtn").href =
      `member-id.html?id=${id}`;

    document.getElementById("editBtn").href =
      `edit-member.html?id=${id}`;

  } catch (err) {

    console.error(err);
    alert("Failed to load member details.");

  }

});