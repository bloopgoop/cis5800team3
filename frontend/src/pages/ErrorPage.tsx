import { useLocation } from "react-router-dom";

const ErrorPage = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col items-center font-semibold text-lg m-10">
      <h1>Sorry, the page you are looking for has not been implemented yet!</h1>
      <img
        src={
          location.state
            ? `https://http.cat/${location.state.statusCode}`
            : "https://http.cat/404"
        }
      ></img>
      {location.state && <p className="mt-5">Hint: {location.state.hint}</p>}
    </div>
  );
};
export default ErrorPage;
