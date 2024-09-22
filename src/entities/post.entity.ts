import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { UserEntity } from './user.entity';

@Entity('posts')
export class PostEntity extends BaseEntity {
    @Column({ nullable: false })
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    userId: number;

    @ManyToOne(() => UserEntity, (user) => user.posts)
    user: UserEntity;
}
