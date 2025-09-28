import { useRouter } from "next/navigation";
import moment from "jalali-moment";
import ShareButton from "./shareBox/shareButton";
import { FaShareAlt } from "react-icons/fa";
import { useStore } from "../config/store/use-hooks";

const Article = ({ article, slug }) => {
  const { setIsLoading, isLoading, host } = useStore();
  const router = useRouter();

  function handleClick(id) {
    setIsLoading(true);
    router.push(`/article/${slug}/${id}`);
  }
  return (
    <div
      className={`article-box  flex transition  items-center p-2 my-2 relative  gap-2 ${
        isLoading ? "opacity-80" : ""
      } hover:translate-1 `}
      key={article.id}
    >
      <img
        className="w-[15%] h-auto cursor-pointer"
        src={`${host}${article.url}`}
        onClick={() => handleClick(article.id)}
      />
      <div className="flex flex-col w-[85%]  justify-center">
        <div className="flex flex-col items-start justify-start">
          <h2
            onClick={() => handleClick(article.id)}
            className="font-bold text-[16px] cursor-pointer transition hover:text-[#0D6EFD]"
          >
            {article.title}
          </h2>
          <p className="text-sm">{article.shortDesc}</p>
        </div>

        <div className=" p-1 flex items-center justify-end gap-2 opacity-75 text-sm w-[100%]">
          <p>
            {moment(article.createdAt).locale("fa").format("YYYY/MM/DD - H:mm")}
          </p>
          <ShareButton path={`/article/${article.id}`} title={article.title} />
          {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
          />
        </svg> */}
        </div>
      </div>
    </div>
  );
};

export default Article;
