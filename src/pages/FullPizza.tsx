import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
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
      <p className="pizza--block__description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi
        aperiam beatae dolorum fugit iure iusto, mollitia quae sed unde! Alias
        earum eligendi error est impedit odio possimus, sunt vitae.
      </p>
      <h4 className="pizza--block__price">Price: {pizza.price} UAH</h4>
      <Link to={"/"}>
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
