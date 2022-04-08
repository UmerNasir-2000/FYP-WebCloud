$(document).ready(function () {
  $("#register").click(function (e) {
    e.preventDefault();
    var firstname = $("#firstName").val();
    var lastname = $("#lastName").val();
    var email = $("#email").val();
    var password = $("#password").val();
    console.log(firstname, lastname, email, password);
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
        alert("Signup Successfully");
        window.location.href = "index.html";
      },
      error: function (xhr, status, error) {
        alert(xhr.responseText);
      },
    });

    $(".error").remove();
  });
});
