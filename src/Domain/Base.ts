import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseModel {

  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column({ type: "timestamp" })
  public createdAt: Date

  @Column({ type: "timestamp" })
  public updatedAt: Date
}