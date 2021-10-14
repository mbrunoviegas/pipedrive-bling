import { ObjectId } from 'mongodb';
import { CreateDateColumn, ObjectIdColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
