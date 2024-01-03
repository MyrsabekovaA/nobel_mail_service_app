import React, { useEffect, useState } from "react";
import "./ContactRow.css";
import { Link } from "react-router-dom";

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

  const displayValueOrDash = (value) => {
    return value || "—";
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : "—";
  };

  return (
    <tr className="bg-whiten dark:bg-graydark/40 border-b ease-out duration-300 dark:hover:bg-graydark/80 hover:bg-gray/10">
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={checkboxId}
            onChange={handleCheckboxChange}
            checked={isChecked}
            type="checkbox"
            className="w-4 h-4 rounded"
          />
          <label htmlFor={checkboxId} className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <td className="px-6 py-4 ">
        <Link
          to={`/Home/Contacts/${contact.id}`}
          className="transition-colors duration-200 hover:text-meta-5 dark:hover:text-green300 hover:underline"
        >
          {displayValueOrDash(contact.firstName)}
        </Link>
      </td>
      <td className="px-6 py-4 ">
        <Link
          to={`/Home/Contacts/${contact.id}`}
          className="transition-colors duration-200 hover:text-meta-5 dark:hover:text-green300 hover:underline"
        >
          {displayValueOrDash(contact.lastName)}
        </Link>
      </td>
      <td className="px-6 py-4 font-medium text-graydark whitespace-nowrap dark:text-white">
        <Link
          to={`/Home/Contacts/${contact.id}`}
          className="transition-colors duration-200  hover:text-meta-5 dark:hover:text-green300 hover:underline"
        >
          {displayValueOrDash(contact.email)}
        </Link>
      </td>
      <td className="px-6 py-4 flex items-center gap-1 ">
        <div
          className={`${
            contact.eduQuestDecision === "Selected"
              ? "bg-green300"
              : contact.eduQuestDecision === "Pending"
              ? "bg-warning"
              : "bg-meta-1"
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
