import FadeText from "../magic_ui/FadeText";
import Azure from "../assets/icons/Azure";
import Figma from "../assets/icons/Figma";
import MercadoPago from "../assets/icons/MercadoPago";
import Netlify from "../assets/icons/Netlify";
import HostGator from "../assets/icons/HostGator";
import AWS from "../assets/icons/AWS";
import BlurFade from "../magic_ui/BlurFade";

export default function Projects() {
  return (
    <section className="relative pt-20 col-span-full bg-electric-violet-100/50">
      <section className="grid grid-cols-12 col-span-full">
        <div className="col-start-2 col-end-12 pb-14">
          <FadeText
            className="text-2xl text-black w-full font-normal text-pretty"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.2 } },
            }}
            text="Works"
          />
        </div>
        <BlurFade
          inView
          className={
            "group col-span-full md:h-[420px] min-h-80 overflow-hidden grid grid-cols-12 bg-negrooscuro md:gap-6 w-full"
          }
        >
          <div className="flex gap-6 w-full h-full col-start-2 col-end-12 transition-all delay-100 duration-500 ease-in py-8 overflow-hidden">
            <div className="flex flex-col justify-between gap-4 z-10 w-2/3 min-h-56 md:w-1/3">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl min-w-max font-normal">
                  Negro Oscuro<span>, Argentina</span>
                </h3>
                <h4 className="font-light text-xl w-full backdrop-blur-sm">
                  UI Design and implementation of e-commerce functionality
                </h4>
              </div>
              <p className="hidden md:inline font-medium text-lg">
                The project was executed using Tiendanube platform, specifically
                chosen at the client{"'"}s request. Tiendanube allowed us to
                develop a robust and scalable online store.
              </p>
            </div>
            <div className="absolute h-auto grid grid-cols-12 text-6xl top-10 right-1 md:right-0 md:top-48 opacity-0 group-hover:opacity-100 transition-colors-opacity delay-200 duration-300 ease-in">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-5xl md:text-6xl col-start-11 md:col-start-2 z-10">
                <div>
                  <AWS />
                </div>
                <div>
                  <MercadoPago />
                </div>
                <div>
                  <Figma />
                </div>
              </div>
            </div>
            <img
              src="/negrooscuro_iphone.png"
              alt=""
              className="z-10 h-auto w-2/3 md:w-2/4 inline absolute -bottom-40 right-12 md:right-0 group-hover:scale-110 group-hover:-translate-y-32 md:group-hover:-translate-y-2 group-hover:-translate-x-10 md:group-hover:-translate-y-6 transition-transform duration-300 ease-in"
            />
          </div>
        </BlurFade>
        <BlurFade
          inView
          className={
            "group col-span-full md:col-span-8 md:h-[400px] min-h-72 overflow-hidden grid grid-cols-12 bg-hambur gap-6"
          }
        >
          <div className="flex gap-6 w-full h-full col-start-2 md:pl-9 col-end-12 transition-all delay-100 duration-500 ease-in py-8">
            <div className="flex flex-col justify-between gap-4 z-10 h-full">
              <div className="flex flex-col h-full justify-between gap-2">
                <h2 className="text-2xl font-normal">
                  Hamburguesa Nostra<span>, Spain</span>
                </h2>
                <p className="font-light text-xl text-balance w-2/3">
                  Attractive and user-friendly interface, reflecting the brand
                  {"'"}s identity and style. We prioritized an intuitive user
                  experience to ensure smooth navigation and convertion ratio.
                </p>
              </div>
            </div>
            <div className="absolute grid grid-cols-12 h-auto text-6xl top-[4.5rem] md:top-28 opacity-0 group-hover:opacity-100 transition-colors-opacity delay-200 duration-300 ease-in">
              <div className="col-start-10 md:col-start-1 z-10">
                <HostGator />
              </div>
            </div>
            <img
              src="/hambur_iphone.png"
              alt=""
              className="z-10 h-5/6 md:h-full inline group-hover:translate-x-24 md:group-hover:scale-125 md:group-hover:-translate-y-8 translate-x-40 absolute -bottom-10 right-0 transition-transform duration-300 ease-in"
            />
          </div>
        </BlurFade>
        <BlurFade
          inView
          className={
            "group col-span-full md:col-span-4 md:h-[400px] min-h-72 overflow-hidden grid grid-cols-12 bg-esanad gap-6 h-full"
          }
        >
          <div className="flex gap-6 w-full h-full col-start-2 col-end-12 transition-all delay-100 duration-500 ease-in py-8">
            <div className="flex flex-col justify-between gap-4 z-10 w-2/3 h-full">
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-normal">
                  eSanad<span>, UAE</span>
                </h2>
                <p className="font-light text-xl text-balance">
                  Attractive and user-friendly interface, reflecting the brand
                  {"'"}s identity and style.
                </p>
              </div>
            </div>
            <div className="absolute flex gap-8 h-auto w-36 text-6xl top-6 z-10 -right-16 opacity-0 group-hover:opacity-100 transition-colors-opacity delay-200 duration-300 ease-in">
              <Figma />
            </div>
            <img
              src="/esanad_laptop.png"
              alt=""
              className="z-10 h-auto w-3/5 inline translate-y-20 translate-x-20 group-hover:translate-x-2 group-hover:translate-y-4 md:group-hover:-translate-y-2 md:group-hover:scale-125 md:group-hover:-translate-x-10 absolute bottom-0 right-0 transition-transform duration-300 ease-in"
            />
          </div>
        </BlurFade>
        <BlurFade
          inView
          className={
            "group col-span-full md:h-[250px] min-h-60 overflow-hidden grid grid-cols-12 bg-suitsyou gap-6"
          }
        >
          <div className="flex gap-6 w-full h-full col-start-2 col-end-12 transition-all delay-100 duration-500 ease-in py-8">
            <div className="flex flex-col justify-between gap-4 z-10 w-2/3">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-normal">
                  Suits You<span>, Ireland</span>
                </h2>
                <h3 className="font-light text-xl text-balance">
                  Design System, UX/UI and e-commerce functionality
                </h3>
              </div>
            </div>
            <div className="absolute grid grid-cols-12 h-auto w-full text-6xl top-44 opacity-0 group-hover:opacity-100 transition-colors-opacity delay-200 duration-300 ease-in">
              <div className="flex gap-8 text-5xl md:text-6xl z-10">
                <div>
                  <Azure />
                </div>
                <div>
                  <Figma />
                </div>
                <div>
                  <Netlify />
                </div>
              </div>
            </div>
            <img
              src="/suits_screen.png"
              alt=""
              className="z-10 hidden h-auto w-1/3 md:inline absolute -bottom-10 md:top-0 -right-6 md:right-0  md:translate-y-20 -translate-x-10 scale-125 group-hover:-translate-y-10 group-hover:scale-150 md:group-hover:translate-y-10 transition-transform duration-300 ease-in"
            />
          </div>
        </BlurFade>
      </section>
    </section>
  );
}

// https://www.negrooscuro.com/#
// Project Details:
// Web Design:

// Our design team worked closely with Negro Oscuro to create an attractive and user-friendly interface, reflecting the brand's identity and style.
// We prioritized an intuitive user experience to ensure smooth navigation and an efficient shopping process.
// E-commerce:

// We implemented a complete online store using Tiendanube, which included product setup, inventory management, and secure payment options.
// We ensured that the site was responsive, offering an optimal shopping experience on both desktop and mobile devices.
// Integration and Customization:

// We customized various features and functionalities of Tiendanube to meet the specific needs of Negro Oscuro.
// Integrations with marketing and analytics tools were provided to offer detailed tracking of site performance and campaigns.

// https://tuareq.com/collections/ver-todo
// https://www.esanad.com
// https://hamburguesanostra.com
// https://suitsyou.ie
