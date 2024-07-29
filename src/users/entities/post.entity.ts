import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './users.entity';

@Entity({ name: 'user_posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  content: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => Users, (user) => user.posts)
  user: Users;
}
