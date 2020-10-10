import React, { useState } from "react";
import "./Rating.css";

function RatingWidget({ setRating, onClose }) {
  const [state, setState] = useState({
    stars: [1, 2, 3, 4, 5],
    rating: 0,
    hovered: 0,
    selectedIcon: "★",
    deselectedIcon: "☆",
    showRating: true,
  });
  const changeRating = (newRating) => {
    setState({
      ...state,
      rating: newRating,
    });
    setRating(newRating);
  };
  return (
    <div
      style={{
        backgroundColor: "#2f4f4f",
        width: "100%",
        padding: "30px",
        position: "relative",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      {state.showRating && (
        <div
          className="rating"
          style={{
            fontSize: "5em",
            color: "#38d39f",
          }}
        >
          <p>How was your experience with Mughal Restaurant?</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#38d39f"
            width="24"
            height="24"
            viewBox="0 0 20 20"
            aria-labelledby="icon-svg-title- icon-svg-desc-"
            role="img"
            class="rbbb40-0 byLLrW"
            onClick={onClose}
          >
            <linearGradient
              id="ckfjyi5d901ik3r6vttkuprlt"
              x1="0"
              x2="100%"
              y1="0"
              y2="0"
            >
              <stop offset="0" stop-color="#38d39f"></stop>
              <stop offset="100%" stop-color="#38d39f"></stop>
            </linearGradient>
            <title id="icon-svg-title-"></title>
            <desc id="icon-svg-desc-">It is an icon with title </desc>
            <title>cross</title>
            <path
              d="M11.42 10.42l3.54-3.54c0.38-0.4 0.38-1.040 0-1.42s-1.020-0.4-1.42 0l-3.54 3.54-3.54-3.54c-0.4-0.4-1.020-0.4-1.42 0s-0.38 1.020 0 1.42l3.54 3.54-3.54 3.54c-0.38 0.38-0.38 1.020 0 1.42 0.2 0.18 0.46 0.28 0.72 0.28s0.5-0.1 0.7-0.28l3.54-3.56 3.54 3.56c0.2 0.18 0.46 0.28 0.72 0.28s0.5-0.1 0.7-0.28c0.38-0.4 0.38-1.040 0-1.42l-3.54-3.54z"
              fill="url(#ckfjyi5d901ik3r6vttkuprlt)"
            ></path>
          </svg>

          {state.stars.map((star) => {
            return (
              <span
                key={star}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  changeRating(star);
                }}
                // onMouseEnter={() => {
                //   hoverRating(star);
                // }}
                // onMouseLeave={() => {
                //   hoverRating(0);
                // }}
              >
                {state.rating < star
                  ? state.hovered < star
                    ? state.deselectedIcon
                    : state.selectedIcon
                  : state.selectedIcon}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default RatingWidget;
