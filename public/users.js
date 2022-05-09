$(document).ready(function () {
  $.ajax({
    url: `/api/user`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(function (res) {
    $("#tblReg > table > tbody").empty();
    $.each(res.existingUsers, function (r1, reg) {
      console.log("R1", reg);
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
                  <option value=""  disabled selected hidden>${
                    reg.status
                  }</option>
                    <option value=${reg.id}>Enable</option>
                    <option value=${reg.id}>Disable</option>
                  </select>
              </td>
              <td>
              <button  value=${reg.id}  class="openbtn" >View</button>
              </td>
            </tr>             
  `;
      $("#tblReg > table > tbody").append(tr);
    });
    $(".openbtn").click(function () {
      localStorage["idprofile"] = this.value;
      window.location.href = "adminviewprofile.html";
    });

    $("#tblReg >  table > tbody >tr > #yes > #status").on(
      "change",
      function () {
        var a = $("#status :selected").text();
        var id = $("#status :selected").val();
        console.log(a);
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
        }).then((res) => toastr.success("Updated").fadeOut(5500));
      }
    );
  });
});
