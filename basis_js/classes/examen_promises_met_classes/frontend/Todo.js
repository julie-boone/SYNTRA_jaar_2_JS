class Todo {
  constructor(name, in_progress) {
    this.states = {
      IN_PROGRESS: "in_progress",
      DONE: "done",
    };
    this.name = name;
    this.state = in_progress || this.states.IN_PROGRESS;
  }
  get() {
    return {
      name: this.name,
      state: this.state,
    };
  }
}

export default new Todo();
