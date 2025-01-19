// Animation for the 3 boxes starts

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

fetch('http://152.67.231.147:1235/coments')
.then(res => res.json())
.then(coments => {
    const html = coments.map(coment => {
     return `
         <h2>${coment.name}</h2>
         <p>${coment.coment}</p>
         <span>${coment.age}</span>
         
        `
 }).join('')
 document.querySelector('mai').innerHTML = html
})















