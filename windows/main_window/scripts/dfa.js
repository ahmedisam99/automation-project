class DFA {
  constructor(machineObj) {
    const { states, initial, final } = machineObj;

    this.states = states;
    this.currentState = initial;
    this.finalStates = final;

    this.transition = this.transition.bind(this);
    this.validate = this.validate.bind(this);
    this.outputMsg = '';
  }

  transition(currentState, input) {
    this.currentState = this.states[currentState].on[input];
    if (!this.outputMsg)
      this.outputMsg += `${currentState}--${input} &rarr; ${this.currentState}`;
    else this.outputMsg += `--${input} &rarr; ${this.currentState}`;
  }

  validate(string = '') {
    if (!string) {
      this.outputMsg = `${this.currentState}`;
      if (this.finalStates.includes(this.currentState))
        this.outputMsg += `\n${this.currentState} is final &rArr; '${string}' is accepted`;
      else
        this.outputMsg += `\n${this.currentState} is not final &rArr; '${string}' is not accepted`;
      return;
    }

    string.split('').forEach(input => {
      this.transition(this.currentState, input);
    });

    if (this.finalStates.includes(this.currentState))
      this.outputMsg += `\n${this.currentState} is final &rArr; '${string}' is accepted`;
    else
      this.outputMsg += `\n${this.currentState} is not final &rArr; '${string}' is not accepted`;
  }
}
