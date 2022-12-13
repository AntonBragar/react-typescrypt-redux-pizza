import React, { useEffect, useRef } from "react";
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import { setPage } from "../redux/slices/filter/slice";
import { useNavigate } from "react-router-dom";
import { fetchPizzas } from "../redux/slices/pizza/slice";
import { useAppDispatch } from "../redux/store";
import { selectFilter } from "../redux/slices/filter/selectors";
import { selectPizzaData } from "../redux/slices/pizza/selectors";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const sortType = useSelector((state: any) => state.filter.sort.sortProperty);
  const { currentPage, categoryId, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const fetchData = async () => {
    const order = sortType.includes("-") ? "desc" : "asc";
    const sortBy = sortType.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );
  };

  const onChangePage = (number: number) => {
    dispatch(setPage(number));
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchData();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzaItems = items.map((pizza: any) => (
    <PizzaBlock key={pizza.id} {...pizza} />
  ));

  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Was an error 😕</h2>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzaItems}
        </div>
      )}
      <Pagination onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
