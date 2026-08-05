import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const table = document.getElementById("memberTable");
const totalMembers = document.getElementById("totalMembers");
const searchInput = document.getElementById("searchInput");

let members = [];

async function loadMembers() {

    table.innerHTML = "";

    const snapshot = await getDocs(collection(db, "members"));

    members = [];

    snapshot.forEach((docSnap) => {

        const data = docSnap.data();

        if (data.status === "Approved") {

            members.push({
                id: docSnap.id,
                ...data
            });

        }

    });

    totalMembers.innerText = members.length;

    displayMembers(members);

}

function displayMembers(data) {

    table.innerHTML = "";

    if (data.length === 0) {

        table.innerHTML = `
        <tr>
            <td colspan="6">No Members Found</td>
        </tr>
        `;

        return;
    }

    data.forEach(member => {

        table.innerHTML += `
        <tr>

        <td>
        <img src="${member.photoURL || '../images/user.png'}" width="60">
        </td>

        <td>${member.fullName || ""}</td>

        <td>${member.memberId || ""}</td>

        <td>${member.mobile || ""}</td>

        <td>${member.occupation || ""}</td>

        <td>

        <a href="member-details.html?id=${member.id}">
        <button class="view-btn">
        View
        </button>
        </a>

        <a href="edit-member.html?id=${member.id}">
        <button class="edit-btn">
        Edit
        </button>
        </a>

        <button
        class="delete-btn"
        onclick="deleteMember('${member.id}')">
        Delete
        </button>

        </td>

        </tr>
        `;

    });

}

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const filtered = members.filter(member =>
        (member.fullName || "")
        .toLowerCase()
        .includes(value)
    );

    displayMembers(filtered);

});

window.deleteMember = async function(id) {

    const ok = confirm("Delete this member?");

    if (!ok) return;

    await deleteDoc(doc(db, "members", id));

    alert("Member Deleted Successfully!");

    loadMembers();

}

loadMembers();