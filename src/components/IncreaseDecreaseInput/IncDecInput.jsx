import React, { useRef } from 'react';
import './IncDecInput.css';
import PropTypes from 'prop-types';

function IncDecInput(props) {
  let inputRef = useRef(null);

  function increaseValue() {
    const val = inputRef.current.value;
    var value = parseInt(val, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    inputRef.current.value = value;
    props.setValue(value);
  }

  function decreaseValue() {
    const val = inputRef.current.value;
    var value = parseInt(val, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? (value = 1) : '';
    value--;
    inputRef.current.value = value;
    props.setValue(value);
  }

  function onChange(e) {
    var value = parseInt(e.target.value, 10);
    value = isNaN(value) ? 1 : value;
    if (e.target.value !== '' || value == 0) {
      props.setValue(value);
    }
    inputRef.current.value = value;
  }

  return (
    <form>
      <div data-testid="dec-button" className="value-button" id="decrease" onClick={decreaseValue}>
        -
      </div>
      <input
        data-testid="cart-item-value"
        ref={inputRef}
        type="number"
        id="number"
        defaultValue={props.value}
        onBlur={onChange}
      />
      <div data-testid="inc-button" className="value-button" id="increase" onClick={increaseValue}>
        +
      </div>
    </form>
  );
}

export default IncDecInput;

IncDecInput.propTypes = {
  value: PropTypes.number,
  setValue: PropTypes.func
};
