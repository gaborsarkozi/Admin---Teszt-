
var doc = new jsPDF();

function saveDiv(divId, title) {
  doc.fromHTML(`<html><head><title>${title}</title></head><body>` + document.getElementById(divId).innerHTML + `</body></html>`);
  doc.save('div.pdf');
}



function printDiv(divId, title) {

  let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

  



  mywindow.document.write(`<html><head><title>${title}</title>`);
  mywindow.document.write('</head><body >');
  mywindow.document.write(document.getElementById(divId).innerHTML);
  mywindow.document.write('</body></html>');


  mywindow.document.write('<div class=\"logo\">\n');
  mywindow.document.write('    <img src=\"../image/logo.png\" alt=\"\">\n');
  mywindow.document.write('</div>\n');
  mywindow.document.write('\n');
  mywindow.document.write('\n');
  mywindow.document.write('<div class=\"footer\">\n');
  mywindow.document.write('    <p>Tel.:+36 1 203 5000</p>\n');
  mywindow.document.write('    <p>Fax: +36 1 203 5100</p>\n');
  mywindow.document.write('    <p>E-mail: ugyfelszolgalat@bearing.hu</p>\n');
  mywindow.document.write('    <p>1033 Budapest, Szőlőkert u. 5.</p>\n');
  mywindow.document.write('    <div>\n');
  mywindow.document.write('        <p>\n');
  mywindow.document.write('            © 1993-2021 Bearing Express. A weboldalon található anyagok kizárólag a BearingKft. hozzájárulásával és a\n');
  mywindow.document.write('            forrás megjelölésével használhatóak fel.\n');
  mywindow.document.write('        </p>\n');
  mywindow.document.write('    </div>\n');
  mywindow.document.write('</div>\n');
  mywindow.document.write('\n');
  mywindow.document.write('<style>\n');
  mywindow.document.write('\n');
  mywindow.document.write('\n');
  mywindow.document.write('.logo {\n');
  mywindow.document.write('    position: fixed;\n');
  mywindow.document.write('    top: 1rem;\n');
  mywindow.document.write('    left: 1rem;\n');
  mywindow.document.write('}\n');
  mywindow.document.write('    .footer {\n');
  mywindow.document.write('        position: fixed;\n');
  mywindow.document.write('        left: 0;\n');
  mywindow.document.write('        bottom: 0;\n');
  mywindow.document.write('        width: 100%;\n');
  mywindow.document.write('        border-top: 1px solid #39245a;\n');
  mywindow.document.write('        color: #39245a;\n');
  mywindow.document.write('        text-align: center;\n');
  mywindow.document.write('    }\n');
  mywindow.document.write('\n');
  mywindow.document.write('    .footer p {\n');
  mywindow.document.write('        display: inline-flex;\n');
  mywindow.document.write('        margin: 1rem 2rem;\n');
  mywindow.document.write('    }\n');
  mywindow.document.write('</style>');








  mywindow.document.close(); // necessary for IE >= 10
  mywindow.focus(); // necessary for IE >= 10*/

  mywindow.print();
  mywindow.close();

  return true;
}

