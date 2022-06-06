const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function (e) {
  // toggle the type attribute
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  // toggle the eye slash icon
  this.classList.toggle("fa-eye-slash");
});

$(document).ready(function () {
  $("#register").click(function (e) {
    e.preventDefault();
    var firstname = $("#firstName").val();
    var lastname = $("#lastName").val();
    var email = $("#email").val();
    var password = $("#password").val();

    $.ajax({
      url: `/api/auth/register`,
      method: "POST",
      data: {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
      },
      success: function (result, status, xhr) {
        $("input:text").val("");
        $("input:password").val("");
        alert("Successfully Registered To Web Cloud");

        window.location.href = "login.html";
      },
      error: function (xhr, status, error) {
        toastr.error(xhr.responseJSON.error).fadeOut(5500);
        $("#msg").html(xhr.responseJSON.error);
        $("input:text").val("");
        $("input:password").val("");
      },
    });

    $(".error").remove();
  });
});
