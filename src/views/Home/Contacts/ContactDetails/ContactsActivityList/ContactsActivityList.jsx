import React from "react";
import ContactActivity from "../ContactActivity/ContactActivity";

function ContactsActivityList({ activities }) {
  return (
    <div className="flex flex-col gap-8 border-l border-gray-50">
      {activities.map((activity) => (
        <ContactActivity activity={activity} />
      ))}
    </div>
  );
}

export default ContactsActivityList;
