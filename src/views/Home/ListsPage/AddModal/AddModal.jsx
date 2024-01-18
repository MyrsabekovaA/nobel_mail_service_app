import React, { useState } from "react";
import { toggleModal, addToAutomatization } from "/@/GlobalStates/Lists";
import { useDispatch, useSelector } from "react-redux";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";

function AddModal({ automatizations }) {
  const dispatch = useDispatch();
  const isLoadingForModal = useSelector(
    (state) => state.lists.isLoadingForModal
  );
  const [selectedAutomatizationId, setSelectedAutomatizationId] = useState("");
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={() => dispatch(toggleModal())}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
    >
      <div
        onClick={handleModalClick}
        className="bg-whiten dark:bg-compdark rounded-lg shadow-xl p-6"
      >
        <h2 className="text-xl dark:text-whiten font-bold mb-4">
          Add to Automatization
        </h2>
        <div className="mb-4">
          <select
            onChange={(e) => setSelectedAutomatizationId(e.target.value)}
            className="bg-gray border border-gray/50 text-graydark text-sm rounded-lg focus:ring-meta-5 focus:border-meta-5 block w-full p-2.5 dark:bg-compdark dark:border-gray/50 dark:placeholder-gray/50 dark:text-whiten dark:focus:ring-meta-5 dark:focus:border-green300"
          >
            <option value="" disabled selected>
              Pick automatization
            </option>
            {automatizations.map((automatization) => (
              <option key={automatization.id} value={automatization.id}>
                {automatization.name}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() =>
            dispatch(addToAutomatization(selectedAutomatizationId))
          }
          className="bg-green300 text-meta-2 dark:bg-success hover:bg-green300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        >
          Add
        </button>
        {isLoadingForModal && <LoadingOverlay />}
      </div>
    </div>
  );
}

export default AddModal;
