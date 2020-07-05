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