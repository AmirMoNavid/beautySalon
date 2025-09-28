import { useStore } from "@/app/config/store/use-hooks";
import { useRouter } from "next/navigation";

const LastNews = () => {
  const { latestNews, setIsLoading } = useStore();

  const router = useRouter();

  function handleClick(id, slug) {
    setIsLoading(true);
    router.push(`/article/${slug}/${id}`);
  }

  return (
    <div className="p-4 pb-6 w-full md:w-1/4 last-news h-max">
      <div className="tpg-header-wrapper w-full pr-2 mt-3">
        <div className="tpg-widget-heading-wrapper rt-clear heading-style4 ">
          <span className="tpg-widget-heading-line line-left"></span>
          <h4 className="tpg-widget-heading text-sm">
            <span>آخرین نوشته ها:</span>
          </h4>{" "}
          <span className="tpg-widget-heading-line line-right"></span>
        </div>
      </div>
      <ul>
        {latestNews.slice(0, 4).map((news) => (
          <li
            onClick={() => handleClick(news.id, news.category.slug)}
            className="cursor-pointer pb-1 p-1 text-sm transition hover:text-blue-600"
            key={news.id}
          >
            {news.title.length > 45
              ? `${news.title.slice(0, 45)}...`
              : news.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LastNews;
