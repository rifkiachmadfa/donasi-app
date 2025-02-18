"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ThumbnailUpload from "./thumbnailUpload";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { uploadThumbnail } from "@/services/uploadService";
import { createCampaignAction } from "@/app/actions/Campaignaction";
import Tiptap from "./text-editor/tiptap";
import DurasiCampaignSelect from "./durasiCampaign";
import { Checkbox } from "@/components/ui/checkbox";
const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "judul harus lebih dari 2 karakter",
    })
    .max(80, {
      message: "judul terlalu panjang",
    }),
  url: z.string().regex(/^[a-z]+$/, {
    message: "URL hanya boleh berisi huruf dan angka",
  }),
  content: z.string().min(1, { message: "konten tidak boleh kosong" }),
  target: z.string(),
  durasi: z.number(),
  category: z
    .array(z.number())
    .nonempty({ message: "Pilih minimal 1 kategori" }),
});

const CreateCampaign = ({ category }) => {
  const categories = category;
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
      content: "",
      target: 0,
      durasi: 0,
      category: [],
    },
  });
  const { toast } = useToast();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (file) => {
    setFile(file);
  };
  console.log("Category field value:", form.watch("category"));
  const onSubmit = async (values) => {
    try {
      if (!file) throw new Error("Silakan pilih file terlebih dahulu");

      setIsLoading(true);

      const imageUrl = await uploadThumbnail(file);

      const url = imageUrl.data.publicUrl;
      const formattedValues = {
        ...values,
        target: BigInt(values.target),
      };
      console.log("kategori terpilih", values.category);
      const createCampaign = await createCampaignAction(formattedValues, url);

      if (!createCampaign?.success) {
        throw new Error(createCampaign.message);
      }

      toast({ title: "Success", description: "Campaign berhasil dibuat!" });
      router.push("/admin/campaign");
    } catch (error) {
      toast({ title: "Error", description: error.message });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="p-4 h-full min-h-screen flex flex-col ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ThumbnailUpload
              onChange={(fileName) => handleFileChange(fileName)}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Campaign</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Program Makan Siang Gratis..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Donasi</FormLabel>
                  <FormControl>
                    <div className="flex gap-2 items-center">
                      <div>
                        <span>Rp </span>
                      </div>
                      <Input
                        placeholder=""
                        {...field}
                        type="text"
                        value={
                          field.value
                            ? Number(field.value).toLocaleString("id-ID")
                            : ""
                        }
                        onChange={(e) => {
                          const rawValue = e.target.value.replace(/\D/g, ""); // Hanya angka
                          field.onChange(rawValue); // Simpan tanpa format
                        }}
                        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="durasi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Durasi Campaign</FormLabel>
                  <FormControl>
                    <DurasiCampaignSelect
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Buat Url</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="namaprogram"
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex-grow">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Tiptap
                        contentForm={field.value || ""}
                        onChangeForm={field.onChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategori</FormLabel>
                    <div className="grid grid-cols-2 gap-4">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            checked={
                              Array.isArray(field.value) &&
                              field.value.includes(category.id)
                            }
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, category.id]); // Tambahkan kategori
                              } else {
                                field.onChange(
                                  field.value.filter((c) => c !== category.id)
                                ); // Hapus kategori
                              }
                              console.log(
                                "Updated Category field value:",
                                field.value
                              ); // Debugging
                            }}
                          />

                          <FormLabel>{category.name}</FormLabel>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                disabled={isLoading}
                onClick={() => router.back()}
                variant="outline"
              >
                cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
};

export default CreateCampaign;
