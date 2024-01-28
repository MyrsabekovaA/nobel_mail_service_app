import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "/Nobel_logo.png";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../components/LoadingOverlay/LoadingOverlay";

function UnsubscribePage() {
  const { userId } = useParams();
  const [error, setError] = useState(null);
  const [isOverlayLoading, setIsOverlayLoading] = useState(false);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);

  useEffect(() => {
    const unsubscribeUser = async () => {
      try {
        console.log("test");
        setIsOverlayLoading(true);
        const response = await axios.put(
          `https://mail-service-412008.ey.r.appspot.com/action/unsubscribe/${userId}`
        );

        if (response.status === 200) {
          setIsOverlayLoading(false);
          setIsUnsubscribed(true);
        } else {
          setError("Sorry, something went wrong. Please, try again later.");
        }
      } catch (err) {
        setError(
          "An error occurred while unsubscribing. Please, try again later."
        );
      }
    };
    if (userId) {
      unsubscribeUser();
    }
  }, [userId]);

  return (
    <div className="h-screen flex items-center justify-center mx-auto">
      <div className="w-14 h-14">
        <img src={Logo} alt="" />
      </div>
      {isUnsubscribed && (
        <p className="text-2xl text-compdark">
          You have been successfully unsubscribed.
        </p>
      )}
      {isOverlayLoading && <LoadingOverlay />}
      {error && <p>{error}</p>}
    </div>
  );
}

export default UnsubscribePage;
