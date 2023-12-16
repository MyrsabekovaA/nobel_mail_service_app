import React, { useState } from 'react';
import './CreateModal.css';

function CreateModal({onClose, onCreate}) {
   const [contactData, setContactData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      timezone: '',
      phone: '',
      birthDate: '',
      occupancy: '',
      gender: '',
   });

   const handleInputChange = (e) => {
      setContactData({ ...contactData, [e.target.id]: e.target.value });
   };

   const handleSubmit = () => {
      onCreate(contactData);
      onClose(); 
   };

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
            className='bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-auto sm:w-96 max-h-[650px] overflow-y-auto'>
            <h2 className='text-xl text-slate-600 dark:text-slate-200 font-bold mb-8 text-center block'>Contact Creation</h2>
            <form>
               <p className='dark:text-slate-200 mb-6'>General Information:</p>
               <div className='flex flex-col gap-4'>
                  <div className='create-item'>
                     <label className='create-label' htmlFor='firstName'>First Name</label>
                     <input 
                        onChange={handleInputChange} 
                        value={contactData.firstName} 
                        className='create-input' 
                        type='text' 
                        id='firstName'
                     />
                  </div>
                  <div className='create-item'>
                     <label className='create-label' htmlFor='secondName'>Second Name</label>
                     <input 
                        onChange={handleInputChange} 
                        value={contactData.secondName} 
                        className='create-input' 
                        type='text' 
                        id='secondName'
                     />
                  </div>
                  <div className='create-item'>
                     <label className='create-label' htmlFor='email'>Email</label>
                     <input 
                        onChange={handleInputChange} 
                        value={contactData.email} 
                        className='create-input' 
                        type='email' 
                        id='email'
                     />
                  </div>
                  <div className='create-item'>
                     <label className='create-label' htmlFor='timezone'>Timezone</label>
                     <input 
                        onChange={handleInputChange} 
                        value={contactData.timezone} 
                        className='create-input' 
                        type='text' 
                        id='timezone'
                     />
                  </div>
               </div>
               <p className='dark:text-slate-200 mt-4 mb-4'>Personal Information:</p>
               <div className='flex flex-col gap-4'>
                  <div className='create-item'>
                     <label className='create-label' htmlFor='phone'>Phone Number</label>
                     <input 
                        onChange={handleInputChange} 
                        value={contactData.phone} 
                        className='create-input' 
                        type='phone' 
                        id='phone'
                     />
                  </div>
                  <div className='create-item'>
                     <label className='create-label' htmlFor='birthDate'>Birth Date</label>
                     <input 
                        onChange={handleInputChange} 
                        value={contactData.birthDate} 
                        className='create-input' 
                        type='text' 
                        id='birthDate'
                     />
                  </div>
                  <div className='create-item'>
                     <label className='create-label' htmlFor='occupancy'>Occupancy</label>
                     <input 
                        onChange={handleInputChange} 
                        value={contactData.occupancy} 
                        className='create-input' 
                        type='text' 
                        id='occupancy'
                     />
                  </div>
                  <div className='create-item'>
                     <label className='create-label' htmlFor='gender'>Gender</label>
                     <input 
                        onChange={handleInputChange} 
                        value={contactData.gender} 
                        className='create-input' 
                        type='text' 
                        id='gender'
                     />
                  </div>
               </div>
            </form>
            <div className='flex justify-end mt-6'>
               <button
                  onClick={handleSubmit} 
                  className='bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-green-400 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150' 
                  type='button'
               >
                  Create
               </button>
               <button 
                  onClick={onClose}
                  className='bg-gray-300 text-gray-700 active:bg-gray-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-1 mb-1 ease-linear transition-all duration-150' 
                  type='button'
               >
                  Cancel
               </button>
            </div>
         </div>
      </div>
   );
}

export default CreateModal;