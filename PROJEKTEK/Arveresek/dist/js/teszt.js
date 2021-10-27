function runSAPSearch(qob, target) {
    target.html("");
    $.getJSON("json_getSerachResults", qob, function(data) {
        page = data[0];
        $(page).appendTo(target);
    })
        .fail(function() {
            $('#overlay').fadeOut();
            $("#searchresults").html( "Hiba történt az adatok lekérdezése közben" );
    });
}

function getSearchDict(termekekNG){
    var qstr = {};
    qstr['meta_type'] = "BearingCsapagy";
    qstr['logsearch'] = "on";
    qstr['submit'] = "Keresés";
    qstr['termekekNG'] = termekekNG;
    return qstr;
}

function gotoPage(e, pagenr) {
        e = e || window.event;
        e.preventDefault();
        var termekekNG = $(e.target).closest('.modal-dialog').find(".productnamefield").val();
        if (termekekNG) {
            var qstr = getSearchDict(termekekNG);
            qstr['b_start:int'] = pagenr;
            var target = $(e.target).closest(".modal-dialog").find(".searchcontent");
            runSAPSearch(qstr, target);
        }
    }


function refreshAjanlatList() {
        $.get("getAjanlatList_py", {}, function(data){
            $("#ajanlatTableWrapper").html(data);
            setTimeout(function () {
                initAjanlatListeners();
            }, 1000);
        }).fail(function() {
            alert( "error" );
        });
    }

function initJelolesBtnListener() {
        $(".jelolesbtn").off("click").on("click", function(e){
            var jeloleselement = $(this).closest("div").find(".jeloleselement");
            if (jeloleselement.val()) {
                $('<div class="entry input-group mb-2"><input class="form-control jeloleselement" name="fields[]" type="text" placeholder="Adjon hozzá egy jelölést" /> <span class="input-group-btn"> <button class="btn btn-success btn-add ml-2 jelolesbtn" type="button"> <span class="icon-plus"></span> </button> </span></div>').appendTo($(this).closest("div").closest("div"));
                $(this).hide();
                initJelolesBtnListener();
            }
        });
}

function initUtojelBtnListener() {
        $(".utojelbtn").off("click").on("click", function(e){
            var jeloleselement = $(this).closest("div").find(".jeloleselement");
            if (jeloleselement.val()) {
                $('<div class="entry input-group mb-2"><input class="form-control jeloleselement" name="fields[]" type="text" placeholder="Adjon hozzá egy utójelet" /> <span class="input-group-btn"> <button class="btn btn-success btn-add ml-2 utojelbtn" type="button"> <span class="icon-plus"></span> </button> </span></div>').appendTo($(this).closest("div").closest("div"));
                $(this).hide();
                initUtojelBtnListener();
            }
        });
}

function initDicountListeners(target) {


 /* Discount calculator - HUF */ 

 const discountInputElements = target.getElementsByClassName('discountInput');
 const discountedPriceInput = target.getElementsByClassName("discountedPrice");

 for (var i = 0; i < discountInputElements.length; i++) {

   discountInputElements[i].addEventListener("keyup", function () {

     var discountedPriceInput = this.parentNode.parentNode.parentNode.children[3].children[0].children[0];
     var currentPriceInput =  this.parentNode.parentNode.parentNode.children[1].children[0].children[0];

     var numVal1 = Number(currentPriceInput.value);
     var numVal2 = Number(this.value) / 100;

     var totalValue = numVal1 - (numVal1 * numVal2)
     discountedPriceInput.value = totalValue.toFixed(2);

   });
 }


 for (var i = 0; i < discountedPriceInput.length; i++) {

   discountedPriceInput[i].addEventListener("keyup", function () {

     var discountInputElements = this.parentNode.parentNode.parentNode.children[2].children[0].children[0];
     var currentPriceInput =  this.parentNode.parentNode.parentNode.children[1].children[0].children[0];

     var num1 = Number(currentPriceInput.value);
     var num2 = Number(this.value);
     discountInputElements.value = Math.abs(((num2 * 100) / num1) - 100).toFixed(1);

   });
 }




 /* Discount calculator - EUR */
 
 const discountInputElementsEUR = target.getElementsByClassName('discountInputEUR');
 const discountedPriceInputEUR = target.getElementsByClassName("discountedPriceEUR");

 for (var i = 0; i < discountInputElementsEUR.length; i++) {

   discountInputElementsEUR[i].addEventListener("keyup", function () {

     var discountedPriceInputEUR = this.parentNode.parentNode.parentNode.children[7].children[0].children[0];
     var currentPriceInputEUR =  this.parentNode.parentNode.parentNode.children[5].children[0].children[0];

     var numVal1 = Number(currentPriceInputEUR.value);
     var numVal2 = Number(this.value) / 100;

     var totalValue = numVal1 - (numVal1 * numVal2)
     discountedPriceInputEUR.value = totalValue.toFixed(2);

   });
 }


 for (var i = 0; i < discountedPriceInputEUR.length; i++) {

   discountedPriceInputEUR[i].addEventListener("keyup", function () {

     var discountInputElementsEUR = this.parentNode.parentNode.parentNode.children[6].children[0].children[0];
     var currentPriceInputEUR =  this.parentNode.parentNode.parentNode.children[5].children[0].children[0];

     var num1 = Number(currentPriceInputEUR.value);
     var num2 = Number(this.value);
     discountInputElementsEUR.value = Math.abs(((num2 * 100) / num1) - 100).toFixed(1);

   });
 } 
    
}

function initCikkszamBtnListener() {
        $(".cikkszambtn").off("click").on("click", function(e){
            var jeloleselement = $(this).closest("div").find(".jeloleselement");
            if (jeloleselement.val()) {
                var target = $(this).closest("div.controls03");
                if (target.length == 0)
                    target = $(this).closest("div.edit-controls03");
                /* $('<div class="entry03 input-group mb-2"> <div class="col-5 p-0"> <input class="form-control jeloleselement" id="' + uuidv4() + '" name="fields[]" type="text" placeholder="Adja meg a termék cikkszámát"> </div> <div class="col-2"> <input class="form-control" name="fields[]" type="text" placeholder="%"> </div> <span class="input-group-btn"> <button class="btn btn-success btn-add ml-2 cikkszambtn" type="button"> <span class="icon-plus"></span> </button> </span> <div class="input-group-append ml-md-2"> <button class="btn btn-primary daterange-btn icon-left btn-icon keresesCikkszamAlapjanBtn" type="button" data-toggle="modal" data-target="#keresesCikkszamAlapjan"><i class="fas fa-search"></i>Keresés név alapján</button> </div></div>').appendTo(target); */
                var newStructure = $('<div class="entry03 input-group mb-2"> <div class="col-3 p-0 mb-3"> <input class="form-control jeloleselement" id="' + uuidv4() + '" name="fields[]" type="text" placeholder="Adja meg a termék cikkszámát" > </div> <div class="col-2 mb-3"> <div class="input-group"> <input class="form-control currentPrice" type="text" readonly value=""> <div class="input-group-append"> <span class="input-group-text">HUF</span> </div> </div> </div> <div class="col-2 mb-3"> <div class="input-group"> <input class="form-control discountInput" type="text" max="100" value=""> <div class="input-group-append"> <span class="input-group-text">%</span> </div> </div> </div> <div class="col-2 mb-3"> <div class="input-group"> <input class="form-control discountedPrice" name="fields[]" type="text" placeholder="Ár" value=""> <div class="input-group-append"> <span class="input-group-text">HUF</span> </div> </div> </div> <div class="input-group-append ml-md-2 keresesCikkszamAlapjanBtn"> <button class="btn btn-primary daterange-btn icon-left btn-icon h-75" type="button" data-toggle="modal" data-target="#keresesCikkszamAlapjan"><i class="fas fa-search"></i>Keresés</button> </div> <div class="offset-3 col-2 mb-5"> <div class="input-group"> <input class="form-control currentPriceEUR" type="text" readonly value=""> <div class="input-group-append"> <span class="input-group-text">EUR</span> </div> </div> </div> <div class="col-2 mb-5"> <div class="input-group"> <input class="form-control discountInputEUR" type="text" max="100" value=""> <div class="input-group-append"> <span class="input-group-text">%</span> </div> </div> </div> <div class="col-2 mb-5"> <div class="input-group"> <input class="form-control discountedPriceEUR" name="fields[]" type="text" placeholder="Ár" value=""> <div class="input-group-append"> <span class="input-group-text">EUR</span> </div> </div> </div> <span class="input-group-btn mb-5"> <button class="btn btn-success btn-add ml-2 cikkszambtn" type="button"> <span class="icon-plus"></span> </button> </span> </div>');
                newStructure.appendTo(target);
                $(this).hide();
                initCikkszamBtnListener();
                initkeresesCikkszamAlapjanBtnListener();
                initkeresesCikkszamAlapjanEditBtnListener();
                initDicountListeners(target[0]);
            }
        });
}

function initkeresesCikkszamAlapjanBtnListener() {
    $(".keresesCikkszamAlapjanBtn").off("click").on("click", function(e) {
        var inputField = $(this).closest('div.entry03.input-group.mb-2').find('input.jeloleselement');
        if (!inputField.attr("id"))
            inputField.attr("id", uuidv4());
        $("#targetIdField").val(inputField.attr("id"));
    });           
};

function initkeresesCikkszamAlapjanEditBtnListener() {
    $(".keresesCikkszamAlapjanBtnEdit").off("click").on("click", function(e) {
        var inputField = $(this).closest('div.entry03.input-group.mb-2').find('input.jeloleselement');
        if (!inputField.attr("id"))
            inputField.attr("id", uuidv4());
        $("#targetIdField").val(inputField.attr("id"));
    });           
};

function refreshAjanlatList() {
    $.get("/Ajanlatok/getAjanlatok_py", {}, function(data){
        $("#ajanlatokListPH").replaceWith(data);
    }).fail(function() {
        alert( "error" );
    });
}

function hideInputElement(thiselement) {
        thiselement.prop("checked", false);
        var inputElement = thiselement.closest('div').find('.hidethisitem');
        inputElement.hide();
        thiselement.closest('div').find(".kikapcsolt-resz-form").show();
        inputElement.find('input').each(function(idx){$(this).prop("disabled", true)});
        inputElement.find('select').each(function(idx){$(this).prop("disabled", true)});
        inputElement.find('textarea').each(function(idx){$(this).prop("disabled", true)});
}

function showInputElement(thiselement) {
        thiselement.prop("checked", true);
        var inputElement = thiselement.closest('div').find('.hidethisitem');
        inputElement.show();
        thiselement.closest('div').find(".kikapcsolt-resz-form").hide();
        inputElement.find('input').each(function(idx){$(this).prop("disabled", false)});
        inputElement.find('select').each(function(idx){$(this).prop("disabled", false)});
        inputElement.find('textarea').each(function(idx){$(this).prop("disabled", false)});
}


function initAjanlatListeners() {
    initkeresesCikkszamAlapjanEditBtnListener();
    initJelolesBtnListener();
    initUtojelBtnListener();
    initCikkszamBtnListener();
    //initDicountListeners();
    $(".btn-danger").off("click").on("click", function(e){
        $(this).closest("div").remove();
    })
    $('#biztosTorli').off('shown.bs.modal').on('shown.bs.modal', function (e) {
        $("#deleteThisAjanlatBtn").attr("data-ajanlatid", $(e.relatedTarget).data("ajanlatid"));
    })
    $("#deleteThisAjanlatBtn").off("click").on("click", function(e){
        var ajanlatId = $(this).data("ajanlatid");
        $.get("/Ajanlatok/deleteObject", {'obid': ajanlatId}, function(data){
            if (data) {
                $('#biztosTorli').modal('hide');
                refreshAjanlatList();
            }
        }).fail(function() {
            alert( "error" );
        });
    })


    $('#konkretAjanlatszerkesztese').off('shown.bs.modal').on('shown.bs.modal', function (e) {
        var ajanlatId = $(e.relatedTarget).data("ajanlatid");
        if (e.target.id != 'konkretAjanlatszerkesztese')
            return;
        $.get("Ajanlatok/getAjanlatInfo_py", {'ajanlatId': ajanlatId}, function(myajanlat){
                $("#editAjanlatBtn").attr("data-ajanlatid", ajanlatId);
                $("#titleEditBox").val(myajanlat.title);
                $("#shortContentEditBox").val(myajanlat.shortText);
                //$("#mainPictureEdit").attr("value", '/Ajanlatok/' + ajanlatId + "/mainPicture");
                $("#mainPictureEditImg").attr("src", '/Ajanlatok/' + ajanlatId + "/mainPicture?timestamp=" + new Date().getTime());
                //$('#roleSelectEdit option[value="' + myajanlat.funkciok[0] + '"]').prop("selected", true);
                $(myajanlat.funkciok).each(function(i){
                    $('#roleSelectEdit option[value="' + this + '"]').prop("selected", true);
                });
                $("#startdateEdit").val(myajanlat.validFrom);
                $("#enddateEdit").val(myajanlat.validUntil);
                if (myajanlat.arukategoria) {
                    showInputElement($("#toggleArucsoportEdit"));
                    $('#categoryEditSelect option[value="' + myajanlat.arukategoria + '"]').prop("selected", true);
                } else {
                    hideInputElement($("#toggleArucsoportEdit"));                    
                };
                if (myajanlat.catalogurl) {
                    showInputElement($("#toggleKatalogusFeltoltesEdit"));
                    $("#customFileCatalogEdit").next("label").html(myajanlat.catalogFileName)
                } else {
                    hideInputElement($("#toggleKatalogusFeltoltesEdit"));
                    $("#customFileCatalogEdit").next("label").html("Katalógus választása")
                    //$("label.kataloguslabel").html("Katalógus választása");
                }
                if (myajanlat.bannerpicurl){
                    showInputElement($("#toggleBannerKepEdit"));
                    //$("#bannerPictureEdit").attr("value", myajanlat.bannerpicurl);
                    $("#bannerPictureEditImg").attr("src", myajanlat.bannerpicurl + "?timestamp=" + new Date().getTime());
                } else {
                    hideInputElement($("#toggleBannerKepEdit"));
                }
                $("#bannerTextBoxEdit").val(myajanlat.bannerText);
                if (myajanlat.itemTitle) {
                    showInputElement($("#toggleTermekLeirasCimEdit"));
                    $("#termekLeirasCimEdit").val(myajanlat.itemTitle);
                } else {
                    hideInputElement($("#toggleTermekLeirasCimEdit"));
                }
                if (myajanlat.termekLeiras){
                    showInputElement($("#toggleTermekLeirasEdit"));
                    $("#termekLeirasEdit").val(myajanlat.termekLeiras);
                } else {
                    hideInputElement($("#toggleTermekLeirasEdit"));
                }
                if (myajanlat.itempicurl){
                    showInputElement($("#toggleTermekfotoKivalasztasEdit"));
                    //$("#itemPictureEdit").attr("value", myajanlat.itempicurl);
                    $("#itemPictureEditImg").attr("src", myajanlat.itempicurl+ "?timestamp=" + new Date().getTime());
                } else {
                    hideInputElement($("#toggleTermekfotoKivalasztasEdit"));
                }
                if (myajanlat.felhasznalasiPicUrls) {
                    showInputElement($("#toggleFelhasznalasiTeruletEdit"));
                    $("#menuFelhasznalasiTeruletKepekEdit input").each(function(i){
                        if (myajanlat.felhasznalasiPicUrls[i]) {
                            //$(this).attr("value", myajanlat.felhasznalasiPicUrls[i]);
                            $(this).attr("value", "");
                            $(this).parent("label").find("figure img").attr("src", myajanlat.felhasznalasiPicUrls[i] + "?timestamp=" + new Date().getTime());
                        } else {
                            $(this).attr("value", "");
                            $(this).next("img").attr("src", "");
                        }

                    });
                } else {
                    hideInputElement($("#toggleFelhasznalasiTeruletEdit"));
                }
                if (myajanlat.felhasznalasiterulet){
                    showInputElement($("#toggleFelhasznalasiTeruletEdit"));
                    $("#menuFelhasznalasiTeruletEdit input").each(function(i){
                        if (myajanlat.felhasznalasiterulet[i]) {
                            $(this).val(myajanlat.felhasznalasiterulet[i]);
                        } else {
                            $(this).attr("value", "");
                        }

                    });
                } else {
                    hideInputElement($("#toggleFelhasznalasiTeruletEdit"));
                }
                if (myajanlat.jelolesek){
                    $("#jelolesekEditPH").html("");
                    showInputElement($("#toggleJelolesekEdit"));
                    $(myajanlat.jelolesek).each(function(i){
                        if (i == myajanlat.jelolesek.length - 1)
                            $('<div class="edit-entry input-group mb-2"><input class="form-control jeloleselement" name="fields[]" type="text" placeholder="Adjon hozzá egy jelölést" value="' + this + '"/> <span class="input-group-btn"> <button class="btn ml-2 btn-remove btn-danger" type="button"><span class="icon-close"></span></button> <button class="btn btn-success btn-add ml-2 utojelbtn" type="button"> <span class="icon-plus"></span> </button> </span></div>').appendTo($("#jelolesekEditPH"));
                        else
                            $('<div class="edit-entry input-group mb-2"><input class="form-control jeloleselement" name="fields[]" type="text" placeholder="Adjon hozzá egy jelölést" value="' + this + '"/> <span class="input-group-btn"> <button class="btn ml-2 btn-remove btn-danger" type="button"><span class="icon-close"></span></button> </span></div>').appendTo($("#jelolesekEditPH"));
                    });
                } else {
                    hideInputElement($("#toggleJelolesekEdit"));
                }
                if (myajanlat.utojelek){
                    $("#utojelekEditPH").html("");
                    showInputElement($("#menuUtojelekEditKikapcs"));
                    $(myajanlat.utojelek).each(function(i){
                        if (i == myajanlat.utojelek.length - 1)
                            $('<div class="edit-entry input-group mb-2"><input class="form-control jeloleselement" name="fields[]" type="text" placeholder="Adjon hozzá egy jelölést" value="' + this + '"/> <span class="input-group-btn"> <button class="btn ml-2 btn-remove btn-danger" type="button"><span class="icon-close"></span></button> <button class="btn btn-success btn-add ml-2 utojelbtn" type="button"> <span class="icon-plus"></span> </button> </span></div>').appendTo($("#utojelekEditPH"));
                        else
                            $('<div class="edit-entry input-group mb-2"><input class="form-control jeloleselement" name="fields[]" type="text" placeholder="Adjon hozzá egy jelölést" value="' + this + '"/> <span class="input-group-btn"> <button class="btn ml-2 btn-remove btn-danger" type="button"><span class="icon-close"></span></button> </span></div>').appendTo($("#utojelekEditPH"));
                    });
                } else {
                    hideInputElement($("#menuUtojelekEditKikapcs"));
                }

                if (myajanlat.akciosokdict){
                    $("#akciosokEditPH").html("");
                    showInputElement($("#toggleAkciosAjanlatEdit"));
                    var akciostermekids = Object.keys(myajanlat.akciosokdict);
                    $(akciostermekids).each(function(i){
                        var saledata = myajanlat.akciosokdict[this];
                        if (i == akciostermekids.length - 1)
                           /*  $('<div class="entry03 input-group mb-2"> <div class="col-5 p-0"> <input class="form-control jeloleselement" id="' + uuidv4() + '" name="fields[]" type="text" placeholder="Adja meg a termék cikkszámát" value="' + this + '"> </div> <div class="col-2"> <input class="form-control" name="fields[]" type="text" placeholder="%" value="' + myajanlat.akciosokdict[this] + '"> </div> <span class="input-group-btn"> <button class="btn ml-2 btn-remove btn-danger" type="button"><span class="icon-close"></span></button> <button class="btn btn-success btn-add ml-2 cikkszambtn" type="button"> <span class="icon-plus"></span> </button> </span> <div class="input-group-append ml-md-2"> <button class="btn btn-primary daterange-btn icon-left btn-icon keresesCikkszamAlapjanBtn" type="button" data-toggle="modal" data-target="#keresesCikkszamAlapjan"><i class="fas fa-search"></i>Keresés név alapján</button> </div></div>').appendTo($("#akciosokEditPH")); */
                            $('<div class="entry03 input-group mb-2"> <div class="col-2 p-0 mb-3"> <input class="form-control jeloleselement" id="' + uuidv4() + '" name="fields[]" type="text" placeholder="Adja meg a termék cikkszámát" value="' + this + '" > </div> <div class="col-2 mb-3"> <div class="input-group"> <input class="form-control currentPrice" type="text" readonly value="' + saledata[0] + '"> <div class="input-group-append"> <span class="input-group-text">HUF</span> </div> </div> </div> <div class="col-2 mb-3"> <div class="input-group"> <input class="form-control discountInput" type="text" max="100" value="' + saledata[1] + '"> <div class="input-group-append"> <span class="input-group-text">%</span> </div> </div> </div> <div class="col-2 mb-3"> <div class="input-group"> <input class="form-control discountedPrice" name="fields[]" type="text" placeholder="Ár" value="' + saledata[2] + '"> <div class="input-group-append"> <span class="input-group-text">HUF</span> </div> </div> </div> <div class="input-group-append ml-md-2 keresesCikkszamAlapjanBtn"> <button class="btn btn-primary daterange-btn icon-left btn-icon h-75" type="button" data-toggle="modal" data-target="#keresesCikkszamAlapjan"><i class="fas fa-search"></i>Keresés</button> </div> <div class="offset-2 col-2 mb-5"> <div class="input-group"> <input class="form-control currentPriceEUR" type="text" readonly value="' + saledata[3] + '"> <div class="input-group-append"> <span class="input-group-text">EUR</span> </div> </div> </div> <div class="col-2 mb-5"> <div class="input-group"> <input class="form-control discountInputEUR" type="text" max="100" value="' + saledata[4] + '"> <div class="input-group-append"> <span class="input-group-text">%</span> </div> </div> </div> <div class="col-2 mb-5"> <div class="input-group"> <input class="form-control discountedPriceEUR" name="fields[]" type="text" placeholder="Ár" value="' + saledata[5] + '"> <div class="input-group-append"> <span class="input-group-text">EUR</span> </div> </div> </div> <span class="input-group-btn mb-5"> <button class="btn btn-success btn-add ml-2 cikkszambtn" type="button"> <span class="icon-plus"></span> </button> </span> </div>').appendTo($("#akciosokEditPH"));
                        else
                            $('<div class="entry03 input-group mb-2"> <div class="col-2 p-0 mb-3"> <input class="form-control jeloleselement" id="' + uuidv4() + '" name="fields[]" type="text" placeholder="Adja meg a termék cikkszámát" value="' + this + '" > </div> <div class="col-2 mb-3"> <div class="input-group"> <input class="form-control currentPrice" type="text" readonly value="' + saledata[0] + '"> <div class="input-group-append"> <span class="input-group-text">HUF</span> </div> </div> </div> <div class="col-2 mb-3"> <div class="input-group"> <input class="form-control discountInput" type="text" max="100" value="' + saledata[1] + '"> <div class="input-group-append"> <span class="input-group-text">%</span> </div> </div> </div> <div class="col-2 mb-3"> <div class="input-group"> <input class="form-control discountedPrice" name="fields[]" type="text" placeholder="Ár" value="' + saledata[2] + '"> <div class="input-group-append"> <span class="input-group-text">HUF</span> </div> </div> </div> <div class="input-group-append ml-md-2 keresesCikkszamAlapjanBtn"> <button class="btn btn-primary daterange-btn icon-left btn-icon h-75" type="button" data-toggle="modal" data-target="#keresesCikkszamAlapjan"><i class="fas fa-search"></i>Keresés</button> </div> <div class="offset-2 col-2 mb-5"> <div class="input-group"> <input class="form-control currentPriceEUR" type="text" readonly value="' + saledata[3] + '"> <div class="input-group-append"> <span class="input-group-text">EUR</span> </div> </div> </div> <div class="col-2 mb-5"> <div class="input-group"> <input class="form-control discountInputEUR" type="text" max="100" value="' + saledata[4] + '"> <div class="input-group-append"> <span class="input-group-text">%</span> </div> </div> </div> <div class="col-2 mb-5"> <div class="input-group"> <input class="form-control discountedPriceEUR" name="fields[]" type="text" placeholder="Ár" value="' + saledata[5] + '"> <div class="input-group-append"> <span class="input-group-text">EUR</span> </div> </div> </div> <span class="input-group-btn mb-5"> <button class="btn btn-success btn-add ml-2 cikkszambtn" type="button"> <span class="icon-plus"></span> </button> </span> </div>').appendTo($("#akciosokEditPH"));
                            //$('<div class="entry03 input-group mb-2"> <div class="col-5 p-0"> <input class="form-control jeloleselement" id="' + uuidv4() + '" name="fields[]" type="text" placeholder="Adja meg a termék cikkszámát" value="' + this + '"> </div> <div class="col-2"> <input class="form-control" name="fields[]" type="text" placeholder="%" value="' + myajanlat.akciosokdict[this] + '"> </div> <span class="input-group-btn"> <button class="btn ml-2 btn-remove btn-danger" type="button"><span class="icon-close"></span> </button> </span> <div class="input-group-append ml-md-2"> <button class="btn btn-primary daterange-btn icon-left btn-icon keresesCikkszamAlapjanBtn" type="button" data-toggle="modal" data-target="#keresesCikkszamAlapjan"><i class="fas fa-search"></i>Keresés név alapján</button> </div></div>').appendTo($("#akciosokEditPH"));
                    });
                    initDicountListeners($("#akciosokEditPH")[0]);
                } else {
                    hideInputElement($("#toggleAkciosAjanlatEdit"));
                }
                initAjanlatListeners();
        }).fail(function() {
            alert( "error" );
        });
        
    })
    $("#deleteThisAjanlatBtn").off("click").on("click", function(e){
        var ajanlatId = $(this).data("ajanlatid");
        $.get("/Ajanlatok/deleteObject", {'obid': ajanlatId}, function(data){
            if (data) {
                $('#biztosTorli').modal('hide');
                refreshAjanlatList();
            }
        }).fail(function() {
            alert( "error" );
        });
    })

    $("a[href='#pills-editoffers']").on('shown.bs.tab', function(e){
        refreshAjanlatList();    
    });
    $("#editAjanlatBtn").off("click").on("click", function(e){
        e.preventDefault();
        var data = new FormData();
            data.append("ajanlatId", $(this).data("ajanlatid"));
            data.append("title", $("#titleEditBox").val());
            data.append("shortText", $('#shortContentEditBox').val())
            data.append("mainPicture", document.getElementById('mainPictureEdit').files[0]); 
            if (!$("#categoryEditSelect").prop("disabled")) {
                var arucsoport = $("#categoryEditSelect").val();
                data.append('arukategoria', arucsoport);
            } 
            if (!$("#customFileCatalogEdit").prop("disabled")) {
                data.append('catalogfile', document.getElementById('customFileCatalogEdit').files[0]);
            } 
            $($("#roleSelectEdit").val()).each(function(i){
               data.append("roleToHave:list", this); 
            });
            data.append("validFrom", $("#startdateEdit").val());
            data.append("validUntil", $("#enddateEdit").val());
            if (!$("#bannerPictureEdit").prop("disabled")) {
                data.append('bannerPicture', document.getElementById('bannerPictureEdit').files[0]);
            } 
            data.append("bannerText", $("#bannerTextBoxEdit").val());
            if (!$("#termekLeirasCimEdit").prop("disabled")) {
                data.append("itemTitle", $("#termekLeirasCimEdit").val());
            }
            if (!$("#termekLeirasEdit").prop("disabled")) {
                data.append("termekLeiras", $("#termekLeirasEdit").val());
            }
            if (!$("#itemPictureEdit").prop("disabled")) {
                data.append("itemPicture", document.getElementById('itemPictureEdit').files[0]);
            }
            $("#menuFelhasznalasiTeruletEdit input").each(function(i){
                if (!$(this).prop("disabled") && $(this).val()) {
                    data.append("felhasznalasiterulet:list", $(this).val());
                };
            });
            $("#menuFelhasznalasiTeruletKepekEdit input").each(function(i){
                if (!$(this).prop("disabled") && $(this).val()) {
                    data.append("felhasznalasiteruletPics:list", $(this)[0].files[0]);
                } else {
                    data.append("felhasznalasiteruletPics:list", "undefined")
                };
            });
            $("#menuJelolesekEdit input").each(function(i){
                if (!$(this).prop("disabled") && $(this).val()) {
                    data.append("jelolesek:list", $(this).val());
                };
            });
            $("#menuUtojelekEdit input").each(function(i){
                if (!$(this).prop("disabled") && $(this).val()) {
                    data.append("menuUtojelek:list", $(this).val());
                };
            });
            var mas = $("#menuAkciosAjanlatEdit input");
            if (mas) {
                for (var i = 0; i < mas.length; i += 7) {
                    if ($(mas[i]).val()) {
                        data.append("akciostermekek.arukod:records", $(mas[i]).val());
                        data.append("akciostermekek.price:records", $(mas[i + 3]).val());
                        data.append("akciostermekek.origprice:records", $(mas[i + 1]).val());
                        data.append("akciostermekek.eurprice:records", $(mas[i + 6]).val());
                        data.append("akciostermekek.origeurprice:records", $(mas[i + 4]).val());
                        data.append("akciostermekek.percent:records", $(mas[i + 2]).val());
                        data.append("akciostermekek.eurpercent:records", $(mas[i + 5]).val());
                    }
                }
            }
            data.append("coding", 'utf-8');
            var opts = {
                url: 'Ajanlatok/editAjanlat_py',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                method: 'POST',
                type: 'POST',
                success: function(data){
                    $("#sikeresKeresPopupAdmin").removeClass("fade");
                    setTimeout(function () {
                        $("#sikeresKeresPopupAdmin").toggleClass("fade");
                    }, 5000);
                    refreshAjanlatList();
                    $("#konkretAjanlatszerkesztese input.custom-switch-input").each(function(i){
                        $(this).prop("checked", true);
                    });
                    $("#konkretAjanlatszerkesztese .form-group").each(function(i) {
                        var inputElement = $(this).closest('div').find('.hidethisitem');
                        $(this).show();
                        $(this).closest('div').find(".kikapcsolt-resz-form").hide();
                        $(this).find('input').each(function(idx){$(this).prop("disabled", false); $(this).val("");});
                        $(this).find('select').each(function(idx){$(this).prop("disabled", false);
                                                                  $(this).val($("this option:first").val());  
                                                                  });
                        $(this).find('textarea').each(function(idx){$(this).prop("disabled", false); $(this).val("");});
                        
                    });
                    $("#konkretAjanlatszerkesztese img.imagecheck-image").each(function(i) {$(this).attr("src", "../assets/img/form/valasszon_kepet (1).png");});
                    $('#konkretAjanlatszerkesztese input[type=file]').next('label').html("Katalógus kiválasztás");
                    $("#konkretAjanlatszerkesztese .close").click();
                  //  $("#newOfferTitleBox").val('');
                  //  $("#newOfferContentBox").val('');
                  //  $("#pictureChoser").val('');
                  //  refreshFooldaliAjanlatList();                  
                }
            };
            if(data.fake) {
                opts.xhr = function() { 
                    var xhr = jQuery.ajaxSettings.xhr(); 
                    xhr.send = xhr.sendAsBinary; 
                    return xhr; 
                }
                opts.contentType = "multipart/form-data; boundary=" + data.boundary;
                opts.data = data.toString();
            }
            $.ajax(opts);
    
    });
    
    $("#newBonusFormBtn").off("click").on("click", function(e){
            e.preventDefault();
            var data = new FormData();
            data.append("title", $("#titleBox").val());
            data.append("shortText", $('#shortContentBox').val())
            data.append("mainPicture", document.getElementById('mainPicture').files[0]); 
            if (!$("#categorySelect").prop("disabled")) {
                var arucsoport = $("#categorySelect").val();
                data.append('arukategoria', arucsoport);
            } 
            if (!$("#customFileCatalog").prop("disabled")) {
                data.append('catalogfile', document.getElementById('customFileCatalog').files[0]);
            } 
            $($("#roleSelect").val()).each(function(i){
               data.append("roleToHave:list", this); 
            });
            data.append("validFrom", $("#startDate").val());
            data.append("validUntil", $("#endDate").val());
            if (!$("#bannerPicture").prop("disabled")) {
                data.append('bannerPicture', document.getElementById('bannerPicture').files[0]);
            } 
            data.append("bannerText", $("#bannerTextBox").val());
            if (!$("#itemTitle").prop("disabled")) {
                data.append("itemTitle", $("#itemTitle").val());
            }
            if (!$("#termekLeirasBox").prop("disabled")) {
                data.append("termekLeiras", $("#termekLeirasBox").val());
            }
            if (!$("#itemPicture").prop("disabled")) {
                data.append("itemPicture", document.getElementById('itemPicture').files[0]);
            }
            $("#menuFelhasznalasiTerulet input").each(function(i){
                if (!$(this).prop("disabled") && $(this).val()) {
                    data.append("felhasznalasiterulet:list", $(this).val());
                };
            });
            $("#menuFelhasznalasiTeruletKepek input").each(function(i){
                 if (!$(this).prop("disabled") && $(this).val()) {
                    data.append("felhasznalasiteruletPics:list", $(this)[0].files[0]);
                };
            });
            $("#menuJelolesek input").each(function(i){
                if (!$(this).prop("disabled") && $(this).val()) {
                    data.append("jelolesek:list", $(this).val());
                };
            });
            $("#menuUtojelek input").each(function(i){
                if (!$(this).prop("disabled") && $(this).val()) {
                    data.append("menuUtojelek:list", $(this).val());
                };
            });
            var mas = $("#menuAkciosAjanlat input");
            if (mas) {
                for (var i = 0; i < mas.length; i += 7) {
                    if ($(mas[i]).val()) {
                        data.append("akciostermekek.arukod:records", $(mas[i]).val());
                        data.append("akciostermekek.origprice:records", $(mas[i + 1]).val());
                        data.append("akciostermekek.price:records", $(mas[i + 3]).val());
                        data.append("akciostermekek.eurprice:records", $(mas[i + 6]).val());
                        data.append("akciostermekek.origeurprice:records", $(mas[i + 4]).val());
                        data.append("akciostermekek.percent:records", $(mas[i + 2]).val());
                        data.append("akciostermekek.eurpercent:records", $(mas[i + 5]).val());
                    }
                }
            }
            data.append("coding", 'utf-8');
            var opts = {
                url: 'Ajanlatok/createNewAjanlat_py',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                method: 'POST',
                type: 'POST',
                success: function(data){
                    $("#sikeresKeresPopupAdmin").removeClass("fade");
                    setTimeout(function () {
                        $("#sikeresKeresPopupAdmin").toggleClass("fade");
                    }, 5000);
                    $("#pills-newoffer input.custom-switch-input").each(function(i){
                        $(this).prop("checked", true);
                    });
                    $("#pills-newoffer .form-group").each(function(i) {
                        var inputElement = $(this).closest('div').find('.hidethisitem');
                        $(this).show();
                        $(this).closest('div').find(".kikapcsolt-resz-form").hide();
                        $(this).find('input').each(function(idx){$(this).prop("disabled", false); $(this).val("");});
                        $(this).find('select').each(function(idx){$(this).prop("disabled", false);
                                                                  $(this).val($("this option:first").val());  
                                                                  });
                        $(this).find('textarea').each(function(idx){$(this).prop("disabled", false); $(this).val("");});
                        
                    });
                    $("#pills-newoffer  img.imagecheck-image").each(function(i) {$(this).attr("src", "../assets/img/form/valasszon_kepet (1).png");});
                    $('#pills-newoffer input[type=file]').next('label').html("Katalógus kiválasztás");
                  //  $("#newOfferTitleBox").val('');
                  //  $("#newOfferContentBox").val('');
                  //  $("#pictureChoser").val('');
                  //  refreshFooldaliAjanlatList();                  
                }
            };
            if(data.fake) {
                opts.xhr = function() { 
                    var xhr = jQuery.ajaxSettings.xhr(); 
                    xhr.send = xhr.sendAsBinary; 
                    return xhr; 
                }
                opts.contentType = "multipart/form-data; boundary=" + data.boundary;
                opts.data = data.toString();
            }
            $.ajax(opts);
        })


        
        $(".custom-switch-input").off("change").on("change", function(e){
            var inputElement = $(this).closest('div').find('.hidethisitem');
            if ($(this).prop("checked")) {
                showInputElement($(this));
            } else {
                hideInputElement($(this));
            }
            
        });
        
        $(".fooldaliajanlatdeletebtn").off("click").on("click", function(e){
            var fooldaliajanlatId = $(this).data("fooldaliajanlatid");
            var clickedBtn = $(this);
            $("#deleteThisBonusBtn").attr("data-bonuszid", fooldaliajanlatId);
            $("#deleteThisBonusBtn").off("click").on("click", function(e){
                var bonuszId = $(this).data("bonuszid");
                $.get("FooldaliAjanlatok/deleteObject", {'obid': bonuszId}, function(data){
                    clickedBtn.closest('tr').remove();
                    $("#cancelDeleteBtn").click();
//                    $("#biztosTorli").hide();
                }).fail(function() {
                    alert( "error" );
                });
        
        });
            
        });
        $(".fooldaliajanlateditbtn").off("click").on("click", function(e){
            var fooldaliajanlatId = $(this).data("fooldaliajanlatid");
            var clickedBtn = $(this);
            $.get("FooldaliAjanlatok/getFooldaliAjanlatInfo_py", {'fooldaliajanlatId': fooldaliajanlatId}, function(myfooldaliajanlat){
                $("#offerTitleEditBox").val(myfooldaliajanlat.title);
                $("#offerContentEditBox").val(myfooldaliajanlat.content);
                $("#offerImage").attr("src", 'FooldaliAjanlatok/' + fooldaliajanlatId + "?timestamp=" + new Date().getTime());
                $("#offerLinkIdList").empty();
                $.each(myfooldaliajanlat.ajanlatok, function (key, value) {
                    $('#offerLinkIdList').append($('<option>', { 
                        value: key,
                        text : value 
                    }));
                });
                $('#offerLinkIdList option[value=' + myfooldaliajanlat.offerLinkId+ ']').prop('selected', 'selected').change();
            }).fail(function() {
                alert( "error" );
            });
            $("#saveThisFooldaliAjanlatBtn").attr("data-fooldaliajanlatid", fooldaliajanlatId);
            $("#saveThisFooldaliAjanlatBtn").off("click").on("click", function(event){
                event.preventDefault();
                var data = new FormData();
                var newtitle = $("#offerTitleEditBox").val();
                data.append('file', document.getElementById('editPictureChoser').files[0]);
                data.append('docid', $(this).data("fooldaliajanlatid"));
                data.append('title', $("#offerTitleEditBox").val());
                data.append('offerLinkId', $("#offerLinkIdList").find(":selected").val());
                data.append('content', $("#offerContentEditBox").val())
                data.append('coding', 'utf-8');

            var opts = {
                url: 'FooldaliAjanlatok/szerkesztDokumentum_py',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                method: 'POST',
                type: 'POST',
                success: function(data){
                    $("#sikeresKeresPopupAdmin").removeClass("fade");
                    setTimeout(function () {
                        $("#sikeresKeresPopupAdmin").toggleClass("fade");
                    }, 5000);
                    $("#closeEditorBtn").click();
                    
                    $("#offerLinkIdList").val('');
                    $("#offerContentEditBox").val('');
                    $("#offerLinkIdList").empty();
                    $("#editPictureChoser").val('');
                    refreshFooldaliAjanlatList();                  
                }
            };
            if(data.fake) {
                opts.xhr = function() { 
                    var xhr = jQuery.ajaxSettings.xhr(); 
                    xhr.send = xhr.sendAsBinary; 
                    return xhr; 
                }
                opts.contentType = "multipart/form-data; boundary=" + data.boundary;
                opts.data = data.toString();
            }
            $.ajax(opts);


//                var tr = clickedBtn.closest('tr');
//                tr.find('td.bonustitle').html(newtitle);
//                $("#closeEditorBtn").click();
            });
        
        });
}

    $( document ).ready(function(){
        initAjanlatListeners();
    });


function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}


