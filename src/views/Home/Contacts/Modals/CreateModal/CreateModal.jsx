import React, { useEffect, useState } from "react";
import "./CreateModal.css";
import CustomDatepicker from "../../../../../components/CustomDatepicker/CustomDatepicker";

function CreateModal({ onClose, onCreate }) {
  const [contactData, setContactData] = useState({
    firstName: "",
    lastName: "",
    age: 0,
    city: "",
    email: "",
    gender: "Other",
    country: "",
    timezone: "",
    occupation: "Other",
    sourceOfReferral: "—",
    intershipMotivation: "—",
    birthDate: "",
    eduQuestSelectedDateTime: "",
  });

  const handleInputChange = (e) => {
    setContactData({ ...contactData, [e.target.id]: e.target.value });
  };

  const handleDateChange = (id, newDate) => {
    setContactData((prevContact) => ({
      ...prevContact,
      [id]: newDate,
    }));
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
                  placeholder="Europe/Kiev"
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
                <CustomDatepicker
                  initialDate={null}
                  timeOptionOn={false}
                  onDateChange={(newDate) =>
                    handleDateChange("birthDate", newDate)
                  }
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
            <div className="create-item">
              <label
                className="create-label"
                htmlFor="eduQuestSelectedDateTime"
              >
                EQ selected date time
              </label>
              <CustomDatepicker
                initialDate={null}
                timeOptionOn={true}
                onDateChange={(newDate) =>
                  handleDateChange("eduQuestSelectedDateTime", newDate)
                }
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
