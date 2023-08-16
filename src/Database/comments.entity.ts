import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comments {
  @PrimaryGeneratedColumn()
  idComment: string;

  @Column()
  idPost: string;

  @Column()
  content: string;

  @Column()
  postingTime: Date;

  @Column()
  reactions: number;
}
