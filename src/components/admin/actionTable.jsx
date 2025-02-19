"use client";
import React from "react";
import { Pencil, Trash } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "../ui/button";
import { deleteCampaignAction } from "@/app/actions/Campaignaction";

const ActionTable = ({ id }) => {
  const handleEdit = () => {
    redirect(`/admin/campaign/${url}/edit`);
  };

  const handleClick = async () => {
    await deleteCampaignAction(id);
  };
  return (
    <div className="flex gap-2">
      <Button size="sm" variant="outline" onClick={handleEdit}>
        <Pencil size={20} />
      </Button>
      <Button size="sm" variant="outline" onClick={handleClick}>
        <Trash size={20} />
      </Button>
    </div>
  );
};

export default ActionTable;
