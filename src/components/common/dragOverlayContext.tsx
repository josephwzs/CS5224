import { createContext, type ReactNode, useContext, useState } from "react";

interface DragOverlayContextProps {
  leftSidebarOpen: boolean;
  setLeftSidebarOpen: (value: boolean) => void;
  rightSidebarOpen: boolean;
  setRightSidebarOpen: (value: boolean) => void;
}

const OverlayContext = createContext<DragOverlayContextProps | undefined>(
  undefined
);

export const OverlayProvider = ({ children }: { children: ReactNode }) => {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <OverlayContext.Provider
      value={{
        leftSidebarOpen,
        setLeftSidebarOpen,
        rightSidebarOpen,
        setRightSidebarOpen,
      }}
    >
      <div className="z-88 min-h-screen w-full">{children}</div>
    </OverlayContext.Provider>
  );
};

export const useOverlay = (): DragOverlayContextProps => {
  const context = useContext(OverlayContext);
  if (!context)
    throw new Error("useOverlay must be used within OverlayProvider");
  return context;
};
