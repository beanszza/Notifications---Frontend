import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const NotificationPromotion = ({ message }) => {
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
        toasterId: "notificationPromotion",
        duration: 4000,
      }
    );

  return (
    <div>
      <button onClick={notify}>NotificationPromotion</button>
      <Toaster
        toasterId="notificationPromotion"
        position="bottom-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default NotificationPromotion;
