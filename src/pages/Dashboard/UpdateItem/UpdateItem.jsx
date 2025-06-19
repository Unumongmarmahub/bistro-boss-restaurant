import { useLoaderData } from "react-router";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
  const { name, category, recipe, price, _id } = useLoaderData();

  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const onSubmit = async (data) => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      // now send the menu item data to the server with the images
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      //
      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      console.log(menuRes.data);
      if (menuRes.data.modifiedCount > 0) {
        // show success popup
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is updated to the menu`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    console.log("with url", res.data);
  };
  return (
    <div>
      <SectionTitle
        heading="Update Item"
        subHeading="Refresh Info"
      ></SectionTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Recipe Name */}
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text">Recipe Name*</span>
          </label>
          <input
            defaultValue={name}
            type="text"
            placeholder="Recipe Name"
            className="input input-bordered w-full"
            {...register("name", { required: true })}
          />
        </div>

        {/* Category and Price */}
        <div className="flex gap-6">
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Category*</span>
            </label>
            <select
              {...register("category", { required: true })}
              defaultValue={category}
              className="select select-bordered w-full"
            >
              <option disabled value="default">
                Select A Category
              </option>
              <option value="salad">Salad</option>
              <option value="pizza">Pizza</option>
              <option value="soup">Soup</option>
              <option value="desert">Desert</option>
              <option value="drinks">Drinks</option>
            </select>
          </div>

          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Price*</span>
            </label>
            <input
              type="number"
              defaultValue={price}
              placeholder="Price"
              className="input input-bordered w-full"
              {...register("price", { required: true })}
            />
          </div>
        </div>

        {/* Recipe Details */}
        <div className="form-control my-6">
          <label className="label">
            <span className="label-text">Recipe Details*</span>
          </label>
          <textarea
            defaultValue={recipe}
            {...register("recipe", { required: true })}
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Recipe Details..."
          ></textarea>
        </div>

        {/* Image Upload */}
        <div className="form-control my-6">
          <label className="label">
            <span className="label-text">Upload Image</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            {...register("image", { required: true })}
          />
        </div>

        <button className="btn btn-primary mt-4">Update Menu Item</button>
      </form>
    </div>
  );
};

export default UpdateItem;
