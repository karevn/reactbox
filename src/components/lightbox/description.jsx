import "./description.sass";

import React from "react";
import Scrollbar from "react-scrollbar";
import getStyle from "./style";
const classnames = require("classnames");

function Wrap(props) {
  return (
    <div className="reactbox-lightbox-item-description">
      <div className="reactbox-lightbox-item-description-inner">
        {props.children}
      </div>
    </div>
  );
}

export default class Description extends React.Component {
  shouldComponentUpdate() {
    return false;
  }
  render(props = this.props) {
    const item = props.item;
    const style = getStyle(item);
    const Scroll = style === "bottom" ? Wrap : Scrollbar;
    return (
      <Scroll
        className={classnames("reactbox-lightbox-item-description", {
          "reactbox-description-light":
            style === "right" && item.type === "video"
        })}
        speed={0.8}
        horizontal={false}
        contentClassName="reactbox-lightbox-item-description-inner"
      >
        <If condition={!!item.description}>
          <div
            className="reactbox-lightbox-item-description-content"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </If>
      </Scroll>
    );
  }
}
