$(document).ready(function () {
  $.ajax({
    url: `/api/repo/${localStorage.getItem("publicId")}`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(function (reg) {
    $("#tblReg > table > tbody").empty();
    console.log(reg);
    let tr = `
         
            <tr>
              <td>
                
                <div class="wrapper" >
                <div class="box1">
                <div class="first">
                <button class="forkbtn" value=${reg.repoDetail[0].project_id} >
                Fork Repository
                   </button>
                   <button style="background-color:red" class="forkbtn"  >
                  Download
                     </button>
              
                  <button  value=${
                    reg.repoDetail[0].project_id
                  }  class="likebtn" > 
                  <img src="https://img.icons8.com/fluency/32/000000/star.png"/>  
                      ${reg.repoDetail[0].likes}
                  </button>
                 
                </div>
                
      <div class="first-row">


        
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
      
      
      
      
      <div class="box2">
      <div   disabled  class="ispublic"> 
      ${
        reg.repoDetail[0].is_public === "0"
          ? `<span style=" white;background-color: #7e0404;border-radius:20px 10px; 
                font-weight:1000;
                font-style: italic;
             ;  padding: 8px 70px;">Private</span>`
          : `<span style=" color : white;
                font-weight:1000;
                font-style: italic
                ;background-color: green;border-radius:20px 10px;  margin-bottom:50px ;  padding: 8px 70px;">Public</span>`
      }
          
      </div>
      <button  value=${reg.repoDetail[0].usr_id}  class="openbtn" > 
     
      
        
        <div class="first-row">
        <img class="image" src=${
          reg.repoDetail[0].profile_picture_url
        } alt="" />

        <div class="nameandemail">
        <h3>${reg.repoDetail[0].first_name}  ${reg.repoDetail[0].last_name}</h3>
                
                <span>${reg.repoDetail[0].email}</span>
     </div>
       
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
        success: function (res) {
          alert("Forked");
        },
        error: function (xhr, status, error) {
          alert(xhr.responseJSON.message);
        },
      });
    });
  });
});
