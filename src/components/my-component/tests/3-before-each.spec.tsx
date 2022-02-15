import { h } from "@stencil/core";
import { newSpecPage } from "@stencil/core/testing";
import { MyComponent } from "../my-component";

describe("MyComponent", () => {

  let component: MyComponent;
  let element: HTMLMyComponentElement;

  // Runs before each test case
  beforeEach(async () => {
    const page = await newSpecPage({
      components: [MyComponent],
      template: () => <my-component stats={[1, 2, 3]}></my-component>
    });
    component = page.rootInstance as MyComponent;
    element = page.root as HTMLMyComponentElement;
  });

  it("should render my element", async () => {
    expect(element).toBeTruthy();
  });

  describe("Private methods", () => {

    describe("getDefaultText()", () => {

      it("should return default text of 'Valued Customer'", async () => {
        // Call method
        const text = component["getDefaultText"]();

        // Test post-conditions
        expect(text).toBe("Valued Customer");
      });

      it("should return default text based on private default name values", async () => {
        // Setup pre-conditions
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
        const mockGetDefaultText = jest.fn(() => "Valued Customer");
        component["getDefaultText"] = mockGetDefaultText;

        // Call method
        const text = component["getText"](); 

        // Test post-conditions
        expect(mockGetDefaultText).toHaveBeenCalled();
        expect(text).toBe("Valued Customer");
      });

    });

    describe("getSum()", () => {

      it("should return the sum of values in stats array prop", async () => {
        // Call method
        const sum = component["getSum"](); 

        // Test post-conditions
        expect(sum).toBe(6);
      })

      it("should return the sum of values in stats array prop correctly after being changed", async () => {
        // Setup pre-conditions
        element.stats = [4, 5, 6];

        // Call method
        const sum = component["getSum"](); 

        // Test post-conditions
        expect(sum).toBe(15);
      })

    });

  });

  describe("Public methods", () => {

    describe("componentWillLoad()", () => {

      it("should set this.sum using getSum()", async () => {
        // Setup pre-conditions
        expect(component["sum"]).toBe(6);
        element.stats = [4, 5, 6];

        // Call method
        component.componentWillLoad();

        // Test post-conditions
        expect(component["sum"]).toBe(15);
      });

    });

  });
});
