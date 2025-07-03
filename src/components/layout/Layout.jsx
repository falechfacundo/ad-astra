import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Newsletter from "../moleculas/NewsLetter.jsx";

export default function Layout({ children }) {
  return (
    <div className="relative min-w-full min-h-screen grid grid-cols-12">
      <Header />
      <Newsletter />
      {children}
      <Footer />
    </div>
  );
}
