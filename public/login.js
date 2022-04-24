$("#register").click(function (e) {
  e.preventDefault();

  var email = $("#email").val();
  var password = $("#password").val();

  console.log(email, password);

  $.ajax({
    url: `/api/auth/login`,
    method: "POST",

    data: {
      email: email,
      password: password,
    },
    headers: { Authorization: localStorage.getItem("token") },
    success: function (result, status, xhr) {
      if (xhr.responseJSON.msg == "ADMIN USER IDENTIFIED") {
        localStorage.setItem("name", xhr.responseJSON.user.name);
        localStorage.setItem("email", xhr.responseJSON.user.email);
        localStorage.setItem("url", xhr.responseJSON.user.profile_picture_url);
        localStorage.setItem("token", xhr.responseJSON.accessToken);

        window.location.href = "admin.html";
      } else {
        // window.location.host = `${xhr.responseJSON.user.first_name}.localhost:5001`;
        // const wholeURL = `${window.location.protocol}//${window.location.host}/landing.html`;
        // alert(wholeURL);
        // window.location.href = `http://${xhr.responseJSON.user.firstName.toLowerCase()}.localhost:5000/landing.html`;
        localStorage.setItem("token", xhr.responseJSON.accessToken);
        localStorage.setItem("name", xhr.responseJSON.user.name);
        localStorage.setItem("fullname", xhr.responseJSON.user.fullname);
        localStorage.setItem("email", xhr.responseJSON.user.email);
        localStorage.setItem("url", xhr.responseJSON.user.profile_picture_url);
        $("input:text").val("");
        $("input:password").val("");

        window.location.href = "landing.html";
      }
    },
    error: function (xhr, status, error) {
      $("#msg").html(xhr.responseJSON.error);
    },
  });

  $(".error").remove();
});
