import { apiUrl } from "./FETCHCONCTION.JS";
import { signOut } from "./reuse.js";
import { cookieVerify } from "./reuse.js";
import { loginVerification } from "./reuse.js";

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
        if(gymPostResponse.ok === true){
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
    if(exerciseDeleted.ok !== true){
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

    const addExerciseTable = exercises.data.exercises.map(exercise => {
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
    return exercises.data.exercises
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


document.getElementById("filterBy").addEventListener("change", async function(e) {
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
    if(filterOption == "note"){
        document.getElementById("showFilterOptions").innerHTML = noteFilter();
        filter('note')
        return
    }
    else{
        document.getElementById('showFilterOptions').innerHTML = "";
        const exercises = await addExerciseToTable();
        const allExercises = exercises.data.exercises.map(exercise => exerciseShowEstructure(exercise)).join("");
        document.getElementById('exerciseTableBody').innerHTML = allExercises;
    }

});

async function filter(filterChoosed){
    document.getElementById("filterButton").addEventListener("click", async function(e){
        e.preventDefault();

        if (filterChoosed == 'date') {
            const filterDateFrom = document.getElementById('filterDateFrom').value;
            const filterDateTo = document.getElementById('filterDateTo').value;
            const exercises = await addExerciseToTable();
        
            if (filterDateFrom && filterDateTo) {
                // Convertir las fechas a objetos Date
                const fromDate = new Date(filterDateFrom);
                const toDate = new Date(filterDateTo);
        
                const filteredExercises = exercises.filter(exercise => {
                    const exerciseDate = new Date(exercise.date);
                    return exerciseDate >= fromDate && exerciseDate <= toDate;
                }).map(exercise => `
                    <tr>
                     <td class="tr text-color">${exercise.date}</td>
                     <td class="tr text-color">${exercise.muscleGroup}</td>
                     <td class="tr text-color">${exercise.weight}</td>
                     <td class="tr text-color">${exercise.reps}</td>
                     <td class="tr text-color">${exercise.rest}</td>
                     <td class="tr text-color">${exercise.notes || '-'}</td>
                     <td class="tr text-color">
                         <button id="${exercise['bin_to_uuid(exerciseId)']}" class="btn btn-sm btn-danger">Delete</button>
                     </td>
                    </tr>`).join("");
                document.getElementById("exerciseTableBody").innerHTML = filteredExercises;
            }
        
            return;
        }
        if(filterChoosed == 'muscleGroup'){
            const muscleGroupFilter = document.getElementById('muscleGroupFilter').value;
            const exercises = await addExerciseToTable();
            const aplyingFilter = exercises.map(exercise => {
                if(muscleGroupFilter == exercise.muscleGroup){
                        return exerciseShowEstructure(exercise)
                }
            }).join('');
            document.getElementById("exerciseTableBody").innerHTML = aplyingFilter;
            return
        }
        if(filterChoosed == 'note'){
            const exercises = await addExerciseToTable();
            const userFilterInput = document.getElementById("notesFilter").value;         
            const notesFilter = exercises.filter(exercise => exercise.notes.toLowerCase().includes(`${userFilterInput.toLowerCase()}`))
            .map(exercise => exerciseShowEstructure(exercise)).join("")
            document.getElementById("exerciseTableBody").innerHTML = notesFilter;
        }
    })
}


function exerciseShowEstructure(exercise){
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
function noteFilter(){
    return`
                        <div class="col-11 col-md-3 mt-3" id="filters">
                            <input type="text" class="form-control " id="notesFilter" placeholder="Filter by notes">
                            </select>
                        </div>

                        <div class="col-12 col-md-3 ps-0 mt-3 d-flex justify-content-center align-items-center" id="filters">
                            <button type="button" class="btn btn-custom col-12 ps-0 pe-0 " id="filterButton">Filter</button>
                        </div>`
}
//const palabras = ["gato", "perro", "elefante", "águila", "ratón"];
//const conLetraE = palabras.filter(palabra => palabra.includes(""));


