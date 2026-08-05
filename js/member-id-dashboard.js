import { db } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

const table = document.getElementById("memberTable");
const searchInput = document.getElementById("searchInput");

let members=[];

async function loadMembers(){

    table.innerHTML="";

    const snapshot=await getDocs(collection(db,"members"));

    members=[];

    snapshot.forEach(docSnap=>{

        const data=docSnap.data();

        if(data.status==="Approved"){

            members.push({
                id:docSnap.id,
                ...data
            });

        }

    });

    displayMembers(members);

}

function displayMembers(data){

    table.innerHTML="";

    data.forEach(member=>{

        table.innerHTML+=`

<tr>

<td>

<img src="${member.photoURL}" alt="">

</td>

<td>${member.fullName}</td>

<td>${member.memberId}</td>

<td>${member.mobile}</td>

<td>

<a href="member-id.html?id=${member.id}">

<button class="view-btn">

View ID

</button>

</a>

<button
class="print-btn"
onclick="window.open('member-id.html?id=${member.id}')">

Print

</button>

</td>

</tr>

`;

    });

}

searchInput.addEventListener("keyup",()=>{

const value=searchInput.value.toLowerCase();

const filtered=members.filter(member=>

(member.fullName||"")
.toLowerCase()
.includes(value)

);

displayMembers(filtered);

});

loadMembers();