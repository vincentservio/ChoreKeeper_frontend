function attachClickLinks() {
  document.getElementById("tableBtn").addEventListener("click", displayTable);
  document.getElementById("daytableBtn").addEventListener("click", getDays);
  document.getElementById("names").addEventListener("click", getNames);
  document
    .getElementById("nameForm")
    .addEventListener("click", displayNameForm);
  document
    .querySelectorAll("#delete")
    .forEach((name) => name.addEventListener("click", removeName));
  document
    .querySelectorAll("#deleteChore")
    .forEach((name) => name.addEventListener("click", removeChore));
  document
    .querySelectorAll("#edit")
    .forEach((name) => name.addEventListener("click", editName));
  document
    .querySelectorAll("#editChore")
    .forEach((name) => name.addEventListener("click", editChore));
  document
    .querySelectorAll("#addChore")
    .forEach((name) => name.addEventListener("click", displayChoreForm));
}
// ^=================== CLEARFORM===============^
const clearForm = () => {
  let cardFormDiv = document.getElementById("name-form");
  cardFormDiv.innerHTML = "";
};

// <===================== CLEAR ULs ==============>
const clearUls = () => {
  //table included
  let main = document.querySelector("#main");
  main.innerHTML = "";
  document.querySelector("table").innerHTML = "";
};
