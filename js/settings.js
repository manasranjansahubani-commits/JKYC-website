import { db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const form = document.getElementById("settingsForm");

const clubName = document.getElementById("clubName");
const clubAddress = document.getElementById("clubAddress");
const clubMobile = document.getElementById("clubMobile");
const clubEmail = document.getElementById("clubEmail");
const clubWebsite = document.getElementById("clubWebsite");
const facebook = document.getElementById("facebook");
const instagram = document.getElementById("instagram");
const youtube = document.getElementById("youtube");

// =============================
// Load Settings
// =============================

async function loadSettings() {

    try {

        const snap = await getDoc(doc(db, "settings", "website"));

        if (snap.exists()) {

            const data = snap.data();

            clubName.value = data.clubName || "";
            clubAddress.value = data.clubAddress || "";
            clubMobile.value = data.clubMobile || "";
            clubEmail.value = data.clubEmail || "";
            clubWebsite.value = data.clubWebsite || "";
            facebook.value = data.facebook || "";
            instagram.value = data.instagram || "";
            youtube.value = data.youtube || "";

        }

    } catch (error) {

        console.error(error);

    }

}

loadSettings();

// =============================
// Save Settings
// =============================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        await setDoc(doc(db, "settings", "website"), {

            clubName: clubName.value.trim(),
            clubAddress: clubAddress.value.trim(),
            clubMobile: clubMobile.value.trim(),
            clubEmail: clubEmail.value.trim(),
            clubWebsite: clubWebsite.value.trim(),
            facebook: facebook.value.trim(),
            instagram: instagram.value.trim(),
            youtube: youtube.value.trim()

        });

        alert("✅ Settings Saved Successfully!");

    } catch (error) {

        console.error(error);

        alert("❌ Failed to Save Settings");

    }

});