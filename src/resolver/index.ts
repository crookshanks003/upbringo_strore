import { InvoiceResolver } from "./invoice.resolver";
import { StoreResolver } from "./store.resolver";

export const resolvers = [StoreResolver, InvoiceResolver] as const;
