import React from "react";

const InteractComponent = React.createClass({
  componentDidMount: function () {
    this.interactable = interact(this.getDOMNode());
    setupInteractable(this.interactable);
  },
  componentWillUnmount: function () {
    this.interactable.unset();
    this.interactable = null;
  },
  render: function () {
    return React.DOM.div(
      {
        className: this.props.className
      },
      this.props.children
    );
  }
});

export default InteractComponent;
