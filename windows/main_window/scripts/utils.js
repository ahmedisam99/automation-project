exports.formatDataForTable = data => {
  return data.map(row => ({ ...row, action: 'Delete' }));
};

exports.formatDataForDownload = data => {
  const formattedData = { ...data };
  formattedData.data = formattedData.data.map(row => {
    delete row.action;
    return row;
  });
  return formattedData;
};
