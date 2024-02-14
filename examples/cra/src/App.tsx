import React from "react";

export default function App() {
  // Access environment variable from `window.env` object
  return <div>REACT_APP_SAMPLE_ENV: {window.env.REACT_APP_SAMPLE_ENV}</div>;
}
