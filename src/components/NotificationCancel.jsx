import React from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const NotificationCancel = ({ message }) => {
  const [status] = useState(message ?? "");
  const notify = () =>
    status
      ? toast.error(status, {
          toasterId: "notificationCancel",
          duration: 4000,
        })
      : toast.error("Something went wrong!", {
          toasterId: "notificationCancel",
          duration: 4000,
        });
  return (
    <div>
      <button onClick={notify}>NotificationCancel</button>
      <Toaster
        toasterId="notificationCancel"
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default NotificationCancel;
