function sendMessage() {
    console.log("clk");
    captchaCode = document.getElementById("captchaCode").value;
    captchaEntered = document.getElementById("capchaEntered").value;
    messageToSendObj = document.getElementById("messageToSend");
    if (messageToSendObj == null && document.getElementById("contact_info") == null) {
        alert("Válasszon a lehetöséget közül.");
        return;
    }
    if (document.getElementById("out_of_stock_checkbox")) {
        contact_info = document.getElementById("contact_info").value;
        if (contact_info) {
            if (!$('#out_of_stock_checkbox').is(':checked')) {
                alert("Nem fogadta el az adatvédelmi tájékoztatót.");
                return;
            }
        } else {
            alert("Nem adott meg elérhetőséget.");
            return;
        }
    } else contact_info = "";
    messageSubjectObj = document.getElementById("messageSubject");
    if (messageSubjectObj == null)
        messageToSend = messageToSendObj.value;
    else
        messageToSend = $("#messageSubject option:selected").text() + ": " + messageToSendObj.value;
    if (messageToSend == "") {
        alert("Nem írt üzenetet.");
        return;
    } else if (captchaEntered == "") {
        alert("Írja be a kódot");
        return;
    }
    console.log("sending");
    $.get(
        "sendMessage", {
            "hidden_captcha_code": captchaCode,
            "code_entered_by_user": captchaEntered,
            "message": messageToSend,
            "contact_info": contact_info
        },
        function(data) {
            if (data == "0") {
                alert("A beírt kód nem megfelelö");
                refreshCapcha();
            } else {
                alert("Üzenetét elküldtük, kollégáink hamarosan megkeresik Önt.");
                document.getElementById("capchaEntered").value = "";
                document.getElementById("messageToSend").value = "";
                spl = data.split(",");
                captchaUser = spl[0];
                captchaCode = spl[1];
                document.getElementById("captchaCode").value = captchaCode;
                document.getElementById("capchaImage").src = "http://image.captchas.net?client=" + captchaUser + "&random=" + captchaCode;
            }
        }
    );
}

function sendSearchMessage() {
    captchaCode = document.getElementById("captchaCode").value;
    captchaEntered = document.getElementById("capchaEntered").value;
    messageToSendObj = document.getElementById("messageToSend");

    messageToSend = messageToSendObj.value;
    if (messageToSend == "") {
        alert("Nem írt üzenetet.");
        return;
    } else if (captchaEntered == "") {
        alert("Írja be a kódot");
        return;
    }
    console.log("sending");

    $.get(
        "sendMessage", {
            "hidden_captcha_code": captchaCode,
            "code_entered_by_user": captchaEntered,
            "message": messageToSend,
            "contact_info": "",
            "email": "ugyfelszolgalat@bearing.hu"
        },
        function(data) {
            if (data == "0") {
                alert("A beírt kód nem megfelelö");
                refreshCapcha();
            } else {
                alert("Üzenetét elküldtük, kollégáink hamarosan megkeresik Önt.");
                document.getElementById("capchaEntered").value = "";
                document.getElementById("messageToSend").value = "";
                spl = data.split(",");
                captchaUser = spl[0];
                captchaCode = spl[1];
                document.getElementById("captchaCode").value = captchaCode;
                document.getElementById("capchaImage").src = "http://image.captchas.net?client=" + captchaUser + "&random=" + captchaCode;
            }
        }
    );
}

function refreshCapcha() {
    $.get(
        "getCapchaValues", {},
        function(data) {
            document.getElementById("capchaEntered").value = "";
            spl = data.split(",");
            captchaUser = spl[0];
            captchaCode = spl[1];
            document.getElementById("captchaCode").value = captchaCode;
            document.getElementById("capchaImage").src = "http://image.captchas.net?client=" + captchaUser + "&random=" + captchaCode;
        }
    );
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function flash(elements) {
    var opacity = 100;
    var color = "124, 252, 0";
    var theEnd = false;
    var interval = setInterval(function() {
        opacity -= 3;
        if (opacity <= 0) {
            clearInterval(interval);
            theEnd = true;
        }
        $(elements).css({
            background: "rgba(" + color + ", " + opacity / 100 + ")"
        });
        if (theEnd) {
            elements.removeAttr("style");
            elements.removeClass("normal").removeClass("rendelt").addClass("rendelt");
        }
    }, 30);
};

function getNS(idStr) {
    return idStr.replace(/\s|\//g, '_');
}

function openOfferRequestDialog(termek, gyarto, arukod) {

    $(".dialog_box").html('<div id="offer_request"><form id="offer_request_form"><input type="hidden" id="termekField"><input type="hidden" id="manufacturerField"><input type="hidden" id="arukodField"><label>Az Ön által keresett termék:</label><input type="text" id="aruField" disabled="disabled"><label>Név:*</label><input type="text" id="nameField"><label>E-mail cím:*</label><input type="text" id="emailField"><label>Telefonszám:</label><input type="text" id="phoneField"><label>Darabszám:*</label><input type="number" id="amountField"><label>Ajánlatkérés szövege:</label><textarea id="offerText"></textarea><span class="w200 submit_span"><button type="button" id="offerButton" value="Elküld" class="w200">Elküld</button></span></form><div class="pay-more-popup-close"><img src="../image/pay-more-close-btn.png" alt=""/></div></div>');
    $(".pay-more-popup-close").click(function() {
        $(".dialog_box").empty();
    });
    $("#aruField").val(termek + " (" + gyarto + ") ");
    $("#nameField").val(getName());
    $("#emailField").val(getEmail());
    $("#phoneField").val(getPhone());
    $("#termekField").val(termek);
    $("#manufacturerField").val(gyarto);
    $("#arukodField").val(arukod);
    $("#offerButton").click(function() {
        if ($("#nameField").val() == null || $("#emailField").val() == null || $("#amountField").val() == null)
            alert("Kérjük töltse ki a kötelez&#245; mezöket (név, email, darabszám)");
        else
            $.get("sendOffer", {
                    "senderName": $("#nameField").val(),
                    "senderEmail": $("#emailField").val(),
                    "message": $("#offerText").val(),
                    "senderPhone": $("#phoneField").val(),
                    "termek": termek,
                    "gyarto": gyarto,
                    "arukod": arukod,
                    "amount": $("#amountField").val()
                },
                function(data) {
                    alert("Üzenetét elküldtük, kollégáink hamarosan megkeresik Önt.");
                    $(".dialog_box").empty();
                }
            );
    });
    $("#dialog-similar-product-small").dialog({
        width: 800,
        maxheight: 500,
        //maxHeight: 500,
        autoOpen: false,
        show: {
            duration: 500
        },
        hide: {
            duration: 500
        },
    });
    $("#dialog-similar-product").dialog({
        width: 1028,
        maxHeight: 500,
        autoOpen: false,
        show: {
            duration: 500
        },
        hide: {
            duration: 500
        }
    });
    $("#pay-more-popup").dialog({
        width: 635,
        maxHeight: 500,
        autoOpen: false,
        show: {
            duration: 500
        },
        hide: {
            duration: 500
        }
    });


}

function editAddress(addrNum) {
    $.get("getAddressData", {
            addrNum: addrNum
        }, function(data) {
            data = JSON.parse(data);
            $("#personalName").val(data[1]);
            $("#personalTaxNr").val(data[5]);
            $("#personalCity").val(data[2]);
            $("#personalEmail").val(data[6]);
            $("#personalCeg").val(data[0]);
            $("#personalIranyito").val(data[4]);
            $("#personalCim").val(data[3]);
            $("#personalTel").val(data[7]);
            $("#addrNum").val(addrNum);
            if (data[8] == true) {
                $("#defaultYes").click();
                $(".checked-image").off("click");
            } else {
                $("#defaultNo").click();
            }
        })
        .fail(function() {
            alert("error");
        });
    $(".change-data-form-box").html('<form class="change-own-data-form" action="changeAddressData_py"><input type="hidden" id="addrNum" name="addrNum"><p>Cím módosítása:</p><div class="col-md-6 disable-left-padding"><label>Név:</label><input type="text" id="personalName" name="nev"><label>Adószám:</label><input type="text" id="personalTaxNr" name="adoszam"><label>Város:</label><input type="text" id="personalCity" name="varos"><label>E-mail:</label><input type="text" id="personalEmail" name="email"></div><div class="col-md-6"><label>Cégnév:</label><input type="text" id="personalCeg" name="ceg"><label>Irányítószám:</label><input type="text" id="personalIranyito" name="iranyito"><label>Cím:</label><input type="text" id="personalCim" name="cim"><label>Telefon:</label><input type="text" id="personalTel" name="telefon"></div><div class="col-md-12 disable-left-padding"><label>Alapértelmezett cím:</label></div><div class="col-md-4 disable-left-padding"><input class="hide-radio" type="radio" name="default-address" value="Igen"><span id="defaultYes" class="checked-image checked-image-checked"></span><label class="center">Igen</label></div><div class="col-md-4 disable-left-padding"><input class="hide-radio" type="radio" name="default-address" value="Nem"><span id="defaultNo" class="checked-image"></span><label class="center">Nem</label></div><div class="col-md-4">&nbsp;</div><div class="col-md-12 disable-left-padding"><span class="submit_span"><input type="submit" value="Módosít"></span></div><div class="clear_both"></div></form>');
    $(".checked-image").on("click", function() {
        $(".checked-image").removeClass("checked-image-checked");
        $(this).addClass("checked-image-checked");
        $(this).prev('input').prop("checked", true);
        //console.log( $(this).prev('input').val() );
    });

}

function deleteAddress(addrNum) {
    $.get("deleteAddress_py", {
        addrNum: addrNum
    }, function(data) {
        $('.directory').trigger("click");
        $("#errorMsg").html("CÍMET TÖRÖLTE");
    });
}

function filterForInnerSize(sel) {
    if ($('#out_of_stock_checkbox').is(':checked'))
        var raktaron = '0';
    else
        var raktaron = '1';
    var outerSize = $("#outerSizeSelect").val();
    var innerSize = $("#innerSizeSelect").val();
    var widthSize = $("#widthSizeSelect").val();
    $.get("filterForInnerSize_py", {
        innerSize: innerSize,
        outerSize: outerSize,
        widthSize: widthSize,
        raktaron: raktaron
    }, function(data) {
        var obj = JSON.parse(data);
        var innerSizesList = obj[0];
        var outerSizesList = obj[1];
        var widthSizesList = obj[2];
        if (sel == $("#innerSizeSelect")[0] || sel == $("#widthSizeSelect")[0]) {
            $('#outerSizeSelect').empty().append($('<option>', {
                value: "",
                text: "- Mind* -"
            }));
            if (outerSize != "") {
                $('#outerSizeSelect').append($('<option>', {
                    value: outerSize,
                    text: outerSize
                }));
                $('#outerSizeSelect')[0].selectedIndex = 1;
            }
            $.each(outerSizesList, function(i, item) {
                $('#outerSizeSelect').append($('<option>', {
                    value: item,
                    text: item
                }));
            });
            $("#outerSizeSelect option[value=outerSize]").attr('selected', 'selected');
        }
        if (sel == $("#innerSizeSelect")[0] || sel == $("#outerSizeSelect")[0]) {
            $('#widthSizeSelect').empty().append($('<option>', {
                value: "",
                text: "- Mind* -"
            }));
            if (widthSize != "") {
                $('#widthSizeSelect').append($('<option>', {
                    value: widthSize,
                    text: widthSize
                }));
                $('#widthSizeSelect')[0].selectedIndex = 1;
            }
            $.each(widthSizesList, function(i, item) {
                $('#widthSizeSelect').append($('<option>', {
                    value: item,
                    text: item
                }));
            });
            $("#widthSizeSelect option[value=widthSize]").attr('selected', 'selected');
        }
        if (sel == $("#widthSizeSelect")[0] || sel == $("#outerSizeSelect")[0]) {
            $('#innerSizeSelect').empty().append($('<option>', {
                value: "",
                text: "- Mind* -"
            }));
            if (innerSize != "") {
                $('#innerSizeSelect').append($('<option>', {
                    value: innerSize,
                    text: innerSize
                }));
                $('#innerSizeSelect')[0].selectedIndex = 1;
            }
            $.each(innerSizesList, function(i, item) {
                $('#innerSizeSelect').append($('<option>', {
                    value: item,
                    text: item
                }));
            });
        }
    });
}

$(document).ready(function() {

    /*contact change*/
    $('.question_form select').on('change', function() {
        if (document.formNL) {
            return;
        }
        if (this.value == "Terméket keresek") {
            $(".change-input-field").html('<label>Termék adatai</label><input id="messageToSend" name="inputTXT" class="w200" type="text">');
        } else if (this.value == "Visszahívást kérek") {
            $(".change-input-field").html('<label>Telefonszám</label><input id="messageToSend" name="inputTXT" class="w200" type="tel">');
        } else if (this.value == "Általános tájékoztatás") {
            $(".change-input-field").html('<label>Megjegyzés</label><textarea id="messageToSend" name="inputTXT" class="w200"></textarea>');
        }
    });

    $('#messageSubject').on('change', function() {
        if (document.formNL) {
            console.log(this.value);
            if (this.value == "Terméket keresek") {
                $(".change-input-field").html('<label>Termék adatai</label><input id="messageToSend" name="inputTXT" class="w200" type="text"><br><br><label>Telefonszám vagy e-mail cím</label><input class="w200" id="contact_info" type="text"><br><br><div class="form-group check"><span class="checkbox_button accept"></span><input class="out_of_stock_checkbox" id="out_of_stock_checkbox" type="checkbox"><label>Kijelentem, hogy a <a href="rovid_adatvedelmi_tajekoztato.pdf">rövidített adatvédelmi tájékoztatót</a> elolvastam, annak tartalmát megismertem, megértettem, tudomásul vettem, a fent megadott adataim kezeléséhez önkéntesen hozzájárulok</label></div>');
                contact_accept();
            } else if (this.value == "Visszahívást kérek") {
                $(".change-input-field").html('<label>Telefonszám</label><input id="contact_info" id="messageToSend" name="inputTXT" class="w200" type="tel"><br><br><div class="form-group check"><span class="checkbox_button accept"></span><input class="out_of_stock_checkbox" id="out_of_stock_checkbox" type="checkbox"><label>Kijelentem, hogy a <a href="">rövidített adatvédelmi tájékoztatót</a> elolvastam, annak tartalmát megismertem, megértettem, tudomásul vettem, a fent megadott adataim kezeléséhez önkéntesen hozzájárulok</label></div>');
                contact_accept();
            } else if (this.value == "Általános tájékoztatás") {
                $(".change-input-field").html('<label>Megjegyzés</label><textarea id="messageToSend" name="inputTXT" class="w200"></textarea><br><br><label>Telefonszám vagy e-mail cím</label><input id="contact_info" class="w200" type="text"><br><br><div class="form-group check"><span class="checkbox_button accept"></span><input class="out_of_stock_checkbox"	 id="out_of_stock_checkbox" type="checkbox"><label>Kijelentem, hogy a <a href="">rövidített adatvédelmi tájékoztatót</a> elolvastam, annak tartalmát megismertem, megértettem, tudomásul vettem, a fent megadott adataim kezeléséhez önkéntesen hozzájárulok</label></div>');
                contact_accept();
            }
        }
    });

    //out of stock checkbox
    $(".checkbox_button.out_of_stock").click(function() {
        $(this).toggleClass("checked");
        //var $checkbox = $(this).find(':checkbox');
        $(".out_of_stock_checkbox").attr('checked', !$(".out_of_stock_checkbox").attr('checked'));
        if ($('#termekekNGField').value != null || $('#outerSizeSelect').value != null || $('#outerSizeSelect').text != null || $('#innerSizeSelect').value != null || $('#widthSizeSelect').value != null)
            $('#searchForm').submit();
    });

    //contact accept
    function contact_accept() {
        $(".checkbox_button.accept").click(function() {
            $(this).toggleClass("checked");
            //var $checkbox = $(this).find(':checkbox');
            $(".out_of_stock_checkbox").attr('checked', !$(".out_of_stock_checkbox").attr('checked'));
        });
    }

    //shipping address checkbox
    $(".checkbox_button.shipping_address").click(function() {
        $(this).toggleClass("checked");
        //var $checkbox = $(this).find(':checkbox');
        $(".shipping_address_checkbox").attr('checked', !$(".shipping_address_checkbox").attr('checked'));
        if ($(this).hasClass("checked")) {
            $("#szallitasSor1").hide();
            $("#szallitasSor2").hide();
        } else {
            $("#szallitasSor1").show();
            $("#szallitasSor2").show();
        }
    });

    //shipping address checkbox
    $(".checkbox_button.terms_and_conditions").click(function() {
        $(this).toggleClass("checked");
        //var $checkbox = $(this).find(':checkbox');
        $(".terms_and_conditions_checkbox").attr('checked', !$(".terms_and_conditions_checkbox").attr('checked'));
    });

    //add to favourites checkbox
    $(".checkbox_button.add_to_favourites").click(function() {
        $(this).toggleClass("checked");
        //var $checkbox = $(this).find(':checkbox');
        $(this).next(".add_to_favourites_checkbox").attr('checked', !$(this).next(".add_to_favourites_checkbox").attr('checked'));
        $(this).next(".add_to_favourites_checkbox").click();
        if ($(this).hasClass("checked")) {
            $(".dialog_box").html('<div id="pay-more-popup">A terméket sikeresen hozzáadta<br>a kedvencek listához<div class="pay-more-popup-buttons"><a href="/">vásárolok még</a><a href="/fiokom">Megnézem a listát</a></div><div class="pay-more-popup-close"><img src="/image/pay-more-close-btn.png" alt=""/></div></div>');
        } else {
            $(".dialog_box").html('<div id="pay-more-popup">A terméket ezzel törölte<br>a kedvencek listájáról<div class="pay-more-popup-buttons"><a href="/">vásárolok még</a><a href="/fiokom">Megnézem a listát</a></div><div class="pay-more-popup-close"><img src="/image/pay-more-close-btn.png" alt=""/></div></div>');
        }
        pay_more_close();

    });

    //registration button, popup
    $("#registration_button").click(function() {
        $(".registration_popup").removeClass("hide");
    });

    //registration popup close
    $(".registration_popup .popup_close").click(function() {
        $(".registration_popup").addClass("hide");
    });

    //registration popup yes
    $(".registration_popup .yes_button").click(function() {
        $(".registration_popup").addClass("hide");
        $('html, body').animate({
            scrollTop: 0
        }, 'fast');
    });

    /*pay more popup close*/
    function pay_more_close() {
        $(".pay-more-popup-close").click(function() {
            $(".dialog_box").empty();
        });
    }

    /*tabs*/
    function runtabs() {
        $("#tabs").tabs();
    }

    /*dialog box*/
    function rundialog() {
        $("#dialog-similar-product").dialog({
            width: 750,
            height: 500,
            //maxHeight: 500,
            autoOpen: false,
            show: {
                duration: 500
            },
            hide: {
                duration: 500
            }
        });
        $("#dialog-similar-product-small").dialog({
            width: 800,
            height: 768,
            //maxHeight: 500,
            autoOpen: false,
            show: {
                duration: 500
            },
            hide: {
                duration: 500
            },
            open: function(event, ui) {
                $(this).parent().find('div.ui-dialog-titlebar').addClass('custom-title-class');
            }
        });
        /*új*/
        $("#dialog-data-sheet").dialog({
            width: 1000,
            height: 768,
            //maxHeight: 500,
            autoOpen: false,
            position: {
                my: 'center',
                at: 'center'
            },
            show: {
                duration: 500
            },
            hide: {
                duration: 500
            },
            open: function(event, ui) {
                $(this).parent().find('div.ui-dialog-titlebar').addClass('data-sheet-custom-title-class');
            }
        });

        $("#dialog-elo-uto").dialog({
            width: 1100,
            height: 768,
            //maxHeight: 500,
            autoOpen: false,
            position: {
                my: 'center',
                at: 'center'
            },
            show: {
                duration: 500
            },
            hide: {
                duration: 500
            },
            open: function(event, ui) {
                $(this).parent().find('div.ui-dialog-titlebar').addClass('dialog-elo-uto-title');
            }
        });
        /*új*/
        $("#dialog-similar-product").dialog({
            width: 1000,
            maxHeight: 768,
            autoOpen: false,
            show: {
                duration: 500
            },
            hide: {
                duration: 500
            }
        });
        $("#pay-more-popup").dialog({
            width: 635,
            maxHeight: 500,
            autoOpen: false,
            show: {
                duration: 500
            },
            hide: {
                duration: 500
            }
        });
    }

    function close() {
        $(".ui-dialog-titlebar-close").on("click", function() {
            $(".ui-dialog").remove();
            $(".dialog_box").html('');
        });
    }

    function closeHelyettesito() {
        $(".ui-dialog-titlebar-close").on("click", function() {
            $(".ui-dialog").remove();
            $(".dialog_box").html('');
            $.get("resetSearchID_py", {}, function(data) {});
        });
    }

    function autoclose() {
        $(".ui-dialog").remove();
        $(".dialog_box").html('');
    }
    /*új*/
    $(".info_icon_product").on("click", function() {
        autoclose();
        $(".dialog_box").html('<div id="dialog-elo-uto"> <div class="table-box all-cart-box elotag-utojel-box"> <div class="d-sm-flex justify-content-start align-items-center"> <div class="my-favourites-title d-flex justify-content-start align-items-center elotag-utojel-title col-sm-4 col-md-3"><i class="icon-settings"></i><span>6304 2 RS</span></div><nav> <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist"> <a class="nav-item nav-link active" id="nav-elotag-tab" data-toggle="tab" href="#nav-elotag" role="tab" aria-controls="nav-elotag" aria-selected="true">Előtag <i class="icon-arrow-left-circle"></i></a> <a class="nav-item nav-link" id="nav-utojel-tab" data-toggle="tab" href="#nav-utojel" role="tab" aria-controls="nav-utojel" aria-selected="false">Utójel <i class="icon-arrow-right-circle"></i></a></div></nav> </div><div class="tab-content" id="nav-tabContent"> <div class="tab-pane fade show active" id="nav-elotag" role="tabpanel" aria-labelledby="nav-elotag-tab"> <div class="table-box all-cart-box"> <section class="dynamic-table search_results results_after_login"> <div class="container"> <div class="row"> <div class="col-md-12"> <div class="table-overflow"> <table width="100%" border="0"> <tbody> <tr id="headerth"> <th><input type="text" class="form-control-input" placeholder="Keresés"></th> <th class="hide-mobil"><i class="icon-settings"><span class="tooltip">Gyártó</span></i> <select id="gyartoT" class="form-control-list d-inline" name="gyarto:ignore_empty"> <option value="" selected="selected"> Gyártó </option> <option> -</option> <option>-</option> <option>BEX</option> <option>BLT</option> <option>CX</option> <option>EZO</option> <option>FAG</option> <option>FBJ</option> <option>HIWIN</option> <option>INA</option> <option>KOK</option> <option>KOYO</option> <option>LDI</option> <option>MLX</option> <option>MYT</option> <option>NACHI</option> <option>NIS</option> <option>NIS/Y</option> <option>NKS</option> <option>NSK</option> <option>NSK </option> <option>NTN</option> <option>RHP</option> <option>SAMICK</option> <option>SKF</option> <option>SNR</option> <option>THP</option> <option>TIM</option> </select></th> <th><i class="icon-book-open"><span class="tooltip">Típus</span></i> <select id="productLine" class="form-control-list d-inline" name="productLine:ignore_empty"> <option value="" selected="selected"> Típus</option> <option> Hengergörgős csapágyak</option> <option> Hordógörgős csapágyak</option> <option> Tűgörgős csapágyak</option> <option>Axiális golyóscsapágyak</option> <option>Beálló golyóscsapágyak</option> <option>Csapágyegységek</option> <option>Egyéb termékek</option> <option>Ferde hatásvonalú golyóscsapágy </option> <option>Ferde hatásvonalú golyóscsapágyak</option> <option>Golyóscsapágyak</option> <option>Golyóspersely</option> <option>Görgős csapágyak</option> <option>Hengergörgős csapágyak</option> <option>Hengergörgős csapágyak </option> <option>Hordógörgős csapágyak</option> <option>Hordógörgős csapágyak </option> <option>Kúpgörgős csapágyak</option> <option>Lineáris csapágyak</option> <option>Mélyhornyú golyóscsapágyak </option> <option>Precíziós ferde hatásvonalú golyóscsapágyak</option> <option>Precíziós ferdehatásvonalú golyóscsapágyak</option> <option>Profilsín vezetés</option> <option>Profilsínvezetés</option> <option>Tűgörgős csapágyak</option> <option>Y-csapágyak</option> </select></th> <th class="hide-tablet"><i class="icon-vector"><span class="tooltip">Mire vonatkozik</span></i> <select id="characteristic" class="form-control-list d-inline"> <option value="" selected="selected"> Amire vonatkozik</option> <option>Anyag</option> <option>Egyéb</option> <option>Komponens</option> <option>Méret</option> <option>Szerkezet</option> </select></th> <th class="hide-mobil"><i class="icon-info"><span class="tooltip">Mit jelent</span></i></th> <th class="hide-mobil"><i class="icon-picture"><span class="tooltip">Kép</span></i></th> </tr><tr> <td>K</td><td class="tooltip-box hide-mobil">FBJ<span class="tooltip"> <span class="d-block">BEX</span> <span class="d-block">CX</span> <span class="d-block">FAG</span> <span class="d-block">NACHI</span> <span class="d-block">NIS/Y</span> <span class="d-block">NSK</span> <span class="d-block">NTN</span> <span class="d-block">SKF</span> <span class="d-block">SNR</span> <span class="d-block">TIM</span> </span></td><td>Hengergörgőscsapágyak</td><td class="hide-tablet">Szerkezet</td><td class="tooltip-box hide-mobil"><i class="icon-info"><span class="tooltip">Önmagában, vagy más előjellel együtt használatos, metrikus belső átmérő, és/vagy külső átmérő.</span></i></td><td class="hide-mobil"><a target="_new" class="preview" href="https://aruhaz.bearing.hu/static/arukepek/6000.jpg" title=""><img src="https://aruhaz.bearing.hu/static/arukepek/small/6000_s.jpg" alt=""></a></td></tr><tr> <td>R</td><td class="tooltip-box hide-mobil">INA-FAG<span class="tooltip"> <span class="d-block">BEX</span> <span class="d-block">CX</span> <span class="d-block">FAG</span> <span class="d-block">NACHI</span> <span class="d-block">NIS/Y</span> <span class="d-block">NSK</span> <span class="d-block">NTN</span> <span class="d-block">SKF</span> <span class="d-block">SNR</span> <span class="d-block">TIM</span> </span></td><td class="tooltip-box">Tűgörgős csapágyak<span class="tooltip"> <span class="d-block">Mélyhornyú golyóscsapágyak</span> <span class="d-block">Ferde hatásvonalú</span> <span class="d-block">Golyóscsapágyak</span> <span class="d-block">Hordógörgős</span> <span class="d-block">Hordógörgős csapágyak</span> </span></td><td class="hide-tablet">Méret</td><td class="tooltip-box hide-mobil"><i class="icon-info"><span class="tooltip">Tűgörgős kosár jelölése</span></i></td><td class="hide-mobil"><a target="_new" class="preview" href="https://aruhaz.bearing.hu/static/arukepek/6000.jpg" title=""><img src="https://aruhaz.bearing.hu/static/arukepek/small/6000_s.jpg" alt=""></a></td></tr><tr> <td>LM</td><td class="tooltip-box hide-mobil">NTN-SNR<span class="tooltip"> <span class="d-block">BEX</span> <span class="d-block">CX</span> <span class="d-block">FAG</span> <span class="d-block">NACHI</span> <span class="d-block">NIS/Y</span> <span class="d-block">NSK</span> <span class="d-block">NTN</span> <span class="d-block">SKF</span> <span class="d-block">SNR</span> <span class="d-block">TIM</span> </span></td><td>Golyóscsapágyak</td><td class="hide-tablet">Szerkezet</td><td class="tooltip-box hide-mobil"><i class="icon-info"><span class="tooltip">Az NUP típusú hengergörgős csapágyaknak két fix vezetőválla van a külső gyűrűn és egy a belső gyűrűn. Továbbá a belső gyűrűhöz egy levehető vezetőtárcsa is tartozik. Az NUP típus vezető csapágyként kerül beépítésre, mivel a tengelyt mindkét irányban axiálisan megvezeti</span></i></td><td class="hide-mobil"><a target="_new" class="preview" href="https://aruhaz.bearing.hu/static/arukepek/6000.jpg" title=""><img src="https://aruhaz.bearing.hu/static/arukepek/small/6000_s.jpg" alt=""></a></td></tr><tr> <td>K</td><td class="tooltip-box hide-mobil">FBJ<span class="tooltip"> <span class="d-block">BEX</span> <span class="d-block">CX</span> <span class="d-block">FAG</span> <span class="d-block">NACHI</span> <span class="d-block">NIS/Y</span> <span class="d-block">NSK</span> <span class="d-block">NTN</span> <span class="d-block">SKF</span> <span class="d-block">SNR</span> <span class="d-block">TIM</span> </span></td><td>Hengergörgőscsapágyak</td><td class="hide-tablet">Szerkezet</td><td class="tooltip-box hide-mobil"><i class="icon-info"><span class="tooltip">Önmagában, vagy más előjellel együtt használatos, metrikus belső átmérő, és/vagy külső átmérő.</span></i></td><td class="hide-mobil"><a target="_new" class="preview" href="https://aruhaz.bearing.hu/static/arukepek/6000.jpg" title=""><img src="https://aruhaz.bearing.hu/static/arukepek/small/6000_s.jpg" alt=""></a></td></tr><tr> <td>R</td><td class="tooltip-box hide-mobil">INA-FAG<span class="tooltip"> <span class="d-block">BEX</span> <span class="d-block">CX</span> <span class="d-block">FAG</span> <span class="d-block">NACHI</span> <span class="d-block">NIS/Y</span> <span class="d-block">NSK</span> <span class="d-block">NTN</span> <span class="d-block">SKF</span> <span class="d-block">SNR</span> <span class="d-block">TIM</span> </span></td><td class="tooltip-box">Tűgörgős csapágyak<span class="tooltip"> <span class="d-block">Mélyhornyú golyóscsapágyak</span> <span class="d-block">Ferde hatásvonalú</span> <span class="d-block">Golyóscsapágyak</span> <span class="d-block">Hordógörgős</span> <span class="d-block">Hordógörgős csapágyak</span> </span></td><td class="hide-tablet">Méret</td><td class="tooltip-box hide-mobil"><i class="icon-info"><span class="tooltip">Tűgörgős kosár jelölése</span></i></td><td class="hide-mobil"><a target="_new" class="preview" href="https://aruhaz.bearing.hu/static/arukepek/6000.jpg" title=""><img src="https://aruhaz.bearing.hu/static/arukepek/small/6000_s.jpg" alt=""></a></td></tr><tr> <td>LM</td><td class="tooltip-box hide-mobil">NTN-SNR<span class="tooltip"> <span class="d-block">BEX</span> <span class="d-block">CX</span> <span class="d-block">FAG</span> <span class="d-block">NACHI</span> <span class="d-block">NIS/Y</span> <span class="d-block">NSK</span> <span class="d-block">NTN</span> <span class="d-block">SKF</span> <span class="d-block">SNR</span> <span class="d-block">TIM</span> </span></td><td>Golyóscsapágyak</td><td class="hide-tablet">Szerkezet</td><td class="tooltip-box hide-mobil"><i class="icon-info"><span class="tooltip">Az NUP típusú hengergörgős csapágyaknak két fix vezetőválla van a külső gyűrűn és egy a belső gyűrűn. Továbbá a belső gyűrűhöz egy levehető vezetőtárcsa is tartozik. Az NUP típus vezető csapágyként kerül beépítésre, mivel a tengelyt mindkét irányban axiálisan megvezeti</span></i></td><td class="hide-mobil"><a target="_new" class="preview" href="https://aruhaz.bearing.hu/static/arukepek/6000.jpg" title=""><img src="https://aruhaz.bearing.hu/static/arukepek/small/6000_s.jpg" alt=""></a></td></tr><tr> <td>K</td><td class="tooltip-box hide-mobil">FBJ<span class="tooltip"> <span class="d-block">BEX</span> <span class="d-block">CX</span> <span class="d-block">FAG</span> <span class="d-block">NACHI</span> <span class="d-block">NIS/Y</span> <span class="d-block">NSK</span> <span class="d-block">NTN</span> <span class="d-block">SKF</span> <span class="d-block">SNR</span> <span class="d-block">TIM</span> </span></td><td>Hengergörgőscsapágyak</td><td class="hide-tablet">Szerkezet</td><td class="tooltip-box hide-mobil"><i class="icon-info"><span class="tooltip">Önmagában, vagy más előjellel együtt használatos, metrikus belső átmérő, és/vagy külső átmérő.</span></i></td><td class="hide-mobil"><a target="_new" class="preview" href="https://aruhaz.bearing.hu/static/arukepek/6000.jpg" title=""><img src="https://aruhaz.bearing.hu/static/arukepek/small/6000_s.jpg" alt=""></a></td></tr><tr> <td>R</td><td class="tooltip-box hide-mobil">INA-FAG<span class="tooltip"> <span class="d-block">BEX</span> <span class="d-block">CX</span> <span class="d-block">FAG</span> <span class="d-block">NACHI</span> <span class="d-block">NIS/Y</span> <span class="d-block">NSK</span> <span class="d-block">NTN</span> <span class="d-block">SKF</span> <span class="d-block">SNR</span> <span class="d-block">TIM</span> </span></td><td class="tooltip-box">Tűgörgős csapágyak<span class="tooltip"> <span class="d-block">Mélyhornyú golyóscsapágyak</span> <span class="d-block">Ferde hatásvonalú</span> <span class="d-block">Golyóscsapágyak</span> <span class="d-block">Hordógörgős</span> <span class="d-block">Hordógörgős csapágyak</span> </span></td><td class="hide-tablet">Méret</td><td class="tooltip-box hide-mobil"><i class="icon-info"><span class="tooltip">Tűgörgős kosár jelölése</span></i></td><td class="hide-mobil"><a target="_new" class="preview" href="https://aruhaz.bearing.hu/static/arukepek/6000.jpg" title=""><img src="https://aruhaz.bearing.hu/static/arukepek/small/6000_s.jpg" alt=""></a></td></tr><tr> <td>LM</td><td class="tooltip-box hide-mobil">NTN-SNR<span class="tooltip"> <span class="d-block">BEX</span> <span class="d-block">CX</span> <span class="d-block">FAG</span> <span class="d-block">NACHI</span> <span class="d-block">NIS/Y</span> <span class="d-block">NSK</span> <span class="d-block">NTN</span> <span class="d-block">SKF</span> <span class="d-block">SNR</span> <span class="d-block">TIM</span> </span></td><td>Golyóscsapágyak</td><td class="hide-tablet">Szerkezet</td><td class="tooltip-box hide-mobil"><i class="icon-info"><span class="tooltip">Az NUP típusú hengergörgős csapágyaknak két fix vezetőválla van a külső gyűrűn és egy a belső gyűrűn. Továbbá a belső gyűrűhöz egy levehető vezetőtárcsa is tartozik. Az NUP típus vezető csapágyként kerül beépítésre, mivel a tengelyt mindkét irányban axiálisan megvezeti</span></i></td><td class="hide-mobil"><a target="_new" class="preview" href="https://aruhaz.bearing.hu/static/arukepek/6000.jpg" title=""><img src="https://aruhaz.bearing.hu/static/arukepek/small/6000_s.jpg" alt=""></a></td></tr><tr> <td>K</td><td class="tooltip-box hide-mobil">FBJ<span class="tooltip"> <span class="d-block">BEX</span> <span class="d-block">CX</span> <span class="d-block">FAG</span> <span class="d-block">NACHI</span> <span class="d-block">NIS/Y</span> <span class="d-block">NSK</span> <span class="d-block">NTN</span> <span class="d-block">SKF</span> <span class="d-block">SNR</span> <span class="d-block">TIM</span> </span></td><td>Hengergörgőscsapágyak</td><td class="hide-tablet">Szerkezet</td><td class="tooltip-box hide-mobil"><i class="icon-info"><span class="tooltip">Önmagában, vagy más előjellel együtt használatos, metrikus belső átmérő, és/vagy külső átmérő.</span></i></td><td class="hide-mobil"><a target="_new" class="preview" href="https://aruhaz.bearing.hu/static/arukepek/6000.jpg" title=""><img src="https://aruhaz.bearing.hu/static/arukepek/small/6000_s.jpg" alt=""></a></td></tr><tr> <td>R</td><td class="tooltip-box hide-mobil">INA-FAG<span class="tooltip"> <span class="d-block">BEX</span> <span class="d-block">CX</span> <span class="d-block">FAG</span> <span class="d-block">NACHI</span> <span class="d-block">NIS/Y</span> <span class="d-block">NSK</span> <span class="d-block">NTN</span> <span class="d-block">SKF</span> <span class="d-block">SNR</span> <span class="d-block">TIM</span> </span></td><td class="tooltip-box">Tűgörgős csapágyak<span class="tooltip"> <span class="d-block">Mélyhornyú golyóscsapágyak</span> <span class="d-block">Ferde hatásvonalú</span> <span class="d-block">Golyóscsapágyak</span> <span class="d-block">Hordógörgős</span> <span class="d-block">Hordógörgős csapágyak</span> </span></td><td class="hide-tablet">Méret</td><td class="tooltip-box hide-mobil"><i class="icon-info"><span class="tooltip">Tűgörgős kosár jelölése</span></i></td><td class="hide-mobil"><a target="_new" class="preview" href="https://aruhaz.bearing.hu/static/arukepek/6000.jpg" title=""><img src="https://aruhaz.bearing.hu/static/arukepek/small/6000_s.jpg" alt=""></a></td></tr><tr> <td>LM</td><td class="tooltip-box hide-mobil">NTN-SNR<span class="tooltip"> <span class="d-block">BEX</span> <span class="d-block">CX</span> <span class="d-block">FAG</span> <span class="d-block">NACHI</span> <span class="d-block">NIS/Y</span> <span class="d-block">NSK</span> <span class="d-block">NTN</span> <span class="d-block">SKF</span> <span class="d-block">SNR</span> <span class="d-block">TIM</span> </span></td><td>Golyóscsapágyak</td><td class="hide-tablet">Szerkezet</td><td class="tooltip-box hide-mobil"><i class="icon-info"><span class="tooltip">Az NUP típusú hengergörgős csapágyaknak két fix vezetőválla van a külső gyűrűn és egy a belső gyűrűn. Továbbá a belső gyűrűhöz egy levehető vezetőtárcsa is tartozik. Az NUP típus vezető csapágyként kerül beépítésre, mivel a tengelyt mindkét irányban axiálisan megvezeti</span></i></td><td class="hide-mobil"><a target="_new" class="preview" href="https://aruhaz.bearing.hu/static/arukepek/6000.jpg" title=""><img src="https://aruhaz.bearing.hu/static/arukepek/small/6000_s.jpg" alt=""></a></td></tr></tbody> </table> </div></div></div></div></section> </div></div><div class="tab-pane fade" id="nav-utojel" role="tabpanel" aria-labelledby="nav-utojel-tab"> <div class="table-box all-cart-box"> <section class="dynamic-table search_results results_after_login"> <div class="container"> <div class="row"> <div class="col-md-12"> <div class="table-overflow"> <table width="100%" border="0"> <tbody> <tr id="headerth"> <th><input type="text" class="form-control-input" placeholder="Keresés"></th> <th class="hide-mobil"><i class="icon-settings"><span class="tooltip">Gyártó</span></i> <select id="gyartoT" class="form-control-list d-inline" name="gyarto:ignore_empty"> <option value="" selected="selected"> Gyártó </option> <option> -</option> <option>-</option> <option>BEX</option> <option>BLT</option> <option>CX</option> <option>EZO</option> <option>FAG</option> <option>FBJ</option> <option>HIWIN</option> <option>INA</option> <option>KOK</option> <option>KOYO</option> <option>LDI</option> <option>MLX</option> <option>MYT</option> <option>NACHI</option> <option>NIS</option> <option>NIS/Y</option> <option>NKS</option> <option>NSK</option> <option>NSK </option> <option>NTN</option> <option>RHP</option> <option>SAMICK</option> <option>SKF</option> <option>SNR</option> <option>THP</option> <option>TIM</option> </select></th> <th><i class="icon-book-open"><span class="tooltip">Típus</span></i> <select id="productLine" class="form-control-list d-inline" name="productLine:ignore_empty"> <option value="" selected="selected"> Típus</option> <option> Hengergörgős csapágyak</option> <option> Hordógörgős csapágyak</option> <option> Tűgörgős csapágyak</option> <option>Axiális golyóscsapágyak</option> <option>Beálló golyóscsapágyak</option> <option>Csapágyegységek</option> <option>Egyéb termékek</option> <option>Ferde hatásvonalú golyóscsapágy </option> <option>Ferde hatásvonalú golyóscsapágyak</option> <option>Golyóscsapágyak</option> <option>Golyóspersely</option> <option>Görgős csapágyak</option> <option>Hengergörgős csapágyak</option> <option>Hengergörgős csapágyak </option> <option>Hordógörgős csapágyak</option> <option>Hordógörgős csapágyak </option> <option>Kúpgörgős csapágyak</option> <option>Lineáris csapágyak</option> <option>Mélyhornyú golyóscsapágyak </option> <option>Precíziós ferde hatásvonalú golyóscsapágyak</option> <option>Precíziós ferdehatásvonalú golyóscsapágyak</option> <option>Profilsín vezetés</option> <option>Profilsínvezetés</option> <option>Tűgörgős csapágyak</option> <option>Y-csapágyak</option> </select></th> <th class="hide-tablet"><i class="icon-vector"><span class="tooltip">Mire vonatkozik</span></i> <select id="characteristic" class="form-control-list d-inline"> <option value="" selected="selected"> Amire vonatkozik</option> <option>Anyag</option> <option>Egyéb</option> <option>Komponens</option> <option>Méret</option> <option>Szerkezet</option> </select></th> <th class="hide-mobil"><i class="icon-info"><span class="tooltip">Mit jelent</span></i></th> <th class="hide-mobil"><i class="icon-picture"><span class="tooltip">Kép</span></i></th> </tr><tr> <td>K</td><td class="tooltip-box hide-mobil">FBJ<span class="tooltip"> <span class="d-block">BEX</span> <span class="d-block">CX</span> <span class="d-block">FAG</span> <span class="d-block">NACHI</span> <span class="d-block">NIS/Y</span> <span class="d-block">NSK</span> <span class="d-block">NTN</span> <span class="d-block">SKF</span> <span class="d-block">SNR</span> <span class="d-block">TIM</span> </span></td><td>Hengergörgőscsapágyak</td><td class="hide-tablet">Szerkezet</td><td class="tooltip-box hide-mobil"><i class="icon-info"><span class="tooltip">Önmagában, vagy más előjellel együtt használatos, metrikus belső átmérő, és/vagy külső átmérő.</span></i></td><td class="hide-mobil"><a target="_new" class="preview" href="https://aruhaz.bearing.hu/static/arukepek/6000.jpg" title=""><img src="https://aruhaz.bearing.hu/static/arukepek/small/6000_s.jpg" alt=""></a></td></tr><tr> <td>R</td><td class="tooltip-box hide-mobil">INA-FAG<span class="tooltip"> <span class="d-block">BEX</span> <span class="d-block">CX</span> <span class="d-block">FAG</span> <span class="d-block">NACHI</span> <span class="d-block">NIS/Y</span> <span class="d-block">NSK</span> <span class="d-block">NTN</span> <span class="d-block">SKF</span> <span class="d-block">SNR</span> <span class="d-block">TIM</span> </span></td><td class="tooltip-box">Tűgörgős csapágyak<span class="tooltip"> <span class="d-block">Mélyhornyú golyóscsapágyak</span> <span class="d-block">Ferde hatásvonalú</span> <span class="d-block">Golyóscsapágyak</span> <span class="d-block">Hordógörgős</span> <span class="d-block">Hordógörgős csapágyak</span> </span></td><td class="hide-tablet">Méret</td><td class="tooltip-box hide-mobil"><i class="icon-info"><span class="tooltip">Tűgörgős kosár jelölése</span></i></td><td class="hide-mobil"><a target="_new" class="preview" href="https://aruhaz.bearing.hu/static/arukepek/6000.jpg" title=""><img src="https://aruhaz.bearing.hu/static/arukepek/small/6000_s.jpg" alt=""></a></td></tr><tr> <td>LM</td><td class="tooltip-box hide-mobil">NTN-SNR<span class="tooltip"> <span class="d-block">BEX</span> <span class="d-block">CX</span> <span class="d-block">FAG</span> <span class="d-block">NACHI</span> <span class="d-block">NIS/Y</span> <span class="d-block">NSK</span> <span class="d-block">NTN</span> <span class="d-block">SKF</span> <span class="d-block">SNR</span> <span class="d-block">TIM</span> </span></td><td>Golyóscsapágyak</td><td class="hide-tablet">Szerkezet</td><td class="tooltip-box hide-mobil"><i class="icon-info"><span class="tooltip">Az NUP típusú hengergörgős csapágyaknak két fix vezetőválla van a külső gyűrűn és egy a belső gyűrűn. Továbbá a belső gyűrűhöz egy levehető vezetőtárcsa is tartozik. Az NUP típus vezető csapágyként kerül beépítésre, mivel a tengelyt mindkét irányban axiálisan megvezeti</span></i></td><td class="hide-mobil"><a target="_new" class="preview" href="https://aruhaz.bearing.hu/static/arukepek/6000.jpg" title=""><img src="https://aruhaz.bearing.hu/static/arukepek/small/6000_s.jpg" alt=""></a></td></tr></tbody> </table> </div></div></div></div></section> </div></div></div></div></div>');
        //runtabs();
        //eloTag();
        //utoJel();
        rundialog();
        close();
        $("#dialog-elo-uto").dialog("open");
        imagePreviewDialog();
    });
    /*új*/

    $(".product_name").on("click", function() {
        autoclose();
        $(".dialog_box").html('<div id="dialog-similar-product" title="6200 2R S"><div id="tabs" class="products-data-table"><div class="before-table-data-table"><div class="before-table-left"><img src="../image/table_image.jpg" alt=""/></div><div class="before-table-right"><span>Mélyhornyú golyóscsapágy</span>A mélyhornyú golyóscsapágyakat az ipari és a mezőgazdaság számos területén alkalmazzák. Nagy fordulatszámon is képesek radiális és axális erők felvételére.</div>    </div>    <div>      <table width="48%">        <tr>          <td>Gyártó</td>          <td>FBJ</td>        </tr>        <tr>          <td>Cikkszám</td>          <td>01-01-02-00319</td>        </tr>        <tr>          <td>Termék</td>          <td>6200 2RS</td>        </tr>		<tr>          <td>Gyártói azonosító</td>          <td>6200-2RS</td>        </tr>		<tr>          <td>Teljes készlet</td>          <td>4263</td>        </tr>		<tr>          <td>Szabad készlet</td>          <td>256</td>        </tr>		<tr>          <td>Minimális darabszám ingyenes házhozszállításhoz</td>          <td></td>        </tr>		<tr>          <td>Csomagolási egység</td>          <td></td>        </tr>      </table>      <table width="48%">        <tr>          <td>Listaár (HUF)</td>          <td></td>        </tr>        <tr>          <td>Megtakarítás %</td><td></td></tr><tr>          <td>Kedvezményes ár (HUF)</td><td></td>        </tr>		<tr>          <td>Online kedvezmény %</td>          <td></td>        </tr>		<tr>          <td>Online kedvezményes ár (HUF)</td>          <td></td>        </tr>		<tr>         <td>Furat átmérő (mm)</td>          <td>10</td>        </tr>		  <tr>          <td>Külső átnérő (mm)</td>          <td>30</td>        </tr>		<tr>          <td>Szélesség (mm)</td>          <td>9</td>        </tr>		<tr>          <td>Súly</td>          <td>0,03 KG</td>        </tr>      </table>    </div><div style="clear:both"></div>	<div class="dl-print-btn"><img src="../image/download.jpg" alt=""/> <img src="../image/print.jpg" alt=""/></div>  </div></div>');
        //runtabs();
        //eloTag();
        //utoJel();
        rundialog();
        close();
        $("#dialog-similar-product").dialog("open");
    });

    /*$(".info_icon_replacement").on("click", function () {
    	filterKey = $(this).attr("filterKey");
    	if (!filterKey)
    		filterKey = "tipus";
    	cim = "helyettesít&#245; termékek";
    	if (filterKey == "azonosito") {
    		cim = "méretben megegyez&#245; termékek";
    	}
    	internal_code = $(this).parent().parent().attr("internal_kod");
    	azonosito = $(this).parent().parent().attr("azonosito");
    	tipus = $(this).parent().parent().attr("tipus");
    	suppCatNum = $(this).parent().parent().attr("suppCatNum");
    	title = $(this).parent().parent().attr("title");
		$(".dialog_box").html('<div id="dialog-similar-product-small" title="3210"><p>' + cim + '</p><div id="tabs"></div></div>');
		//runtabs();
		$.get("getHelyettesitoTermekek", { azonosito : azonosito, tipus : tipus, suppCatNum : suppCatNum, oid : internal_code, filterKey : filterKey }, function(data) {
		$("#tabs").html(data);
		})
  		.fail(function() {
    		alert( "error" );
		});
		rundialog();
		closeHelyettesito();
//		close();
		$("#tabs").html('Hamarosan megjelennek a ' + cim + ' <img src="/images/ui-anim_basic_16x16.gif" alt="" title="ui-anim_basic_16x16.gif" width="16" height="16">');
        $( "#dialog-similar-product-small" ).dialog( "open" );
        $( "#dialog-similar-product-small" ).dialog('option', 'title', title);
        var target = $(this).parent();
        
	});*/
    /*új*/
    $(".info_icon_replacement").on("click", function() {
        autoclose();
        $(".dialog_box").html('<div id="dialog-similar-product-small" title="3210"> <p>Helyettesítő termékek</p><table id="table1" width="100%" border="0"> <thead> <tr> <th><div><span class="text">Termék <div class="order_arrows"> <button class="up_arrow"><img src="../image/up_arrow_new.png" alt="up arrow"></button> <button class="down_arrow"><img src="../image/down_arrow_new.png" alt="down arrow"></button> </div></span></div></th> <th class="hide-mobil"><span class="text">Gyártó <div class="order_arrows"> <button class="up_arrow"><img src="../image/up_arrow_new.png" alt="up arrow"></button> <button class="down_arrow"><img src="../image/down_arrow_new.png" alt="down arrow"></button> </div></span></th> <th class="hide-mobil"><span class="text">Egységár <div class="order_arrows"> <button class="up_arrow"><img src="../image/up_arrow_new.png" alt="up arrow"></button> <button class="down_arrow"><img src="../image/down_arrow_new.png" alt="down arrow"></button> </div></span></th> <th class="hide-tablet"><span class="text">Készlet <div class="order_arrows"> <button class="up_arrow"><img src="../image/up_arrow_new.png" alt="up arrow"></button> <button class="down_arrow"><img src="../image/down_arrow_new.png" alt="down arrow"></button> </div></th> <th><span class="text"> <input type="checkbox"> Készleten</span></th> </tr></thead> <tbody id="border_top"> <tr> <td>CES210</td><td class="hide-mobil">SNR</td><td class="hide-mobil">2579</td><td class="hide-tablet">13</td><td><input class="piece" type="text"> <label class="piece_label">DB</label> <button class="add_cart_button"><i class="icon-basket icon-merete"></i></button></td></tr><tr> <td>3210</td><td class="hide-mobil">FBJ</td><td class="hide-mobil">2579</td><td class="hide-tablet">124</td><td><input class="piece" type="text"> <label class="piece_label">DB</label> <button class="add_cart_button"><i class="icon-basket icon-merete"></i></button></td></tr><tr> <td>3210 2Z</td><td class="hide-mobil">CX</td><td class="hide-mobil">2579</td><td class="hide-tablet">67</td><td><input class="piece" type="text"> <label class="piece_label">DB</label> <button class="add_cart_button"><i class="icon-basket icon-merete"></i></button></td></tr><tr> <td>5210EEG15</td><td class="hide-mobil">SNR</td><td class="hide-mobil">2579</td><td class="hide-tablet">23</td><td><a href="#" class="offer_request_btn">Ajánlatkérés<i class="fa icon-briefcase ml-2" aria-hidden="true"></i></a></td></tr></tbody> </table></div>');
        //runtabs();
        rundialog();
        close();
        $("#dialog-similar-product-small").dialog("open");
    });

    $(".info_icon_similar_size").on("click", function() {
        autoclose();
        $(".dialog_box").html('<div id="dialog-similar-product-small" title="3210"> <p>Méretben megegyező termékek</p><table id="table1" width="100%" border="0"> <thead> <tr> <th><div><span class="text">Termék <div class="order_arrows"> <button class="up_arrow"><img src="../image/up_arrow_new.png" alt="up arrow"></button> <button class="down_arrow"><img src="../image/down_arrow_new.png" alt="down arrow"></button> </div></span></div></th> <th class="hide-mobil"><span class="text">Gyártó <div class="order_arrows"> <button class="up_arrow"><img src="../image/up_arrow_new.png" alt="up arrow"></button> <button class="down_arrow"><img src="../image/down_arrow_new.png" alt="down arrow"></button> </div></span></th> <th class="hide-mobil"><span class="text">Egységár <div class="order_arrows"> <button class="up_arrow"><img src="../image/up_arrow_new.png" alt="up arrow"></button> <button class="down_arrow"><img src="../image/down_arrow_new.png" alt="down arrow"></button> </div></span></th> <th class="hide-tablet"><span class="text">Készlet <div class="order_arrows"> <button class="up_arrow"><img src="../image/up_arrow_new.png" alt="up arrow"></button> <button class="down_arrow"><img src="../image/down_arrow_new.png" alt="down arrow"></button> </div></th> <th><span class="text"> <input type="checkbox"> Készleten</span></th> </tr></thead> <tbody id="border_top"> <tr> <td>CES210</td><td class="hide-mobil">SNR</td><td class="hide-mobil">2579</td><td class="hide-tablet">13</td><td><input class="piece" type="text"> <label class="piece_label">DB</label> <button class="add_cart_button"><i class="icon-basket icon-merete"></i></button></td></tr><tr> <td>3210</td><td class="hide-mobil">FBJ</td><td class="hide-mobil">2579</td><td class="hide-tablet">124</td><td><input class="piece" type="text"> <label class="piece_label">DB</label> <button class="add_cart_button"><i class="icon-basket icon-merete"></i></button></td></tr><tr> <td>3210 2Z</td><td class="hide-mobil">CX</td><td class="hide-mobil">2579</td><td class="hide-tablet">67</td><td><input class="piece" type="text"> <label class="piece_label">DB</label> <button class="add_cart_button"><i class="icon-basket icon-merete"></i></button></td></tr><tr> <td>5210EEG15</td><td class="hide-mobil">SNR</td><td class="hide-mobil">2579</td><td class="hide-tablet">23</td><td><a href="#" class="offer_request_btn">Ajánlatkérés<i class="fa icon-briefcase ml-2" aria-hidden="true"></i></a></td></tr></tbody> </table></div>');
        //runtabs();
        rundialog();
        close();
        $("#dialog-similar-product-small").dialog("open");
    });
    /*új*/
    $(".info_icon").on("click", function() {
        internal_code = $(this).parent().parent().attr("internal_kod");
        $.get("getKeszletInfo", {
                internal_kod: internal_code
            }, function(data) {
                //		var obj = JSON.parse(data);
                $("#tabs-2").html(data);
            })
            .fail(function() {
                alert("error");
            });
        azonosito = $(this).parent().parent().attr("azonosito");
        tipus = $(this).parent().parent().attr("tipus");
        suppCatNum = $(this).parent().parent().attr("suppCatNum");
        title = $(this).parent().parent().attr("title");
        $.get("getHelyettesitoTermekek", {
                azonosito: azonosito,
                tipus: tipus,
                suppCatNum: suppCatNum,
                oid: internal_code
            }, function(data) {
                //		var obj = JSON.parse(data);
                $("#tabs-3").html(data);
            })
            .fail(function() {
                alert("error");
            });
        $(".dialog_box").html('<div id="dialog-similar-product" title="' + title + '"><div id="tabs"><ul><li><a href="#tabs-1">Termék info</a></li><li><a href="#tabs-2">Készlet info</a></li><li><a href="#tabs-3">Méretben megegyez&#245; cikkek</a></li><li><a href="#tabs-4">Gyártói web oldal</a></li></ul><div id="tabs-1">Termék info</div><div id="tabs-2">Készlet info</div><div id="tabs-3">Hamarosan megjelennek a méretben megegyez&#245; cikkek...</div><div id="tabs-4"><iframe src="http://www.fbj-bearings.com/"></iframe></div></div></div>');
        runtabs();
        rundialog();
        $("#tabs-3").html("Hamarosan megjelennek a méretben megegyez&#245; cikkek...");
        $("#dialog-similar-product").dialog("open");
        $("#dialog-similar-product").dialog('option', 'title', title);
        var target = $(this).parent();
    });

    $(".pay").on("click", function(event) {
        var nettoPrice = Number(document.totalPrice);
        var missingValue = Number(document.ingyenSzallitasPrice) - nettoPrice;
        if (nettoPrice < document.ingyenSzallitasPrice) {
            event.preventDefault();
            $(".dialog_box").html('<div id="pay-more-popup">Vásároljon még ' + missingValue + ' ' + document.currency + ' értékben és<br>csomagját ingyenesen házhoz<br>szállítjuk!<div class="pay-more-popup-buttons"><a href="/">vásárolok még</a><a href="/penztar_oldal">nem kérem a kedvezményt</a></div><div class="pay-more-popup-close"><img src="../image/pay-more-close-btn.png" alt=""/></div></div>');
            pay_more_close();
        }
    });


    $(".submit_span.payment").on("click", function(event) {
        var nettoPrice = Number($("#nettoPrice").html().split(' ')[0]);
        var missingValue = Number(document.ingyenSzallitasPrice) - nettoPrice;
        if (nettoPrice < document.ingyenSzallitasPrice) {
            event.preventDefault();
            $(".dialog_box").html('<div id="pay-more-popup">Vásároljon még ' + missingValue + ' Ft értékben és<br>csomagját ingyenesen házhoz<br>szállítjuk!<div class="pay-more-popup-buttons"><a href="/">vásárolok még</a><a onclick="orderCart()" href="#">nem kérem a kedvezményt</a></div><div class="pay-more-popup-close"><img src="../image/pay-more-close-btn.png" alt=""/></div></div>');
            pay_more_close();
        }
    });
    /*dialog box*/

    /*offer request*/

    //	$( ".offer_request_btn" ).on( "click", function() {
    //		$(".dialog_box").html('<div id="offer_request"><form id="offer_request_form"><label>Név:*</label><input type="text" id="nameField"><label>E-mail cím:*</label><input type="text" id="emailField"><label>Telefonszám:</label><input type="text" id="phoneField"><label>Darabszám:*</label><input type="number" id="offerAmount"><label>Ajánlatkérés szövege:</label><textarea id="offerText"></textarea><input type="submit" value="Elküld"></form><div class="pay-more-popup-close"><img src="../image/pay-more-close-btn.png" alt=""/></div></div>');
    //		rundialog();
    //		pay_more_close();
    //$( "#offer_request" ).dialog( "open" );
    //    });

    /*offer request*/

    /*password change*/
    $('.change-password').on("click", function() {
        $(".change-data-form-box").html('<form class="change-pass-form" action="changePassword_py"><p>Jelszócsere:</p><div class="col-md-6 disable-left-padding"><label>Jelszó:</label><input type="text" name="new_password"></div><div class="col-md-6"><label>Jelszó meger&#245;sítése:</label><input type="text" name="new_password_confirm"></div><span class="submit_span"><input type="submit" value="Módisít"></span></form>');
    });
    /*password change*/
    /*new address*/
    $('.new-address').on("click", function() {
        $(".change-data-form-box").html('<form class="new-address-form" action="addNewAddress_py"><p>Új cí­m hozzáadása:</p><div class="col-md-6 disable-left-padding"><label>Név:</label><input type="text" name="nev"><label>Adószám:</label><input type="text" name="adoszam"><label>Város:</label><input type="text" name="varos"><label>E-mail:</label><input type="text" name="email"></div><div class="col-md-6"><label>Cégnév:</label><input type="text" name="ceg"><label>Irányítószám:</label><input type="text" name="iranyito"><label>Cím:</label><input type="text" name="cim"><label>Telefon:</label><input type="text" name="telefon"></div><div class="col-md-12 disable-left-padding"><label>Alapértelmezett cím:</label></div><div class="col-md-4 disable-left-padding"><input class="hide-radio" type="radio" name="default-address" value="Igen"><span class="checked-image"></span><label class="center">Igen</label></div><div class="col-md-4 disable-left-padding"><input class="hide-radio" type="radio" name="default-address" value="Nem"><span class="checked-image"></span><label class="center">Nem</label></div><div class="col-md-4">&nbsp;</div><div class="col-md-12 disable-left-padding"><span class="submit_span"><input type="submit" value="Hozzáad"></span></div><div class="clear_both"></div></form>');
        new_address_check_radio();
    });

    function new_address_check_radio() {
        $(".checked-image").on("click", function() {
            $(".checked-image").removeClass("checked-image-checked");
            $(this).addClass("checked-image-checked");
            $(this).prev('input').prop("checked", true);
            //console.log( $(this).prev('input').val() );
        });
    }
    /*new address*/

    /*change own data*/
    $('.change').on("click", function() {
        var defaultNo = false;
        $.get("getPersonalData", function(data) {
                var obj = JSON.parse(data);
                $("#personalName").val(obj.nev);
                $("#personalTaxNr").val(obj.adoszam);
                $("#personalCity").val(obj.varos);
                $("#personalEmail").val(obj.email);
                $("#personalCeg").val(obj.ceg);
                $("#personalIranyito").val(obj.iranyito);
                $("#personalCim").val(obj.cim);
                $("#personalTel").val(obj.tel);
                if (obj.isDefaultAddress) {
                    $("#defaultYes").click();
                    $(".checked-image").off("click");
                } else {
                    $("#defaultNo").click();
                }

            })
            .fail(function() {
                alert("error");
            });
        $(".change-data-form-box").html('<form class="change-own-data-form" action="changePersonalData"><p>Személyes adatok módosítása:</p><div class="col-md-6 disable-left-padding"><label>Név:</label><input type="text" id="personalName" name="nev"><label>Adószám:</label><input type="text" id="personalTaxNr" name="adoszam"><label>Város:</label><input type="text" id="personalCity" name="varos"><label>E-mail:</label><input type="text" id="personalEmail" name="email"></div><div class="col-md-6"><label>Cégnév:</label><input type="text" id="personalCeg" name="ceg"><label>Irányítószám:</label><input type="text" id="personalIranyito" name="iranyito"><label>Cím:</label><input type="text" id="personalCim" name="cim"><label>Telefon:</label><input type="text" id="personalTel" name="telefon"></div><div class="col-md-12 disable-left-padding"><label>Alapértelmezett cím:</label></div><div class="col-md-4 disable-left-padding"><input class="hide-radio" type="radio" name="default-address" value="Igen"><span id="defaultYes" class="checked-image checked-image-checked"></span><label class="center">Igen</label></div><div class="col-md-4 disable-left-padding"><input class="hide-radio" type="radio" name="default-address" value="Nem"><span id="defaultNo" class="checked-image"></span><label class="center">Nem</label></div><div class="col-md-4">&nbsp;</div><div class="col-md-12 disable-left-padding"><span class="submit_span"><input type="submit" value="Módosít"></span></div><div class="clear_both"></div></form>');
        new_address_check_radio();
    });
    /*change own data*/

    function new_address_check_radio() {
        $(".checked-image").on("click", function() {
            $(".checked-image").removeClass("checked-image-checked");
            $(this).addClass("checked-image-checked");
            $(this).prev('input').prop("checked", true);
            //console.log( $(this).prev('input').val() );
        });
    }

    $('.directory').on("click", function() {
        $.get("getAddressList", function(data) {
                //		var obj = JSON.parse(data);
                $(".change-data-form-box").html(data);
            })
            .fail(function() {
                alert("error");
            });
        //		$(".change-data-form-box").html('<form class="directory-own-data-form"><div class="directory-box"><p class="directory-title">Cí­mjegyzék:</p><p>Bearing Kft.</p><p>Miklay Edit</p><p>Budapest</p><p>Sz&#245;l&#245;kert u. 5.</p><p>1033</p><span class="submit_span"><input type="submit" value="Módisítás"></span><span class="submit_span"><input type="submit" value="T&#195;&#182;rl&#195;&#169;s"></span></div><div class="directory-box"><p class="directory-title">Címjegyzék:</p><p>Bearing Kft.</p><p>Miklay Edit</p><p>Budapest</p><p>Sz&#197;&#8216;l&#197;&#8216;kert u. 5.</p><p>1033</p><span class="submit_span"><input type="submit" value="Módos&#195;ítás"></span><span class="submit_span"><input type="submit" value="Törlés"></span></div><div class="clear_both"></div></form>');
    });

    $('.auction-licit-box .bid-link a').on("click", function() {
        if (!$('.auction-licit-box .bid-link input').val()) {
            $('.auction-licit-box .bid-link').append('<div class="licit-popup">Adjon meg egy összeget legalább 3500 Ft értékben!<div class="licit-popup-close"></div></div>');
            licit_popup_close();
        }
    });


    function licit_popup_close() {
        $(".licit-popup-close").on("click", function() {
            $(".licit-popup").remove();
        });
    }
    /*új*/
    $(".open-data-sheet").on("click", function() {
        autoclose();
        $(".dialog_box").html('<div id="dialog-data-sheet" title="KR16"> <div class="container"> <div class="row"> <div class="col-sm-12 col-md-12 col-lg-6" id="use-table"> <table cellpadding="0" cellspacing="0" border="0" id="simple_table"> <tr> <td>Gyártó</td><td>NIS/Y</td></tr><tr> <td>Cikkszám</td><td>1BKR1600000000000060</td></tr><tr> <td>Termék</td><td>KR 16</td></tr><tr> <td>Gyártói azonosító</td><td>KR 16</td></tr><tr> <td>Teljes készlet</td><td>36</td></tr><tr> <td>Szabad készletó</td><td>34</td></tr><tr> <td>Minimális darabszám ingyenes házhozszállításhoz</td><td></td></tr><tr> <td>Csomagolási egység</td><td></td></tr><tr> <td>Listaár (HUF)</td><td>1605</td></tr><tr> <td>Megtakarítás %</td><td>0</td></tr><tr> <td>Kedvezményes ár (HUF)</td><td>1605</td></tr><tr> <td>Online kedvezmény %</td><td>0</td></tr><tr> <td>Online kedvezményes ár (HUF)</td><td>1605</td></tr><tr> <td>Furat átmérő (mm)</td><td>16</td></tr><tr> <td>Külső átmérő (mm)</td><td>6</td></tr><tr> <td>Szélesség (mm)</td><td>28</td></tr><tr> <td>Súly</td><td>0.0</td></tr></table> </div><div class="col-sm12 col-md-12 col-lg-6"> <div class="right-img-box hide-tablet"><img src="../image/data-sheet-img.png" alt=""></div><div class="data-sheet-btns-box text-center"><button type="button" class="btn download-pdf"><span>PDF</span><span>Letöltés</span></button> <button type="button" class="btn btn-print"><span>Mehet!</span><span>Nyomtatás</span></button></div></div></div></div></div>');
        rundialog();
        close();
        downloadPdf();
        printContent();
        $("#dialog-data-sheet").dialog("open");
    });

    function printContent() {
        $(".btn-print").on("click", function() {
            var pdfTitle = $(".ui-dialog-title").text();
            var line = $(".print-orange-line").html();
            var bottomLine = $(".print-bottom-line").html();
            var logo = $(".print-logo").html();
            var pdfImage = $(".right-img-box").html();
            var mywindow = window.open('', 'PRINT');

            mywindow.document.write('<html><head><title>' + document.title + '</title>');
            mywindow.document.write('<style>body {color: #25215f; font-family: Arial, Helvetica, sans-serif; } .left-line {position:absolute; top:10px; left:0;} td {border-bottom: 1px solid #dbd7e1;font-size: 12px;padding: 5px 0;font-weight: 500;} .pdf-table-box {max-width:415px; margin:0 auto;} .pdf-title {margin-bottom: 25px;font-weight: 600;font-size: 12px; margin-top:40px;} .pdf-img-box {text-align: center;margin: 50px auto 0;max-width: 415px;}.pdf-bottom{position:relative;} .pdf-bottom-left {width: 50%;font-size: 13px;font-weight: 600;display: inline-block;} .pdf-header img {max-width:300px; margin-left:50px; margin-top:5px;} .pdf-header-text {float: right;} .pdf-header-text p {font-weight: 600;text-transform: none;margin-bottom: -8px;font-size: 13px; line-height:12px;} .pdf-bottom-right {float:right; margin-top: 15px;}</style></head><body>');
            mywindow.document.write('<div class="pdf-header"><img src="image/bearinglogo_web.png"><div class="pdf-header-text"><p>Tel.: +36 1 203 5000</p><p>Email: ugyfelszolgalat@bearing.hu</p><p>1033 Budapest, Szőlőkert u. 5.</p></div></div><div class="left-line"><img src="image/left-line.png"></div><div class="pdf-table-box"><div class="pdf-title">' + pdfTitle + '</div>');
            mywindow.document.write(document.getElementById('use-table').innerHTML);
            mywindow.document.write('</div><div class="pdf-img-box">' + pdfImage + '</div>');
            mywindow.document.write('<div class="pdf-bottom"><div class="pdf-bottom-left">© 1993-2021 Bearing Express. A weboldalon található anyagok kizárólag a BearingKft. hozzájárulásával és a forrás megjelölésével használhatóak fel.</div><div class="pdf-bottom-right"><img src="image/bottom-line.png"></div></div>');
            mywindow.document.write('</body></html>');

            mywindow.document.close(); // necessary for IE >= 10
            mywindow.focus(); // necessary for IE >= 10*/

            mywindow.print();
            mywindow.close();

            return true;
        });
    }

    function downloadPdf() {
        $(".download-pdf").on("click", function() {
            $("body").css("overflow", "hidden");
            var pdfTable = $("#use-table").html();
            var pdfImage = $(".right-img-box").html();
            var pdfTitle = $(".ui-dialog-title").text();
            $("#to-pdf").append('<div class="left-line"></div><div class="pdf-header"><img src="image/bearinglogo_web.png"><div class="pdf-header-text"><p>Tel.: +36 1 203 5000</p><p>Email: ugyfelszolgalat@bearing.hu</p><p>1033 Budapest, Szőlőkert u. 5.</p></div></div><div class="pdf-table-box"><div class="pdf-title">' + pdfTitle + '</div><div>' + pdfTable + '</div></div><div class="pdf-img-box">' + pdfImage + '</div><div class="pdf-bottom"><div class="pdf-bottom-left">© 1993-2021 Bearing Express. A weboldalon található anyagok kizárólag a BearingKft. hozzájárulásával és a forrás megjelölésével használhatóak fel.</div><div class="pdf-bottom-right"></div></div>');
            // Choose the element that our invoice is rendered in.
            var element = document.getElementById("to-pdf");
            var opt = {
                filename: pdfTitle + '.pdf',
                image: {
                    type: 'png'
                },
                html2canvas: {
                    scale: 2
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait'
                }
            };
            html2pdf(element, opt);
            $("#to-pdf").empty();
            $("body").css("overflow", "auto");
        });
    }

    /*új*/


});

$(function() {

    $(document).tooltip({
        position: {
            my: "center bottom-0",
            at: "center top",
            using: function(position, feedback) {
                $(this).css(position);
                $("<div>")
                    .addClass("arrow")
                    .addClass(feedback.vertical)
                    .addClass(feedback.horizontal)
                    .appendTo(this);
            }
        }
    });
});

$(document).ready(function () {
    //Toggle fullscreen
    $("#panel-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');
    });
});
