$(document).ready(function () {
  const dummy = [
    {
      name: "PHP & MongoDB",
      web: "PHP",
      database: "MongoDB",
      desc: "Create project with PHP as backend and MongoDB as database.",
      user: "Wahaj",
    },
    {
      name: "PHP & MySQL",
      web: "PHP",
      database: "MySQL",
      desc: "Create project with PHP as backend and MySQL as database.",
      user: "Wahaj",
    },
    {
      name: "Nodejs & MongoDB",
      web: "Node.js",
      database: "MongoDB",
      desc: "Create project with Node.js as backend and MongoDB as database.",
      user: "Wahaj",
    },
    {
      name: "Nodejs & MySQL",
      web: "Node.js",
      database: "MySQL",
      desc: "Create project with Node.js as backend and MySQL as database.",
      user: "Wahaj",
    },
    {
      name: "Nestjs & MongoDB",
      web: "Nest.js",
      database: "MongoDB",
      desc: "Create project with Nestjs as backend and MongoDB as database.",
      user: "Wahaj",
    },
    {
      name: "Nestjs & MySQL",
      web: "Nest.js",
      database: "MySQL",
      desc: "Create project with Nest.js as backend and MySQL as database.",
      user: "Wahaj",
    },
    {
      name: "SpringBoot & MongoDB",
      web: "Spring Boot",
      database: "MongoDB",
      desc: "Create project with Spring Boot as backend and MongoDB as database.",
      user: "Wahaj",
    },
    {
      name: "SpringBoot & MySQL",
      web: "Spring Boot",
      database: "MySQL",
      desc: "Create project with Spring Boot as backend and MySQL as database.",
      user: "Wahaj",
    },
    {
      name: "Dotnet & MongoDB",
      web: "Dotnet",
      database: "MongoDB",
      desc: "Create project with Dotnet as backend and MongoDB as database.",
      user: "Wahaj",
    },
  ];
  $("#tblReg  > table > tbody").empty();

  $.each(dummy, function (r1, reg) {
    let tr = `
        <tr>
            <td>      
      
            <div class="item">
             
            <div class="first-row">
              
              <div class="name">
              
              
              ${
                reg.name.length > 21
                  ? reg.name.substring(0, 21) + "..."
                  : reg.name
              }
              
              
              </div>
               <div>
               
                 ${
                   reg.web === "Node.js"
                     ? `<img src="https://img.icons8.com/fluency/48/000000/node-js.png"/>`
                     : ""
                 }
                 
                 ${
                   reg.web === "PHP"
                     ? `<img src="https://img.icons8.com/color/48/000000/php.png"/>`
                     : ""
                 }
                 
                 ${
                   reg.web === "Nest.js"
                     ? `<img src="images/nest.svg" width=48 heught=48/>`
                     : ""
                 }
                 ${
                   reg.web === "Spring Boot"
                     ? `<img src="./images/spring.svg" alt="" />`
                     : ""
                 }
                 
                 ${
                   reg.web === "Dotnet"
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
                   reg.desc.length > 120
                     ? reg.desc.substring(0, 120) + "....."
                     : reg.desc
                 }
                 </p>
                 </div>
          
            </td>
        </tr>
      
        `;
    $("#tblReg  > table > tbody").append(tr);
  });
});
