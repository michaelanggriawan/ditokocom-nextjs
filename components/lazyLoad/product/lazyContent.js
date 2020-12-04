import React from "react";

function LazyContent() {
  return (
    <div className="content-skeleton">
      <p className="full skeleton"></p>
      <p className="short skeleton"></p>
      <p className="full skeleton"></p>
      <p className="full skeleton"></p>
      <p className="short skeleton"></p>
      <p className="short skeleton"></p>
    </div>
  );
}

export default LazyContent;
