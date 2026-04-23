import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // Simple middleware for static content site - no authentication needed
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  return response;
};
