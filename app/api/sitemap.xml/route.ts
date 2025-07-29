import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://hamkacv.vercel.app";

  const routes = [
    { path: "", lastmod: "2025-07-29", changefreq: "monthly", priority: 1.0 },
    {
      path: "/about",
      lastmod: "2025-07-29",
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      path: "/achievements",
      lastmod: "2025-07-29",
      changefreq: "monthly",
      priority: 0.7,
    },
    {
      path: "/projects",
      lastmod: "2025-07-29",
      changefreq: "monthly",
      priority: 0.7,
    },
    {
      path: "/dashboard",
      lastmod: "2025-07-29",
      changefreq: "monthly",
      priority: 0.6,
    },
    {
      path: "/chat",
      lastmod: "2025-07-29",
      changefreq: "monthly",
      priority: 0.6,
    },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes
      .map(
        ({ path, lastmod, changefreq, priority }) => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>
      </url>`,
      )
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
