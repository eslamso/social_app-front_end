const signupForm = document.querySelector(".signup-form");
const signupB = document.querySelector("#sign-up");
signupB.addEventListener("click", (e) => {
  e.preventDefault();
  const name = signupForm.querySelector("#name").value;
  const email = signupForm.querySelector("#email").value;
  const password = signupForm.querySelector("#password").value;
  const passwordConfirm = signupForm.querySelector("#confirm-password").value;

  if (password !== passwordConfirm) {
    alert("Passwords do not match");
    return;
  }

  // signupB.disabled = true;
  // signupB.textContent = "Signing up...";
  //let host = "https://chat-events-group.onrender.com/";
  let host = "http://localhost:4000";

  const data = { name, email, password, passwordConfirm };
  console.log(data);
  axios
    .post(`${host}/user/signup`, data)
    .then(function (response) {
      console.log(response);
      localStorage.setItem("Token", response.data.token);
      window.location.href = "./../html/home.html";
    })
    .catch(function (error) {
      alert(error.response.data.message);
      console.log(error.response.data.message);
    });
});
