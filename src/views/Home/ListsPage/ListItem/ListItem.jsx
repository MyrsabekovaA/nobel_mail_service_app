import React from "react";
import moment from "moment";
import { toggleModal, setSelectedListId } from "/@/GlobalStates/Lists";
import { useDispatch } from "react-redux";

function ListItem({ list }) {
  const dispatch = useDispatch();

  const formatDate = (dateString, withTime) => {
    if (dateString && withTime === false) {
      return moment(dateString).format("DD.MM.YYYY");
    } else if (dateString && withTime === true) {
      return moment.utc(dateString).format("DD.MM.YYYY HH:mm");
    } else {
      return "—";
    }
  };

  return (
    <tr className="bg-whiten dark:bg-graydark/40 border-b ease-out duration-300 dark:hover:bg-graydark/80 hover:bg-gray/10">
      <td className="px-4 py-2.5 text-meta-5 font-medium text-center">
        {list.name}
      </td>
      <td className="px-4 py-2.5">contacts: {list.contactsCount}</td>
      <td className="px-4 py-2.5">{formatDate(list.createdAt, true)}</td>
      <td className="px-4 py-2.5">
        <div>
          <button
            onClick={() => {
              dispatch(setSelectedListId(list.id));
              dispatch(toggleModal());
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ListItem;
