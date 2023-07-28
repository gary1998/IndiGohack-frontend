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

async function search() {
  let pnr = $("input[name=psgr-pnr]").val();
  let name =
    $("input[name=psgr-first-name]").val() +
    " " +
    $("input[name=psgr-last-name]").val();
  let dt = $("input[name=travel-dt]").val();
  let src = $("input[name=source-name]").val();
  let dest = $("input[name=dest-name]").val();
  let receiverMobileNumber = $("input[name=recvr-mobile-nmbr]").val();
  let searchQuery = {
    pnr,
    name,
    date: dt,
    source: src,
    destination: dest,
    receiver_phone: receiverMobileNumber,
  };
  searchQuery["name"] = searchQuery["name"].trim();
  Object.keys(searchQuery).forEach(
    (key) =>
      (searchQuery[key] === undefined ||
        searchQuery[key] == null ||
        searchQuery[key] == "") &&
      delete searchQuery[key]
  );
  if (Object.keys(searchQuery).length == 0) {
    $(".ui .message .content .header")[0].innerHTML = "Error!";
    $(".ui .message p")[0].innerHTML = `Error: Invalid parameters provided`;
    $(".ui .message")[0].classList.add("negative");
    $(".ui .message i")[0].classList = ["exclamation triangle icon"];
    $(".ui .message").css("display", "flex");
    return false;
  }
  let backendURL = "http://0.0.0.0:5600";
  await $.getJSON("js/config.json", function (resp) {
    backendURL = resp.BACKEND_URL;
  });
  let resp = await fetch(`${backendURL}/api/unmr/search`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(searchQuery),
  });
  let data = await resp.json();
  if (data.error) {
    $(".ui .message .content .header")[0].innerHTML = "Error!";
    $(".ui .message p")[0].innerHTML = `Error: ${data.error}`;
    $(".ui .message")[0].classList.add("negative");
    $(".ui .message i")[0].classList = ["exclamation triangle icon"];
    $(".ui .message").css("display", "flex");
  } else {
    if (data.length == 0) {
      $(".ui .message .content .header")[0].innerHTML = "No Record!";
      $(".ui .message p")[0].innerHTML = `Try again`;
      $(".ui .message")[0].classList.remove("negative");
      $(".ui .message")[0].classList.remove("positive");
      $(".ui .message i")[0].classList = ["exclamation icon"];
      $(".ui .message").css("display", "flex");
      document.querySelectorAll(".modal").forEach(function (elem) {
        elem.remove();
      });
      document.querySelector("div.ui.text.container").innerHTML += `
      <div class="ui basic modal">
        <div class="ui icon header">
          <i class="book icon"></i>
          No records found
        </div>
      </div>`;
    } else {
      $(".ui .message .content .header")[0].innerHTML = "Success!";
      $(".ui .message p")[0].innerHTML = `Records found`;
      $(".ui .message")[0].classList.remove("negative");
      $(".ui .message")[0].classList.add("positive");
      $(".ui .message i")[0].classList = ["check icon"];
      $(".ui .message").css("display", "flex");
      document.querySelectorAll(".modal").forEach(function (elem) {
        elem.remove();
      });
      document.querySelector("div.ui.text.container").innerHTML += `
      <div class="ui basic modal">
        <div class="ui icon header">
          <i class="book icon"></i>
          Found following records:
        </div>
        <div class="scrolling content">
        <table class="ui celled table">
        <thead>
          <tr>
            <th>PNR</th>
            <th>Name</th>
            <th>Date</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Receiver Name</th>
            <th>Receiver Phone</th>
          </tr>
        </thead>
        <tbody id="unmr-table">
        </tbody>
      </table>
        </div>
      </div>`;
      data.forEach((record) => {
        document.querySelector("#unmr-table").innerHTML += `
          <tr>
            <td><a href="status.html?pnr=${record.pnr}&name=${record.name}&date=${record.date}&source=${record.source}&destination=${record.destination}">${record.pnr}</a></td>
            <td>${record.name}</td>
            <td>${record.date}</td>
            <td>${record.source}</td>
            <td>${record.destination}</td>
            <td>${record.receiver_name}</td>
            <td>${record.receiver_phone}</td>
          </tr>
        `;
      });
    }
    $(".modal")
      .modal({
        closable: true,
      })
      .modal("show");
  }
}
