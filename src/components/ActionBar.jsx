import { useCode } from "../CodeProvider";
import { FaPlay } from "react-icons/fa";

export const ActionBar = () => {
  const { runCode } = useCode();

  return (
    <div className="col-span-2 row-start-1 border-b-2 border-gray-600 flex justify-center">
      <button
        onClick={runCode}
        className="text-lime-500 hover:bg-gray-800 p-2 rounded-md transition-all"
      >
        <FaPlay size={26} color="" />
      </button>
    </div>
  );
};
