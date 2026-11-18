export type itemsType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  enabled: boolean;
}[];

type getProductsResponse = {
  products: {
    items: itemsType;
  };
};

type getProductsError = {
  message: string;
  locations?: {
    line: number;
    column: number;
  }[];
  path?: (string | number)[];
  extensions?: Record<string, unknown>;
};

export type graphGetProductsResponse = {
  data?: getProductsResponse;
  errors?: getProductsError;
};

export type sortingWayType = "ASC" | "DESC";

export type productListOptionsType = {
  options: {
    sort: {
      name?: sortingWayType;
      id?: sortingWayType;
      createdAt?: sortingWayType;
      description?: sortingWayType;
    };
  };
};

export type apiSortCasesType = {
  option: "id" | "name" | "createdAt";
  order: sortingWayType;
}[];

export type sortingOptionType = apiSortCasesType[number]["option"];
