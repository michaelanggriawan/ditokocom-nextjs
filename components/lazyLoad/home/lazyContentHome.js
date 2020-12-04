import React from "react";

function LazyContentHome() {
  return (
    <div className="content-home">
      <div className="row-content">
        <div className="card-content-home skeleton" />
        <div className="card-content-home skeleton" />
      </div>

      <div className="row-content">
        <div className="card-content-home skeleton" />
        <div className="card-content-home skeleton" />
      </div>

      <div className="row-content">
        <div className="card-content-home skeleton" />
        <div className="card-content-home skeleton" />
      </div>
    </div>
  );
}

export default LazyContentHome;
