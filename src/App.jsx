import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.location.href = "https://temp-portfolio-y7kh.vercel.app/";
  }, []);

  return null; // nothing renders
}

export default App;
