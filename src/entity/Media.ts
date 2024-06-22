import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  url: string;

  @Column()
  userid: number;

  @Column({ default: 0 })
  numberOfDownloads: number;
}
