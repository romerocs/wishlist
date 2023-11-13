export const mode = import.meta.env.MODE;
export const url = import.meta.env.BASE_URL;
export const listPath = '/lists/';
export const priorityMap = {
  "high" : true,
  "low" : false
};
export const priorityMapToText = (bool) => {
  return Object.keys(priorityMap).find(key => priorityMap[key] === bool);
};