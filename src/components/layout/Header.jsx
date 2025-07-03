import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  useUser,
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { useProjectsStore } from "../../store/projects.js";
import { useSyncClerkUser } from "../../lib/useSyncClerkUser.js";

const menuItems = [
  { label: "home", url: "" },
  { label: "about", url: "about" },
  { label: "faq", url: "faq" },
  { label: "careers", url: "careers" },
];

export default function Header() {
  const { t } = useTranslation("header");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();
  const {
    projects: userProjects,
    loading: loadingProjects,
    error: errorProjects,
    fetchProjects,
    clearProjects,
  } = useProjectsStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Función para navegar a la lista de proyectos del usuario
  const goToUserProjects = () => {
    if (user) {
      navigate(`/projects`);
    }
  };

  // Función para navegar a un proyecto específico
  const goToProject = (projectId) => {
    navigate(`/proposal?id=${projectId}`);
  };

  // Fetch projects from store when dropdown opens
  useEffect(() => {
    if (user && dropdownOpen) {
      fetchProjects(user.id);
    }
    if (!dropdownOpen) {
      clearProjects(); // Optional: clear on close
    }
  }, [user, dropdownOpen, fetchProjects, clearProjects]);

  useSyncClerkUser();

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

        {/* Botón de Proyectos - Solo visible para usuarios autenticados */}
        <SignedIn>
          <NavbarItem className="hidden sm:flex">
            <Dropdown onOpenChange={setDropdownOpen}>
              <DropdownTrigger>
                <Button
                  variant="ghost"
                  size="sm"
                  className="border border-electric-violet-300 text-electric-violet-700 bg-transparent hover:bg-electric-violet-50 transition-colors px-4 py-2"
                >
                  Mis Proyectos
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Proyectos del usuario" className="w-80">
                <DropdownItem
                  key="header"
                  className="h-14 gap-2"
                  textValue="Mis Proyectos"
                >
                  <div className="flex flex-col">
                    <p className="font-semibold text-gray-900">Mis Proyectos</p>
                    <p className="text-sm text-gray-500">
                      Gestiona tus propuestas y contratos
                    </p>
                  </div>
                </DropdownItem>
                {loadingProjects && (
                  <DropdownItem key="loading" textValue="Cargando...">
                    <div className="text-center text-gray-500 py-2 text-sm">
                      Cargando proyectos...
                    </div>
                  </DropdownItem>
                )}
                {errorProjects && (
                  <DropdownItem key="error" textValue="Error">
                    <div className="text-center text-red-500 py-2 text-sm">
                      {errorProjects}
                    </div>
                  </DropdownItem>
                )}
                {!loadingProjects &&
                  !errorProjects &&
                  userProjects.length === 0 && (
                    <DropdownItem key="empty" textValue="Sin proyectos">
                      <div className="text-center text-gray-400 py-2 text-sm">
                        No tienes proyectos aún
                      </div>
                    </DropdownItem>
                  )}
                {!loadingProjects &&
                  !errorProjects &&
                  userProjects.map((project) => (
                    <DropdownItem
                      key={project.id}
                      onClick={() => goToProject(project.id)}
                      className="hover:bg-gray-100"
                      textValue={project.nombre || project.name}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <p className="font-medium text-gray-900">
                            {project.nombre || project.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {project.id}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            project.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : project.status === "firmado"
                              ? "bg-green-100 text-green-800"
                              : project.status === "in_progress"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {project.status === "pending"
                            ? "Pendiente"
                            : project.status === "firmado"
                            ? "Firmado"
                            : project.status === "in_progress"
                            ? "En Progreso"
                            : project.status}
                        </span>
                      </div>
                    </DropdownItem>
                  ))}
                <DropdownItem
                  key="view-all"
                  onClick={goToUserProjects}
                  className="border-t border-gray-200 mt-2 text-electric-violet-600 hover:bg-electric-violet-50"
                  textValue="Ver todos los proyectos"
                >
                  <div className="text-center font-medium">
                    Ver todos los proyectos →
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </SignedIn>

        {/* Información del usuario y botones de autenticación */}
        <NavbarItem className="flex items-center gap-3">
          <SignedIn>
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium text-gray-900">
                {user?.fullName || user?.firstName || "Usuario"}
              </span>
              <span className="text-xs text-gray-500">
                {user?.primaryEmailAddress?.emailAddress}
              </span>
            </div>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-lg",
                  userButtonPopoverActions: "border-t border-gray-200",
                },
              }}
              userProfileMode="navigation"
              userProfileUrl="/user-profile"
            />
          </SignedIn>

          <SignedOut>
            <NavbarItem className="hidden md:flex flex-row gap-2 items-center">
              <SignInButton mode="modal">
                <Button
                  variant="ghost"
                  size="sm"
                  className="border border-electric-violet-300 text-electric-violet-700 bg-transparent hover:bg-electric-violet-50 transition-colors px-4 py-2"
                >
                  Iniciar Sesión
                </Button>
              </SignInButton>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "bg-electric-violet-700/45 px-6 text-xl text-neutral-200 font-light py-1.5 rounded-md"
                    : "bg-electric-violet-700 px-6 text-xl text-neutral-200 font-light py-1.5 rounded-md"
                }
              >
                {t("getStarted")}
              </NavLink>
            </NavbarItem>
          </SignedOut>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

// import {
//   Navbar,
//   NavbarBrand,
//   NavbarContent,
//   NavbarItem,
//   NavbarMenu,
//   NavbarMenuToggle,
//   NavbarMenuItem,
// } from "@nextui-org/navbar";
// // import { Link } from "@nextui-org/link";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// import Menu from "../assets/icons/Menu.jsx";

// const menuItems = ["home", "about", "faq", "careers"];

// export default function Header() {
//   const { t } = useTranslation("header");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <>
//       <Navbar className="col-span-full flex justify-between">
//         <NavbarContent justify="start">
//           <NavbarBrand className="col-start-2">
//             <p className="font-bold text-2xl tracking-widest">AD ASTRA</p>
//           </NavbarBrand>
//         </NavbarContent>
//         <NavbarContent
//           className="hidden sm:flex gap-12 font-semibold col-span-4"
//           justify="center"
//         >
//           {menuItems.map((item) => (
//             <Link key={item} to={`/${item}`}>
//               {t(`${item}`)}
//             </Link>
//           ))}
//         </NavbarContent>
//         <NavbarContent justify="end">
//           <NavbarMenuToggle
//             aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//             className="md:hidden col-start-10 col-end-12"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           />
//           <NavbarMenu isOpen={isMenuOpen}>
//             {menuItems.map((item, index) => (
//               <NavbarMenuItem key={`${item}-${index}`}>
//                 <Link
//                   color={
//                     index === 2
//                       ? "primary"
//                       : index === menuItems.length - 1
//                       ? "danger"
//                       : "foreground"
//                   }
//                   className="w-full"
//                   href={`/${item}`}
//                   size="lg"
//                 >
//                   {t(`${item}`)}
//                 </Link>
//               </NavbarMenuItem>
//             ))}
//           </NavbarMenu>
//           <NavbarItem className="hidden md:flex">
//             <Link
//               href="/contact"
//               className="bg-electric-violet-700 px-6 text-xl text-neutral-200 font-light py-1.5 rounded-md"
//             >
//               {t("getStarted")}
//             </Link>
//           </NavbarItem>
//         </NavbarContent>
//       </Navbar>
//       {/* <nav className="col-span-full grid grid-cols-12 py-3">
//         <p className="col-start-2 min-w-max font-bold text-2xl bg-white tracking-widest">
//           AD ASTRA
//         </p>
//         <div className="hidden sm:flex gap-12 font-semibold col-span-4">
//           {menuItems.map((item) => (
//             <Link key={item} to={`/${item}`}>
//               {t(`${item}`)}
//             </Link>
//           ))}
//         </div>
//         <div
//           aria-label={isMenuOpen ? "Close menu" : "Open menu"}
//           className="sm:hidden col-start-11 bg-white"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <Menu />
//         </div>
//       </nav> */}
//     </>
//   );
// }

// {
//   /* <div isOpen={isMenuOpen}>
// {menuItems.map((item, index) => (
//   <div key={`${item}-${index}`}>
//     <Link
//       color={
//         index === 2
//           ? "primary"
//           : index === menuItems.length - 1
//           ? "danger"
//           : "foreground"
//       }
//       className="w-full"
//       href={`/${item}`}
//       size="lg"
//     >
//       {t(`${item}`)}
//     </Link>
//   </div>
// ))}
// </div>
// <div className="hidden sm:flex">
// <Link
//   href="/contact"
//   className="bg-electric-violet-700 px-6 text-xl text-neutral-200 font-light py-1.5 rounded-md"
// >
//   {t("getStarted")}
// </Link>
// </div> */
// }
