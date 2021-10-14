export class IDealProps {
  title: string;
  status: string;
  value: number;
  currency: string;
}

export class Deal {
  private props: IDealProps;

  get title(): string {
    return this.props.title;
  }

  get status(): string {
    return this.props.status;
  }

  get value(): number {
    return this.props.value;
  }

  get currency(): string {
    return this.props.currency;
  }

  private constructor(props: IDealProps) {
    this.props = props;
  }

  static create(props: IDealProps): Deal {
    return new Deal(props);
  }
}
