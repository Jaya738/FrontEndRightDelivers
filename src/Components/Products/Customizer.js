import React, { useState } from "react";
import "./product.css";

function Customizer({ show, onClose, product }) {
  const emptyData = {
    selectedOption: "",
    selectedExtras: [],
    itemPrice: 0,
    extraPrice: 0,
  };
  const [customData, setCustomData] = useState(emptyData);
  const custProd = { ...product };
  const custOptions = JSON.parse(custProd.ldesc);
  console.log(custOptions);

  return (
    <div className="customizer" style={{ height: show ? "80vh" : "0vh" }}>
      <div className="customize-header">
        <p>{product.name}</p>
        <span>{product.sdesc}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#1C1C1C"
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
            <stop offset="0" stop-color="#1C1C1C"></stop>
            <stop offset="100%" stop-color="#1C1C1C"></stop>
          </linearGradient>
          <title id="icon-svg-title-"></title>
          <desc id="icon-svg-desc-">It is an icon with title </desc>
          <title>cross</title>
          <path
            d="M11.42 10.42l3.54-3.54c0.38-0.4 0.38-1.040 0-1.42s-1.020-0.4-1.42 0l-3.54 3.54-3.54-3.54c-0.4-0.4-1.020-0.4-1.42 0s-0.38 1.020 0 1.42l3.54 3.54-3.54 3.54c-0.38 0.38-0.38 1.020 0 1.42 0.2 0.18 0.46 0.28 0.72 0.28s0.5-0.1 0.7-0.28l3.54-3.56 3.54 3.56c0.2 0.18 0.46 0.28 0.72 0.28s0.5-0.1 0.7-0.28c0.38-0.4 0.38-1.040 0-1.42l-3.54-3.54z"
            fill="url(#ckfjyi5d901ik3r6vttkuprlt)"
          ></path>
        </svg>
      </div>
      <div className="customize-body">
        <div className="Options-group">
          <div className="customize-sub-header">
            <p>Options</p>
            <span>Select any one option</span>
          </div>
          <div style={{ marginTop: "20px" }}>
            {custOptions.options.map((curOption) => (
              <div key={curOption.n} className="customize-option">
                <div className="customize-option-left">
                  <input
                    type="radio"
                    name={curOption.n}
                    id={curOption.n}
                    checked={customData.selectedOption === curOption.n}
                    onChange={() =>
                      setCustomData({
                        ...customData,
                        selectedOption: curOption.n,
                        itemPrice: curOption.p,
                      })
                    }
                  />
                  <label
                    className="customize-option-label"
                    htmlFor={curOption.n}
                  >
                    {curOption.n}
                  </label>
                </div>
                <div className="customize-option-right">₹{curOption.p}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="Extras-group">
          <div className="customize-sub-header">
            <p>Extras</p>
            <span>You can choose multiple addons</span>
          </div>
          <div style={{ marginTop: "20px" }}>
            {custOptions.extras.map((curExtra) => {
              console.log(customData);
              const isChecked = customData.selectedExtras.some(
                (el) => el.n === curExtra.n
              );
              return (
                <div key={curExtra.n} className="customize-option">
                  <div className="customize-option-left">
                    <input
                      type="radio"
                      name={curExtra.n}
                      id={curExtra.n}
                      checked={isChecked}
                      onChange={() =>
                        setCustomData({
                          ...customData,
                          selectedExtras: [
                            ...customData.selectedExtras,
                            curExtra,
                          ],
                          extraPrice: customData.extraPrice + curExtra.p,
                        })
                      }
                    />
                    <label
                      className="customize-option-label"
                      htmlFor={curExtra.n}
                    >
                      {curExtra.n}
                    </label>
                  </div>
                  <div className="customize-option-right">₹{curExtra.p}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="customize-footer">
        <div className="customize-footer-left">
          Total : ₹{customData.itemPrice + customData.extraPrice}
        </div>
        <div className="customize-footer-right"> Add to cart</div>
      </div>
    </div>
  );
}

export default Customizer;
