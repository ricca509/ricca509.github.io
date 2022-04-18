import type { GatsbySSR } from "gatsby";

// Adds a class name to the body element
export const onRenderBody: GatsbySSR["onRenderBody"] = (
  { setBodyAttributes },
  pluginOptions
) => {
  setBodyAttributes({
    className: "font-body font-normal text-xl leading-6 text-gray-600",
  });
};
