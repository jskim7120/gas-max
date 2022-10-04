import React, { Component, useState } from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

const App = () => {
  const [state, setState] = useState<any>({
    isPaneOpen: false,
  });

  return (
    <div>
      <div style={{ marginTop: "32px" }}>
        <button onClick={() => setState({ isPaneOpen: true })}>
          Click me to open left pane with 20% width!
        </button>
      </div>
      <SlidingPane
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={state.isPaneOpen}
        title="Hey, it is optional pane title.  I can be React component too."
        subtitle="Optional subtitle."
        closeIcon={<div>Some div containing custom close icon.</div>}
        onRequestClose={() => {
          setState({ isPaneOpen: false });
        }}
        from="left"
        width="200px"
      >
        <div>And I am pane content. BTW, what rocks?</div>
        <br />
        <img src="img.png" />
      </SlidingPane>
    </div>
  );
};

export default App;
