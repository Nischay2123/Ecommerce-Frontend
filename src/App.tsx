import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./Components/Loader";
import Header from "./Components/header";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { getUser } from "./redux/api/userAPI";
import { UserReducerInitialState } from "./types/reducer-types";
import ProtectedRoute from "./Components/protected-route";


const Dashboard = lazy(() => import("./Pages/admin/dashboard"));
const Products = lazy(() => import("./Pages/admin/products"));
const Customers = lazy(() => import("./Pages/admin/customers"));
const Transaction = lazy(() => import("./Pages/admin/transaction"));
const Barcharts = lazy(() => import("./Pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./Pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./Pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./Pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./Pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./Pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./Pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./Pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./Pages/admin/management/transactionmanagement")
);

const Home = lazy(() => import("./Pages/Home"));
const Search = lazy(() => import("./Pages/Search"));
const Cart = lazy(() => import("./Pages/Cart"));
const Shipping = lazy(() => import("./Pages/shipping"));
const Orders = lazy(() => import("./Pages/Orders"));
const OrderDetails = lazy(() => import("./Pages/OrderDetails"));
const Login = lazy(() => import("./Pages/login"));
const NotFound = lazy(() => import("./Pages/not-found"));


const App = () => {

  const {user, loading } = useSelector((state:{userReducer:UserReducerInitialState})=>state.userReducer)

  const dispatch = useDispatch()
  useEffect(()=>{
      onAuthStateChanged(auth,async(user)=>{
          if (user) {
            const data = await getUser(user.uid)
            dispatch(userExist(data.user))
          }else{
            dispatch(userNotExist())
          }
      })
  },[])

  return loading?<Loader/>:(

     

    <Router>
      <Header user={user} />
    
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/cart" element={<Cart />} />

          {/* not loging */}
          <Route path="/login" element={<ProtectedRoute isAuthenticated={user?false :true}><Login/></ProtectedRoute>}/>

          {/* login */}
          <Route element={<ProtectedRoute isAuthenticated={user?true :false} redirect="login"/>}>
          <Route path="/shipping" element={<Shipping/>} />
          <Route path="/orders" element={<Orders/>} />
          <Route path="/orders/:id" element={<OrderDetails/>} />
          </Route>

          {/* admin routes */}
          <Route
          element={
            <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role==="admin"?true:false} />
          }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />
            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />
            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />

            <Route path="/admin/product/:id" element={<ProductManagement />} />

            <Route
              path="/admin/transaction/:id"
              element={<TransactionManagement />}
            />
          </Route>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center"/>
    </Router>
  );
};

export default App;
