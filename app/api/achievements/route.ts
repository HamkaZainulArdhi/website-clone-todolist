import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

import { getAchievementsData } from "@/services/achievements";

export const GET = async (req: NextRequest) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const queryCategory = searchParams.get("category");
    const querySearch = searchParams.get("search");

    const data = getAchievementsData({
      category: queryCategory || undefined,
      search: querySearch || undefined,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
