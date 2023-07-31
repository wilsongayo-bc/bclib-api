import { ProductInventory } from "src/inventory/product/models/entities/product-inventory.entity";
import { Item } from "src/items/models/entities/item.entity";
import { Product } from "src/products/models/entities/product.entity";
import { User } from "src/users/models/entities/user.entity";

const entities = [
  User,
  Item,
  Product,
  ProductInventory
];

export {
  User,
  Item,
  Product,
  ProductInventory
};

export default entities;
