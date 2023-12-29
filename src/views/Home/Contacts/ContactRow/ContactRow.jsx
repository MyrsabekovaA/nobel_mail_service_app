import React, { useEffect, useState } from 'react';
import './ContactRow.css';

function ContactRow({ contact, onSelectContact, selectAll }) {
  const checkboxId = `checkbox-${contact.id}`;
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (selectAll !== isChecked) {
      setIsChecked(selectAll);
    }
  }, [selectAll]);

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setIsChecked(checked);
    onSelectContact(contact, checked);
  };

  // Utility function to display a dash for empty fields
  const displayValueOrDash = (value) => {
    return value || "—";
  };

  // Handle date formatting and empty date fields
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : "—";
  };

  return (
    <tr className="dark:bg-gray-800 bg-white border-b dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 ease-out duration-300">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={checkboxId}
            onChange={handleCheckboxChange}
            checked={isChecked}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor={checkboxId} className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <td className="px-6 py-4">
        <Link
          to={`/Home/Contacts/${contact.id}`}
          className="transition-colors duration-200 hover:text-green-500 hover:underline"
        >
          {displayValueOrDash(contact.firstName)}
        </Link>
      </td>
      <td className="px-6 py-4">
        <Link
          to={`/Home/Contacts/${contact.id}`}
          className="transition-colors duration-200 hover:text-green-500 hover:underline"
        >
          {displayValueOrDash(contact.lastName)}
        </Link>
      </td>
      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <Link
          to={`/Home/Contacts/${contact.id}`}
          className="transition-colors duration-200 hover:text-green-500 hover:underline"
        >
          {displayValueOrDash(contact.email)}
        </Link>
      </td>
      <td className="px-6 py-4 flex items-center gap-1">
        <div
          className={`${
            contact.eduQuestDecision === "Selected"
              ? "bg-green-300"
              : contact.eduQuestDecision === "Pending"
              ? "bg-orange-300"
              : "bg-red-300"
          } flex w-4 h-4 rounded-full`}
        ></div>
        {displayValueOrDash(contact.eduQuestDecision)}
      </td>
      <td className="px-6 py-4">
        {formatDate(contact.eduQuestSelectedDateTime)}
      </td>
      <td className="px-6 py-4">
        {displayValueOrDash(contact.isEqParticipationConfirmed)}
      </td>
      <td className="px-6 py-4">{displayValueOrDash(contact.timezone)}</td>
      <td className="px-6 py-4">{formatDate(contact.birthDate)}</td>
      <td className="px-6 py-4">{displayValueOrDash(contact.age)}</td>
      <td className="px-6 py-4">{displayValueOrDash(contact.country)}</td>
      <td className="px-6 py-4">{displayValueOrDash(contact.city)}</td>
      <td className="px-6 py-4">{displayValueOrDash(contact.occupation)}</td>
      <td className="px-6 py-4">{displayValueOrDash(contact.gender)}</td>
      <td className="px-6 py-4">
        {displayValueOrDash(contact.intershipMotivation)}
      </td>
      <td className="px-6 py-4">
        {displayValueOrDash(contact.sourceOfReferral)}
      </td>
    </tr>
  );
}

export default ContactRow;
