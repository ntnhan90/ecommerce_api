import { AbstracEntity } from 'src/database/entities/abstract.entity';
import { 
  BeforeInsert,
  BeforeUpdate,
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  Index 
} from 'typeorm';
import { getHashPassword } from 'src/utils/password.util';

@Entity({ name: 'users' })
export class UserEntity extends AbstracEntity {
  constructor(data?: Partial<UserEntity>){
    super();
    Object.assign(this, data)
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ default: '' })
  avatar_id: string;

  @Column({ default: 1 })
  isActive: number;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await getHashPassword(this.password);
    }
  }
}
