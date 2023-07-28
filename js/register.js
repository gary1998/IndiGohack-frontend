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
});

async function register() {
  var unmrPNR = $("input[name=unmr-pnr]").val();
  var unmrName =
    $("input[name=unmr-first-name]").val() +
    " " +
    $("input[name=unmr-last-name]").val();
  var dt = $("input[name=travel-dt]").val();
  var sourceName = $("input[name=source-name]").val();
  var destName = $("input[name=dest-name]").val();
  var recvrName = $("input[name=recvr-name]").val();
  var recvrMobile = $("input[name=recvr-mobile-nmbr]").val();
  var parentEmail = $("input[name=parent-email]").val();
  if (
    unmrPNR == "" ||
    unmrName == "" ||
    dt == "" ||
    sourceName == "" ||
    destName == "" ||
    recvrName == "" ||
    recvrMobile == "" ||
    parentEmail == ""
  ) {
    $(".ui .message .content .header")[0].innerHTML = "Error!";
    $(".ui .message p")[0].innerHTML = "All above details are necessary";
    $(".ui .message")[0].classList.add("negative");
    $(".ui .message")[0].classList.remove("positive");
    $(".ui .message i")[0].classList = ["exclamation triangle icon"];
    $(".ui .message").css("display", "flex");
    return;
  } else {
    $(".ui .message .content .header")[0].innerHTML = "Wait!";
    $(".ui .message p")[0].innerHTML = "We're feeding details to the database";
    $(".ui .message")[0].classList.remove("negative");
    $(".ui .message")[0].classList.remove("positive");
    $(".ui .message i")[0].classList = ["notched circle loading icon"];
    $(".ui .message").css("display", "flex");
  }

  let backendURL = "http://0.0.0.0:5600";
  await $.getJSON("js/config.json", function (resp) {
    backendURL = resp.BACKEND_URL;
  });
  let resp = await fetch(`${backendURL}/api/unmr/register`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pnr: unmrPNR,
      name: unmrName,
      date: dt,
      source: sourceName,
      destination: destName,
      receiver_name: recvrName,
      receiver_phone: recvrMobile,
      parent_email: parentEmail
    }),
  });

  let data = await resp.json();
  if (data.error) {
    $(".ui .message .content .header")[0].innerHTML = "Error!";
    $(".ui .message p")[0].innerHTML = data.error;
    $(".ui .message")[0].classList.remove("positive");
    $(".ui .message")[0].classList.add("negative");
    $(".ui .message i")[0].classList = ["exclamation triangle icon"];
    $(".ui .message").css("display", "flex");
    return;
  } else {
    $(".ui .message .content .header")[0].innerHTML = "Success!";
    $(".ui .message p")[0].innerHTML = `${data.name} successfully registered`;
    $(".ui .message")[0].classList.remove("negative");
    $(".ui .message")[0].classList.add("positive");
    $(".ui .message i")[0].classList = ["check icon"];
    $(".ui .message").css("display", "flex");
  }

  $(".ui.form")[0].reset();
}
