document.getElementById("logOut").addEventListener("click", function () {
  localStorage.clear();
  //localStorage.removeItem("Token");
  window.location.href = "./../index.html";
});
