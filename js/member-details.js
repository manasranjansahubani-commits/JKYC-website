import { db, auth } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Admin Security
onAuthStateChanged(auth, (user) => {

    if (!user || sessionStorage.getItem("adminLogin") !== "true") {
        window.location.href = "admin-login.html";
    }

});

// Member ID
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadMember() {

    if (!id) {
        alert("Member not found!");
        return;
    }

    const snap = await getDoc(doc(db, "members", id));

    if (!snap.exists()) {
        alert("Member not found!");
        return;
    }

    const d = snap.data();

    document.getElementById("fullName").textContent = d.fullName || "";
    document.getElementById("memberId").textContent = d.memberId || "";
    document.getElementById("fatherName").textContent = d.fatherName || "";
    document.getElementById("mobile").textContent = d.mobile || "";
    document.getElementById("email").textContent = d.email || "";
    document.getElementById("bloodGroup").textContent = d.bloodGroup || "";
    document.getElementById("occupation").textContent = d.occupation || "";
    document.getElementById("address").textContent = d.address || "";
    document.getElementById("dob").textContent = d.dob || "";

    document.getElementById("idCardBtn").href =
        `member-id.html?id=${id}`;

    document.getElementById("editBtn").href =
        `edit-member.html?id=${id}`;
}

loadMember();