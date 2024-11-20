import React, { CSSProperties } from "react";
import ReactDOM from "react-dom/client";
import { MonacoEditorReactComp } from "@typefox/monaco-editor-react";
import { createWrapperConfig } from "./wrapperConfig.js";

const App = () => {
  const style: CSSProperties = {
    height: "50vh",
    outline: "1px solid black",
  };

  return (
    <div id="monaco-editor-root">
      <MonacoEditorReactComp
        wrapperConfig={createWrapperConfig()}
        style={style}
      />
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
