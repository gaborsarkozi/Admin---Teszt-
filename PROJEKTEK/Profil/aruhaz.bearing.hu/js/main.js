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
    return idStr.replace(/\s|\//g, '_').replace('#', '_').replace('.', '_').replace(',', '_').replace(';', '_');
}

function addToSubCart(internal_kod, currency, subCartId = null, subCartInfo = null) {
    if (subCartId == null, subCartInfo == null && subCartId == null) {
        $.get("/getSubCarts", {
                internal_kod: internal_kod,
                currency: currency
            }, function(data) {
                $(".dialog_box").html(data);
                $(".pay-more-popup-close").click(function() {
                    $(".dialog_box").empty();
                });
            })
            .fail(function() {
                alert("error");
            });
    } else if (subCartId !== null) {
        addToCart(internal_kod, currency, subCartId = subCartId);
    } else if (subCartInfo !== null) {
        $.get("/addSubCart_py", {
                subCartInfo: subCartInfo
            }, function(data) {
                addToCart(internal_kod, currency, subCartId = data);
            })
            .fail(function() {
                alert("error");
            });
    }
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
        }
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


function doRstPage() {

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
            }
        });
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
    //   $( ".info_icon_product").on( "click", function() {
    //   	var url = $(this).prev().attr('href');
    //   	internal_code = $(this).parent().parent().attr("internal_kod");
    //   	title = $(this).parent().parent().attr("title");
    // $(".dialog_box").html('<div id="dialog-similar-product" title="3210"><iframe src="' + url + '"></iframe></div>');
    // rundialog();
    // close();
    // $("#dialog-similar-product").dialog("open");
    // $("#dialog-similar-product").dialog('option', 'title', title);
    //   });

    $(".product_name").on("click", function() {
        internal_code = $(this).parent().parent().attr("internal_kod");
        title = $(this).parent().parent().attr("title")
        autoclose();
        $(".dialog_box").html('<div id="dialog-similar-product" title="6304 2R S"></div>');
        $.get("/getProductInfoWindow", {
                oid: internal_code
            }, function(data) {
                $("#dialog-similar-product").html(data);
            })
            .fail(function() {
                alert("error");
            });

        rundialog();
        close();
        $("#dialog-similar-product").dialog("open");
        $("#dialog-similar-product").dialog('option', 'title', title);
    });

    $(".info_icon_product").on("click", function() {
        autoclose();
        gyarto = $(this).parent().parent().attr("gyarto");
        termek = title = $(this).parent().parent().attr("title")
        title = $(this).parent().parent().attr("title") + " ELÖ ÉS UTÓJELEK";
        $(".dialog_box").html('<div id="dialog-similar-product" title="6304 2R S"></div>');
        //runtabs();
        $.get("/Utojelek/getUtojel", {
                gyarto: gyarto,
                isUtojel: "1",
                termek: termek,
                fromSearch: 'on'
            }, function(data) {
                $("#dialog-similar-product").html(data);
            })
            .fail(function() {
                alert("error");
            });
        rundialog();
        close();
        $("#dialog-similar-product").dialog("open");
        $("#dialog-similar-product").dialog('option', 'title', title);
    });

    $(".info_icon_replacement").on("click", function() {
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
        $.get("getHelyettesitoTermekek", {
                azonosito: azonosito,
                tipus: tipus,
                suppCatNum: suppCatNum,
                oid: internal_code,
                filterKey: filterKey
            }, function(data) {
                $("#tabs").html(data);
            })
            .fail(function() {
                alert("error");
            });
        rundialog();
        closeHelyettesito();
        //		close();
        $("#tabs").html('Hamarosan megjelennek a ' + cim + ' <img src="/images/ui-anim_basic_16x16.gif" alt="" title="ui-anim_basic_16x16.gif" width="16" height="16">');
        $("#dialog-similar-product-small").dialog("open");
        $("#dialog-similar-product-small").dialog('option', 'title', title);
        var target = $(this).parent();

    });

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

    $("#headerth").tooltip({
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

}

$(document).ready(function() {
    doRstPage();
    //out of stock checkbox
    $(".checkbox_button.out_of_stock").click(function() {
        $(this).toggleClass("checked");
        //var $checkbox = $(this).find(':checkbox');
        $(".out_of_stock_checkbox").attr('checked', !$(".out_of_stock_checkbox").attr('checked'));
        if ($('#termekekNGField').value != null || $('#outerSizeSelect').value != null || $('#outerSizeSelect').text != null || $('#innerSizeSelect').value != null || $('#widthSizeSelect').value != null)
            $('#searchForm').submit();
    });


});