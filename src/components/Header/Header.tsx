import React from "react";
import { HeaderNavigation } from "../HeaderNavigation/HeaderNavigation";
import { PrintLinks } from "./PrintLinks/PrintLinks";
import useIsPrinting from "../../hooks/useIsPrinting";
import { ComponentProps } from "@Typings/component";

interface HeaderProps extends ComponentProps {
  showName?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ showName = false }) => {
  const isPrinting = useIsPrinting();

  return (
    <header className="flex m-0 flex-col my-5">
      {showName && (
        <h1 className="text-center mt-4 md:text-left">
          <a
            className="text-3xl mt-2 mb-2 no-underline text-gray-700 hover:text-white"
            href="/blog"
          >
            Riccardo Coppola
          </a>
        </h1>
      )}
      <nav className="w-full">
        {isPrinting && <PrintLinks />}
        {!isPrinting && <HeaderNavigation />}
      </nav>
    </header>
  );
};

export default Header;
