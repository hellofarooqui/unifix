import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import RMA from "./pages/RMA/RMA";
import Devices from "./pages/Devices/Devices";
import NewRMA from "./pages/RMA/NewRMA";
import RMADetails from "./pages/RMA/RMADetails";
import RMAEdit from "./pages/RMA/RMAEdit";
import NewDevice from "./pages/Devices/NewDevice";
import EditDevice from "./pages/Devices/EditDevice";
import DeviceDetails from "./pages/Devices/DeviceDetails";
import ListTickets from "./pages/SupportTicket/ListTickets";
import NewSupportTicket from "./pages/SupportTicket/NewSupportTicket";
import SupportTicketDetails from "./pages/SupportTicket/SupportTicketDetails";
import EditTicket from "./pages/SupportTicket/EditTicket";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivateRoute from "./components/custom/PrivateRoute";
import Settings from "./pages/Settings/Settings";
import NewDeviceType from "./pages/Settings/NewDeviceType";
import Internet from "./pages/Internet/Internet";
import NewInternet from "./pages/Internet/NewInternet";
import UpdateInternet from "./pages/Internet/UpdateInternet";
import ImportDevices from "./pages/Devices/ImportDevices";
import NewVendor from "./pages/Vendors/NewVendor";
import SearchPage from "./pages/Search/SearchPage";
import Profile from "./pages/Auth/Profile";
import NewProject from "./pages/Settings/NewProject";

// Example page components

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<RootLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/rma" element={<RMA />} />
            <Route path="/rma/new" element={<NewRMA />} />
            <Route path="/rma/:rmanumber" element={<RMADetails />} />
            <Route path="/rma/:rmanumber/edit" element={<RMAEdit />} />

            <Route path="devices" element={<Devices />} />
            <Route path="devices/new" element={<NewDevice />} />
            <Route path="devices/import" element={<ImportDevices />} />
            <Route path="devices/:deviceId" element={<DeviceDetails />} />
            <Route path="devices/:deviceId/edit" element={<EditDevice />} />

            <Route path="settings" element={<Settings />} />
            <Route
              path="settings/device-type/new"
              element={<NewDeviceType />}
            />
            <Route path="settings/vendors/new" element={<NewVendor />} />
            <Route path="settings/projects/new" element={<NewProject />} />

            <Route path="internet" element={<Internet />} />
            <Route path="internet/new" element={<NewInternet />} />
            <Route
              path="internet/edit/:internetId"
              element={<UpdateInternet />}
            />

            <Route path="support" element={<ListTickets />} />
            <Route path="support/new" element={<NewSupportTicket />} />

            <Route
              path="support/:ticketNumber"
              element={<SupportTicketDetails />}
            />
            <Route path="support/:ticketNumber/edit" element={<EditTicket />} />

            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
