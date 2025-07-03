import { Routes, Route, useLocation } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { AnimatePresence } from "framer-motion";
import { ModalProvider } from "./context/ModalProvider.jsx";
import ToastProvider from "./context/ToastProvider.jsx";
import I18nProvider from "./translations/i18n.jsx";
import About from "./pages/About.jsx";
import Careers from "./pages/Careers.jsx";
import FAQ from "./pages/FAQ.jsx";
import Home from "./pages/Home.jsx";
import Emails from "./pages/email-list.jsx";
import ContactPage from "./pages/Contact.jsx";
import Navigation from "./pages/Navigation.jsx";
import Copied from "./pages/Copied.jsx";
import ProposalPage from "./pages/proposal";
import Projects from "./pages/Projects.jsx";
import SignInPage from "./pages/SignIn.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import "./index.css";

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <I18nProvider>
        <NextUIProvider>
          <ModalProvider>
            <ToastProvider />
            <Routes location={location} key={location.pathname}>
              <Route index path="*" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/emails" element={<Emails />} />
              <Route path="/navigation" element={<Navigation />} />
              <Route path="/copied" element={<Copied />} />
              <Route path="/sign-in/*" element={<SignInPage />} />
              <Route path="/sign-up/*" element={<SignUpPage />} />
              <Route path="/proposal" element={<ProposalPage />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </ModalProvider>
        </NextUIProvider>
      </I18nProvider>
    </AnimatePresence>
  );
}

export default App;
