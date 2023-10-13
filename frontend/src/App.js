import Genero from "./components/generos/Genero";
import "./App.css";
import Header from "./components/gui/Header";
import Modal from "./components/gui/Modal";
import AppRouter from "./routers/AppRouter";

function App() {
  return (
    <div className="App">
      <AppRouter />
    </div>
  );
}

export default App;
