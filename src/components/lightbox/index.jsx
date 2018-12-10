import "./index.sass";
import React from "react";
import Item from "./lightbox-item";
import LeftIcon from "react-icons/lib/md/arrow-back";
import RightIcon from "react-icons/lib/md/arrow-forward";
const classnames = require("classnames");

class Icons extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.activeIndex !== this.props.activeIndex;
  }
  render(props = this.props) {
    const prevClasses = classnames(["reactbox-prev"], {
      "reactbox-disabled": props.activeIndex === 0
    });
    const nextClasses = classnames([
      "reactbox-next",
      { "reactbox-disabled": props.activeIndex >= props.items.length - 1 }
    ]);
    return (
      <If condition={props.items.length > 1}>
        <div className="reactbox-prev-next">
          <div className={prevClasses} onClick={() => props.dispatch("prev")}>
            <LeftIcon size={100} />
          </div>
          <div className={nextClasses} onClick={() => props.dispatch("next")}>
            <RightIcon size={100} />
          </div>
        </div>
      </If>
    );
  }
}

export default class Lightbox extends React.Component {
  state = {};

  componentDidMount() {
    window.addEventListener("resize", this.calcMetrics);
    this.calcMetrics();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.calcMetrics);
  }

  calcMetrics = () => {
    const node = this.refs.lightbox;
    this.setState({
      metrics: {
        left: node.offsetLeft,
        top: node.offsetTop,
        width: node.clientWidth,
        height: node.clientHeight
      }
    });
  };

  render() {
    const props = this.props;
    const metrics = this.state.metrics;
    const items = [props.items[props.activeIndex]];
    const activeIndex = props.activeIndex;
    if (activeIndex > 0) {
      items.unshift(props.items[activeIndex - 1]);
    }
    if (activeIndex < props.items.length - 1) {
      items.push(props.items[activeIndex + 1]);
    }
    return (
      <div className="reactbox-lightbox" ref="lightbox">
        <Icons
          items={props.items}
          activeIndex={activeIndex}
          dispatch={props.dispatch}
        />
        <If condition={!!metrics}>
          <For each="item" of={items}>
            <Item {...props} item={item} metrics={metrics} key={item.index} />
          </For>
        </If>
      </div>
    );
  }
}
