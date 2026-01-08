import "./App.css";
import NotificationGreen from "./components/NotificationGreen";
import NotificationRed from "./components/NotificationRed";
import NotificationAdd from "./components/NotificationAdd";
import NotificationOrder from "./components/NotificationOrder";
import NotificationCancel from "./components/NotificationCancel";
import NotificationPromotion from "./components/NotificationPromotion";
import NotificationModal from "./components/NotificationModal";
function App() {
  return (
    <>
      <NotificationGreen message={"Order Received"} />
      <NotificationRed message={"Payment Failed"} />
      <NotificationAdd message={"Order Added"}/>
      <NotificationOrder message={"Order Delivered"} />
      <NotificationCancel message={"Order Cancelled"} />
      <NotificationPromotion message={"Hello world"}/>
      <NotificationModal />
    </>
  );
}

export default App;
