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
import { uploadThumbnail, updateThumbnail } from "@/services/uploadService";
import { updatePost } from "@/actions/updateCampaignAchtion";
import Tiptap from "./text-editor/tiptap";
// import { updatePost } from "@/services/editService";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "judul harus lebih dari 2 karakter",
    })
    .max(50, {
      message: "judul terlalu panjang",
    }),
  content: z.object({
    type: z.literal("doc"),
    content: z.array(z.any()),
  }),
});

const EditCampaign = (campaign) => {
  console.log(campaign);
  const router = useRouter();
  const content = JSON.parse(campaign.campaign.content);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: campaign.campaign.title,
      content: content,
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
      //   let imageUrl = null;
      setIsLoading(true);

      let imageUrl = await updateThumbnail(file);
      if (!imageUrl) {
        imageUrl = campaign.campaign.imageThumb;
      }
      const id = campaign.campaign.id;
      await updatePost(id, values, imageUrl);

      toast({ title: "Success", description: "Campaign berhasil diedit!" });
      // router.push("/campaign");
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
              previewUrls={campaign.campaign.imageThumb}
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
