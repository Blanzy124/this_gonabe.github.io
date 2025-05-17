const socket = new WebSocket("wss://localhost:8443/foo");

const show = document.getElementById('showMessage');

socket.addEventListener("open", async (event) => {
 //const data =  await event.data.text();
 console.log(`User number : ${event}`)
  socket.send("Hello Server!");
});
socket.addEventListener("message", async (event) => {
 const data = await event.data.text();
 show.innerHTML = innerH(data)
  console.log("Message from server ", data);
});

document.getElementById("send").addEventListener("click", function () {
 const message = document.getElementById("messageIn").value

 socket.send(message);
 document.getElementById("formIn").reset();

})


function innerH(message){ return
 `<span>${message}</span>`
}

