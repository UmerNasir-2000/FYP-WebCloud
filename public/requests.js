$(document).ready(function () {
  const dummy = [
    {
      name: "red",
      info: "This is a working project This is a working project This is a working project",
      status: "public",
    },
    {
      name: "green",
      info: "#0f0",
      status: "public",
    },
    {
      name: "blue",
      info: "#00f",
      status: "public",
    },
    {
      name: "cyan",
      info: "#0ff",
      status: "public",
    },
    {
      name: "magenta",
      info: "#f0f",
      status: "public",
    },
    {
      name: "yellow",
      info: "#ff0",
      status: "public",
    },
    {
      name: "black",
      info: "#000",
      status: "public",
    },
  ];
  $("#tblReg   > table > tbody").empty();

  $.each(dummy, function (r1, reg) {
    // console.log(reg);
    let tr = `
    <tr>
          <td>  
          <div class="data-grid" style="height: min-content" >
           <div class="box1">
          <h3>${reg.name}</h3>
        </div>
        <div class="box2">
          <h3>${reg.info}</h3>
        </div>
        <div class="box3">
          <h3>${reg.status}</h3>
        </div>
        
        <div
        class="box5"
        style="background-color: transparent; text-align: end"
      >
        <button class="btn-mini" style="width: 30% auto">Open</button>
      </div>
      </div>
        
        </td>
          
        
        </tr>
  
    `;
    $("#tblReg   > table > tbody").append(tr);

    // console.log(reg);
  });
});

$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "/api/repo/",
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
