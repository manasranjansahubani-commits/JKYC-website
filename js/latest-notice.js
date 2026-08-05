import { db } from "./firebase.js";

import {
collection,
query,
orderBy,
limit,
getDocs
}
from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

async function loadLatestNotice(){

const q=query(
collection(db,"notices"),
orderBy("date","desc"),
limit(1)
);

const snap=await getDocs(q);

if(snap.empty) return;

const notice=snap.docs[0].data();

document.getElementById("latestNotice").style.display="block";

document.getElementById("noticeTitle").textContent=
notice.title;

}

loadLatestNotice();