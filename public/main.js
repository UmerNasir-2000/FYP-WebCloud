//"use strict";

var term, protocol, socketURL, socket, pid;

Terminal.applyAddon(fit);
Terminal.applyAddon(attach);

var terminalContainer = document.getElementById("terminal-container"),
  actionElements = {
    findNext: document.querySelector("#find-next"),
    findPrevious: document.querySelector("#find-previous"),
  },
  optionElements = {
    cursorBlink: document.querySelector("#option-cursor-blink"),
    cursorStyle: document.querySelector("#option-cursor-style"),
    scrollback: document.querySelector("#option-scrollback"),
    tabstopwidth: document.querySelector("#option-tabstopwidth"),
    bellStyle: document.querySelector("#option-bell-style"),
  };

createTerminal();

function createTerminal() {
  while (terminalContainer.children.length) {
    terminalContainer.removeChild(terminalContainer.children[0]);
  }
  term = new Terminal({});
  window.term = term; // Expose `term` to window for debugging purposes
  term.on("resize", function (size) {
    if (!pid) {
      return;
    }

    var cols = size.cols;
    var rows = size.rows;

    var viewportElement = document.querySelector(".xterm-viewport");
    var scrollBarWidth =
      viewportElement.offsetWidth - viewportElement.clientWidth;

    var width =
      (cols * term._core.renderer.dimensions.actualCellWidth + 2).toString() +
      "px";
    var height =
      (rows * term._core.renderer.dimensions.actualCellHeight).toString() +
      "px";

    document.querySelector(".xterm-viewport").width = width;
    terminalContainer.style.width = width;
    terminalContainer.style.height = height;

    var url = "/terminals/" + pid + "/size?cols=" + cols + "&rows=" + rows;
    fetch(url, { method: "POST" });
  });
  protocol = location.protocol === "https:" ? "wss://" : "ws://";
  socketURL =
    protocol +
    location.hostname +
    (location.port ? ":" + location.port : "") +
    "/terminals/";
  term.open(terminalContainer);
  // term.winptyCompatInit();
  // term.webLinksInit();
  term.fit();
  term.focus();
  setTimeout(function () {
    updateTerminalSize();
    fetch("/terminals?cols=" + term.cols + "&rows=" + term.rows, {
      method: "POST",
    }).then(function (res) {
      res.text().then(function (processId) {
        pid = processId;
        socketURL += processId;
        socket = new WebSocket(socketURL);
        socket.onopen = runRealTerminal;
        socket.onclose = runFakeTerminal;
        socket.onerror = runFakeTerminal;
      });
    });
  }, 0);
}

function updateTerminalSize() {
  var cols = term.cols;
  var rows = term.rows;
  var viewportElement = document.querySelector(".xterm-viewport");
  var scrollBarWidth =
    viewportElement.offsetWidth - viewportElement.clientWidth;

  //var width = (cols * term._core.renderer.dimensions.actualCellWidth /*+ term._core.viewport.scrollBarWidth*/ + 22).toString() + 'px';

  var width =
    (cols * term._core.renderer.dimensions.actualCellWidth + 2).toString() +
    "px";
  var height =
    (rows * term._core.renderer.dimensions.actualCellHeight).toString() + "px";

  document.querySelector(".xterm-viewport").width = width;
  terminalContainer.style.width = width;
  terminalContainer.style.height = height;
  term.fit();
}

function runRealTerminal() {
  term.attach(socket);

  term._initialized = true;
}

function runFakeTerminal() {
  if (term._initialized) {
    return;
  }

  term._initialized = true;

  var shellprompt = "$ ";

  term.prompt = function () {
    term.write("\r\n" + shellprompt);
  };

  term.writeln("Welcome to xterm.js");
  term.writeln(
    "This is a local terminal emulation, without a real terminal in the back-end."
  );
  term.writeln("Type some keys and commands to play around.");
  term.writeln("");
  term.prompt();

  term.on("key", function (key, ev) {
    var printable = !ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey;

    if (ev.keyCode == 13) {
      term.prompt();
    } else if (ev.keyCode == 8) {
      // Do not delete the prompt
      if (term.x > 2) {
        term.write("\b \b");
      }
    } else if (printable) {
      term.write(key);
    }
  });

  term.on("paste", function (data, ev) {
    term.write(data);
  });
}
