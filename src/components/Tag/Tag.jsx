import React from 'react';
import './Tag.css';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function Tag(props) {
  return (
    <div
      data-testid="tag"
      className={classNames('tag-item', props.disabled ? 'tag-disabled' : 'tag-active')}
      onClick={props.onClick}>
      {props.label}
    </div>
  );
}

export default Tag;
Tag.propTypes = {
  onClick: PropTypes.func,
  label: PropTypes.string,
  disabled: PropTypes.bool
};
