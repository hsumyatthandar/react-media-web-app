const reducer = (state, action) => {
    switch (action.type) {
      case "ADD_PRODUCT": {
        //first we gonna check if the product already has or not
        let productExisted = false;
        let productIndex = null;
        state.forEach((product, index) => {
          if (action.payload.id === product.id) {
            productExisted = true;
            productIndex = index;
          }
        });

        return [...state, action.payload];
      }
  
      case "REMOVE_PRODUCT": {
        return state.filter((product) => product.id !== action.payload);
      }

      default: {
        return state;
      }
    }
  };
  
  export default reducer;
  