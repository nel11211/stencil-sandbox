import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { MyComponent } from "../my-component";

describe("MyComponent", () => {

  it("should render my element", async () => {

    // Setup pre-conditions
    const page = await newSpecPage({
      components: [MyComponent],
      template: () => <my-component stats={[1, 2, 3]}></my-component>,
    });
    const element = page.root as HTMLMyComponentElement;


    // Test post-conditions
    expect(element).toBeTruthy();
  });

  describe("Private methods", () => {

    describe("getDefaultText()", () => {

      it("should return default text of 'Valued Customer'", async () => {
        // Setup pre-conditions
        const page = await newSpecPage({
          components: [MyComponent],
          template: () => <my-component stats={[1, 2, 3]}></my-component>,
        });
        const component = page.rootInstance as MyComponent;

        // Call method
        const text = component["getDefaultText"](); 
        // const text = (component as any).getDefaultText();

        // Test post-conditions
        expect(text).toBe("Valued Customer");
      });

      it("should return default text based on private default name values", async () => {
        // Setup pre-conditions
        const page = await newSpecPage({
          components: [MyComponent],
          template: () => <my-component stats={[1, 2, 3]}></my-component>,
        });
        const component = page.rootInstance as MyComponent;

        component["defaultFirst"] = "Loyal";
        component["defaultMiddle"] = "Returning";

        // Call method
        const text = component["getDefaultText"](); 

        // Test post-conditions
        expect(text).toBe("Loyal Returning Customer");
      });

    });

    describe("getText()", () => {

      it("should return text based on name props", async () => {
        // Setup pre-conditions
        const page = await newSpecPage({
          components: [MyComponent],
          template: () => <my-component stats={[1, 2, 3]}></my-component>,
        });
        const component = page.rootInstance as MyComponent;
        const element = page.root as HTMLMyComponentElement;

        element.first = "Thomas";
        element.middle = "Neo";
        element.last = "Anderson"

        // Call method
        const text = component["getText"](); 

        // Test post-conditions
        expect(text).toBe("Thomas Neo Anderson");
      });

      it("should use getDefaultText when name props are not provided", async () => {
        // Setup pre-conditions
        const page = await newSpecPage({
          components: [MyComponent],
          template: () => <my-component stats={[1, 2, 3]}></my-component>,
        });
        const component = page.rootInstance as MyComponent;

        const mockGetDefaultText = jest.fn(() => "Valued Customer");
        component["getDefaultText"] = mockGetDefaultText;

        // Call method
        const text = component["getText"](); 

        // Test post-conditions
        expect(text).toBe("Valued Customer");
        expect(mockGetDefaultText).toHaveBeenCalled();
      });

    });

    describe("getSum()", () => {

      it("should return the sum of values in stats array prop", async () => {
        // Setup pre-conditions
        const page = await newSpecPage({
          components: [MyComponent],
          template: () => <my-component stats={[1, 2, 3]}></my-component>,
        });
        const component = page.rootInstance as MyComponent;

        // Call method
        const sum = component["getSum"](); 

        // Test post-conditions
        expect(sum).toBe(6);
      })

      it("should return the sum of values in stats array prop correctly after being changed", async () => {
        // Setup pre-conditions
        const page = await newSpecPage({
          components: [MyComponent],
          template: () => <my-component stats={[1, 2, 3]}></my-component>,
        });
        const component = page.rootInstance as MyComponent;
        const element = page.root as HTMLMyComponentElement;

        element.stats = [4, 5, 6];

        // Call method
        const sum = component["getSum"](); 

        // Test post-conditions
        expect(sum).toBe(15);
      })

    });

  });
});
