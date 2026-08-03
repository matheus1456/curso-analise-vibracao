// Fake "docx" module: records structure as plain JSON-able objects instead of building a real docx.
class Paragraph { constructor(opts) { this.__t = "paragraph"; this.opts = opts || {}; } }
class TextRun {
  constructor(opts) {
    this.__t = "run";
    this.opts = typeof opts === "string" ? { text: opts } : (opts || {});
  }
}
class ImageRun { constructor(opts) { this.__t = "image"; this.opts = opts || {}; } }
class Table { constructor(opts) { this.__t = "table"; this.opts = opts || {}; } }
class TableRow { constructor(opts) { this.__t = "row"; this.opts = opts || {}; } }
class TableCell { constructor(opts) { this.__t = "cell"; this.opts = opts || {}; } }
class PageBreak { constructor() { this.__t = "pagebreak"; } }
class TableOfContents { constructor(a, b) { this.__t = "toc"; } }
class Header { constructor(opts) { this.__t = "header"; this.opts = opts || {}; } }
class Footer { constructor(opts) { this.__t = "footer"; this.opts = opts || {}; } }
class Document { constructor(opts) { this.__t = "document"; this.opts = opts || {}; } }

const HeadingLevel = { HEADING_1: "H1", HEADING_2: "H2", HEADING_3: "H3", HEADING_4: "H4" };
const AlignmentType = { CENTER: "center", LEFT: "left", RIGHT: "right", JUSTIFIED: "justified" };
const WidthType = { DXA: "dxa", PERCENTAGE: "pct", AUTO: "auto" };
const ShadingType = { CLEAR: "clear", SOLID: "solid" };
const BorderStyle = { SINGLE: "single", NONE: "none" };
const PageNumber = { CURRENT: "PAGE" };
const LevelFormat = { BULLET: "bullet", DECIMAL: "decimal" };
const VerticalAlign = { CENTER: "center", TOP: "top", BOTTOM: "bottom" };
const PositionalTabAlignment = { RIGHT: "right" };
const PositionalTabLeader = { DOT: "dot" };
function convertInchesToTwip(n) { return n * 1440; }
const Packer = { toBuffer: async () => Buffer.from("") };

module.exports = {
  Paragraph, TextRun, ImageRun, Table, TableRow, TableCell, PageBreak, TableOfContents,
  Header, Footer, Document, Packer,
  HeadingLevel, AlignmentType, WidthType, ShadingType, BorderStyle, PageNumber, LevelFormat,
  VerticalAlign, PositionalTabAlignment, PositionalTabLeader, convertInchesToTwip,
};
