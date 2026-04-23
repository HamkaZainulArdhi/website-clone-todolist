import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { slug: string } },
) => {
  try {
    // Chat functionality is now stateless - no database operations needed
    // This endpoint returns success for API compatibility
    return NextResponse.json("Operation completed", { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
};
