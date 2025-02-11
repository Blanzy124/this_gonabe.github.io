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
  const loginv = await fetch(`${apiUrl}/setcookie/${cookieVerification}`)
  let loginVerification = await loginv.json()

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
    async function addExercisesToDB() {
        const reqBody = { 
        userName: `${userNameLV}`, 
        date: `${dateG}`, 
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
        
    }
    addExercisesToDB()
     //addExerciseToTable(dateG, muscleGroup, weight, reps, rest, notes);

     //this.reset();
 }
});
/////////
function addExerciseToTable(dateG, muscle, weight, reps, rest, notes) {
 const tbody = document.getElementById('exerciseTableBody');
 const row = document.createElement('tr');
 
 row.innerHTML = `
     <td>${formatDate(dateG)}</td>
     <td>${muscle}</td>
     <td>${weight}</td>
     <td>${reps}</td>
     <td>${rest}</td>
     <td>${notes || '-'}</td>
     <td>
         <button class="btn btn-sm btn-danger" onclick="deleteExercise(this)">Delete</button>
     </td>
 `;
 
 tbody.appendChild(row);
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