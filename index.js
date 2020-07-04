// TODO: Refatorar código para funções puras

const config = {
  segundosAcumulados: 0,
  progressivo: true,
  tipoDefinido: false,
  foco: false,
  lazer: false
}

let temporizador;
const urlParams = new URLSearchParams(window.location.search);

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

adicionaEventListeners();
recuperaInfoUrl();

function adicionaEventListeners(){
  btnFoco.addEventListener('click', function() {
    configsFoco();
    defineParametroUrl('modo', 'foco');
    defineParametroUrl('horapress', Date.now());
    defineParametroUrl('acum', config.segundosAcumulados);
  });
  
  btnTarefas.addEventListener('click', function() {
    configsTarefas();
    defineParametroUrl('modo', 'tarefas');
    defineParametroUrl('horapress', Date.now());
    defineParametroUrl('acum', config.segundosAcumulados);
  });
  
  btnDescanso.addEventListener('click', function() {
    configsDescanso();
    defineParametroUrl('modo', 'descanso');
    defineParametroUrl('horapress', Date.now());
    defineParametroUrl('acum', config.segundosAcumulados);
  });
  
  btnLazer.addEventListener('click', function() {
    configsLazer();
    defineParametroUrl('modo', 'lazer');
    defineParametroUrl('horapress', Date.now());
    defineParametroUrl('acum', config.segundosAcumulados);
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
        config.segundosAcumulados++;
      } else {
        config.segundosAcumulados--;
      }
      if(config.foco) config.segundosAcumulados++;
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
    config.segundosAcumulados = checkNegativo.checked ? -totalEmSegundos : totalEmSegundos;  
    displayTempo.innerHTML = segundosEmFormaDeRelogio();
  });
}

function AplicaCorNoBotaoSelecionado(btnSelecionado){
  btnFoco.classList.remove('selecionado');
  btnTarefas.classList.remove('selecionado');
  btnDescanso.classList.remove('selecionado');
  btnLazer.classList.remove('selecionado');
  btnSelecionado.classList.add('selecionado');
}

function segundosEmFormaDeRelogio(){
  let segundos = config.segundosAcumulados;
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

function converteRelogioEmSegundos(horas, minutos, segundos){
  return (horas * 3600) + (minutos * 60) + segundos;
}

function configsFoco(){
  config.progressivo = true;
  config.tipoDefinido = true;
  if(config.lazer){
    config.lazer = false;
    config.segundosAcumulados = config.segundosAcumulados * 2;
    displayTempo.innerHTML = segundosEmFormaDeRelogio();
  }
  if(!config.foco) config.foco = true;
  AplicaCorNoBotaoSelecionado(btnFoco);
}

function configsTarefas(){
  config.progressivo = true;
  config.tipoDefinido = true;
  if(config.lazer){
    config.lazer = false;
    config.segundosAcumulados = config.segundosAcumulados * 2;
    displayTempo.innerHTML = segundosEmFormaDeRelogio();
  }
  if(config.foco) config.foco = false;
  AplicaCorNoBotaoSelecionado(btnTarefas);
}

function configsDescanso(){
  config.progressivo = false;
  config.tipoDefinido = true;
  if(config.lazer){
    config.lazer = false;
    config.segundosAcumulados = config.segundosAcumulados * 2;
    displayTempo.innerHTML = segundosEmFormaDeRelogio();
  }
  if(config.foco) config.foco = false;
  AplicaCorNoBotaoSelecionado(btnDescanso);
}

function configsLazer(){
  config.progressivo = false;
  config.tipoDefinido = true;
  if(!config.lazer){
    config.lazer = true;
    config.segundosAcumulados = Math.floor(config.segundosAcumulados / 2);
    displayTempo.innerHTML = segundosEmFormaDeRelogio();
  }
  if(config.foco) config.foco = false;
  AplicaCorNoBotaoSelecionado(btnLazer);
}

function defineParametroUrl(parametro, valor){
  urlParams.set(parametro, valor);
  window.location.search = urlParams;
}

function recuperaInfoUrl(){
  const url_string = window.location.href;
  const url = new URL(url_string);
  const url_horaBotaoPressionado = url.searchParams.get("horapress");
  const url_modo = url.searchParams.get("modo");
  const url_segundosAcumulados = parseInt(url.searchParams.get("acum"));
  if(!url_horaBotaoPressionado || !url_modo || !url_segundosAcumulados){
    if(url_segundosAcumulados !== 0){
      return;
    }
  }
  
  const agora = new Date;
  let tempoPassado = Math.floor((agora - url_horaBotaoPressionado)/1000);

  switch (url_modo) {
    case 'foco':
      tempoPassado = tempoPassado * 2;
      config.segundosAcumulados = tempoPassado + url_segundosAcumulados;
      configsFoco();
      break;
    case 'tarefas':
      config.segundosAcumulados = tempoPassado + url_segundosAcumulados;
      configsTarefas();
      break;
    case 'descanso':
      tempoPassado = tempoPassado * -1;
      config.segundosAcumulados = tempoPassado + url_segundosAcumulados;
      configsDescanso();
      break;
    case 'lazer':
      tempoPassado = tempoPassado * -2;
      config.segundosAcumulados = tempoPassado + url_segundosAcumulados;
      config.lazer = true; // TODO: Fazer com que a página não recarregue ao clicar nos botões
      configsLazer();
      break;
  }

  displayTempo.innerHTML = segundosEmFormaDeRelogio();
  const click = new Event('click');
  btnIniciar.dispatchEvent(click);
}