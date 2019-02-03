import React, { Component } from 'react';
import classNames from 'classnames';
import InputText from './InputText';

export default class Editable extends Component {
  renderEditing = props => {
    return <InputText text={props.value} onSave={props.onSave} />;
  };

  handleDoubleClick = () => {
    this.props.onEdit();
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

  renderComponent = props => {
    const cls = classNames(props.className, {
      editable: true
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
