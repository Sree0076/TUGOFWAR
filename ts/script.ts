document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form") as HTMLElement;
    const emailSignupForm = document.getElementById("email-signup-form") as HTMLElement;
    
    loginForm.style.display = "none";
    emailSignupForm.style.display = "none";
  });
  
  document.getElementById("show-login-form")?.addEventListener("click", (event) => {
    event.preventDefault();
    const loginForm = document.getElementById("login-form") as HTMLElement;
    const emailSignupForm = document.getElementById("email-signup-form") as HTMLElement;
    
    loginForm.style.display = "block";
    emailSignupForm.style.display = "none";
  });
  
  document.getElementById("emailbutton")?.addEventListener("click", (event) => {
    event.preventDefault();
    const loginForm = document.getElementById("login-form") as HTMLElement;
    const emailSignupForm = document.getElementById("email-signup-form") as HTMLElement;
    
    loginForm.style.display = "none";
    emailSignupForm.style.display = "block";
  });
  