import {
  FaBook,
  FaCalendar,
  FaCartPlus,
  FaEnvelope,
  FaHome,
  FaList,
  FaRebel,
  FaUser,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router";
import useCart from "../hooks/useCart";
import { MdMenu } from "react-icons/md";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const [cart] = useCart();
  // get isAdmin value from the database
  const [isAdmin] = useAdmin();
  return (
    <div className="flex">
      {/* dashboard sidebar */}
      <div>
        <div className="w-60 min-h-screen bg-orange-400">
          <ul className="menu p-4">
            {isAdmin ? (
              <>
                <li>
                  <NavLink to="/dashboard/adminHome">
                    <FaHome className="mr-2" />
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addItems">
                    <FaUtensils className="mr-2" />
                    Add Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageItems">
                    <FaList className="mr-2" />
                    Manage Items
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/bookings">
                    <FaBook className="mr-2" />
                    Manage Bookings
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/users">
                    <FaUser className="mr-2" />
                    All Users
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/dashboard/userHome">
                    <FaHome className="mr-2" />
                    User Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/history">
                    <FaCalendar className="mr-2" />
                    Not History
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
                  <NavLink to="/dashboard/paymentHistory">
                    <FaList className="mr-2" />
                    Real Payment History
                  </NavLink>
                </li>
              </>
            )}
            {/* shared nav links  */}
            <div className="divider">OR</div>
            <li>
              <NavLink to="/">
                <FaHome className="mr-2" />
                User Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/order/salad">
                <MdMenu /> Menu
              </NavLink>
            </li>
            <li>
              <NavLink to="/order/contact">
                <FaEnvelope /> Contact
              </NavLink>
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
