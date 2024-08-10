import { ActionBar } from "./components/ActionBar";
import { CodeEditor } from "./components/CodeEditor";
import { ViewResult } from "./components/ViewResult";

function App() {
  return (
    <div className="grid grid-cols-2 grid-rows-layout h-screen bg-dark">
      <ActionBar />
      <CodeEditor />
      <ViewResult />
    </div>
  );
}

export default App;
