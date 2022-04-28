$(document).ready(function () {
  $.ajax({
    url: `/api/repo/${localStorage.getItem("publicId")}`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(function (reg) {
    $("#tblReg > table > tbody").empty();

    let tr = `
         
            <tr>
              <td>
                
                <div class="wrapper" >
                <div class="box1">
                <div class="first">
                <button class="forkbtn" value=${reg.repoDetail[0].project_id} >
                Fork Repository
                   </button>
             
              
                  <button  value=${
                    reg.repoDetail[0].project_id
                  }  class="likebtn" >
                  Like
                  <img src="https://img.icons8.com/ios-filled/30/fa314a/like--v1.png"/>  
                      
                  </button>
                 
                </div>
                
      <div class="first-row">
          <div class="name">Project Name : ${
            reg.repoDetail[0].project_name
          }</div>
          <div class="nameandemail" style="display: none;">
          <div>
          Name : Wahaj Rashid
          </div>
          <div>
          Email : wahaj1020@gmail.com
          </div>
       
          
       </div>
      </div>
        <div class="desc">Project Description : ${reg.repoDetail[0].description}
        
        
        </div>
        <div class="third-row">
        <div>
      
    
        Project Web Framwork :
      
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
      
      
      
      
      <div class="box2">
      <button  value=${reg.repoDetail[0].usr_id}  class="openbtn" > 
     
      
        
        <div>
        <img class="image" src=${
          reg.repoDetail[0].profile_picture_url
        } alt="" />
            <h3>${reg.repoDetail[0].first_name}  ${
      reg.repoDetail[0].last_name
    }</h3>
            
            <span>${reg.repoDetail[0].email}</span>
          </div>
     
        
          </button>
      </div>
    </td>
    </tr>
       
                      
    `;
    $("#tblReg > table > tbody").append(tr);

    $(".likebtn").click(function () {
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
        console.log(res);
        console.log(this.value);
      });
    });
    $(".openbtn").click(function () {
      alert(this.value);
      localStorage["idprofile"] = this.value;
      window.location.href = "userprofile.html";
    });

    $(".forkbtn").click(function () {
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
      }).then(function (res) {
        alert("Forked");
      });
    });
  });
});
