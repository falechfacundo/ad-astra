import IconCloud from "../magic_ui/IconCloud";
import { useTranslation } from "react-i18next";

const slugs = [
  "typescript",
  "react",
  "android",
  "express",
  "nextdotjs",
  "stripe",
  "paypal",
  "prisma",
  "postgresql",
  "firebase",
  "vercel",
  "nestjs",
  "tailwindcss",
  "sqlite",
  "mongodb",
  "mysql",
  "reacthookform",
  "framer",
  "wordpress",
  "shopify",
  "woocommerce",
  "apple",
  "reactrouter",
  "redux",
  "jest",
  "docker",
  "git",
  "github",
  "gitlab",
  "androidstudio",
  "strapi",
  "astro",
  "auth0",
  "pm2",
  "zod",
];

export function TextDevelopment() {
  const { t } = useTranslation("development");
  return (
    <div>
      <p className="text-balance inline text-xl font-light">
        {t("textDevelopment.part1")}{" "}
      </p>
      <span className="text-amber-400 text-xl inline font-semibold">
        {t("textDevelopment.highlight")}
      </span>{" "}
      <p className="text-balance inline text-xl font-light">
        {t("textDevelopment.part2")}
      </p>
    </div>
  );
}

export function TitleDevelopment() {
  const { t } = useTranslation("development");
  return <span className="text-3xl font-normal">{t("titleDevelopment")}</span>;
}

export function Development() {
  const { t } = useTranslation("development");

  return (
    <div className="relative flex flex-col gap-6 w-full justify-start pt-6 px-6">
      <div className="flex gap-4">
        <button className="bg-electric-violet-200 text-electric-violet-700 rounded-full cursor-default border border-electric-violet-900/30 text-sm px-4 py-2 leading-none shadow-2xl">
          {t("buttons.web")}
        </button>
        <button className="bg-electric-violet-200 text-electric-violet-700 rounded-full cursor-default border border-electric-violet-900/30 text-sm px-4 py-2 leading-none shadow-2xl">
          {t("buttons.software")}
        </button>
        <button className="bg-electric-violet-200 text-electric-violet-700 rounded-full cursor-default border border-electric-violet-900/30 text-sm px-4 py-2 leading-none shadow-2xl">
          {t("buttons.application")}
        </button>
        <button className="bg-electric-violet-200 text-electric-violet-700 rounded-full cursor-default border border-electric-violet-900/30 text-sm px-4 py-2 leading-none shadow-2xl">
          {t("buttons.cms")}
        </button>
        <button className="bg-electric-violet-200 text-electric-violet-700 rounded-full cursor-default border border-electric-violet-900/30 text-sm px-4 py-2 leading-none shadow-2xl">
          {t("buttons.payment")}
        </button>
        <button className="bg-electric-violet-200 text-electric-violet-700 rounded-full cursor-default border border-electric-violet-900/30 text-sm px-4 py-2 leading-none shadow-2xl">
          {t("buttons.testing")}
        </button>
      </div>
      <div className="flex gap-4">
        <button className="bg-electric-violet-200 text-electric-violet-700 rounded-full cursor-default border border-electric-violet-900/30 text-sm px-4 py-2 leading-none shadow-2xl">
          {t("buttons.server")}
        </button>
        <button className="bg-electric-violet-200 text-electric-violet-700 rounded-full cursor-default border border-electric-violet-900/30 text-sm px-4 py-2 leading-none shadow-2xl">
          {t("buttons.database")}
        </button>
        <button className="bg-electric-violet-200 text-electric-violet-700 rounded-full cursor-default border border-electric-violet-900/30 text-sm px-4 py-2 leading-none shadow-2xl">
          {t("buttons.vps")}
        </button>
      </div>
      <div className="absolute right-6 flex h-full w-full max-w-[23rem] opacity-60 md:opacity-100">
        <IconCloud iconSlugs={slugs} />
      </div>
    </div>
  );
}
