function suma(){
 var pn = document.getElementById('pn').value;
 var sn = document.getElementById('sn').value;
 localStorage.setItem('rsu', parseFloat(pn) + parseFloat(sn));
 
  localStorage.setItem('st', 1);
  localStorage.setItem('rt', 0);
  localStorage.setItem('mt', 0);
  localStorage.setItem('dt', 0);

  localStorage.setItem('rre', '0')
  localStorage.setItem('rmu', '0')
  localStorage.setItem('rdi', '0')
}


function resta(){
 var pn = document.getElementById('pn').value;
 var sn = document.getElementById('sn').value;
 localStorage.setItem('rre', parseFloat(pn) - parseFloat(sn));
 
  localStorage.setItem('st', 0);
  localStorage.setItem('rt', 1);
  localStorage.setItem('mt', 0);
  localStorage.setItem('dt', 0);

  localStorage.setItem('rsu', '0')
  localStorage.setItem('rmu', '0')
  localStorage.setItem('rdi', '0')
 
}


function multiplicacion(){
 var pn = document.getElementById('pn').value;
 var sn = document.getElementById('sn').value;
 localStorage.setItem('rmu', parseFloat(pn) * parseFloat(sn));
 
 localStorage.setItem('st', 0);
 localStorage.setItem('rt', 0);
 localStorage.setItem('mt', 1);
 localStorage.setItem('dt', 0);
 
 localStorage.setItem('rsu', '0')
 localStorage.setItem('rre', '0')
 localStorage.setItem('rdi', '0')
}


function divicion(){
 var pn = document.getElementById('pn').value;
 var sn = document.getElementById('sn').value;
 localStorage.setItem('rdi', parseFloat(pn) / parseFloat(sn));
 
 localStorage.setItem('st', 0);
 localStorage.setItem('rt', 0);
 localStorage.setItem('mt', 0);
 localStorage.setItem('dt', 1);

 localStorage.setItem('rsu', '0')
 localStorage.setItem('rre', '0')
 localStorage.setItem('rmu', '0')
}

///////////////////////////////////////
function mostrar(){
 var st = parseFloat(localStorage.getItem('st'));
 console.log(st);
 var rt = parseFloat(localStorage.getItem('rt'));
 console.log(rt);
 var mt = parseFloat(localStorage.getItem('mt'));
 console.log(mt);
 var dt = parseFloat(localStorage.getItem('dt'));
 console.log(dt);

 console.log("rrr");

 var rsu = parseFloat(localStorage.getItem('rsu'));
 console.log(rsu);
 var rre = parseFloat(localStorage.getItem('rre'));
 console.log(rre);
 var rmu = parseFloat(localStorage.getItem('rmu'));
 console.log(rmu);
 var rdi = parseFloat(localStorage.getItem('rdi'));
 console.log(rdi);

console.log("ifs")

switch (st){
 case 1: 
 document.getElementById('resultado').textContent = rsu;
 console.log('1if ' + rsu);
 localStorage.clear();
 case 0:;
}
switch (rt){
 case 1:
  document.getElementById('resultado').textContent = rre;
 console.log('2if ' + rre);
 localStorage.clear();
 case 0:;
}
switch (mt){
 case 1:
  document.getElementById('resultado').textContent = rmu;
 console.log('3if ' + rmu);
 localStorage.clear();
 case 0:;
}
switch (dt){
 case 1: 
 document.getElementById('resultado').textContent = rdi;
 console.log('4if ' + rdi);
 localStorage.clear();
 case 0:;
}
}


