var backgroundCard, hexLineargradientCode, mozLineargradientCode, webLineargradientCode, lineargradientCode, btnGenerate, btnCopy;

// Get DOM elements
backgroundCard = document.querySelector(".gradient__background");
hexLineargradientCode = document.querySelector('.hex-lineargradient-code');
mozLineargradientCode = document.querySelector('.moz-lineargradient-code');
webLineargradientCode = document.querySelector('.web-lineargradient-code');
lineargradientCode = document.querySelector('.lineargradient-code');
btnCopy = document.querySelector(".btn__copy");
btnGenerate = document.querySelector(".btn__generate");

// Generate colors
btnGenerate.addEventListener('click', function () {

    var randomColorFirst, randomColorSecond, deg, colorValue;

    // Generate color and degree
    randomColorFirst = Math.floor(Math.random() * 16777215).toString(16);
    randomColorSecond = Math.floor(Math.random() * 16777215).toString(16);
    deg = Math.floor(Math.random() * 180).toString(10);

    // Create innerHTML
    hexColorValue = "#" + randomColorFirst;
    mozColorValue = "-moz-linear-gradient(" + deg + "deg, #" + randomColorFirst + ' 0%, #' + randomColorSecond + ' 100%)';
    webColorValue = "-web-linear-gradient(" + deg + "deg, #" + randomColorFirst + ' 0%, #' + randomColorSecond + ' 100%)';
    colorValue = "linear-gradient(" + deg + "deg, #" + randomColorFirst + ' 0%, #' + randomColorSecond + ' 100%)';

    // Add HTML to elements
    hexLineargradientCode.innerHTML = hexColorValue;
    mozLineargradientCode.innerHTML = mozColorValue;
    webLineargradientCode.innerHTML = webColorValue;
    lineargradientCode.innerHTML = colorValue;

    backgroundCard.style.background = colorValue;

    btnCopy.innerHTML = 'CSS kód másolása <i class="bi bi-clipboard"></i>';
});


// Copy clipboard 
btnCopy.addEventListener('click', function () {

    var copyHex, copyMoz, copyWeb, copyLin

    // Get innerText of content
    copyHex = hexLineargradientCode.innerText;
    copyMoz = mozLineargradientCode.innerText;
    copyWeb = webLineargradientCode.innerText;
    copyLin = lineargradientCode.innerText;

    // Copy CSS declarations
    navigator.clipboard.writeText('background: ' + copyHex + ';\n' + 'background: ' + copyMoz + ';\n' + 'background: ' + copyWeb + ';\n' + 'background: ' + copyLin + ';');

    this.innerHTML = 'Kód kimásolva <i class="bi bi-clipboard-check"></i>'
});