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
   * Stencil render method.
   * @category Lifecycle
   */
  public render() {
    return (
      <div>
        <div>{`Hello, ${this.getText()}!`}</div>
      </div>
    );
  }
}
