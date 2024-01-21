import React, { useEffect, useState } from "react";
import "./CreateModal.css";
import Datepicker from "tailwind-datepicker-react";

function CreateModal({ onClose, onCreate }) {
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
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    city: "",
    email: "",
    gender: "",
    country: "",
    timezone: "",
    occupation: "",
    sourceOfReferral: "",
    eduQuestDecision: "Pending",
    intershipMotivation: "",
    birthDate: "",
    eduQuestSelectedDateTime: "",
  });
  const [eqLists, setEqLists] = useState([
    { id: 1, eqDate: "25 November Weekend" },
    { id: 2, eqDate: "23 December Weekday" },
  ]);
  const [show, setShow] = useState(false);
  const handleClose = (state) => {
    setShow(state);
  };
  const handleInputChange = (e) => {
    setContactData({ ...contactData, [e.target.id]: e.target.value });
  };
  const handleBirthDateChange = (date) => {
    setContactData({ ...contactData, birthDate: date });
  };

  useEffect(() => {
    console.log(contactData);
  }, [contactData]);

  const handleSubmit = () => {
    onCreate(contactData);
    // onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center"
    >
      <div
        onClick={handleModalClick}
        className="bg-whiten dark:bg-compdark rounded-lg shadow-xl p-6 w-96 sm:w-96 max-h-[650px] md:min-w-[550px] overflow-y-auto"
      >
        <h2 className="text-xl text-compdark dark:text-whiten font-medium mb-8 text-center block">
          Contact Creation
        </h2>
        <form>
          <p className="dark:text-whiten/70 mb-6">General Information</p>
          <div className="flex flex-col gap-4">
            <div className="md:flex md:gap-3">
              <div className="create-item">
                <label className="create-label" htmlFor="firstName">
                  First Name
                </label>
                <input
                  onChange={handleInputChange}
                  value={contactData.firstName}
                  className="create-input"
                  type="text"
                  id="firstName"
                />
              </div>
              <div className="create-item">
                <label className="create-label" htmlFor="lastName">
                  Second Name
                </label>
                <input
                  onChange={handleInputChange}
                  value={contactData.lastName}
                  className="create-input"
                  type="text"
                  id="lastName"
                />
              </div>
            </div>
            <div className="md:flex md:gap-3">
              <div className="create-item">
                <label className="create-label" htmlFor="email">
                  Email
                </label>
                <input
                  onChange={handleInputChange}
                  value={contactData.email}
                  className="create-input"
                  type="email"
                  id="email"
                />
              </div>
              <div className="create-item">
                <label className="create-label" htmlFor="timezone">
                  Timezone
                </label>
                <input
                  onChange={handleInputChange}
                  value={contactData.timezone}
                  className="create-input"
                  type="text"
                  id="timezone"
                />
              </div>
            </div>
          </div>
          <p className="dark:text-whiten/70  mt-4 mb-4">Personal Information</p>
          <div className="flex flex-col gap-4">
            {/* <div className="create-item">
              <label className="create-label" htmlFor="phone">
                Phone Number
              </label>
              <input
                onChange={handleInputChange}
                value={contactData.phone}
                className="create-input"
                type="phone"
                id="phone"
              />
            </div> */}
            <div className="md:flex md:gap-3">
              <div className="create-item relative">
                <label className="create-label" htmlFor="birthDate">
                  Birth Date
                </label>
                <Datepicker
                  options={options}
                  onChange={handleBirthDateChange}
                  show={show}
                  setShow={handleClose}
                  value={contactData.birthDate}
                  className="create-input"
                  type="text"
                  id="birthDate"
                />
              </div>
              <div className="create-item">
                <label className="create-label" htmlFor="age">
                  Age
                </label>
                <input
                  onChange={handleInputChange}
                  value={contactData.age}
                  className="create-input"
                  type="number"
                  id="age"
                />
              </div>
            </div>
            <div className="md:flex md:gap-3">
              <div className="create-item">
                <label className="create-label" htmlFor="country">
                  Country
                </label>
                <input
                  onChange={handleInputChange}
                  value={contactData.country}
                  className="create-input"
                  type="text"
                  id="country"
                />
              </div>
              <div className="create-item">
                <label className="create-label" htmlFor="city">
                  City
                </label>
                <input
                  onChange={handleInputChange}
                  value={contactData.city}
                  className="create-input"
                  type="text"
                  id="city"
                />
              </div>
            </div>
            <div className="md:flex md:gap-3">
              <div className="create-item">
                <label className="create-label" htmlFor="occupation">
                  Occupation
                </label>
                <select
                  onChange={handleInputChange}
                  value={contactData.occupation}
                  className="create-input"
                  type="text"
                  id="occupation"
                >
                  <option value="Student">Student</option>
                  <option value="Employed">Employed</option>
                  <option value="Unemployed">Unemployed</option>
                  <option value="Other" selected>
                    Other
                  </option>
                </select>
              </div>
              <div className="create-item">
                <label className="create-label" htmlFor="gender">
                  Gender
                </label>
                <select
                  onChange={handleInputChange}
                  value={contactData.gender}
                  className="create-input"
                  type="text"
                  id="gender"
                >
                  <option value="Other" selected>
                    Other
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>
          <p className="dark:text-whiten/70 mt-4 mb-4">EduQuest Information</p>
          <div className="flex flex-col gap-4">
            {/* <div className="create-item">
              <label className="create-label" htmlFor="eqList">
                Assign to EQ
              </label>
              <select
                onChange={handleListAdd}
                value={contactData.listIds}
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
            <div className="create-item">
              <label
                className="create-label"
                htmlFor="eduQuestSelectedDateTime"
              >
                EQ selected date time
              </label>
              <input
                onChange={handleInputChange}
                value={contactData.eduQuestSelectedDateTime}
                className="create-input"
                type="text"
                id="eduQuestSelectedDateTime"
              />
            </div>
          </div>
        </form>
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            className="bg-green300 text-meta-2 dark:bg-success hover:bg-green300 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="bg-gray/50 text-whiten font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-1 mb-1 ease-linear transition-all duration-150"
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateModal;
