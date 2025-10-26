"use client";
import { useRouter } from "next/navigation";
import moment from "jalali-moment";
import ShareButton from "./shareBox/shareButton";
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
      className={`article-box  flex transition  items-center p-2 my-2 relative  gap-2  hover:translate-1 `}
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
          <ShareButton
            path={`/article/${article.category.slug}/${article.id}`}
            title={article.title}
          />
        </div>
      </div>
    </div>
  );
};

export default Article;
