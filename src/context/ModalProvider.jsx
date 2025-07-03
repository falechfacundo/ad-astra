import { createContext, useState, useContext, useEffect } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 15000);

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, handleClose }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
