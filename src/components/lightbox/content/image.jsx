import "./image.sass";

import React from "react";

import getStyle from "../style";
import { fit, fill, valign, align } from "./resize";
import { pixels } from "../../../css";
import includes from "../../../includes";
const asap = require("asap");

const onItemLoad = props => event => {
  if (
    event &&
    event.target &&
    event.target.naturalWidth &&
    event.target.naturalHeight
  ) {
    props.item.size = {
      width: event.target.naturalWidth,
      height: event.target.naturalHeight
    };
    props.dispatch("item.load", props.item);
  }
};

function getImageStyle(state, item) {
  if (!item.size || !state || includes(["right", "bottom"], getStyle(item))) {
    return;
  }
  if (includes(["none", "mini"], getStyle(item))) {
    return valign(state, fit(state, item.size));
  }
  return fill(state, item.size);
}

export default class Image extends React.Component {
  componentDidMount() {
    this.updateSize();
    window.addEventListener("resize", this.updateSize);
    if (!this.props.item.url) {
      asap(onItemLoad(this.props));
    }
  }
  updateSize = () => {
    const node = this.refs.this;
    this.setState({
      width: node.clientWidth,
      height: node.clientHeight
    });
  };
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateSize);
  }

  render(props = this.props) {
    const state = this.state;
    const item = props.item;
    return (
      <div
        className="reactbox-lightbox-item-object reactbox-object-image"
        ref="this"
      >
        <If condition={!!item.url}>
          <img
            className="reactbox-lightbox-content-image"
            style={pixels(align(state, getImageStyle(state, item)))}
            src={item.url}
            alt={item.alt}
            onLoad={onItemLoad(props)}
          />
        </If>
      </div>
    );
  }
}
