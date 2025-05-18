import React, { useEffect, useState } from "react";
import { getAllArtikel } from "../services/artikelAPI";

const Artikel = () => {
  const [artikel, setArtikel] = useState([]);

 useEffect(() => {
  getAllArtikel().then((res) => {
    console.log("res", res); // tambahkan untuk debug
    setArtikel(Array.isArray(res) ? res : res.data); // fallback
  });
}, []);


  return (
    <div>
      <h2>Daftar Artikel</h2>
      <ul>
        {artikel.map((item) => (
          <li key={item.id}>{item.judul}</li>
        ))}
      </ul>
    </div>
  );
};

export default Artikel;
