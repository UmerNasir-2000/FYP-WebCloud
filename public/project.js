var socket = io("http://localhost:5000/");
socket.on("connection");
$(document).ready(function () {
  var user = localStorage.getItem("name");
  var usertoken = localStorage.getItem("token");
  var profile_pic = localStorage.getItem("url");
  var pic = localStorage.getItem("url");
  var email = localStorage.getItem("email");
  $("#uname").text(user);
  $("#mypic").text(pic);
  $("#mypic").empty();

  var len = 0;
  var maxchar = 200;

  $(".my-input").keyup(function () {
    len = this.value.length;
    if (len > maxchar) {
      return false;
    } else if (len > 0) {
      $("#remainingC").html("Remaining characters: " + (maxchar - len));
    } else {
      $("#remainingC").html("Remaining characters: " + maxchar);
    }
  });

  let tr = `
    <img id="mypic" src=${pic} class='avatar'  alt="Avatar">
    `;

  $("#mypic").append(tr);

  $("#logout").click(function () {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("url");
    const wholeURL = `${window.location.protocol}//${window.location.host}/index.html`;
    window.location.replace(wholeURL);
  });

  $("#register").click(function () {
    var project_name = $("#project_name").val();
    var project_description = $("#project_description").val();
    var web_framework = $("#web_framework").val();
    const config = web_framework.split("-");
    var is_public = $("#is_public").is(":checked");

    $.ajax({
      url: `/api/project/create-template`,
      method: "POST",

      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${usertoken}`);
      },
      data: {
        project_name: project_name,
        project_description: project_description,
        web_framework: config[0],
        database: config[1],
        is_public: is_public,
        email: email,
        profile_pic: profile_pic,
      },

      success: function (result, status, xhr) {
        toastr.success("Creating Template").fadeOut(5500);

        $("input:text").val("");
        $("#project_description").val("");

        $("body").addClass("loading");
        socket.emit("project", "project is created");

        setTimeout(function () {
          //your code here
          window.location.href = "instruction.html";
        }, 2000);

        localStorage.setItem(
          "project_name",
          xhr.responseJSON.project.project_name
        );
      },
      error: function (xhr, status, error) {
        //toastr.error(xhr.responseJSON.error).fadeOut(5500);
        //$("#msg").html(xhr.responseJSON.error);
      },
    });
    $(".error").remove();
  });
  $("#UnitListNew").bind("change", function () {
    if ($(this).is(":checked")) {
      checkFlag = 1;
      $("#db_engine").show();
      $(".form-check-label").show();
    } else {
      checkFlag = 0;
      $("#db_engine").hide();
      $(this).attr("form-check-label", "false");
    }
  });
});
