import { apiUrl } from "./FETCHCONCTION.MJS";

export async function cookieVerify(name) {
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

export async function signOut() {
    const cookieId = await cookieVerify('cookieId')
    console.log(cookieId)
    const res = await fetch(`${apiUrl}/setCookie/${cookieId}`, {
        method: 'DELETE'
    })
    const cookieDelete = await res.json();
    console.log(cookieDelete)
    if(cookieDelete.message == "Cookie Has Been Delete"){
        document.cookie = `cookieId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        window.location.href = './index.html'
    }
    else{
        const signOutButton = document.getElementById('signOutBtn')
        signOutButton.classList.add('redColorBackground')
    }
}