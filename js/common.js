// window.addEventListener("resize", function () {
//   window.location.reload();
// });

$(document).ready(function () {
  let localStorageLoggedEmail =
    window.localStorage.getItem("flysolo-user-email");
  let sessionStorageLoggedEmail =
    window.sessionStorage.getItem("flysolo-user-email");
  let loggedInUserEmail = localStorageLoggedEmail
    ? localStorageLoggedEmail
    : sessionStorageLoggedEmail;
  if (loggedInUserEmail == null) {
    let elements = document.querySelectorAll("#user-card *");
    elements.forEach(function (elem) {
      elem.style.display = "none";
    });
    let staffLoginBtn = document.querySelector("#staff-login-btn");
    if (staffLoginBtn != undefined) {
      staffLoginBtn.classList.remove("disabled");
    }
  } else if (loggedInUserEmail !== "" && loggedInUserEmail !== undefined) {
    let staffLoginBtn = document.querySelector("#staff-login-btn");
    if (staffLoginBtn != undefined) {
      staffLoginBtn.classList.add("disabled");
      staffLoginBtn.setAttribute("href", "#");
    }
    document.querySelector("#logged-user-email").innerHTML = loggedInUserEmail;
    let elements = document.querySelectorAll("#user-card *");
    elements.forEach(function (elem) {
      elem.style.display = "flex";
    });
  }

  if ($(window).width() <= 767) {
    var menuOpts = document.querySelectorAll(".option");
    for (item of menuOpts) {
      item.style.display = "none";
    }
    var menuToggleBtn = document.querySelector("#menu-toggle-button");
    menuToggleBtn.style.display = "block";
    menuToggleBtn.style.cursor = "pointer";
  } else {
    var menuOpts = document.querySelectorAll(".option");
    for (item of menuOpts) {
      item.style.display = "flex";
    }
    var menuToggleBtn = document.querySelector("#menu-toggle-button");
    menuToggleBtn.style.display = "none";
  }
});

function toggleMenu() {
  var menu = document.querySelectorAll(".option");
  for (item of menu) {
    item.style.display = item.style.display === "flex" ? "none" : "flex";
  }
}

function logout() {
  window.localStorage.removeItem("flysolo-user-email");
  window.localStorage.removeItem("flysolo-user-token");
  window.sessionStorage.removeItem("flysolo-user-email");
  window.sessionStorage.removeItem("flysolo-user-token");
  window.location.reload();
}
