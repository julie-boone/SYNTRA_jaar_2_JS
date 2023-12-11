class TodoClient {
  constructor() {
    this.apiUrl = "http://localhost:3000/todo";
  }

  get() {
    return fetch(this.apiUrl).then((response) => response.json());
  }

  create() {
    return fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
  }

  delete(id) {
    return fetch(`${this.apiUrl}/${id}`, {
      method: "DELETE",
    });
  }

  updateStatus(id, inProgress) {
    return fetch(`${this.apiUrl}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, state: inProgress }),
    });
  }
}

export default new TodoClient();
