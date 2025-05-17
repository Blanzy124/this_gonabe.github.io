import { apiUrl } from "./FETCHCONCTION.JS";

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
    if(cookieDelete.ok === true){
        document.cookie = `cookieId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        window.location.href = './index.html'
    }
    else{
        const signOutButton = document.getElementById('signOutBtn')
        signOutButton.classList.add('redColorBackground')
    }
}

export function showErrorPlace(message, elementId){
    document.getElementById(elementId).innerHTML = showErrorIn(message)
   
    function showErrorIn(message){
     return `<small class="red-alert ms-1">${message}</small>`
    }
   }

export async function loginVerification() {
    let cookieVerification = await cookieVerify('cookieId')
    if(!cookieVerification){
     window.location.href = './userLogin.html'
    }
    else{
     console.log(cookieVerification)
     const res = await fetch(`${apiUrl}/setcookie/${cookieVerification}`)
     let loginVerification = await res.json()
   
     if(loginVerification.ok == false){
      window.location.href = './userLogin.html';
      let userName = null;
      return userName
     }
     else{
       let userName = await loginVerification.data.userName;
      return userName
      
     }
    }
}

export async function JWTsave( cookieId ){
    const body = { cookieId }
    const JWTf = await fetch(`${apiUrl}/tokens/jwtrefresh`, {
      method: "POST",
      credentials: "include",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    const JWT = await JWTf.json()
    if(JWT.ok === false){ return window.location.href = './userLogin.html'};
    localStorage.setItem("token", JWT);
}

export async function JWT() {
    const token = localStorage.getItem("token");
    if(!token || Date.now() > new Date(JSON.parse(atob(token.split('.')[1])).exp * 1000)){ 
        const cookieId = cookieVerify('cookieId');
        await JWTsave(cookieId);
        return localStorage.getItem("token");
    }
    return token;
}

export class request {
    constructor(url){
        this.url = url;
    }
}
export class GET extends request {
    method = "GET";
    responseJson;
    constructor(url, headers){
        super(url);
        this.headers = headers;
    }
    async getJson(){ return this.responseJson}

    async setGET(){
                    const res = await fetch(this.url, {
                    method: this.method,
                    headers: this.headers} ) 

                    this.responseJson = await res.json();
    }
}

export class POST extends request {
    method = "POST";
    responseJson;
    constructor(url, body, headers){
        super(url);
        this.body = body;
        this.headers = headers
    }
    
    async getJson(){ return this.responseJson}

    async setPOST(){  const res = await fetch(this.url, {
                    method: this.method,
                    headers: this.headers,
                    body: JSON.stringify(this.body)} ) 

                    this.responseJson = await res.json();
                }         
}


//MUST MAKE JWT REFRESH