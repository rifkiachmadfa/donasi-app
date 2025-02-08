import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const ThumbnailUpload = ({ onChange, previewUrls }) => {
  const [previewUrl, setPreviewUrl] = useState(previewUrls);
  const [file, setFile] = useState(null); // Simpan file asli di state lokal

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // Simpan URL preview di state lokal
        setFile(file); // Simpan file asli di state lokal
        onChange(file); // Kirim file ke parent
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
      setFile(null);
      toast({
        title: "Error",
        description: "Silakan unggah file gambar yang valid.",
      });
    }
  };

  return (
    <div className="h-[240px] w-full relative">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="thumbnail-upload"
      />
      <label
        htmlFor="thumbnail-upload"
        className={cn(
          "border-2 border-dashed rounded-md  cursor-pointer w-full relative overflow-hidden flex items-center justify-center aspect-[16/9]", // aspect-[16/9] untuk rasio 16:9
          previewUrl && "border-none" // Hilangkan border jika ada preview
        )}
        type="button"
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt="Preview"
            width={500}
            height={281.25} // 500 * (9 / 16) = 281.25
            className="rounded-md object-cover w-full h-full" // Rounded di image
          />
        ) : (
          <p className="text-center text-gray-500">Upload Thumbnail Campaign</p>
        )}
      </label>
    </div>
  );
};

export default ThumbnailUpload;
