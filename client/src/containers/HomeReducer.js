export const errorReducer = (state = {}, action) => {
  switch (action.type) {
    case "ERROR": {
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export const navReducer = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_TAB": {
      return {
        ...state,
        tab_index: action.payload
      };
    }
    default: {
      return state;
    }
  }
};

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_FETCH_INITIATED": {
      return {
        ...state,
        fetching: true
      };
    }
    case "USER_FETCH_RETURNED": {
      return {
        ...state,
        fetching: false,
        ...action.payload
      };
    }
    default: {
      return state;
    }
  }
};