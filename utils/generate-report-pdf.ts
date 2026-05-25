import type { jsPDF } from "jspdf";
import type { AnalysisResult } from "@/types/analysis";

const MARGIN = 48;
const SECTION_GAP = 22;

function lineHeight(fontSize: number): number {
  return fontSize * 1.45;
}

/** Draw wrapped text and return the Y position below the last line. */
function addWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  fontSize: number,
  style: "normal" | "bold" = "normal"
): number {
  doc.setFontSize(fontSize);
  doc.setFont("helvetica", style);
  const lh = lineHeight(fontSize);
  const lines = doc.splitTextToSize(text, maxWidth) as string[];

  lines.forEach((line, index) => {
    doc.text(line, x, y + index * lh);
  });

  return y + lines.length * lh + 6;
}

function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (y + needed > pageHeight - MARGIN) {
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
  return y + 18;
}

export async function downloadReportPdf(
  data: AnalysisResult,
  targetRole: string
): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - MARGIN * 2;
  let y = MARGIN;

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

  y = 100;
  doc.setTextColor(30, 30, 40);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`Target role: ${targetRole}`, MARGIN, y);
  y += 16;
  doc.text(
    `Generated: ${new Date().toLocaleDateString("en-US", { dateStyle: "medium" })}`,
    MARGIN,
    y
  );
  y += SECTION_GAP + 4;

  y = ensureSpace(doc, y, 120);
  y = sectionHeading(doc, "CORE DIAGNOSIS", y);
  doc.setTextColor(20, 20, 30);
  y = addWrappedText(doc, data.coreDiagnosis, MARGIN, y, maxWidth, 13, "bold");
  y += 4;

  if (data.roleFitVerdict) {
    y = ensureSpace(doc, y, 80);
    y = sectionHeading(doc, "ROLE FIT", y);
    doc.setTextColor(70, 70, 90);
    y = addWrappedText(doc, data.roleFitVerdict, MARGIN, y, maxWidth, 10, "normal");
    y += SECTION_GAP - 8;
  }

  y = ensureSpace(doc, y, 100);
  y = sectionHeading(doc, "RECRUITER 7-SECOND SCAN", y);
  doc.setTextColor(40, 40, 55);
  doc.setFont("helvetica", "normal");
  for (const item of data.recruiterScan) {
    y = ensureSpace(doc, y, 40);
    y = addWrappedText(doc, `• ${item}`, MARGIN, y, maxWidth, 10);
    y += 4;
  }
  y += SECTION_GAP - 12;

  y = ensureSpace(doc, y, 80);
  y = sectionHeading(doc, "TOP HIRING RISKS", y);
  data.topHiringRisks.forEach((risk, i) => {
    y = ensureSpace(doc, y, 70);
    doc.setTextColor(30, 30, 45);
    y = addWrappedText(
      doc,
      `${i + 1}. ${risk.title}`,
      MARGIN,
      y,
      maxWidth,
      11,
      "bold"
    );
    y += 2;
    doc.setTextColor(60, 60, 75);
    y = addWrappedText(doc, risk.description, MARGIN, y, maxWidth, 10);
    y += 8;
  });

  y = ensureSpace(doc, y, 120);
  y = sectionHeading(doc, "SMART REWRITE", y);
  doc.setTextColor(120, 120, 130);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Before", MARGIN, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 90);
  y = addWrappedText(doc, data.rewriteExample.before, MARGIN, y, maxWidth, 10);
  y += 6;
  doc.setTextColor(79, 70, 229);
  doc.setFont("helvetica", "bold");
  doc.text("After", MARGIN, y);
  y += 14;
  doc.setTextColor(30, 30, 45);
  y = addWrappedText(
    doc,
    data.rewriteExample.after,
    MARGIN,
    y,
    maxWidth,
    10,
    "bold"
  );
  y += 6;
  doc.setTextColor(60, 60, 75);
  y = addWrappedText(
    doc,
    `Why better: ${data.rewriteExample.explanation}`,
    MARGIN,
    y,
    maxWidth,
    10
  );

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
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
