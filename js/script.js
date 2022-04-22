/*
**Consegna**
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell’esercizio ma solo l’index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l’inizializzazione di git).
****L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l’utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l’utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
**BONUS:**
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
****2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
*/

//-------------------------------------------------------
const BOMBMAX = 16;
const mainReset = document.querySelector('main');
const resetPunteggio= document.querySelector('span');
const stampa = document.getElementById('stampa');


document.getElementById('play').addEventListener('click', play);

function play(){
  reset();
  resetPoint()
  const lvl = document.getElementById('lvl').value;
  const lvlGrid = [100,81,49]
  const cellNumber = lvlGrid[lvl];

  generatePlay(cellNumber);
  callBombs(cellNumber);

}

function generatePlay(cellNumber){
  const field = document.createElement('div');
  field.className = 'field';
  const polveriera = callBombs(cellNumber);
  const punti =[];
  

  for (let i = 1; i <=cellNumber; i++){
    
    const cell = document.createElement('div');
    cell.className='cell square'+cellNumber;
    cell.innerHTML=`<span>${i}</span>`;
    
    cell.addEventListener('click', function(){
      
      if(polveriera.includes(i)){
        this.classList.add('bomb');
        stampa.innerHTML= `<h2>Spiacente hai perso! hai fatto ${punti.length} punti</h2>`;
        
      }else{
        this.classList.add('clicked');
        punti.push(i)
      }
      
    });
    
    field.append(cell);
  }
  
  mainReset.append(field);
}


function callBombs(cellNumber){
  const callBombs=[];

  while(callBombs.length < BOMBMAX){
    const bomb = getRandomNumber(1, cellNumber);
    if(!callBombs.includes(bomb)){
      callBombs.push(bomb);
    }
  }
  return callBombs;
}


function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
  
function reset(){
  mainReset.innerHTML='';
}

function resetPoint(){
  resetPunteggio.innerHTML='';
}