$(document).ready(function () {
  $("#mybody").hide();
  var fullname = localStorage.getItem("fullname");
  var pic = localStorage.getItem("url");
  var user = localStorage.getItem("first_name");
  $("#uname").text(user);
  $("#mypic").text(pic);
  $("#fullname").text(fullname);

  if (!localStorage.getItem("token")) {
    window.setInterval(function () {
      // this will execute every 5 minutes => show the alert here
      alert("User is Required to Login First");
      window.location.href = "index.html";
    }, 1);
  } else if (localStorage.getItem("token")) {
    $("#mybody").show();
  }
  $("#mypic").empty();

  let tr = `
  <img id="mypic" src=${pic} class='avatar' alt="Avatar">
  `;
  $("#mypic").append(tr);

  $("#logout").click(function () {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("url");
    localStorage.removeItem("project_name");
    localStorage.removeItem("fullname");
    localStorage.removeItem("email");
    localStorage.removeItem("last_name");
    localStorage.removeItem("isadmin");
    localStorage.removeItem("first_name");
    //window.location.host = "localhost:5001";
    window.location.href = "index.html";
    const wholeURL = `${window.location.protocol}//${window.location.host}/index.html`;

    //window.location.href = "index.html";
  });
  var bars = document.querySelector(".bars");
  bars.addEventListener("click", function () {
    document.querySelector("body").classList.toggle("active");
  });
});
