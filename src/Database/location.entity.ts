import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  idLocation: string;

  @Column()
  nameLocation: string;

  @Column()
  idUser: string;

  @Column()
  decriptionLocation: string;

  @Column()
  posingTime: Date;

  @Column()
  address: string;

  @Column()
  expence: number;

  @Column()
  rate: number;
}
