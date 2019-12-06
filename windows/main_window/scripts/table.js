const Tabulator = require('tabulator-tables');
const tableData = require('./scripts/table_dummy_data.json');

const table = new Tabulator('#transitionTable', {
  data: tableData,
  layout: 'fitColumns',
  responsiveLayout: 'hide',
  tooltips: true,
  addRowPos: 'bottom',
  history: true,
  //   autoColumns: true,
  columns: [
    { title: 'State', field: 'state', editor: true },
    {
      title: 'Input Symbol',
      field: 'inputSymbol',
      editor: true,
    },
    {
      title: 'Next State',
      field: 'nextState',
      editor: true,
    },
  ],
});
