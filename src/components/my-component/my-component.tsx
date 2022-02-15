import { Component, Prop, h } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  /**
   * The first name
   * @category Public
   */
  @Prop() first?: string;

  /**
   * The middle name
   * @category Public
   */
  @Prop() middle?: string;

  /**
   * The last name
   * @category Public
   */
  @Prop() last?: string;

  /**
   * Statistics
   * @category Public
   */
  @Prop() stats: number[];

  /**
   * @category Private
   */
  private defaultFirst = "Valued";

  /**
   * @category Private
   */
  private defaultMiddle = "";

  /**
   * @category Private
   */
  private defaultLast = "Customer";

  /**
   * @category Private
   */
  private sum: number;

  /**
   * Returns default text.
   * @category Private
   */
  private getDefaultText(): string {
    return format(this.defaultFirst, this.defaultMiddle, this.defaultLast);
  }

  /**
   * Returns text based on name props, or default if names were not set.
   * @category Private
   */
  private getText(): string {
    let text = format(this.first, this.middle, this.last);
    if (text === "") {
      text = this.getDefaultText();
    }
    return text;
  }

  /**
   * Returns sum of stats.
   * @category Private
   */
  private getSum(): number {
    let sum = 0;
    for (const value of this.stats) {
      sum += value;
    }
    return sum;
  }

  /**
   * Stencil componentWillLoad method.
   * @category Lifecycle
   */
  public componentWillLoad() {
    this.sum = this.getSum();
  }

  /**
   * Stencil render method.
   * @category Lifecycle
   */
  public render() {
    return (
      <div>
        <div>{`Hello, ${this.getText()}!`}</div>
        <div>{`Sum of stats: ${this.sum}`}</div>
      </div>
    );
  }
}
