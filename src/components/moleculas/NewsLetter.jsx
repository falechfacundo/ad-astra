import { Input } from "@nextui-org/react";
import { useState } from "react";
import { useModal } from "../../context/ModalProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const { isOpen, handleClose } = useModal();
  const { t } = useTranslation("newsletter");

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(true);
      return;
    }
    setError(false);
    saveEmailToFile(email);
    setEmail("");
  };

  const saveEmailToFile = (email) => {
    fetch("https://ad-astra-newsletter-worker.faiafacundo.workers.dev", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => {
        console.log("here response", response);
        response.text();
      })
      .then((data) => {
        console.log("data", data);
        toast.success(t("toast.success"), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        handleClose();
      })
      .catch((error) => {
        toast.error(t("toast.error"), {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="animationNewsletter fixed w-full col-span-full grid grid-cols-12 min-h-max z-30 bg-white/40 border-t-electric-violet-600/40 backdrop-blur-md bottom-0 py-6 gap-4 md:gap-2">
        <div className="col-start-2 col-end-12 md:col-start-4 md:col-end-10 gap-2">
          <h1 className="font-semibold text-lg">{t("title")}</h1>
          <p className="font-light text-base">{t("description")}</p>
        </div>
        <form
          className="col-start-2 col-end-12 md:col-start-4 md:col-end-10"
          onSubmit={handleSubmit}
        >
          <Input
            isInvalid={error}
            errorMessage={t("emailError")}
            type="email"
            classNames={{
              inputWrapper: ["bg-white/80", "shadow-md"],
            }}
            label={t("emailLabel")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="rounded-md w-full text-white bg-electric-violet-600 hover:bg-electric-violet-700 duration-300 ease-in-out transition-colors py-2"
          >
            {t("subscribeButton")}
          </button>
        </form>
        <button
          onClick={handleClose}
          className="absolute right-0 top-0 px-2 text-xl rounded-bl-md leading-none text-white bg-electric-violet-600 hover:bg-electric-violet-700 duration-300 ease-in-out transition-colors py-2"
        >
          X
        </button>
      </div>
    </>
  );
}
