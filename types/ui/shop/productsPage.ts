export type sortingMethodType =
  | "A-Z"
  | "Z-A"
  | "highest to lowest"
  | "lowest to highest";

export type sortCasesType = {
  method: sortingMethodType;
  url: RegExp;
  field: "title" | "price";
  order: "asc" | "desc";
}[];
