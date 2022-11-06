import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCategory } from "../redux/slices/filter/selectors";
import { useWhyDidYouUpdate } from "ahooks";
import { setCategoryId } from "../redux/slices/filter/slice";

const Categories: React.FC = memo(() => {
  const dispatch = useDispatch();
  const categoryId = useSelector(selectCategory);
  useWhyDidYouUpdate("Categories", { categoryId });
  const categories: string[] = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  const onChangeCategory = React.useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => onChangeCategory(index)}
            className={categoryId === index ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Categories;
