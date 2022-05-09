$(document).ready(function () {
  $.ajax({
    url: `/api/user/${localStorage.getItem("idprofile")}`,
    method: "GET",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    },
  }).then(function (res) {
    $("#headerTxt").hide();

    console.log(res);
    $("#tblReg  > table > tbody ").empty();

    $("#tblReg1   > table > tbody").empty();

    let tr = `
    <tr>
          <td>  

          <div class="box1">
            <img class="image" src=${res.ifUser.profile_picture_url} alt="" />
  
            <div class="userinfo">
              <div>
                <h3 style="font-style: italic">${res.ifUser.first_name} ${res.ifUser.last_name}</h3>
                <p style="font-style: italic;margin-bottom:-1px">${res.ifUser.email}</p>
                <p style="font-style: italic">Total Projects : ${res.projectDetails.length}</p>
              </div>
            </div>
          </div>
        </td>
</tr>
  
    `;
    $("#tblReg1   > table > tbody").append(tr);
    if (res.projectDetails.length !== 0) {
      $.each(res.projectDetails, function (r1, reg) {
        if (reg.is_public === 1) {
          var str = reg.project_created_at;

          if (str.length > 5) str = str.substring(0, 10);
          let tr = `
          <tr>
              <td>      
        
              <button  value=${reg.project_id}  class="openbtn" > 
              <div class="item">
               
           <div class="first-row">
             
             <div class="name">
             
             
             ${
               reg.project_name.length > 15
                 ? reg.project_name.substring(0, 15) + "..."
                 : reg.project_name
             }
             
             
             </div>
              <div>
              
                ${
                  reg.web_framework === "Node.js"
                    ? `<img src="https://img.icons8.com/fluency/48/000000/node-js.png"/>`
                    : ""
                }
                
                ${
                  reg.web_framework === "PHP"
                    ? `<img src="https://img.icons8.com/color/48/000000/php.png"/>`
                    : ""
                }
                
                ${
                  reg.web_framework === "Nest.js"
                    ? `<img src="images/nest.svg" width=48 heught=48/>`
                    : ""
                }
                ${
                  reg.web_framework === "Spring Boot"
                    ? `<img src="./images/spring.svg" alt="" />`
                    : ""
                }
                
                ${
                  reg.web_framework === "Dotnet"
                    ? `<img src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/000000/external-net-or-dot-net-a-software-framework-developed-by-microsoft-logo-shadow-tal-revivo.png"/>`
                    : ""
                }
                   ${
                     reg.database === "MySQL"
                       ? `<img src="images/mysql.svg" width=48 height=48 />`
                       : ""
                   }
                          ${
                            reg.database === "MongoDB"
                              ? `<img src="https://img.icons8.com/color/48/000000/mongodb.png"/>`
                              : ""
                          }
                  </div>
            
            </div>
                <h1 style="font-size: medium; margin-top: 6px;text-align:start">
                  Description
                </h1>
                <div class="desc">
                <p>  ${
                  reg.project_description.length > 120
                    ? reg.project_description.substring(0, 120) + "....."
                    : reg.project_description
                }
                </p>
                </div>
 
              <div class="lastline">
              <div>${str}</div>
              <div> 
              ${
                reg.is_public === 0
                  ? `<span style=" white;background-color: #7e0404;border-radius:20px 10px; 
                  font-weight:1000;
                  font-style: italic;
               ;  padding: 0px 10px;">Private</span>`
                  : `<span style=" color : white;
                  font-weight:1000;
                  font-style: italic
                  ;background-color: green;border-radius:20px 10px;     padding: 0px 10px;">Public</span>
              `
              }</div>
              <div>
              <a href="#" style="text-decoration:none; color :white"> 
              <img src="https://img.icons8.com/fluency/32/000000/star.png"/> ${
                reg.likes
              }</a> 
              </div>
              </div>
         </button>
              </td>
          </tr>
        
          `;
          $("#tblReg  > table > tbody ").append(tr);
        }
      });
    } else {
      $("#headerTxt").show();
      document.getElementById("headerTxt").innerText =
        "User Have Not Work On Any Project Yet";
    }
    $(".openbtn").click(function () {
      localStorage["publicId"] = this.value;
      window.location.href = "detail.html";
    });
  });
});
