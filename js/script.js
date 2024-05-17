var _a, _b;
document.addEventListener("DOMContentLoaded", function () {
    var loginForm = document.getElementById("login-form");
    var emailSignupForm = document.getElementById("email-signup-form");
    loginForm.style.display = "none";
    emailSignupForm.style.display = "none";
});
(_a = document.getElementById("show-login-form")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (event) {
    event.preventDefault();
    var loginForm = document.getElementById("login-form");
    var emailSignupForm = document.getElementById("email-signup-form");
    loginForm.style.display = "block";
    emailSignupForm.style.display = "none";
});
(_b = document.getElementById("emailbutton")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function (event) {
    event.preventDefault();
    var loginForm = document.getElementById("login-form");
    var emailSignupForm = document.getElementById("email-signup-form");
    loginForm.style.display = "none";
    emailSignupForm.style.display = "block";
});
