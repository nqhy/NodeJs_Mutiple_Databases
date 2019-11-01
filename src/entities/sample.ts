import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sample')
export class SampleEntity {
  @PrimaryGeneratedColumn()
  sampleId: number;

  @Column({
    length: 100,
  })
  fieldSample: string;
}
