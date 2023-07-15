import { Item } from "src/items/models/entities/item.entity";
import { Product } from "src/products/models/entities/product.entity";
import { User } from "src/users/models/entities/user.entity";

const entities = [
  User,
  Item,
  Product
];

export {
  User,
  Item,
  Product
};

export default entities;
