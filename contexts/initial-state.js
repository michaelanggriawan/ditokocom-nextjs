const initialState = {
  progress: { isLoading: false, error: false },
  purchase: {
    address: {
      province: {
        id: ''
      },
      city: {
        id: ''
      },
      sub_district: {
        id: ''
      },
      details: ""
    },
    brand: {
      chosenPromo: { product_id: null },
      chosenBonus: { product_id: null }
    }
  }
};

export default initialState;
