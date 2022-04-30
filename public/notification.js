$(document).ready(function () {
  $.ajax({
    url: `/api/user/notifications`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(function (res) {
    $("#tblReg  > table > tbody").empty();

    console.log(res);
    $.each(res.userNotifications, function (r1, reg) {
      console.log(reg);
      let t = new Date(reg.createdAt).toDateString();
      tr = `
      <tr>
      <td>
      <button  value=${reg.id}  class="viewbtn" > 
     View
     </button>
     </td> 
      <td>
      <p>
      ${reg.text}
      </p>
      <span class="sp">
      ${t}
      </span>
      </td>  
    
      </tr>
      <div class="notify_item">
   
   
      `;
      $("#tblReg > table > tbody").append(tr);
    });
    $(".viewbtn").click(function () {
      localStorage["idprofile"] = this.value;
      window.location.href = "userprofile.html";
    });
  });
});
