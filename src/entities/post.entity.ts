import { Column, Entity } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity('posts')
export class PostEntity extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;
}
