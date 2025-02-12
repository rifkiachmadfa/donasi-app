import React from "react";
import { getDetailCampaign } from "./repo/campaign";

const durasiCampaign = (url, durasi) => {
  let durasiCampaign = 0;
  const data = getDetailCampaign(url);
  switch (durasi) {
    case 30:
      durasiCampaign = "30 hari";
      break;
    case 60:
      durasiCampaign = "60 hari";
      break;
    case 90:
      durasiCampaign = "90 hari";
      break;
    case 120:
      durasiCampaign = "120 hari";
      break;
    default:
      durasiCampaign = "tidak ditentukan";
  }
};

export default durasiCampaign;
