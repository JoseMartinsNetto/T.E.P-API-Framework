import { Column, Entity } from "typeorm";
import { BaseModel } from "../Base";

@Entity()
export class User extends BaseModel {

  @Column()
  public name: string;

  @Column()
  public username: string;

  @Column()
  public email: string;

  @Column()
  public phone: string;

  @Column()
  public userType: string;

  @Column()
  public cellPhone?: string;

  @Column()
  public password: string;

  @Column()
  public passwordResetToken?: string;

  @Column()
  public passwordResetExpires?: Date;
}