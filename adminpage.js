import { apiUrl } from "./FETCHCONCTION.JS";
import { signOut } from "./reuse.js";
import { cookieVerify } from "./reuse.js";
import { loginVerification } from "./reuse.js";

 loginVerification()
const userNameLV = await loginVerification()

var idr = 0;
fetch(`${apiUrl}/coments`)
.then(res => res.json())
.then(coments => {
    const html = coments.data.coments.map(coment => {
     idr = idr + 1;
     return `
            <div class="container-fluid mt-3">
                <div class="row ">
                    <h5 class="coment-name align-items-center d-flex justify-content-start col-3 col-sm-3 col-xl-3">${coment.name}</h5>
                    <h5 id="${idr}" class="coment-name align-items-center d-flex justify-content-start col-6 col-sm-6 col-xl-6">${idr}  ==  ${coment["bin_to_uuid(id)"]}</h5>
                    <h6 class="coment-age align-items-center d-flex justify-content-start col-3 col-sm-3 col-xl-3">${coment.age}</h6>
                    <p class="coment-text align-items-center d-flex justify-content-start col-12 col-lg-10">${coment.coment}</p>
                    <button id="delete-button-red" data-id="${coment["bin_to_uuid(id)"]}" type="button" class="btn btn-danger col-12 col-lg-2" disabled>Delete</button>
                </div>    
            </div>
            <hr class="coment-hr">
        `
 }).join('')
 document.querySelector('main').innerHTML = html;

})

document.addEventListener('click', function(event) {
if(event.target.matches('button.send-button')){
  const userName = document.getElementById('userName').value;
  const userPassword = document.getElementById('userPassword').value;
///////
  async function userAutentication(userName, userPassword){
    const resp = await fetch(`${apiUrl}/users?userName=${userName}&userPassword=${userPassword}`)
    const userJson = await resp.json();
   if(userJson.ok !== true){
    console.log('si lo detecto')
    console.log(userJson)
    return
   }
   if(resp.ok === false){
    console.log('Bad request ',resp.ok)
    return
   }
    else{
      const buttons = document.querySelectorAll('button.btn-danger');
      buttons.forEach(button => {
        button.disabled = false;
      });
      console.log('button send pressed') 


      return
    }
  }
  userAutentication(userName, userPassword)
}
});
/////

document.addEventListener('click', function(event) {
 if (event.target && event.target.matches('button.btn-danger')) {
   const botonId = event.target.getAttribute('data-id');
   const boton = document.querySelector(`[data-id='${botonId}']`);
   const deleteComent = async (id) => {
     boton.disabled = true;
    try{
     const resp = await fetch(`${apiUrl}/coments/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    }
   
     )
     if(resp.ok){
      const coment = await resp.json()
      if(coment.ok === true){
        window.location.reload()
      }
      return 
     }
     else {
      return
     }
   
    } catch (error){
     if(error){
      //console.log("error en el catch", error)
      return //`"error en el catch", ${error}`
     }
    }
   }
   console.log(botonId)
   deleteComent(botonId).then(console.log(deleteComent()))
 }
 
  if(event.target.matches('button.signout-btn')){
      signOut()
  }

});

//const deleteComent = async (id) => {
//  const botonId = event.target.getAttribute('data-id');
//  const boton = document.querySelector(`[data-id='${botonId}']`);
//  boton.disabled = true;
// try{
//  const resp = await fetch(`${apiUrl}/coments/${id}`, {
//   method: 'DELETE',
//   headers: {'Content-Type': 'application/json'},
// }
//
//  )
//  if(resp.ok){
//   const coment = await resp.json()
//   const comentStatus = coment["message"];
//   if(comentStatus === `Coment has been deleted`){
//     window.location.reload()
//   }
//   console.log(comentStatus)
//   return comentStatus
//  }
//  else {
//  const coment = await resp.json()
//   const comentStatus = coment["message"];
//   console.log(comentStatus)
//   return comentStatus
//  }
//
// } catch (error){
//  if(error){
//   console.log("error en el catch", error)
//   return `"error en el catch", ${error}`
//  }
// }
//}
//window.location.reload()
