import { z } from "zod";

export const formSchema = z.object({
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
