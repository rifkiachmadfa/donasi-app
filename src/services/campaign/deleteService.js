import { db } from "@/lib/db";

export const deleteCampaign = async (id) => {
  console.log("ID diterima di deleteCampaign:", id, "Type:", typeof id);

  if (!id) {
    throw new Error("ID tidak boleh null atau undefined.");
  }

  try {
    // Cek apakah campaign dengan ID tersebut ada
    const existingCampaign = await db.campaign.findUnique({
      where: { id },
    });

    if (!existingCampaign) {
      console.error(`Campaign dengan ID '${id}' tidak ditemukan.`);
      throw new Error(`Campaign dengan ID '${id}' tidak ditemukan.`);
    }

    console.log("Campaign ditemukan, siap dihapus.");

    // Hapus semua relasi terlebih dahulu
    await db.campaignCategory.deleteMany({
      where: { campaignId: id },
    });

    await db.campaignDonors.deleteMany({
      where: { campaignId: id },
    });

    await db.news.deleteMany({
      where: { campaignId: id },
    });

    // Hapus campaign
    const deletedCampaign = await db.campaign.delete({
      where: { id },
    });

    console.log("Campaign berhasil dihapus:", deletedCampaign);
    return {
      success: true,
      message: "Campaign berhasil dihapus.",
      data: deletedCampaign,
    };
  } catch (error) {
    console.error("Error deleting campaign:", error);
    throw error;
  }
};
