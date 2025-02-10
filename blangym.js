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
  }
  else{
   console.log(loginVerification, 'login')
   
  }
 }
}
loginVerification()

document.getElementById('exerciseForm').addEventListener('submit', function(e) {
 e.preventDefault();
 
 const date = document.getElementById('date').value;
 const muscleGroup = document.getElementById('muscleGroup').value;
 const weight = document.getElementById('weight').value;
 const reps = document.getElementById('reps').value;
 const rest = document.getElementById('rest').value;
 const notes = document.getElementById('notes').value;

 if(date && muscleGroup && weight && reps && rest) {
     addExerciseToTable(date, muscleGroup, weight, reps, rest, notes);
     saveToLocalStorage();
     this.reset();
 }
});
/////////
function addExerciseToTable(date, muscle, weight, reps, rest, notes) {
 const tbody = document.getElementById('exerciseTableBody');
 const row = document.createElement('tr');
 
 row.innerHTML = `
     <td>${formatDate(date)}</td>
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

function deleteExercise(btn) {
 const row = btn.closest('tr');
 row.remove();
 saveToLocalStorage();
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
function saveToLocalStorage() {
 const rows = Array.from(document.querySelectorAll('#exerciseTableBody tr')).map(row => {
     return {
         date: row.cells[0].dataset.rawDate || new Date().toISOString().split('T')[0],
         muscle: row.cells[1].textContent,
         weight: row.cells[2].textContent,
         reps: row.cells[3].textContent,
         rest: row.cells[4].textContent,
         notes: row.cells[5].textContent
     };
 });
 localStorage.setItem('exercises', JSON.stringify(rows));
}

function loadFromLocalStorage() {
 const exercises = JSON.parse(localStorage.getItem('exercises')) || [];
 exercises.forEach(ex => {
     addExerciseToTable(ex.date, ex.muscle, ex.weight, ex.reps, ex.rest, ex.notes);
 });
}

window.addEventListener('load', loadFromLocalStorage);