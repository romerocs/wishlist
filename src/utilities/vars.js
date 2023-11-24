export const mode = import.meta.env.MODE;
export const url = import.meta.env.BASE_URL;
export const listPath = '/lists/';
export const priorityMap = {
  "high" : true,
  "low" : false
};


export const sortOptions = {
  "priority_high_low" : {
    "value" : "priority_high_low",
    "label" : "Priority: High to Low",
    "selected" : true
  },
  "priority_low_high" : {
    "value" : "priority_low_high",
    "label" : "Priority: Low to High",
    "selected" : false
  },
  "price_high_low" : {
    "value" : "price_high_low",
    "label" : "Price: High to Low",
    "selected" : false
  },
  "price_low_high" : {
    "value" : "price_low_high",
    "label" : "Price: Low to High",
    "selected" : false
  }
}

export const filterOptions = {
  "notpurchased" : {
    "value" : "notpurchased",
    "label" : "Not Purchased Yet",
    "selected" : true
  },
  "purchased" : {
    "value" : "purchased",
    "label" : "Purchased",
    "selected" : false
  }
}

export const priorityMapToText = (bool) => {
  return Object.keys(priorityMap).find(key => priorityMap[key] === bool);
};