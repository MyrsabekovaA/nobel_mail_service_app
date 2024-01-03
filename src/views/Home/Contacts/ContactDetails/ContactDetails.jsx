import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Datepicker from "tailwind-datepicker-react";

import "./ContactDetails.css";
import ContactActivityList from "./ContactsActivityList/ContactsActivityList";
// import LoadingOverlay from "../../../components/LoadingOverlay/LoadingOverlay";
// import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { successToast, errorToast } from "../../../../GlobalStates/Toasts";
function ContactDetails() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loggedIn.token);

  const options = {
    title: "Select Birth Date",
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    clearBtnText: "Clear",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      todayBtn: "",
      clearBtn: "",
      background: "bg-white dark:bg-slate-800 shadow",
      text: "text-slate-600 dark:text-slate-200 ",
      disabledText: "text-gray-400",
      input: "border-gray-300 focus:border-green-500",
      inputIcon: "text-green-500",
      selected: "bg-green-500 text-white hover:bg-green-500",
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </span>
      ),
      next: () => (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </span>
      ),
    },
    datepickerClassNames: "top-15",
    defaultDate: "",
    language: "en",
    disabledDates: [],
    weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    },
  };

  const [show, setShow] = useState(false);
  let { contactid } = useParams();
  console.log(contactid); // Check if the id is being logged correctly

  const [isOverlayLoading, setIsOverlayLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contact, setContact] = useState({});
  const [activities, setActivities] = useState([
    {
      id: "1",
      contactId: "test-id",
      typeOfActivity: "LINK",
      templateId: "12431",
      activityDescription:
        "Link 'EQ Website' was clicked from the email 'Test Email'",
      createdAt: "2023-01-01T12:00:00Z",
    },
    {
      id: "2",
      contactId: "test-id",
      typeOfActivity: "SOMETHING",
      templateId: "12412",
      activityDescription: "opened email blabla",
      createdAt: "2023-01-01T12:00:00Z",
    },
  ]);

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const fetchContactData = async () => {
    try {
      setIsOverlayLoading(true);
      const response = await axios.get(
        `http://52.59.202.2:3000/api/contacts/${contactid}`,
        { headers: headers }
      );
      const data = response.data;

      setContact({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        timezone: data.timezone,
        age: data.age,
        birthDate: new Date(data.birthDate),
        country: data.country,
        city: data.city,
        occupation: data.occupation.toLowerCase(),
        gender: data.gender.toLowerCase(),
        eduQuestSelectedDateTime: new Date(data.eduQuestSelectedDateTime),
      });
    } catch (error) {
      console.error("Error fetching contact", error);
    } finally {
      setIsOverlayLoading(false);
    }
  };

  const fetchContactActivities = async () => {
    try {
      const response = await axios.get(
        `http://52.59.202.2:3000/action/${contactid}`,
        { headers: headers }
      );
      // setActivities(response.data.userActions);
      console.log(response);
    } catch (error) {
      console.error("Error fetching activities", error);
    }
  };
  useEffect(() => {
    fetchContactData();
    fetchContactActivities();
  }, [contactid]);

  const handleClose = (state) => {
    setShow(state);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      setIsOverlayLoading(true);
      const response = await axios.put(
        `http://52.59.202.2:3000/api/contacts/${contactid}`,
        contact,
        { headers: headers }
      );
      if (response.status === 200) {
        dispatch(successToast(`Contact updated successfully!`));
        fetchContactData();
      }
    } catch (error) {
      dispatch(errorToast(`Failed to update contact.`));
      console.error("Error updating contact", error);
    } finally {
      setIsOverlayLoading(false);
    }
  };

  return (
    <div className="flex-1 py-8">
      <div className="container mx-auto px-4">
        {contact ? (
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 dark:bg-graydark/30 border-b-4 dark:border-b-green300 border-b-meta-5  rounded-xl">
              <form className="flex flex-col px-4 py-2">
                <p className="flex self-start dark:text-meta-2 pb-2 border-b-4 dark:border-b-green300 border-b-meta-5 font-medium mb-6">
                  General Information
                </p>
                <div className="flex flex-col gap-4">
                  <div className="form-item">
                    <label className="create-label" htmlFor="firstName">
                      First Name
                    </label>
                    <input
                      onChange={handleChange}
                      value={contact.firstName}
                      className="create-input"
                      type="text"
                      id="firstName"
                    />
                  </div>
                  <div className="form-item">
                    <label className="create-label" htmlFor="lastName">
                      Second Name
                    </label>
                    <input
                      onChange={handleChange}
                      value={contact.lastName}
                      className="create-input"
                      type="text"
                      id="lastName"
                    />
                  </div>
                  <div className="form-item">
                    <label className="create-label" htmlFor="email">
                      Email
                    </label>
                    <input
                      onChange={handleChange}
                      value={contact.email}
                      className="create-input"
                      type="email"
                      id="email"
                    />
                  </div>
                  <div className="form-item">
                    <label className="create-label" htmlFor="timezone">
                      Timezone
                    </label>
                    <input
                      onChange={handleChange}
                      value={contact.timezone}
                      className="create-input"
                      type="text"
                      id="timezone"
                    />
                  </div>
                </div>
                <p className="flex self-start dark:text-meta-2 pb-2 border-b-4 dark:border-b-green300 border-b-meta-5 font-medium mt-4 mb-4">
                  Personal Information
                </p>
                <div className="flex flex-col gap-4">
                  <div className="form-item relative">
                    <label className="create-label" htmlFor="birthDate">
                      Birth Date
                    </label>
                    <Datepicker
                      options={options}
                      onChange={(date) =>
                        setContact((prevContact) => ({
                          ...prevContact,
                          birthDate: date,
                        }))
                      }
                      show={show}
                      setShow={handleClose}
                      value={contact.birthDate}
                      className="form-date"
                      type="text"
                      id="birthDate"
                    />
                  </div>
                  <div className="form-item">
                    <label className="create-label" htmlFor="age">
                      Age
                    </label>
                    <input
                      onChange={(e) =>
                        setContact((prevContact) => ({
                          ...prevContact,
                          age: +e.target.value,
                        }))
                      }
                      value={contact.age}
                      className="create-input"
                      type="number"
                      id="age"
                    />
                  </div>
                  <div className="form-item">
                    <label className="create-label" htmlFor="country">
                      Country
                    </label>
                    <input
                      onChange={handleChange}
                      value={contact.country}
                      className="create-input"
                      type="text"
                      id="country"
                    />
                  </div>
                  <div className="form-item">
                    <label className="create-label" htmlFor="city">
                      City
                    </label>
                    <input
                      onChange={handleChange}
                      value={contact.city}
                      className="create-input"
                      type="text"
                      id="city"
                    />
                  </div>
                  <div className="form-item">
                    <label className="create-label" htmlFor="occupation">
                      Occupation
                    </label>
                    <select
                      onChange={handleChange}
                      value={contact.occupation}
                      className="create-input"
                      type="text"
                      id="occupation"
                    >
                      <option value="Student">Student</option>
                      <option value="Employed">Employed</option>
                      <option value="Unemployed">Unemployed</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-item">
                    <label className="create-label" htmlFor="gender">
                      Gender
                    </label>
                    <select
                      onChange={handleChange}
                      value={contact.gender}
                      className="create-input"
                      type="text"
                      id="gender"
                    >
                      <option value="other">Other</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <p className="flex self-start dark:text-meta-2 pb-2 border-b-4 dark:border-b-green300 border-b-meta-5 font-medium mt-4 mb-4">
                  EduQuest Information
                </p>
                <div className="flex flex-col gap-4">
                  {/* <div className="form-item">
              <label className="create-label" htmlFor="eqList">
                Assign to EQ
              </label>
              <select
                onChange={handleListAdd}
                value={contact.listIds}
                className="create-input"
                type="text"
                id="eqList"
              >
                <option value="">None</option>
                {eqLists.map((eq) => (
                  <option key={eq.id} value={eq.id}>
                    {eq.eqDate}
                  </option>
                ))}
              </select>
            </div> */}
                  <div className="form-item">
                    <label
                      className="create-label"
                      htmlFor="eduQuestSelectedDateTime"
                    >
                      EQ selected date time
                    </label>
                    <input
                      onChange={handleChange}
                      value={contact.eduQuestSelectedDateTime}
                      className="create-input"
                      type="text"
                      id="eduQuestSelectedDateTime"
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className=" inline-flex self-end bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-green-400 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Save
                  </button>
                </div>
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
              {/* <ContactActivityList activities={contact.activities} /> */}
            </div>
          </div>
        ) : (
          <div>No contact found.</div>
        )}
      </div>
      {/* {isOverlayLoading && <LoadingOverlay />} */}
    </div>
  );
}

export default ContactDetails;
