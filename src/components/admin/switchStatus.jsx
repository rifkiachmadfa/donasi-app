"use client";
import React from "react";
import { Switch } from "../ui/switch";
import { useState } from "react";

const SwitchStatus = (published) => {
  if (published == false) {
    setIsOn(false);
  }
  const [isOn, setIsOn] = useState(false);
  return <Switch checked={isOn} onCheckedChange={setIsOn} />;
};

export default SwitchStatus;
