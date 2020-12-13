import { Column, Entity } from "typeorm"
import { BaseModel } from "../Base"

@Entity("files")
export class File extends BaseModel {

  @Column()
  public name: string

  @Column()
  public size: number

  @Column()
  public key: string

  @Column()
  public url: string
}