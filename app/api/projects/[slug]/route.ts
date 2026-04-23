import { NextResponse } from "next/server";

import { getProjectsDataBySlug } from "@/services/projects";

export const GET = async (
  req: Request,
  { params }: { params: { slug: string } },
) => {
  try {
    const { slug } = params;
    const data = getProjectsDataBySlug(slug);

    if (!data) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
