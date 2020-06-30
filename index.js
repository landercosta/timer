const config = {
  segundos: 0,
  progressivo: true,
  tipoDefinido: false,
  foco: false,
  lazer: false
}

let temporizador;

const displayTempo = document.getElementById('display-tempo');
const btnFoco = document.getElementById('btn-foco');
const btnTarefas = document.getElementById('btn-tarefas');
const btnDescanso = document.getElementById('btn-descanso');
const btnLazer = document.getElementById('btn-lazer');
const btnIniciar = document.getElementById('btn-iniciar');
const btnParar = document.getElementById('btn-parar');

const inputHora = document.getElementById('altera-horas');
const inputMinutos = document.getElementById('altera-minutos');
const inputSegundos = document.getElementById('altera-segundos');
const checkNegativo = document.getElementById('check-negativo');
const btnAltera = document.getElementById('btn-altera');

btnFoco.addEventListener('click', function() {
  config.progressivo = true;
  config.tipoDefinido = true;
  if(config.lazer){
    config.lazer = false;
    config.segundos = config.segundos * 2;
    displayTempo.innerHTML = segundosEmFormaDeRelogio();
  }
  if(!config.foco) config.foco = true;
  AplicaCorNoBotaoSelecionado(this);
});

btnTarefas.addEventListener('click', function() {
  config.progressivo = true;
  config.tipoDefinido = true;
  if(config.lazer){
    config.lazer = false;
    config.segundos = config.segundos * 2;
    displayTempo.innerHTML = segundosEmFormaDeRelogio();
  }
  if(config.foco) config.foco = false;
  AplicaCorNoBotaoSelecionado(this);
});

btnDescanso.addEventListener('click', function() {
  config.progressivo = false;
  config.tipoDefinido = true;
  if(config.lazer){
    config.lazer = false;
    config.segundos = config.segundos * 2;
    displayTempo.innerHTML = segundosEmFormaDeRelogio();
  }
  if(config.foco) config.foco = false;
  AplicaCorNoBotaoSelecionado(this);
});

btnLazer.addEventListener('click', function() {
  config.progressivo = false;
  config.tipoDefinido = true;
  if(!config.lazer){
    config.lazer = true;
    config.segundos = Math.floor(config.segundos / 2);
    displayTempo.innerHTML = segundosEmFormaDeRelogio();
  }
  if(config.foco) config.foco = false;
  AplicaCorNoBotaoSelecionado(this);
});

btnIniciar.addEventListener('click', () => {
  if(!config.tipoDefinido){
    alert('Defina o tipo do contador antes de iniciar');
    return;
  }
  if(temporizador){
    return;
  }
  temporizador = setInterval(() => {
    if(config.progressivo){
      config.segundos++;
    } else {
      config.segundos--;
    }
    if(config.foco) config.segundos++;
    displayTempo.innerHTML = segundosEmFormaDeRelogio();
  }, 1000);
});

btnParar.addEventListener('click', () => {
  clearInterval(temporizador);
  temporizador = null;
});

btnAltera.addEventListener('click', () => {
  let totalEmSegundos = 0;
  let horas = parseInt(inputHora.value) * 3600;
  let minutos = parseInt(inputMinutos.value) * 60;
  let segundos = parseInt(inputSegundos.value);
  totalEmSegundos += isNaN(horas) ? 0 : horas;
  totalEmSegundos += isNaN(minutos) ? 0 : minutos;
  totalEmSegundos += isNaN(segundos) ? 0 : segundos;
  config.segundos = checkNegativo.checked ? -totalEmSegundos : totalEmSegundos;  
  displayTempo.innerHTML = segundosEmFormaDeRelogio();
});

function AplicaCorNoBotaoSelecionado(btnSelecionado){
  btnFoco.classList.remove('selecionado');
  btnTarefas.classList.remove('selecionado');
  btnDescanso.classList.remove('selecionado');
  btnLazer.classList.remove('selecionado');
  btnSelecionado.classList.add('selecionado');
}

function segundosEmFormaDeRelogio(){
  let segundos = config.segundos;
  let stringFinal = '';
  if(segundos < 0){
    segundos = Math.abs(segundos);
    stringFinal += '-';
  }
  let horas = Math.floor(segundos / 3600);
  let minutos = Math.floor((segundos % 3600) / 60);
  segundos = segundos - (horas * 3600) - (minutos * 60);
  if(horas < 10) stringFinal += '0';
  stringFinal += horas;
  stringFinal += ':';
  if(minutos < 10) stringFinal += '0';
  stringFinal += minutos;
  stringFinal += ':';
  if(segundos < 10) stringFinal += '0';
  stringFinal += segundos;

  return stringFinal;
}