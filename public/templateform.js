var socket = io("http://localhost:5000/");
socket.on("connection");

$(document).ready(function () {
  var user = localStorage.getItem("name");
  var usertoken = localStorage.getItem("token");

  var pic = localStorage.getItem("url");
  $("#uname").text(user);
  $("#mypic").text(pic);
  $("#mypic").empty();

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

    //window.location.href = "index.html";
  });

  $("#mybody").hide();
  if (localStorage.getItem("token")) {
    $("#mybody").show();
  } else if (!localStorage.getItem("token")) {
    window.location.href = "index.html";
    alert("User Need to Login First");
  }

  $("#register").click(function () {
    var project_name = $("#project_name").val();
    var database = $("#db_engine").val();
    var project_description = $("#project_description").val();
    var web_framework = $("#web_framework").val();
    var is_public = $("#is_public").val();

    $.ajax({
      url: `/api/project/create-template`,
      method: "POST",

      beforeSend: function (xhr) {
        xhr.setRequestHeader("Authorization", `Bearer ${usertoken}`);
      },
      data: {
        project_name: project_name,
        project_description: project_description,
        web_framework: web_framework,
        database: database,
        is_public: is_public === "on" ? true : false,
      },

      success: function (result, status, xhr) {
        //alert(JSON.stringify(result));
        console.log(result.createdProjectResponse);
        // localStorage.setItem(
        //   "project_name",
        //   xhr.responseJSON.project.project_name
        // );

        socket.emit("project", "project is created");

        //window.location.href = "instruction.html";
      },
      error: function (xhr, status, error) {
        alert(xhr.responseText);
      },
    });
    $(".error").remove();

    if (project_name.length < 1) {
      $("#project_name").before(
        '<span style="color: red;" class="error">This field is required</span>'
      );
    }
  });
  $("#UnitListNew").bind("change", function () {
    if ($(this).is(":checked")) {
      checkFlag = 1;
      $("#db_engine").show();
      $(".form-check-label").show();
    } else {
      checkFlag = 0;
      $("#db_engine").hide();
      $(".form-check-label").show();
    }
  });
});
