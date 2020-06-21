import * as actionTypes from "../actions/actionTypes";

const productReducer = function (
  state = {
    curProduct: {},
    items: [
      {
        pid: "1",
        catid: "3",
        name: "product 1",
        img: "",
        aprice: 450,
        sprice: 620,
        status: "outofstock",
      },
      {
        pid: "2",
        catid: "3",
        name: "product 2",
        img: "",
        aprice: 100,
        sprice: 150,
        status: "available",
      },
      {
        pid: "3",
        catid: "3",
        name: "product 3",
        img: "",
        aprice: 100,
        sprice: 200,
        status: "available",
      },

      {
        pid: "4",
        catid: "3",
        name: "product 4",
        img: "",
        aprice: 150,
        sprice: 320,
        status: "available",
      },
      {
        pid: "5",
        catid: "3",
        name: "product 5",
        img: "",
        aprice: 300,
        sprice: 520,
        status: "available",
      },
      {
        pid: "6",
        catid: "3",
        name: "product 6",
        img: "",
        aprice: 450,
        sprice: 620,
        status: "outofstock",
      },
      {
        pid: "7",
        catid: "3",
        name: "product 7",
        img: "",
        aprice: 100,
        sprice: 150,
        status: "available",
      },
      {
        pid: "8",
        catid: "3",
        name: "product 8",
        img: "",
        aprice: 100,
        sprice: 200,
        status: "available",
      },

      {
        pid: "9",
        catid: "3",
        name: "product 9",
        img: "",
        aprice: 150,
        sprice: 320,
        status: "available",
      },
      {
        pid: "10",
        catid: "3",
        name: "product 10",
        img: "",
        aprice: 300,
        sprice: 520,
        status: "available",
      },
      {
        pid: "11",
        catid: "3",
        name: "product 11",
        img: "",
        aprice: 450,
        sprice: 620,
        status: "outofstock",
      },
      {
        pid: "12",
        catid: "3",
        name: "product 12",
        img: "",
        aprice: 100,
        sprice: 150,
        status: "available",
      },
      {
        pid: "13",
        catid: "3",
        name: "product 13",
        img: "",
        aprice: 100,
        sprice: 200,
        status: "available",
      },

      {
        pid: "14",
        catid: "3",
        name: "product 14",
        img: "",
        aprice: 150,
        sprice: 320,
        status: "available",
      },
      {
        pid: "15",
        catid: "3",
        name: "product 15",
        img: "",
        aprice: 300,
        sprice: 520,
        status: "available",
      },
      {
        pid: "16",
        catid: "3",
        name: "product 16",
        img: "",
        aprice: 450,
        sprice: 620,
        status: "outofstock",
      },
      {
        pid: "17",
        catid: "3",
        name: "product 17",
        img: "",
        aprice: 100,
        sprice: 150,
        status: "available",
      },
      {
        pid: "18",
        catid: "3",
        name: "product 18",
        img: "",
        aprice: 100,
        sprice: 200,
        status: "available",
      },

      {
        pid: "19",
        catid: "3",
        name: "product 19",
        img: "",
        aprice: 150,
        sprice: 320,
        status: "available",
      },
      {
        pid: "20",
        catid: "3",
        name: "product 20",
        img: "",
        aprice: 300,
        sprice: 520,
        status: "available",
      },
      {
        pid: "21",
        catid: "3",
        name: "product 21",
        img: "",
        aprice: 450,
        sprice: 620,
        status: "outofstock",
      },
      {
        pid: "22",
        catid: "3",
        name: "product 22",
        img: "",
        aprice: 100,
        sprice: 150,
        status: "available",
      },
      {
        pid: "23",
        catid: "3",
        name: "product 23",
        img: "",
        aprice: 100,
        sprice: 200,
        status: "available",
      },

      {
        pid: "24",
        catid: "3",
        name: "product 24",
        img: "",
        aprice: 150,
        sprice: 320,
        status: "available",
      },
      {
        pid: "25",
        catid: "3",
        name: "product 25",
        img: "",
        aprice: 300,
        sprice: 520,
        status: "available",
      },
    ],
  },
  action
) {
  switch (action.type) {
    case actionTypes.LOAD_PRODUCTS:
      return {
        ...state,
        items: action.payload,
      };
    case actionTypes.SET_CUR_PRODUCT:
      console.log(action.payload);
      return {
        ...state,
        curProduct: action.payload,
      };
    default:
      return state;
  }
};
export default productReducer;
