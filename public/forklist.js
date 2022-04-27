$(document).ready(function () {
  $.ajax({
    url: `/api/repo/projects`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(function (res) {
    console.log(res);
    $("#tblReg > table > tbody").empty();
    $.each(res.forkedProjects, function (r1, reg) {
      let tr = `
              <tr>
            
                <td>  <img src=${
                  reg.profile_picture_url
                } width="50px" height="50px" style="border-radius:25px" alt="" />
                </td>
                <td>${reg.first_name + " " + reg.last_name}</td>
                <td>${reg.email}</td>
                <td> ${
                  reg.has_subscription === 0
                    ? `<span class="subscribe danger-badge">Does not have Subscription</span>`
                    : `<span class="subscribe success-badge">Does have Subscription</span>
              `
                }</td>
          
              </tr>             
    `;
      $("#tblReg > table > tbody").append(tr);
    });
  });
});
