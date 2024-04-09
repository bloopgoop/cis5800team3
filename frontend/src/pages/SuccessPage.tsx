import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

const SuccessPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center font-semibold text-lg m-10">
        <h1>Success</h1>
        <img src={"https://http.cat/201"}></img>
        <Link to="/" className="mt-5">
          <Button variant={"accent"}>Go back to home</Button>
        </Link>
      </div>
    </>
  );
};
export default SuccessPage;
