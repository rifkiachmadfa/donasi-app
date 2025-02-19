"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bigint, string, z } from "zod";
import DurasiCampaignSelect from "./durasiCampaign";
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
import { uploadThumbnail, updateThumbnail } from "@/services/uploadService";
import { editCampaignAction } from "@/app/actions/Campaignaction";
import Tiptap from "./text-editor/tiptap";
import { Checkbox } from "../ui/checkbox";
const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "judul harus lebih dari 2 karakter",
    })
    .max(50, {
      message: "judul terlalu panjang",
    }),
  content: z.string(),
  target: z.string(),
  durasi: z.number(),
});

const EditCampaign = ({ campaign, category }) => {
  const categories = category;
  const router = useRouter();
  const content = campaign.content;
  const target = campaign.target;

  console.log(campaign.categories);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: campaign.title,
      content: content,
      target: String(target),
      durasi: campaign.durasi,
    },
  });

  const { toast } = useToast();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (file) => {
    setFile(file);
  };
  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      let imageUrl;
      let url;
      if (!file) {
        imageUrl = campaign.imageThumb;
        url = imageUrl;
      } else {
        imageUrl = await updateThumbnail(file);
        url = imageUrl.data.publicUrl;
      }
      const link = campaign.url;
      const formattedValues = {
        ...values,
        target: BigInt(values.target), // Konversi sebelum dikirim
      };

      await editCampaignAction(url, formattedValues, link);

      toast({ title: "Success", description: "Campaign berhasil diedit!" });
      router.push("/admin/campaign");
    } catch (error) {
      toast({ title: "Error", description: error.message });
      console.error(error);
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
              previewUrls={campaign.imageThumb}
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

            <div className="flex-grow">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Tiptap
                        contentForm={field.value || content}
                        onChangeForm={field.onChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button disabled={isLoading} variant="outline">
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

export default EditCampaign;
