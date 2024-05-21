export const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://www.easeai.site";

export const siteConfig = (locale?: string) => ({
  name: "Ease AI",
  url: siteUrl + "/" + locale,
  ogImage: `${siteUrl}/${locale}/opengraph-image`,
  description:
    "All-in-one tool for YouTube, providing a range of tools to enhance your YouTube experience.",
  links: {
    twitter: "https://x.com/AiEase73281",
    github: "https://github.com/chiragksharma",
  },
});

export type SiteConfig = typeof siteConfig;
