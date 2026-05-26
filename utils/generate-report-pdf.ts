import type { jsPDF } from "jspdf";
import type { AnalysisResult } from "@/types/analysis";

const MARGIN = 48;
const PAGE_HEIGHT_PADDING = 40;
const SECTION_GAP = 24;
const ITEM_GAP = 14;

function getContentWidth(doc: jsPDF): number {
  return doc.internal.pageSize.getWidth() - MARGIN * 2;
}

/**
 * Calculate how many lines a text will wrap into at a given width & fontSize.
 */
function calcWrappedLines(
  doc: jsPDF,
  text: string,
  maxWidth: number,
  fontSize: number
): string[] {
  doc.setFontSize(fontSize);
  return doc.splitTextToSize(text, maxWidth) as string[];
}

/**
 * Get the vertical height that wrapped text will occupy.
 */
function calcTextBlockHeight(doc: jsPDF, text: string, maxWidth: number, fontSize: number): number {
  const lh = fontSize * 1.45;
  const lines = calcWrappedLines(doc, text, maxWidth, fontSize);
  return lines.length * lh;
}

/**
 * Draw wrapped text with automatic page-break support.
 * Returns the Y position below the last rendered line.
 */
function drawWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number,
  opts?: { bold?: boolean; color?: [number, number, number] }
): number {
  const lh = fontSize * 1.45;
  const pageHeight = doc.internal.pageSize.getHeight();
  const lines = calcWrappedLines(doc, text, maxWidth, fontSize);

  doc.setFontSize(fontSize);
  doc.setFont("helvetica", opts?.bold ? "bold" : "normal");
  if (opts?.color) {
    doc.setTextColor(opts.color[0], opts.color[1], opts.color[2]);
  }

  for (let i = 0; i < lines.length; i++) {
    if (y + lh > pageHeight - PAGE_HEIGHT_PADDING) {
      doc.addPage();
      y = MARGIN;
    }
    doc.text(lines[i], x, y);
    y += lh;
  }

  return y + 4;
}

/**
 * Ensure there's enough room for `requiredHeight` pt. If not, add a new page.
 */
function ensureCapacity(
  doc: jsPDF,
  y: number,
  requiredHeight: number
): number {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (y + requiredHeight > pageHeight - PAGE_HEIGHT_PADDING) {
    doc.addPage();
    return MARGIN;
  }
  return y;
}

function sectionHeading(doc: jsPDF, title: string, y: number): number {
  doc.setTextColor(79, 70, 229);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text(title, MARGIN, y);
  return y + 22;
}

export async function downloadReportPdf(
  data: AnalysisResult,
  targetRole: string
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = getContentWidth(doc);
  let y = MARGIN;

  // ── Header block ──
  doc.setFillColor(15, 15, 20);
  doc.rect(0, 0, pageWidth, 80, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("HireMirror", MARGIN, 44);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(180, 180, 200);
  doc.text("Tech hiring visibility report", MARGIN, 62);

  // ── Metadata line ──
  y = 100;
  doc.setTextColor(30, 30, 40);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Target role: ${targetRole}`, MARGIN, y);
  y += 18;
  doc.setTextColor(120, 120, 130);
  doc.text(
    `Generated: ${new Date().toLocaleDateString("en-US", { dateStyle: "medium" })}`,
    MARGIN,
    y
  );
  y += SECTION_GAP + 10;

  // ── 1. Interview Probability ──
  {
    const headingH = 22;
    const scoreBlockH = 36;
    const explH = data.interviewProbability?.explanation
      ? calcTextBlockHeight(doc, data.interviewProbability.explanation, maxWidth, 10) + 6
      : 0;
    y = ensureCapacity(doc, y, headingH + scoreBlockH + explH + 4);
    y = sectionHeading(doc, "INTERVIEW PROBABILITY", y);

    // Score — draw close to heading, near explanation
    doc.setTextColor(20, 20, 30);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    const scoreBaseline = y + 12;
    doc.text(`${data.interviewProbability?.score ?? 0}%`, MARGIN, scoreBaseline);
    // font-28 descends ≈7pt below baseline; +14 gives 7pt clean gap to explanation
    y = scoreBaseline + 14;

    if (data.interviewProbability?.explanation) {
      y = drawWrappedText(doc, data.interviewProbability.explanation, MARGIN, y, maxWidth, 10, {
        color: [70, 70, 90],
      });
    }
    y += SECTION_GAP;
  }

  // ── 2. Core Diagnosis ──
  {
    const headingH = 22;
    const diagH = calcTextBlockHeight(doc, data.coreDiagnosis, maxWidth, 13);
    const fitH = data.roleFitVerdict
      ? calcTextBlockHeight(doc, data.roleFitVerdict, maxWidth, 10) + 12
      : 0;
    y = ensureCapacity(doc, y, headingH + diagH + fitH + 8);
    y = sectionHeading(doc, "CORE DIAGNOSIS", y);
    y = drawWrappedText(doc, data.coreDiagnosis, MARGIN, y, maxWidth, 13, {
      bold: true,
      color: [20, 20, 30],
    });

    if (data.roleFitVerdict) {
      y = ensureCapacity(doc, y, headingH + calcTextBlockHeight(doc, data.roleFitVerdict, maxWidth, 10));
      y = sectionHeading(doc, "ROLE FIT", y);
      y = drawWrappedText(doc, data.roleFitVerdict, MARGIN, y, maxWidth, 10, {
        color: [70, 70, 90],
      });
    }
    y += 6;
  }

  // ── 3. Strengths ──
  if (data.strengths && data.strengths.length > 0) {
    const headingH = 22;
    let strengthsH = 0;
    for (const s of data.strengths) {
      strengthsH += calcTextBlockHeight(doc, `+ ${s}`, maxWidth, 10) + 6;
    }
    y = ensureCapacity(doc, y, headingH + strengthsH + 4);
    y = sectionHeading(doc, "STRENGTHS", y);
    for (const item of data.strengths) {
      const h = calcTextBlockHeight(doc, `+ ${item}`, maxWidth, 10);
      y = ensureCapacity(doc, y, h + 4);
      y = drawWrappedText(doc, `+ ${item}`, MARGIN, y, maxWidth, 10, {
        color: [50, 70, 60],
      });
    }
    y += ITEM_GAP;
  }

  // ── 4. Recruiter 7-Second Scan ──
  {
    const headingH = 22;
    let scanH = 0;
    for (const item of data.recruiterScan) {
      scanH += calcTextBlockHeight(doc, `• ${item}`, maxWidth, 10) + 6;
    }
    y = ensureCapacity(doc, y, headingH + scanH + 4);
    y = sectionHeading(doc, "RECRUITER 7-SECOND SCAN", y);
    for (const item of data.recruiterScan) {
      const h = calcTextBlockHeight(doc, `• ${item}`, maxWidth, 10);
      y = ensureCapacity(doc, y, h + 4);
      y = drawWrappedText(doc, `• ${item}`, MARGIN, y, maxWidth, 10, {
        color: [40, 40, 55],
      });
    }
    y += ITEM_GAP;
  }

  // ── 5. Top Hiring Risks ──
  {
    const headingH = 22;
    let risksH = 0;
    for (const risk of data.topHiringRisks) {
      risksH += 12 + calcTextBlockHeight(doc, risk.title, maxWidth, 11) + 2;
      risksH += calcTextBlockHeight(doc, risk.description, maxWidth, 10) + 10;
    }
    y = ensureCapacity(doc, y, headingH + risksH + 4);
    y = sectionHeading(doc, "TOP HIRING RISKS", y);
    data.topHiringRisks.forEach((risk) => {
      const titleH = calcTextBlockHeight(doc, risk.title, maxWidth, 11);
      const descH = calcTextBlockHeight(doc, risk.description, maxWidth, 10);
      y = ensureCapacity(doc, y, 14 + titleH + descH);
      y = drawWrappedText(doc, risk.title, MARGIN, y, maxWidth, 11, {
        bold: true,
        color: [30, 30, 45],
      });
      y += 2;
      y = drawWrappedText(doc, risk.description, MARGIN, y, maxWidth, 10, {
        color: [60, 60, 75],
      });
      y += 10;
    });
  }

  // ── 6. Improvement Suggestions ──
  if (data.improvementSuggestions && data.improvementSuggestions.length > 0) {
    const headingH = 22;
    let suggestionsH = 0;
    for (const s of data.improvementSuggestions) {
      suggestionsH += calcTextBlockHeight(doc, s, maxWidth, 10) + 8;
    }
    y = ensureCapacity(doc, y, headingH + suggestionsH + 4);
    y = sectionHeading(doc, "IMPROVEMENT SUGGESTIONS", y);
    data.improvementSuggestions.forEach((suggestion) => {
      const h = calcTextBlockHeight(doc, suggestion, maxWidth, 10);
      y = ensureCapacity(doc, y, h + 6);
      const idx = data.improvementSuggestions!.indexOf(suggestion) + 1;
      y = drawWrappedText(doc, `${idx}. ${suggestion}`, MARGIN, y, maxWidth, 10, {
        color: [40, 40, 55],
      });
    });
    y += ITEM_GAP;
  }

  // ── 7. Smart Rewrite ──
  {
    const headingH = 22;
    const beforeH = calcTextBlockHeight(doc, data.rewriteExample.before, maxWidth, 10);
    const afterH = calcTextBlockHeight(doc, data.rewriteExample.after, maxWidth, 10);
    const whyH = calcTextBlockHeight(
      doc,
      `Why better: ${data.rewriteExample.explanation}`,
      maxWidth,
      10
    );
    const totalH = headingH + 16 + beforeH + 12 + 16 + afterH + 12 + whyH + 20;
    y = ensureCapacity(doc, y, totalH + 4);
    y = sectionHeading(doc, "SMART REWRITE", y);

    // Before
    doc.setTextColor(120, 120, 130);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Before", MARGIN, y);
    y += 16;
    y = drawWrappedText(doc, data.rewriteExample.before, MARGIN, y, maxWidth, 10, {
      color: [80, 80, 90],
    });
    y += 10;

    // After
    y = ensureCapacity(doc, y, 16 + afterH);
    doc.setTextColor(79, 70, 229);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("After", MARGIN, y);
    y += 16;
    y = drawWrappedText(doc, data.rewriteExample.after, MARGIN, y, maxWidth, 10, {
      bold: true,
      color: [30, 30, 45],
    });
    y += 10;

    // Why
    y = ensureCapacity(doc, y, whyH + 4);
    y = drawWrappedText(doc, `Why better: ${data.rewriteExample.explanation}`, MARGIN, y, maxWidth, 10, {
      color: [60, 60, 75],
    });
  }

  // ── Page Footers ──
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(150, 150, 160);
    doc.text(
      `HireMirror · Confidential · Page ${i} of ${pageCount}`,
      MARGIN,
      doc.internal.pageSize.getHeight() - 24
    );
  }

  const slug = targetRole
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  doc.save(`hiremirror-${slug || "report"}.pdf`);
}