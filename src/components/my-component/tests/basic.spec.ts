import { newSpecPage } from "@stencil/core/testing";
import { MyComponent } from "../my-component";

describe("MyComponent", () => {

  it("should render my element", async () => {

    // Setup pre-conditions
    const page = await newSpecPage({
      components: [MyComponent],
      html: `<my-component></my-component>`,
    });
    const element = page.root as HTMLMyComponentElement;


    // Test post-conditions
    expect(element).toBeTruthy();
  });

  describe("Private methods", () => {

    describe("getDefaultText", () => {

      it("should return default text of 'Valued Customer'", async () => {
        // Setup pre-conditions
        const page = await newSpecPage({
          components: [MyComponent],
          html: `<my-component></my-component>`,
        });
        const component = page.rootInstance as MyComponent;
        const element = page.root as HTMLMyComponentElement;
        element.stats = [1, 2, 3];

        // Call method
        const text = component["getDefaultText"](); 
        // const text = (component as any).getDefaultText();

        // Test post-conditions
        expect(text).toBe("Valued Customer");
      });

    });

  });
});
