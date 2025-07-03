import Layout from "../components/layout/Layout.jsx";
import Hero from "../components/moleculas/Hero.jsx";
import Services from "../components/moleculas/Services.jsx";
import Projects from "../components/moleculas/Projects.jsx";
import References from "../components/moleculas/References.jsx";
import Contact from "../components/moleculas/Contact.jsx";
import { VelocityScroll } from "../components/magic_ui/VelocityScroll.jsx";
import transition from "../components/layout/transition.jsx";
import { useTranslation } from "react-i18next";

function Home() {
  const { t } = useTranslation("velocityscroll");

  return (
    <Layout>
      <main className="w-full col-span-full grid grid-cols-12 bg-slate-100">
        <Hero />
        <VelocityScroll
          text={t("velocityScroll.text")}
          default_velocity={120}
          className="text-center font-bold 
    tracking-[-0.02em] gap-4 text-neutral-900/80 drop-shadow-sm 
    md:text-7xl"
        />
        <Services />
        <Projects />
        <References />
        <Contact />
      </main>
    </Layout>
  );
}

export default transition(Home);
