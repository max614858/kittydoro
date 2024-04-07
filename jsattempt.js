

let onoroff = 0

let askingMinutes = ""
let start = false
let theInterval = null
let placeholder0 = null
let pause = false
let buttonin = false
let countC = null
let totalTime = 0
let statsVisible = false
let currentColor = document.getElementById('colorWheel').value
let informationBox = document.getElementById("study-info-box")
let toConfirm = true
let waitLimit = 4
let waitCount = 0
let waitFunction = null
let initColor
let startFnc
let canvas = document.querySelector('canvas')
let c = canvas.getContext('2d')
localStorage.getItem('studytime') ? totalTime = Number(localStorage.getItem('studytime')) :  Number(localStorage.setItem('studytime', 0))
totalTime = Number(localStorage.getItem('studytime'))

document.getElementById('time-count').textContent = (Math.floor(totalTime / 3600)) + 'hrs ' + Math.floor((totalTime % 3600) / 60) + 'mins'




// non-sht code
let rain = document.getElementById('rain')
let rainpng = document.getElementById('rainpng')
let rainon = true
let starArray = []
let handleResize = function() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  starArray = []
  for (let i = 0; i < 25; i++) {
    starArray.push(new createStar)
  }
} 

rainpng.addEventListener('click', function() {
  switch(rainon) {
    case true:
      
      window.addEventListener('resize', handleResize)

    starArray = []
    for (let i = 0; i < 25; i++) {
      starArray.push(new createStar)
    }

    function animate() {
      requestAnimationFrame(animate)
      c.clearRect(0,0, canvas.width, canvas.height)
      
      for (let i of starArray) {
        i.spawn()
        i.move()

      }
    }
    animate()
    rain.currentTime = 505
    rain.play()
    rainon = false
    break;

    case false:
      window.removeEventListener('resize', handleResize)
      starArray = []
      rain.pause()
      rainon = true
      break;
      }

})


rain.addEventListener('ended', function() {
  this.currentTime = 25;
  this.play();
});




document.body.style.overflowY = "auto";
let finishingbell = document.getElementById('finishingbell')
let clickstart = document.getElementById('clickstart')
let mclick = document.getElementById('clickpause')
let statsclick = document.getElementById('clickstats')

function revealStats() {
  switch(statsVisible) {
    case false:
    
      informationBox.style.backgroundColor = '#ff8791';
      statsclick.play()
      statsVisible = true
      informationBox.style.opacity = 1;
      informationBox.style.width = '200px';
      informationBox.style.height = '300px';
      document.getElementById('study-info-box').style.backgroundColor = currentColor

      break;
    case true:
      statsVisible = false
      statsclick.play()
      informationBox.style.opacity = 0
      informationBox.style.width = '200px';
      informationBox.style.height = '300px';
      document.getElementById('study-info-box').style.backgroundColor = currentColor


      

  }
}


document.getElementById('clear-time').addEventListener('click', resetTotalTime)


function resetTotalTime() {
  switch(toConfirm) {
    case true:
      document.getElementById('clear-time').textContent = "confirm reset?"
      document.getElementById('clear-time').style.marginLeft = '53px';
      toConfirm = false
      waitFunction = setInterval(function() {
        waitCount ++
        if (waitCount >= waitLimit) {
          document.getElementById('clear-time').textContent = "reset";
          document.getElementById('clear-time').style.marginLeft = '80px';
          toConfirm = true
          waitCount = 0
          clearInterval(waitFunction)
          
        }
      }, 1000)
      break;
    case false:
      totalTime = 0;
      localStorage.setItem('studytime', totalTime)
      document.getElementById('time-count').textContent = (Math.floor(totalTime / 3600)) + 'hrs ' + Math.floor((totalTime % 3600) / 60) + 'mins'

      document.getElementById('clear-time').textContent = "reset";
      document.getElementById('clear-time').style.marginLeft = '80px';
      toConfirm = true;
      clearInterval(waitFunction)
      break;

  } 
    
}

document.getElementById('stats-buttonID').addEventListener("click", revealStats)

document.getElementById("computercat").src = "cuteslider.gif"

document.getElementById("startButton").disabled = true;
document.getElementById("timer-style").addEventListener("click", function(event) {
  document.getElementById("countInput").focus();
})

document.getElementById("countInput").addEventListener('input', function(event) {
  askingMinutes = (event.target.value)
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



startFnc = function simulatedFunc() {
  switch (start){
    case false:
      clickstart.play()
      document.getElementById("computercat").style.opacity = 1;
      document.getElementById("computercat").src = "omgyay.gif"
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
      clickstart.play()
      document.getElementById("countInput").setAttribute('type', 'text');
      document.getElementById("countInput").classList.remove('startButtonC');
      document.getElementById("countInput").classList.add('countInputC', 'no-select');
      document.getElementById("countInput").style.cursor = 'auto';

      document.getElementById("timer-style").textContent = "00" + ":" + "00"
      document.getElementById("computercat").src = "cuteslider.gif"
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
  }}
  
document.getElementById("startButton").addEventListener('click', startFnc)



function adjust(color, amount) {
  return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}



document.getElementById('colorWheel').addEventListener('change', function() {
  document.getElementById("mainbody").style.backgroundColor = this.value;
  document.getElementById('study-info-box').style.backgroundColor = this.value;
  currentColor = adjust(document.getElementById('colorWheel').value, -12)
  document.getElementById('study-info-box').style.backgroundColor = currentColor

});

let event = new Event('change');
document.getElementById('colorWheel').dispatchEvent(event);


document.getElementById('colorWheel').value = '#FF8791';

function buttonlistener() {
  document.getElementById("countInput").addEventListener('click', switcherP)
}
function switcherP() {
  if (document.getElementById("countInput").type == 'button') {
    let currentText = document.getElementById("countInput").value;
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
        mclick.play()
        document.getElementById("computercat").src = "omgyay.gif"
        countdown(askingMinutes)
        break;
      case true:
        clearInterval(theInterval);
        mclick.play()
        document.getElementById("countInput").value = "resume";
        document.getElementById("computercat").src = "omgcute.gif"
        break;
  }}}
function countdown(count) {
  
  if (count > 0 && onoroff != 1) {
    theInterval = setInterval(function() {
      count--;
      askingMinutes = count;
      totalTime ++
      localStorage.setItem('studytime', totalTime)
      document.getElementById('time-count').textContent = (Math.floor(totalTime / 3600)) + 'hrs ' + Math.floor((totalTime % 3600) / 60) + 'mins'
      if (count % 60 >= 10) {
        document.getElementById("timer-style").textContent = Math.trunc(count/60) + ":" + count % 60;
        document.getElementById("webTitle").innerHTML = Math.trunc(count/60) + ":" + count % 60 + " - kittydoro"
      }
      else {
        document.getElementById("timer-style").textContent = Math.trunc(count/60) + ":" + "0" + count % 60;
        document.getElementById("webTitle").innerHTML = Math.trunc(count/60) + ":" +"0" + count % 60 + " - kittydoro";
      }

      if (count <= 0) {
        finishingbell.play()
        localStorage.setItem('studytime', totalTime)
        document.getElementById('time-count').textContent = (Math.floor(totalTime / 3600)) + 'hrs ' + Math.floor((totalTime % 3600) / 60) + 'mins'
  
        clearInterval(theInterval)
        document.getElementById("computercat").style.opacity = 1; /* change this */
        document.getElementById("computercat").src = "adorableahah.gif"
        document.getElementById("countInput").value = " great work!"
        document.getElementById("startButton").textContent = "again?"
        document.getElementById("countInput").disabled = true;
      }

    }, 1000);
  }
}


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createStar() {
  this.radius = 3
  this.x = canvas.width * Math.random();
  this.y = canvas.height/1.1 * Math.random();
  this.opacity = 1

  this.rand = (Math.random() * 2) + 0.1
  this.spawn = function() {
    c.beginPath()
    c.ellipse(this.x, this.y, this.radius/3, this.radius, 0, 0, Math.PI*2, false)
    c.fillStyle = 'rgba(255,255,255,' +`${this.opacity}` + ")"
    c.shadowBlur = 70;
    c.shadowColor = "white";
    c.fill()
    c.stroke()
  }
  this.move = function() {
    this.x -= (this.rand/3) * 7
    this.y += (this.rand * 25)
    if ((this.x - this.radius) > canvas.width) {
      this.x = 0 - this.radius
      this.rand = (Math.random() * 2) + 0.1
    }
    if ((this.x + this.radius) < 0) {
      this.x = canvas.width + this.radius
      this.rand = (Math.random() * 2) + 0.1
    }
    if ((this.y - this.radius) > canvas.height) {
      this.y = 0 - this.radius
      this.rand = (Math.random() * 2) + 0.1
    }
  }
}
