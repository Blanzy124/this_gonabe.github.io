const cookies = document.cookie;
console.log(cookies)

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
  const resp = await fetch(`http://localhost:1235/users?name=${userName}&userPassword=${userPassword}`)
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
    const setCookie = async () => {
      try {
        const resp = await fetch('http://localhost:1235/setCookie', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ userNameCookie: userName })
        });
        if (resp.ok) {
          const show = await resp.json();
          console.log(show[0])
          //window.location.href = "./blangym.html"
        } else {
          console.error('Error en la solicitud:', resp.status, resp.statusText);
        }
      } catch (error) {
        console.log('Error en el fetch:', error);
      }
    };
    setCookie();
    return
  }
 }
 userAutentication(userName, userPassword)
}
 }
})

