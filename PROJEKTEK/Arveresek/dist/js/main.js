
/* Árverés app */


(function () {

  /* Gombok begyűjtése */
  const bidButton = document.getElementById("bidButton");
  const autoBidButton = document.getElementById("autoBidButton");
  const fixPriceBuyButton = document.getElementById("fixPriceBuyButton");

  /* Popup ablakok begyűjtése */
  const sikeresLicitPopup = document.querySelector("#sikeresLicit");
  const sikertelenLicitPopup = document.querySelector("#sikertelenLicit");
  const sikeresAutoLicitPopup = document.querySelector("#sikeresAutoLicit");
  const sikeresAutoLicitRemovePopup = document.querySelector("#sikeresAutoLicitRemove");


  const tesztAuctionDone = document.querySelector("#auctionCard");


  const currentPrice = document.querySelector("#auctionItemCurrentPrice");
  const fixPriceInput = document.querySelector("#inputFix");
  const autoLicitInput = document.querySelector("#inputAutoLicit");

  let newBidInput = document.getElementById("newBidInput");

  let fixPriceNumber = parseInt(fixPriceInput.value);

  let currentPriceNumber = parseInt(currentPrice.value);
  let biddingIncrementNumber = parseInt(newBidInput.step);


  /* Auto licit értékének állítása: fix ár - 5 x licitlépcső */
  autoLicitInput.value = (fixPriceNumber - (5 * biddingIncrementNumber));

  /* Aktuális licit érték állítás */
  newBidInput.value = currentPrice.value;

  /* Aktuális licit min érték állítás */
  newBidInput.setAttribute("min", (currentPriceNumber + biddingIncrementNumber));


  /* Fix áron vásárlás gomb megnyomása */ 
  fixPriceBuyButton.addEventListener("click", function () {

    /* Befejezett aukció div létrehozása */ 
    let closedAuction = document.createElement('div');
    closedAuction.classList ="auction__sold__div";
    closedAuction.innerHTML = 
    `<div class="auction__sold__layer">
    <h1 class="auction__sold__text">Ezt a termékét megvásárolták.</h1>
    <h5 class="auction__sold__subtext mb-3">Az aukciónak vége!</h5>
    </div>
    `;

    /* Befejezett aukció div hozzáadás */ 
    tesztAuctionDone.appendChild(closedAuction);

  })


  /* Automatikus licit gomb megnyomása */
  autoBidButton.addEventListener("click", function () {

    /* Auto licit gombok létrehozása és cseréje */
    this.parentNode.innerHTML = `
    <button id="autoBideEditButton" type="button" class="btn btn-change">Módosítás <svg id="refreshIcon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><path d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"/></svg>
    </button>
    <button id="autoBideRemoveButton" type="button" class="btn btn-delete">Törlés <i class="icon-close icon"></i></button>
    `;

    /* Sikeres auto licit popup */
    sikeresAutoLicitPopup.classList.toggle("show");
    setTimeout(function () {
      sikeresAutoLicitPopup.classList.toggle("show");
    }, 5000);


    /* Automatikus licit gomb begyűjtése */
    const autoBidEditButton = document.getElementById("autoBideEditButton");
    const autoBidRemoveButton = document.getElementById("autoBideRemoveButton");
    const refreshIcon = document.getElementById("refreshIcon");


    /* Automatikus licit módosítás gomb megnyomása */
    autoBidEditButton.addEventListener("click", function () {


      /* Refresh icon animáció */
      refreshIcon.classList.toggle("rotate-animation");
      setTimeout(function () {
        refreshIcon.classList.toggle("rotate-animation");
      }, 4000);

      /* Sikeres auto licit módosítás popup */
      sikeresAutoLicitPopup.classList.toggle("show");
      setTimeout(function () {
        sikeresAutoLicitPopup.classList.toggle("show");
      }, 5000);

    });

    /* Automatikus licit törlés gomb megnyomása */
    autoBidRemoveButton.addEventListener("click", function () {
      this.parentNode.innerHTML = `
      <button id="autoBidButton" type="button" class="btn btn-auction">Auto licit <i class="icon-cup icon"></i></button>
      `;

      /* Sikeres auto licit módosítás popup */
      sikeresAutoLicitRemovePopup.classList.toggle("show");
      setTimeout(function () {
        sikeresAutoLicitRemovePopup.classList.toggle("show");
      }, 5000);
    })

  });


  /* Licit gomb megnyomása */
  bidButton.addEventListener("click", function () {

    if (newBidInput.value > currentPrice.value) {

      /* Aktuális ár állítása licit után*/
      currentPrice.value = newBidInput.value;

      /* Minimum licitérték állítása aktuális árra + licitlépcső */
      let currentTokenNumber = parseInt(newBidInput.value);
      let biddingIncrementNumber = parseInt(newBidInput.step);
      newBidInput.setAttribute("min", (currentTokenNumber + biddingIncrementNumber));

      /* Sikeres licit popup */
      sikeresLicitPopup.classList.toggle("show");
      setTimeout(function () {
        sikeresLicitPopup.classList.toggle("show");
      }, 5000);

      /* Sikeres gomb színváltás */
      bidButton.classList.toggle("btn-good");
      setTimeout(function () {
        bidButton.classList.toggle("btn-good");
      }, 5000);
    }

    else {
      /* Sikertelen licit popup */
      sikertelenLicitPopup.classList.toggle("show");
      setTimeout(function () {
        sikertelenLicitPopup.classList.toggle("show");
      }, 5000);

      /* Sikertelen gomb színváltás */
      bidButton.classList.toggle("btn-bad");
      setTimeout(function () {
        bidButton.classList.toggle("btn-bad");
      }, 5000);
    }

  });

})();



/* Auction timer */


var countDownDate = new Date("Oct 14, 2021 08:55:00").getTime();
var auctionCard = document.getElementById('auctionCard');
var auctionLink = document.getElementById('auctionLink');

// Run myfunc every second
var myfunc = setInterval(function () {

  var now = new Date().getTime();
  var timeleft = countDownDate - now;

  // Calculating the days, hours, minutes and seconds left
  var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

  // Result is output to the specific element
  document.getElementById("days").innerHTML = days + " nap "
  document.getElementById("hours").innerHTML = hours + " óra "
  document.getElementById("mins").innerHTML = minutes + " perc "
  document.getElementById("secs").innerHTML = seconds + " mp "

  // Display the message when countdown is over
  if (timeleft < 0) {
    clearInterval(myfunc);
    document.getElementById("days").innerHTML = ""
    document.getElementById("hours").innerHTML = ""
    document.getElementById("mins").innerHTML = ""
    document.getElementById("secs").innerHTML = ""
    document.getElementById("end").innerHTML = "Az árverésnek vége!";
    auctionCard.classList.add('disabled-card');
    auctionLink.classList.add('disabled-card');
    auctionLink.setAttribute('disabled', '');
  }
}, 1000);



/* Arrow icon change */


const userListArrow = document.getElementsByClassName('collapsible-link');

for (var i = 0; i < userListArrow.length; i++) {
  userListArrow[i].addEventListener('click', function () {

    const iconArrow = this.children[0];
    iconArrow.classList.toggle('active');

  });
}






