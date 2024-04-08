

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
canvas.height = window.innerHeight;
canvas.width = window.innerWidth
localStorage.getItem('studytime') ? totalTime = Number(localStorage.getItem('studytime')) :  Number(localStorage.setItem('studytime', 0))
totalTime = Number(localStorage.getItem('studytime'))

document.getElementById('time-count').textContent = (Math.floor(totalTime / 3600)) + 'hrs ' + Math.floor((totalTime % 3600) / 60) + 'mins'

//break functionality
let countinput = document.getElementById('countInput');
let breakbutton = document.getElementById('breakbutton');
let startbutton = document.getElementById('startButton');
let crazyfrog = document.getElementById('crazyfrog')
let onbreak = false;
let breaktime = 300;
breakbutton.addEventListener('click', function() {
  switch (onbreak){
    case false:
      statsclick.play();

      countinput.placeholder = "break time...";
      startbutton.innerText = "nice!";
      breakbutton.innerText = "stop";
      timerstyle.innerText = "5:00"

      startbutton.disabled = true;
      countinput.disabled = true;
      onbreak = true;

      breakinterval = setInterval(function() {
        if (onbreak) {
          breaktime --;
          if (breaktime >= 10) {
            if ((breaktime % 60) >= 10){
          timerstyle.textContent = Math.floor(breaktime/60) + ":" + breaktime % 60;}
          else {timerstyle.textContent = Math.floor(breaktime/60) + ":" + "0" + breaktime % 60;
        }

          } else {
            timerstyle.textContent = Math.floor(breaktime/60) + ":" + "0" + breaktime % 60;
          }
        }
        if (breaktime == 0) {
          crazyfrog.play()
          breakbutton.click()
        }
        
      }, 1000)
      break;
      

    case true:

      statsclick.play()

      countinput.placeholder = "study minutes";
      startbutton.innerText = "start";
      breakbutton.innerText = "break";
      timerstyle.innerText = "30:00";


      startbutton.disabled = true;
      countinput.disabled = false;

      breaktime = 300
      clearInterval(breakinterval)

      onbreak = false;
      break;
  }})




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


let started = false
startFnc = function simulatedFunc() {
  switch (start){
    case false:
      breakbutton.disabled = true
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
      breakbutton.disabled = false
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


document.getElementById('colorWheel').value = '#a7b0ff';

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
  if (!onbreak) {
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
}
let timerstyle = document.getElementById('timer-style');
let breakinterval;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;






// non-sht code
let rain = document.getElementById('rain')
let rainpng = document.getElementById('rainpng')
let rainon = true
let raindrops;
let animationFrameId;
let handleResize = function() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  raindrops = []
  for (let i = 0; i < 100; i++) {
    raindrops.push(new raindrop)
  }
} 

rainpng.addEventListener('click', function() {
  switch(rainon) {
    case true:
      
    window.addEventListener('resize', handleResize)
    happyboxcat.disabled = true;


    raindrops = []
    for (let i = 0; i < 100; i++) {
      raindrops.push(new raindrop)
    }

    cancelAnimationFrame(animationFrameId);

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      c.clearRect(0,0,canvas.width,canvas.height);
      for (let i of raindrops) {
        i.draw()
        i.fly()
        i.transform()
      }
    
      
    }
    animate();
    rain.currentTime = 0
    rain.play()
    rainon = false
    break;

    case false:
      happyboxcat.disabled = false
      window.removeEventListener('resize', handleResize)
      raindrops = []
      rain.pause()
      rainon = true
      

      break;
      }

})


rain.addEventListener('ended', function() {
  this.currentTime = 28;
  this.play();
});



function raindrop() {
  this.x = Math.random() * canvas.width
  this.y = -20000 * Math.random();
  this.radius = 3;
  this.velocitY = Math.random() * 5
  this.gravity = Math.ceil(Math.random() * 3)
  this.splatter = []
  this.change = false
  this.z = 0
  this.count = 0

  this.draw = function() {
    if (!this.change) {
      c.beginPath();
      c.arc(this.x,this.y,this.radius,Math.PI*2,Math.PI,false);
      c.moveTo(this.x - this.radius, this.y);
      c.lineTo(this.x, this.y - 40);
      c.lineTo(this.x + this.radius, this.y)

      c.fillStyle = 'rgb(44, 142, 222)';
      c.strokeStyle = 'rgba(0,0,0,0)'
      c.fill();
      c.stroke()
    }
  }
  this.fly = function() {
    this.y += (this.velocitY);
    this.velocitY += this.gravity;
    console.log(this.velocitY)
    this.x -=4
    if (this.y > canvas.height) {
      this.y = canvas.height;
      this.change = true
      this.velocitY *= -0.25
      this.count ++
      this.radius --

    }
  }
  this.transform = function() {
    if (this.change) {
      c.beginPath();
      c.arc(this.x*1.2,this.y,this.radius,Math.PI*2,0,false);
      c.arc(this.x*0.2,this.y,this.radius,Math.PI*2,0,false);
      c.arc(this.x*1.4,this.y,this.radius,Math.PI*2,0,false);
      c.arc(this.x*2,this.y,this.radius,Math.PI*2,0,false);
      c.arc(this.x*2.4,this.y,this.radius,Math.PI*2,0,false);
      c.arc(this.x*1.8,this.y,this.radius,Math.PI*2,0,false);
      this.x ++
      if (this.count > 2) {
        this.change = false
        this.count = 0
        this.radius = 3
        this.x = Math.random() * canvas.width
        this.y = -3000 * Math.random();
      }

      c.fillStyle = 'rgb(44, 142, 222)';
      c.strokeStyle = 'rgba(0,0,0,0)'
      c.fill();
      c.stroke()
    }
  }

};

function dropball() {
  this.radius = 20
  this.x = canvas.width/2
  this.y = 0
  this.count = 0;
  this.yvelocity = 0
  this.ygravity = 1
  this.cookie = false
  this.drop = function() {
    this.yvelocity += this.ygravity;
    this.y += this.yvelocity;
    if ((this.y + this.radius) > canvas.height) {
      this.yvelocity *= -0.8
      this.ygravity = 1
      this.y = canvas.height - this.radius
      this.count++
      
    }
  }
  this.draw = function() {
    if (!this.cookie) {
      c.beginPath()
      c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
      c.fillStyle = 'rgb(0,0,0)';
      c.fill()
      c.stroke() }
    if (this.cookie) {
      c.beginPath()
      c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
      c.fillStyle = 'rgb(255,204,153)';
      c.fill()
      c.stroke()
      c.beginPath()
      c.arc(this.x + 10, this.y, 3, 0, Math.PI*2, false);
      c.fillStyle = 'rgb(40,40,40)';
      c.fill()
      c.stroke()
      c.beginPath()
      c.arc(this.x - 5, this.y + 1, 3, 0, Math.PI*2, false);
      c.fillStyle = 'rgb(40,40,40)';
      c.fill()
      c.stroke()
      c.beginPath()
      c.arc(this.x - 2, this.y - 10, 3, 0, Math.PI*2, false);
      c.fillStyle = 'rgb(40,40,40)';
      c.fill()
      c.stroke()
      c.beginPath()
      c.arc(this.x + 2, this.y + 10, 3, 0, Math.PI*2, false);
      c.fillStyle = 'rgb(40,40,40)';
      c.fill()
      c.stroke()
    }
  }

}

let happyboxcat = document.getElementById('happyboxcat');
let fatcat = document.getElementById('fatcat')
let firstClick = true
let ballArray;
let newID;
let fatmove = false;
let fatval = -100;
let fatleft;
let fatwalk;
let realizeCookie;
let fatback;
let scaleTransform = 1
let fatExcite;
let fatExUn = true;
let excite;
let afterExcite;
let cookieSpeed = 1;

function animate0() {
  newID = requestAnimationFrame(animate0);
  for (let i of ballArray) {
    c.clearRect(0,0,canvas.width,canvas.height)
    i.draw()
    i.drop()
  }
  if (fatmove) {
    fatval += 6
    fatcat.style.left = String(fatval) + 'px';
    if (fatval > ((window.innerWidth /2 )- 150)) {
      fatmove = false;
      setTimeout(function() {
        fatback = true;
        fatcat.style.transform = "scaleX(-1)";
      },2000)
      
      clearInterval(fatwalk)
      setTimeout(function() {
        realizeCookie = true;
        fatback = false;
        ballArray[0].cookie = true;

      }, 10000)
    }
  }
  if (fatback) {
    fatval --
    fatcat.style.left = String(fatval) + 'px';
  }
  if (realizeCookie) {
    fatcat.style.transform = "scaleX(1)";
    fatval += 40
    fatcat.style.left = String(fatval) + 'px';
    if (fatval > ((window.innerWidth /2 )- 150)) {
      realizeCookie = false
      fatExcite = true;

    }
  }
  if (fatExcite) {

    excite = setInterval(function() {
      switch (fatExUn) {
        case true:
          fatExUn = false;
          fatcat.style.transform = "ScaleX(-1)";
          break;
        case false:
          fatExUn = true;
          fatcat.style.transform = "ScaleX(1)";
          break;
      }
    }, 400)
    fatExcite = false
    setTimeout(function() {
      afterExcite = true
    }, 4000)
    }
  if (afterExcite) {
    setTimeout(function() {
      if (oncePlease) {
        clearInterval(excite)
        fatcat.style.transform = "ScaleX(1)";
        cookieSpeed = 40
        ballArray[0].x = (canvas.width/2) + 80
        oncePlease = false
      }
    }, 2000)
    if (cookieSpeed == 40) {
      fatcat.style.transform = "ScaleX(1)";
      fatcat.style.left = String(fatval += cookieSpeed) + 'px';
      ballArray[0].x += cookieSpeed
      console.log(ballArray[0].x)
    if (fatval > canvas.width) {
      fatval = -100
    if (ballArray[0].x > canvas.width) {
      ballArray[0].x = 80
      console.log(ballArray[0].x)
    }
    runCount ++
    if (runCount > 2) {
      cancelAnimationFrame(newID);
      happyboxcat.disabled = false;
      rainpng.disabled = false;
      runCount = 0;
      oncePlease = true;
      fatval = -100;
      fatmove = false;
      firstClick = true;
      fatback = false;
      afterExcite = false
      fatExcite = false;
      fatExUn = true
      clearInterval(excite)
    }
    }
    }
  }
  }
let runCount = 0;
let oncePlease = true

happyboxcat.addEventListener('click', function() {
  if (firstClick) {
    ballArray = []
    ballArray.push(new dropball)
    rainpng.disabled = true
    happyboxcat.disabled = true
    animate0()
    setTimeout(function() {
      fatmove = true;
    }, 4000)
  }
})