import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./ContactDetails.css";
import ContactActivityList from "./ContactsActivityList/ContactsActivityList";
import LoadingOverlay from "../../../../components/LoadingOverlay/LoadingOverlay";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import { useDispatch, useSelector } from "react-redux";
import { successToast, errorToast } from "../../../../GlobalStates/Toasts";
import CustomDatepicker from "../../../../components/CustomDatepicker/CustomDatepicker";

function ContactDetails() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.loggedIn.token);

  let { contactid } = useParams();

  const [isOverlayLoading, setIsOverlayLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [contact, setContact] = useState({});
  const [activities, setActivities] = useState([
    {
      id: "65787e6cae1051c06b2e44e4",
      contactId: "655f159d9f242bca14e45e75",
      typeOfActivity: "UNSUBSCRIBE",
      activityDescription: "User 'naumetdmytro1604@gmail.com' has unsubscribed",
      createdAt: "2023-12-12T15:38:20.980Z",
    },
    {
      id: "65787e6cae1051c06b2e44e4",
      contactId: "655f159d9f242bca14e45e75",
      typeOfActivity: "UNSUBSCRIBE",
      activityDescription: "User 'naumetdmytro1604@gmail.com' has unsubscribed",
      createdAt: "2023-12-12T15:38:20.980Z",
    },
  ]);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchContactData = async () => {
    try {
      setIsOverlayLoading(true);
      const response = await axios.get(
        `https://mail-service-412008.ey.r.appspot.com/api/contacts/${contactid}`,
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
        eduQuestSelectedDateTime: data.eduQuestSelectedDateTime,
      });
      setIsOverlayLoading(false);
    } catch (error) {
      console.error("Error fetching contact", error);
    } finally {
      setIsOverlayLoading(false);
    }
  };

  const fetchContactActivities = async () => {
    try {
      const response = await axios.get(
        `https://mail-service-412008.ey.r.appspot.com/actions/${contactid}`,
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
    // fetchContactActivities();
  }, [contactid]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [id]: value,
    }));
  };
  const handleDateChange = (id, newDate) => {
    setContact((prevContact) => ({
      ...prevContact,
      [id]: newDate,
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
        `https://mail-service-412008.ey.r.appspot.com/api/contacts/${contactid}`,
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
            <div className="flex-1 bg-gray/10 dark:bg-graydark/30 rounded-xl">
              <form className="flex flex-col px-4 py-2">
                <p className="flex self-start text-compdark/80 dark:text-meta-2 pb-2 border-b-4 dark:border-b-green300 border-b-meta-5 font-medium mb-6">
                  General Information:
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
                <p className="flex self-start text-compdark/80 dark:text-meta-2 pb-2 border-b-4 dark:border-b-green300 border-b-meta-5 font-medium mt-4 mb-4">
                  Personal Information:
                </p>
                <div className="flex flex-col gap-4">
                  <div className="form-item relative">
                    <label className="create-label" htmlFor="birthDate">
                      Birth Date
                    </label>
                    <CustomDatepicker
                      initialDate={contact.birthDate}
                      timeOptionOn={false}
                      onDateChange={(newDate) =>
                        handleDateChange("birthDate", newDate)
                      }
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
                <p className="flex self-start text-compdark/80 dark:text-meta-2 pb-2 border-b-4 dark:border-b-green300 border-b-meta-5 font-medium mt-4 mb-4">
                  EduQuest Information:
                </p>
                <div className="flex flex-col gap-4">
                  <div className="form-item">
                    <label
                      className="create-label"
                      htmlFor="eduQuestSelectedDateTime"
                    >
                      EQ selected date time
                    </label>
                    <CustomDatepicker
                      initialDate={contact.eduQuestSelectedDateTime}
                      timeOptionOn={true}
                      onDateChange={(newDate) =>
                        handleDateChange("eduQuestSelectedDateTime", newDate)
                      }
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="inline-flex self-end bg-green-500 text-whiten bg-green300 active:bg-success font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg hover:bg-green300/90 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-medium ml-12 text-lg text-compdark/80 dark:text-meta-2">
                  Recent Activities
                </h3>
                <select
                  // onChange={}
                  className="p-2 text-sm rounded bg-whiten dark:bg-compdark outline-none focus:outline-meta-5 block"
                >
                  <option value="all activities">All Activities</option>
                  <option value="email">Email</option>
                  <option value="unsubscribe">Unsubscribe</option>
                  <option value="something">Something</option>
                </select>
              </div>
              {/* <ContactActivityList activities={activities} /> */}
            </div>
          </div>
        ) : (
          <div>No contact found.</div>
        )}
      </div>
      {isOverlayLoading && <LoadingOverlay />}
    </div>
  );
}

export default ContactDetails;
