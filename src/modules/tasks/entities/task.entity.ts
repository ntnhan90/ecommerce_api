import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 250 }) 
  name: string;

  @Column('text')
  description: string;

  @Column()
  isDone: boolean;
}