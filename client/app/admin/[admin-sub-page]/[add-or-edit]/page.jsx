"use client";
import Dashboard from "@/app/components/admin/Dashboard";
import EditorBox from "@/app/components/admin/inputs/editor/editorBox";
import { toast } from "react-toastify";
import { useFormHandler } from "@erfanigh/use-form-handler";
import { toastConfig } from "@/app/config/toast/toast";
import { categoryFormSchema } from "@/app/lib/formSchema/categoryFormSchema";
import { userFormSchema } from "@/app/lib/formSchema/userFormSchema";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { articleFormSchema } from "@/app/lib/formSchema/articleFormSchema";
import { ownerDetailsFormSchema } from "@/app/lib/formSchema/ownerDetailsFormSchema";
import { edcServicesFormSchema } from "@/app/lib/formSchema/edcServicesFormSchema";
import { useAsyncEffect } from "@/app/helpers/useAsyncEffect";
import { useContext, useEffect } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/config/contexts/authContext";
import { END_POINTS } from "@/app/config/store/endPoints";
import getServerData from "@/app/helpers/getServerData";
import { useStore } from "@/app/config/store/use-hooks";
import "./style.css";
import { commentSchema } from "@/app/lib/formSchema/commentSchema";

const AddOrEdit = () => {
  const { categories, setCategories } = useStore();
  const { baseUrl } = useStore();

  const d = {
    category: {
      title: "دسته بندی",
      endPoint: END_POINTS.CATEGORY,
      validationSchema: categoryFormSchema,
      inputs: [
        {
          name: "name",
          type: "text",
          placeholder: "نام دسته بندی",
        },
        {
          name: "slug",
          type: "text",
          placeholder: "اسلاگ دسته بندی",
        },
      ],
    },

    article: {
      title: "مقاله",
      endPoint: END_POINTS.ARTICLES,
      validationSchema: articleFormSchema,
      inputs: [
        {
          name: "title",
          type: "text",
          placeholder: "عنوان",
        },
        {
          name: "shortDesc",
          type: "text",
          placeholder: "توضیحات کوتاه",
        },
        {
          name: "desc",
          label: "توضیحات",
          type: "rich-text",
        },

        {
          name: "catId",
          type: "options",
          placeholder: "دسته بندی",
          options: categories,
        },
        {
          name: "file",
          type: "file",
          accept: ".jpg,.png,.jpeg",
          maxSize: {
            width: 1920,
            height: 1080,
          },
          placeholder: "عکس",
          showFilePreview: true,
        },
      ],
    },

    edcService: {
      title: "خدمات آموزشی",
      endPoint: "/api/edcService",
      validationSchema: edcServicesFormSchema,
      inputs: [
        {
          name: "title",
          type: "text",
          placeholder: "توضیحات کوتاه",
        },

        {
          name: "file",
          type: "file",
          accept: ".jpg,.png,.jpeg",
          maxSize: {
            width: 1920,
            height: 1080,
          },
          placeholder: "عکس",
          showFilePreview: true,
        },
      ],
    },
    service: {
      title: "خدمات آموزشی",
      endPoint: "/api/service",
      // validationSchema: edcServicesFormSchema,
      inputs: [
        {
          name: "title",
          type: "text",
          placeholder: "توضیحات کوتاه",
        },
      ],
    },
    ownerDetail: {
      title: "درباره سالن",
      endPoint: "/api/ownerDetail",
      validationSchema: ownerDetailsFormSchema,
      inputs: [
        {
          name: "aboutsalon",
          type: "text",
          placeholder: "درباره سالن",
        },
        {
          name: "aboutowner",
          type: "text",
          placeholder: "درباره مالک سالن",
        },
        {
          name: "file",
          type: "file",
          accept: ".jpg,.png,.jpeg",
          maxSize: {
            width: 1920,
            height: 1080,
          },
          placeholder: "عکس",
          showFilePreview: true,
        },
        {
          name: "file2",
          type: "file",
          accept: ".jpg,.png,.jpeg",
          maxSize: {
            width: 1920,
            height: 1080,
          },
          placeholder: "عکس هدر",
          showFilePreview: true,
        },
      ],
    },
    gallery: {
      title: "عکس",
      endPoint: "/api/gallery",
      inputs: [
        {
          name: "file",
          type: "file",
          accept: ".jpg,.png,.jpeg",
          maxSize: {
            width: 1920,
            height: 1080,
          },
          placeholder: "عکس",
          showFilePreview: true,
        },
      ],
    },
    salon: {
      title: "عکس سالن",
      endPoint: "/api/salon",

      inputs: [
        {
          name: "file",
          type: "file",
          accept: ".jpg,.png,.jpeg",
          maxSize: {
            width: 1920,
            height: 1080,
          },
          placeholder: "عکس",
          showFilePreview: true,
        },
      ],
    },

    users: {
      title: "کاربر",
      endPoint: END_POINTS.USERS,
      validationSchema: userFormSchema,
      inputs: [
        {
          name: "name",
          type: "text",
          placeholder: "عنوان",
        },
        {
          name: "email",
          type: "text",
          placeholder: "ایمیل",
        },
        {
          name: "password",
          type: "password",
          placeholder: "پسورد",
        },
        // {
        //     name: 'confPassword',
        //     type: 'password',
        //     placeholder: 'تکرار پسورد',
        // },
        {
          name: "isAdmin",
          type: "options",
          options: [
            { value: 0, title: "نویسنده" },
            { value: 1, title: "مدیر" },
          ],
          placeholder: "سطح دسترسی",
        },
        {
          name: "file",
          type: "file",
          accept: ".jpg,.png,.jpeg",
          maxSize: {
            width: 1080,
            height: 1080,
          },
          placeholder: "آواتار",
          showFilePreview: true,
        },
      ],
    },

    comment: {
      title: "نظرات",
      endPoint: "/api/comment",
      validationSchema: commentSchema,
      inputs: [
        {
          name: "shortDesc",
          type: "text",
          placeholder: "توضیحات کوتاه",
        },

        {
          name: "file",
          type: "file",
          accept: ".jpg,.png,.jpeg",
          maxSize: {
            width: 1920,
            height: 1080,
          },
          placeholder: "عکس",
          showFilePreview: true,
        },
      ],
    },
    number: {
      title: "شماره",
      endPoint: "/api/number",
      inputs: [
        {
          name: "number",
          type: "text",
          placeholder: "شماره تلفن",
        },
      ],
    },
  };

  const { setEditorBoxState } = useContext(AuthContext);
  const params = useParams();
  const adminSubPage = params?.["admin-sub-page"];
  const isAddPage = params?.["add-or-edit"] === "add";
  const data = d[adminSubPage];
  const token = getCookie("refreshToken");
  const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!token) return window.location.replace(`/admin/auth`);
    setEditorBoxState({
      data: {},
      isEditMode: false,
    });
  }, [pathname, searchParams]);

  const theId = searchParams.get("id");

  useAsyncEffect(async () => {
    setCategories(await getServerData(END_POINTS.CATEGORY));

    if (!isAddPage) {
      const dataToEdit = await getServerData(`${data.endPoint}/${theId}`);

      setEditorBoxState({
        data: dataToEdit,
        isEditMode: true,
      });
    }
  }, []);

  if (data.editAble === undefined || data.editAble === null)
    data.editAble = true;

  const endPoint = isAddPage ? data.endPoint : `${data.endPoint}/${theId}`;

  const { send } = useFormHandler({
    endPoint: `${baseUrl}${endPoint}`,
    validationSchema: data.validationSchema,
    axiosConfigs: {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    onSuccess() {
      toast.success("عملیات موفقیت آمیز بود.", toastConfig);
      setTimeout(() => {
        if (pathname === "/admin/ownerDetail/edit") {
          router.push("/admin/dashboard");
        } else {
          router.push("/admin" + data.endPoint.replace("/api", ""));
        }
      }, 1000);
    },
  });

  return !data.editAble && !isAddPage ? (
    <Page404 />
  ) : (
    <Dashboard title={`${isAddPage ? "افزودن" : "ویرایش"} ${data.title}`}>
      <EditorBox
        endPoint={data.endPoint}
        inputs={data.inputs}
        send={(e) => send(e, isAddPage ? "post" : "put")}
      />
    </Dashboard>
  );
};

export default AddOrEdit;
