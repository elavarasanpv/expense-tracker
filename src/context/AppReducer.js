/** @format */

export default (state, action) => {
  switch (action.type) {
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (tranc) => tranc.id !== action.payload
        ),
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };

    case "ADD_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "ADD_MONTH":
      return {
        ...state,
        month: action.payload,
      };
    default:
      return state;
  }
};
