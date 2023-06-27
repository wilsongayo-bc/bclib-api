import { Exclude } from "class-transformer";
import { User } from "../models/entities/user.entity";

export interface RequestWithUser extends Request {
    user: User;
}

export class SerializedUser {
    id: number;
    username: string;
    email: string;
  
    @Exclude()
    password: string;
  
    constructor(partial: Partial<SerializedUser>) {
      Object.assign(this, partial);
    }
}