import React, { useEffect, useState } from "react";
import "./ContactRow.css";
import { Link } from "react-router-dom";
import moment from "moment";

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

  const formatDate = (dateString, withTime) => {
    if (dateString && withTime === false) {
      return moment(dateString).format("DD.MM.YYYY");
    } else if (dateString && withTime === true) {
      return moment.utc(dateString).format("DD.MM.YYYY HH:mm");
    } else {
      return "—";
    }
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
      <td className="px-6 py-4 font-medium text-graydark whitespace-nowrap dark:text-whiten">
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
            contact.eduQuestDecision === "SELECTED"
              ? "bg-green300"
              : contact.eduQuestDecision === "TRY_AGAIN" ||
                contact.eduQuestDecision === "ENGLISH_ISSUE" ||
                contact.eduQuestDecision === "BEHAVIOR_ISSUE" ||
                contact.eduQuestDecision === "AUDIO_ISSUE" ||
                contact.eduQuestDecision === "PREFERRED_DEVICE" ||
                contact.eduQuestDecision === "BACKGROUND_NOISES" ||
                contact.eduQuestDecision === "POOR_INTERNET_CONNECTION"
              ? "bg-warning"
              : contact.eduQuestDecision === "WE_MISSED_YOU"
              ? "bg-meta-1"
              : ""
          } flex w-4 h-4 rounded-full`}
        ></div>
        {displayValueOrDash(contact.eduQuestDecision)}
      </td>
      <td className="px-6 py-4">
        {formatDate(contact.eduQuestSelectedDateTime, true)}
      </td>
      <td className="px-6 py-4">
        {displayValueOrDash(contact.isEqParticipationConfirmed)}
      </td>
      <td className="px-6 py-4">{displayValueOrDash(contact.timezone)}</td>
      <td className="px-6 py-4">{formatDate(contact.birthDate, false)}</td>
      <td className="px-6 py-4">{displayValueOrDash(contact.age)}</td>
      <td className="px-6 py-4">{displayValueOrDash(contact.country)}</td>
      <td className="px-6 py-4">{displayValueOrDash(contact.city)}</td>
      <td className="px-6 py-4">{displayValueOrDash(contact.occupation)}</td>
      <td className="px-6 py-4">{displayValueOrDash(contact.gender)}</td>
      <td className="px-6 py-4">
        <p
          className="whitespace-nowrap text-ellipsis overflow-hidden max-w-[200px] hover:text-meta-5 cursor-pointer"
          title={`${contact.intershipMotivation}`}
        >
          {displayValueOrDash(contact.intershipMotivation)}
        </p>
      </td>
      <td className="px-6 py-4">
        {displayValueOrDash(contact.sourceOfReferral)}
      </td>
    </tr>
  );
}

export default ContactRow;
