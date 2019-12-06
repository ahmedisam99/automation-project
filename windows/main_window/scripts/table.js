const Tabulator = require('tabulator-tables');
const tableData = require('./scripts/table_dummy_data.json');
const { formatDataForTable } = require('./scripts/utils.js');

const newBtn = document.querySelector('#newBtn');
const transitionTable = document.querySelector('#transitionTable');

const table = new Tabulator(transitionTable, {
  data: formatDataForTable(tableData),
  layout: 'fitColumns',
  responsiveLayout: 'hide',
  addRowPos: 'bottom',
  history: true,
  columns: [
    {
      title: 'State',
      field: 'state',
      editor: true,
    },
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
    {
      title: 'Action',
      field: 'action',
      cellClick: (_, cell) => {
        cell._cell.row.delete();
      },
      cssClass: 'delete',
    },
  ],
});

newBtn.addEventListener('click', () => {
  table
    .addRow({
      state: '--',
      inputSymbol: '--',
      nextState: '--',
      action: 'Delete',
    })
    .catch(() => {
      alert('An error occured while adding a new row');
    });
  transitionTable.scrollTop = transitionTable.scrollHeight;
});
