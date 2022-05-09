var socket = io("http://localhost:5000/");
socket.on("connection");

$(document).ready(function () {
  $.ajax({
    url: `/api/repo/${localStorage.getItem("publicId")}`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(function (reg) {
    $("#headerTxt1").hide();

    console.log(reg);
    if (reg.repoDetail.length !== 0) {
      $("#tblReg > table > tbody").empty();
      document.getElementById("headerTxt").innerText =
        reg.repoDetail[0].project_name;

      let tr = `
         
            <tr>
              <td>
                
                <div class="wrapper" >
                <div class="box1">
                <div class="first">
                ${
                  localStorage.getItem("isadmin") === "0"
                    ? `
                  <button class="forkbtn" value=${reg.repoDetail[0].project_id} >
                  Fork Repository
                  </button>
                  `
                    : ""
                }
                   <button class="downloadbtn" value=${
                     reg.repoDetail[0].project_id
                   } style="font-weight: bold">
                   Download
                      </button>
              
                  <button  value=${
                    reg.repoDetail[0].project_id
                  }  class="likebtn" > 
                  <img src="https://img.icons8.com/fluency/32/000000/star.png"/>  
                      ${reg.repoDetail[0].likes}
                  </button>
                  
                 
                </div>
                <div class="singleline">
    
          <button  value=${reg.repoDetail[0].usr_id}  class="openbtn" >  
          <div class="first-row">
          <img class="image" src=${
            reg.repoDetail[0].profile_picture_url
          } alt="" />
  
          <div class="nameandemail">
          <h3>${reg.repoDetail[0].first_name}  ${
        reg.repoDetail[0].last_name
      }</h3>
                  
                  <span>${reg.repoDetail[0].email}</span>
       </div>
         
            </div>
       
          
            </button>
            <div   disabled  class="ispublic"> 
            ${
              reg.repoDetail[0].is_public === false
                ? `<span style="  background-color: #7e0404;border-radius:20px 10px;">Private</span>`
                : `<span style="background-color: green; ">Public</span>`
            }
                
            </div>
            </div>
 
        <div class="desc">Project Description : ${reg.repoDetail[0].description}
        
        
        </div>
        <div class="third-row">
        <div>
      
    
       
      
        ${
          reg.repoDetail[0].web_framework === "Node.js"
            ? `<h2>Node.js</h2>` +
              `<img src="https://img.icons8.com/fluency/48/000000/node-js.png"/>`
            : ""
        }
        
        ${
          reg.repoDetail[0].web_framework === "PHP"
            ? `<h2>PHP</h2>` +
              `<img src="https://img.icons8.com/color/48/000000/php.png"/>`
            : ""
        }
        
        ${
          reg.repoDetail[0].web_framework === "Nest.js"
            ? `<h2>Nest.js</h2>` +
              `<img src="images/nest.svg"/ width="48" height="48">`
            : ""
        }
        ${
          reg.repoDetail[0].web_framework === "Spring Boot"
            ? `<h2>Spring Boot</h2>` +
              `<img src="./images/spring.svg" alt="" />`
            : ""
        }
        
        ${
          reg.repoDetail[0].web_framework === "Dotnet"
            ? `<h2>Dotnet</h2>` +
              `<img src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/000000/external-net-or-dot-net-a-software-framework-developed-by-microsoft-logo-shadow-tal-revivo.png"/>`
            : ""
        }
        
        
        
        
        
        </div>
             <div>${
               reg.repoDetail[0].database === "MySQL"
                 ? `<h2>MYSQL</h2>` +
                   `<img src="images/mysql.svg" width=68 height=68 />`
                 : ""
             }
                  ${
                    reg.repoDetail[0].database === "MongoDB"
                      ? `<h2>MongoDB</h2>` +
                        `<img src="https://img.icons8.com/color/48/000000/mongodb.png"/>`
                      : ""
                  }
             
             </div>
    </div>
      </div> 
    </td>
    </tr>
       
                      
    `;
      $("#tblReg > table > tbody").append(tr);

      $(".likebtn").click(function () {
        $(".likebtn").prop("disabled", true);

        $.ajax({
          url: `/api/repo/like/${this.value}`,
          method: "POST",
          data: {
            id: this.value,
          },
          beforeSend: function (xhr) {
            xhr.setRequestHeader(
              "Authorization",
              `Bearer ${localStorage.getItem("token")}`
            );
          },
        }).then(function (res) {
          toastr.success("Liked").fadeOut(5500);
        });
      });
      $(".openbtn").click(function () {
        localStorage["idprofile"] = this.value;
        window.location.href = "userprofile.html";
      });

      $(".downloadbtn").click(function () {
        toastr.success("Code Download").fadeOut(5500);
      });

      $(".forkbtn").click(function () {
        $(".forkbtn").prop("disabled", true);

        $.ajax({
          url: `/api/repo/fork`,
          method: "POST",
          data: { project_id: this.value },
          beforeSend: function (xhr) {
            xhr.setRequestHeader(
              "Authorization",
              `Bearer ${localStorage.getItem("token")}`
            );
          },
          success: function (res) {
            console.log(res.notification);
            toastr.success("Forked").fadeOut(5500);

            socket.emit("notification", res.notification);
          },
          error: function (xhr, status, error) {
            toastr.error(xhr.responseJSON.message).fadeOut(5500);
          },
        });
      });
    } else {
      $("#headerTxt1").show();
      document.getElementById("headerTxt1").innerText =
        "Project Request is Still Pending";
      toastr.error("Your Project Request is Still Pending").fadeOut(7500);
    }
  });
});
