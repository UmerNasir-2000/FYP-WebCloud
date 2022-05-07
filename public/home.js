$(document).ready(function () {
  $(".notification_icon .fa-bell").click(function () {
    $(".dropdown").toggleClass("active");
  });
  document.getElementById("fullname").innerText =
    localStorage.getItem("first_name");

  $.ajax({
    url: `/api/repo/trending`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(function (res) {
    $("#tblReg  > table > tbody").empty();

    $.each(res.trendingPublicRepos, function (r1, reg) {
      var str = new Date(reg.project_createdAt).toLocaleDateString();

      let tr = `
          <tr>
              <td>      
              <button  value=${reg.project_id}  class="openbtn" > 
              <div class="item1">
               
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
                <div
                  style="
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <div>
                    <img
                      src=${reg.user_profile_picture_url}
                      width="50"
                      height="50"
                      style="border-radius: 30px"
                      alt=""
                    />
                  </div>
                  <div
                    style="
                      display: flex;
                      flex-direction: column; 
                      font-size:small;
                      margin-right: 20px;
                      gap:5px;
                    "
                  >
                   
                    <div>Created by : ${
                      reg.user_first_name + " " + reg.user_last_name
                    }</div> 
                    <div>${reg.user_email}</div>
                  </div>
           
              </div>
              <div class="lastline">
              <div>${str}</div>
              <div> 
              ${
                reg.is_public === false
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
                reg.project_likes
              }</a> 
              </div>
              </div>
              </button> 
              </td>
          </tr>
        
          `;
      $("#tblReg  > table > tbody").append(tr);
    });
    $(".openbtn").click(function () {
      localStorage["publicId"] = this.value;
      window.location.href = "detail.html";
    });
  });
  $.ajax({
    url: `/api/repo/recent/projects`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(function (res) {
    if (res.userRecentRepos.length !== 0) {
      let tr = `
    <h4
   
  >
   Recent Projects
  </h4>
      `;
      $("#tblReg3").append(tr);

      $("#tblReg1  > table > tbody").empty();

      $.each(res.userRecentRepos, function (r1, reg) {
        console.log("Recent", reg);
        var str = reg.createdAt;

        if (str.length > 5) str = str.substring(0, 10);
        let tr = `
          <tr>
              <td>      
              <button  value=${reg.id}  class="openbtn" > 
        
              <div class="item1">
               
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
                  reg.description.length > 120
                    ? reg.description.substring(0, 120) + "....."
                    : reg.description
                }
                </p>
                </div>
                <div
                  style="
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                  "
                >
                  <div>
                    <img
                      src=${localStorage.getItem("url")}
                      width="50"
                      height="50"
                      style="border-radius: 30px"
                      alt=""
                    />
                  </div>
                  <div
                    style="
                      display: flex;
                      flex-direction: column; 
                      font-size:small;
                      margin-right: 20px;
                      gap:5px;
                    "
                  >
                   
                    <div>Created by : ${localStorage.getItem(
                      "first_name"
                    )}</div> 
                    <div>${localStorage.getItem("email")}</div>
                  </div>
           
              </div>
              <div class="lastline">
          <div>${str}</div>
          <div> 
          ${
            reg.is_public === false
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
        $("#tblReg1  > table > tbody").append(tr);
      });
    } else {
      console.log("empty");
    }
    $.ajax({
      url: `/api/user/notifications`,
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then(function (res) {
      $(".dropdown  > table > tbody").empty();

      $.each(res.userNotifications, function (r1, reg) {
        console.log("not", reg);
        let t = new Date(reg.createdAt).toDateString();
        tr = `
        <div class="notify_item">
     
        <div class="notify_info">
          <p>${reg.text}</p>
          <span >${t}</span>
        </div>
      </div>
        `;
        $(".dropdown  > table > tbody").append(tr);
      });
    });

    $(".openbtn").click(function () {
      localStorage["publicId"] = this.value;
      window.location.href = "detail.html";
    });
  });
});
