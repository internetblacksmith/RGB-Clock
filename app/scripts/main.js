// new verdsion where I take the reminder of the current time stamp and 16777215
// and cponvert it in hex so it will cicle thro the whole spectrum of color
// http://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript

window.onload = function() {

  backgroundColor();

};


function backgroundColor() {

  var elem = document.getElementById('color');

  var now = parseInt(Date.now() / 200);

  var timeToDisplay = now % 16777215;
  var hexTimeToDisplay = decToFullHex(timeToDisplay);
  var textColor = decToFullHex(16777215 - timeToDisplay);

  document.body.style.backgroundColor = hexTimeToDisplay;

  elem.style.color = textColor;
  elem.innerHTML = hexTimeToDisplay.toUpperCase();

  setTimeout(backgroundColor, 200);
}

function decToFullHex(dec) {
  var zeros = '';
  var hex = dec.toString(16);
  var zeroNeeded = 6 - hex.length;
  if (zeroNeeded > 0) {
    var zeros = repeatString('0', zeroNeeded);
  };
  return '#' + zeros + hex

}

function repeatString(str, times) {
  return (new Array(times + 1)).join(str);
}
