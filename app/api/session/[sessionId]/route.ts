import { NextResponse } from "next/server";
import { getSessionReport } from "@/lib/session-store";

type Params = {
  params: Promise<{ sessionId: string }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { sessionId } = await params;
  const report = getSessionReport(sessionId);
  if (!report) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          message: "Report not found. Please run a new analysis.",
        },
      },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true, report });
}
