var koltsegvetesVezerlo = (function () {
    
    var a = 36;
    var osszead = function (b) {
        return a + b
    }

    return {
        teszt: function (x) {
            console.log(osszead(x))
        }
    }

})();


koltsegvetesVezerlo.teszt(345)
koltsegvetesVezerlo.teszt(-1)