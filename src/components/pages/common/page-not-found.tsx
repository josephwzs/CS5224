import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const PageNotFound = () => {
  const navigate = useNavigate();

  const onclick = () => {
    navigate("/");
  };

  return (
    <div className="relative z-1 flex min-h-screen flex-col items-center justify-center overflow-hidden p-6">
      <div className="mx-auto w-full text-center lg:w-1/2">
        <h1 className="text-title-md xl:text-title-2xl font-bold text-gray-800 dark:text-white/90">
          404 - Not Found
        </h1>
        <p className="mb text-base text-gray-700 sm:text-lg dark:text-gray-400">
          We can’t seem to find the page you are looking for!
        </p>

        <Button onClick={onclick}>Back to Home Page</Button>
      </div>
      <p className="absolute right-0 bottom-6 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} - ESG Tracker
      </p>
    </div>
  );
};
