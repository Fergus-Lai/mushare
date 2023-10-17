import Head from "next/head";
import { ArrowSmallRightIcon } from "@heroicons/react/24/solid";
import { api } from "~/utils/api";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const { mutate, isLoading, data, error } = api.songs.createSong.useMutation();
  const [url, setUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (data) {
      router.push(`/song/${data}`);
    }
  }, [router, data]);

  useEffect(() => {
    if (!error) return;
    if (error.message === "Song Not Found") {
      toast.error("Song Not Found", { theme: "dark", toastId: "error" });
    }
    if (error.message.includes("Invalid url")) {
      toast.error("Invalid URL", { theme: "dark", toastId: "error" });
    }
  }, [error]);

  return (
    <>
      <Head>
        <title>Mushare</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center overscroll-none bg-zinc-900">
        <ToastContainer />
        <div className="container flex w-2/3 max-w-xl flex-col items-center justify-between gap-3 px-4 py-16">
          <h1 className="text-3xl font-bold text-zinc-400">Mushare</h1>
          <h3 className="text-zinc-400">
            Share Music to Friends on Different Streaming Platform with One Link
          </h3>
          <div className="flex h-12 w-full justify-between rounded-lg bg-zinc-600 ">
            <input
              className="w-full rounded-xl bg-zinc-600 p-2 text-zinc-400 focus:outline-none"
              placeholder="Enter Link of Music"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
            <button
              className="flex h-full w-20 items-center justify-center text-zinc-200 disabled:text-zinc-400"
              disabled={isLoading}
              onClick={() => {
                mutate(url);
              }}
            >
              <ArrowSmallRightIcon className="h-6 w-6 " />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
