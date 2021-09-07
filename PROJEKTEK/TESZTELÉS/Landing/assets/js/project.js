/* ---------- Change color --------------- */

/* const [red, green, blue] = [69, 111, 225]
const projectHeadSection = document.querySelector('.project-head-section')

window.addEventListener('scroll', () => {
    const y = 1 + (window.scrollY || window.pageYOffset) / 150
    const [r, g, b] = [red / y, green / y, blue / y].map(Math.round)
    projectHeadSection.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
})
 */



$(document).ready(function(){
   $(window).scroll(function(){
       $('.project-head-section').css("opacity", 1- $(window).scrollTop() / 200)
   })
})
