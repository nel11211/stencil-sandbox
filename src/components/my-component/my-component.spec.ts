import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from './my-component';

describe('MyComponent', () => {

  it('should render my component', async () => {
    const page = await newSpecPage({
      components: [MyComponent],
      html: `<my-component></my-component>`,
    });
    expect(page.root).toBeTruthy();
  });
});
