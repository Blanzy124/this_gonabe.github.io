document.getElementById('registerForm').addEventListener('submit', function(event) {
 event.preventDefault();
 const userName = document.getElementById('username').value;
 const password = document.getElementById('password').value;
 const confirmPassword = document.getElementById('confirmPassword').value;
 if(userName && password && confirmPassword){
  async function  createUser() {
   console.log('hola')
  
   if(password !== confirmPassword){
    showErrorPlace('Password do not match!')
    return
   }
  
   if(userName && password && confirmPassword && password === confirmPassword){
    console.log('probando')
    return
   }
   else{
    showErrorPlace('Must fill everythin!')
    return
   }
  
  }
  createUser()
 }
});
//////////////

function showErrorPlace(message){
 document.getElementById('showError').innerHTML = showErrorIn(message)
 function showErrorIn(message){
  return `<small class="red-alert ms-1">${message}</small>`
 }
}



