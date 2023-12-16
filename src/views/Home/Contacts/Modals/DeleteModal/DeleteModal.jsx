import React from 'react';

function DeleteModal({ contactsToDelete, onClose, onConfirm }) {
   
   const handleModalClick = (e) => {
      e.stopPropagation();
   }

   return (
      <div 
         onClick={onClose}
         className='fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center'
      >
         <div 
            onClick={handleModalClick}
            className='bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6'>
            <h2 className='text-xl dark:text-slate-200 font-bold mb-4'>Confirm Deletion</h2>
            <p className='dark:text-slate-200'>Are you sure you want to delete:</p>

               {contactsToDelete.length > 5 ? (
                  <>
                   <span className='text-gray-500'>({contactsToDelete.length}) contacts?</span>
                  </>
               ) : (
                  <ul>
                     {contactsToDelete.map((contact) => (
                        <li key={contact.id} className='text-black dark:text-white'>
                        "<span className='text-gray-500'>{contact.email}</span>"
                        </li>
                     ))}
                  </ul>
               )}

            <div className='flex justify-end mt-6'>
               <button 
                  className='bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-red-400 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150' 
                  type='button'
                  onClick={onConfirm}
               >
                  Yes
               </button>
               <button 
                  className='bg-gray-300 text-gray-700 active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-1 mb-1 ease-linear transition-all duration-150' 
                  type='button'
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