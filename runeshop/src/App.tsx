
import { appRouter } from "./routes/appRouter.tsx";
import { BrowserRouter as Router } from "react-router-dom";

function App() {

  return (
    <Router>
      {appRouter()}
    </Router>
  );
}

export default App;
