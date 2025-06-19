// import axios from "axios";

// const axiosSecure = axios.create({
//   baseURL: "http://localhost:5000",
// });

// let isInterceptorSet = false;

// const useAxiosSecure = () => {
//   if (!isInterceptorSet) {
//     axiosSecure.interceptors.request.use(
//       function (config) {
//         const token = localStorage.getItem("access-token");
//         console.log("stop", token);

//         if (token) {
//           config.headers.Authorization = `Bearer ${token}`;
//         }

//         return config;
//       },
//       function (error) {
//         return Promise.reject(error);
//       }
//     );

//     axiosSecure.interceptors.response.use(
//       function (response) {
//         return response;
//       },
//       function (error) {
//         return Promise.reject(error);
//       }
//     );

//     isInterceptorSet = true;
//   }

//   return axiosSecure;
// };

// export default useAxiosSecure;

// --------------------------------------------------------------

// -----------------------------------------------------------------

// import axios from "axios";
// import { useNavigate } from "react-router";

// const axiosSecure = axios.create({
//   baseURL: "http://localhost:5000",
// });

// const useAxiosSecure = () => {
//   const navigate = useNavigate()
//   axiosSecure.interceptors.request.use(
//     function (config) {
//       const token = localStorage.getItem("access-token");
//       console.log(token);
//       config.headers.authorization = `Bearer ${token}`;
//       return config;
//     },
//     function (error) {
//       return Promise.reject(error);
//     }
//   );
//     axiosSecure.interceptors.response.use(
//       function (response) {
//         return response;
//       },
//        (error)=> {
//         const status = error.response.status;
//         console.log(status);
//         if(status === 401 || status ===403){

// navigate('/login')
//         }
//         return Promise.reject(error);
//       })

//   }

//   return axiosSecure;
// };

// export default useAxiosSecure;

// --------------------------------------------------------------------

import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

let interceptorsSet = false;

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  if (!interceptorsSet) {
    axiosSecure.interceptors.request.use(
      function (config) {
        const token = localStorage.getItem("access-token");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    axiosSecure.interceptors.response.use(
      function (response) {
        return response;
      },
      async (error) => {
        const status = error.response?.status;

        if (status === 401 || status === 403) {
          await logOut();
          navigate("/login");
        }

        return Promise.reject(error);
      }
    );

    interceptorsSet = true;
  }

  return axiosSecure;
};

export default useAxiosSecure;
