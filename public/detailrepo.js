$(document).ready(function () {
  /**${localStorage.getItem("publicRepoId")} */
  $.ajax({
    method: "GET",
    url: `/api/repo/1`,
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    },
    success: function (result, status, xhr) {
      console.log(result);
      localStorage.removeItem("publicRepoId");
    },
    error: function (xhr, status, error) {
      alert(xhr.responseText);
    },
  });
});
