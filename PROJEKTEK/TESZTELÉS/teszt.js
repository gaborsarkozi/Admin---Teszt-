/* 

Feladat 1 

Rajzolj tíz négyzetet úgy, hogy csak egyszer írod le a kódodban a fillRect() függvényt.
Amikor meghívod a fillRect() függvényt, kizárólag változókat használj argumentumként.
Minden négyzet legyen 45 egység széles és 45 egység magas.
Az első négyzet a canvas bal felső sarkában helyezkedjen el, 20 egységre a szélektől.
Minden további négyzet az azt megelőző négyzet közepén kezdődjön.
A négyzetek színe legyen félig átlátszó narancssárga (rgba(255,165,0,.5)).
A pozicionáláshoz használt változót a cikluson kívül deklaráld, és a cikluson belül változtasd meg az értékét.



var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var size = 45; 

 for (squareCounter = 0; squareCounter < 10; squareCounter++) {
    var positionX = 20;
    var positionY = 20;
    positionX += (squareCounter * 20);
    positionY += (squareCounter * 20);
    context.fillStyle = 'rgba(255,165,0,.5)';
    context.fillRect(positionX, positionY, size, size);
} 


*/ 



/* 


Feladat 2 

Rajzolj 15 négyzetet 5 sorba úgy, hogy csak egyszer írod le a kódodban a fillRect() függvényt.
Minden sorban az aktuális sor számával egyenlő számú négyzet legyen (például a 3. sor 3 négyzetet tartalmazzon).
Amikor meghívod a fillRect() függvényt, kizárólag változókat használj a négyzetek pozíciójának kiszámításához és méretének megadásához.
Minden négyzet legyen 50 egység széles és 50 egység magas.
Az első négyzet a canvas bal felső sarkában helyezkedjen el, 15 egységre a szélektől.
A négyzetek között legyen 5 egységnyi térköz.
A négyzetek színe legyen félig átlátszó narancssárga (rgba(255,165,0,.5)).
Használj egymásba ágyazott ciklusokat, ügyelve arra, hogy ne változtasd meg az értékét olyasminek, amit nem akarsz módosítani. 




var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var position = 15;

var size = 50; 
var padding = 5; 


for (rowCounter = 0; rowCounter < 5; rowCounter++) {
    context.fillStyle = 'rgba(255,165,0,.5)';
    for (squareCounter = 0; squareCounter <= rowCounter; squareCounter++){
        context.fillRect(position +  squareCounter * (size + padding), position + rowCounter * (size + padding), size, size);
    }
}
 
*/







/* 
Feladat 3 



Rajzolj egy 6x6-os négyzetrácsot úgy, hogy csak egyszer írod le a kódodban a fillRect() függvényt.
Amikor meghívod a fillRect() függvényt, kizárólag változókat használj a négyzetek pozíciójának és méretének megadásához.
Minden négyzet legyen 30 egység széles és 30 egység magas.
Az első négyzet 125 egységre helyezkedjen el a canvas bal szélétől és 50 egységre a felső szélétől.
A négyzetek között legyen 5 egységnyi térköz.
A legelső négyzet színe legyen rgb(255,79,120).
Négyzetenként csökkentsd az rgb() szín vörös komponensének értékét 7-tel, az előző négyzethez képest.
Soronként növeld az rgb() szín kék komponensének értékét 15-tel, az előző sorhoz képest.
Amikor hozzárendeled az rgb() színt a fillStyle tulajdonsághoz, használj összefűzést (angolul concatenation).




var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');


var positionY = 50;

var size = 30; 
var padding = 5; 

var red = 255; 
var green = 79;
var blue = 120; 


for (lineCounter = 0; lineCounter < 6; lineCounter++) {
    var positionX = 125;
    for (squareCounter = 0; squareCounter < 6; squareCounter++) {
        context.fillStyle = 'rgba(' + red + ', ' + green + ', ' + blue + ')';
        context.fillRect(positionX, positionY, size, size);
        red -= 7;
        positionX += size + padding;
    }
    blue += 15;
    positionY += padding + size; 
}


*/


/* 

Feladat 4 


Rajzolj harminc háromszöget úgy, hogy a moveTo() és stroke() függvényeket csak egyszer írod le a kódodban, a lineTo() függvényt pedig legfeljebb háromszor.
Amikor meghívod a függvényeket, használj változókat a koordináták kiszámításához.
A háromszögek alapja és magassága legyen 100 egységnyi (a háromszögek legyenek 100 egység szélesek és 100 egység magasak).
Az első háromszög bal alsó csúcsa 120 egységre helyezkedjen el a szélektől.
Minden ezt követő háromszöget 5 egységgel tolj el mindkét koordinátatengely mentén az előző háromszöghöz képest.
A háromszögek körvonalai legyenek szürkék.


var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');


var position = 120;
var size = 100;
var padding = 5;

for (triangleCounter = 0; triangleCounter < 30; triangleCounter++) {
    context.beginPath();
    context.moveTo(position + padding, position + padding);
    context.lineTo(position + size + padding, position + padding);
    context.lineTo(position + size / 2 + padding, position - size + padding);
    context.lineTo(position + padding, position + padding);
    context.strokeStyle = 'grey';
    context.stroke();
}


/* 


Feladat 5

Rajzolj 17 téglalapot úgy, hogy csak egyszer írod le a kódodban a fillRect() függvényt.
Amikor meghívod a fillRect() függvényt, kizárólag változókat használj a téglalapok pozíciójának és méretének megadásához.
Az első téglalap teljesen töltse ki a canvas-t.
Minden további téglalap összes csúcsa legyen az előző téglalap csúcsaihoz képest 10 egységgel beljebb pozicionálva a canvas-on.
Az első téglalap színe legyen hsl(360,60%,45%).
Téglalaponként csökkentsd a hsl() szín hue értékét (az első paraméter értékét) 360/17-del, az előző téglalaphoz képest.
Megjegyzés: A hsl() függvény a szín megadásának egy további módja. Három paraméterrel rendelkezik: hsl(hue, saturation, lightness). A hue (színárnyalat) értéke egy 0 és 360 közé eső szám, és egy színkörön határoz meg egy fokot. A saturation (telítettség) és lightness (világosság) értékét százalékban kell meghatározni.

Amikor hozzárendeled a hsl() színt a fillStyle tulajdonsághoz, használj összefűzést (angolul concatenation). 

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var positionX = 0; 
var positionY = 0;

var hueValue = 360;
var saturationValue = 60; 
var lightnessValue = 45;

var padding = 10; 


for (rectangle = 0; rectangle < 17; rectangle++) {
    var color = 'hsl(' + hueValue + ', ' + saturationValue + '%, ' + lightnessValue + '%)';
    context.fillStyle = color;
    context.fillRect(positionX + (rectangle * padding), positionY + (rectangle * padding), canvasWidth - (rectangle * (padding * 2)), canvasHeight - (rectangle * (padding * 2)) );
    hueValue -= (360/17);
} 

*/





/* 


Feladat 6


Rajzolj 15 négyzetet úgy, hogy csak egyszer írod le a kódodban a fillRect() függvényt.
Amikor meghívod a fillRect() függvényt, kizárólag változókat használj a négyzetek pozíciójának kiszámításához és méretének megadásához.
Minden négyzet legyen 50 egység széles és 50 egység magas.
Az első négyzet a canvas bal felső sarkában helyezkedjen el, 20 egységre a canvas bal szélétől és 15 egységre a felső szélétől.
Minden ezt követő négyzetet 20 egységgel tolj el a vízszintes tengely mentén és 15 egységgel a függőleges tengely mentén, az előző négyzethez képest.
Ha az aktuális négyzet sorszáma:
osztható 3-mal, akkor a négyzet színe legyen félig átlátszó kék (rgba(0,0,255,.5)) (például a 3. négyzet legyen kék).
osztható 5-tel, akkor a négyzet színe legyen félig átlátszó sárga (rgba(255,255,0,.5)) (például az 5. négyzet legyen sárga).
osztható 3-mal és 5-tel is, akkor a négyzet színe legyen félig átlátszó zöld (rgba(0,255,0,.5)) (azaz a 15. négyzet legyen zöld).
nem osztható sem 3-mal, sem 5-tel, akkor a négyzet színe legyen félig átlátszó fekete (rgba(0,0,0,.5)).




var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var size = 50;     
var positionX = 20; 
var positionY = 15; 



for (squareCounter = 1; squareCounter < 16; squareCounter++) {
    
    if ( squareCounter % 15 === 0) {
        context.fillStyle = 'rgba(0,255,0,.5)';
    } else if (squareCounter % 5 === 0) {
        context.fillStyle = 'rgba(255,255,0,.5)';
    } else if (squareCounter % 3 === 0) {
        context.fillStyle = 'rgba(0,0,255,.5)';
    } else {
        context.fillStyle = 'rgba(0,0,0,.5)';
    };
    
    context.fillRect(positionX, positionY, size, size);
    positionX += 20;
    positionY += 15;

}


*/ 


/* 


Feladat 7 



Rajzolj vonalakat úgy, hogy a moveTo() és stroke() függvényeket csak egyszer írod le a kódodban, a lineTo() függvényt pedig legfeljebb kétszer.
Amikor meghívod a függvényeket, használj változókat a koordináták kiszámításához.
Az első vonal a canvas bal szélének közepétől húzódjon.
Minden ezt követő vonal kezdőpontját 3 egységgel told el az előző vonalhoz képest, a vízszintes felezővonal mentén.
Az utolsó vonal a canvas jobb szélének közepétől húzódjon.
A vonal végpontja legyen:
a canvas felső szélének közepe, ha a kezdőpont x koordinátája páros szám;
a canvas alsó szélének közepe, ha a kezdőpont x koordinátája páratlan szám.
A vonalak színe legyen félig átlátszó piros (rgba(255,0,0,.5)).



var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;  


for (var unitCounter = 0; unitCounter <= canvasWidth; unitCounter++) {
    if (unitCounter % 3 === 0) {
        context.beginPath();
        context.moveTo(unitCounter, canvasHeight / 2);
        if (unitCounter % 2 === 0) {
            context.lineTo(canvasWidth / 2, canvasHeight - canvasHeight);
        } else {
            context.lineTo(canvasWidth / 2, canvasHeight);
        }
        context.strokeStyle = 'rgba(255,0,0,.5)';
        context.stroke();
    }
}

*/


/*

FELADAT 8 


Rajzolj vonalakat úgy, hogy a moveTo() és stroke() függvényeket csak egyszer írod le a kódodban, a lineTo() függvényt pedig legfeljebb négyszer.
Amikor meghívod a függvényeket, használj változókat a koordináták kiszámításához.
Az első vonal a canvas bal szélének közepétől húzódjon.
Minden ezt követő vonal kezdőpontját 1 egységgel told el az előző vonalhoz képest, a vízszintes felezővonal mentén.
Az utolsó vonal a canvas jobb szélének közepétől húzódjon.
Ha a kezdőpont x koordinátája 4-gyel osztva:
0-t ad maradékul, akkor a vonal végpontja a canvas bal felső sarka legyen;
1-et ad maradékul, akkor a vonal végpontja a canvas jobb felső sarka legyen;
2-t ad maradékul, akkor a vonal végpontja a canvas bal alsó sarka legyen;
3-at ad maradékul, akkor a vonal végpontja a canvas jobb alsó sarka legyen.
A vonalak színe legyen félig átlátszó kék (rgba(0,0,255,.5)).



var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

for (var unitCounter = 0; unitCounter <= canvasWidth; unitCounter++) {
    context.beginPath();
    context.moveTo(unitCounter, canvasHeight / 2);
    if (unitCounter % 4 === 0) {
        context.lineTo(canvasWidth - canvasWidth, canvasHeight - canvasHeight);
    } else if (unitCounter % 4 === 1) {
        context.lineTo(canvasWidth, canvasHeight - canvasHeight);
    } else if (unitCounter % 4 === 2) {
        context.lineTo(canvasWidth - canvasWidth, canvasHeight);
    } else if (unitCounter % 4 === 3) {
        context.lineTo(canvasWidth, canvasHeight);
    } else {
        console.log('Something is wrong.');
    }
    context.strokeStyle = 'rgba(0,0,255,.5)';
    context.stroke();
}



*/



/* 


FELADAT 9



Hozz létre egy triangle(positionX, positionY, size) függvényt, amely a meghívásakor egy háromszöget rajzol.
A függvény három paramétert fogad: a positionX és positionY a háromszög felső csúcsának a koordinátái, a size pedig a háromszög alapjának (szélességének) és magasságának a mérete.
Használd ezeket a paramétereket a koordináták kiszámításához a moveTo() és lineTo() függvényekben.
A vonalak színe legyen félig átlátszó fekete (rgba(0,0,0,.5)).
A háromszöget kitöltő szín legyen félig átlátszó narancssárga (rgba(255,165,0,.5)).
Rajzolj három háromszöget a függvényed háromszori meghívásával:
triangle(230, 160, 50);
triangle(270, 100, 50);
triangle(200, 50, 150);




var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

*/ 




var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

function triangle(positionX, positionY, size) {

    context.beginPath();
    context.moveTo(positionX, positionY);
    context.lineTo(positionX + size / 2, positionY + size);
    context.lineTo(positionX - size / 2, positionY + size);
    context.lineTo(positionX, positionY);
    context.strokeStyle = 'rgba(0,0,0,.5)';
    context.stroke();

} 



/*    

    function triangle(positionX, positionY, size) {
        context.beginPath();
        context.moveTo(positionX, positionY);
        context.lineTo(positionX + size, positionY + size);
        context.lineTo(positionX + size, positionY + size);
        context.lineTo(50, 150);
        context.lineTo(100, 100);

        
    
    } 
    
    
    
*/