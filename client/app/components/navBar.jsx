import { usePathname, useRouter } from "next/navigation";
import { MdOutlineArticle } from "react-icons/md";
const NavBar = ({ categories, showNav, setShowNav, setIsLoading }) => {
  const path = usePathname();
  const router = useRouter();

  function goToFooter() {
    document.querySelector(".footer").scrollIntoView();
  }

  function handleCategory(slug, id) {
    if (path == `/articles/${slug}`) return;
    setShowNav(false);
    setIsLoading(true);
    router.push(`/articles/${slug}`);
  }

  function showChildren() {
    document.querySelector(`.nav-sub-cats`).classList.toggle("hidden");
    document.querySelector(`.arrow`).classList.toggle("arrow-active");
  }

  return (
    <div className=" fixed z-[410] opacity-100  p-2 nav-bar h-screen md:hidden w-[50%] translate-x-[100%] transition  ">
      <ul className=" flex w-full p-5 flex-col-reverse justify-start gap-4 ">
        <div
          onClick={() => {
            document
              .querySelector(".footer")
              .scrollIntoView({ behavior: "smooth" });
            setShowNav(false);
          }}
          className="flex flex-col items-start  border-b border-b-slate-400 overflow-hidden"
        >
          <span className="transition w-full cursor-pointer flex justify-between items-center hover:opacity-75  font-bold text-[#ffffff] category">
            تماس با ما
          </span>
        </div>
        <div
          onClick={() => {
            router.push("/gallery");
            setShowNav(false);
          }}
          className="flex flex-col items-start  border-b border-b-slate-400 overflow-hidden"
        >
          <span className="transition w-full cursor-pointer flex justify-between items-center hover:opacity-75  font-bold text-[#ffffff] category">
            گالری
          </span>
        </div>

        <div
          onClick={() => {
            router.push("/salon");
            setShowNav(false);
          }}
          className="flex flex-col items-start  border-b border-b-slate-400 overflow-hidden"
        >
          <span className="transition w-full cursor-pointer flex justify-between items-center hover:opacity-75  font-bold text-[#ffffff] category">
            سالن
          </span>
        </div>
        <div
          onClick={() => {
            router.push("/reserve");
            setShowNav(false);
          }}
          className="flex flex-col items-start  border-b border-b-slate-400 overflow-hidden"
        >
          <span className="transition w-full cursor-pointer flex justify-between items-center hover:opacity-75  font-bold text-[#ffffff] category">
            رزرو
          </span>
        </div>
        <div className="flex flex-col items-start  border-b border-b-slate-400 overflow-hidden">
          <span
            className="transition w-full cursor-pointer flex justify-between items-center hover:opacity-75  font-bold text-[#ffffff] category"
            onClick={showChildren}
          >
            <span>مقالات</span>
            {categories.length > 0 ? (
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`size-5 arrow`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            ) : (
              ""
            )}
          </span>
          <div
            className={` nav-sub-cats mt-2  hidden transition z-20 text-[12px] text-white  `}
          >
            {categories.map((cat, i) => (
              <div
                onClick={() => handleCategory(cat.slug)}
                className=" cursor-pointer p-3 mb-[2px] px-2 rounded-md  w-[120px] bg-[#000000c2] text-white transition hover:text-black hover:bg-[#ffffffb0] flex justify-between"
                key={i}
              >
                {cat.name}
                <MdOutlineArticle size="20px" />
              </div>
            ))}
          </div>
        </div>
        <div
          onClick={() => {
            setShowNav(false);
            router.push("/");
          }}
          className="flex flex-col items-start font-bold  border-b border-b-slate-400  "
        >
          <span
            // onMouseOver={() => handleHover(cat.id)}
            // onMouseLeave={() => handleLeave(cat.id)}
            className="mt-2 transition cursor-pointer  font-bold text-[#ffffff] category flex items-center justify-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 pb-[2px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span> صفحه اصلی</span>
          </span>
        </div>
      </ul>
      <svg
        onClick={() => setShowNav(!showNav)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="#fff"
        className="size-7 cursor-pointer absolute top-2 left-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};

export default NavBar;
