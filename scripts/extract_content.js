const Module = require("module");
const path = require("path");
const fs = require("fs");

const FAKE_DOCX = path.join(__dirname, "fake_docx.js");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, ...args) {
  if (request === "docx") return FAKE_DOCX;
  return originalResolve.call(this, request, ...args);
};

const base = require("./build_docx.js");
const part2 = require("./build_docx_part2.js");
const part3 = require("./build_docx_part3.js");
const m0mod = require("./build_docx_m0.js");
const adv = require("./build_docx_adv.js");

// Instead of inlining images as base64, reference the real files copied into assets/img/
function imgToDataUri(fname) {
  return "assets/img/" + fname;
}

function runsToText(children) {
  if (!children) return "";
  return children.map((c) => (c && c.opts ? c.opts.text || "" : "")).join("");
}
function runsAreItalic(children) {
  if (!children || !children.length) return false;
  return children.every((c) => c.opts && c.opts.italics);
}
function runsAreBoldColored(children) {
  if (!children || !children.length) return false;
  return children.some((c) => c.opts && c.opts.bold && c.opts.color && c.opts.color !== "000000");
}

// Convert a flat list of fake Paragraph/Table objects into a tree of {type, ...}
function convertNode(node) {
  if (node.__t === "table") {
    const rows = node.opts.rows || [];
    const headerRow = rows[0];
    const header = (headerRow.opts.children || []).map((cell) => runsToText(cell.opts.children[0].opts.children));
    const bodyRows = rows.slice(1).map((r) =>
      (r.opts.children || []).map((cell) => runsToText(cell.opts.children[0].opts.children))
    );
    return { type: "table", header, rows: bodyRows };
  }
  if (node.__t === "paragraph") {
    const o = node.opts;
    // Image paragraph
    if (o.children && o.children.length === 1 && o.children[0].__t === "image") {
      return { type: "image", src: imgToDataUri(o.children[0].opts.imgFile) };
    }
    // Image caption (italic, small, centered, gray)
    if (o.alignment === "center" && o.children && runsAreItalic(o.children) &&
        o.children[0].opts.size === 18) {
      return { type: "caption", text: runsToText(o.children) };
    }
    if (o.heading === "H1") return { type: "h1", text: o.text || runsToText(o.children) };
    if (o.heading === "H2") return { type: "h2", text: o.text || runsToText(o.children) };
    if (o.heading === "H3") return { type: "h3", text: o.text || runsToText(o.children) };
    if (o.bullet) return { type: "bullet", text: o.text || runsToText(o.children) };
    // Quote block: has a left border
    if (o.border && o.border.left) return { type: "quote", text: runsToText(o.children) };
    // Bold colored single-line "label" paragraph e.g. "Gabarito comentado"
    if (o.children && runsAreBoldColored(o.children) && o.children.length === 1) {
      return { type: "label", text: runsToText(o.children) };
    }
    // default paragraph
    const text = o.text !== undefined ? o.text : runsToText(o.children);
    return { type: "p", text };
  }
  return null;
}

function convertModule(arr) {
  const nodes = arr.map(convertNode).filter(Boolean);
  // merge image + caption
  const merged = [];
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].type === "image" && nodes[i + 1] && nodes[i + 1].type === "caption") {
      merged.push({ type: "image", src: nodes[i].src, caption: nodes[i + 1].text });
      i++;
    } else {
      merged.push(nodes[i]);
    }
  }
  return merged;
}

// Split a converted module's node list into: title, body nodes, and quiz sections
// A quiz section starts at an h3 node whose text starts with "Exercícios de fixação"
// followed by "p" nodes (questions, numbered), then a "label" node "Gabarito comentado",
// then more "p" nodes (answers, numbered).
function extractQuizzes(nodes) {
  const body = [];
  const quizzes = [];
  let i = 0;
  while (i < nodes.length) {
    const n = nodes[i];
    if (n.type === "h3" && /^Exerc[ií]cios de fixa/i.test(n.text)) {
      const quizTitle = n.text;
      i++;
      const questions = [];
      while (i < nodes.length && nodes[i].type === "p") {
        questions.push(nodes[i].text.replace(/^\d+\.\s*/, ""));
        i++;
      }
      let answers = [];
      if (i < nodes.length && nodes[i].type === "label") {
        i++;
        while (i < nodes.length && nodes[i].type === "p") {
          answers.push(nodes[i].text.replace(/^\d+\.\s*/, ""));
          i++;
        }
      }
      quizzes.push({ title: quizTitle, questions, answers });
    } else {
      body.push(n);
      i++;
    }
  }
  return { body, quizzes };
}

function buildModule(id, arr) {
  const nodes = convertModule(arr);
  const titleNode = nodes.find((n) => n.type === "h1");
  const title = titleNode ? titleNode.text : "Módulo";
  const rest = nodes.filter((n) => n !== titleNode);
  const { body, quizzes } = extractQuizzes(rest);
  return { id, title, body, quizzes };
}

const modules = [
  buildModule("m0", m0mod.m0),
  buildModule("m1", base.m1),
  buildModule("m2", base.m2),
  buildModule("m3", base.m3),
  buildModule("m4", base.m4),
  buildModule("m5", base.m5),
  buildModule("m6", part2.m6),
  buildModule("m7", part2.m7),
  buildModule("m8", part2.m8),
  buildModule("m9", part2.m9),
  buildModule("m10", part2.m10),
  buildModule("m11", part2.m11),
  buildModule("m12", part2.m12),
  buildModule("m13", part2.m13),
  buildModule("m14", adv.m14b),
  buildModule("m15", adv.m15),
  buildModule("m16", part3.m14),
  buildModule("m17", part3.m17),
];

fs.writeFileSync("/tmp/content.json", JSON.stringify(modules, null, 0));
console.log("Modules:", modules.length);
modules.forEach((m) => console.log(m.id, "-", m.title, "| body nodes:", m.body.length, "| quizzes:", m.quizzes.length));
