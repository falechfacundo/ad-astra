import Facebook from "../assets/icons/Facebook";
import Instagram from "../assets/icons/Instagram";
import LinkedIn from "../assets/icons/LinkedIn";
import WhatsApp from "../assets/icons/WhatsApp";
import QRCode from "../assets/icons/QRCode";
import { NavLink } from "react-router-dom";

import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("footer");

  return (
    <footer className="col-span-full grid grid-cols-12 border-t-turquoise-900/40 border-1.5">
      <div className="col-start-2 col-end-12 flex flex-col md:flex-row gap-10 md:gap-20 md:justify-between py-6">
        <nav className="flex flex-col gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-electric-violet-600 font-normal md:font-semibold text-lg min-w-max"
                : "font-normal text-lg min-w-max"
            }
          >
            {t("home")}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text-electric-violet-600 font-normal md:font-semibold text-lg min-w-max"
                : "font-normal text-lg min-w-max"
            }
          >
            {t("about")}
          </NavLink>
          <NavLink
            to="/faq"
            className={({ isActive }) =>
              isActive
                ? "text-electric-violet-600 font-normal md:font-semibold text-lg min-w-max"
                : "font-normal text-lg min-w-max"
            }
          >
            {t("faq")}
          </NavLink>
          <NavLink
            to="/careers"
            className={({ isActive }) =>
              isActive
                ? "text-electric-violet-600 font-normal md:font-semibold text-lg min-w-max"
                : "font-normal text-lg min-w-max"
            }
          >
            {t("careers")}
          </NavLink>
        </nav>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold">{t("contactUs")}</h3>
          <p className="min-w-max">{t("phone")}</p>
          <p className="min-w-max">{t("email")}</p>
        </div>
        {/* <div className="flex flex-col gap-2">
          <h3 className="font-bold">Legal</h3>
          <a href="/privacy-policy" className="hover:underline min-min-w-max">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="hover:underline min-min-w-max">
            Terms of Service
          </a>
        </div> */}
        <div className="flex flex-wrap w-full text-4xl gap-8 md:justify-end">
          <a
            href="https://www.instagram.com/ad.astra.digital.solutions/#"
            target="blank"
          >
            <Instagram />
          </a>
          {/* <a href="#"
              target="blank">
            <Facebook />
          </a> */}
          <a
            href="https://www.linkedin.com/company/adastra-digital-solutions"
            target="blank"
          >
            <LinkedIn />
          </a>
          <a href="https://wa.me/5491151086187" target="blank">
            <WhatsApp />
          </a>
        </div>
        {/* <div className="self-start">
          <QRCode />
        </div> */}
      </div>
      <div className="col-start-2 col-end-12 flex justify-center py-4 border-t border-neutral-800">
        <p className="font-medium">{t("copyright")}</p>
      </div>
    </footer>
  );
}
