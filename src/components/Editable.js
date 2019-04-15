import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputText from './InputText';

export default class Editable extends PureComponent {
  handleDoubleClick = () => {
    const { onEdit } = this.props;
    onEdit();
  };

  renderView = props => {
    return (
      <div
        onDoubleClick={this.handleDoubleClick}
        className="task"
        title="Double click to edit"
      >
        {props.value}
      </div>
    );
  };

  renderEditing = props => {
    return <InputText text={props.value} onSave={props.onSave} />;
  };

  renderComponent = props => {
    const cls = classNames(props.className, {
      editable: true,
    });
    return (
      <div className={cls}>
        {!props.editing ? this.renderView(props) : this.renderEditing(props)}
      </div>
    );
  };

  render() {
    return this.renderComponent(this.props, this.state);
  }
}

Editable.propTypes = {
  onEdit: PropTypes.func.isRequired,
};
