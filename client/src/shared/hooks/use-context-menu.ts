import { useState, MouseEvent, useCallback } from "react";

export const useContextMenu = () => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const [anchorPosition, setPosition] = useState({ left: 0, top: 0 });

  const handleOpenMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setPosition({
      top: event.clientY - 2,
      left: event.clientX - 4,
    });
    setAnchorElement(event.currentTarget);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setAnchorElement(null);
  }, []);

  const withCloseMenu = useCallback(
    (callback: () => void | Promise<void>) => {
      return () => {
        handleCloseMenu();
        void callback();
      };
    },
    [handleCloseMenu]
  );

  return {
    anchorElement,
    isMenuOpen: Boolean(anchorElement),
    anchorPosition,
    handleOpenMenu,
    handleCloseMenu,
    withCloseMenu,
  };
};
