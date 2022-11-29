import { fireEvent, render } from "@testing-library/react";
import IncDecInput from "../IncDecInput";

let component,decButton,incButton,input;
beforeEach(() => {
  component = render(<IncDecInput value={1} setValue={()=>{}} />);
  decButton = component.getByTestId('dec-button');
  incButton = component.getByTestId('inc-button');
  input = component.getByTestId('cart-item-value');
});
describe('IncDecInput component tests',()=>{
  test('Click increase button and update input value ',() => {
    expect(input.value).toBe("1");
    fireEvent.click(incButton);
    fireEvent.click(incButton);
    expect(input.value).toBe("3");
  });

  test('Click decrease button and update input value',() => {
    expect(input.value).toBe("1");
    fireEvent.click(decButton);
    expect(input.value).toBe("0");
    fireEvent.click(decButton);
    expect(input.value).toBe("0");
  });
});

