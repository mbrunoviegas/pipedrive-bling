import { ObjectId } from 'mongodb';

export interface IOrderProps {
  value: number;
  createdAt: Date;
}

export class Order {
  private props: IOrderProps;
  private _id: ObjectId;

  private constructor(props: IOrderProps, id?: ObjectId) {
    this.props = props;
    this._id = id;
  }

  get id(): ObjectId {
    if (!this._id) {
      this._id = new ObjectId();
    }

    return this._id;
  }

  get value(): number {
    return this.props.value;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static create(props: IOrderProps, id?: ObjectId): Order {
    return new Order(props, id);
  }
}
