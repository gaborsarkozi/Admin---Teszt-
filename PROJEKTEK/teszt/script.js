

document.querySelector("#box").addEventListener('click', function() {
    var randomColorFirst, randomColorSecond, deg, colorValue, infoBox;

    infoBox = document.querySelector("body > div.card > p")
    randomColorFirst = Math.floor(Math.random()*16777215).toString(16);
    randomColorSecond = Math.floor(Math.random()*16777215).toString(16);
    deg = Math.floor(Math.random()*180).toString(10);

    colorValue = "linear-gradient(" + deg + "deg, #" + randomColorFirst + ' 0%, #' + randomColorSecond + ' 100%)';
    this.style.background = colorValue;
    infoBox.innerHTML = colorValue

})