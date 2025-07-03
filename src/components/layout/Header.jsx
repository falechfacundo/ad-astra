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
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useUser,
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";

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

  // Lista mock de proyectos del usuario - en producción esto vendría de tu API
  const userProjects = [
    { id: "123", name: "Proyecto Web E-commerce", status: "pending" },
    { id: "456", name: "App Móvil Restaurante", status: "firmado" },
    {
      id: "6852caa0a8067a9cd29818cf",
      name: "Sistema de Gestión Empresarial",
      status: "in_progress",
    },
  ];

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
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  className="border-gray-300 hover:border-electric-violet-600 hover:text-electric-violet-600 transition-colors"
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
                {userProjects.map((project) => (
                  <DropdownItem
                    key={project.id}
                    onClick={() => goToProject(project.id)}
                    className="hover:bg-gray-100"
                    textValue={project.name}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <p className="font-medium text-gray-900">
                          {project.name}
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
            <NavbarItem className="hidden md:flex">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "bg-electric-violet-700/45 px-6 text-xl text-neutral-200 font-light py-1.5 rounded-md mr-3"
                    : "bg-electric-violet-700 px-6 text-xl text-neutral-200 font-light py-1.5 rounded-md mr-3"
                }
              >
                {t("getStarted")}
              </NavLink>
            </NavbarItem>
            <SignInButton mode="modal">
              <Button className="bg-electric-violet-600 text-white hover:bg-electric-violet-700 transition-colors">
                Iniciar Sesión
              </Button>
            </SignInButton>
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
