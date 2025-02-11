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

var idr = 0;
fetch(`${apiUrl}/coments`)
.then(res => res.json())
.then(coments => {
    const html = coments.map(coment => {
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
    const resp = await fetch(`${apiUrl}/users?name=${userName}&userPassword=${userPassword}`)
    const userJson = await resp.json();
   if(userJson.message === 'User do not exit, wrong user name or password'){
    console.log('si lo detecto')
    return
   }
   if(resp.ok === false){
    console.log('Bad request ',resp.ok)
    return
   }
    else{
      console.log(userJson[0].name, userJson[0].userStatus)
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
   boton.disabled = true;

   const deleteComent = async (id) => {
    try{
     const resp = await fetch(`${apiUrl}/coments/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    }
   
     )
     if(resp.ok){
      const coment = await resp.json()
      const comentStatus = coment["message"];
      if(comentStatus === `Coment has been deleted`){
        //window.location.reload()
      }
      console.log(comentStatus)
      return comentStatus
     }
     else {
     const coment = await resp.json()
      const comentStatus = coment["message"];
      console.log(comentStatus)
      return comentStatus
     }
   
    } catch (error){
     if(error){
      console.log("error en el catch", error)
      return `"error en el catch", ${error}`
     }
    }
   }
   console.log(botonId)
   deleteComent(botonId).then(console.log(deleteComent()))
 }
});


//window.location.reload()
