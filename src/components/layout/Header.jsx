import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const menuItems = [
  { label: "home", url: "" },
  { label: "about", url: "about" },
  { label: "faq", url: "faq" },
  { label: "careers", url: "careers" },
];

export default function Header() {
  const { t } = useTranslation("header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar className="fixed px-2 md:px-0" maxWidth="xl">
      <NavbarBrand justify="start">
        <NavLink
          to={"/"}
          className="font-bold text-lg md:text-xl tracking-widest"
        >
          AD ASTRA
        </NavLink>
      </NavbarBrand>
      <NavbarContent
        className="hidden sm:flex gap-12 col-span-4"
        justify="center"
      >
        {menuItems.map(({ label, url }) => (
          <NavLink
            key={url}
            to={`/${url}`}
            className={({ isActive }) =>
              isActive
                ? "text-electric-violet-600 font-semibold text-lg min-w-max"
                : "font-normal text-lg min-w-max"
            }
          >
            {t(`${label}`)}
          </NavLink>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="gap-4">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <NavbarMenu isOpen={isMenuOpen}>
          {menuItems.map(({ label, url }) => (
            <NavbarMenuItem key={`${url}`}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "text-electric-violet-600 text-2xl font-normal min-w-max"
                    : "text-2xl font-extralight min-w-max"
                }
                to={`/${url}`}
              >
                {t(`${label}`)}
              </NavLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NavbarContent>
    </Navbar>
  );
}
