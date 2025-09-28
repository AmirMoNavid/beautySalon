import { useContext, useEffect, useRef, useState } from "react";
import { useStore } from "@/app/config/store/use-hooks";
// import RubikaIcon from "../icons/RubikaIcon";
import { FaX } from "react-icons/fa6";

import EitaaIcon from "../../assets/icons/EitaaIcon";
import SoroushIcon from "../../assets/icons/SoroushIcon";
import TelegramIcon from "../../assets/icons/TelegramIcon";
import TwitterIcon from "../../assets/icons/TwitterIcon";
import WhatsAppIcon from "../../assets/icons/WhatsAppIcon";

const ShareBox = ({
  path: _path = null,
  text: _text = null,
  showCloseButton = true,
}) => {
  const { shareBoxStatus, setShareBoxStatus } = useStore();
  const [IS_TEXT_COPIED, set_IS_TEXT_COPIED] = useState(false);
  let { path = "", text = "" } = shareBoxStatus;
  const [url, setUrl] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    setUrl(location.protocol + "//" + location.host + (_path ?? path));
  }, [path, _path]);

  text = _text ?? text;
  // {
  // 	title: 'روبیکا',
  // 	ico: <RubikaIcon link={`et://msg_url?url=${url}&text=${text}`} />,
  // },

  const copyLink = () => {
    set_IS_TEXT_COPIED(true);
    setTimeout(() => {
      set_IS_TEXT_COPIED(false);
    }, 2000);

    if (navigator.userAgent.match(/ipad|ipod|iphone/i)) {
      inputRef.select();
      document.execCommand("copy");
    } else {
      navigator?.clipboard?.writeText(url);
    }
  };

  return (
    <div
      className="flex flex-col justify-between items-center p-5"
      style={{
        position: "relative",
        borderRadius: 10,
        background: "#ffffff",
        width: 320,
        height: 180,
      }}
    >
      <div className="flex justify-between items-center w-full">
        <h3>اشتراک گذاری:</h3>

        {showCloseButton && (
          <button
            className="flex f-center border-none bg-none py-2"
            style={{ width: 25, cursor: "pointer" }}
            onClick={() =>
              setShareBoxStatus({ ...shareBoxStatus, isDisplayed: false })
            }
          >
            <FaX />
          </button>
        )}
      </div>

      <div className="flex shareLinks w-full justify-between items-center">
        {/* <SoroushIcon link={`soroush://share?url=${url}&text=${text}`} /> */}
        <SoroushIcon link={`https://splus.ir/share/url?${url}`} />
        {/* <EitaaIcon link={`et://msg_url?url=${url}&text=${text}`} /> */}
        <EitaaIcon
          link={`https://eitaa.com/share/url?url=${url}&text=${text}`}
        />
        {/* <TelegramIcon link={`tg://msg?text=${text}&url=${url}`} /> */}
        <TelegramIcon link={`https://t.me/share/url?url=${url}&text=${text}`} />
        <WhatsAppIcon link={`https://api.whatsapp.com/send?text=${url}`} />
        <TwitterIcon
          link={`https://twitter.com/share?text=${text}&url=${url}`}
        />
      </div>

      <div className="flex w-full">
        <button
          onClick={copyLink}
          style={{ width: 80 }}
          className={`p-1 ml-2 flex f-center rounded-[5px] border-none`}
        >
          {IS_TEXT_COPIED ? "کپی شد" : "کپی"}
        </button>

        <input
          value={url}
          ref={inputRef}
          readOnly
          style={{ letterSpacing: "0.08rem", textAlign: "left" }}
          type="text"
          className="px-2 w-full rounded-[5px] border"
        />
      </div>
    </div>
  );
};

export default ShareBox;
