import { apiUrl } from "./FETCHCONCTION.JS";
import { cookieVerify } from "./reuse.js";


async function loginVerification() {
  let cookieVerification = await cookieVerify('cookieId')
  if(!cookieVerification){
   //window.location.href = './userLogin.html'
  }
  else{
   console.log(cookieVerification)
   const loginv = await fetch(`${apiUrl}/setcookie/${cookieVerification}`)
   let loginVerification = await loginv.json()
   if(loginVerification.message == 'true'){
    window.location.href = './index.html'
    let userName = await loginVerification.userName;
    return userName
   }
  }
}
loginVerification()
const userNameLV = await loginVerification()

document.getElementById('registerForm').addEventListener('submit', function(event) {
 event.preventDefault();
 document.getElementById('pricipalContainer').style.display = "none";
 const confirmationCode = document.getElementById('confirmationcode').value;

// if(confirmationCode){
//  const reqBody = { userEmail: }
//  const res = await fetch()
// }

});
//////////////

function showErrorPlace(message, elementId){
 document.getElementById(elementId).innerHTML = showErrorIn(message)

 function showErrorIn(message){
  return `<small class="red-alert ms-1">${message}</small>`
 }
}


function specialChatactersSerch(string){
 const specialChatacters = ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", 
  "+", ",", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", 
  "`", "{", "|", "}", "~"];
 const resu = specialChatacters.some(char => string.includes(char))
 console.log(resu)
 return resu
}