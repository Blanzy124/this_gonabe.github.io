import { apiUrlWS } from "./FETCHCONCTION.JS";
import { JWTsave, POST, GET, signOut } from "./reuse.js";
import { cookieVerify } from "./reuse.js";
import { loginVerification } from "./reuse.js";
import { JWT } from "./reuse.js";
loginVerification()  
const userNameLV = await loginVerification()
//?token=${await JWT()

const socket = new WebSocket(`${apiUrlWS}/foo?token=${await JWT()}`);


socket.addEventListener("open", async (event) => {
  const message = `${userNameLV} is connected`
  const data = { message: message, from: userNameLV , to: messageTo || "nobody"};
  console.log('Connected')
  socket.send(JSON.stringify(data));
});
socket.addEventListener("message", async (event) => {
  const d = await event.data;
  const data = JSON.parse(d)
  console.log(data)
 document.getElementById('showMessage').innerHTML = innerH(data.message)
  console.log("Message from server ", data);
});

document.getElementById("send").addEventListener("click", function () {
 const message = document.getElementById("messageIn").value;
 const messageTo = document.getElementById("messageTo").value;
  const data = { message: message, from: userNameLV , to: messageTo || "nobody"}
 socket.send(JSON.stringify(data));
 document.getElementById("formIn").reset();

})


function innerH(data){ return`<span>${data}</span>`}

 