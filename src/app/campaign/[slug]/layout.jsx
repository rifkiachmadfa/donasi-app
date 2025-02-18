import ButtonDonasi from "@/components/buttonDonasi";

export default function CampaignLayout({ children }) {
  return (
    <>
      <section className="mb-40">{children}</section>
      <ButtonDonasi />
    </>
  );
}
