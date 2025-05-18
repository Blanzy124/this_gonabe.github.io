import { apiUrl } from "./FETCHCONCTION.JS";
import { JWTsave, POST, GET, signOut } from "./reuse.js";
import { cookieVerify } from "./reuse.js";
import { loginVerification } from "./reuse.js";
import { JWT } from "./reuse.js";
//loginVerification()
//const userNameLV = await loginVerification()


const socket = new WebSocket("wss://localhost:8443/foo");

//JWT()

socket.addEventListener("open", async (event) => {
  console.log('Opening...', event)
  socket.send("hola, sin JWT");
});
socket.addEventListener("message", async (event) => {
 const data = await event.data.text();
 document.getElementById('showMessage').innerHTML = innerH(data)
  console.log("Message from server ", data);
});

document.getElementById("send").addEventListener("click", function () {
 const message = document.getElementById("messageIn").value

 socket.send(message);
 document.getElementById("formIn").reset();

})


function innerH(data){ return`<span>${data}</span>`}

