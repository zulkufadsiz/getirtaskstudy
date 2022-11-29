import {render} from '@testing-library/react';
import React from "react";
import Footer from "../Footer";

let component;
beforeEach(()=>{
  component = render(
      <Footer />
  );
})
describe('Footer component tests',()=>{
  test('Check corporation and privacy text',() => {
    const corporation = component.getByTestId('corporation');
    expect(corporation.textContent).toBe("@2019 Market");
    const privacy = component.getByTestId('footer-privacy');
    expect(privacy.textContent).toBe("Privacy Policy");
  });
});
