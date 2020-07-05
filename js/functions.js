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

function recuperaInfoUrl(){
  const url_string = window.location.href;
  const url = new URL(url_string);

  const url_horaBotaoPressionado = url.searchParams.get("horapress");
  const url_modo = url.searchParams.get("modo");
  const url_segundosAcumulados = parseInt(url.searchParams.get("acum"));

  const parametrosPreenchidos = (url_horaBotaoPressionado && url_modo && (url_segundosAcumulados || url_segundosAcumulados === 0));
  if(!parametrosPreenchidos){
    return;
  }
  
  const agora = new Date;
  let tempoPassado = Math.floor((agora - url_horaBotaoPressionado)/1000);

  switch (url_modo) {
    case 'foco':
      config.segundosAcumulados = (tempoPassado * 2) + url_segundosAcumulados;
      config.foco = true;
      configsFoco();
      break;
    case 'tarefas':
      config.segundosAcumulados = tempoPassado + url_segundosAcumulados;
      configsTarefas();
      break;
    case 'descanso':
      config.segundosAcumulados = -tempoPassado + url_segundosAcumulados;
      configsDescanso();
      break;
    case 'lazer':
      config.segundosAcumulados = -(tempoPassado * 2) + url_segundosAcumulados;
      config.lazer = true;
      configsLazer();
      break;
  }

  displayTempo.innerHTML = segundosEmFormaDeRelogio();
  const click = new Event('click');
  btnIniciar.dispatchEvent(click);
}

function defineParametroUrl(modo){
  urlParams.set('modo', modo);
  urlParams.set('horapress', Date.now());
  urlParams.set('acum', config.segundosAcumulados);
  history.replaceState(null, '', `?${urlParams}`);
  // window.location.search = urlParams;
}