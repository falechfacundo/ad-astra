import { useTranslation } from "react-i18next";

export default function ApplyBTN({ clickAction }) {
  const { t } = useTranslation("applybtn");

  return (
    <button
      onClick={clickAction}
      className="bg-electric-violet-300 opacity-60 cursor-default rounded-md transition-colors duration-300 ease-in px-2 py-1"
    >
      {t("applybtn")}
    </button>
  );
}
