$(document).ready(function () {
  $("#mybody").hide();
  var fullname = localStorage.getItem("fullname");
  var pic = localStorage.getItem("url");
  var user = localStorage.getItem("first_name");
  $("#uname").text(user);
  $("#aname").text(user);
  $("#mypic").text(pic);
  $("#fullname").text(fullname);
  if (!localStorage.getItem("token")) {
    window.setInterval(function () {
      // this will execute every 5 minutes => show the alert here
      alert("User is Required to Login First");
      window.location.href = "index.html";
    }, 1);
  } else if (localStorage.getItem("isadmin") == "0") {
    window.setInterval(function () {
      alert("Only For Admin");
    }, 2);
    history.back();
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
    localStorage.removeItem("first_name");
    localStorage.removeItem("last_name");
    localStorage.removeItem("publicId");
    localStorage.removeItem("projectId");
    localStorage.removeItem("idprofile");
    window.location.href = "index.html";
  });
  $(".select_button1").click(function () {
    $(".select1").toggle();
  });
  $("html").click(function (event) {
    if ($(event.target).closest(".select1, .select_button1").length === 0) {
      $(".select1").hide();
    }
  });
});
