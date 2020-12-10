import { Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseModel {

  @PrimaryGeneratedColumn({ type: "int" })
  public id: number;

  @Column()
  public active: boolean

  @CreateDateColumn({ type: "timestamp" })
  public createdAt: Date

  @UpdateDateColumn({ type: "timestamp" })
  public updatedAt: Date
}