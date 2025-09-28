import { ReactNode, useContext, useState } from "react";
import { AuthContext } from "@/app/config/contexts/authContext";
import ConfirmModal from "./confirmModal";
import { useAsyncEffect } from "@/app/helpers/useAsyncEffect";
import getServerData from "@/app/helpers/getServerData";
import { isValidPathOrUrl } from "@/app/helpers/isValidPathOrUrl";
import "./index.css";
import { useStore } from "@/app/config/store/use-hooks";
import { axiosInstance } from "@/app/config/axios/axiosInstance";
import { usePathname } from "next/navigation";

const DataTable = (props) => {
  const { columns, deleteItem, editItem } = props;
  const { baseUrl } = useStore();
  const { setConfirmModalDisplay } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [item, setItem] = useState({});

  const path = usePathname();

  useAsyncEffect(async () => {
    if ("data" in props) return setData(props.data);

    setData(await getServerData(props.dataSourceEndpoint));
  }, [props]);

  return (
    <>
      <table className="w-full table">
        <thead className="w-full  border-b border-b-slate-600">
          <tr className="text-sm ">
            <th className="ml-3 mb-4">شماره</th>
            {columns.map((val, index) => (
              <th key={index}>{val.title}</th>
            ))}
            <th>ویرایش</th>
            <th>حذف</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(data) &&
            data?.map((item, index, arr) => (
              <tr
                key={item.id}
                className=" border-b-[0.5px] border-b-slate-600 text-xs"
              >
                <td>{arr.length - index}</td>
                {Object.entries(item).map(([key, _], index) => {
                  let val = item[props.columns[index]?.key];

                  if (val === undefined) return null;

                  const valueFn = props.columns[index].value;
                  val = valueFn ? valueFn(val) : val;

                  return (
                    <td key={index}>
                      {typeof val === "string" &&
                      isValidPathOrUrl(val) &&
                      val[0] !== "h" ? (
                        <img width={100} src={val} alt="" />
                      ) : (
                        val
                      )}
                    </td>
                  );
                })}

                {
                  <td>
                    {"customEditButton" in editItem ? (
                      editItem.customEditButton(item)
                    ) : (
                      <button
                        onClick={() => editItem.onEdit(item)}
                        disabled={path == "/admin/reserve"}
                        className="button is-success cursor-pointer rounded-md p-1 px-4 my-4"
                        title={
                          editItem.isBtnDisabled(item)
                            ? "این آیتم قابل ویرایش نمیباشد."
                            : ""
                        }
                      >
                        ویرایش
                      </button>
                    )}
                  </td>
                }

                <td>
                  <button
                    onClick={() => {
                      setItem(item);
                      setConfirmModalDisplay(true);
                    }}
                    className="button is-danger bg-red-600  rounded-md p-1 px-4 my-4 mr-1"

                    // disabled={deleteItem.isBtnDisabled(item)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <ConfirmModal
        onSuccessCallback={() => {
          deleteItem.onDelete(item);
          setConfirmModalDisplay(false);
        }}
      />
    </>
  );
};

export default DataTable;
