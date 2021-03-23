    $(function() {

        $("#termekekNGField").autocomplete({
            source: function(request, response) {
                $.ajax({
                    url: "quickSearch",
                    dataType: "jsonp",
                    data: {
                        term: request.term
                    },
                    success: function(data) {
                        response(data);
                    }
                });
            },
            minLength: 2,
        });
    });

    function clearSearchForm() {
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
        resetSelect();
        clearResults();
    }

    function clearResults() {
        $("#searchresults").html("");
        if ($("#mediasResults").length)
            $("#mediasResults").html("");
        if ($("#ntnResults").length)
            $("#ntnResults").html("");
        if ($("#kugellagerSearchResults").length)
            $("#kugellagerSearchResults").html("");
        if ($("#rollingSearchResults").length)
            $("#rollingSearchResults").html("");
    }

    function getSearchDict() {
        var qstr = {};
        var notEmpty = false;
        var gyarto = $("#gyarto").val();
        if (gyarto) {
            qstr['gyarto'] = gyarto
            notEmpty = true;
        }
        var raktar = $("#raktarakSelect").val();
        if (raktar) {
            qstr['selected_raktarak:list:ignore_empty'] = raktar
            notEmpty = true;
        }
        var termekekNG = $("#termekekNGField").val();
        if (termekekNG) {
            qstr['termekekNG'] = termekekNG;
            notEmpty = true;
        }
        var innerSize = $("#innerSizeSelect").val();
        if (innerSize) {
            qstr['innerSize'] = innerSize;
            notEmpty = true;
        }
        var outerSize = $("#outerSizeSelect").val();
        if (outerSize) {
            qstr['outerSize'] = outerSize;
            notEmpty = true;
        }
        var widthSize = $("#widthSizeSelect").val();
        if (widthSize) {
            qstr['widthSize'] = widthSize;
            notEmpty = true;
        }
        var arucsoport = $("#arucsoport").val();
        if (arucsoport) {
            qstr['arucsoport'] = arucsoport;
            notEmpty = true;
        }
        if ($("#out_of_stock_checkbox").is(":checked")) {
            qstr['noraktaron:int'] = 1;
        }
        if (notEmpty) {
            qstr['meta_type'] = "BearingCsapagy";
            return qstr;
        } else return false;
    }

    $(document).ready(function() {
        var qstr = {};
        qstr['meta_type'] = "BearingCsapagy";
        qstr['termekekNG'] = 'kr';
        runSAPSearch(qstr);
        document.lastsearch = '';
        document.ntnDetailUrls = [];
        document.mediasDetailUrls = [];
        $("form").submit(function(e) {
            e.preventDefault();
            var qstr = getSearchDict();
            if (qstr)
                runSAPSearch(qstr);
        });
    });

    function submitForm(event) {
        var qstr = getSearchDict();
        if (qstr)
            runSAPSearch(qstr);
        else {
            resetSelect();
            /*            var clickedId = event.target.id;
                        var selectVal = $("#"+clickedId).val()
                        if (selectVal == '') {
                            if ($("#"+clickedId).children('option').length < parseInt($("#"+clickedId).attr("optionlength"))) {
                                resetSelect(clickedId);
                            };
                        } */
        }
    }

    function resetSelect(selectId) {
        $.getJSON("json_getArukats", {}, function(data) {
                $('#arucsoport')
                    .empty()
                    .append('<option value="">-- Összes --</option>')
                    .val('');
                $.each(data, function(index, value) {
                    $('#arucsoport').append($('<option/>', {
                        value: value,
                        text: value
                    }));
                });
            })
            .fail(function() {
                console.log("error");
            });
        $.getJSON("json_getUserGyartok", {}, function(data) {
                $('#gyarto')
                    .empty()
                    .append('<option value="">-- Összes --</option>')
                    .val('');
                $.each(data, function(index, value) {
                    $('#gyarto').append($('<option/>', {
                        value: value,
                        text: value
                    }));
                });
            })
            .fail(function() {
                console.log("error");

            });
        $.getJSON("json_getRaktarak", {}, function(data) {
                $('#raktarakSelect')
                    .empty()
                    .append('<option value="">-- Összes --</option>')
                    .val('');
                $.each(data, function(index, value) {
                    $('#raktarakSelect').append($('<option/>', {
                        value: value,
                        text: value
                    }));
                });
            })
            .fail(function() {
                console.log("error");

            });
        resetSizeBoxes();
    }

    function runSAPSearch(qob) {
        $('#overlay').fadeIn();
        clearResults();
        $.getJSON("json_getSerachResults", qob, function(data) {
                //            runEquivalenceSearch();
                $('#overlay').fadeOut();
                page = data[0];
                $("#searchresults").html(page);
                var arucsoport = $("#arucsoport").val();
                var gyarto = $("#gyarto").val();
                var raktar = $("#raktarakSelect").val();
                var termekekNG = $("#termekekNGField").val();
                var innerSize = $("#innerSizeSelect").val();
                var outerSize = $("#outerSizeSelect").val();
                var widthSize = $("#widthSizeSelect").val();
                var arucsoport = $("#arucsoport").val();
                var sizes = data[1];
                $('#innerSizeSelect')
                    .empty()
                    .append('<option  id="innerSizeSelectAll" value="">- Mind -</option>')
                    .val('');
                $.each(sizes[0], function(index, value) {
                    $('#innerSizeSelect').append($('<option/>', {
                        value: value,
                        text: value
                    }));
                });
                $('#innerSizeSelect').val(innerSize);
                $('#outerSizeSelect')
                    .empty()
                    .append('<option  id="outerSizeSelectAll" value="">- Mind -</option>')
                    .val('');
                $.each(sizes[1], function(index, value) {
                    $('#outerSizeSelect').append($('<option/>', {
                        value: value,
                        text: value
                    }));
                });
                $('#outerSizeSelect').val(outerSize);
                $('#widthSizeSelect')
                    .empty()
                    .append('<option  id="widthSizeSelectAll" value="">- Mind -</option>')
                    .val('');
                $.each(sizes[2], function(index, value) {
                    $('#widthSizeSelect').append($('<option/>', {
                        value: value,
                        text: value
                    }));
                });
                $('#widthSizeSelect').val(widthSize);
                $('#gyarto')
                    .empty()
                    .append('<option value="">-- Összes --</option>')
                    .val('');
                $.each(sizes[3], function(index, value) {
                    $('#gyarto').append($('<option/>', {
                        value: value,
                        text: value
                    }));
                });
                $('#gyarto').val(gyarto);
                $('#raktarakSelect')
                    .empty()
                    .append('<option  id="raktarakSelectAll" value="">- Mind -</option>')
                    .val('');
                $.each(sizes[4], function(index, value) {
                    $('#raktarakSelect').append($('<option/>', {
                        value: value,
                        text: value
                    }));
                });
                $('#raktarakSelect').val(raktar);
                $('#arucsoport')
                    .empty()
                    .append('<option value="">-- Összes --</option>')
                    .val('');
                $.each(sizes[6], function(index, value) {
                    $('#arucsoport').append($('<option/>', {
                        value: value,
                        text: value
                    }));
                });
                $('#arucsoport').val(arucsoport);

                imagePreview();
                doRstPage();
                if ($("#interchanegebutton").length) {
                    $("#interchanegebutton").show();
                }

            })
            .fail(function() {
                $('#overlay').fadeOut();
                $("#searchresults").html("Hiba történt az adatok lekérdezése közben");
            });
        //        $("#searchresults").html('<div class="container spinner"><img src="/images/ball-bearing-cog-animation.gif" alt="Wait" /></div>');
    }

    function runEquivalenceSearch() {
        if ($("#interchanegebutton").length) {
            $("#interchanegebutton").hide();
        }
        var query = $("#termekekNGField").val();
        firstChar = query.charAt(0);
        if (!query || (query.length < 4 && (firstChar && firstChar <= '9' && firstChar >= '0'))) {
            $("#mediasResults").html("");
            $("#ntnResults").html("");
            if ($("#kugellagerSearchResults").length)
                $("#kugellagerSearchResults").html("");
            return;
        }
        if (document.lastNtnSearch != query || $('#ntnResults').is(':empty')) {
            $("#ntnResults").html("SNR helyettesít&#245;k betöltése ...");
            document.lastNtnSearch = query;
            $.get("/ich/ntnPageReader", {
                equivalence: query
            }, function(data) {
                if (data == "nohits") {
                    $("#ntnResults").html("Nincs találat az SNR helyettesítő keresésben");
                } else if (data == "original") {
                    $.get("getNtnHelyettesito", {
                            equivalence: query
                        }, function(data) {
                            $("#ntnResults").html(data);
                            imagePreview();
                        })
                        .fail(function() {
                            document.lastNtnSearch = '';
                            $("#ntnResults").html("Hiba történt az SNR adatok lekérdezése közben");
                        });
                } else {
                    $.get("getNtnHelyettesito2", {
                            pickleFileName: data
                        }, function(data) {
                            $("#ntnResults").html(data);
                            getDetailNtnData();
                            imagePreview();
                        })
                        .fail(function() {
                            document.lastNtnSearch = '';
                            $("#ntnResults").html("Hiba történt az SNR adatok lekérdezése közben");
                        });
                }
            }).fail(function() {
                document.lastNtnSearch = '';
                $("#ntnResults").html("Hiba történt az SNR adatok lekérdezése közben");
            });
        };
        if (document.lastMediasSearch != query || $('#mediasResults').is(':empty')) {
            document.lastMediasSearch = query;
            $("#mediasResults").html("INA helyettesít&#245;k betöltése ...");
            $.get("/ich/mediasPageReader", {
                searchString: query
            }, function(data) {
                if (data == "nohits") {
                    $("#mediasResults").html("Nincs találat az INA helyettesítő keresésben");
                } else if (data == "original") {
                    $.get("getMediasHelyettesito", {
                            searchString: query
                        }, function(data) {
                            $("#mediasResults").html(data);
                            imagePreview();
                        })
                        .fail(function() {
                            document.lastMediasSearch = '';
                            $("#mediasResults").html("Hiba történt az INA adatok lekérdezése közben");
                        });
                } else {
                    $.get("getMediasHelyettesito2", {
                            pickleFileName: data
                        }, function(data) {
                            $("#mediasResults").html(data);
                            getDetailMediasData();
                            imagePreview();
                        })
                        .fail(function() {
                            document.lastMediasSearch = '';
                            $("#mediasResults").html("Hiba történt az INA adatok lekérdezése közben");
                        });
                };
            }).fail(function() {
                document.lastNtnSearch = '';
                $("#mediasResults").html("Hiba történt az INA adatok lekérdezése közben");
            });
        };
        if ($("#kugellagerSearchResults").length && (document.lastKugellagerSearch != query || $('#kugellagerSearchResults').is(':empty'))) {
            document.lastKugellagerSearch = query;
            $("#kugellagerSearchResults").html("Találatok betöltése ...");
            $.get("/ich/kugellagerPageReader", {
                searchString: query
            }, function(data) {
                if (data == "nohits") {
                    $("#kugellagerSearchResults").html("Nincs találat a keresésben");
                } else {
                    $.get("getKugellagerHelyettesito", {
                            pickleFileName: data
                        }, function(data) {
                            $("#kugellagerSearchResults").html(data);
                            getDetailKugellagerData();
                            imagePreview();
                        })
                        .fail(function() {
                            document.lastKugellagerSearch = '';
                            $("#kugellagerSearchResults").html("Hiba történt az adatok lekérdezése közben");
                        });
                };
            }).fail(function() {
                document.lastKugellagerSearch = '';
                $("#kugellagerSearchResults").html("Hiba történt az adatok lekérdezése közben");
            });
        };

        if ($("#rollingSearchResults").length && (document.rollingSearch != query || $('#rollingSearchResults').is(':empty'))) {
            document.rollingSearch = query;
            $("#rollingSearchResults").html("Találatok betöltése ...");
            $.get("/ich/rollingPageReader", {
                searchString: query
            }, function(data) {
                if (data == "nohits") {
                    $("#rollingSearchResults").html("Nincs találat a keresésben");
                } else {
                    $.get("getRollingHelyettesito", {
                            pickleFileName: data
                        }, function(data) {
                            $("#rollingSearchResults").html(data);
                            imagePreview();
                        })
                        .fail(function() {
                            document.lastKugellagerSearch = '';
                            $("#rollingSearchResults").html("Hiba történt az adatok lekérdezése közben");
                        });
                };
            }).fail(function() {
                document.lastKugellagerSearch = '';
                $("#rollingSearchResults").html("Hiba történt az adatok lekérdezése közben");
            });
        };
    };



    function gotoPage(e, pagenr) {
        e = e || window.event;
        e.preventDefault();
        var qstr = getSearchDict();
        qstr['b_start:int'] = pagenr;
        runSAPSearch(qstr);
    }

    function sortData(e, sort_on, sort_order) {
        e = e || window.event;
        e.preventDefault();
        var qstr = getSearchDict();
        qstr['sort_on'] = sort_on;
        qstr['sort_order'] = sort_order;
        runSAPSearch(qstr);
    };

    function setDetailData(url, data) {
        var linkUrl = data.detailurl;
        var linkId = data.linkId;
        var linkTxt = $("#" + linkId).html();
        $("#mediasTable").find('a.mediasUrl').each(function(key, val) {
            if ($(this).html() == linkTxt) {
                $(this).removeClass("mediasUrl");
                $(this).attr('href', data['url']);
                if (data.pdfurl) {
                    var pdfLink = "<a href=\"" + data.pdfurl + "\"><img src=\"/images/pdficon.png\" alt=\"pdf\" /></a>";
                    $(this).after(pdfLink);
                }

                if (data.picurl) {
                    //            $('<img />')
                    //                        .attr('src', "" + data.picurl + "")
                    //                        .appendTo($(this).next());  
                    var picElement = " <a onclick=\"return false;\" class=\"preview\" href=\"" + data.picurl + "\"><img class=\"mediaspic\" src=\"" + data.picurl + "\" /></a> "
                    $(this).next().after(picElement);
                }
                if (data.meret) {
                    $(this).parent().prev().html(data.meret);
                }
            };
        });
        getDetailMediasData();
    }

    function setDetailNtnData(url, data) {
        var linkUrl = data.detailurl;
        var linkId = data.linkId;
        var linkTxt = $("#" + linkId).html();
        $("#ntnTable").find('a.ntnUrl').each(function(key, val) {
            if ($(this).html() == linkTxt) {
                $(this).removeClass("ntnUrl");
                var index;
                var picElements = "";
                for (index = 0; index < data.picurls.length; ++index) {
                    var picElement = " <a onclick=\"return false;\" class=\"preview\" href=\"" + data.picurls[index] + "\"><img class=\"mediaspic\" src=\"" + data.picurls[index] + "\" /></a> ";
                    picElements = picElements + picElement
                }
                if (picElements) {
                    $(this).next().after(picElements);
                }
                if (data.meret) {
                    $(this).parent().prev().html(data.meret);
                }
            };
        });
        getDetailNtnData();
    }

    function setDetailKugellagerData(url, data) {
        var linkUrl = data.detailurl;
        var linkId = data.linkId;
        var linkTxt = $("#" + linkId).html();
        $("#kugellagerTable").find('a.kugellagerUrl').each(function(key, val) {
            if ($(this).html() == linkTxt) {
                $(this).removeClass("kugellagerUrl");
                var mytd = $(this).parent().prev();
                var index;
                var picElements = "";
                for (index = 0; index < data.picurls.length; ++index) {
                    var picElement = " <a onclick=\"return false;\" class=\"preview\" href=\"" + data.picurls[index] + "\"><img class=\"mediaspic\" src=\"" + data.picurls[index] + "\" /></a> ";
                    picElements = picElements + picElement
                }
                if (picElements) {
                    mytd.html(picElements);
                    //                $(this).next().after(picElements);
                }
                if (data.meret) {
                    $(this).parent().next().html(data.meret);
                }
                if (data.price) {
                    $(this).parent().next().next().html(data.price);
                }
            };
        });
        getDetailKugellagerData();
    }

    function getDetailMediasData() {
        mediasTable = $("#mediasTable");
        mediasTable.find('a.mediasUrl').each(function(key, val) {
            var attr = $(this).attr('id');
            if (typeof attr !== typeof undefined && attr !== false) {
                return;
            }
            var linkId = uuidv4();
            $(this).attr('id', linkId);
            $.getJSON("/ich/getMediasDetailData", {
                detailurl: $(this).attr('href'),
                linkId: linkId
            }, function(data) {
                setDetailData(data.detailurl, data);
                imagePreview();
            }).fail(function() {
                console.log('fail');
                $(this).removeClass("kugellagerUrl");
                $(this).addClass("failedMediasUrl");
                getDetailMediasData();
            });
            return false;
        });
    }

    function getDetailNtnData() {
        ntnTable = $("#ntnTable");
        ntnTable.find('a.ntnUrl').each(function(key, val) {
            var attr = $(this).attr('id');
            if (typeof attr !== typeof undefined && attr !== false) {
                return;
            }
            var linkId = uuidv4();
            $(this).attr('id', linkId);
            $.getJSON("/ich/getNtnDetailData", {
                detailurl: $(this).attr('href'),
                linkId: linkId
            }, function(data) {
                setDetailNtnData(data.detailurl, data);
                imagePreview();
            }).fail(function() {
                console.log('fail');
                $(this).removeClass("ntnUrl");
                $(this).addClass("failedNtnUrl");
                getDetailNtnData();
            });
            return false;
        });
    }

    function getDetailKugellagerData() {
        ntnTable = $("#kugellagerTable");
        ntnTable.find('a.kugellagerUrl').each(function(key, val) {
            var attr = $(this).attr('id');
            if (typeof attr !== typeof undefined && attr !== false) {
                return;
            }
            var linkId = uuidv4();
            $(this).attr('id', linkId);
            $.getJSON("/ich/getKugellagerDetailData", {
                detailurl: $(this).attr('href'),
                linkId: linkId
            }, function(data) {
                setDetailKugellagerData(data.detailurl, data);
                imagePreview();
            }).fail(function() {
                console.log('fail');
                $(this).removeClass("kugellagerUrl");
                $(this).addClass("failedKugellagerUrl");
                getDetailKugellagerData();
            });
            return false;
        });
    }

    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }