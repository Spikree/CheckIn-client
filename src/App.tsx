import { useEffect } from "react";
import { TestStore } from "./store/TestStore";

function App() {
  const { testBackend } = TestStore();

  useEffect(() => {
    testBackend();
  }, [testBackend]);

  return <div>Hello world</div>;
}

export default App;
