$("#register").click(function (e) {
  e.preventDefault();

  var email = $("#email").val();
  var password = $("#password").val();

  $.ajax({
    url: `/api/auth/login`,
    method: "POST",
    data: {
      email: email,
      password: password,
    },
    success: function (result, status, xhr) {
      console.log(xhr.responseJSON);
      if (xhr.responseJSON.user.is_admin) {
        localStorage.setItem("name", xhr.responseJSON.user.name);
        localStorage.setItem("email", xhr.responseJSON.user.email);
        localStorage.setItem("url", xhr.responseJSON.user.profile_picture_url);
        localStorage.setItem("token", xhr.responseJSON.accessToken);

        window.location.href = "dashboard.html";
      } else {
        localStorage.setItem("token", xhr.responseJSON.accessToken);
        localStorage.setItem("name", xhr.responseJSON.user.name);
        localStorage.setItem("fullname", xhr.responseJSON.user.username);
        localStorage.setItem("email", xhr.responseJSON.user.email);
        localStorage.setItem("url", xhr.responseJSON.user.profile_picture_url);
        $("input:text").val("");
        $("input:password").val("");

        window.location.href = "home.html";
      }
    },
    error: function (xhr, status, error) {
      $("#msg").html(xhr.responseJSON.error);
      $("input:text").val("");
      $("input:password").val("");
    },
  });

  $(".error").remove();
});
