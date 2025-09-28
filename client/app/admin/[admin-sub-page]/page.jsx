"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/config/contexts/authContext";
import Dashboard from "../../components/admin/Dashboard";
import DataTable, {
  T_EditButton,
  T_DataTableColumn,
} from "../../components/admin/dataTable";
import { useParams, usePathname, useRouter } from "next/navigation";
import { END_POINTS } from "@/app/config/store/endPoints";
import { useStore } from "@/app/config/store/use-hooks";
import { getCookie } from "cookies-next";

const ViewItems = () => {
  const { deleteItem } = useContext(AuthContext);
  const [polls, setPolls] = useState([]);
  const { baseUrl, host } = useStore();
  const token = getCookie("refreshToken");
  const router = useRouter();

  // const {admin-sub-page} = useParams();
  const params = useParams();

  const subPage = params?.["admin-sub-page"];

  // useEffect(() => {
  //   if (location.pathname == "/admin/ownerDetail")
  //     return (location.href = "/admin/dashboard");
  // }, []);

  const d = {
    category: {
      title: "دسته بندی",
      addNewLink: {
        href: "/admin/category/add",
        label: "افزودن دسته بندی",
      },
      dataTable: {
        dataSourceEndpoint: END_POINTS.CATEGORY,
        columns: [
          {
            title: "نام دسته بندی",
            key: "name",
          },
          {
            title: "اسلاگ",
            key: "slug",
          },
        ],
      },
    },
    users: {
      title: "کاربران",
      addNewLink: {
        href: "/admin/users/add",
        label: "افزودن کاربر",
      },
      dataTable: {
        dataSourceEndpoint: END_POINTS.USERS,
        columns: [
          {
            title: "نام و نام خانوادگی",
            key: "name",
          },
          {
            title: "ایمیل",
            key: "email",
          },
          {
            title: "نقش",
            key: "isAdmin",
            value: (val) => {
              return Boolean(val) ? "ادمین" : "نویسنده";
            },
          },
        ],
      },
    },
    article: {
      title: "مقالات",
      addNewLink: {
        href: "/admin/article/add",
        label: "افزودن مقاله",
      },
      dataTable: {
        dataSourceEndpoint: END_POINTS.ARTICLES,
        columns: [
          {
            title: "عنوان",
            key: "title",
          },
          {
            title: "توضیح کوتاه",
            key: "shortDesc",
          },

          {
            title: "عکس",
            key: "url",
          },
        ],
      },
    },

    edcService: {
      title: "خدمات آموزشی",
      addNewLink: {
        href: "/admin/edcService/add",
        label: "افزودن خدمات آموزشی ",
      },
      dataTable: {
        dataSourceEndpoint: "/api/edcService",
        columns: [
          {
            title: "عنوان",
            key: "title",
          },

          {
            title: "عکس",
            key: "url",
          },
        ],
      },
    },
    service: {
      title: "خدمات",
      addNewLink: {
        href: "/admin/service/add",
        label: "افزودن خدمات  ",
      },
      dataTable: {
        dataSourceEndpoint: "/api/service",
        columns: [
          {
            title: "عنوان",
            key: "title",
          },
        ],
      },
    },
    ownerDetail: {
      title: "درباره سالن و مالک",

      dataTable: {
        dataSourceEndpoint: "/api/ownerDetail",
        columns: [
          {
            title: "درباره سالن",
            key: "aboutSalon",
          },
          {
            title: "درباره مالک سالن",
            key: "aboutOwner",
          },

          {
            title: "عکس مالک",
            key: "url",
          },
        ],
      },
    },
    reserve: {
      title: "رزرو",

      dataTable: {
        dataSourceEndpoint: "/api/reserve",
        columns: [
          {
            title: "ساعت",
            key: "reserveTime",
          },
          {
            title: "تاریخ",
            key: "reserveDate",
          },
          {
            title: "سرویس",
            key: "service",
          },

          {
            title: "تلفن",
            key: "number",
          },
          {
            title: "نام",
            key: "name",
          },
        ],
      },
    },

    // video: {
    //   title: "ویدیو",
    //   addNewLink: {
    //     href: "/admin/video/add",
    //     label: "افزودن ویدیو",
    //   },
    //   dataTable: {
    //     dataSourceEndpoint: "/api/video",
    //     columns: [
    //       {
    //         title: "ویدیو",
    //         key: "video",
    //       },
    //     ],
    //   },
    // },

    comment: {
      title: "نظرات",
      addNewLink: {
        href: "/admin/comment/add",
        label: "افزودن کامنت",
      },
      dataTable: {
        dataSourceEndpoint: END_POINTS.COMMENTS,
        columns: [
          {
            title: "متن",
            key: "shortDesc",
          },
          {
            title: "عکس",
            key: "url",
          },
        ],
      },
    },
    number: {
      title: "نظرات",
      addNewLink: {
        href: "/admin/number/add",
        label: "افزودن شماره تماس",
      },
      dataTable: {
        dataSourceEndpoint: "/api/number",
        columns: [
          {
            title: "شماره تماس",
            key: "number",
          },
        ],
      },
    },
    gallery: {
      title: "گالری تصاویر",
      addNewLink: {
        href: "/admin/gallery/add",
        label: "افزودن عکس به گالری",
      },
      dataTable: {
        dataSourceEndpoint: "/api/gallery",
        columns: [
          {
            title: "عکس",
            key: "url",
          },
        ],
      },
    },
    salon: {
      title: "تصاویر سالن",
      addNewLink: {
        href: "/admin/salon/add",
        label: "افزودن عکس سالن",
      },
      dataTable: {
        dataSourceEndpoint: "/api/salon",
        columns: [
          {
            title: "عکس",
            key: "url",
          },
        ],
      },
    },
  };

  const data = d[subPage];

  // if (!data) return <Page404 />;

  // if (data.editAble === undefined || data.editAble === null)
  //   data.editAble = true;
  useEffect(() => {
    if (!token) return window.location.replace(`/admin/auth`);
  }, []);
  return (
    <Dashboard
      title={data.title}
      button={
        data.addNewLink && (
          <Link
            href={data.addNewLink.href}
            className="button px-6 p-2 rounded-md  is-success"
          >
            {data.addNewLink.label}
          </Link>
        )
      }
    >
      <DataTable
        dataSourceEndpoint={data.dataTable.dataSourceEndpoint}
        deleteItem={{
          onDelete(_data) {
            deleteItem(
              `${baseUrl}${data.dataTable.dataSourceEndpoint}`,
              _data.id
            );
          },
          isBtnDisabled(_data) {
            return Boolean(_data.isAdmin);
          },
        }}
        editItem={{
          onEdit(_data) {
            const route = `/admin${data.dataTable.dataSourceEndpoint.replace(
              "/api",
              ""
            )}/edit?id=${_data.id}`;
            router.push(route);
          },
          isBtnDisabled() {
            return !data.editAble;
          },
        }}
        columns={data.dataTable.columns}
      />
    </Dashboard>
  );
};

export default ViewItems;
