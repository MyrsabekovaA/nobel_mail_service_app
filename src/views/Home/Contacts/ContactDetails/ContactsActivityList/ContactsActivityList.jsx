import React from "react";
import ContactActivity from "../ContactActivity/ContactActivity";

function ContactsActivityList({ activities }) {
  return (
    <div className="">
      <div className="max-h-[750px] overflow-y-auto flex flex-col gap-8 border-l border-gray/50">
        {activities.map((activity) => (
          <ContactActivity activity={activity} key={activity.id} />
        ))}
      </div>
    </div>
  );
}

export default ContactsActivityList;
