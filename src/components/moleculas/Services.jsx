import { BentoCard, BentoGrid } from "../magic_ui/BentoGrid.jsx";
import {
  Hostinge,
  Designe,
  Analyticse,
  Cloude,
  Developmente,
} from "../atoms/services.jsx";
import DotPattern from "../magic_ui/DotPattern.jsx";
import FadeText from "../magic_ui/FadeText.jsx";
import { useTranslation } from "react-i18next";

const features = [Cloude, Analyticse, Developmente, Hostinge, Designe];

export default function Services() {
  const { t } = useTranslation("servicescomp");

  return (
    <section className="relative col-span-full bg-white grid grid-cols-12 py-20">
      <DotPattern />
      <section className="min-h-screen w-full col-start-2 col-end-12 flex flex-col gap-12">
        <div className="flex flex-col gap-8">
          <FadeText
            className="text-2xl font-normal text-black"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.2 } },
            }}
            text={t("title")}
          />
          <FadeText
            className="text-balance text-lg font-light"
            direction="right"
            framerProps={{
              show: { transition: { delay: 0.2 } },
            }}
            text={t("description")}
          />
        </div>
        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </section>
    </section>
  );
}
