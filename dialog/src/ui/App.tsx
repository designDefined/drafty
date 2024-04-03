import "./App.css";
import { useEffect } from "react";
import { UserRepository } from "@core/repository/user";

function App() {
  useEffect(() => {
    UserRepository.me.then(console.log);
  }, []);
  return <>123</>;
}

export default App;
