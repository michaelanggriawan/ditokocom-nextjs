import React from "react";

function LazyProduct() {
  return (
    <div className="card-skeleton">
      <div className="images-skeleton skeleton" />

      <div className="title-skeleton">
        <p className="title-left skeleton"></p>
        <p className="title-right skeleton"></p>
      </div>

      <div className="content-skeleton">
        <p className="full skeleton"></p>
        <p className="short skeleton"></p>
        <p className="full skeleton"></p>
        <p className="full skeleton"></p>
        <p className="short skeleton"></p>
        <p className="short skeleton"></p>
      </div>
    </div>
  );
}

export default LazyProduct;
