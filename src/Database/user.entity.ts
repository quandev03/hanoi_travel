import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  //primary generated column
  @PrimaryGeneratedColumn()
  //create random number
  idUser: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  fullName: string;

  @Column({ default: false })
  isActive: boolean;

  @Column()
  birthday: string;

  @Column()
  codeVerify: string;

  @Column()
  //convert to md5
  password: string;
}
