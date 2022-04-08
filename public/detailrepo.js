$(document).ready(function () {
  /**${localStorage.getItem("publicRepoId")} */
  /**${localStorage.getItem("currentProjectId")} */
  $("#likeBtn").click(function () {
    $.ajax({
      method: "POST",
      url: `/api/repo/like/1`,
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
  $("#forkBtn").click(function () {
    $.ajax({
      method: "POST",
      url: `/api/repo/fork`,
      data: {
        project_id: 7,
      },
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
