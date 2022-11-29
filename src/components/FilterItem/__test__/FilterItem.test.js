import { fireEvent, render } from "@testing-library/react";
import FilterItem from "../FilterItem";
import {radios,checkboxes} from "./data";

describe('FilterItem component tests', () => {
  test('Filter item radios test', () => {
    let val = 'price-asc', checked;
    const component = render(<FilterItem value={val} radio={radios} setFilter={(data,e)=>{
      val = data;
      checked = e.target.checked;
    }} />);
    const labelRadio = component.getByLabelText(radios[1].label);
    checked = labelRadio.checked
    expect(checked).toBe(false);
     fireEvent.click(labelRadio);
     jest.useFakeTimers();
     jest.runAllTimers();
    expect(checked).toBe(true);
  });

  test('Filter item checkbox test', () => {
    let val = 'checkbox', checked;
    const component = render(<FilterItem name="CheckBoxFilter" value={val} checkbox={checkboxes} onChange={(e)=>{
      checked = e.target.checked;
    }} />);
    const labelCheckbox = component.getByLabelText(checkboxes[1].label);
    checked = labelCheckbox.checked
    expect(checked).toBe(false);
    fireEvent.click(labelCheckbox);
    jest.useFakeTimers();
    jest.runAllTimers();
    expect(checked).toBe(true);
  });
});
