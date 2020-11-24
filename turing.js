import React, { useState, useEffect } from "react";


 String.prototype.replaceAt = function(index, char) {
    var a = this.split("");

    a[a.length-1-index] = char;
    return a.join("");
}


function App() {
  const [value, setValue] = useState("00000000*");
  const [tape, setTape] = useState("");
  var currentPosition = 0;
  var currentState = "return";
  var scannedSymbol = "*";

  function Machine() {
   var c = tape;
   scannedSymbol = c.split("").reverse().join("").charAt(currentPosition);
  if(currentState === "write" && scannedSymbol === "1") {
    c = c.replaceAt(currentPosition,"0");
    currentPosition = currentPosition + 1;
  }

  else if(currentState === "write" && scannedSymbol === "0") {
    c = c.replaceAt(currentPosition,"1");
    currentState = "return";
    currentPosition = currentPosition - 1;

  }

  else if(currentState === "return" && (scannedSymbol === "0" || scannedSymbol === "1")) {
    currentPosition = currentPosition - 1;

  }

  else if(currentState === "return" && scannedSymbol === "*") {
    currentState = "write";
    currentPosition = currentPosition + 1;
  }

       setTape(c);
 }  

 function handleSubmit(e) {
  setTape(value);
  e.preventDefault();
 }

  return ( 
    <div>
    <button onClick={Machine}>b</button>
    <form onSubmit={handleSubmit}>
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
    <button type="submit">Set Tape</button>
    </form>
    <table cellPadding="3" border="1" align="center">
      <tbody>     
      <tr>
        <td id="P5"><p  id="5" className="NoLink">{ tape }</p></td>
      </tr>
    </tbody>
    </table>
    </div>
    )
}

export default App;