import { apiUrl } from "./FETCHCONCTION.JS";
import { JWTsave, POST, GET, signOut } from "./reuse.js";
import { cookieVerify } from "./reuse.js";
import { loginVerification } from "./reuse.js";
import { JWT } from "./reuse.js";
loginVerification()  
const userNameLV = await loginVerification()
//?token=${await JWT()

const socket = new WebSocket(`wss://localhost:8443/foo?token=${await JWT()}`);


socket.addEventListener("open", async (event) => {
  console.log('Connected')
  socket.send(`${userNameLV} is connected`);
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

