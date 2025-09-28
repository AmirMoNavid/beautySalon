import { useContext } from "react";
import ShareBox from "./shareBox";
import { useStore } from "@/app/config/store/use-hooks";

const ShareModal = () => {
  const { shareBoxStatus } = useStore();

  return (
    shareBoxStatus.isDisplayed && (
      <div
        className="flex justify-center items-center h-full w-full"
        style={{
          zIndex: 99,
          position: "fixed",
          top: 0,
          left: 0,
          background: "#000000bb",
        }}
      >
        <ShareBox />
      </div>
    )
  );
};

export default ShareModal;
