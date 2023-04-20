const baseURL = "http://localhost:4444/api"

const body = document.querySelector('body')
const login = document.querySelector('#Login')
const usernameInput = document.querySelector('#usernameInput')
const loginForm = document.querySelector('#loginForm')

const getTickets = () => axios.get(`${baseURL}/tickets/`).then(createTable);

const signIn = (e) => {
    e.preventDefault();

    

    let usernameIcon = document.createElement("div");
    let ticketingInterface = document.createElement("div");
    ticketingInterface.classList.add("ticketingInterface")
    usernameIcon.classList.add("usernameIcon");
    usernameIcon.innerHTML = `
    <p class = "usernameText"> Welcome, ${e.target[0].value} </p>
    `;
    login.innerHTML = ''
    login.appendChild(usernameIcon);
    body.appendChild(ticketingInterface);

    getTickets();
};

const createTable = (res) => {
    // this does a thing
}


loginForm.addEventListener("submit", signIn)