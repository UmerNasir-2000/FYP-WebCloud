$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "/api/admin/requests",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    },
    success: function (result, status, xhr) {
      console.log(result);
    },
    error: function (xhr, status, error) {
      alert(xhr.responseText);
    },
  });
});
