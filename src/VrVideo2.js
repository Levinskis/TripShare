import React from "react";
import videojs from "video.js";
import "videojs-vr";
import "video.js/dist/video-js.css";
import "videojs-vr/dist/videojs-vr.css";

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    const self = this;
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      const player = this;
      player.mediainfo = player.mediainfo || {};
      console.log(self.props);
      player.mediainfo.projection = self.props.vr ? "360" : "NONE";
      player.vr({
        projection: "AUTO",
        debug: true,
        forceCardboard: false
      });
    });
    // this.player.mediainfo = this.player.mediainfo || {};
    // console.log(this.props);
    // this.player.mediainfo.projection = this.props.vr ? "360" : "NONE";
    // this.player.vr({
    //   projection: "AUTO",
    //   debug: true,
    //   forceCardboard: false
    // });
    // console.log(this.player);
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      //   this.player.dispose();
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div data-vjs-player>
        <video
          ref={node => (this.videoNode = node)}
          className="video-js vjs-16-9 vjs-default-skin"
          //   controls={true}
          //   autoPlay={true}
        >
          {/* <source src={this.props.src} type="video/mp4" /> */}
        </video>
      </div>
    );
  }
}

// this.props.videoType
