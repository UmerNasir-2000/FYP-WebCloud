$(document).ready(function () {
  $.ajax({
    url: `/api/user`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(function (res) {
    $("#tblReg > table > tbody").empty();
    $.each(res.existingUsers, function (r1, reg) {
      let tr = `
            <tr>
          
              <td>  <img src=${
                reg.profile_picture_url
              } width="50px" height="50px" style="border-radius:25px" alt="" />
              </td>
              <td>${reg.first_name + " " + reg.last_name}</td>
              <td>${reg.email}</td>
              <td> ${
                reg.has_subscription === false
                  ? `<span class="subscribe danger-badge">Does not have Subscription</span>`
                  : `<span class="subscribe success-badge">Does have Subscription</span>
            `
              }</td>
              <td id="yes">
                  <select class="standard-select1" id="status">
                    <option value="" disabled selected hidden>${
                      reg.status
                    }</option>
                    <option value=${reg.id}>Disable</option>
                    <option value=${reg.id}>Enable</option>
                  </select>
              </td>
            </tr>             
  `;
      $("#tblReg > table > tbody").append(tr);
    });
    $("select").on("change", function () {
      let a = $("#status :selected").text();
      let id = $("#status :selected").val();

      $.ajax({
        url: `/api/admin/user-status/${id}`,
        method: "PUT",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            `Bearer ${localStorage.getItem("token")}`
          );
        },
        data: {
          user_status: a,
        },
      }).then((res) => alert("Updated"));
    });
  });
});
