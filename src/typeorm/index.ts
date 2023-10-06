import { Author } from "src/author/models/entities/author.entity";
import { Book } from "src/books/models/entities/book.entity";
import { Category } from "src/category/models/entities/category.entity";
import { Publisher } from "src/publisher/models/entities/publisher.entity";
import { Student } from "src/students/models/entities/student.entity";
import { User } from "src/users/models/entities/user.entity";

const entities = [
  User,
  Book,
  Student,
  Category,
  Author,
  Publisher
];

export {
  User,
  Book,
  Student,
  Category,
  Author,
  Publisher
};

export default entities;
