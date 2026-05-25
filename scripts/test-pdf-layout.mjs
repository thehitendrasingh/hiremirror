/**
 * Generate a sample PDF with long overlapping-prone content.
 * Run: node scripts/test-pdf-layout.mjs
 * Output: /tmp/hiremirror-pdf-test.pdf
 */

import { writeFileSync } from "fs";
import { pathToFileURL } from "url";

// Dynamic import built TS via tsx alternative - use jspdf directly
import { jsPDF } from "jspdf";

const sample = {
  coreDiagnosis:
    "Your resume likely loses recruiter attention because it signals execution-heavy work instead of strategic ownership, with multiple 3–8 month stints that read as instability for a senior Technical PM role.",
  roleFitVerdict:
    "Profile reads strong mid-level IC transitioning into PM; this JD expects senior-level scope, multi-quarter ownership, and executive stakeholder credibility.",
  recruiterScan: [
    "(Level) Title progression unclear vs 6–8 year band",
    "(Risk) Short tenures at 4 companies in 3 years",
    "(Stack) LLM product experience is credible",
    "(Impact) Metrics present but lack business context",
  ],
  topHiringRisks: [
    {
      title: "Level mismatch",
      description: "Bullets describe feature delivery, not roadmap or team outcomes expected at this band.",
    },
    {
      title: "Job hopping pattern",
      description: "Recruiters will question commitment before reading skills.",
    },
    {
      title: "AI-polished phrasing",
      description: "Generic verbs without verifiable scale signal template resume.",
    },
  ],
  rewriteExample: {
    before: "Collaborated with engineering teams to deliver features",
    after:
      "Led cross-functional delivery of 3 MVP launches with engineering, improving activation by 18% over 2 quarters",
    explanation:
      "Adds ownership, timeframe, metric, and PM scope visible in a 7-second scan.",
  },
};

const MARGIN = 48;
function lineHeight(fontSize) {
  return fontSize * 1.45;
}
function addWrappedText(doc, text, x, y, maxWidth, fontSize, style = "normal") {
  doc.setFontSize(fontSize);
  doc.setFont("helvetica", style);
  const lh = lineHeight(fontSize);
  const lines = doc.splitTextToSize(text, maxWidth);
  lines.forEach((line, i) => doc.text(line, x, y + i * lh));
  return y + lines.length * lh + 6;
}

const doc = new jsPDF({ unit: "pt", format: "a4" });
const maxWidth = doc.internal.pageSize.getWidth() - MARGIN * 2;
let y = 100;

doc.setFont("helvetica", "bold");
doc.setFontSize(9);
doc.text("CORE DIAGNOSIS", MARGIN, y);
y += 18;
y = addWrappedText(doc, sample.coreDiagnosis, MARGIN, y, maxWidth, 13, "bold");
y += 8;
doc.text("ROLE FIT", MARGIN, y);
y += 18;
y = addWrappedText(doc, sample.roleFitVerdict, MARGIN, y, maxWidth, 10);

const out = "/tmp/hiremirror-pdf-test.pdf";
const buf = Buffer.from(doc.output("arraybuffer"));
writeFileSync(out, buf);
console.log(`Wrote ${out} (${buf.length} bytes)`);
