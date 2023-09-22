import { Book } from "src/books/models/entities/book.entity";
import { Student } from "src/students/models/entities/student.entity";
import { User } from "src/users/models/entities/user.entity";

const entities = [
  User,
  Book,
  Student
];

export {
  User,
  Book,
  Student
};

export default entities;
