$(document).ready(async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const pnr = urlParams.get("pnr");
  const name = urlParams.get("name");
  const dt = urlParams.get("date");
  const source = urlParams.get("source");
  const destination = urlParams.get("destination");
  $("#psgr-pnr")[0].innerHTML = pnr;
  $("#psgr-name")[0].innerHTML = name;
  $("#psgr-dt")[0].innerHTML = dt;
  $("#psgr-src")[0].innerHTML = source;
  $("#psgr-dest")[0].innerHTML = destination;
  await refreshStatus();
});

async function refreshStatus() {
  document.querySelector("#psgr-event-tbl").innerHTML = "";
  let pnr = $("#psgr-pnr")[0].innerHTML;
  let backendURL = "http://0.0.0.0:5600";
  await $.getJSON("js/config.json", function (resp) {
    backendURL = resp.BACKEND_URL;
  });
  let resp = await fetch(`${backendURL}/api/unmr/status?pnr=${pnr}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let data = await resp.json();
  if (data.error) {
    alert(`Unexpected error in system: ${JSON.stringify(data.error)}`);
  } else {
    data.forEach(function (record) {
      document.querySelector("#psgr-event-tbl").innerHTML += `
          <tr>
          ${
            record.step_status == "failed"
              ? `<td class="negative">FAILED: ${record.event_name}</td>`
              : `<td>${record.event_name}</td>`
          }
            <td>${record.time}</td>
            <td>${record.staff_email}</td>
          </tr>
        `;
    });
  }
  let recentStepNumber = data[0].step_number;
  let recentStepStatus = data[0].step_status;
  if (recentStepNumber == 1 && recentStepStatus == "completed") {
    $("#sec-check-step").addClass("completed");
  } else if (recentStepNumber == 2) {
    $("#sec-check-step").addClass("completed");
    if (recentStepStatus == "completed") {
      $("#bag-sub-step").addClass("completed");
    }
  } else if (recentStepNumber == 3) {
    $("#sec-check-step").addClass("completed");
    $("#bag-sub-step").addClass("completed");
    if (recentStepStatus == "completed") {
      $("#flight-board-step").addClass("completed");
    }
  } else if (recentStepNumber == 4) {
    $("#sec-check-step").addClass("completed");
    $("#bag-sub-step").addClass("completed");
    $("#flight-board-step").addClass("completed");
    if (recentStepStatus == "completed") {
      $("#in-flight-step").addClass("completed");
    }
  } else if (recentStepNumber == 5) {
    $("#sec-check-step").addClass("completed");
    $("#bag-sub-step").addClass("completed");
    $("#flight-board-step").addClass("completed");
    $("#in-flight-step").addClass("completed");
    if (recentStepStatus == "completed") {
      $("#bag-coll-step").addClass("completed");
    }
  } else if (recentStepNumber == 6) {
    $("#sec-check-step").addClass("completed");
    $("#bag-sub-step").addClass("completed");
    $("#flight-board-step").addClass("completed");
    $("#in-flight-step").addClass("completed");
    $("#bag-coll-step").addClass("completed");
    if (recentStepStatus == "completed") {
      $("#handover-step").addClass("completed");
    }
  }
}

function downloadTable() {
  var data = document.getElementById("events-table");
  var excelFile = XLSX.utils.table_to_book(data, { sheet: "events" });
  XLSX.write(excelFile, { bookType: "xlsx", bookSST: true, type: "base64" });
  XLSX.writeFile(excelFile, `${$("#psgr-pnr")[0].innerHTML}-${$("#psgr-name")[0].innerHTML}.xlsx`);
}
