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
 const userName = document.getElementById('username').value;
 const password = document.getElementById('password').value;
 const confirmPassword = document.getElementById('confirmPassword').value;
 if(userName && password && confirmPassword){
  async function  createUser() {
   if(password !== confirmPassword){
    showErrorPlace('Password Do Not match!', 'showError')
    return
   }
  
   if(userName && password && confirmPassword && password === confirmPassword){
    if(userName.length > 1 && userName.length <= 20){
     if(password.length >= 21){
       showErrorPlace('Max Characters 20.', 'showError')
       return
     } 
     if(specialChatactersSerch(userName) == true){
      showErrorPlace('No Special Characters.', "showErrorName")
      return
     }
     if(specialChatactersSerch(password) == true){
      showErrorPlace('No Special Characters.', "showError")
      return
     }
    else{
      const reqBody = { name: `${userName}`, userPassword: `${password}`}
      console.log(JSON.stringify(reqBody))
      const res = await fetch(`${apiUrl}/users`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(reqBody)
      })
      const newUserCreataion = await res.json();
      if(newUserCreataion.ok !== "true" ){
        showErrorPlace(`${newUserCreataion.message}`, "showError")
        return 
      }
      else{
        window.location.href = './userLogin.html';
        return
      }
    }
    }

    if(userName.length >= 21){
     showErrorPlace('Max Characters 20.', 'showErrorName')
     return
    } 
   }

   else{
    showErrorPlace('Must fill everythin!', 'showError')
    return
   }
  
  }
  createUser()
 }
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



