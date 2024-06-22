import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userid: number;

  @Column()
  name: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  tag: string;

  @Column()
  size: string;

  @Column()
  weight: number;

  @Column()
  skuId: string;

  @Column()
  colour: string;

  @Column({ default: 0 })
  views: number;
}
