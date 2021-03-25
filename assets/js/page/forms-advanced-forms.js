// ÚJ MEZŐ HOZZÁADÁSA ÚJ AJÁNLAT ESETÉN // 

$(function()
{
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();

        var controlForm = $('.edit-controls form:first'),
            currentEntry = $(this).parents('.edit-entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.edit-entry:not(:last) .btn-add')
            .removeClass('btn-add ').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="icon-close"></span>');
    }).on('click', '.btn-remove', function(e)
    {
		$(this).parents('.edit-entry:first').remove();

		e.preventDefault();
		return false;
	});
});

$(function()
{
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();

        var controlForm = $('.edit-controls02 form:first'),
            currentEntry = $(this).parents('.edit-entry02:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.edit-entry02:not(:last) .btn-add')
            .removeClass('btn-add ').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="icon-close"></span>');
    }).on('click', '.btn-remove', function(e)
    {
		$(this).parents('.edit-entry02:first').remove();

		e.preventDefault();
		return false;
	});
});

$(function()
{
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();

        var controlForm = $('.edit-controls03 form:first'),
            currentEntry = $(this).parents('.edit-entry03:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.edit-entry03:not(:last) .btn-add')
            .removeClass('btn-add ').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="icon-close"></span>');
    }).on('click', '.btn-remove', function(e)
    {
		$(this).parents('.edit-entry03:first').remove();

		e.preventDefault();
		return false;
	});
});


// ÚJ MEZŐ HOZZÁADÁSA SZEREKSZTÉS ESETÉN // 

$(function()
{
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();

        var controlForm = $('.controls form:first'),
            currentEntry = $(this).parents('.entry:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add ').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="icon-close"></span>');
    }).on('click', '.btn-remove', function(e)
    {
		$(this).parents('.entry:first').remove();

		e.preventDefault();
		return false;
	});
});

$(function()
{
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();

        var controlForm = $('.controls02 form:first'),
            currentEntry = $(this).parents('.entry02:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry02:not(:last) .btn-add')
            .removeClass('btn-add ').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="icon-close"></span>');
    }).on('click', '.btn-remove', function(e)
    {
		$(this).parents('.entry02:first').remove();

		e.preventDefault();
		return false;
	});
});

$(function()
{
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();

        var controlForm = $('.controls03 form:first'),
            currentEntry = $(this).parents('.entry03:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.entry03:not(:last) .btn-add')
            .removeClass('btn-add ').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="icon-close"></span>');
    }).on('click', '.btn-remove', function(e)
    {
		$(this).parents('.entry03:first').remove();

		e.preventDefault();
		return false;
	});
});


// TARTALOM KIKAPCSOLÁS ÉS BEKAPCSOLÁSA ÚJ AJÁNLAT ESETÉN // 

$(function() {
  $("#toggleArucsoport").click(function() {
    if ($(this).is(":checked")) {
      $("#menuArucsoport").show();
      $("#menuArucsoportKikapcs").hide();
    } else {
      $("#menuArucsoport").hide();
      $("#menuArucsoportKikapcs").show();
    }
  });
})

$(function() {
  $("#toggleBannerKep").click(function() {
    if ($(this).is(":checked")) {
      $("#menuBannerKep").show();
      $("#menuBannerSzoveg").show();
      $("#menuBannerKepKikapcs").hide();
    } else {
      $("#menuBannerKep").hide();
      $("#menuBannerSzoveg").hide();
      $("#menuBannerKepKikapcs").show();
    }
  });
})

$(function() {
  $("#toggleTermekLeirasCim").click(function() {
    if ($(this).is(":checked")) {
      $("#menuTermekLeirasCim").show();
      $("#menuTermekLeirasCimKikapcs").hide();
    } else {
      $("#menuTermekLeirasCim").hide();
      $("#menuTermekLeirasCimKikapcs").show();
    }
  });
})

$(function() {
  $("#toggleTermekLeiras").click(function() {
    if ($(this).is(":checked")) {
      $("#menuTermekLeiras").show();
      $("#menuTermekLeirasKikapcs").hide();
    } else {
      $("#menuTermekLeiras").hide();
      $("#menuTermekLeirasKikapcs").show();
    }
  });
})

$(function() {
  $("#toggleTermekfotoKivalasztas").click(function() {
    if ($(this).is(":checked")) {
      $("#menuTermekfotoKivalasztas").show();
      $("#menuTermekfotoKivalasztasKikapcs").hide();
    } else {
      $("#menuTermekfotoKivalasztas").hide();
      $("#menuTermekfotoKivalasztasKikapcs").show();
    }
  });
})

$(function() {
  $("#toggleFelhasznalasiTerulet").click(function() {
    if ($(this).is(":checked")) {
      $("#menuFelhasznalasiTerulet").show();
      $("#menuFelhasznalasiTeruletKepek").show();
      $("#menuFelhasznalasiTeruletKikapcs").hide();
    } else {
      $("#menuFelhasznalasiTerulet").hide();
      $("#menuFelhasznalasiTeruletKepek").hide();
      $("#menuFelhasznalasiTeruletKikapcs").show();
    }
  });
})

$(function() {
  $("#toggleJelolesek").click(function() {
    if ($(this).is(":checked")) {
      $("#menuJelolesek").show();
      $("#menuJelolesekKikapcs").hide();
    } else {
      $("#menuJelolesek").hide();
      $("#menuJelolesekKikapcs").show();
    }
  });
})

$(function() {
  $("#toggleAkciosAjanlat").click(function() {
    if ($(this).is(":checked")) {
      $("#menuAkciosAjanlat").show();
      $("#menuAkciosAjanlatKikapcs").hide();
    } else {
      $("#menuAkciosAjanlat").hide();
      $("#menuAkciosAjanlatKikapcs").show();
    }
  });
})

$(function() {
  $("#toggleUtojelek").click(function() {
    if ($(this).is(":checked")) {
      $("#menuUtojelek").show();
      $("#menuUtojelekKikapcs").hide();
    } else {
      $("#menuUtojelek").hide();
      $("#menuUtojelekKikapcs").show();
    }
  });
})


// TARTALOM KIKAPCSOLÁS ÉS BEKAPCSOLÁSA SZERKESZTÉS ESETÉN // 

$(function() {
  $("#toggleArucsoportEdit").click(function() {
    if ($(this).is(":checked")) {
      $("#menuArucsoportEdit").show();
      $("#menuArucsoportEditKikapcs").hide();
    } else {
      $("#menuArucsoportEdit").hide();
      $("#menuArucsoportEditKikapcs").show();
    }
  });
})

$(function() {
  $("#toggleBannerKepEdit").click(function() {
    if ($(this).is(":checked")) {
      $("#menuBannerKepEdit").show();
      $("#menuBannerSzovegEdit").show();
      $("#menuBannerKepEditKikapcs").hide();
    } else {
      $("#menuBannerKepEdit").hide();
      $("#menuBannerSzovegEdit").hide();
      $("#menuBannerKepEditKikapcs").show();
    }
  });
})

$(function() {
  $("#toggleTermekLeirasCimEdit").click(function() {
    if ($(this).is(":checked")) {
      $("#menuTermekLeirasCimEdit").show();
      $("#menuTermekLeirasCimEditKikapcs").hide();
    } else {
      $("#menuTermekLeirasCimEdit").hide();
      $("#menuTermekLeirasCimEditKikapcs").show();
    }
  });
})

$(function() {
  $("#toggleTermekLeirasEdit").click(function() {
    if ($(this).is(":checked")) {
      $("#menuTermekLeirasEdit").show();
      $("#menuTermekLeirasEditKikapcs").hide();
    } else {
      $("#menuTermekLeirasEdit").hide();
      $("#menuTermekLeirasEditKikapcs").show();
    }
  });
})

$(function() {
  $("#toggleTermekfotoKivalasztasEdit").click(function() {
    if ($(this).is(":checked")) {
      $("#menuTermekfotoKivalasztasEdit").show();
      $("#menuTermekfotoKivalasztasEditKikapcs").hide();
    } else {
      $("#menuTermekfotoKivalasztasEdit").hide();
      $("#menuTermekfotoKivalasztasEditKikapcs").show();
    }
  });
})

$(function() {
  $("#toggleFelhasznalasiTeruletEdit").click(function() {
    if ($(this).is(":checked")) {
      $("#menuFelhasznalasiTeruletEdit").show();
      $("#menuFelhasznalasiTeruletKepekEdit").show();
      $("#menuFelhasznalasiTeruletEditKikapcs").hide();
    } else {
      $("#menuFelhasznalasiTeruletEdit").hide();
      $("#menuFelhasznalasiTeruletKepekEdit").hide();
      $("#menuFelhasznalasiTeruletEditKikapcs").show();
    }
  });
})

$(function() {
  $("#toggleJelolesekEdit").click(function() {
    if ($(this).is(":checked")) {
      $("#menuJelolesekEdit").show();
      $("#menuJelolesekEditKikapcs").hide();
    } else {
      $("#menuJelolesekEdit").hide();
      $("#menuJelolesekEditKikapcs").show();
    }
  });
})

$(function() {
  $("#toggleAkciosAjanlatEdit").click(function() {
    if ($(this).is(":checked")) {
      $("#menuAkciosAjanlatEdit").show();
      $("#menuAkciosAjanlatEditKikapcs").hide();
    } else {
      $("#menuAkciosAjanlatEdit").hide();
      $("#menuAkciosAjanlatEditKikapcs").show();
    }
  });
})

$(function() {
  $("#toggleUtojelekEdit").click(function() {
    if ($(this).is(":checked")) {
      $("#menuUtojelekEdit").show();
      $("#menuUtojelekEditKikapcs").hide();
    } else {
      $("#menuUtojelekEdit").hide();
      $("#menuUtojelekEditKikapcs").show();
    }
  });
})



"use strict";

var cleavePN = new Cleave('.phone-number', {
  phone: true,
  phoneRegionCode: 'us'
});
var cleaveC = new Cleave('.currency', {
  numeral: true,
  numeralThousandsGroupStyle: 'thousand'
});
var cleavePC = new Cleave('.purchase-code', {
  delimiter: '-',
  blocks: [4, 4, 4, 4],
  uppercase: true
});
var cleaveI = new Cleave('.invoice-input', {
  prefix: 'INV',
  delimiter: '-',
  blocks: [10],
  uppercase: true
});
var cleaveD = new Cleave('.datemask', {
  date: true,
  datePattern: ['Y', 'm', 'd']
});
var cc_last_type;
var cleaveCC = new Cleave('.creditcard', {
  creditCard: true,
  onCreditCardTypeChanged: function(type) {
    if(type !== 'unknown') {
      if(type == 'amex') {
        type = 'americanexpress';
      }else if(type == 'mastercard') {
        type = 'mastercard';
      }else if(type == 'visa') {
        type = 'visa';
      }else if(type == 'diners') {
        type = 'dinersclub';
      }else if(type == 'discover') {
        type = 'discover';
      }else if(type == 'jcb') {
        type = 'jcb';
      }
      $(".creditcard").removeClass(cc_last_type);
      $(".creditcard").addClass(type);
      cc_last_type = type;                        
    }
  }
});

$(".pwstrength").pwstrength();

$('.daterange-cus').daterangepicker({
  locale: {format: 'YYYY-MM-DD'},
  drops: 'down',
  opens: 'right'
});
$('.daterange-btn').daterangepicker({
  ranges: {
    'Today'       : [moment(), moment()],
    'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month'  : [moment().startOf('month'), moment().endOf('month')],
    'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  },
  startDate: moment().subtract(29, 'days'),
  endDate  : moment()
}, function (start, end) {
  $('.daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'))
});

$(".colorpickerinput").colorpicker({
  format: 'hex',
  component: '.input-group-append',
});
$(".inputtags").tagsinput('items');



