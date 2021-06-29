function changeTableView() {
    var element = document.getElementById("iconTableViewFull");
    element.classList.toggle("d-none");
    var element = document.getElementById("iconTableViewScroll");
    element.classList.toggle("d-none");
    $(".table-view-hide").toggleClass("hide-tablet");
    $("#termekTabla").toggleClass("overflow-auto");
  }


  