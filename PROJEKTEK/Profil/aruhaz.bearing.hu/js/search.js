function clearForm() {
    document.getElementById("noraktaronBox").classList.remove("checked");
    document.getElementById("out_of_stock_checkbox").checked = false;
    document.getElementById("termekekNGField").value = "";
    //document.getElementById("innerSizeField").value="";
    //document.getElementById("outerSizeField").value="";
    //document.getElementById("widthSizeField").value="";
    document.getElementById("advancedSearchSelector").value = "";
    $("#innerSizeSelect")[0].selectedIndex = 0;
    $("#outerSizeSelect")[0].selectedIndex = 0;
    $("#widthSizeSelect")[0].selectedIndex = 0;

    if ($("#arucsoport").length != 0) {
        $("#arucsoport")[0].selectedIndex = 0;
        $("#gyarto")[0].selectedIndex = 0;
    }
    resetSizeBoxes();
}

function resetSizeBoxes() {
    $("#innerSizeSelect")[0].selectedIndex = 0;
    $("#outerSizeSelect")[0].selectedIndex = 0;
    $("#widthSizeSelect")[0].selectedIndex = 0;
    $("#innerSizeSelect").empty();
    $("#outerSizeSelect").empty();
    $("#widthSizeSelect").empty();
    $.get(
        "json_getInnerSizes_py", {},
        function(data) {
            var obj = JSON.parse(data);
            var innerSizesList = obj[0];
            var outerSizesList = obj[1];
            var widthSizesList = obj[2];
            $('#outerSizeSelect').attr("optionlength", outerSizesList.length);
            $('#outerSizeSelect').empty().append($('<option>', {
                value: "",
                text: "- Mind* -"
            }));

            $.each(outerSizesList, function(i, item) {
                $('#outerSizeSelect').append($('<option>', {
                    value: item,
                    text: item
                }));
            });
            $('#widthSizeSelect').attr("optionlength", widthSizesList.length);
            $('#widthSizeSelect').empty().append($('<option>', {
                value: "",
                text: "- Mind* -"
            }));

            $.each(widthSizesList, function(i, item) {
                $('#widthSizeSelect').append($('<option>', {
                    value: item,
                    text: item
                }));
            });
            $('#innerSizeSelect').attr("optionlength", innerSizesList.length);
            $('#innerSizeSelect').empty().append($('<option>', {
                value: "",
                text: "- Mind* -"
            }));

            $.each(innerSizesList, function(i, item) {
                $('#innerSizeSelect').append($('<option>', {
                    value: item,
                    text: item
                }));
            });
        }
    );

}

function saveKosar() {
    $.get(
        "saveCart", {},
        function(data) {}
    );
}

function doAdvancedSearch() {
    selector = document.getElementById("advancedSearchSelector");
    selector.value = "on";
    document.getElementById("searchForm").action = "/";
    document.getElementById("searchForm").submit();
}

function addToCartICH(prcode, currency) {

}

function addToCart(internal_kod, currency, subCartId = null) {
    var internal_kodNS = getNS(internal_kod);
    amount = document.getElementById("a_" + internal_kodNS).value;
    price = document.getElementById("p_" + internal_kodNS).value;
    keszletVal = document.getElementById("k_" + internal_kodNS).innerHTML;
    see_keszlet = false;
    if (isNumeric(keszletVal)) {
        keszlet = Number(keszletVal);
        see_keszlet = true;
    } else keszlet = 0;

    //    tr = document.getElementById("tr_" + internal_kodNS);
    //    flash($(tr));
    var trselector = "tr_" + internal_kodNS;
    var elms = document.querySelectorAll("[id=" + trselector + "]");
    flash($(elms));

    //    tr.css("background-color","#FF3700");
    if (see_keszlet && amount > keszlet) {
        alert("Az elérhetö készleten felüli mennyiséget adott meg, a maradékot ajánlatkérésre módosítottuk");
    }
    if (subCartId !== null)
        qp = {
            "orders.price:records": price,
            "orders.quantity:records": amount,
            "orders.id:records": internal_kod,
            "pageId": "search",
            "currency": currency,
            cartId: subCartId
        }
    else
        qp = {
            "orders.price:records": price,
            "orders.quantity:records": amount,
            "orders.id:records": internal_kod,
            "pageId": "search",
            "currency": currency
        }
    $.get(
        "addItems",
        qp,
        function(data) {
            spl = data.split(",");
            document.getElementById("shopping_cart_text").innerHTML = spl[0] + " tétel, " + spl[1];
            document.getElementById("kosarLink").href = "kosar_oldal";
            saveKosar();
        }
    );
    document.getElementById("kosarLink").href = "#";
    document.getElementById("a_" + internal_kodNS).value = "1";
    if (amount > keszlet) {
        if (see_keszlet)
            document.getElementById("k_" + internal_kodNS).innerHTML = "0";
        //       else 
        //           document.getElementById("k_" + internal_kodNS).innerHTML = "Rendelhetö";
    } else {
        if (see_keszlet) {
            var kselector = "k_" + internal_kodNS;
            var elms = document.querySelectorAll("[id=" + kselector + "]");
            for (var i = 0; i < elms.length; i++)
                elms[i].innerHTML = keszlet - amount;
            //            console.log(elms);
            //            document.getElementById("k_" + internal_kodNS).innerHTML = keszlet - amount;
        }
    }
}

function haddToCart(internal_kod, currency) {
    var internal_kodNS = getNS(internal_kod);
    tr = $(document.getElementById("rpl_" + internal_kodNS));
    flash(tr);
    amount = document.getElementById("ha_" + internal_kodNS).value;
    price = document.getElementById("hp_" + internal_kodNS).value;
    keszletVal = document.getElementById("hk_" + internal_kodNS).innerHTML;
    see_keszlet = false;
    if (isNumeric(keszletVal)) {
        keszlet = Number(keszletVal);
        see_keszlet = true;
    } else keszlet = 0;

    if (see_keszlet && amount > keszlet) {
        alert("Az elérhetö készleten felüli mennyiséget adott meg, a maradékot ajánlatkérésre módosítottuk");
    }
    $.get(
        "addItems", {
            "orders.price:records": price,
            "orders.quantity:records": amount,
            "orders.id:records": internal_kod,
            "pageId": "search",
            "currency": currency
        },
        function(data) {
            spl = data.split(",");
            document.getElementById("shopping_cart_text").innerHTML = spl[0] + " tétel, " + spl[1];
            document.getElementById("kosarLink").href = "kosar_oldal";
            saveKosar();
        }
    );
    document.getElementById("kosarLink").href = "#";
    document.getElementById("ha_" + internal_kodNS).value = "1";
    if (amount > keszlet) {
        if (see_keszlet)
            document.getElementById("hk_" + internal_kodNS).innerHTML = "0";
        //      else 
        //          document.getElementById("hk_" + internal_kodNS).innerHTML = "Rendelhetö";
    } else {
        if (see_keszlet) {
            document.getElementById("hk_" + internal_kodNS).innerHTML = keszlet - amount;
        }
    }
}