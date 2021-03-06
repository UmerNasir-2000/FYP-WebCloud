var fileName = "";
var fileData = "";
var editor = ace.edit("editor");
var fontSizeValue = 16;
var currentTheme = "ace/theme/cobalt";
var extra = "";
$("#mybody").hide();
if (localStorage.getItem("token")) {
  $("#mybody").show();
} else if (!localStorage.getItem("token")) {
  window.location.href = "index.html";
  alert("User Need to Login First");
}

var click = 1;
$("#folders").click(function () {
  click++;
  if (click % 2 == 0) {
    $(".container__right").css({
      width: "0%",
    });
  } else {
    $(".container__right").css({
      width: "18%",
    });
  }
});

$("#exampleModal").on("shown.bs.modal", function () {
  $(".dropdown").trigger("focus");
});

$(".select_button1").click(function () {
  $(".select1").toggle();
});
$("html").click(function (event) {
  if ($(event.target).closest(".select1, .select_button1").length === 0) {
    $(".select1").hide();
  }
});
$("body").on("click", ".closeTab", function () {
  $(this).parent().parent().remove();
  $($(this).parent().attr("href")).remove();
  if (!$("#tabs li").length) {
    $("#divMain").html("");
  } else {
    var first_menu_id = $(".nav-item").first().children().attr("id");
    $("#${first_menu_id}").tab("show");
  }
});

function renderTree() {
  $("#tree").fancytree({
    source: {
      url: "/api/files/",
    },
    icon: function (event, data) {
      let file = data.node.title;
      let iconObject = {
        js: "fab fa-js",
        php: "fab fa-php",
        json: "fas fa-file",
        sql: "fa fa-database",
        html: "fab fa-html5",
        docker: "fab fa-docker",
        css: "fab fa-css3",
        java: "fab fa-java",
      };
      var extension = file.substr(file.lastIndexOf(".") + 1);
      console.log(extension);
      if (iconObject[extension]) return iconObject[extension];
      else return "far fa-file-code";
    },
    activate: function (event, data) {
      localStorage.setItem("ld", data.node);
      var node = data.node;
      console.log("This is data.node object  = " + data.node);
      fileName = node.title;
      console.log("Name", fileName);

      document.title = fileName;
      $.ajax({
        url: `/api/files/file`,
        method: "POST",
        data: {
          fileName,
        },
        success: function (result, status, xhr) {
          extra = xhr.responseJSON;
          fileData = xhr.responseJSON;
          configureAceEditor(fileData);
          console.log(xhr.responseJSON);
          var menu = document.title;
          if (!$("#tabs").length) {
            $("#divMain").html(
              `<ul  class="nav nav-tabs" id="tabs"> </ul> 
             
              `
            );
          }

          if (!$(`.nav-link#${menu}`).length) {
            $("#tabs").append(
              ` <li class="nav-item">
            <a
            class="nav-link"
            data-toggle="tab" 
            href="#" 
              id="${menu}"

            >
            
              ${menu} <b class="closeTab text-danger ml-4">x</b>
             
            </a>

           
           
          </li>
          
          `
            );
            $(`.nav-link#${menu}`).tab("show");
            $(`.nav-link`).click(function (data) {
              var ld = localStorage.getItem("ld");

              console.log("This is data.node object  = " + ld);
              fileName = this.id;
              console.log("Name", this.id);

              document.title = this.id;
              $.ajax({
                url: `/api/files/file`,
                method: "POST",
                data: {
                  fileName,
                },
                success: function (result, status, xhr) {
                  fileData = xhr.responseJSON;
                  configureAceEditor(fileData);
                  console.log(xhr.responseJSON);
                },
              });
            });
          } else {
            alert("Yes");
            $(`.nav-link#${menu}`).tab("show");
          }
        },

        error: function (xhr, status, error) {
          console.log(xhr.responseText);
        },
      });
    },
  });
}

$(function () {
  var $contextMenu = $("#contextMenu");

  $("body").on("contextmenu", "#prettier", function (e) {
    $contextMenu.css({
      display: "block",
      left: e.pageX,
      top: e.pageY,
    });
    debugger;
    return false;
  });

  $("html").click(function () {
    $contextMenu.hide();
  });

  $("#contextMenu li a").click(function (e) {
    var f = $(this);
    debugger;
  });
});

renderTree();

$.ajax({
  url: `/api/auth/users`,
  method: "GET",
}).then(function (res) {
  console.log(res);
});

$(document).on(
  "click.bs.dropdown.data-api",
  ".dropdown.keep-inside-clicks-open",
  function (e) {
    e.stopPropagation();
  }
);

$("#create-file").click(function () {
  let createdFileName = prompt("Enter file name", "");
  let createdFileExtension = prompt("Enter file extension", "");

  $.ajax({
    url: "/api/files/create-file",
    method: "POST",
    data: {
      newFileName: createdFileName,
      newFileNameExtension: createdFileExtension,
    },
  }).then((res) => console.log(res));
});

$("#refresh-explorer").click(function () {
  renderTree();
});

$("#save-file-btn").click(function () {
  let currentFileContent = editor.getValue();
  let currentFileName = fileName;

  if (currentFileName === "") {
    alert("No file opened yet.");
    return;
  }

  $.ajax({
    url: "/api/files/save-code",
    method: "PUT",
    data: {
      fileName: currentFileName,
      fileContent: currentFileContent,
    },
  }).then(function (res) {
    alert(`${currentFileName} saved.`);
  });
});

shortcut.add("Ctrl+q", function () {
  let fontValueMax = fontSizeValue++;
  editor.setOptions({ fontSize: `${fontValueMax}px` });
  $("#editor").css("font-size", `${fontValueMax}px`);
});

shortcut.add("Ctrl+2", function () {
  let fontValueMin = fontSizeValue--;
  editor.setOptions({ fontSize: `${fontValueMin}px` });
  $("#editor").css("font-size", `${fontValueMin}px`);
});

shortcut.add("Ctrl+3", function () {
  editor.setOptions({ fontSize: `16px` });
  $("#editor").css("font-size", `16px`);
});

function configureAceEditor(value) {
  var langTools = ace.require("ace/ext/language_tools");
  editor.getSession().setUseWorker(false);
  editor.setTheme(currentTheme);
  editor.getSession().setMode("ace/mode/javascript");
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showLineNumbers: true,
    tabSize: 4,
    fontSize: 16,
  });
  editor.setValue(value);
  editor.session.setUseWrapMode(true);
  editor.setHighlightActiveLine(false);

  $("#editor").css("font-size", "20px");

  $("#prettier").click(function () {
    var val = editor.session.getValue();
    var array = val.split(/\n\n\n/);
    array[0] = array[0].trim();
    val = array.join("\n");
    val = js_beautify(val);
    editor.session.setValue(val);
  });
  $("select").on("change", function () {
    if ($("#myselect option:selected").val() === "0") {
      currentTheme = "ace/theme/twilight";
      editor.setTheme(currentTheme);
    } else if ($("#myselect option:selected").val() === "1") {
      currentTheme = "ace/theme/cobalt";
      editor.setTheme(currentTheme);
    } else if ($("#myselect option:selected").val() === "2") {
      currentTheme = "ace/theme/twilight";
      editor.setTheme(currentTheme);
    } else if ($("#myselect option:selected").val() === "3") {
      currentTheme = "ace/theme/xcode";
      editor.setTheme(currentTheme);
    } else if ($("#myselect option:selected").val() === "4") {
      currentTheme = "ace/theme/monokai";
      editor.setTheme(currentTheme);
    } else if ($("#myselect option:selected").val() === "5") {
      currentTheme = "ace/theme/eclipse";
      editor.setTheme(currentTheme);
    }
  });

  $("#theme").click(function () {
    currentTheme = "ace/theme/twilight";
    editor.setTheme(currentTheme);
  });

  $("#cascadia-code").click(function () {
    currentTheme = "ace/theme/cobalt";
    editor.setTheme(currentTheme);
  });
  $("#twilight").click(function () {
    currentTheme = "ace/theme/twilight";
    editor.setTheme(currentTheme);
  });
  $("#xcode").click(function () {
    currentTheme = "ace/theme/xcode";
    editor.setTheme(currentTheme);
  });
  $("#monokai").click(function () {
    currentTheme = "ace/theme/monokai";
    editor.setTheme(currentTheme);
  });
  $("#eclipse").click(function () {
    currentTheme = "ace/theme/eclipse";
    editor.setTheme(currentTheme);
  });
}

configureAceEditor("#Write Your Code To Get Started");

$("#signup").click(function () {
  console.log("WORKING");
  window.location.replace("/signup");
});

document.getElementById("run").onclick = function () {
  window.open(`http://localhost:8000/${fileName}`, `_blank`);
};
