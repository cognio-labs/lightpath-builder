import { NextRequest } from "next/server";
import { POST as divineAiPost } from "../../divine-ai/route";

export async function POST(request: NextRequest) {
  return divineAiPost(request);
}
