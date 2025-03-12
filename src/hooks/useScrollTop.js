import { useEffect } from "react";

export const useScrollTop = (dependencies = []) => {
  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, dependencies);
};
