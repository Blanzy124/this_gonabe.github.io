
var idr = 0;
fetch('http://152.67.231.147:1235/coments')
.then(res => res.json())
.then(coments => {
    const html = coments.map(coment => {
     idr = idr + 1;
     return `
            <div class="container-fluid mt-3">
                <div class="row ">
                    <h5 class="coment-name align-items-center d-flex justify-content-start col-3 col-sm-3 col-xl-3">${coment.name}</h5>
                    <h5 id="${idr}" class="coment-name align-items-center d-flex justify-content-start col-6 col-sm-6 col-xl-6">${idr}  ==  ${coment["bin_to_uuid(id)"]}</h5>
                    <h6 class="coment-age align-items-center d-flex justify-content-start col-3 col-sm-3 col-xl-3">${coment.age}</h6>
                    <p class="coment-text align-items-center d-flex justify-content-start col-12 col-lg-10">${coment.coment}</p>
                    <button id="delete-button-red" data-id="${coment["bin_to_uuid(id)"]}" type="button" class="btn btn-danger col-12 col-lg-2" disabled>Delete</button>
                </div>    
            </div>
            <hr class="coment-hr">
        `
 }).join('')
 document.querySelector('main').innerHTML = html;

})

document.addEventListener('click', function(event) {
if(event.target.matches('button.send-button')){
  


    const buttons = document.querySelectorAll('button.btn-danger');
            buttons.forEach(button => {
              button.disabled = false;
            });
            console.log('button send pressed') 


  }
});
document.addEventListener('click', function(event) {
 if (event.target && event.target.matches('button.btn-danger')) {
   const botonId = event.target.getAttribute('data-id');
   const deleteComent = async (id) => {
    try{
     const resp = await fetch(`http://152.67.231.147:1235/coments/${id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
    }
   
     )
     if(resp.ok){
      const coment = await resp.json()
      const comentStatus = coment["message"];
      if(comentStatus === `Coment has been deleted`){
        window.location.reload()
      }
      console.log(comentStatus)
      return comentStatus
     }
     else {
     const coment = await resp.json()
      const comentStatus = coment["message"];
      console.log(comentStatus)
      return comentStatus
     }
   
    } catch (error){
     if(error){
      console.log("error en el catch", error)
      return `"error en el catch", ${error}`
     }
    }
   }
   console.log(botonId)
   deleteComent(botonId).then(console.log(deleteComent()))
 }
});


//window.location.reload()
