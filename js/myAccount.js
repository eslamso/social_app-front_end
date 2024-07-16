if (!localStorage.getItem("Token")) {
  window.location.href = "./../html/index.html";
}
document.getElementById("myAccountTab").addEventListener("click", function () {
  var groupsContainer = document.getElementById("groupsContainer");
  console.log(groupsContainer);
  groupsContainer.classList.add("hidden");
  document.getElementById("searchContainer").classList.add("hidden");
  var accountInfo = document.getElementById("accountInfo");
  accountInfo.classList.toggle("hidden");

  axios
    .get("http://localhost:4000/user/get-me", {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    })
    .then(function (response) {
      const { name, email } = response.data.user;
      document.getElementById("username").value = name;
      document.getElementById("email").value = email;
      console.log(response);
    })

    .catch(function (error) {
      console.log(error);
    });
});

document
  .getElementById("changePasswordBtn")
  .addEventListener("click", function () {
    var passwordChangeForm = document.getElementById("passwordChangeForm");
    passwordChangeForm.classList.toggle("hidden");
  });

document
  .getElementById("updateUsernameBtn")
  .addEventListener("click", function () {
    var username = document.getElementById("username").value;
    // Update username logic here (e.g., send to server)
    //console.log(localStorage.getItem("Token"));
    axios
      .patch(
        "http://localhost:4000/user/",
        { name: username },
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
          },
        }
      )
      .then(function (response) {
        console.log("updated");
        const { name } = response.data.user;
        document.getElementById("username").value = name;
      })

      .catch(function (error) {
        console.log(error);
      });
  });

document
  .getElementById("updateEmailBtn")
  .addEventListener("click", function () {
    var email = document.getElementById("email").value;
    // Update username logic here (e.g., send to server)
    //console.log(localStorage.getItem("Token"));
    axios
      .patch(
        "http://localhost:4000/user/",
        { email: email },
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
          },
        }
      )
      .then(function (response) {
        console.log("updated");
        const { email } = response.data.user;
        document.getElementById("username").value = email;
      })

      .catch(function (error) {
        alert(error.response.data.message);
        console.log(error.response.data.message);
      });
  });
document
  .getElementById("updatePasswordBtn")
  .addEventListener("click", function () {
    var currentPassword = document.getElementById("currentPassword").value;
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    axios
      .patch(
        "http://localhost:4000/user/password/",
        {
          password: newPassword,
          passwordConfirm: confirmPassword,
          currentPassword: currentPassword,
        },
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
          },
        }
      )
      .then(function (response) {
        alert("updated password successfully please login again");
        localStorage.removeItem("Token");
        window.location.href = "./../index.html";
      })

      .catch(function (error) {
        alert(error.response.data.message);
        console.log(error.response.data.message);
      });
  });
