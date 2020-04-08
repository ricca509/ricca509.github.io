import { useState, useEffect } from "react";

const useIsPrinting = () => {
  const [isPrinting, setIsPrinting] = useState(false);

  const printModeMq =
    window !== undefined && window.matchMedia && window.matchMedia("print");

  useEffect(() => {
    const handlePrintModeChange = () => {
      setIsPrinting(printModeMq && Boolean(printModeMq.matches));
    };

    printModeMq.addListener(handlePrintModeChange);

    return () => {
      printModeMq.removeListener(handlePrintModeChange);
    };
  });

  return isPrinting;
};

export default useIsPrinting;
