import { NextRequest, NextResponse } from "next/server";
import { POST as voiceChatPost } from "../voice/chat/route";

export async function POST(request: NextRequest) {
  return voiceChatPost(request);
}
