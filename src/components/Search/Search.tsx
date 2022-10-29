import React, { useCallback, useRef, useState } from "react";
import styles from "./Search.module.scss";
import closeIcon from "../../assets/img/close-icon.svg";
import searchIcon from "../../assets/img/search-icon.svg";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";

const Search = () => {
  const [value, setValue] = useState("");
  const inputRef = useRef();
  const dispatch = useDispatch();

  const updateSearchValue = useCallback(
    debounce((str) => {
      dispatch(setSearchValue(str));
    }, 350),
    []
  );

  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearchValue(""));
    setValue("");
    inputRef.current.focus();
  };
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={searchIcon} alt="search icon" />
      <input
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        ref={inputRef}
        type="text"
        placeholder="Search your pizza..."
      />
      {value && (
        <img
          className={styles.closeIcon}
          src={closeIcon}
          alt=""
          onClick={onClickClear}
        />
      )}
    </div>
  );
};

export default Search;
