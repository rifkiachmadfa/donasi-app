"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreatePost } from "@/app/actions/createPost";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "judul harus lebih dari 2 karakter",
    })
    .max(50, {
      message: "judul terlalu panjang",
    }),
  content: z.string().min(10, {
    message: "content harus lebih dari 10 karakter",
  }),
});

const CreateCampaign = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      await CreatePost(values);
      toast({
        title: "success",
        description: "campaign berhasil ditambahkan",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);

      form.reset();
      redirect("/");
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <FormDescription>
                  Ini adalah Judul dari Campaign
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Rp 10.000 untuk semua anak indonesia...."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Isi dengan deskripsi konten</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "submit"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CreateCampaign;
