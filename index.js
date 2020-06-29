const config = {
  segundos: 0,
  progressivo: true,
  tipoDefinido: false,
  foco: false,
  lazer: false,
}

let temporizador;

const displayTitulo = document.getElementById('display-titulo');
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
const btnAltera = document.getElementById('btn-altera');

btnFoco.addEventListener('click', () => {
  displayTitulo.innerHTML = 'Foco';
  config.progressivo = true;
  config.tipoDefinido = true;
  if(config.lazer){
    config.lazer = false;
    config.segundos = config.segundos * 2;
    displayTempo.innerHTML = segundosEmFormaDeRelogio();
  }
  if(!config.foco) config.foco = true;
});

btnTarefas.addEventListener('click', () => {
  displayTitulo.innerHTML = 'Tarefas';
  config.progressivo = true;
  config.tipoDefinido = true;
  if(config.lazer){
    config.lazer = false;
    config.segundos = config.segundos * 2;
    displayTempo.innerHTML = segundosEmFormaDeRelogio();
  }
  if(config.foco) config.foco = false;
});

btnDescanso.addEventListener('click', () => {
  displayTitulo.innerHTML = 'Descanso';
  config.progressivo = false;
  config.tipoDefinido = true;
  if(config.lazer){
    config.lazer = false;
    config.segundos = config.segundos * 2;
    displayTempo.innerHTML = segundosEmFormaDeRelogio();
  }
  if(config.foco) config.foco = false;
});

btnLazer.addEventListener('click', () => {
  displayTitulo.innerHTML = 'Lazer';
  config.progressivo = false;
  config.tipoDefinido = true;
  if(!config.lazer){
    config.lazer = true;
    config.segundos = Math.floor(config.segundos / 2);
    displayTempo.innerHTML = segundosEmFormaDeRelogio();
  }
  if(config.foco) config.foco = false;
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
  totalEmSegundos += parseInt(inputHora.value) * 3600;
  totalEmSegundos += parseInt(inputMinutos.value) * 60;
  totalEmSegundos += parseInt(inputSegundos.value);
  config.segundos = totalEmSegundos
  displayTempo.innerHTML = segundosEmFormaDeRelogio();
});

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