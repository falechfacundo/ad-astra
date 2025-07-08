import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Newsletter from "../moleculas/NewsLetter.jsx";
import UserTypeQuestionnaire from "../onboarding/UserTypeQuestionnaire.jsx";
import { useSyncClerkUser } from "../../lib/useSyncClerkUser.js";
import { useUser } from "@clerk/clerk-react";

export default function Layout({ children }) {
  const { user } = useUser();
  const { showQuestionnaire, handleQuestionnaireClose } = useSyncClerkUser();

  return (
    <div className="relative min-w-full min-h-screen grid grid-cols-12">
      <Header />
      <Newsletter />
      {children}
      <Footer />

      {/* Cuestionario de tipo de usuario */}
      {user && (
        <UserTypeQuestionnaire
          isOpen={showQuestionnaire}
          onClose={handleQuestionnaireClose}
          user={user}
        />
      )}
    </div>
  );
}
