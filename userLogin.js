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
   //window.location.href = './userLogin.html'
  }
  else{
   console.log(cookieVerification)
   const loginv = await fetch(`${apiUrl}/setcookie/${cookieVerification}`)
   let loginVerification = await loginv.json()
   if(loginVerification.message == 'true'){
    window.location.href = './index.html'
   }
   else{
    console.log(loginVerification, 'login')
    
   }
  }
 }
 loginVerification()

 

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
    console.log(userJson[0].name)
    const userNameCookie = { "userNameCookie": `${userJson[0].name}`}
    const resp = await fetch(`${apiUrl}/setcookie`, {
      method: 'post',
      credentials: "include",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userNameCookie)
    })
    const cookieId = await resp.json()
    console.log(cookieId)
    function createCookie(cookieId){
      let date = new Date();
      date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
      const expires = "expires" + date.toUTCString();
      document.cookie = `cookieId= ${cookieId}; ${expires}; path=/`
    }
    createCookie(cookieId)
    window.location.href = './blangym.html'
  }
 }
 userAutentication(userName, userPassword)
}
 }
})

