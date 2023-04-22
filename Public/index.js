const baseURL = "http://localhost:4444/api";

const body = document.querySelector("body");
const login = document.querySelector("#Login");
const usernameInput = document.querySelector("#usernameInput");
const loginForm = document.querySelector("#loginForm");
const main = document.querySelector("main");

const getTickets = () => axios.get(`${baseURL}/tickets/`).then(createTable);

const signIn = (e) => {
  e.preventDefault();
  if (e.target[0].value === "") {
    return;
  } else {
    let usernameIcon = document.createElement("div");
    let ticketingInterface = document.createElement("div");
    ticketingInterface.classList.add("ticketingInterface");
    // ticketingInterface.innerHTML = `<div id="ticketingInterface">
    //     <div id="ticketFormContainer">
    //         <form id="ticketSubmissionForm">
    //             <div id="selectors">
    //                 <select placeholder="Select Priority">
    //                     <option>Select Priority</option>
    //                     <option value="1">1</option>
    //                     <option value="2">2</option>
    //                     <option value="3">3</option>
    //                 </select>
    //                 <select>
    //                     <option>Select Issue</option>
    //                     <option value="Computer">Computer</option>
    //                     <option value="Internet">Internet</option>
    //                     <option value="Application">Application</option>
    //                 </select>
    //             </div>
    //             <br>
    //             <textarea
    //             type="text"
    //             id="ticketDescription"
    //             placeholder="Enter Description of your problem"
    //             ></textarea>
    //             <br>
    //             <div id="ticketSubmitButtonContainer">
    //                 <button>Submit</button>
    //             </div>
    //         </form>
    //         </div>
    //         <div id="ticketListContainer"></div>
    //      </div>`;
    // main.appendChild(ticketingInterface);
    
    usernameIcon.classList.add("usernameIcon");
    usernameIcon.innerHTML = `
        <p class = "usernameText"> Welcome, ${e.target[0].value} </p>
        `;
    login.innerHTML = "";
    login.appendChild(usernameIcon);
    

    getTickets();
  }
};

const createTable = (res) => {
  // this does a thing
};

loginForm.addEventListener("submit", signIn);
