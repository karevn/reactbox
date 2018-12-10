import "./iframe.sass";

import React from "react";
const classnames = require("classnames");

import { pixels } from "../../../css";

function maybeApply(obj, func) {
  return func ? func(obj) : obj;
}

export default class Iframe extends React.Component {
  constructor(props) {
    super(props);
    this.state = { size: { width: 0, height: 0 } };
  }

  componentDidMount() {
    this.updateSize();
    window.addEventListener("resize", this.updateSize);
  }

  updateSize = () => {
    const node = this.refs.this;
    this.setState({
      size: { width: node.clientWidth, height: node.clientHeight }
    });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSize);
  }

  render(props = this.props) {
    const style = pixels(maybeApply(this.state.size, props.resize));
    return (
      <div
        className={classnames(
          "reactbox-lightbox-item-object",
          "reactbox-object-iframe",
          props.className
        )}
        ref="this"
      >
        <iframe
          src={props.src}
          style={style}
          onLoad={() => {
            props.dispatch("item.load", props.item);
            this.updateSize();
          }}
        />
      </div>
    );
  }
}
