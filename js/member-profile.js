import { db } from "./firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function loadProfile() {

    if (!id) {
        alert("Member ID not found!");
        window.location.href = "members.html";
        return;
    }

    try {

        const docRef = doc(db, "members", id);
        const snap = await getDoc(docRef);

        if (!snap.exists()) {
            alert("Member not found!");
            window.location.href = "members.html";
            return;
        }

        const d = snap.data();

        document.getElementById("fullName").textContent = d.fullName || "";
        document.getElementById("memberId").textContent = d.memberId || "Not Generated";
        document.getElementById("occupation").textContent = d.occupation || "";
        
        const photo = document.getElementById("profilePhoto");

        if (d.photoURL) {
            photo.src = d.photoURL;
        } else {
            photo.src = "../images/default-user.png";
        }

    } catch (error) {

        console.error("Profile Error:", error);
        alert("Error loading member profile!");

    }

}

loadProfile();