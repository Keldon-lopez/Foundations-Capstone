const baseURL = "http://localhost:4444/";

const body = document.querySelector("body");
const login = document.querySelector("#Login");
const usernameInput = document.querySelector("#usernameInput");
const loginForm = document.querySelector("#loginForm");
const main = document.querySelector("main");

let ticketCreator = "";

const signIn = (e) => {
  e.preventDefault();
  ticketCreator = e.target[0].value;

  if (e.target[0].value === "") {
    return;
  } else {
    let body = {username: ticketCreator}
    axios.post(`${baseURL}users`, body).then(() => {});

    let usernameIcon = document.createElement("div");
    let ticketingInterface = document.createElement("div");
    ticketingInterface.classList.add("ticketingInterface");
    ticketingInterface.innerHTML = `<div id="ticketingInterface">
        <div id="ticketFormContainer">
            <form id="ticketSubmissionForm">
                <div id="selectors">
                    <select id="prioritySelect">
                        <option>Select Priority</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                    <select id="issueTypeSelect">
                        <option>Select Issue</option>
                        <option value="Computer">Computer</option>
                        <option value="Internet">Internet</option>
                        <option value="Application">Application</option>
                    </select>
                </div>
                <br>
                <textarea
                type="text"
                id="ticketDescription"
                placeholder="Enter Description of your problem"
                ></textarea>
                <br>
                <div id="ticketSubmitButtonContainer">
                    <button>Submit</button>
                </div>
            </form>
            </div>
            <div id="ticketListContainer"></div>
         </div>`;
    main.appendChild(ticketingInterface);

    usernameIcon.classList.add("usernameIcon");
    usernameIcon.innerHTML = `
        <p class = "usernameText"> Welcome, ${e.target[0].value} </p>
        `;
    login.innerHTML = "";
    login.appendChild(usernameIcon);

    const ticketSubmissionForm = document.querySelector(
      "#ticketSubmissionForm"
    );
    ticketSubmissionForm.addEventListener("submit", createTicket);

    getTickets();
  }
};

const getTickets = () => {
  const ticketListContainer = document.querySelector("#ticketListContainer");
  ticketListContainer.innerHTML = `
  <table id="ticketTable">
                        <thead>
                            <tr>
                                <th id="ticketNum">Ticket #</th>
                                <th id="priority">Priority</th>
                                <th id="createdBy">Created By</th>
                                <th id="issueType">Issue Type</th>
                                <th id="status">Status</th>
                                <th id="description">Ticket Description</th>
                            </tr>
                        </thead>
                        <tbody id="ticketBody">
                        </tbody>
  `;
  const ticketBody = document.querySelector("#ticketBody");

  axios.get(`${baseURL}tickets/`).then((res) => {
    ticketBody.innerHTML = "";
    res.data.forEach((elem) => {
      console.log(elem);
      let { ticket_id, priority, username, type, status, description } = elem;
      let ticketRow = document.createElement("tr");
      ticketRow.innerHTML = `
        <td>${ticket_id}</td>
        <td>${priority}</td>
        <td>${username}</td>
        <td>${type}</td>
        <td>${status}</td>
        <td>${description}</td>
        `;
      ticketBody.appendChild(ticketRow);
    });
  });
};

const createTicket = (e) => {
  e.preventDefault();
  console.log("User", ticketCreator);
  console.log("Priority", e.target[0].value);
  console.log("Issue Type", e.target[1].value);
  console.log("description", e.target[2].value);

  let body = {
    username: ticketCreator,
    priority: +e.target[0].value,
    type: e.target[1].value,
    description: e.target[2].value,
  };

  axios.post(`${baseURL}tickets/`, body).then(() => {
    getTickets();
  });
};

loginForm.addEventListener("submit", signIn);
