btnFoco.addEventListener('click', function(event) {
  configsFoco();
  defineParametroUrl('foco');
});

btnTarefas.addEventListener('click', function() {
  configsTarefas();
  defineParametroUrl('tarefas');
});

btnDescanso.addEventListener('click', function() {
  configsDescanso();
  defineParametroUrl('descanso');
});

btnLazer.addEventListener('click', function() {
  configsLazer();
  defineParametroUrl('lazer');
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

  if(config.foco) defineParametroUrl('foco');
  if(!config.foco && config.progressivo) defineParametroUrl('tarefas');
  if(!config.lazer && !config.progressivo) defineParametroUrl('descanso');
  if(config.lazer) defineParametroUrl('lazer');
});

btnParar.addEventListener('click', () => {
  clearInterval(temporizador);
  temporizador = null;
  defineParametroUrl('parado');
});

btnAltera.addEventListener('click', () => {
  const horas = parseInt(inputHora.value) * 3600;
  const minutos = parseInt(inputMinutos.value) * 60;
  const segundos = parseInt(inputSegundos.value);

  if(isNaN(horas) && isNaN(minutos) && isNaN(segundos)){
    return;
  }
  
  let totalEmSegundos = 0;
  totalEmSegundos += isNaN(horas) ? 0 : horas;
  totalEmSegundos += isNaN(minutos) ? 0 : minutos;
  totalEmSegundos += isNaN(segundos) ? 0 : segundos;
  
  config.segundosAcumulados = checkNegativo.checked ? -totalEmSegundos : totalEmSegundos;  
  displayTempo.innerHTML = segundosEmFormaDeRelogio();
  defineParametroUrl(urlParams.get('modo'));
});