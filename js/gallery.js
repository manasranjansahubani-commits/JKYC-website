import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const galleryContainer = document.getElementById("galleryContainer");

async function loadGallery() {

  if (!galleryContainer) return;

  galleryContainer.innerHTML = "";

  const q = query(
    collection(db, "gallery"),
    orderBy("createdAt", "desc"),
    limit(6)
  );

  const snapshot = await getDocs(q);

  snapshot.forEach((docSnap) => {

    const data = docSnap.data();

    galleryContainer.innerHTML += `
      <div class="gallery-card">
        <img src="${data.imageURL}" alt="${data.title}">
      </div>
    `;

  });

}

loadGallery();