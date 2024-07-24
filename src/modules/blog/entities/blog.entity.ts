import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn} from 'typeorm';

@Entity("posts")
export class Blog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

    @Column()
    description: string;

    @Column()
    content: string;

    @Column()
    status: string;

    @Column()
    author_id: number;

    @Column()
    is_featured: number;

    @Column()
    image: string;

    @Column()
    views: number;

    @Column()
    format_type: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}
