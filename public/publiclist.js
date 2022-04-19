$(document).ready(function () {
  $("#tblReg  > table > tbody").empty();

  $.ajax({
    method: "GET",
    url: "/api/repo/public",
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
  }).then((res) => {
    $.each(res.publicRepos, function (r1, reg) {
      console.log(reg);
      let tr = `
      <tr>
          <td>      
    
          <div class="item">
           
       <div class="first-row">
         
         <div class="name">${reg.project_name}</div>
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
                ? `<img src="https://img.icons8.com/external-icongeek26-glyph-icongeek26/48/000000/external-cheetah-animal-head-icongeek26-glyph-icongeek26.png"/>`
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
                  src="images/cloud.gif"
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
               
                <div>Created by : ${reg.user_first_name} ${
        reg.user_last_name
      }</div> 
                <div>${reg.user_email}</div>
              </div>
          </div>
  
          <div style="
          display: flex;
          flex-direction: row;
          justify-content: space-around;
          padding: 10px;
          padding-top: 20px;
          align-items: center;
          " >
          <div>${reg.project_createdAt}</div>
          <div>
          <a href="#"> 
          <img src="https://img.icons8.com/external-icongeek26-linear-colour-icongeek26/30/000000/external-like-donation-and-charity-icongeek26-linear-colour-icongeek26.png"/>
        </a> 123
          </div>
          
          </div>
          </div>
     
          </td>
      </tr>
    
      `;
      $("#tblReg  > table > tbody").append(tr);
    });
  });
});
