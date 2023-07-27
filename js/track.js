$(document).ready(function () {

  $(".ui.selection.dropdown").dropdown({
    clearable: true,
    forceSelection: false,
  });

  var airportsLists = document.querySelectorAll(".airports-list");
  airportsLists.forEach(function (airportList) {
    $.getJSON("data/indian-airports.json", function (resp) {
      resp.airports.forEach(function (airport) {
        airportList.innerHTML +=
          `<div class="item" data-value="` +
          airport.IATA_code +
          `"><i class="in flag"></i>` +
          airport.airport_name +
          `</div>`;
      });
    });
  });

  $("input[name=search-criteria-sel]").on("change", function (e) {
    if (e.target.value == "opt1") {
      $("#source-name-div").addClass("disabled");
      $("#dest-name-div").addClass("disabled");
      $("input[name=source-name]").prop("disabled", true);
      $("input[name=dest-name]").prop("disabled", true);
      $("input[name=recvr-mobile-nmbr]").prop("disabled", true);

      $("input[name=psgr-pnr]").prop("disabled", false);
      $("input[name=psgr-first-name]").prop("disabled", false);
      $("input[name=psgr-last-name]").prop("disabled", false);
      $("input[name=travel-dt]").prop("disabled", false);
    }
    if (e.target.value == "opt2") {
      $("input[name=psgr-pnr]").prop("disabled", true);
      $("input[name=psgr-first-name]").prop("disabled", true);
      $("input[name=psgr-last-name]").prop("disabled", true);
      $("input[name=recvr-mobile-nmbr]").prop("disabled", true);

      $("#source-name-div").removeClass("disabled");
      $("#dest-name-div").removeClass("disabled");
      $("input[name=source-name]").prop("disabled", false);
      $("input[name=dest-name]").prop("disabled", false);
      $("input[name=travel-dt]").prop("disabled", false);
    }
    if (e.target.value == "opt3") {
      $("#source-name-div").addClass("disabled");
      $("#dest-name-div").addClass("disabled");
      $("input[name=source-name]").prop("disabled", true);
      $("input[name=dest-name]").prop("disabled", true);
      $("input[name=psgr-pnr]").prop("disabled", true);
      $("input[name=psgr-first-name]").prop("disabled", true);
      $("input[name=psgr-last-name]").prop("disabled", true);

      $("input[name=travel-dt]").prop("disabled", false);
      $("input[name=recvr-mobile-nmbr]").prop("disabled", false);
    }
  });

  $("#def-radio").click();

});

function search() {
    let searchOpt = $("input[name=search-criteria-sel]:checked").val();
    if (searchOpt == "opt1"){
        let pnr = $("input[name=psgr-pnr]").val();
        let name = $("input[name=psgr-first-name]").val()+" "+$("input[name=psgr-last-name]").val();
        let dt = $("input[name=travel-dt]").val();
        if (pnr=="" || name == "" || dt == "") {
            alert('invalid');
        }
        console.log({pnr, name, dt});
    } else if(searchOpt == "opt2"){
        let src = $("input[name=source-name]").val();
        let dest = $("input[name=dest-name]").val();
        let dt = $("input[name=travel-dt]").val();
        if (src=="" || dest == "" || dt == "") {
            alert('invalid');
        }
        console.log({src, dest, dt});
    } else if (searchOpt=="opt3"){
        let receiverMobileNumber = $("input[name=recvr-mobile-nmbr]").val();
        let dt = $("input[name=travel-dt]").val();
        if (receiverMobileNumber=="" || dt == "") {
            alert('invalid');
        }
        console.log({receiverMobileNumber, dt});
    }
    $(".ui.form")[0].reset();
}
