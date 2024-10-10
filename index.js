
//Calculator starts
function guardar_operacion(operacion){
 localStorage.setItem('operacionSelecionada', operacion)
 console.log(localStorage.getItem('operacionSelecionada'));
}

function calcular(){
 var operacion = localStorage.getItem('operacionSelecionada');
 console.log(operacion);
 var pn = parseFloat(document.getElementById('pn').value);
 console.log(pn);
 var sn =  parseFloat(document.getElementById('sn').value);
 console.log(sn);

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

chi++;
hresultados.push(chi);
hresultados.push(resultado);


document.getElementById('id-number').textContent = hresultados.id;
console.log(hresultados.id)
document.getElementById('result-operation').textContent = hresultados;
console.log(hresultados.resultados)

























//Histor of calculator ends





}
var chi = 0;
var hresultados = [];





//Calculators ends





