
"use strict";

const LegacyDesktop = (() => {
  const apps = {
    Computer: {
      title: "Computer",
      content: `
        <h2>Computer</h2>
        <p>LegacyOS file system</p>
        <hr>
        <p>System storage: Not connected</p>
        <p>File manager: Genesis</p>
      `
    },

    Terminal: {
      title: "Terminal",
      content: `
        <h2>Legacy Terminal</h2>
        <p>LegacyOS Genesis command interface</p>
        <div style="margin-top:20px;color:#c9ad75">
          kernel@legacyos:~$ _
        </div>
      `
    },

    Settings: {
      title: "Settings",
      content: `
        <h2>System Settings</h2>
        <p>Operating system: LegacyOS</p>
        <p>Version: 0.1.0 Genesis</p>
        <p>Theme: Emerald</p>
        <p>Interface: Genesis Desktop</p>
      `
    },

    About: {
      title: "About LegacyOS",
      content: `
        <h2>LegacyOS Genesis</h2>
        <p>A modular operating system project.</p>
        <p>Kernel: Legacy Kernel</p>
        <p>Architecture: x86</p>
        <p>Languages: C, C++, Rust, Assembly</p>
      `
    }
  };

  let activeWindow = null;
  let zIndex = 20;

  const $ = id => document.getElementById(id);

  function openApp(name) {
    const app = apps[name];
    if (!app) return;

    $("windowTitle").textContent = app.title;
    $("windowContent").innerHTML = app.content;

    const win = $("window");
    win.style.display = "block";
    win.style.zIndex = ++zIndex;

    activeWindow = win;
    $("startMenu").style.display = "none";
  }

  function closeApp() {
    $("window").style.display = "none";
    activeWindow = null;
  }

  function toggleStart() {
    const menu = $("startMenu");
    menu.style.display =
      menu.style.display === "block" ? "none" : "block";
  }

  function notify(title, message) {
    const box = document.createElement("div");
    box.className = "notification";

    const heading = document.createElement("strong");
    heading.textContent = title;

    const body = document.createElement("p");
    body.textContent = message;

    box.append(heading, body);
    document.body.appendChild(box);

    setTimeout(() => box.remove(), 3500);
  }

  function updateClock() {
    const now = new Date();

    $("time").textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });

    $("date").textContent = now.toLocaleDateString();
  }

  function setupSearch() {
    const search = document.createElement("div");
    search.className = "desktop-search";
    search.id = "desktopSearch";

    const input = document.createElement("input");
    input.placeholder = "Search LegacyOS applications...";

    search.appendChild(input);
    document.body.appendChild(search);

    input.addEventListener("keydown", event => {
      if (event.key !== "Enter") return;

      const match = Object.keys(apps).find(name =>
        name.toLowerCase().includes(input.value.toLowerCase())
      );

      if (match) openApp(match);
      else notify("Search", "No matching application found.");

      search.style.display = "none";
      input.value = "";
    });
  }

  function toggleSearch() {
    const search = $("desktopSearch");
    search.style.display =
      search.style.display === "block" ? "none" : "block";

    if (search.style.display === "block") {
      search.querySelector("input").focus();
    }
  }

  function setupDragging() {
    const win = $("window");
    const header = win.querySelector(".window-header");

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let originalX = 0;
    let originalY = 0;

    header.addEventListener("pointerdown", event => {
      if (event.target.closest("button")) return;

      const rect = win.getBoundingClientRect();

      dragging = true;
      startX = event.clientX;
      startY = event.clientY;
      originalX = rect.left;
      originalY = rect.top;

      win.style.transform = "none";
      header.setPointerCapture(event.pointerId);
      win.style.zIndex = ++zIndex;
    });

    header.addEventListener("pointermove", event => {
      if (!dragging) return;

      win.style.left = Math.max(
        0,
        Math.min(window.innerWidth - win.offsetWidth,
          originalX + event.clientX - startX)
      ) + "px";

      win.style.top = Math.max(
        0,
        Math.min(window.innerHeight - win.offsetHeight - 64,
          originalY + event.clientY - startY)
      ) + "px";
    });

    header.addEventListener("pointerup", () => {
      dragging = false;
    });
  }

  function setupKeyboard() {
    document.addEventListener("keydown", event => {
      if (event.ctrlKey && event.code === "Space") {
        event.preventDefault();
        toggleSearch();
      }

      if (event.key === "Escape") {
        closeApp();
        $("desktopSearch").style.display = "none";
        $("startMenu").style.display = "none";
      }

      if (event.altKey && event.key === "F4") {
        event.preventDefault();
        closeApp();
      }
    });
  }

  function init() {
    updateClock();
    setInterval(updateClock, 1000);

    setupSearch();
    setupDragging();
    setupKeyboard();

    notify("LegacyOS Genesis", "Desktop environment initialized.");
  }

  return {
    init,
    openApp,
    closeApp,
    toggleStart,
    toggleSearch,
    notify
  };
})();

document.addEventListener("DOMContentLoaded", () => {
  LegacyDesktop.init();
});

function openApp(name) {
  LegacyDesktop.openApp(name);
}

function closeApp() {
  LegacyDesktop.closeApp();
}

function toggleStart() {
  LegacyDesktop.toggleStart();
}
