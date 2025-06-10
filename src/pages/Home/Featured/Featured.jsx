import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <div className="featured-item bg-fixed text-white pt-6 my-16">
      <SectionTitle
        subHeading={"check it out"}
        heading={"Featured Item"}
      ></SectionTitle>
      <div className="md:flex justify-center bg-slate-500 bg-opacity-60 items-center py-20 px-32">
        <div>
          {" "}
          <img src={featuredImg} alt="" />
        </div>
        <div className="md:ml-10">
          <p>Aug 20, 2029</p>
          <p className="uppercase">Where can I get Some</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            cumque architecto hic vero, quidem ducimus quia voluptate ullam
            reprehenderit, esse aspernatur, distinctio blanditiis repellat quos
            recusandae quae itaque. Unde et cum repellat accusamus adipisci
            alias, similique modi harum eius nulla ab provident ducimus rem
            distinctio temporibus maxime consequatur laboriosam possimus.
          </p>
          <button className="btn btn-outline border-0 border-b-4">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
