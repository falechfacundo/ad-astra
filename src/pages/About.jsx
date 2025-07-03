import React from "react";
import Layout from "../components/layout/Layout.jsx";
import Particles from "../components/magic_ui/Particles.jsx";
import DotPattern from "../components/magic_ui/DotPattern.jsx";
import { MagicCard } from "../components/magic_ui/MagicCard.jsx";
import { useTheme } from "next-themes";
import transition from "../components/layout/transition.jsx";
import { useTranslation } from "react-i18next";

const colors = {
  "electric-violet": {
    50: "#FAF3FF",
    100: "#F4E3FF",
    200: "#EACDFF",
    300: "#DAA5FF",
    400: "#C46CFF",
    500: "#AE35FF",
    600: "#9B0FFF",
    700: "#8F00FF",
    800: "#7306C3",
    900: "#5F079C",
    950: "#400076",
  },
  turquoise: {
    50: "#EEFFFB",
    100: "#C5FFF7",
    200: "#8BFFF0",
    300: "#47FFE7",
    400: "#14EDD8",
    500: "#00D1BF",
    600: "#00A89D",
    700: "#00857F",
    800: "#056A66",
    900: "#0A5754",
    950: "#003535",
  },
};

const ColorBox = ({ shade, hex }) => (
  <div className="flex flex-col items-center m-2">
    <div className="text-lg">{shade}</div>
    <div className="w-16 h-16 mt-1" style={{ backgroundColor: hex }}></div>
    <div className="text-sm mt-1">{hex}</div>
  </div>
);

const ColorPalette = ({ colorName }) => {
  const shades = colors[colorName];

  if (!shades) {
    return <div className="text-center text-red-500">Color not found</div>;
  }

  return (
    <div className="flex flex-wrap justify-start">
      {Object.entries(shades).map(([shade, hex]) => (
        <ColorBox key={`${colorName}-${shade}`} shade={shade} hex={hex} />
      ))}
    </div>
  );
};

function About() {
  const { theme } = useTheme();
  const { t } = useTranslation("about");

  return (
    <Layout>
      <main className="col-span-full w-full grid grid-cols-12 bg-electric-violet-100">
        <div className="relative col-start-2 col-end-12 h-[40vh] md:h-[70vh] flex items-center justify-start">
          <Particles
            className="absolute inset-0"
            quantity={400}
            ease={80}
            color={"00a89d"}
            refresh
          />
          <h1 className="text-4xl font-normal">{t("visionTitle")}</h1>
        </div>
        <div className="col-start-2 col-end-12 flex flex-col gap-16 py-24 w-full">
          <section className="col-start-2 col-end-12 flex flex-col gap-20">
            <div className="flex flex-col gap-4">
              <p className="text-lg font-light text-balance w-3/4">
                {t("visionDescription")}
              </p>
            </div>
          </section>
          <section className="col-start-2 col-end-12 flex flex-col justify-center gap-8">
            <h2 className="text-2xl font-light">{t("brandStoryTitle")}</h2>
            <div className="flex flex-col gap-4 text-lg font-extralight text-balance w-full">
              <p>{t("brandStoryDescription1")}</p>
              <p>{t("brandStoryDescription2")}</p>
            </div>
          </section>
        </div>
        <section className="bg-electric-violet-50 grid grid-cols-12 col-span-full py-24">
          <section className="col-start-2 col-end-12 flex flex-col justify-center gap-8">
            <h2 className="text-2xl font-light">{t("colorsTitle")}</h2>
            <div className="flex flex-col gap-16">
              <p className="text-lg font-extralight text-balance">
                {t("colorsDescription")}
              </p>
              <ul className="flex flex-col gap-16 md:gap-24">
                <li className="flex flex-col gap-4">
                  <h3 className="text-xl font-light">{t("violetTitle")}</h3>
                  <p className="w-3/4 text-lg font-extralight">
                    {t("violetDescription")}
                  </p>
                  <ColorPalette colorName="electric-violet" />
                </li>
                <li className="flex flex-col gap-4">
                  <h3 className="text-xl font-light">{t("turquoiseTitle")}</h3>
                  <p className="w-3/4 text-lg font-extralight">
                    {t("turquoiseDescription")}
                  </p>
                  <ColorPalette colorName="turquoise" />
                </li>
              </ul>
            </div>
          </section>
        </section>
        <div className="relative grid grid-cols-12 col-span-full gap-y-20 pt-24">
          <section className="col-start-2 col-end-12 grid grid-cols-12 gap-y-12">
            <section className="col-span-full flex flex-col gap-6">
              <h2 className="text-2xl font-normal">{t("whyChooseUsTitle")}</h2>
              <p className="text-lg font-light text-balance">
                {t("whyChooseUsDescription")}
              </p>
            </section>
            <section className="col-span-full flex flex-col gap-6">
              <h2 className="text-2xl font-normal">
                {t("talentAndInnovationTitle")}
              </h2>
              <p className="text-lg font-light text-balance">
                {t("talentAndInnovationDescription")}
              </p>
            </section>
          </section>
          <section className="col-span-full md:col-start-2 md:col-end-12 flex flex-col justify-center gap-y-10">
            <MagicCard
              className="col-span-3 flex flex-col gap-3 md:p-5 border-electric-violet-600/20 cursor-pointer electr hover:scale-105 hover:bg-electric-violet-100 transition-all duration-800 ease-in"
              gradientColor={theme === "dark" ? "#c5fff7" : "#c5fff7"}
            >
              <h2 className="text-4xl font-normal pt-10 px-11">
                {t("joinUsTitle")}
              </h2>
              <p className="text-xl font-light text-balance pb-16 px-11">
                {t("joinUsDescription")}
              </p>
            </MagicCard>
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default transition(About);
