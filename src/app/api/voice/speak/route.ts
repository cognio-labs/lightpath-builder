import { NextRequest } from "next/server";
import { POST as ttsPost } from "../../tts/route";

export async function POST(request: NextRequest) {
  return ttsPost(request);
}
