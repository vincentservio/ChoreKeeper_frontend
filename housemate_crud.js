const BASE_URL = "https://chorekeeper-api.herokuapp.com/";

window.addEventListener("load", () => {
  getNames();
});

// const getNancys = () => {
//   clearUls();
//   clearForm();
//   fetch(BASE_URL + "/housemates")
//     .then((resp) => resp.json())
//     .then((housemates) => {
//       housemates
//         .filter((mate) => mate.name[0] === "N")
//         .forEach((housemate) => {
//           let hm = new Housemate(housemate);
//           main.innerHTML += hm.renderNames();
//           attachClickLinks();
//           document
//             .querySelectorAll("li a")
//             .forEach((name) => name.addEventListener("click", displayChores));
//         });
//     });
// };

const getNames = () => {
  clearUls();
  clearForm();

  const loadNames = `<img class="image" src="https://previews.dropbox.com/p/thumb/ABECc8H53DdOZRyDOQv4oiPIWZ0RCHJZI7kYsw_yYPrPjw3uPnzFtWB9JxegUclKgIqfkatN22OiP29jLSkTU8wA9-51N6qsW0NMoSiF3BrMFaUZHZPetcpJOVSqvgEXUsoF9jzKm0_oMcWmtGbfTuJX-Qs6PzP4sHF3yL82wRzPCb97Mj3_uMaNrAMVH6yuo66sn_T3e40T7kkP6xKCR_63eWGNhg77hlMuSbBMWjnfU0C5q6dkiPDfGMNeRMB9JVXwo2fQtGGUtc51amPp7A_rRyxMJbs6MjA7xOU0u48Lxh5XmB0_Erp20r3J2Yn83l8AhJry2AJZ5X_ESqcBK_ooVDSGYQ2t20n30Ci_qXPqwLKgesiu754oRTAyhJLIhjo/p.png?fv_content=true&size_mode=5"  alt="load" ><img/>`;
  main.innerHTML = loadNames;

  // const fetchApi = () => {
  fetch(BASE_URL + "/housemates")
    .then((resp) => resp.json())
    .then((housemates) => {
      housemates
        .sort((a, b) => (a.name > b.name ? 1 : -1))
        .forEach((housemate) => {
          let hm = new Housemate(housemate);
          main.innerHTML = hm.renderNames();
          attachClickLinks();
          document
            .querySelectorAll("li a")
            .forEach((name) => name.addEventListener("click", displayChores));
        });
    });
  // };

  attachClickLinks();
};

const displayNameForm = () => {
  clearForm();
  attachClickLinks();
  let cardFormDiv = document.getElementById("name-form");
  let html = `
        <form>
            <input type="text" id="name" placeholder="John Doe">
            <br> 
            <input type="submit" value ="Add Name"> 
         </form>
    `;
  cardFormDiv.innerHTML += html;
  document.querySelector("form").addEventListener("submit", () => {
    createName();
    clearForm();
  });
};

const createName = () => {
  attachClickLinks();
  event.preventDefault();
  const housemate = {
    name: document.getElementById("name").value,
  };
  fetch(BASE_URL + "/housemates", {
    //\/config object\/       DO NOT APPLY TO GET BECAUSE GET IS ASSUMED
    method: "POST",
    body: JSON.stringify(housemate),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((name) => {
      let hm = new Housemate(name);
      document.querySelector("#main").innerHTML += hm.renderNames();
      getNames();
    });
};

const removeName = () => {
  clearForm();
  fetch(BASE_URL + `/housemates/${event.target.dataset.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  }).then(event.target.parentElement.remove());
};

const editName = () => {
  event.preventDefault();
  clearForm();
  let formDiv = document.getElementById("name-form");
  let id = event.target.dataset.id;
  fetch(BASE_URL + `/housemates/${id}`)
    .then((resp) => resp.json())
    .then((housemate) => {
      let html = `
            <form data-id="${id}" class="g">
                <label>Create</label>
                <input type="text" id="name" value='${housemate.name}'>
                <input type="submit"> 
            </form>
        `;
      formDiv.innerHTML = html;
      formDiv.addEventListener("submit", () => {
        updateName();
      });
    });
};

const updateName = () => {
  event.preventDefault();
  let id = event.target.dataset.id;
  const housemate = {
    name: document.getElementById("name").value,
  };
  fetch(BASE_URL + `/housemates/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "aaplication/json",
    },
    body: JSON.stringify(housemate),
  })
    .then((resp) => resp.json())
    .then((housemate) => {
      document.querySelector(
        `li a[data-id="${id}"]`
      ).parentElement.innerHTML = `
            <a href="#" data-id="${housemate.id}">${housemate.name}</a>
            <br>
            <button id = "delete" data-id="${housemate.id}">Delete</button>
            <button id = "edit" data-id="${housemate.id}"> Edit </button>
            <button id="addChore" data-id="${housemate.id}">Add Chore</button>
        `;
      attachClickLinks();
      clearForm();
    });
};

class Housemate {
  static all = [];
  constructor(housemate) {
    this.id = housemate.id;
    this.name = housemate.name;
    this.chores = housemate.chores;
    Housemate.all.push(this);
  }

  renderNames() {
    return `
            <li >
                <a href="#" data-id="${this.id}" class="g">${this.name}</a>
                </br>
                <button id = "delete" data-id="${this.id}">Delete</button>
                <button id = "edit" data-id="${this.id}"> Edit </button>
                <button id = "addChore" data-id="${this.id}"> Add Chore </button>
            </li>
            </br>
        `;
  }
}
