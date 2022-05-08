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
      if (xhr.responseJSON.user.status !== "Enable") {
        window.location.href = "disable.html";
      } else if (
        xhr.responseJSON.user.is_admin &&
        xhr.responseJSON.user.status === "Enable"
      ) {
        localStorage.setItem("isadmin", 1);
        localStorage.setItem("first_name", xhr.responseJSON.user.first_name);
        localStorage.setItem("last_name", xhr.responseJSON.user.last_name);
        localStorage.setItem("email", xhr.responseJSON.user.email);
        localStorage.setItem("url", xhr.responseJSON.user.profile_picture_url);
        localStorage.setItem("token", xhr.responseJSON.accessToken);

        window.location.href = "dashboard.html";
      } else if (xhr.responseJSON.user.status === "Enable") {
        localStorage.setItem("isadmin", 0);
        localStorage.setItem("token", xhr.responseJSON.accessToken);
        localStorage.setItem("first_name", xhr.responseJSON.user.first_name);
        localStorage.setItem("last_name", xhr.responseJSON.user.last_name);
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
    },
  });

  $(".error").remove();
});
