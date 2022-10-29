import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { pizzaId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6309fdf0f8a20183f779cc13.mockapi.io/items/${pizzaId}`
        );
        setPizza(data);
      } catch (error) {
        alert("Fetching data error");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque,
        tempora, unde? Consequuntur dolor, eum exercitationem iusto laborum
        maxime modi molestiae odit optio pariatur provident, quae qui sapiente
        tempora tenetur voluptatem!
      </p>
      <h4>price: {pizza.price}</h4>
    </div>
  );
};

export default FullPizza;
