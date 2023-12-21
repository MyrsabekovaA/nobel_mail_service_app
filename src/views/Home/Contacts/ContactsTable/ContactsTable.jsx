import React from 'react';
import './ContactsTable.css'
import ContactRow from '../ContactRow/ContactRow';

function ContactsTable({contacts, onSelectContact, selectAll, onCheckAllChange}) {
   return (
      <div className='table-wrapper overflow-x-auto relative rounded-lg mt-8 dark:bg-compdark'>
         <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400 dark:bg-compdark'>
            <thead className='text-xs text-gray-700 uppercase whitespace-nowrap bg-gray-50 dark:bg-compdark dark:text-gray-400'>
               <tr className="dark:bg-compdark">
                     <th scope='col' className='p-4'>
                     <input 
                        id='check-all'
                        onChange={(e) => onCheckAllChange(e.target.checked)} 
                        checked={selectAll}
                        type='checkbox' 
                        className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' 
                     />
                     <label 
                        htmlFor='check-all'
                        className='sr-only'
                     >
                        checkbox
                     </label>
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        First name
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        Last Name
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        Email
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        Age
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        country
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        timezone
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        EQ Selected Date
                     </th>
                     <th scope='col' className='px-6 py-3'>
                        EQ Decision
                     </th>
               </tr>
            </thead>
            <tbody>
               {contacts.map((contact) => (
                  <ContactRow key={contact.id} contact={contact} onSelectContact={onSelectContact} selectAll={selectAll}/>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default ContactsTable