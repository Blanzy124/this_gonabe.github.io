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
  const resp = await fetch(`http://152.67.231.147:1235/users?name=${userName}&userPassword=${userPassword}`)
  const userJson = await resp.json();
  console.log(userJson, 'wadwa')
 if(userJson.message === 'User do not exit, wrong user name or password'){
  console.log('si lo detecto')
  return
 }
 if(resp.ok === false){
  console.log('Bad request ',resp.ok)
  return
 }
  else{
    console.log('button send pressed', userJson) 
 
 
    return
  }
 }
 userAutentication(userName, userPassword)
}
 }
})

