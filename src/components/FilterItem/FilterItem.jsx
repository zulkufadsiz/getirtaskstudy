import React from 'react';
import {
  Checkbox,
  OutlinedInput,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  Typography
} from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import PropTypes from 'prop-types';
import './FilterItem.css';

function FilterItem({ checkbox, name, radio, value, setFilter, search, onChange }) {
  return (
    <>
      <Typography className="text-title text-grey mb-10">{name}</Typography>
      <div className="filter-box">
        <div className="filter-input-container">
          {checkbox && (
            <OutlinedInput
              type="search"
              onChange={(e) => search(e.target.value)}
              placeholder={`Search ${name.toLowerCase()}`}
              className="form-input"
            />
          )}
          {checkbox && (
            <div className="filter-item-container mt-16">
              <FormGroup>
                <FormControlLabel
                  name="all"
                  checked={!checkbox.some((el) => el?.isChecked)}
                  control={<Checkbox className="checkbox-primary" />}
                  label={`All (${checkbox.length})`}
                  data-testid="checkbox-all"
                />
                {checkbox.map((item, index) => (
                  <FormControlLabel
                    name={item.name}
                    checked={item?.isChecked}
                    key={index}
                    onChange={(e) => onChange(e)}
                    control={<Checkbox className="checkbox-primary" />}
                    label={item.label}
                    data-testid="checkbox-filter"
                  />
                ))}
              </FormGroup>
            </div>
          )}
          {radio && (
            <div className="filter-item-container">
              <RadioGroup
                className="w-100"
                aria-labelledby="demo-radio-buttons-group-label"
                value={value}
                onChange={(e, val) => {
                  setFilter(val, e);
                }}
                data-testid="radio-all"
                name="radio-buttons-group">
                {radio.map((item) => (
                  <FormControlLabel
                    data-testid="radio-filter"
                    key={item.id}
                    value={item.value}
                    control={
                      <Radio
                        data-test-id="radio"
                        className="radio-icon"
                        checkedIcon={<CheckCircleOutline />}
                      />
                    }
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default FilterItem;

FilterItem.propTypes = {
  value: PropTypes.string || PropTypes.number,
  checkbox: PropTypes.array,
  checkedState: PropTypes.array,
  radio: PropTypes.array,
  name: PropTypes.string,
  setFilter: PropTypes.func,
  search: PropTypes.func,
  onChange: PropTypes.func
};
