const form = document.querySelector('#form');
const initialStateInput = document.querySelector('#initialState');
const finalStateInput = document.querySelector('#finalState');
const inputStringInput = document.querySelector('#inputString');
const outputTextarea = document.querySelector('#outputTextarea');
const errorSpan = document.querySelector('.form > .danger');

const validateInputs = ({ initialState, finalState, inputString }) =>
  new Promise((resolve, reject) => {
    if (!initialState) reject('Initial state is required');
    else if (!finalState) reject('Final state is required');
    else resolve();
  });

const buildDfaAndValidate = ({ initialState, finalState, inputString }) => {
  const tableData = table.getData();

  const dfaMachineObj = {
    initial: initialState,
    final: [finalState],
    states: {},
  };

  tableData.forEach(({ state, inputSymbol, nextState }) => {
    if (!dfaMachineObj.states[state]) dfaMachineObj.states[state] = { on: {} };
    dfaMachineObj.states[state].on[inputSymbol] = nextState;
  });

  const dfa = new DFA(dfaMachineObj);
  dfa.validate(inputString);
  outputTextarea.innerHTML = dfa.outputMsg;
};

form.addEventListener('submit', e => {
  e.preventDefault();

  const initialState = initialStateInput.value,
    finalState = finalStateInput.value,
    inputString = inputStringInput.value;

  validateInputs({ initialState, finalState, inputString })
    .then(() => {
      errorSpan.innerText = '';
      buildDfaAndValidate({ initialState, finalState, inputString });
    })
    .catch(reason => (errorSpan.innerText = reason));
});
