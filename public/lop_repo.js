$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: `/api/repo/project/${localStorage.getItem("projectId")}`,
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    },
    success: function (result, status, xhr) {
      console.log(result);
      localStorage.removeItem("projectId");
    },
    error: function (xhr, status, error) {
      alert(xhr.responseText);
    },
  });
});
