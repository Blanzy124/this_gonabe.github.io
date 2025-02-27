import { apiUrl } from "./FETCHCONCTION.JS";
import { signOut } from "./reuse.js";
import { cookieVerify } from "./reuse.js";


async function loginVerification() {
 let cookieVerification = await cookieVerify('cookieId')
 if(!cookieVerification){
  window.location.href = './userLogin.html'
 }
 else{
  console.log(cookieVerification)
  const res = await fetch(`${apiUrl}/setcookie/${cookieVerification}`)
  let loginVerification = await res.json()

  if(loginVerification.message == 'false'){
   window.location.href = './userLogin.html'
   let userName = null;
   return userName
  }
  else{
    let userName = await loginVerification.userName;
   return userName
   
  }
 }
}
loginVerification()
const userNameLV = await loginVerification()
/////////////////

addExerciseToTable()

/////////////////
document.getElementById('exerciseForm').addEventListener('submit', function(e) {
 e.preventDefault();
 const dateG = document.getElementById('date').value;
 const muscleGroup = document.getElementById('muscleGroup').value;
 const weight = parseFloat(document.getElementById('weight').value);
 const reps = parseInt(document.getElementById('reps').value);
 const rest = parseFloat(document.getElementById('rest').value);
 const notes = document.getElementById('notes').value;

 if(dateG && muscleGroup && weight && reps && rest) {
    const date = formatDate(dateG);
    async function addExercisesToDB() {
        const reqBody = { 
        userName: `${userNameLV}`, 
        date: `${date}`, 
        muscleGroup: `${muscleGroup}`, 
        weight: weight, 
        reps: reps,
        rest: rest,
        notes: `${notes}`
        }
        const resp = await fetch(`${apiUrl}/blangym?userName=${userNameLV}`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(reqBody)
        }
        )
        const gymPostResponse = await resp.json()
        console.log(gymPostResponse)
        if(gymPostResponse.message == "blanGym Post Success"){
            window.location.reload(true)
        }
        else{
            console.log(gymPostResponse)
        }   
    }

    addExercisesToDB()
 }
});
/////////
document.addEventListener('click', function(event) {
    if (event.target && event.target.matches('button.btn-danger')) {
        exerciseDelete()
    }

    if(event.target.matches('button.signout-btn')){
        signOut()
    }

});
///////////////////////
async function  exerciseDelete() {
    const botonId = event.target.getAttribute('id');
    const boton = document.getElementById(`${botonId}`);
    console.log(botonId)
    boton.disabled = true;

    const res = await fetch(`${apiUrl}/blangym/${botonId}`, {
        method: 'DELETE'
    })
    const exerciseDeleted = await res.json();
    if(exerciseDeleted.message !== "Exercise Has Been Deleted"){
        console.log(exerciseDelete)
    }
    else{
        //const confirmationDelete = document.querySelector(`#${botonId}`)
        boton.classList.add('deleteGreenBoton')
        
    }
}

async function addExerciseToTable() {
    const res = await fetch(`${apiUrl}/blangym?userName=${userNameLV}`)
    const exercises = await res.json();
    const addExerciseTable = exercises.map(exercise => {
        return `
    <tr >
     <td class="tr text-color">${exercise.date}</td>
     <td class="tr text-color">${exercise.muscleGroup}</td>
     <td class="tr text-color">${exercise.weight}</td>
     <td class="tr text-color">${exercise.reps}</td>
     <td class="tr text-color">${exercise.rest}</td>
     <td class="tr text-color">${exercise.notes || '-'}</td>
     <td class="tr text-color">
         <button id="${exercise['bin_to_uuid(exerciseId)']}" class="btn btn-sm btn-danger">Delete</button>
     </td>
    </tr>`
    }).join('')
    document.getElementById('exerciseTableBody').innerHTML = addExerciseTable
}

function formatDate(dateString) {
 const date = new Date(dateString + "T00:00:00");
 return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
     month: 'short',
     day: 'numeric'
 });
}
//////////////////////////







