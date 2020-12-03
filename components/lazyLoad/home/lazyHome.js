import React from "react";

function LazyHome() {
  return (
    <div className="card-home">
      <div className="category-home">
        <div className="ditoko__lineCategory skeleton" />

        <div className="ditoko__lazyBanner skeleton" />

        {/* <div className="row-category">
          <div className="sub-category skeleton" />
          <div className="sub-category skeleton" />
          <div className="sub-category skeleton" />
          <div className="sub-category skeleton" />
          <div className="sub-category skeleton" />
        </div>

        <div className="row-category">
          <div className="sub-category skeleton" />
          <div className="sub-category skeleton" />
          <div className="sub-category skeleton" />
          <div className="sub-category skeleton" />
          <div className="sub-category skeleton" />
        </div> */}
      </div>

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
    </div>
  );
}

export default LazyHome;
