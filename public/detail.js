$(document).ready(function () {
  alert(localStorage.getItem("publicId"));
  $.ajax({
    url: `/api/repo/${localStorage.getItem("publicId")}`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(function (reg) {
    $("#tblReg > table > tbody").empty();

    console.log("Id", reg.publicRepo);

    let tr = `
         
            <tr>
              <td>
                
                <div class="wrapper" >
                <div class="box1">
                <div class="first">
                <button class="forkbtn" value=${reg.id} >
                Fork Repository
                   </button>
             
              
                  <button  value=${reg.project_id}  class="likebtn" >
                  Like
                  <img src="https://img.icons8.com/ios-filled/30/fa314a/like--v1.png"/>  
                      
                  </button>
                 
                </div>
                
      <div class="first-row">
          <div class="name">Project Name : ${reg.publicRepo.project_name}</div>
          <div class="nameandemail">
          <div>
          Name : Wahaj Rashid
          </div>
          <div>
          Email : wahaj1020@gmail.com
          </div>
       
          
       </div>
      </div>
        <div class="desc">Project Description : ${
          reg.publicRepo.project_description
        }
        
        
        </div>
        <div class="third-row">
        <div>
      
    
        Project Web Framwork :
      
        ${
          reg.publicRepo.web_framework === "Node.js"
            ? `<img src="https://img.icons8.com/fluency/48/000000/node-js.png"/>` +
              `<h2>Node.js</h2>`
            : ""
        }
        
        ${
          reg.publicRepo.web_framework === "PHP"
            ? `<img src="https://img.icons8.com/color/48/000000/php.png"/>` +
              `<h2>PHP</h2>`
            : ""
        }
        
        ${
          reg.publicRepo.web_framework === "Nest.js"
            ? `<img src="https://img.icons8.com/external-icongeek26-glyph-icongeek26/64/000000/external-cheetah-animal-head-icongeek26-glyph-icongeek26.png"/>` +
              `<h2>Nest.js</h2>`
            : ""
        }
        ${
          reg.publicRepo.web_framework === "Spring Boot"
            ? `<img src="./images/spring.svg" alt="" />` +
              `<h2>Spring Boot</h2>`
            : ""
        }
        
        ${
          reg.publicRepo.web_framework === "Dotnet"
            ? `<img src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/000000/external-net-or-dot-net-a-software-framework-developed-by-microsoft-logo-shadow-tal-revivo.png"/>` +
              `<h2>Dotnet</h2>`
            : ""
        }
        
        
        
        
        
        </div>
             <div>Project Database : ${
               reg.publicRepo.database === "MySQL"
                 ? `<img src="images/mysql.svg" width=68 height=68 />` +
                   `<h2>MYSQL</h2>`
                 : ""
             }
                  ${
                    reg.publicRepo.database === "MongoDB"
                      ? `<img src="https://img.icons8.com/color/48/000000/mongodb.png"/>` +
                        `<h2>MongoDB</h2>`
                      : ""
                  }
             
             </div>
    </div>
      </div>
      
      
      
      
      <div class="box2">
      <button  value=${reg.project_likes}  class="openbtn" > 
     
      
        
        <div>
        <img class="image" src=${reg.publicRepo.profile_picture_url} alt="" />
            <h3>${reg.publicRepo.first_name}${reg.publicRepo.last_name}</h3>
            
            <span>${reg.publicRepo.email}</span>
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
      localStorage["mykey"] = this.value;
      window.location.href = "userownprojectbyid.html";
    });

    $(".forkbtn").click(function () {
      alert(this.value);
      $.ajax({
        url: `/api/repo/fork/${this.value}`,
        method: "POST",
        data: {
          userId: this.value,
        },
        beforeSend: function (xhr) {
          xhr.setRequestHeader(
            "Authorization",
            `Bearer ${localStorage.getItem("token")}`
          );
        },
      }).then(function (res) {
        alert("Forked");
        console.log(res);
        console.log(this.value);
      });
    });
  });
});
