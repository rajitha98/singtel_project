export const searchByName = (formattedList, searchTerm) => {
  const filteredData = formattedList.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return filteredData;
};

export const searchByHeight = (formattedList, searchTerm) => {
  const filteredData = formattedList.filter((item) =>
    item.height.imperial.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return filteredData;
};

export const searchByLifeSpan = (formattedList, searchTerm) => {
  const filteredData = formattedList.filter((item) =>
    item.lifeSpan.imperial.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return filteredData;
};
