import {
  FaCalendar,
  FaCartPlus,
  FaHome,
  FaList,
  FaRebel,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router";
import useCart from "../hooks/useCart";

const Dashboard = () => {
  const [cart] = useCart();
  return (
    <div className="flex">
      {/* dashboard sidebar */}
      <div>
        <div className="w-60 min-h-screen bg-orange-400">
          <ul className="menu p-4">
            <li>
              <NavLink to="/dashboard/userHome">
                <FaHome className="mr-2" />
                User Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/reservation">
                <FaCalendar className="mr-2" />
                Reservation
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/cart">
                <FaCartPlus className="mr-2" />
                My Cart {cart.length}
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/review">
                <FaRebel className="mr-2" />
                Add Review
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/bookings">
                <FaList className="mr-2" />
                My Booking
              </NavLink>
            </li>
            <div className="divider">OR</div>
            <li>
              <NavLink to="/">
                <FaHome className="mr-2" />
                User Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/order/salad">Menu</NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/* dashboard content  */}
      <div className="flex-1 p-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
