import { apiUrl } from "./FETCHCONCTION.JS";
// Animation for the 3 boxes starts
const cookies = document.cookie;
console.log(cookies)

const resus = document.querySelectorAll('.resume');

function onAnimation(entries) {
  entries.forEach(entry => {
    entry.target.classList.toggle('unset', entry.isIntersecting);
  });
}
const options ={
  root: null,
  rootMargin: '0px',
  threshold: 0.1
}

const observer = new IntersectionObserver(onAnimation, options);

resus.forEach(resu =>{
  observer.observe(resu);
})
//ESTE SE PUEDE USAR PARA IMAGENES!
//const resus = document.querySelectorAll('.resume');
//
//function onAnimation(entries){
//  entries.forEach(entry =>{
//    const resu = entry.target.querySelector('div');
//  
//    resu.classList.toggle('unset', entry.isIntersecting);
//  })
//}
//
//const options ={
//  root: null,
//  rootMargin: '0px',
//  threshold: 1
//}
//
//const observer = new IntersectionObserver(onAnimation, options);
//
//resus.forEach(resu =>{
//  observer.observe(resu);
//})

// Animation for the 3 boxes ends



//Calculator starts
function guardar_operacion(operacion){
 localStorage.setItem('operacionSelecionada', operacion)
}

function calcular(){
 var operacion = localStorage.getItem('operacionSelecionada');

 var pn = parseFloat(document.getElementById('pn').value);

 var sn =  parseFloat(document.getElementById('sn').value);


 if (isNaN(pn) || isNaN(sn)){
   document.getElementById('invalid').textContent = ('!You must put 2 numbers!')
 }

 switch (operacion){
   case 'suma':{
     var resultado = pn + sn; break;}

   case 'rest':{
     var resultado = pn - sn; break;}

   case 'mult':{
     var resultado = pn * sn; break;}

   case 'divi':{
     if (sn === 0){
       document.getElementById('invalid').textContent = '!Error, you can`t divide by 0!';
       return;
     }
     var resultado = pn / sn; break;}

 }

     
   if (isNaN(resultado)){
     document.getElementById('resultado').textContent = '!Enter the numbers!'
   }
   else {
     document.getElementById('resultado').textContent = resultado;
   }

   
//History of Calculator starts
hresultados.push(resultado);
var shoHis = document.getElementById('result-operation');
var tu = document.createElement('p');
tu.textContent = chi++ + ' | ' +  String(hresultados[hresultados.length - 1]);
shoHis.appendChild(tu);
}
var chi = 1;
var hresultados = [];


//Histor of calculator ends
//Calculators ends

fetch(`${apiUrl}/coments`)
.then(res => res.json())
.then(coments => {
    const html = coments.map(coment => {
     return `
            <div class="container-fluid mt-3">
                <div class="row ">
                    <h5 class="coment-name text-color align-items-center d-flex justify-content-start col-4 col-sm-4 col-xl-2">${coment.name}</h5>
                    <h6 class="coment-age text-color align-items-center d-flex justify-content-start col-8 col-sm-8 col-xl-10">${coment.age}</h6>
                    <p class="coment-text text-color align-items-center d-flex justify-content-start col-12">${coment.coment}</p>
                </div>    
            </div>
            <hr class="coment-hr">
        `
 }).join('')
 document.querySelector('main').innerHTML = html
})

document.getElementById('miFormulario').addEventListener('submit', function(event) {
  event.preventDefault()
  const nombre = document.getElementById('nombre').value;
  const edad = parseInt(document.getElementById('edad').value);
  const comentario = document.getElementById('comentario').value;

  const newComent = {
    "coment": comentario,
    "name": nombre,
    "age": edad
  };

  const postComent = async () => {
    try {
      const resp = await fetch('${apiUrl}/coments', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newComent)
      });
      if (resp.ok) {
        const show = await resp.json();
        console.log(show)
        window.location.reload();
      } else {
        console.error('Error en la solicitud:', resp.status, resp.statusText);
      }
    } catch (error) {
      console.log('Error en el fetch:', error);
    }
  };
  postComent();
});












