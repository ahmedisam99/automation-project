exports.formatDataForTable = data => {
  return data.map(row => ({ ...row, action: 'Delete' }));
};
