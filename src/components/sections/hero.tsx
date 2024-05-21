import { Parallax } from "react-scroll-parallax";
import { StarIcon } from "lucide-react";
import Link from "next/link";
import { BrandIcons } from "~/components/shared/brand-icons";
import Icons from "~/components/shared/icons";
import { buttonVariants } from "~/components/ui/button";
import { nFormatter } from "~/lib/utils";
import { getScopedI18n } from "~/locales/server";
import YoutubeIcon from "~/assets/icons/youtube-svgrepo-com.svg";
import ChromeIcon from "~/assets/icons/chrome-logo-icon.svg";
import ParallaxComponent from "./parallax";
import GradientWrapper from "./gradientWrapper";

export default async function Hero() {
  const scopedT = await getScopedI18n("hero");
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/moinulmoin/chadnext",
    {
      cache: "no-store",
    }
  )
    .then((res) => res.json())
    .catch((e) => console.error(e));
  return (
    <GradientWrapper wrapperClassName="max-w-md h-[30rem] top-12 inset-0">
      <section>
        <div className="container flex w-full flex-col items-center justify-center space-y-20 py-16 md:py-20 lg:py-24 xl:py-28">
          <div className="mx-auto w-full max-w-2xl ">
            <div className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors duration-300 hover:bg-blue-200">
              <YoutubeIcon className="mr-1 inline-block h-6 w-6" />
              <p className="text-sm font-semibold text-blue-700">
                {scopedT("top")}
              </p>
            </div>
            <h1 className=" text-balance bg-gradient-to-br  from-gray-900 via-gray-800 to-gray-400 bg-clip-text text-center font-heading text-[40px] font-bold leading-tight tracking-[-0.02em] text-transparent  drop-shadow-sm duration-300 ease-linear [word-spacing:theme(spacing.1)] dark:bg-gradient-to-br dark:from-gray-100 dark:to-gray-900 md:text-7xl md:leading-[5rem]">
              {scopedT("main")
                .split(" ")
                .map((word, index) =>
                  word.toLowerCase() === "youtube" ? (
                    <span key={index} className="text-red-600">
                      {word}{" "}
                    </span>
                  ) : (
                    <span key={index}>{word} </span>
                  )
                )}
            </h1>
            <p className="mt-6 text-balance text-center text-muted-foreground md:text-xl">
              {scopedT("sub")}
            </p>
            <div className="mx-auto mt-6 flex items-center justify-center">
              <Link
                className=" transition-transforms flex transform items-center gap-x-3 rounded-lg border border-gray-300 bg-white px-9 py-4 text-xl font-semibold shadow-lg transition-transform duration-300 hover:scale-105 hover:border-blue-800"
                href="https://chrome.google.com/webstore/detail/your-extension-id"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ChromeIcon width={28} className="mr-3" />
                <span className="text-black">Install on Chrome</span>
              </Link>
            </div>
          </div>
          <div className="w-full ">
            <ParallaxComponent />
          </div>
        </div>
      </section>
    </GradientWrapper>
  );
}

const tools = [
  {
    link: "https://www.typescriptlang.org/",
    icon: BrandIcons.ts,
  },
  {
    link: "https://nextjs.org/",
    icon: BrandIcons.nextjs,
  },
  {
    link: "https://tailwindcss.com/",
    icon: BrandIcons.tailwind,
  },
  {
    link: "https://www.prisma.io/",
    icon: BrandIcons.prisma,
  },
  {
    link: "https://vercel.com/",
    icon: BrandIcons.vercel,
  },
];
