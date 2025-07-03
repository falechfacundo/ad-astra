import { cn } from "../../lib/utils.js";
import Marquee from "../magic_ui/Marquee.jsx";
import BoxReveal from "../magic_ui/BoxReveal.jsx";
import NumberTicker from "../magic_ui/NumberTicker.jsx";
import FadeText from "../magic_ui/FadeText.jsx";
import { useTranslation } from "react-i18next";
import Particles from "../magic_ui/Particles";

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 transition-colors duration-200 ease-in",
        "border-turquoise-950/[.3] bg-turquoise-300/[.01] hover:bg-turquoise-300/[.2] backdrop-blur-[2px]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img
          className="rounded-full"
          width="32"
          height="32"
          alt={username}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium">{name}</figcaption>
          <p className="text-xs font-medium">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

// mesh https://colorffy.com/mesh-gradient-generator
export default function References() {
  const { t } = useTranslation("references");
  const reviews = t("references.reviews", { returnObjects: true });
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);

  return (
    <section className="min-h-screen w-full col-span-full pt-20 pb-28 grid grid-cols-12 bg-electric-violet-100/50 gap-y-28">
      {/* <Particles
        className="absolute inset-0"
        quantity={400}
        ease={80}
        color={"9b0fff"}
        refresh
      /> THIS CODE IS FROM PROJECTS SECTION AND NOT CHANGES WAS MADED JUST COPY PASTE */}
      <section className="col-start-2 col-end-12 flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <BoxReveal boxColor={"#daa5ff"} duration={0.5}>
            <h2 className="text-2xl font-normal text-black">
              {t("references.title")}
            </h2>
          </BoxReveal>
          <BoxReveal boxColor={"#daa5ff"} duration={0.5}>
            <p className="text-balance text-lg font-light">
              {t("references.description")}
            </p>
          </BoxReveal>
        </div>
      </section>
      <div className="relative w-full col-span-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent flex gap-y-4">
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-electric-violet-100"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-electric-violet-100"></div>
      </div>
      <div className="mt-12 col-span-full grid grid-cols-12 text-electric-violet-950 gap-y-8">
        <div className="col-start-2 col-end-12 md:col-start-2 md:col-end-7 flex items-center justify-evenly md:justify-start md:gap-12 md:flex-col">
          <p className="whitespace-pre-wrap flex gap-1 text-4xl font-normal items-center tracking-tighter text-electric-violet-950">
            <NumberTicker
              value={t("references.stats.recommendation.value")}
              className={"text-electric-violet-950"}
            />
            <FadeText
              direction="up"
              framerProps={{
                show: { transition: { delay: 1.9 } },
              }}
              className="opacity-100 text-electric-violet-950/80"
              text="%"
            />
          </p>
          <h4 className="text-xl font-normal md:text-center w-2/4 text-pretty">
            {t("references.stats.recommendation.text")}
          </h4>
        </div>
        <div className="col-start-2 col-end-12 md:col-start-7 md:col-end-12 flex items-center justify-evenly md:justify-start md:gap-12 md:flex-col">
          <p className="whitespace-pre-wrap flex gap-1 text-4xl font-normal tracking-tighter text-electric-violet-950">
            <NumberTicker
              value={t("references.stats.sales.value")}
              className={"text-electric-violet-950"}
            />
            <FadeText
              direction="up"
              framerProps={{
                show: { transition: { delay: 2 } },
              }}
              className="opacity-100"
              text="%"
            />
          </p>
          <h4 className="text-xl font-normal md:text-center w-2/4 md:w-full text-pretty">
            {t("references.stats.sales.text")}
          </h4>
        </div>
      </div>
    </section>
  );
}
