/* 
 *From: https://www.npmjs.com/package/typewriter-effect
*/ 
  (function() {
      
    const appLogoName = document.getElementById('appLogoName');

    const typewriterLogoName = new Typewriter(appLogoName, {
      loop: true,
      delay: 75,
    });
    
    typewriterLogoName 
      .pauseFor(2500)
      .typeString('<span style="color: var(--color-light);">design.</span>')
      .pauseFor(1000)
      .deleteChars(10)
      .typeString('<span style="color: var(--color-green);">fun.</span>')
      .pauseFor(1000)
      .deleteChars(10)
      .typeString('<span style="color: var(--color-strong);">design.</span>')
      .pauseFor(1000)
      .deleteChars(10)
      .start();

  })();

