import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({default:0})
    parent_id: number;

    @Column({nullable: true })
    description: string;

    @Column({default:"published"})
    status: string;

    @Column({nullable: true })
    icon: string;

    @Column()
    order: number;

    @Column({default:0})
    is_featured: number;

    @Column({default:0})
    is_default: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;
}
