import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = ({}) => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>({
    imageUrl: "",
    title: "",
    price: 0,
  });
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

  if (pizza.title === "") {
    return <>Loading...</>;
  }

  return (
    <div className="pizza--block">
      <img className="pizza--block__image" src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <h4>price: {pizza.price} UAH</h4>
    </div>
  );
};

export default FullPizza;
