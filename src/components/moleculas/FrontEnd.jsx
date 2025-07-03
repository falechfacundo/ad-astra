import ApplyBTN from "../atoms/ApplyBTN";
import { MagicCard } from "../magic_ui/MagicCard";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

export default function FrontEnd() {
  const { theme } = useTheme();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation("frontend");

  return (
    <MagicCard
      className="col-span-full md:col-span-4 lg:col-span-3 max-w-[440px] flex flex-col gap-3 shadow-2xl p-3 hover:bg-electric-violet-100 transition-colors duration-600 ease-in"
      gradientColor={theme === "dark" ? "#8bfff0" : "#8bfff0"}
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-normal">{t("title")}</h3>
        <p className="font-light">{t("description")}</p>
      </div>
      <ApplyBTN clickAction={onOpen} className="bg-electric-violet-300">
        {t("applyNow")}
      </ApplyBTN>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <Input
                  placeholder={t("modal.namePlaceholder")}
                  variant="bordered"
                />
                <Input
                  placeholder={t("modal.lastnamePlaceholder")}
                  variant="bordered"
                />
                <Input
                  placeholder={t("modal.emailPlaceholder")}
                  variant="bordered"
                />
                <Input
                  placeholder={t("modal.portfolioUrlPlaceholder")}
                  variant="bordered"
                />
                <Input
                  placeholder={t("modal.linkedinUrlPlaceholder")}
                  variant="bordered"
                />
                <Input
                  placeholder={t("modal.portfolioPdfPlaceholder")}
                  variant="bordered"
                />
                <Input
                  placeholder={t("modal.valuePlaceholder")}
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  {t("modal.closeButton")}
                </Button>
                <Button color="primary" onPress={onClose}>
                  {t("modal.signInButton")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </MagicCard>
  );
}
