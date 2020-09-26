import React from "react";

function AddNewAddress() {
  const emptyLoginData = {
    id: "",
    name: props.config.authData.user.name,
    type: 1,
    new: true,
    phone: props.config.authData.phone,
    flat: "",
    street: "",
    // address: "",
    area: "",
    city: "",
    lat: mapData.lat,
    lng: mapData.long,
  };
  const [loginData, setLoginData] = useState(emptyLoginData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleAddressFromMap = (data) => {
    const mapData = props.config.curBranch;
    //const [distanceR, setDistanceR] = useState(0);
    const [isServicable, setIsServicable] = useState(true);
    const [cords, setCords] = useState({
      lat: mapData.lats,
      lng: mapData.long,
    });
    setLoginData({
      ...loginData,
      area: data.address,
      // street: data.area,
      city: data.area,
      lat: data.mapPosition.lat,
      lon: data.mapPosition.lng,
    });
    calculateService(data.mapPosition.lat, data.mapPosition.lng);
  };
  return (
    <div>
      <div className="row" style={{ marginTop: "8vh" }}>
        <div className="col-lg-12 container checout-address-step">
          <form className="" onSubmit={handleSubmit}>
            <div className="address-fieldset">
              <div className="row">
                <div
                  className="col col-12 form-group"
                  style={{
                    width: "100%",
                    height: "100vh",
                    overflow: "none",
                    position: "relative",
                    borderRadius: "10px",
                    marginBottom: "10vh",
                  }}
                >
                  <Map
                    google={props.google}
                    center={cords}
                    height="50vh"
                    zoom={15}
                    handleAddressFromMap={handleAddressFromMap}
                    checkIfServicable={(lat, lon) => calculateService(lat, lon)}
                  />
                </div>
                <div className="col-lg-6 col-md-12">
                  <div className="form-group">
                    <div className="product-radio">
                      <ul className="product-now">
                        <li>
                          <input
                            type="radio"
                            name="address1"
                            id="ad1"
                            checked={loginData.type === 1}
                            onClick={() =>
                              setLoginData({ ...loginData, type: 1 })
                            }
                          />
                          <label for="ad1">Home</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            name="address2"
                            id="ad2"
                            checked={loginData.type === 2}
                            onClick={() =>
                              setLoginData({ ...loginData, type: 2 })
                            }
                          />
                          <label for="ad2">Office</label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            name="address3"
                            id="ad3"
                            checked={loginData.type === 3}
                            onClick={() =>
                              setLoginData({ ...loginData, type: 3 })
                            }
                          />
                          <label for="ad3">Other</label>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {loginData.area && (
                  <div className="address-item">
                    <div className="address-dt-all">
                      <p style={{ fontSize: "14px", fontWeight: "bold" }}>
                        Selected Address
                      </p>
                      <p>{loginData.area}</p>
                    </div>
                  </div>
                )}
                <div
                  className="col-lg-6 col-md-12"
                  style={{ marginBottom: "20px" }}
                >
                  <div className="form-group">
                    <label className="control-label">
                      Flat / House / Office No.*
                    </label>
                    <input
                      id="flat"
                      name="flat"
                      type="text"
                      placeholder="Flat No."
                      value={loginData.flat}
                      onChange={handleChange}
                      className="form-control input-md"
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-12 col-md-12">
                  <div className="form-group">
                    <div className="address-btns">
                      <div className="">
                        <button type="submit" className="save-btn14 hover-btn">
                          Add Address
                        </button>
                      </div>
                      <div className="col">
                        <button
                          onClick={handleBack}
                          className="next-btn16 hover-btn float-right"
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewAddress;
