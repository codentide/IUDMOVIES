import logo from "./logo.svg";
import "./App.css";
import { axiosConfig } from "./config/axiosConfig";
import { useEffect, useState } from "react";

function App() {
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    listGeneros();
  }, []);

  const listGeneros = async () => {
    const response = await axiosConfig.get("generos/", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setGeneros(response.data);
  };

  return (
    <div className="App">
      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {generos.map((genero, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{genero.nombre}</td>
                <td>{genero.estado ? "Activo" : "Inactivo"}</td>
                <td>{genero.descripcion}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
