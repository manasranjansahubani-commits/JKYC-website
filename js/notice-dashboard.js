import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy,
    limit
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const noticeBox = document.getElementById("latestNotice");

async function loadLatestNotice() {

    try {

        const q = query(
            collection(db, "notices"),
            orderBy("createdAt", "desc"),
            limit(1)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            noticeBox.innerHTML = "No Notice Available";
            return;
        }

        snapshot.forEach(doc => {

            const data = doc.data();

            noticeBox.innerHTML = `
<b>${data.title}</b> — ${data.description} (${data.date})
`;
        });

    } catch (error) {

        console.log(error);

        noticeBox.innerHTML = "No Notice Available";

    }

}

loadLatestNotice();