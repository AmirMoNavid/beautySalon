import { useContext } from "react";
import { FaShareAlt } from "react-icons/fa";
import { useStore } from "@/app/config/store/use-hooks";

const ShareButton = ({ path = "", title = "" }) => {
  const { setShareBoxStatus } = useStore();
  const displayShareBox = () => {
    console.log("sharebox");
    setShareBoxStatus({
      isDisplayed: true,
      path,
      text: "پایگاه خبری آبیکی ها | " + title,
    });
  };

  return (
    <button
      className="bg-none mr-2 f-center"
      style={{
        border: "1px solid #ccc",
        cursor: "pointer",
        borderRadius: 5,
        padding: ".4rem",
      }}
      onClick={displayShareBox}
    >
      <FaShareAlt />
    </button>
  );
};

export default ShareButton;
