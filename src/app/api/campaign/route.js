import { getAllCampaign } from "@/lib/repo/campaign";
import { NextRequest, NextResponse } from "next/server";

function errorResponse(message, status = 500) {
  return NextResponse.json({ message }, { status });
}

export async function GET() {
  try {
    const res = await getAllCampaign();

    if (!res) {
      return errorResponse("Internal Server Error");
    }

    if (!Array.isArray(res) || res.some((c) => !c.target)) {
      return errorResponse("Invalid data structure");
    }

    const data = res.map((campaign) => {
      if (
        typeof campaign.target === "bigint" &&
        campaign.target > Number.MAX_SAFE_INTEGER
      ) {
        throw new Error("Target value exceeds safe integer range");
      }

      return {
        ...campaign,
        target: Number(campaign.target),
      };
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return errorResponse("Internal Server Error");
  }
}
