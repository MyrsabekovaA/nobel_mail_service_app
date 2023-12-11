import React, { useEffect, useState } from 'react';


function ContactRow({contact, onSelectContact, selectAll}) {
   const checkboxId = `checkbox-${contact.id}`;
   const [isChecked, setIsChecked] = useState(false);
   
   useEffect(() => {
       setIsChecked(selectAll);
   }, [selectAll]);

   const handleCheckboxChange = (e) => {
       setIsChecked(e.target.checked);
       onSelectContact(contact, e.target.checked);
   };
   
   return (
      <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 ease-out duration-300'>
         <td className='w-4 p-4'>
            <div className='flex items-center'>
               <input 
                  id={checkboxId}
                  onChange={handleCheckboxChange} 
                  checked={selectAll || isChecked} 
                  type='checkbox' 
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' 
               />
               <label 
                  htmlFor={checkboxId}
                  className='sr-only'
               >
                  checkbox
               </label>
            </div>
         </td>
         <td className='px-6 py-4'>
            {contact.firstName}
         </td>
         <td className='px-6 py-4'>
            {contact.lastName}
         </td>
         <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'>
            {contact.email}
         </td>
         <td className='px-6 py-4'>
            {contact.age}
         </td>
         <td className='px-6 py-4'>
            {contact.country}
         </td>
         <td className='px-6 py-4'>
            {contact.timezone}
         </td>
         <td className='px-6 py-4'>
            {contact.eduQuestSelectedDateTime}
         </td>
         <td className='px-6 py-4'>
            {contact.eduQuestDecision}
         </td>
      </tr>
   );
}

export default ContactRow