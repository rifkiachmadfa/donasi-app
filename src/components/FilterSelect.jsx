"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategory } from "../app/context/categoryContext";

const FilterSelect = ({ category }) => {
  const { selectedCategory, setSelectedCategory } = useCategory();

  return (
    <Select
      value={selectedCategory}
      onValueChange={(value) => setSelectedCategory(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Kategori" />
      </SelectTrigger>
      <SelectContent>
        {category.map((cat) => (
          <SelectItem value={cat.name} key={cat.id}>
            {cat.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterSelect;
