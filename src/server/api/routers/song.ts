import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const songRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.song.findUnique({
      where: { id: input },
    });
  }),
  createSong: publicProcedure
    .input(z.string().url())
    .mutation(async ({ ctx, input }) => {
      // Spotify
      if (input.includes("https://open.spotify.com/track/")) {
        const id = input.replace("https://open.spotify.com/track/", "");
        try {
          const { name, artists } = (await ctx.spotify.getTrack(id)).body;
          const dbTrack = await ctx.db.song.upsert({
            where: { spotify: id },
            create: {
              title: name,
              artists: artists
                .map((artist) => {
                  return artist.name;
                })
                .toString()
                .replaceAll(",", ", "),
              spotify: id,
            },
            update: {},
          });
          return dbTrack.id;
        } catch (error) {
          console.log(error);
        }
      }
    }),
});

export { songRouter };
