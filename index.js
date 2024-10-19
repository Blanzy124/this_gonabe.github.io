// Animation for the 3 boxes starts




















































// Animation for the 3 boxes end

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
console.log(hresultados);

//Histor of calculator ends



//Calculators ends





