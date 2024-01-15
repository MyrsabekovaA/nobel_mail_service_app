import React from "react";

function AddModal({ onClose, automatizations, listId }) {
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
    >
      <div
        onClick={handleModalClick}
        className="bg-whiten dark:bg-compdark rounded-lg shadow-xl p-6"
      >
        <h2 className="text-xl dark:text-whiten font-bold mb-4">
          Add to Automatization
        </h2>
        <div>
          <select className="bg-transparent border border-gray/50 text-graydark text-sm rounded-lg focus:ring-meta-5 focus:border-meta-5 block w-full p-2.5 dark:bg-gray dark:border-gray/50 dark:placeholder-gray/50 dark:text-white dark:focus:ring-meta-5 dark:focus:border-green300">
            {automatizations.map((automatization) => (
              <option key={automatization.id} value={automatization.id}>
                {automatization.name}
              </option>
            ))}
          </select>
        </div>
        <button className="">Save</button>
      </div>
    </div>
  );
}

export default AddModal;
