$(document).ready(function () {
  let loggedInUserEmail = window.localStorage.getItem("flysolo-user-email");
  if (
    loggedInUserEmail !== "" &&
    loggedInUserEmail !== undefined &&
    loggedInUserEmail !== null
  ) {
    let inputFields = document.querySelectorAll("form *");
    inputFields.forEach(function (inputField) {
      inputField.classList.add("disabled");
    });

    document.querySelector("div.ui.text.container").innerHTML += `
      <div class="ui basic modal">
        <div class="ui icon header">
          <i class="logout icon"></i>
          Would you like to logout?
        </div>
        <div class="actions">
          <div class="ui red basic cancel inverted button">
            <i class="remove icon"></i>
            No
          </div>
          <div class="ui green ok inverted button">
            <i class="checkmark icon"></i>
            Yes
          </div>
        </div>
      </div>`;

    $(".modal")
      .modal({
        closable: false,
        onDeny: function () {
          window.location.href = "index.html";
        },
        onApprove: function () {
          logout();
          window.location.reload();
        },
      })
      .modal("show");
  } else {
    let inputFields = document.querySelectorAll("form *");
    inputFields.forEach(function (inputField) {
      inputField.classList.remove("disabled");
    });

    document.querySelectorAll(".modal").forEach(function (elem) {
      elem.remove();
    });
  }
});

async function login() {
  var email = $("input[name=email]").val();
  var password = $("input[name=password]").val();

  if (email == "" || password == "") {
    $(".ui .message .content .header")[0].innerHTML = "Error!";
    $(".ui .message p")[0].innerHTML = "Email or Password is empty";
    $(".ui .message")[0].classList.add("negative");
    $(".ui .message i")[0].classList = ["exclamation triangle icon"];
    $(".ui .message").css("display", "flex");
    return;
  } else {
    $(".ui .message .content .header")[0].innerHTML = "Wait!";
    $(".ui .message p")[0].innerHTML = "We're fetching your details";
    $(".ui .message")[0].classList.remove("negative");
    $(".ui .message i")[0].classList = ["notched circle loading icon"];
    $(".ui .message").css("display", "flex");
  }

  let backendURL="http://0.0.0.0:5600";
  await $.getJSON("js/config.json", function(resp){
    backendURL = resp.BACKEND_URL;
  });
  let resp = await fetch(`${backendURL}/api/auth/login`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  let data = await resp.json();

  if (data.error) {
    $(".ui .message .content .header")[0].innerHTML = "Invalid Credentials!";
    $(".ui .message p")[0].innerHTML = "Email or Password is invalid";
    $(".ui .message")[0].classList.add("negative");
    $(".ui .message")[0].classList.remove("positive");
    $(".ui .message i")[0].classList = ["exclamation triangle icon"];
    $(".ui .message").css("display", "flex");
  } else {
    $(".ui .message .content .header")[0].innerHTML = "Success!";
    $(
      ".ui .message p"
    )[0].innerHTML = `${data.email} has been successfully logged in, redirecting to main page`;
    $(".ui .message")[0].classList.remove("negative");
    $(".ui .message")[0].classList.remove("positive");
    $(".ui .message i")[0].classList = ["notched circle loading icon"];
    $(".ui .message").css("display", "flex");

    let rememberMe = $("input[name=remember-me]:checked").val();
    if (rememberMe == "on") {
      window.localStorage.setItem("flysolo-user-email", data.email);
      window.localStorage.setItem("flysolo-user-token", data.token);
    } else {
      window.sessionStorage.setItem("flysolo-user-email", data.email);
      window.sessionStorage.setItem("flysolo-user-token", data.token);
    }

    setTimeout((window.location.href = "index.html"), 500);
  }
}
