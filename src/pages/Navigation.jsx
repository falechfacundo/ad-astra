import DotPattern from "../components/magic_ui/DotPattern";
import WhatsApp from "../components/assets/icons/WhatsApp";
import Instagram from "../components/assets/icons/Instagram";
import LinkedIn from "../components/assets/icons/LinkedIn";
import Contact from "../components/moleculas/Contact";
import Logo from "../components/assets/Logo";
import Newsletter from "../components/moleculas/NewsLetter";

export default function Navigation() {
  return (
    <section className="flex flex-col justify-center">
      <section className="flex flex-col items-center">
        <DotPattern />

        <section className="flex flex-col relative min-h-screen justify-center gap-24 items-center w-[34em] ">
          <section className="text-center flex flex-col items-center gap-4">
            <div className="h-96 opacity-15 -top-16 absolute">
              <Logo />
            </div>{" "}
            <div className="relative">
              <h1 className="text-2xl font-bold">AD-ASTRA DIGITAL SOLUTIONS</h1>
              <p className="text-lg font-semibold opacity-80">
                Tu vision, nuestra experiencia
              </p>
            </div>
          </section>
          <section className="flex flex-col w-64 items-center justify-center gap-6">
            <a
              className="bg-electric-violet-600 hover:bg-electric-violet-700 transition-colors text-white w-full rounded-md py-1.5 text-center"
              href="https://calendly.com/falechfacundo"
              target="blank"
            >
              Agendar una reunion
            </a>
            <a
              className="bg-electric-violet-600 hover:bg-electric-violet-700 transition-colors text-white w-full rounded-md py-1.5 text-center"
              href="/contact"
              target="blank"
            >
              Obtene una cotizacion
            </a>
            <a
              className="bg-electric-violet-600 hover:bg-electric-violet-700 transition-colors text-white w-full rounded-md py-1.5 text-center"
              href="/"
            >
              Web
            </a>
          </section>
          <section className="flex flex-col gap-6 absolute -right-20 text-4xl">
            <a
              href="https://www.linkedin.com/company/adastra-digital-solutions"
              target="blank"
            >
              <LinkedIn />
            </a>
            <a
              href="https://www.instagram.com/ad.astra.digital.solutions/#"
              target="blank"
            >
              <Instagram />
            </a>
            <a href="https://wa.me/5491151086187" target="blank">
              <WhatsApp />
            </a>
          </section>
        </section>
      </section>
      <Contact />
      <Newsletter />
    </section>
  );
}
