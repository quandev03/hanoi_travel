import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Image{
  @PrimaryGeneratedColumn()
  idImage: string;

  @Column()
  idPost: string;

  @Column()
  description: string;

  @Column()
  key: string;
}
