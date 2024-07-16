//const http = require("http");
const logInForm = document.querySelector(".login-form");
const getDataButton = document.querySelector("#getData");
const email = document.getElementById("login-email").value;
const password = document.getElementById("login-password").value;
const login = { email, password };
getDataButton.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  const login = { email, password };

  axios
    .post("http://localhost:4000/user/login", {
      email: email,
      password: password,
    })
    .then(function (response) {
      localStorage.setItem("Token", response.data.token);
      localStorage.setItem("currentUserName", response.data.user.name);
      localStorage.setItem("currentUserId", response.data.user._id);

      console.log(response.data.token);
      console.log(response);
      console.log(this);
      //window.location.href = "groupPosts.html";
      window.location.href = "./../html/home.html";
    })

    .catch(function (error) {
      alert(error.response.data.message);
      console.log(error.response.data.message);
    });
});
