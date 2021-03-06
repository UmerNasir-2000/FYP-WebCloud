$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "/api/project/user",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    },
    success: function (res, status, xhr) {
      $("#tblReg  > table > tbody").empty();

      $.each(res.userProjects, function (r1, reg) {
        console.log("object-id", reg);
        var str = new Date(reg.createdAt).toLocaleDateString();

        let tr = `
          <tr>
              <td>      
              <button  value=${reg.id}  class="openbtn" > 
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
                  reg.configuration.web_framework === "Node.js"
                    ? `<img src="https://img.icons8.com/fluency/48/000000/node-js.png"/>`
                    : ""
                }
                
                ${
                  reg.configuration.web_framework === "PHP"
                    ? `<img src="https://img.icons8.com/color/48/000000/php.png"/>`
                    : ""
                }
                
                ${
                  reg.configuration.web_framework === "Nest.js"
                    ? `<img src="images/nest.svg" width=48 heught=48/>`
                    : ""
                }
                ${
                  reg.configuration.web_framework === "Spring Boot"
                    ? `<img src="./images/spring.svg" alt="" />`
                    : ""
                }
                
                ${
                  reg.configuration.web_framework === "Dotnet"
                    ? `<img src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/000000/external-net-or-dot-net-a-software-framework-developed-by-microsoft-logo-shadow-tal-revivo.png"/>`
                    : ""
                }
                   ${
                     reg.configuration.database === "MySQL"
                       ? `<img src="images/mysql.svg" width=48 height=48 />`
                       : ""
                   }
                          ${
                            reg.configuration.database === "MongoDB"
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
                   
                    <div>Created by : ${
                      localStorage.getItem("first_name") +
                      " " +
                      localStorage.getItem("last_name")
                    }</div> 
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
        $("#tblReg  > table > tbody").append(tr);
      });
      $(".openbtn").click(function () {
        localStorage["projectId"] = this.value;
        window.location.href = "own.html";
      });
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
    },
  });
  $.ajax({
    method: "GET",
    url: "/api/project/forked-projects",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(
        "Authorization",
        `Bearer ${localStorage.getItem("token")}`
      );
    },
    success: function (res, status, xhr) {
      console.log("Forked", res);
      $("#tblReg2  > table > tbody").empty();
      if (res.forkedProjects.length !== 0) {
        let tr = `
        <h4
        style="
          font-size: 30pt;
          margin-bottom: 15px;
          margin-top: 10px;
          color: white; 
        "
      >
        Forked Projects
      </h4>
          `;
        $("#tblReg2  > table > tbody").append(tr);

        $.each(res.forkedProjects, function (r1, reg) {
          var str = new Date(reg.createdAt).toLocaleDateString();

          let tr = `
            <tr>
                <td>      
                <button  value=${reg.project_id}  class="openbtn1" > 
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
                        src=${reg.profile_picture_url}
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
                     
                      <div>Created by : ${reg.first_name} ${
            reg.last_name
          }</div> 
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
          $("#tblReg2  > table > tbody").append(tr);
        });
      } else {
        console.log("empty");
      }
      $(".openbtn1").click(function () {
        localStorage["publicId"] = this.value;
        window.location.href = "detail.html";
      });
    },
    error: function (xhr, status, error) {
      console.log(xhr.responseText);
    },
  });
});
