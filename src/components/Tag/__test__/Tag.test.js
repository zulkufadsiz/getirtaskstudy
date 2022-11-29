import {render} from '@testing-library/react';
import Tag from "../Tag";
describe('Tag component tests',()=>{
  test('Render tag item with label',() => {
    const component  = render(<Tag label="Mug" />);
    const activeTag = component.getByTestId('tag');
    expect(activeTag.textContent).toBe("Mug");
    expect(activeTag.classList.contains('tag-active')).toBe(true);
    expect(activeTag.classList.contains('tag-disabled')).toBe(false);
  });

  test('Render disable tag item with label',() => {
    const component  = render(<Tag disabled label="Mug" />);
    const disableTag = component.getByTestId('tag');
    expect(disableTag.textContent).toBe("Mug");
    expect(disableTag.classList.contains('tag-disabled')).toBe(true);
    expect(disableTag.classList.contains('tag-active')).toBe(false);
  });
});

