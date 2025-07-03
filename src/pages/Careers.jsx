import { useTranslation } from "react-i18next";
import Layout from "../components/layout/Layout.jsx";
import { useTheme } from "next-themes";
import { MagicCard } from "../components/magic_ui/MagicCard.jsx";
import ApplyBTN from "../components/atoms/ApplyBTN.jsx";
import GridPattern from "../components/magic_ui/GridPattern.jsx";
import DotPattern from "../components/magic_ui/DotPattern.jsx";
import FrontEnd from "../components/moleculas/FrontEnd.jsx";
import FadeText from "../components/magic_ui/FadeText.jsx";
import BoxReveal from "../components/magic_ui/BoxReveal.jsx";
import transition from "../components/layout/transition";

function Careers() {
  const { theme } = useTheme();
  const { t } = useTranslation("careers");

  return (
    <Layout>
      <main className="col-span-full grid grid-cols-12 gap-y-24">
        <GridPattern />
        <section className="col-start-2 col-end-12 relative z-10 gap-14 min-h-screen w-full">
          <section className="min-h-[65vh] flex flex-col justify-center gap-6">
            <BoxReveal>
              <h1 className="text-4xl font-medium text-pretty">{t("title")}</h1>
            </BoxReveal>
            <BoxReveal>
              <p className="text-xl font-ligh text-balance">{t("mission")}</p>
            </BoxReveal>
          </section>
          <div className="flex flex-col gap-8">
            <FadeText text={t("whyJoinUs")} className="text-2xl font-normal" />
            <div className="flex flex-col w-full gap-12">
              <FadeText
                direction="left"
                text={t("whyJoinUsDetails")}
                className="text-lg text-balance"
              />
              <ul className="text-lg flex flex-col gap-3 font-semibold">
                <FadeText text={t("workFromAnywhere")} />
                <FadeText text={t("innovateWithTheBest")} />
                <FadeText text={t("growYourCareer")} />
                <FadeText text={t("competitiveSalaries")} />
              </ul>
            </div>
          </div>
        </section>
        <section className="bg-electric-violet-200 relative col-span-full grid grid-cols-12 py-20">
          <DotPattern />
          <div className="col-start-2 col-end-12 flex flex-wrap gap-12">
            <FadeText
              text={t("currentOpenings")}
              className="text-2xl font-medium w-full"
            />
            <section className="grid grid-cols-9 gap-4 w-full">
              <FrontEnd />
              <MagicCard
                className="col-span-full md:col-span-4 lg:col-span-3 max-w-[440px] flex flex-col gap-3 shadow-2xl p-3"
                gradientColor={theme === "dark" ? "#8bfff0" : "#8bfff0"}
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-normal">
                    {t("backEndDeveloper.title")}
                  </h3>
                  <p className="font-light">
                    {t("backEndDeveloper.description")}
                  </p>
                </div>
                <ApplyBTN />
              </MagicCard>
              <MagicCard
                className="col-span-full md:col-span-4 lg:col-span-3 max-w-[440px] flex flex-col gap-3 shadow-2xl p-3"
                gradientColor={theme === "dark" ? "#8bfff0" : "#8bfff0"}
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-normal">
                    {t("uxUiDesigner.title")}
                  </h3>
                  <p className="font-light">{t("uxUiDesigner.description")}</p>
                </div>
                <ApplyBTN />
              </MagicCard>
              <MagicCard
                className="col-span-full md:col-span-4 lg:col-span-3 max-w-[440px] flex flex-col gap-3 shadow-2xl p-3 bg-transparent"
                gradientColor={theme === "dark" ? "#8bfff0" : "#8bfff0"}
              >
                <div className="flex flex-col gap-4">
                  <h3 className="text-lg font-normal">
                    {t("brandingSpecialist.title")}
                  </h3>
                  <p className="text-neutral-900">
                    {t("brandingSpecialist.description")}
                  </p>
                </div>
                <ApplyBTN />
              </MagicCard>
              <MagicCard
                className="col-span-full md:col-span-4 lg:col-span-3 max-w-[440px] flex flex-col gap-3 shadow-2xl p-3"
                gradientColor={theme === "dark" ? "#8bfff0" : "#8bfff0"}
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-normal">
                    {t("devOpsEngineer.title")}
                  </h3>
                  <p className="font-light">
                    {t("devOpsEngineer.description")}
                  </p>
                </div>
                <ApplyBTN />
              </MagicCard>
            </section>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default transition(Careers);
