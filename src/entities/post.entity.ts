import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { UserEntity } from './user.entity';

@Entity('posts')
export class PostEntity extends BaseEntity {
    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    user: UserEntity;
}
