import Layout from "../components/layout/Layout";
import transition from "../components/layout/transition";
import { useTranslation } from "react-i18next";

function FAQ() {
  const { t } = useTranslation("faq");
  const questions = t("faq.questions", { returnObjects: true });

  return (
    <Layout>
      <main className="col-span-full grid grid-cols-12 pb-20 gap-y-12 md:gap-x-16">
        <div className="h-[50vh] flex items-center col-start-2 col-end-12">
          <h1 className="text-4xl font-normal">{t("faq.title")}</h1>
        </div>
        {questions.map((q, index) => (
          <div
            key={index}
            className={`col-start-2 col-end-12 md:col-start-${
              index % 2 === 0 ? 2 : 7
            } md:col-end-${index % 2 === 0 ? 7 : 12} flex flex-col gap-6`}
          >
            <h3 className="text-2xl font-light">{q.question}</h3>
            <p className="text-lg font-extralight">{q.answer}</p>
          </div>
        ))}
      </main>
    </Layout>
  );
}

export default transition(FAQ);
