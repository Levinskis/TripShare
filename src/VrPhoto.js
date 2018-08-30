import React, { Component } from "react";
const create360Viewer = require("360-image-viewer");
const canvasFit = require("canvas-fit");

export default class VideoPlayer extends Component {
  componentDidMount() {
    // load your image
    const image = new Image();
    image.src = this.props.src;

    image.onload = () => {
      // when the image is loaded, setup the viewer
      const viewer = create360Viewer({
        image: image
      });

      // attach canvas to body
      this.el.appendChild(viewer.canvas);

      // setup fullscreen canvas sizing
      const fit = canvasFit(viewer.canvas, this.el, window.devicePixelRatio);
      window.addEventListener("resize", fit, false);
      fit();

      // start the render loop
      viewer.start();
    };
  }
  render() {
    return (
      <div
        style={{
          width: "100%",
          position: "relative",
          height: "70vh"
        }}
        ref={el => {
          this.el = el;
        }}
      />
    );
  }
}
