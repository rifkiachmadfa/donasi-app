"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FilterSelect = ({ category, setIsCategory }) => {
  const categories = category;
  console.log(categories);

  return (
    <>
      <Select onValueChange={(value) => setIsCategory(value)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Kategori" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem value={category.name} key={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default FilterSelect;
