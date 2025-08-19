---
title: "0xOb5k‑J — Terminal"
description: "A one-file interactive terminal, built entirely inside Markdown."
---

<!--
This page is a self-contained terminal implemented with inline HTML/CSS/JS
inside a Markdown file. It runs on GitHub Pages (username.github.io).
If you view this file on github.com, scripts are sandboxed and won't run.
-->

<div id="app" class="theme-dark">
  <div class="wrap">
    <header>
      <div class="brand">
        <span class="dot dot-a"></span>
        <span class="dot dot-b"></span>
        <span class="dot dot-c"></span>
        <strong>0xOb5k‑J</strong> • Interactive Terminal
      </div>
      <div class="theme-toggle">
        theme: <code id="themeLabel">dark</code> · try: <kbd>theme light</kbd>, <kbd>theme matrix</kbd>, <kbd>theme dracula</kbd>
      </div>
    </header>

    <main id="terminal" role="region" aria-label="Terminal">
      <div id="screen" aria-live="polite"></div>
      <div class="input-line">
        <span id="prompt" class="prompt"></span>
        <input id="cmd" type="text" spellcheck="false" autocomplete="off" aria-label="Terminal input" placeholder="type 'help' and press Enter" />
      </div>
    </main>

    <noscript>
      <div class="noscript">
        JavaScript is disabled, so the terminal can’t run. Enable JS or visit your GitHub Pages site.
      </div>
    </noscript>

    <footer>
      <small>Made with plain Markdown + inline HTML/CSS/JS. No builds. No dependencies.</small>
    </footer>
  </div>
</div>

<style>
:root {
  --bg: #0c0f12;
  --fg: #e6edf3;
  --dim: #9aa6b2;
  --accent: #7ee787;
  --accent-2: #79c0ff;
  --err: #ff6b6b;
  --mono: ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace;
}
.theme-light { --bg:#f7f9fb; --fg:#0b1220; --dim:#5a6a7a; --accent:#0ea5e9; --accent-2:#16a34a; --err:#dc2626; }
.theme-matrix { --bg:#031a03; --fg:#d4ffd4; --dim:#6bb36b; --accent:#00ff6a; --accent-2:#41ffb0; --err:#ff5170; }
.theme-dracula { --bg:#282a36; --fg:#f8f8f2; --dim:#8be9fd; --accent:#50fa7b; --accent-2:#bd93f9; --err:#ff5555; }

* { box-sizing: border-box; }
html, body { height: 100%; }
body { margin: 0; background: var(--bg); color: var(--fg); font-family: var(--mono); }
#app { min-height: 100vh; display: grid; place-items: center; }
.wrap { width: min(980px, 94vw); margin: 4vh auto; background: linear-gradient(180deg, color-mix(in lch, var(--bg), black 6%) 0%, var(--bg) 100%);
  border: 1px solid color-mix(in lch, var(--fg), var(--bg) 85%); border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,.35); overflow: hidden; }
header, footer { padding: 10px 14px; border-bottom: 1px solid color-mix(in lch, var(--fg), var(--bg) 85%); }
footer { border-top: 1px solid color-mix(in lch, var(--fg), var(--bg) 85%); border-bottom: 0; }
.brand { display: flex; align-items: center; gap: 8px; color: var(--dim); }
.brand strong { color: var(--fg); }
.dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
.dot-a { background: #ff5f56; }
.dot-b { background: #ffbd2e; }
.dot-c { background: #27c93f; }
.theme-toggle { color: var(--dim); float: right; }
kbd { background: color-mix(in lch, var(--fg), var(--bg) 90%); color: var(--fg); padding: 2px 6px; border-radius: 4px; border: 1px solid color-mix(in lch, var(--fg), var(--bg) 80%); }

#terminal { padding: 16px; min-height: 50vh; }
#screen { white-space: pre-wrap; font-size: 14px; line-height: 1.6; }
.input-line { display: flex; align-items: center; gap: 8px; margin-top: 10px; }
.prompt { color: var(--accent); }
#cmd { flex: 1; background: transparent; border: none; outline: none; color: var(--fg); font: inherit; caret-color: var(--accent-2); }
#cmd::placeholder { color: color-mix(in lch, var(--fg), var(--bg) 70%); }
.line { display: block; }
.line .error { color: var(--err); }
a { color: var(--accent-2); text-decoration: none; }
a:hover { text-decoration: underline; }

.noscript { padding: 10px; background: #0003; border: 1px dashed color-mix(in lch, var(--fg), var(--bg) 70%); color: var(--dim); border-radius: 8px; margin: 12px 0; }

@media (max-width: 560px) {
  .theme-toggle { display: none; }
}
</style>

<script>
(function() {
  const $ = sel => document.querySelector(sel);
  const screen = $("#screen");
  const input = $("#cmd");
  const themeLabel = $("#themeLabel");
  const app = $("#app");
  const promptEl = $("#prompt");

  const state = {
    user: "visitor",
    host: "0xOb5k-j",
    cwd: "~",
    history: [],
    hIndex: -1,
    firstRun: true,
  };

  const commands = {};
  const files = {
    "README.txt": "Welcome to 0xOb5k‑J's one-file terminal. Try 'help'.",
    "links.txt": "GitHub  : https://github.com/0xOb5k-J\nWebsite : https://0xOb5k-J.github.io\nTwitter : https://x.com/",
    "projects.txt": "- github.io (this site)\n- experiments\n- dotfiles\nTip: type 'open repo' to visit.",
    "quote.txt": "Unique is just attention you earned honestly.",
    "hello.md": "# hello, world\nthis is a tiny file living in memory."
  };
  const fileNames = Object.keys(files).sort();

  function setPrompt() {
    promptEl.textContent = `${state.user}@${state.host}:${state.cwd}$`;
  }

  function println(html = "") {
    const div = document.createElement("div");
    div.className = "line";
    div.innerHTML = html;
    screen.appendChild(div);
    screen.scrollTop = screen.scrollHeight;
    window.scrollTo({ top: document.body.scrollHeight });
  }

  function printBanner() {
    const art = [
      "      ___  __   ___ _      _    _     _      ",
      "     / _ \\/ /  / _ \\ |__ _| |__| |__ (_)__ _ ",
      "    / , _/ _ \\/ ___/ / _` | '_ \\ '_ \\ / _` |",
      "   /_/|_/_/\\_/_/  /_/\\__,_|_.__/_.__/_\\__,_|",
      "",
      "   Welcome to 0xOb5k‑J • Interactive Terminal",
      "   Type 'help' to see available commands."
    ].join("\\n");
    println(`<span style="color: var(--accent-2)">${art}</span>`);
  }

  function typeOut(text, speed = 10) {
    return new Promise(resolve => {
      let i = 0, buf = "";
      const timer = setInterval(() => {
        buf += text[i++];
        if (text[i-1] === "\\n") println(buf.slice(0, -1)), buf = "";
        if (i >= text.length) { clearInterval(timer); if (buf) println(buf); resolve(); }
      }, speed);
    });
  }

  function help() {
    const list = [
      ["help", "show this help"],
      ["about", "who is 0xOb5k‑J"],
      ["projects", "list featured work"],
      ["contact", "how to reach"],
      ["whoami", "print current user"],
      ["date", "current UTC date/time"],
      ["echo <text>", "print text"],
      ["ls", "list example files"],
      ["cat <file>", "show a file"],
      ["open <repo|site|profile|url>", "open link"],
      ["theme <dark|light|matrix|dracula>", "switch theme"],
      ["banner", "show the banner"],
      ["clear", "clear the screen"]
    ];
    const rows = list.map(([c, d]) => `  <span style="color:var(--accent)">${c.padEnd(24,' ')}</span> ${d}`).join("\\n");
    println(rows);
  }

  async function about() {
    println("0xOb5k‑J — builder of small, sharp things on the web.");
    println("This terminal is a single Markdown file rendered by GitHub Pages.");
    println("Source: <a href='https://github.com/0xOb5k-J/0xOb5k-J.github.io' target='_blank' rel='noopener'>repo</a>");
  }

  function projects() {
    println(files["projects.txt"].replace(/^(.*)$/gm, (_, m) => "  " + m));
  }

  function contact() {
    println("DMs open. Email: <a href='mailto:hello@example.com'>hello@example.com</a>");
  }

  function whoami() {
    println(state.user);
  }

  function cmdDate() { println(new Date().toUTCString()); }

  function echo(args) { println(args.join(" ")); }

  function ls() {
    const cols = fileNames.map(n => ` ${n}`).join("\\n");
    println(cols);
  }

  function cat(args) {
    const name = args.join(" ");
    if (!name) return println(`<span class="error">usage:</span> cat &lt;file&gt;`);
    if (files[name]) {
      println(files[name]);
    } else {
      println(`<span class="error">cat:</span> no such file: ${name}`);
    }
  }

  function openCmd(args) {
    const key = (args[0] || "").toLowerCase();
    let url = null;
    if (/^https?:\\/\\//.test(args[0])) url = args[0];
    else if (key === "repo") url = "https://github.com/0xOb5k-J/0xOb5k-J.github.io";
    else if (key === "profile") url = "https://github.com/0xOb5k-J";
    else if (key === "site") url = "https://0xOb5k-J.github.io";
    else url = "https://github.com/0xOb5k-J";
    window.open(url, "_blank", "noopener");
    println(`opened: ${url}`);
  }

  function theme(args) {
    const t = (args[0] || "").toLowerCase();
    const themes = ["dark","light","matrix","dracula"];
    if (!themes.includes(t)) {
      println(`current theme: <span style="color:var(--accent)">${getTheme()}</span>`);
      println(`available: ${themes.join(", ")}`);
      return;
    }
    setTheme(t);
    println(`theme set to ${t}`);
  }

  function clear() { screen.innerHTML = ""; }

  function getTheme() { return localStorage.getItem("term-theme") || "dark"; }

  function setTheme(name) {
    app.classList.remove("theme-dark","theme-light","theme-matrix","theme-dracula");
    app.classList.add(`theme-${name}`);
    localStorage.setItem("term-theme", name);
    themeLabel.textContent = name;
  }

  function complete(text) {
    const parts = text.trim().split(/\\s+/);
    if (parts.length === 1) {
      const opts = Object.keys(commands).filter(c => c.startsWith(parts[0]));
      if (opts.length === 1) return opts[0];
    } else {
      const [cmd, ...rest] = parts;
      const arg = rest.join(" ");
      if (cmd === "cat" || cmd === "ls") {
        const opts = fileNames.filter(f => f.toLowerCase().startsWith(arg.toLowerCase()));
        if (opts.length === 1) return `${cmd} ${opts[0]}`;
      }
    }
    return text;
  }

  function bindCommands() {
    commands.help = help;
    commands.about = about;
    commands.projects = projects;
    commands.contact = contact;
    commands.whoami = whoami;
    commands.date = cmdDate;
    commands.time = cmdDate;
    commands.echo = echo;
    commands.ls = ls;
    commands.cat = cat;
    commands.open = openCmd;
    commands.theme = theme;
    commands.clear = clear;
    commands.banner = printBanner;
  }

  function parseAndRun(line) {
    if (!line.trim()) return;
    const [cmd, ...args] = line.trim().split(/\\s+/);
    const fn = commands[cmd];
    println(`<span class="prompt">${state.user}@${state.host}:${state.cwd}$</span> ${escapeHTML(line)}`);
    if (fn) {
      if (fn.length > 0) fn(args);
      else fn();
    } else {
      println(`<span class="error">${cmd}:</span> command not found. Try 'help'.`);
    }
  }

  function escapeHTML(s) {
    return s.replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  }

  function init() {
    bindCommands();
    setTheme(getTheme());
    setPrompt();
    if (state.firstRun) {
      printBanner();
      typeOut("Type 'help' and press Enter.\\n", 12).then(() => {});
      state.firstRun = false;
    }
    input.focus();

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const val = input.value;
        state.history.unshift(val);
        state.hIndex = -1;
        parseAndRun(val);
        input.value = "";
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (state.history.length) {
          state.hIndex = Math.min(state.hIndex + 1, state.history.length - 1);
          input.value = state.history[state.hIndex];
          setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (state.hIndex > 0) {
          state.hIndex -= 1;
          input.value = state.history[state.hIndex];
        } else {
          state.hIndex = -1;
          input.value = "";
        }
      } else if (e.key === "Tab") {
        e.preventDefault();
        input.value = complete(input.value);
      }
    });

    document.addEventListener("click", () => input.focus());
  }

  setPrompt();
  document.addEventListener("DOMContentLoaded", init);
})();
</script>
