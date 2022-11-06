import { Sort } from "../filter/types";

export type FetchPizzasArgs = {
  order: string;
  sortBy: Sort;
  category: string;
  search: string;
  currentPage: number;
};

export type Pizza = {
  id: string;
  price: number;
  title: string;
  imageUrl: string;
  type: number;
  size: number;
  count: number;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
}
