import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const NotificationRed = ({ message }) => {
  const [status] = useState(message ?? "");

  const notify = () =>
    status
      ? toast.error(status, {
          toasterId: "notificationRed",
          duration: 4000,
        })
      : toast.error("Something went wrong!", {
          toasterId: "notificationRed",
          duration: 4000,
        });

  return (
    <div>
      <button onClick={notify}>NotificationRed</button>
      <Toaster
        toasterId="notificationRed"
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
};

export default NotificationRed;
