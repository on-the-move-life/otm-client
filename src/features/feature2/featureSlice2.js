const initialState2 = {
  dummy: 100,
};

export default function reducer2(state = initialState2, action) {
  switch (action.type) {
    case "account/testAction2":
      return { ...state, dummy: state.dummy + action.payload };

    default:
      return state;
  }
}

export function testAction2(amount) {
  return { type: "account/testAction2", payload: amount };
}
