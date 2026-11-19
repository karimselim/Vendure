type productDetailsType = {
  product: {
    id: string;
    name: string;
    description: string;
    variants: {
      price: number;
      sku: string;
      stockLevel: string;
    };
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
