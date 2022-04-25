$(document).ready(function () {
  var user = localStorage.getItem("name");
  var fullname = localStorage.getItem("fullname");
  var pic = localStorage.getItem("url");
  $("#uname").text(user);
  $("#mypic").text(pic);
  $("#mybody").hide();
  $("#mybody").show();
  $("#fullname").text(fullname);

  if (localStorage.getItem("token")) {
    $("#mybody").show();
  } else if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
    alert("User Need to Login First");
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
    //window.location.host = "localhost:5001";
    window.location.href = "index.html";
    const wholeURL = `${window.location.protocol}//${window.location.host}/index.html`;

    //window.location.href = "index.html";
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
