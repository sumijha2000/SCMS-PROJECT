import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import SalesChart from './components/Charts/SalesChart';
// import OrdersChart from './components/Charts/OrdersChart';
import LoginPage from './components/Admin/LoginPage';
import CreateUserAccount from './components/Admin/CreateUserAccount';
import UserManagement from './components/Admin/UserManagement';
import OrdersForm from './components/Admin/OrdersForm';
import Reports from './components/Admin/Reports';
import SalesChart from './components/Charts/SalesChart';
import OrdersChart from './components/Charts/OrdersChart';
import DashboardAdmin from './components/Admin/DashboardAdmin';
import DashboardLayout from './components/Common/DashboardLayout';
import SupplierTable from './components/Admin/SupplierTable';
import ManagerTable from './components/Admin/ManagerTable';


import SupplierPanel from './components/SupplierPanel/SupplierPanel';
import CreateProfile from './components/SupplierPanel/CreateProfile';
import CheckProductAvailability from './components/SupplierPanel/CheckProductAvailability';
import TrackShipment from './components/SupplierPanel/TrackShipment';
import PickupOrder from './components/SupplierPanel/PickupOrder';
import TransactionHistory from './components/SupplierPanel/TransactionHistory';
import ManagerPanel from './components/MangerPanel/ManagerPanel';
import AddProduct from './components/MangerPanel/AddProduct';
import OrderList from './components/MangerPanel/OrderList';
import TransactionHistoryManger from './components/MangerPanel/TransactionHistory';
import TrackShipmentManager from './components/MangerPanel/TrackShipment';
import PickupOrdermanager from './components/MangerPanel/PickupOrder';
import CreateProfileManager from './components/MangerPanel/CreateProfile';
import ProductList from './components/MangerPanel/ProductList';

import Profile from './components/MangerPanel/Profile';
import ManagersProfileTable from './components/Admin/ManagersProfileTable';
import SuppliersProfileTable from './components/Admin/SuppliersProfileTable';
import ConfirmedDeliveries from './components/MangerPanel/ConfirmedDeliveries';
import TrackShipmentsPage from './components/Admin/TrackShipmentsPage';
import UserRoleChart from './components/Charts/UserRoleChart';
import SupplierTransactionChart from './components/Charts/SupplierTransactionChart';
import TransactionChart from './components/Charts/TransactionChart';
import OrderChart from './components/Charts/OrderChart';




const App = () => {
  return (

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/common/dashboard-layout" element={<DashboardLayout />} />
        <Route path="/admin/create-user" element={<CreateUserAccount />}/>
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route path="/admin/orders-form" element={<OrdersForm />} />
        <Route path="/admin/reports" element={<Reports />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/charts/sales" element={<SalesChart />} />
        <Route path="/charts/orders" element={<OrdersChart />} />
        <Route path="/admin/user-management/view-supplier" element={<SupplierTable />} />
        <Route path="/admin/user-management/view-manager" element={<ManagerTable />} />
        <Route path="/admin/user-management/manager-profile" element={<ManagersProfileTable />} />
        <Route path="/admin/user-management/suppliers-profile" element={<SuppliersProfileTable />} />
        <Route path="/admin/oc" element={<OrderChart />} />
        <Route path="/admin/urc" element={<UserRoleChart />} />
        <Route path="/admin/stc" element={<SupplierTransactionChart />} />
        <Route path="/admin/mtc" element={<TransactionChart />} />




          {/* Supplier Routes */}

          <Route path="/supplier" element={<SupplierPanel />} />
        <Route path="/supplier/create-profile" element={<CreateProfile />} />
        <Route path="/supplier/check-product-availability" element={<CheckProductAvailability />} />
        <Route path="/supplier/pickup-order" element={<PickupOrder />} />
        <Route path="/supplier/track-shipment" element={<TrackShipment />} />
        <Route path="/supplier/transaction-history" element={<TransactionHistory />} />
        <Route path="/manager/productlist" element={<ProductList />} />
        
        
        {/* Manager Routes */}
        
        <Route path="/manager" element={<ManagerPanel />} />
        <Route path="/manager/create-profile" element={<CreateProfileManager />} />
        <Route path="/manager/add-product" element={<AddProduct />} />
        <Route path="/manager/order-list" element={<OrderList />} />
        <Route path="/manager/pickup-order" element={<PickupOrdermanager />} />
        <Route path="/manager/track-shipment" element={<TrackShipmentManager />} />
        <Route path="/manager/transaction-history" element={<TransactionHistoryManger />} />
        <Route path="/yourprofile" element={<Profile />} />
        <Route path="/manager/confirmeddeliveries" element={<ConfirmedDeliveries />} />
        <Route path="/trackshipment" element={<TrackShipmentsPage />} />
   
      </Routes>

  );
};

export default App;
