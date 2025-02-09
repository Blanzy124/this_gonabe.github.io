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
