$(document).ready(async function () {
  $(".ui.selection.dropdown").dropdown({
    clearable: true,
    forceSelection: false,
  });
  var eventsList = document.querySelectorAll(".events-list");
  eventsList.forEach(function (eventsList) {
    $.getJSON("data/events.json", function (resp) {
      resp.events.forEach(function (event) {
        eventsList.innerHTML +=
          `<div class="item" data-value="` +
          event.step +
          ":" +
          event.step_status +
          ":" +
          event.name +
          `">${event.step + ": " + event.name}</div>`;
      });
    });
  });
});

async function feed() {
  let pnr = $("input[name=psgr-pnr]").val();
  let evtName = $("input[name=evt-name]").val();
  let failureCheck = $("input[name=failure-check]:checked").val();
  let status = evtName.split(":")[1].trim();
  if (failureCheck == "on") {
    status = "failed";
  }
  let feedBody = {
    unmr_pnr: pnr,
    event_name: evtName.split(":")[2].trim(),
    step_number: evtName.split(":")[0].trim(),
    step_status: status,
  };
  let backendURL = "http://0.0.0.0:5600";
  await $.getJSON("js/config.json", function (resp) {
    backendURL = resp.BACKEND_URL;
  });
  let resp = await fetch(`${backendURL}/api/admin/feed`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: window.localStorage.getItem("flysolo-user-token"),
    },
    body: JSON.stringify(feedBody),
  });
  let data = await resp.json();
  if (data.error) {
    $(".ui .message .content .header")[0].innerHTML = "Error!";
    $(".ui .message p")[0].innerHTML = `${data.error}`;
    $(".ui .message")[0].classList.add("negative");
    $(".ui .message")[0].classList.remove("positive");
    $(".ui .message i")[0].classList = ["exclamation triangle icon"];
    $(".ui .message").css("display", "flex");
  } else {
    $(".ui .message .content .header")[0].innerHTML = "Success!";
    $(".ui .message p")[0].innerHTML = `Status has been fed successfully`;
    $(".ui .message")[0].classList.remove("negative");
    $(".ui .message")[0].classList.add("positive");
    $(".ui .message i")[0].classList = ["check icon"];
    $(".ui .message").css("display", "flex");
    $(".ui .form")[0].reset();
  }
}
