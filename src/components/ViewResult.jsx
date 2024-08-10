import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useCode } from "../CodeProvider";

export const ViewResult = () => {
  const { out, err } = useCode();

  return (
    <div
      className={`
      col-start-2 row-start-2 row-span-full border-l-2
      border-gray-600 font-Geist h-full overflow-x-auto scrollbar-thin scrollbar-thumb-[#282c34] scrollbar-track-[#1e2227] pl-2`}
    >
      <pre>
        <code className="text-gray-200 font-Geist text-ellipsis h-full">
          {err ? err : out}
        </code>
      </pre>
    </div>
  );
};
