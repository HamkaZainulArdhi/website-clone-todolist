import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage = body.message || "Halo";

    const response = await axios.post(
      "https://api.deepenglish.com/api/gpt_open_ai/chatnew",
      {
        messages: [
          { role: "user", content: userMessage },
          {
            role: "system",
            content:
              "Gunakan bahasa Indonesia yang non formal, sifat mu acuh ta acuh dan malas namun tetap menjawab dengan nada kesal",
          },
        ],
        temperature: 1,
        projectName: "wordpress",
      },
      {
        headers: {
          Authorization: "Bearer UFkOfJaclj61OxoD7MnQknU1S2XwNdXMuSZA+EZGLkc=",
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("🔥 ERROR:", error);
    return NextResponse.json(
      { message: "Gagal memproses permintaan." },
      { status: 500 },
    );
  }
}
