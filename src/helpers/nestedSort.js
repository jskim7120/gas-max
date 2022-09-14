export const getNestedChildren = (data, parent, id, parentIdName) => {
  let out = [];

  for (let i in data) {
    if (data[i][parentIdName] === parent) {
      let children = getNestedChildren(data, data[i][id], id, parentIdName);
      if (children.length) {
        data[i].children = children;
      }
      out.push(data[i]);
    }
  }

  return out;
};
