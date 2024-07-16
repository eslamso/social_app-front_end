document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.querySelector(".login-link");
  const signupLink = document.querySelector(".signup-link");
  const loginForm = document.querySelector(".login-form");
  const signupForm = document.querySelector(".signup-form");
  const hypersignUp = document.querySelector("#sign-up-link");
  const hyperlogin = document.querySelector("#log-in-link");
  //window.history.back();

  signupLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  });
  hypersignUp.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  });
  hyperlogin.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  });
  loginLink.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  });
});
