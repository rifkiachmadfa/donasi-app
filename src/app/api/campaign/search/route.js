import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import SuperJSON from "superjson";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.trim() || "";

    console.log("Query yang diterima:", query);

    const results = await db.campaign.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    // Ubah BigInt ke string hanya untuk field yang perlu
    const serializedResults = results.map((campaign) => ({
      ...campaign,
      target: campaign.target ? campaign.target.toString() : null, // Cek jika target ada
    }));

    return new NextResponse(
      SuperJSON.stringify({ results: serializedResults }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error di API:", error);

    return new NextResponse(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
