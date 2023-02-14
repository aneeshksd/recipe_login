import React from "react";
import "./RecipeDetails.css";
import { BsArrowLeftCircle } from "react-icons/bs";

export default function RecipeDetails(data) {
  console.log(data);

  return (
    <div className="recipe-details-body">
      <div className="row">
        <div className="col-sm-2 recipe-details-name">
          <BsArrowLeftCircle size="20px" onClick={data.clickArrow} />
          <span> {data.name.r_name}</span>
        </div>
        <div className="col-sm-10 detail-status-button">
          <button
            className=" btn btn-sm rounded detail-status-button-align"
            style={{
              height: "10px",
              backgroundColor: data.name.color,
              color: data.name.fontColor,
              fontWeight: "bold",
              maxWidth: "150px",
              borderRadius: "50px",
              width: "400px",
              textAlign: "centre",
            }}
          >
            {data.name.status}
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <p className="recipe-details">{data.name.r_details}</p>
        </div>
      </div>
    </div>
  );
}
