import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const NotificationGreen = ({ message }) => {
  const [status] = useState(message ?? "");

  const notify = () =>
    status
      ? toast.success(status, {
          toasterId: "notificationGreen",
          duration: 4000,
        })
      : toast.error("Something went wrong!", {
          toasterId: "notificationGreen",
          duration: 4000,
        });

  return (
    <div>
      <button onClick={notify}>NotificationGreen</button>
      <Toaster
        toasterId="notificationGreen"
        position="top-right"
        reverseOrder={false}
      />
    </div>
  );
};

export default NotificationGreen;
