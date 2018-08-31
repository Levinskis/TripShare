import React, { Component } from "react";
import { FilePond, File, registerPlugin } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import VrVideo2 from "./VrVideo2.js";
import VrPhoto from "./VrPhoto.js";

import "./Main.css";
import "normalize.css";

class Main extends Component {
  state = { files: [], slide: 0 };
  onAddFile = (error, result) => {
    const fileUrl = URL.createObjectURL(result.file);

    this.setState({
      files: [
        ...this.state.files,
        {
          type: result.file.type.includes("video") ? "video" : "image",
          videoType: result.file.type,
          fileUrl,
          vr: !!result.file.name.includes("360")
        }
      ]
    });
  };

  prev = () => {
    this.setState({
      slide:
        this.state.slide === 0
          ? this.state.files.length - 1
          : this.state.slide - 1
    });
  };

  next = () => {
    this.setState({
      slide:
        this.state.slide === this.state.files.length - 1
          ? 0
          : this.state.slide + 1
    });
  };
  render() {
    // let player = null;
    // if (this.state.file) {
    //   player = videoVr("my-video");
    //   player.vr({ projection: "360" });
    // }
    console.log(this.state.files[this.state.slide]);
    return (
      <div className="app">
        {/* {this.state.files.length > 0 && (
          <VrPhoto src={this.state.files[this.state.slide].fileUrl} />
        )} */}
        {this.state.files.length > 0 && (
          <div className="galeryWrapper">
            <div className="galery">
              <div>
                <div className="prev" onClick={this.prev}>
                  Prev
                </div>
              </div>
              <div className="content">
                {this.state.files[this.state.slide].type === "video" ? (
                  <div key={this.state.files[this.state.slide].fileUrl}>
                    <VrVideo2
                      controls={true}
                      sources={[
                        {
                          src: this.state.files[this.state.slide].fileUrl,
                          type: "video/mp4"
                        }
                      ]}
                      // src={this.state.files[this.state.slide].fileUrl}
                      vr={this.state.files[this.state.slide].vr}
                      // videoType={this.state.files[this.state.slide].videoType}
                    />
                  </div>
                ) : this.state.files[this.state.slide].type === "image" &&
                this.state.files[this.state.slide].vr ? (
                  <VrPhoto src={this.state.files[this.state.slide].fileUrl} />
                ) : (
                  <div >
                    <img
                      src={this.state.files[this.state.slide].fileUrl}
                      style={{ width: "100%" }}
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="next" onClick={this.next}>
                  Next
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="upload">
          <FilePond
            onaddfile={this.onAddFile}
            ref={ref => (this.pond = ref)}
            allowMultiple={true}
            allowFileEncode
          />
        </div>
      </div>
    );
  }
}

export default Main;
