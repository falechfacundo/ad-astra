import { TextDevelopment, TitleDevelopment, Development } from "./Development";
import Hosting from "./Hosting";
import Analytics from "./Analytics";
import Cloud from "./Cloud";
import Design from "./Design";

export const Cloude = {
  name: "Cloud",
  description:
    "Our extensive range of cloud services is designed to meet your needs. From cloud storage to cloud computing boxshadow",
  href: "/",
  className:
    "col-span-3 lg:col-span-1 boxshadow-orange md:col-span-2 border-orange-800/40 hover:bg-orange-200",
  background: <Cloud />,
};
export const Analyticse = {
  name: "Data Analitics, AI and Business Automations",
  description:
    "We understand the critical importance our customers place on data analytics. In today's world, leveraging AI for business automation is essential. Our solutions not only automate your business processes but also provide comprehensive data insights to drive your success",
  href: "/",
  className2: "scale-150",
  className:
    "col-span-3 lg:col-span-2 boxshadow-orange border-orange-800/20 md:col-span-3 hover:bg-orange-200",
  background: <Analytics />,
};

export const Hostinge = {
  name: "WEB Hosting and Customer Support",
  description:
    "Discover our comprehensive web hosting services tailored to your requirements. Whether it's shared hosting or dedicated servers, our team of experts will collaborate with you to create a hosting solution that fits your needs. Plus, our 24/7 customer support ensures your website is always up and running. We can also integrate with any build tools you prefer",
  href: "/",
  className:
    "col-span-3 lg:col-span-1 row-span-2 boxshadow-turquoise border-turquoise-500/20 md:row-span-1 lg:row-span-2 md:col-span-3 hover:bg-turquoise-200",
  background: <Hosting />,
};

export const Designe = {
  name: "Design",
  description:
    "Explore our diverse design services crafted to meet your needs. From brand and logo design to e-commerce solutions, we have you covered",
  href: "/",
  className:
    "col-span-3 lg:col-span-1 boxshadow-turquoise md:col-span-2 md:row-span-1 lg:order-last border-turquoise-500/40 hover:bg-turquoise-200",
  background: <Design />,
};

export const Developmente = {
  name: <TitleDevelopment />,
  description: <TextDevelopment />,
  href: "/",
  className:
    "col-span-3 row-span-2 min-h-[700px] lg:col-span-3 boxshadow-violet md:order-last md:col-span-5 border-electric-violet-800/20",
  background: <Development />,
};
