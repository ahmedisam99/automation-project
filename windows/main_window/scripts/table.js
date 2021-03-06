const { ipcRenderer } = require('electron');
const Tabulator = require('tabulator-tables');
const { formatDataForTable } = require('./scripts/utils.js');

const newBtn = document.querySelector('#newBtn');
const saveBtn = document.querySelector('#saveBtn');
const loadBtn = document.querySelector('#loadBtn');
const transitionTable = document.querySelector('#transitionTable');

const tablePlaceholder = `
<div class="no-data-container">
  No data available
  <img src="../../assets/no_data.png" class="no-data-img"/>
</div>`;

var table = new Tabulator(transitionTable, {
  layout: 'fitColumns',
  responsiveLayout: 'hide',
  addRowPos: 'bottom',
  headerSort: false,
  resizableColumns: false,
  placeholder: tablePlaceholder,
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
      cssClass: 'danger',
      download: false,
    },
  ],
});

const addNewRow = () => {
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
};

const saveData = () => {
  table.download('xlsx', 'dfa.xlsx', { sheetName: 'automation-project' });
};

const loadData = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.xlsx';

  fileInput.addEventListener('change', e => {
    const file = e.target.files[0];
    const errorMsg =
      'Invalid excel sheet!\nPlease use an excel sheet exported via this application';

    const reader = new FileReader();
    reader.onload = ({ target: { result } }) => {
      const sheet = XLSX.read(new Uint8Array(result), {
        type: 'array',
      }).Sheets['automation-project'];

      const data = XLSX.utils.sheet_to_json(sheet);
      if (typeof data !== 'object' || (data && !data.length))
        return alert(errorMsg);

      table.setData(formatDataForTable(data));
    };
    reader.onerror = () => alert(errorMsg);
    reader.readAsArrayBuffer(file);
  });

  fileInput.click();
};

newBtn.addEventListener('click', addNewRow);
saveBtn.addEventListener('click', saveData);
loadBtn.addEventListener('click', loadData);

ipcRenderer.on('new', addNewRow);
ipcRenderer.on('save', saveData);
ipcRenderer.on('load', loadData);
