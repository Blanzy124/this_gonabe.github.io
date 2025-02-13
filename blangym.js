import { apiUrl } from "./FETCHCONCTION.MJS";
async function cookieVerify(name) {
 let cookieName = name + '=';
 let cookies = document.cookie.split('; ');
 for(let i = 0; i < cookies.length; i++){
  let c = cookies[i].trim();
  if(c.indexOf(cookieName) === 0){
   return c.substring(cookieName.length, c.length)
  }
 }
 return null
} 

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
async function addExerciseToTable() {
    const res = await fetch(`${apiUrl}/blangym?userName=${userNameLV}`)
    const exercises = await res.json()
    console.log(exercises)
    const addExerciseTable = exercises.map(exercise => {
        return `
    <tr>
     <td>${exercise.date}</td>
     <td>${exercise.muscleGroup}</td>
     <td>${exercise.weight}</td>
     <td>${exercise.reps}</td>
     <td>${exercise.rest}</td>
     <td>${exercise.notes || '-'}</td>
     <td>
         <button id="${exercise['bin_to_uuid(exerciseId)']}" class="btn btn-sm btn-danger" onclick="deleteExercise(this)">Delete</button>
     </td>
    </tr>`
    }).join('')
    document.getElementById('exerciseTableBody').innerHTML = addExerciseTable
}
addExerciseToTable()


async function  exerciseDelete(exerciseId) {
    const res = await fetch(`${apiUrl}/blangym/${exerciseId}`)
    
}

function formatDate(dateString) {
 const date = new Date(dateString);
 return date.toLocaleDateString('en-US', {
     year: 'numeric',
     month: 'short',
     day: 'numeric'
 });
}
//////////







