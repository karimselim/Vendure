type productDetailsType = {
  product: {
    id: string;
    name: string;
    description: string;
    variants: [
      {
        price: number;
        sku: string;
        stockLevel: "IN_STOCK" | "OUT_OF_STOCK";
      },
    ];
  };
};

type productDetailsErrorType = {
  message: string;
  locations?: {
    line: number;
    column: number;
  }[];
  extensions?: Record<string, unknown>;
  code: string;
};

export type graphProductDetailsType = {
  data: productDetailsType;
  errors: productDetailsErrorType;
};

export type requiredFieldsType = {
  name: string;
  description: string;
  id: string;
  price: number;
  sku: string;
  stockLevel: "IN_STOCK" | "OUT_OF_STOCK";
};
