
let onoroff = 0

let askingMinutes = ""
let start = false
let theInterval = null
let placeholder0 = null
let pause = false
let buttonin = false
let countC = null

document.getElementById("computercat").src = "omgyay.gif"

document.getElementById("startButton").disabled = true;
document.getElementById("timer-style").addEventListener("click", function(event) {
  document.getElementById("countInput").focus();
})

document.getElementById("countInput").addEventListener('input', function(event) {
  askingMinutes = (event.target.value)
  console.log(askingMinutes)
  if (askingMinutes >= 9999) {
    askingMinutes = 9999
    document.getElementById("countInput").value = "9999"
  }
  if (isNaN(askingMinutes) || askingMinutes <= 0 || askingMinutes == "" ) {
    document.getElementById("timer-style").textContent = "00" + ":00";
    document.getElementById("startButton").disabled = true;
  } 
  else {
    if (askingMinutes < 10) {
      document.getElementById("timer-style").textContent = "0" + Math.trunc(askingMinutes) + ":00";
      document.getElementById("startButton").disabled = false;

    }
    else {
    document.getElementById("timer-style").textContent = Math.trunc(askingMinutes) + ":00";
    document.getElementById("startButton").disabled = false;

  }}

}) 


document.getElementById("startButton").addEventListener('click', function(event) {
  switch (start){
    case false:
      document.getElementById("computercat").style.opacity = 1;
      document.getElementById("computercat").src = "cute2nd.gif"
      askingMinutes *= 60
      countdown(askingMinutes)
      start = true;
      document.getElementById("startButton").textContent = 'reset'
      document.getElementById("countInput").setAttribute('type', 'button');
      if (buttonin == false) {
        buttonlistener()
        buttonin = true
      }
      if (document.getElementById("countInput").type === 'button') {
        document.getElementById("countInput").style.cursor = 'pointer';
        document.getElementById("countInput").className = 'startButtonC';
        document.getElementById("countInput").value = "pause";
        document.getElementById("timer-style").style.opacity = 1;
        document.getElementById("heading").style.opacity = 0.8;
        document.getElementById("countInput").style.opacity = 1;
        document.getElementById("countInput").disabled = false;
      }

      break;
    case true:
      document.getElementById("countInput").setAttribute('type', 'text');
      document.getElementById("countInput").classList.remove('startButtonC');
      document.getElementById("countInput").classList.add('countInputC', 'no-select');
      document.getElementById("countInput").style.cursor = 'auto';
      console.log('bam')
      document.getElementById("timer-style").textContent = "00" + ":" + "00"
      document.getElementById("computercat").src = "omgyay.gif"
      document.getElementById("webTitle").innerHTML = "kittydoro - pomodoro"
      start = false;
      document.getElementById("startButton").textContent = 'start';
      onoroff = 0
      clearInterval(theInterval)
      document.getElementById("countInput").value = "";
      document.getElementById("countInput").disabled = false;
      document.getElementById("startButton").disabled = true;
      document.getElementById("heading").style.opacity = 1;
      document.getElementById("countInput").style.opacity = 1;
      document.getElementById("timer-style").style.opacity = 0.8;
      document.getElementById("countInput") /* change to input */

      
      askingMinutes = 0
      break;
  }
})




document.getElementById('colorWheel').addEventListener('change', function() {
  document.getElementById("mainbody").style.backgroundColor = this.value;
});

document.getElementById('colorWheel').value = '#FF8791';

function buttonlistener() {
  document.getElementById("countInput").addEventListener('click', switcherP)
}
function switcherP() {
  if (document.getElementById("countInput").type == 'button') {
    console.log('srt')
    let currentText = document.getElementById("countInput").value;
    console.log(currentText)
    switch(currentText) {
      case 'resume':
        pause = false
        break;
      case 'pause':
        pause = true
        break;
    }
    switch(pause) {
      case false:
        document.getElementById("countInput").value = "pause";
        document.getElementById("computercat").src = "cute2nd.gif"
        countdown(askingMinutes)
        break;
      case true:
        clearInterval(theInterval);
        document.getElementById("countInput").value = "resume";
        document.getElementById("computercat").src = "omgcute.gif"
        break;
  }}}
function countdown(count) {
  
  if (count > 0 && onoroff != 1) {
    theInterval = setInterval(function() {
      count--;
      askingMinutes = count;
      if (count % 60 >= 10) {
        document.getElementById("timer-style").textContent = Math.trunc(count/60) + ":" + count % 60;
        document.getElementById("webTitle").innerHTML = Math.trunc(count/60) + ":" + count % 60 + " - kittydoro"
      }
      else {
        document.getElementById("timer-style").textContent = Math.trunc(count/60) + ":" + "0" + count % 60;
        document.getElementById("webTitle").innerHTML = Math.trunc(count/60) + ":" +"0" + count % 60 + " - kittydoro";
      }
      console.log(count);

      if (count <= 0) {
        clearInterval(theInterval)
        document.getElementById("computercat").style.opacity = 1; /* change this */
        document.getElementById("computercat").src = "adorableahah.gif"
        document.getElementById("countInput").value = " great work!"
        document.getElementById("startButton").textContent = "again?"
      }

    }, 1000);
  }
}
