
var hideElements = document.querySelectorAll('.hide-element-switch');

document.querySelector('#showTableContent').addEventListener('click', function () {

    let toggleInput =  this.children[0];

    // Toggle control
    this.classList.toggle('orange-bg');
    toggleInput.hasAttribute("checked") ? toggleInput.removeAttribute('checked') : toggleInput.setAttribute('checked', '');

    // Tables control
    switch (true) {
        case  toggleInput.hasAttribute("checked"):
            for (let i = 0; i < hideElements.length; i++) {
                hideElements[i].classList.remove('hide-mobil')
                hideElements[i].classList.remove('hide-tablet')
            }
            break;
    
        default:
            for (let i = 0; i < hideElements.length; i++) {
                hideElements[i].classList.add('hide-mobil')
                hideElements[i].classList.add('hide-tablet')
            }
            break;
    }

})



