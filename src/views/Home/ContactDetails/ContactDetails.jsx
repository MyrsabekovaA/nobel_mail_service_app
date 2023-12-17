import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./ContactDetails.css";
import ContactActivityList from "./ContactsActivityList/ContactsActivityList";

function ContactDetails() {
  let { contactId } = useParams();
  // const [isLoading, setIsLoading] = useState(true);
  const [contact, setContact] = useState({
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
    age: 30,
    country: "Canada",
    timezone: "GMT-04:00",
    sourceOfReferral: "Website",
    eduQuestSelectedDateTime: "2023-10-03T15:45:00Z",
    eduQuestDecision: "Pending",
    activities: [
      {
        typeOfActivity: "Email",
        activityDescription: "User opened an email",
        createdAt: "10/20/23 22:00",
      },
      {
        typeOfActivity: "Unsubscibed",
        activityDescription: "User opened an email",
        createdAt: "10/20/23 22:00",
      },
      {
        typeOfActivity: "Subscribed",
        activityDescription: "User opened an email",
        createdAt: "10/20/23 22:00",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/contacts/${contactId}`, contact);
    } catch (error) {
      console.error("Error updating contact", error);
    }
    // setIsLoading(false);
  };
  // useEffect(() => {
  //   const fetchContactData = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get(`/api/contacts/${contactId}`);
  //       setContact(response.data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.error('Error fetching contact', error);
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchContactData();
  // }, [contactId]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="bg-slate-100 dark:bg-gray-900 min-h-full h-screen">
      <div className="container mx-auto px-4">
        {contact ? (
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 bg-slate-800 ">
              <form
                className="flex flex-col gap-4 p-6 rounded-md"
                onSubmit={handleSubmit}
              >
                <h2 className=" font-medium text-lg dark:text-white text-slate-900 ">
                  Contact Info
                </h2>
                <label className="form-item">
                  First Name:
                  <input
                    type="text"
                    name="firstName"
                    value={contact.firstName}
                    onChange={handleChange}
                  />
                </label>
                <label className="form-item">
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    value={contact.lastName}
                    onChange={handleChange}
                  />
                </label>
                <label className="form-item">
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                  />
                </label>
                <label className="form-item">
                  Age:
                  <input
                    type="number"
                    name="age"
                    value={contact.age}
                    onChange={handleChange}
                  />
                </label>
                <label className="form-item">
                  Country:
                  <input
                    type="text"
                    name="country"
                    value={contact.country}
                    onChange={handleChange}
                  />
                </label>
                <label className="form-item">
                  Timezone:
                  <input
                    type="text"
                    name="timezone"
                    value={contact.timezone}
                    onChange={handleChange}
                  />
                </label>
                <label className="form-item">
                  Source of Referral:
                  <input
                    type="text"
                    name="sourceOfReferral"
                    value={contact.sourceOfReferral}
                    onChange={handleChange}
                  />
                </label>
                <label className="form-item">
                  Selected Date/Time:
                  <input
                    type=""
                    name="eduQuestSelectedDateTime"
                    value={contact.eduQuestSelectedDateTime}
                    onChange={handleChange}
                  />
                </label>
                <label className="form-item">
                  Decision:
                  <select
                    name="eduQuestDecision"
                    value={contact.eduQuestDecision}
                    onChange={handleChange}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </label>
                <button
                  type="submit"
                  className="flex mt-3 self-end bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-green-400 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                >
                  Update Contact
                </button>
              </form>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <h3 className="ml-12 text-lg text-slate-300">
                  Recent Activities
                </h3>
                <select
                  // onChange={}
                  className="self-end bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="all activities">All Activities</option>
                  <option value="email">Email</option>
                  <option value="unsubscribe">Unsubscribe</option>
                  <option value="something">Something</option>
                </select>
              </div>
              <ContactActivityList activities={contact.activities} />
            </div>
          </div>
        ) : (
          <div>No contact found.</div>
        )}
      </div>
    </div>
  );
}

export default ContactDetails;
