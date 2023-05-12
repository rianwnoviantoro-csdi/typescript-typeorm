import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("blogs")
export class BlogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;
}
