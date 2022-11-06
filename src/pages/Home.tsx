import React, { useEffect, useRef } from "react";
import qs from "qs";
import Categories from "../components/Categories";
import Sort, { sorts } from "../components/Sort";
import Skeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Pagination from "../components/Pagination/Pagination";
import { useSelector } from "react-redux";
import { setPage, setFilters } from "../redux/slices/filter/slice";
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

  // useEffect(() => {
  //   const { search } = window.location;
  //   if (search) {
  //     const params = qs.parse(search.substring(1));
  //     const sort = sorts.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         ...params,
  //         sort,
  //       })
  //     );
  //     isSearch.current = true;
  //   }
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchData();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       categoryId,
  //       sortType,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sortType, currentPage]);

  const pizzaItems = items
    // .filter((pizza) => {
    //   return pizza.title.toLowerCase().includes(searchValue.toLowerCase());
    // })
    .map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
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
