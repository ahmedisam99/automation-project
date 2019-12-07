exports.formatDataForTable = data => {
  return data.map(row => {
    const formattedRow = { ...row };

    formattedRow.state = formattedRow['State'];
    delete formattedRow['State'];

    formattedRow.inputSymbol = formattedRow['Input Symbol'];
    delete formattedRow['Input Symbol'];

    formattedRow.nextState = formattedRow['Next State'];
    delete formattedRow['Next State'];

    formattedRow.action = 'Delete';

    return formattedRow;
  });
};
