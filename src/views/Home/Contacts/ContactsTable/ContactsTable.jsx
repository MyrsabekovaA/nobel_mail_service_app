import React from "react";
import "./ContactsTable.css";
import ContactRow from "../ContactRow/ContactRow";

function ContactsTable({
  contacts,
  onSelectContact,
  selectAll,
  onCheckAllChange,
}) {
  // const onCheckAllChange = (isChecked) => {
  //   setSelectAll(isChecked);
  //   contacts.forEach((contact) => {
  //     onSelectContact(contact, isChecked); // Update each contact's selected state
  //   });
  // };
  return (
    <div className="overflow-x-auto relative rounded-lg mt-8">
      <table className="text-sm text-center border-gray/20 text-gray dark:text-gray-400">
        <thead className="text-xs uppercase whitespace-nowrap">
          <tr className="dark:bg-graydark">
            <th scope="col" className="p-4">
              <input
                id="check-all"
                onChange={(e) => onCheckAllChange(e.target.checked)}
                checked={selectAll}
                type="checkbox"
                className="w-4 h-4 rounded"
              />
              <label htmlFor="check-all" className="sr-only">
                checkbox
              </label>
            </th>
            <th scope="col" className="px-6 py-3">
              First name
            </th>
            <th scope="col" className="px-6 py-3">
              Last Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Decision
            </th>
            <th scope="col" className="px-6 py-3">
              EQ Selected Date
            </th>
            <th scope="col" className="px-6 py-3">
              Participation
            </th>
            <th scope="col" className="px-6 py-3">
              timezone
            </th>
            <th scope="col" className="px-6 py-3">
              Birth Date
            </th>
            <th scope="col" className="px-6 py-3">
              Age
            </th>
            <th scope="col" className="px-6 py-3">
              Country
            </th>
            <th scope="col" className="px-6 py-3">
              City
            </th>
            <th scope="col" className="px-6 py-3">
              Occupation
            </th>
            <th scope="col" className="px-6 py-3">
              Gender
            </th>
            <th scope="col" className="px-6 py-3">
              Motivation
            </th>
            <th scope="col" className="px-6 py-3">
              Source
            </th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <ContactRow
              key={contact.id}
              contact={contact}
              onSelectContact={onSelectContact}
              selectAll={selectAll}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactsTable;
