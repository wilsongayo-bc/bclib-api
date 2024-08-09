import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import entities from './typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { StudentsModule } from './students/students.module';
import { CategorysModule } from './category/categorys.module';
import { AuthorsModule } from './author/authors.module';
import { PublishersModule } from './publisher/publishers.module';
import { CourseModule } from './course/course.module';
import { BorrowRecordModule } from './borrower-record/borrow-record.module';
import { employeeModule } from './employee/employee.module';
import { AccessionModule } from './accession/accession.module';
import { RoleModule } from './role/role.module';
import { ReturnModule } from './Return/return';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      //entities: ['dist/**/*.entity.js'],
      entities,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    BooksModule,
    StudentsModule,
    CategorysModule,
    AuthorsModule,
    PublishersModule,
    CourseModule,
    employeeModule,
    BorrowRecordModule,
    AccessionModule,
    RoleModule,
    ReturnModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
