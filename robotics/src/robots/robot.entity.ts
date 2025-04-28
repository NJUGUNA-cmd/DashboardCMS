import{Entity,Column,PrimaryGeneratedColumn} from "typeorm";

@Entity('robots')
export class Robot{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column({nullable:false})
    name:string;

    @Column({nullable:false})
    type:string;

    @Column({nullable:false})
    status:'active'|"inactive"|"maintenance";

    @Column({ 
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false 
    })
    lastActive:Date;

    @Column({ 
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP',
        nullable: false 
    })
    createdAt:Date;

    @Column({ 
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
        nullable: false 
    })
    updatedAt:Date;
}