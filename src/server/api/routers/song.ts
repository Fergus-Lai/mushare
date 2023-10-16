import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const songRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.song.findUnique({
      where: { id: input },
      include: { artists: true },
    });
  }),
});

export { songRouter };
