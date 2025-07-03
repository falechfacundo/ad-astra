import Meteors from "../magic_ui/Meteors.jsx";
import FadeText from "../magic_ui/FadeText.jsx";
import Logo from "../assets/Logo.jsx";
import { Link } from "@nextui-org/link";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation("hero");

  return (
    <section className="h-[85vh] w-full relative col-span-full grid grid-cols-12">
      <div className="absolute w-full h-full z-10 overflow-hidden">
        <Meteors number={20} />
      </div>
      <section className="col-start-2 col-end-12 grid grid-cols-8 z-20">
        <div className="flex flex-col w-full justify-center gap-24 col-span-8 md:col-span-4">
          <div className="flex flex-col gap-6">
            <FadeText
              className="text-4xl font-normal"
              direction="down"
              framerProps={{
                show: { transition: { delay: 0.2 } },
              }}
              text={t("vision")}
            />
            <FadeText
              className="text-2xl font-light text-balance"
              direction="left"
              framerProps={{
                show: { transition: { delay: 0.4 } },
              }}
              text={t("description")}
            />
          </div>
          <FadeText
            className="text-2xl font-bold text-black"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.6 } },
            }}
            text={
              <Link
                href="/contact"
                className="bg-electric-violet-700 px-6 text-xl text-neutral-200 font-normal py-1.5 rounded-md"
              >
                {t("cta")}
              </Link>
            }
          />
        </div>
        <div className="hidden relative top-24 lg:top-16 col-span-4 text-6xl font-normal md:flex items-center justify-center z-20">
          <Logo />
        </div>
      </section>
    </section>
  );
}
