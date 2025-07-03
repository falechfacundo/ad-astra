import { Textarea, Input } from "@nextui-org/input";
import FadeText from "../magic_ui/FadeText.jsx";
import GridPattern from "../magic_ui/GridPattern.jsx";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation("contact");
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const { email, name, message } = formData;
    if (email.trim() === "" || message.trim() === "") {
      toast.error(t("contact.toast.error"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    emailjs
      .send(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        {
          user_name: name,
          user_email: email,
          message: message,
        },
        import.meta.env.VITE_PUBLIC_KEY
      )
      .then(
        () => {
          setFormData({ email: "", name: "", message: "" });
          toast.success(t("contact.toast.success"), {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error(t("contact.toast.failure"), {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      );
  };

  return (
    <section className="min-h-[60vh] relative col-span-full grid grid-cols-12">
      <GridPattern />
      <section className="relative z-10 col-start-2 col-end-12 md:col-start-2 md:col-end-8 flex flex-col gap-12 py-28">
        <div className="flex flex-col gap-8">
          <FadeText
            className="text-4xl font-medium text-black"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.2 } },
            }}
            text={t("contact.title")}
          />
          <FadeText
            className="text-balance text-xl font-light"
            direction="right"
            framerProps={{
              show: { transition: { delay: 0.3 } },
            }}
            text={t("contact.description")}
          />
        </div>
        <form onSubmit={sendEmail} className="flex flex-col gap-4">
          <FadeText
            direction="left"
            framerProps={{
              show: { transition: { delay: 0.4 } },
            }}
            text={
              <Input
                isRequired
                type="email"
                size="lg"
                label={t("contact.form.emailLabel")}
                name="email"
                value={formData.email}
                onChange={handleChange}
                classNames={{
                  inputWrapper: ["bg-white/40", "shadow-md"],
                }}
                className="border-1.5 text-4xl rounded-md backdrop-blur-md"
              />
            }
          />
          <FadeText
            direction="right"
            framerProps={{
              show: { transition: { delay: 0.5 } },
            }}
            text={
              <Input
                type="text"
                size="lg"
                classNames={{
                  inputWrapper: ["bg-white/40", "shadow-md"],
                }}
                label={t("contact.form.nameLabel")}
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border-1.5 rounded-md backdrop-blur-md"
              />
            }
          />
          <FadeText
            direction="right"
            framerProps={{
              show: { transition: { delay: 0.6 } },
            }}
            text={
              <Textarea
                isRequired
                label={t("contact.form.messageLabel")}
                name="message"
                classNames={{
                  inputWrapper: ["bg-white/40", "shadow-md"],
                }}
                value={formData.message}
                onChange={handleChange}
                placeholder={t("contact.form.messagePlaceholder")}
                className="w-full border-1.5 rounded-md backdrop-blur-md"
              />
            }
          />
          <FadeText
            direction="right"
            framerProps={{
              show: { transition: { delay: 0.7 } },
            }}
            text={
              <button
                type="submit"
                className="w-full bg-electric-violet-600 border-turquoise-600/30 text-xl text-white rounded-md bg-gradient-to-tr px-5 py-2 font-normal tracking-wider"
              >
                {t("contact.form.submitButton")}
              </button>
            }
          />
        </form>
      </section>
    </section>
  );
}
