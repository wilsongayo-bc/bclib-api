import { Accession } from "src/accession/models/entities/accession.entity";
import { Author } from "src/author/models/entities/author.entity";
import { Book } from "src/books/models/entities/book.entity";
import { BorrowRecord } from "src/borrower-record/models/entities/borrow-record.entity";
import { Category } from "src/category/models/entities/category.entity";
import { Course } from "src/course/models/entities/course.entity";
import { Employee } from "src/employee/models/entities/employee.entity";
import { Publisher } from "src/publisher/models/entities/publisher.entity";
import { Student } from "src/students/models/entities/student.entity";
import { User } from "src/users/models/entities/user.entity";


const entities = [
  User,
  Book,
  Student,
  Category,
  Author,
  Publisher,
  Course,
  Employee,
  BorrowRecord,
  Accession
];

export {
  User,
  Book,
  Student,
  Category,
  Author,
  Publisher,
  Course,
  Employee,
  BorrowRecord,
  Accession
};

export default entities;
