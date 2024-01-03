import React from "react";

function DeleteModal({ contactsToDelete, onClose, onConfirm }) {
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
          Confirm Deletion
        </h2>
        <p className="dark:whiten">Are you sure you want to delete:</p>

        {contactsToDelete.length > 5 ? (
          <>
            <span className="text-danger">
              ({contactsToDelete.length}) contacts?
            </span>
          </>
        ) : (
          <ul>
            {contactsToDelete.map((contact) => (
              <li key={contact.id} className="text-compdark dark:text-green300">
                "<span className="text-gray-500">{contact.email}</span>"
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-end mt-6">
          <button
            className="bg-danger text-whiten font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-meta-1 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={onConfirm}
          >
            Delete
          </button>
          <button
            className="bg-gray/50 text-whiten font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
