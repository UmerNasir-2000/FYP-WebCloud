$(document).ready(function () {
  $.ajax({
    url: `/api/project/user/${localStorage.getItem("projectId")}`,
    method: "GET",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(function (res) {
    $("#tblReg > table > tbody").empty();

    const d = new Date(res.hasProject.createdAt).toLocaleDateString();

    document.getElementById("headerTxt").innerText =
      res.hasProject.project_name;
    let tr = `
           
              <tr>
                <td>
                  
                  <div class="wrapper" >
                  <div class="box1">
                  <div class="fourth-row">
  
    
                  <button style="background-color:red" class="forkbtn" value=${
                    res.hasProject.id
                  } >
                  Download
                     </button>
               
                
                    <button   disabled  class="likebtn" >
                    <img src="https://img.icons8.com/fluency/32/000000/star.png"/>  
                    ${res.hasProject.likes}
                        
                    </button>
                  </div>
        <div class="first-row">
        <button
        onclick="location.href = 'editor.html';"
        id="notifications"
        class="btn"
      >
      Open IDE
      </button>
 
      <div   disabled  class="ispublic"> 
      ${
        res.hasProject.is_public === false
          ? `<span style="  background-color: #7e0404;border-radius:20px 10px;">Private</span>`
          : `<span style="background-color: green; ">Public</span>`
      }
          
      </div>
        </div>
          <div class="desc">Project Description : ${
            res.hasProject.description
          }</div>
          <div class="third-row">
          <div>
        
      
        
        
          ${
            res.hasProject.configuration.web_framework === "Node.js"
              ? `<h2>Node.js</h2>` +
                `<img src="https://img.icons8.com/fluency/48/000000/node-js.png"/>`
              : ""
          }
          
          ${
            res.hasProject.configuration.web_framework === "PHP"
              ? `<h2>PHP</h2>` +
                `<img src="https://img.icons8.com/color/48/000000/php.png"/>`
              : ""
          }
          
          ${
            res.hasProject.configuration.web_framework === "Nest.js"
              ? `<h2>Nest.js</h2>` +
                `<img src="images/nest.svg"/ width="48" height="48">`
              : ""
          }
          ${
            res.hasProject.configuration.web_framework === "Spring Boot"
              ? `<h2>Spring Boot</h2>` +
                `<img src="./images/spring.svg" alt="" />`
              : ""
          }
          
          ${
            res.hasProject.configuration.web_framework === "Dotnet"
              ? `<h2>Dotnet</h2>` +
                `<img src="https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/48/000000/external-net-or-dot-net-a-software-framework-developed-by-microsoft-logo-shadow-tal-revivo.png"/>`
              : ""
          }
          
          
          
          
          
          </div>
               <div> ${
                 res.hasProject.configuration.database === "MySQL"
                   ? `<h2>MYSQL</h2>` +
                     `<img src="images/mysql.svg" width=68 height=68 />`
                   : ""
               }
                    ${
                      res.hasProject.configuration.database === "MongoDB"
                        ? `<h2>MongoDB</h2>` +
                          `<img src="https://img.icons8.com/color/48/000000/mongodb.png"/>`
                        : ""
                    }
               
               </div>
      </div>
   
        </div>
        <div class="box2"> 
          <div class="userinfo">
        <h3>History</h3>
          
          <div>
        
             Last Checked : 
             ${
               res.projectHistories.last_checked
                 ? res.projectHistories.last_checked
                 : "No Work Yet."
             }
        </div>  
          <div>
        Created At
        ${d}
  
        </div>
     
        
      </div>
      </td>
      </tr>
         
                        
      `;
    $("#tblReg > table > tbody").append(tr);
    $("#ideBtn").click(function () {
      window.location.href = "editor.html";
    });
  });
});
