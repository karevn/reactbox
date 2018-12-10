import React from "react";
import Iframe from "./iframe";

export { default as image } from "./image";
export { default as video } from "./video";
export { default as ajax } from "./ajax";
export { default as html } from "./html";
export function iframe(props) {
  return <Iframe {...props} src={props.item.url} />;
}
