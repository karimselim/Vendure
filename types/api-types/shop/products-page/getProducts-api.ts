type getProductsResponse = {
  products: {
    items: {
      id: string;
      name: string;
      createdAt: string;
      updatedAt: string;
      description: string;
      enabled: boolean;
    }[];
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
