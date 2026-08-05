import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const form = document.getElementById("galleryForm");
const galleryContainer = document.getElementById("galleryContainer");

async function loadGallery() {

    galleryContainer.innerHTML = "";

    const snapshot = await getDocs(collection(db, "gallery"));

    snapshot.forEach((docSnap) => {

        const data = docSnap.data();

        galleryContainer.innerHTML += `

        <div class="gallery-card">

            <img src="${data.imageURL}" alt="Gallery">

            <h3>${data.title || ""}</h3>

            <button onclick="deleteImage('${docSnap.id}')">
                Delete
            </button>

        </div>

        `;

    });

}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const image = document.getElementById("galleryImage").files[0];
    const title = document.getElementById("galleryTitle").value;

    if (!image) {

        alert("Select Image");

        return;

    }

    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "jkyc_upload");

    const response = await fetch(
        "https://api.cloudinary.com/v1_1/fcdkrkh4/image/upload",
        {
            method: "POST",
            body: formData
        }
    );

    const result = await response.json();

    await addDoc(collection(db, "gallery"), {

        imageURL: result.secure_url,
        title,
        createdAt: serverTimestamp()

    });

    alert("Image Uploaded Successfully");

    form.reset();

    loadGallery();

});

window.deleteImage = async function(id) {

    if (!confirm("Delete this image?")) return;

    await deleteDoc(doc(db, "gallery", id));

    alert("Image Deleted");

    loadGallery();

}

loadGallery();