function suma(){
 var pn = document.getElementById('pn').value;
 var sn = document.getElementById('sn').value;
 localStorage.setItem('rsu', parseFloat(pn) + parseFloat(sn));
 
 var st1 = document.getElementById('suma').value;
 if (st1 === true){
  var st = 1;
  var rt = 0;
  var mt = 0;
  var dt = 0;

  localStorage.setItem('st', st);
  localStorage.setItem('rt', rt);
  localStorage.setItem('mt', mt);
  localStorage.setItem('dt', dt);

  localStorage.setItem('rre', '0')
  localStorage.setItem('rmu', '0')
  localStorage.setItem('rdi', '0')
 }
}


function resta(){
 var pn = document.getElementById('pn').value;
 var sn = document.getElementById('sn').value;
 localStorage.setItem('rre', parseFloat(pn) - parseFloat(sn));

 var rre = parseFloat(pn) + parseFloat(sn);
}


function multiplicacion(){
 var pn = document.getElementById('pn').value;
 var sn = document.getElementById('sn').value;
 var rmu = parseFloat(pn) + parseFloat(sn);
}


function divicion(){
 var pn = document.getElementById('pn').value;
 var sn = document.getElementById('sn').value;
 var rdi = parseFloat(pn) + parseFloat(sn);
}


function mostrar(){
 var st = localStorage.getItem('st');
 var rt = localStorage.getItem('rt');
 var mt = localStorage.getItem('mt');
 var dt = localStorage.getItem('dt');

 var rsu = localStorage.getItem('rsu');
 var rre = localStorage.getItem('rre');
 var rmu = localStorage.getItem('rmu');
 var rdi = localStorage.getItem('rdi');





 if (st = 1){
 document.getElementById('resultado').textContent = rsu;
 localStorage.clear();
 return;


}
 if (rt = 1){
 document.getElementById('resultado').textContent = rre;
 localStorage.clear();
 return;


}
 if (mt = 1){
 document.getElementById('resultado').textContent = rmu;
 localStorage.clear();
 return;


}
 if (dt = 1){
 document.getElementById('resultado').textContent = rdi;
 localStorage.clear();
 return;


 }
}