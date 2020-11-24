var Machiner;

 String.prototype.replaceAt = function(index, char) {
    var a = this.split("");

    a[a.length-1-index] = char;
    return a.join("");
}


function Machine(tape,tapeCanvas) {
    this.tape = tape;
    this.currentPosition = 0;
    this.currentState = "return";
    this.scannedSymbol = "h";
    this.canvas = tapeCanvas;
    this.graphics = tapeCanvas.getContext("2d");
    this.centerSquare = 7;
    this.position = 0;
    this.graphics.font = "45px Serif";
    this.machineWidth = this.graphics.measureText("99").width + 14;
}

Machine.prototype.redraw = function() {
    var g = this.graphics;
    var w = this.canvas.width;
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

  }

Machine.prototype.step = function() {
this.scannedSymbol = this.tape.split("").reverse().join("").charAt(this.currentPosition);
  if(this.currentState == "write" && this.scannedSymbol == "1") {
     if(this.tape == "111"){
      this.tape = "0" + this.tape;
    }
    this.tape = this.tape.replaceAt(this.currentPosition,"0");
    this.currentPosition = this.currentPosition + 1;
  }

  else if(this.currentState == "write" && this.scannedSymbol == "0") {
    this.tape = this.tape.replaceAt(this.currentPosition,"1");
    this.currentState = "return";
    this.currentPosition = this.currentPosition - 1;

  }

  else if(this.currentState == "return" && (this.scannedSymbol == "0" || this.scannedSymbol == "1")) {
    this.currentPosition = this.currentPosition - 1;
    console.log("a")

  }

  else if(this.currentState == "return") {
    this.currentState = "write";
    this.currentPosition = this.currentPosition + 1;
  }

 
  console.log(this.tape)
  this.redraw();

}




function init() {
   var Taper;
  var tapeCanvas = document.getElementById("tape-canvas");
  var tape = document.querySelector("#tapeValue").value;
  Machiner = new Machine(tape, tapeCanvas);
   Machiner.redraw()


}
 
function doStep() {
        Machiner.step();

    }