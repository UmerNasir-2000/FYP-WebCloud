var socket = io("http://localhost:5000/");
socket.on("connection");

$(document).ready(function () {
  $.ajax({
    url: `/api/repo/${localStorage.getItem("publicId")}`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(function (reg) {
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
                   <button class="forkbtn" value=${
                     reg.repoDetail[0].project_id
                   } >
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
      
    
        Project Web Framework :
      
        ${
          reg.repoDetail[0].web_framework === "Node.js"
            ? `<img src="https://img.icons8.com/fluency/48/000000/node-js.png"/>` +
              `<h2>Node.js</h2>`
            : ""
        }
        
        ${
          reg.repoDetail[0].web_framework === "PHP"
            ? `<img src="https://img.icons8.com/color/48/000000/php.png"/>` +
              `<h2>PHP</h2>`
            : ""
        }
        
        ${
          reg.repoDetail[0].web_framework === "Nest.js"
            ? `<img src="images/nest.svg"/ width="48" height="48">` +
              `<h2>Nest.js</h2>`
            : ""
        }
        ${
          reg.repoDetail[0].web_framework === "Spring Boot"
            ? `<img src="./images/spring.svg" alt="" />` +
              `<h2>Spring Boot</h2>`
            : ""
        }
        
        ${
          reg.repoDetail[0].web_framework === "Dotnet"
            ? `<img src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/000000/external-net-or-dot-net-a-software-framework-developed-by-microsoft-logo-shadow-tal-revivo.png"/>` +
              `<h2>Dotnet</h2>`
            : ""
        }
        
        
        
        
        
        </div>
             <div>Project Database : ${
               reg.repoDetail[0].database === "MySQL"
                 ? `<img src="images/mysql.svg" width=68 height=68 />` +
                   `<h2>MYSQL</h2>`
                 : ""
             }
                  ${
                    reg.repoDetail[0].database === "MongoDB"
                      ? `<img src="https://img.icons8.com/color/48/000000/mongodb.png"/>` +
                        `<h2>MongoDB</h2>`
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
      alert(this.value);
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
        alert("Liked");
      });
    });
    $(".openbtn").click(function () {
      alert(this.value);
      localStorage["idprofile"] = this.value;
      window.location.href = "userprofile.html";
    });

    $(".forkbtn").click(function () {
      $(".forkbtn").prop("disabled", true);

      alert(this.value);
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
          socket.emit("notification", res.notification);
        },
        error: function (xhr, status, error) {
          alert(xhr.responseJSON.message);
        },
      });
    });
  });
});
