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
            return
        }
        else{
            console.log(gymPostResponse)
            return
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
    return exercises
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
//Filter


document.getElementById("filterBy").addEventListener("change", function(e) {
    e.preventDefault();
    const filterOption = document.getElementById("filterBy").value;
    if(filterOption == "date"){
        document.getElementById("showFilterOptions").innerHTML = filterDate();
        filter('date')
        return
    }
    if(filterOption == "muscleGroup"){
        document.getElementById("showFilterOptions").innerHTML = filterMuscleGroup();
        filter('muscleGroup')
        return
    }
    else{
        document.getElementById('showFilterOptions').innerHTML = "";
    }

});

async function filter(filterChoosed){
    document.getElementById("filterButton").addEventListener("click", async function(e){
        e.preventDefault();

        if(filterChoosed == 'date'){
            const filterDateFrom = formatDate(document.getElementById('filterDateFrom').value);
            const filterDateTo = formatDate(document.getElementById('filterDateTo').value);
            const exercises = await addExerciseToTable();
            if(filterDateFrom && filterDateTo){
                const FDFs = filterDateFrom.split(" ");
                const FDFd = parseInt(FDFs[2]);
                const FDFy = parseInt(FDFs[3]);

                const FDTs = filterDateTo.split(" ");
                const FDTd = parseInt(FDTs[2]);
                const FDTy = parseInt(FDTs[3]);

                const aplyingFilter = exercises.map(exercise => {
                    const exerDate = exercise.date.split(" ");
                    const EXDd = parseInt(exerDate[2]);
                    const EXDy = parseInt(exerDate[3]);
                    //console.log(EXDy, FDFy, FDTy)
                    const FDFm = formatDateExplicit.months.indexOf(FDFs[1])
                    const FDTm = formatDateExplicit.months.indexOf(FDTs[1])
                    const EXDm = formatDateExplicit.months.indexOf(exerDate[1])

                    if(FSFd > FDTd){
                        if(EXDd >= FDFd && EXDd <= FDTd){
                            
                            if(EXDm >= FDFm && EXDm <= FDTm || EXDm >= FDFm && EXDm >= FDTm){
                            }

                            if(EXDy >= FDFy && EXDy <= FDTy ){

                                
                                console.log("filtro dia", exercise)
        
        
                                //console.log("filtro ano")
                            }
                            //console.log("filtro mes", formatDateExplicit.months.indexOf(FDFs[1]), formatDateExplicit.months.indexOf(FDTs[1]), formatDateExplicit.months[1])
                        }
                    }

                    if(EXDd >= FDFd && EXDd <= FDTd){

                        if(EXDm >= FDFm && EXDm <= FDTm || EXDm >= FDFm && EXDm >= FDTm){
                            if(EXDy >= FDFy && EXDy <= FDTy ){

                                
                                console.log("filtro dia", exercise)
        
        
                                //console.log("filtro ano")
                            }
                            //console.log("filtro mes", formatDateExplicit.months.indexOf(FDFs[1]), formatDateExplicit.months.indexOf(FDTs[1]), formatDateExplicit.months[1])
                        }
                    }

                })
            }

            return
        }
        if(filterChoosed == 'muscleGroup'){
            const muscleGroupFilter = document.getElementById('muscleGroupFilter').value;
            const exercises = await addExerciseToTable();
            const aplyingFilter = exercises.map(exercise => {
                if(muscleGroupFilter == exercise.muscleGroup){
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
                }
            }).join('');
            document.getElementById("exerciseTableBody").innerHTML = aplyingFilter;
            return
        }
    })
}



function filterDate(){
    return`
                        <div class="col-1 mt-3 d-flex justify-content-center align-items-center" id="">
                            <label for="filterLabel" class="text-color ">From:</label>
                        </div>
                        <div class="col-11 col-md-3 mt-3" id="filters">
                            <input type="date" class="form-control" id="filterDateFrom" required>
                        </div>
                        <div class="col-1 mt-3 d-flex justify-content-center align-items-center" id="">
                            <label for="filterLabel" class="text-color ">To:</label>
                        </div>
                        <div class="col-11 col-md-3 mt-3" id="">
                            <input type="date" class="form-control" id="filterDateTo" required>
                        </div>
                        <div class="col-12 col-md-3 ps-0 mt-3 d-flex justify-content-center align-items-center" id="filters">
                            <button type="button" class="btn btn-custom col-12 ps-0 pe-0 " id="filterButton">Filter</button>
                        </div>`
}
function filterMuscleGroup(){
    return`
                        <div class="col-11 col-md-3 mt-3" id="filters">
                            <select class="form-select" id="muscleGroupFilter" required>
                                <option value="">Muscle</option>
                                <option>Chest</option>
                                <option>Back</option>
                                <option>Legs</option>
                                <option>Shoulders</option>
                                <option>Arms</option>
                            </select>
                        </div>

                        <div class="col-12 col-md-3 ps-0 mt-3 d-flex justify-content-center align-items-center" id="filters">
                            <button type="button" class="btn btn-custom col-12 ps-0 pe-0 " id="filterButton">Filter</button>
                        </div>`
}


const formatDateExplicit = {
   // years: [2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040],
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        //days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
    };
    
    const cualquier = "Jan";
    const cualquier2= "Aug";

console.log()

console.log(formatDateExplicit.months[4])
