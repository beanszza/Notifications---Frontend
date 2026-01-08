import React from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const NotificationOrder = ({ message }) => {
  const [status] = useState(message ?? "");
  const notify = () =>
    status
      ? toast.success(status, {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
          toasterId: "notificationOrder",
        })
      : toast.error("No message provided", { toasterId: "notificationOrder" });

  return (
    <div>
      <button onClick={notify}>NotificationOrder</button>
      <Toaster
        toasterId="notificationOrder"
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  );
};

export default NotificationOrder;
