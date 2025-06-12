import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProviders";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      updateUserProfile(data.name, data.photoURL)
        .then(() => {
          console.log("user");
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        })
        .catch((error) => console.log(error));
    });
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss || Sign Up</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up Now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
                <label className="label">Name</label>
                <input
                  {...register("name", { required: true })}
                  name="name"
                  type="text"
                  className="input"
                  placeholder="Name"
                />
                {errors.name && (
                  <span className="text-red-600">This name is required</span>
                )}
                <label className="label">Photo URL</label>
                <input
                  {...register("photoURL", { required: true })}
                  type="text"
                  className="input"
                  placeholder="Photo URL"
                />
                {errors.photoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
                <label className="label">Email</label>
                <input
                  {...register("email", { required: true })}
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                {errors.email && (
                  <span className="text-red-600">This email is required</span>
                )}
                <label className="label">Password</label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 10,
                  })}
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                {errors.password && (
                  <span className="text-red-600">
                    Password must be 6 character is required
                  </span>
                )}
                <input
                  type="submit"
                  className="btn btn-neutral mt-4"
                  value="Sign Up"
                />
              </form>
              <p>
                <small>
                  Already have an account <Link to="/login">Login</Link>
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
