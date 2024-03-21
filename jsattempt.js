
let onoroff = 0

let askingMinutes = ""
let start = false
let theInterval = null
let placeholder0 = null

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
      askingMinutes *= 60
      countdown(askingMinutes)
      start = true;
      document.getElementById("startButton").textContent = 'reset';
      onoroff = 1
      document.getElementById("countInput").value = "studying"
      document.getElementById("countInput").disabled = true;
      document.getElementById("timer-style").style.opacity = 1;
      document.getElementById("heading").style.opacity = 0.8;
      document.getElementById("countInput").style.opacity = 0.8;  
      break;
    case true:
      console.log('bam')
      document.getElementById("timer-style").textContent = "00" + ":" + "00"
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
      
      askingMinutes = 0
      break;
  }
})

document.getElementById('colorWheel').addEventListener('change', function() {
  document.getElementById("mainbody").style.backgroundColor = this.value;
});

function countdown(count) {
  if (count > 0 && onoroff != 1) {
    theInterval = setInterval(function() {
      count--;
      if (count <= 0) {
        clearInterval(theInterval)
        document.getElementById("countInput").value = "great work!"
      }
      if (count % 60 >= 10) {
        document.getElementById("timer-style").textContent = Math.trunc(count/60) + ":" + count % 60
      }
      else {
        document.getElementById("timer-style").textContent = Math.trunc(count/60) + ":" + "0" + count % 60
      }
      console.log(count);
      if (document.getElementById("countInput").value.length <= 11) {
        document.getElementById("countInput").value += "."
      }
      else {
        if (document.getElementById("countInput").value != "great work!")
          document.getElementById("countInput").value = "studying."
      }
    }, 1000);
  }
}
