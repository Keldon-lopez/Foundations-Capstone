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
    let ticketArr = res.data;
    ticketArr.sort(function(a, b){return a.ticket_id - b.ticket_id});
    ticketArr.forEach((elem) => {
      let { ticket_id, priority, username, type, status, description } = elem;
      let ticketRow = document.createElement("tr");
      ticketRow.innerHTML = `
        <td>${ticket_id}</td>
        <td><select class = "${ticket_id} priority ticketSelectors" id= "priority${ticket_id}"><option>1</option><option>2</option><option>3</option></select></td>
        <td>${username}</td>
        <td><select class = "${ticket_id} type ticketSelectors" id= "type${ticket_id}"><option>Computer</option><option>Internet</option><option>Application</option></select></td>
        <td><select class = "${ticket_id} status ticketSelectors" id= "status${ticket_id}"><option>open</option><option>closed</option></select></td>
        <td>${description}</td>
        `;
      ticketBody.appendChild(ticketRow);
      document.querySelector(`#priority${ticket_id}`).value = `${priority}`;
      document.querySelector(`#type${ticket_id}`).value = `${type}`;
      document.querySelector(`#status${ticket_id}`).value = `${status}`;
      
    });
    let ticketSelectors = document.querySelectorAll(`.ticketSelectors`);
    ticketSelectors.forEach(valueSelect => {valueSelect.addEventListener("change", updateValue)});
  });
};

const createTicket = (e) => {
  e.preventDefault();

  let body = {
    username: ticketCreator,
    priority: +e.target[0].value,
    type: e.target[1].value,
    description: e.target[2].value,
  };

  axios.post(`${baseURL}tickets/`, body).then(() => {
    
    document.querySelector(`#ticketDescription`).value = ``;
    document.querySelector(`#prioritySelect`).selectedIndex  = 0;
    document.querySelector(`#issueTypeSelect`).selectedIndex  = 0;
    getTickets();
  });
};

const updateValue = (e) => {
  console.log(e)
  console.log("ticketID", e.target.classList[0])
  console.log("newValue",e.target.value)
  console.log("valueUpdated", e.target.classList[1])
  let body = {
    ticket_id: e.target.classList[0],
    value: e.target.value,
    valueUpdated: e.target.classList[1]
  }
  axios.put(`${baseURL}tickets/`, body).then(() => {getTickets()});
}

loginForm.addEventListener("submit", signIn);
