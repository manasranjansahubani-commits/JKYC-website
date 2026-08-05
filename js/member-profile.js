import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Get Member ID
const params = new URLSearchParams(window.location.search);

let id = params.get("id");

// Backup method
if (!id) {
    const url = window.location.href;

    if (url.includes("?id=")) {
        id = url.split("?id=")[1];
    }
}

async function loadProfile() {

    if (!id || id.trim() === "") {
        alert("Member ID not found!");
        window.location.href = "members.html";
        return;
    }

    try {

        const snap = await getDoc(doc(db, "members", id));

        if (!snap.exists()) {
            alert("Member not found!");
            window.location.href = "members.html";
            return;
        }

        const d = snap.data();

        document.getElementById("fullName").textContent = d.fullName || "";
        document.getElementById("memberId").textContent = d.memberId || "";
        document.getElementById("occupation").textContent = d.occupation || "";

        const photo = document.getElementById("profilePhoto");

        photo.src = d.photoURL || "../images/default-user.png";

    } catch (err) {

        console.error(err);
        alert("Failed to load profile");

    }

}

loadProfile();