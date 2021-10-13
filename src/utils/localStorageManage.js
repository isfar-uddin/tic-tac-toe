export const setLocalStorageItem = (name, value) => {
  if (!name) return;
  localStorage.setItem(name, JSON.stringify(value));
};

export const getLocalStorageItem = (name) => {
  if (!name) return '';
  const itemValue = localStorage.getItem(name);
  return itemValue ? JSON.parse(itemValue) : "";
};
