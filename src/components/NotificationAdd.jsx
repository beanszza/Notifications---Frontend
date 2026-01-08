import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const NotificationAdd = ({ message }) => {
  const [status] = useState(message ?? "");

  const notify = () =>
    toast(
      (t) => (
        <span>
          {status}
          <button onClick={() => toast.dismiss(t.id)}>Dismiss</button>
        </span>
      ),
      {
        toasterId: "notificationAdd",
        duration: 4000,
      }
    );

  return (
    <div>
      <button onClick={notify}>NotificationAdd</button>
      <Toaster
        toasterId="notificationAdd"
        position="bottom-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default NotificationAdd;
