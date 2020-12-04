var timer = 1000;
var start = true;
var startstop = "";

String.prototype.replaceAt = function(index, char) {
 var a = this.split("");
 a[a.length-1-index] = char;
 return a.join("");
}

var Machine = {
  init: function(tapeValue) {
        this.tape = tapeValue;
        this.currentPosition = 0;
        this.centerSquare = this.tape.length-1;
        this.currentState = "return";
        this.scannedSymbol = "*";
        this.action = "";
    },

  step: function() {
        let matchOnes = new RegExp('^1(0*0*)+$');
        this.scannedSymbol = this.tape.split("").reverse().join("").charAt(this.currentPosition);
        if(this.currentState == "write" && this.scannedSymbol == "1") {
                this.action = "(1,0,L)"
         if(this.currentPosition == this.tape.length-1 &&  this.tape.match(matchOnes) ) {
         
                this.right = 1;
                this.tape = "0" + this.tape;
      }
        this.tape = this.tape.replaceAt(this.currentPosition,"0");
        this.currentPosition = this.currentPosition + 1;
    }

        else if(this.currentState == "write" && this.scannedSymbol == "0") {
                this.action = "(0,1,R)"
                this.tape = this.tape.replaceAt(this.currentPosition,"1");
                this.currentState = "return";
                this.currentPosition = this.currentPosition - 1;

        }

        else if(this.currentState == "return" && (this.scannedSymbol == "0" || this.scannedSymbol == "1")) {
           if(this.scannedSymbol == "0"){
                this.action = "(0,0,R)"
        }
           if(this.scannedSymbol == "1"){
                this.action = "(1,1,R)"
        }

        this.currentPosition = this.currentPosition - 1;
       
    }

       else if(this.currentState == "return") {
                this.action = "(*,*,L)"
                this.currentState = "write";
                this.currentPosition = this.currentPosition + 1;

    }
   
         this.redraw();
       if(startstop == "start") {
      setTimeout((function() {
                this.step();
              }).bind(this),timer);
    }
  }
}


var Tape = Object.create(Machine);

Tape.initMachine = function(tapeValue) {
    this.init(tapeValue);
  };

Tape.makeStep = function() {
    this.step();
  }

Tape.initTape = function(tapeCanvas) {
      this.canvas = tapeCanvas;
      this.graphics = tapeCanvas.getContext("2d");
      this.graphics.font = "45px Serif";
      this.machineWidth = this.graphics.measureText("99").width + 14;

  };

Tape.redraw = function() {
        var g = this.graphics;
        var w = this.canvas.width;
        var img = document.getElementById("canvas_img")
        g.clearRect(0,0,w,this.canvas.height);
        g.lineWidth = 4;
        g.beginPath(); //drewing cell
        g.moveTo(0,74);
        g.lineTo(w,74);
        g.moveTo(0,114);
        g.lineTo(w,114);
        var cellCt = 2*Math.floor(w/80);//cell numbers
        var x = w/2 - 40*cellCt/2;
        for (var i = 0; i <= cellCt; i++) {
              g.moveTo(x,74);
              g.lineTo(x,114);
              x += 40;
         }
        g.stroke();
        g.font = "30px Serif";
        g.fillStyle = "black";
        x = w/2 - 40*cellCt/2;
       for (var j = 0; j < this.tape.length; j++) {
               var sym = this.tape[j];
              if (sym !== undefined) {
                 var cw = g.measureText(sym).width;
                 g.fillText(sym,x+540-cw/2,104);
        }  
        x += 40;
    }     
        x = w/2 - 20 + 40*(this.centerSquare - this.currentPosition + this.right);

        var mw = this.machineWidth;
        x = x + 20 - mw/2;
        g.beginPath();
        g.arc(x+mw-45, 0, 2, 0, Math.PI*2, true);
        g.closePath();
        g.drawImage(img, x-105, 0, 4*18+2, 4*18+2);
        g.beginPath();
        g.arc(0, 0, 2, 0, Math.PI*2, true);
        g.closePath();
        g.restore()
        g.stroke();
        g.font = "20px Serif";
        g.fillStyle = "black";
        g.fillText(this.action,x-95,4*5);
      
    }



function doInit () {
  const tapeCanvas = document.getElementById("tape-canvas");
  const numbers = /^[0-1]+$/;
  const tapeInput = document.querySelector("#tapeValue");
  document.getElementById('tape_error').innerHTML = '';
  var tapeValue = tapeInput.value.replace(/\s/g, '') || "";

  Tape.initTape(tapeCanvas);
  Tape.redraw()
}

 
function doStep() {
  Tape.makeStep();
    }

function doStartStop() {
  var startButton = document.querySelector("#startstop");
  var tapeButton = document.querySelector(".btn-init");
  var stepButton = document.querySelector(".btn-step");

  if(startButton.value == "Start") {
      startstop = "start";
      startButton.value = "Stop";
      doStep();
      startButton.classList.remove("btn-start");
      startButton.classList.add("btn-stop");
      tapeButton.disabled = true;
      stepButton.disabled = true;

  } else if(startButton.value == "Stop") {
      startstop = "stop";
      startButton.value = "Start";
      startButton.classList.remove("btn-stop");
      startButton.classList.add("btn-start");
      tapeButton.disabled = false;
      stepButton.disabled = false;

  }
}

function doSpeedup(){
  timer = timer / 2;
}


function doSlowdown(){
  timer = timer * 2;
}
