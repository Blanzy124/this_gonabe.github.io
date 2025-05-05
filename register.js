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
   if(loginVerification.message == true){
    window.location.href = './index.html'
    let userName = await loginVerification.data.userName;
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
 const userEmail = document.getElementById('useremail').value;
 if(userName && password && confirmPassword && userEmail){
   async function  createUser() {
     if(password !== confirmPassword){
       showErrorPlace('Password Do Not match!', 'showError')
       return
      }
      
      if(userName && password && confirmPassword && userEmail && password === confirmPassword){
        if(userName.length > 1 && userName.length <= 20){
          if(password.length >= 21){
            showErrorPlace('Max Characters 20.', 'showError')
            return
          } 
          if(specialChatactersSerch(userName) == true){
            showErrorPlace('No Special Characters.', "showErrorName")
            return
          }
          //     if(specialChatactersSerch(password) == true){ 
            //      showErrorPlace('No Special Characters.', "showError")
            //      return
            //     }
            else{
              const reqBody = { name: `${userName}`, userPassword: `${password}`, userEmail: `${userEmail}`}
              //console.log(JSON.stringify(reqBody))
              const res = await fetch(`${apiUrl}/users`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(reqBody)
              })
              const newUserCreataion = await res.json();
              if(newUserCreataion.ok !== true){
                showErrorPlace(`${newUserCreataion.message}`, "showError")
                return 
              }
              else{
                document.getElementById('registerForm').style.display = "none";
                document.getElementById('h2-card-title').style.display = "none";
                document.getElementById('back-to-login-button').style.display = "none";
                document.getElementById('innerHTML').innerHTML = confirmationHTML();

                setTimeout(() => {
                  document.getElementById('verifyForm').addEventListener('submit', async function(event1){
                    event1.preventDefault();
                      const userVerifyCode = document.getElementById('usercode').value;
                      const reqBody = { userEmail: `${userEmail}`, emailStatus: '1', userVerifyCode: `${userVerifyCode}` }
                      console.log(reqBody)
                      const res = await fetch(`${apiUrl}/email/setemailverification`, {
                        method: 'post',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(reqBody)
                      })
                      const verifyUser = await res.json();
                      if(verifyUser.ok !== true)
                        showErrorPlace(`${verifyUser.message}`, 'showErrorCode');
                      else{
                        window.location.href = './userLogin.html';
                      
                      }
                      return
                      
                  })


                }, 1000)
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



function specialChatactersSerch(string){
  const specialChatacters = ["!", '"', "#", "$", "%", "&", "'", "(", ")", "*", 
    "+", ",", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", 
    "`", "{", "|", "}", "~"];
    const resu = specialChatacters.some(char => string.includes(char))
    console.log(resu)
    return resu
  }
  
  function confirmationHTML(){
    return`  <h2 class="text-color card-title text-center mb-4" id="h2-card-title">Verify your email.</h2>
    <form id="verifyForm">
    <div class="mb-3">
    <label for="verificationcode" class="text-color form-label">We have sent a confirmation code to your email address, 
    take a look and type it in.</label><span class="showError" id="showErrorCode"></span>
    <input type="text" class="form-control custom-input" id="usercode" placeholder="Enter your code" required>
    </div>   
    <button type="submit" class="register-btn btn btn-primary w-100 mb-3 custom-btn">Verify</button>
    </form>
    <button class="btn btn-outline-secondary w-100 custom-btn" onclick="window.location.href='./userLogin.html'">Back to Login</button>`
  }
  
  
  //
  //function showErrorPlace(message, elementId){
  // document.getElementById(elementId).innerHTML = showErrorIn(message)
  //
  // function showErrorIn(message){
  //  return `<small class="red-alert ms-1">${message}</small>`
  // }
  //}