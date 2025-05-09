import { apiUrl } from "./FETCHCONCTION.JS";
import { cookieVerify } from "./reuse.js";
import { showErrorPlace } from "./reuse.js";

async function loginVerification() {
  let cookieVerification = await cookieVerify('cookieId')
  if(!cookieVerification){
   //window.location.href = './userLogin.html'
  }
  else{
   console.log(cookieVerification)
   const loginv = await fetch(`${apiUrl}/setcookie/${cookieVerification}`)
   let loginVerification = await loginv.json()
   if(loginVerification.ok === true){
    window.location.href = './index.html'
    let userName = await loginVerification.userName;
    return userName
   }
  }
}
const userNameLV = await loginVerification()
 

document.addEventListener('click', function(event) {
 if(event.target.matches('button.btn-primary')){
  const userName = document.getElementById('userName').value;
  const userPassword = document.getElementById('userPassword').value;
  if(!userName || !userPassword){
   console.log('funciono')
   return

  }
  else{
  event.preventDefault()
 async function userAutentication(userName, userPassword){
  const body = { userName: userName, userPassword: userPassword}
  const resp = await fetch(`${apiUrl}/users/login`,{
    method: "POST",
    credentials: "include",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  })
  const userJson = await resp.json();
  if(resp.ok === false){
   console.log('Bad request ', resp.ok)
   return
  }
 if(userJson.errorCode == 513){
  window.location.href = "./emailVerification.html"
  return
 }
 if(userJson.ok !== true){
  showErrorPlace(userJson.message, "showErrorSingIn")
  return
 }
  else{
    const userNameCookie = { "userNameCookie": `${userJson.data.name}`} ///IM HERE
    const resp = await fetch(`${apiUrl}/setcookie`, {
      method: 'post',
      credentials: "include",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userNameCookie)
    })

    const cookie = await resp.json()
    if(cookie.ok !== true){

    }
    else{
      console.log(cookie, "hgo")
      function createCookie(cookie){
        let date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = `cookieId= ${cookie.data.cookieId}; ${expires}; path=/`
      }
  
      createCookie(cookie)
      window.location.href = './blangym.html'

    }
  }
 }
 userAutentication(userName, userPassword)
}
 }
})

