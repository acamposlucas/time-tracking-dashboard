const url = `../data.json`;
const buttons = document.querySelectorAll(".card__option");

const clearAll = () => {
  const tagTracker = document.querySelectorAll(".tag__tracker");

  tagTracker.forEach((activity) => activity.remove());
};

const activateClickedButton = (button) => {
  buttons.forEach((button) => button.classList.remove("active"));
  button.classList.add("active");
};

const renderCards = async (clickedOption) => {
  clearAll();
  trackerCards = document.querySelector(".tracker-cards");

  const data = await fetch(url);
  const dataJson = await data.json();
  console.log(dataJson);

  const calcTimeframe = (option) => {
    if (option === "daily") {
      return "Yesterday";
    } else if (option === "weekly") {
      return "Last Week";
    } else if (option === "monthly") {
      return "Last Month";
    }
  };

  dataJson.forEach((activity) => {
    const name = activity.title;
    const activityClass = name.toLowerCase().replace(" ", "-");
    const timeframeData = activity.timeframes[clickedOption];
    const previousTimeframe = calcTimeframe(clickedOption);
    const div = document.createElement("div");
    div.classList.add("tag__tracker", activityClass);
    const stringToInject = `
        <div class="tag__tracker__info">
        <header class="tag__tracker__header">
            <h2>${name}</h2>
            <button class="tag__tracker__options"></button>
        </header>
        <div class="tag__tracker__times">
            <h3 class="current__time">${timeframeData.current}</h3>
            <p>${previousTimeframe} - ${timeframeData.previous}hrs</p>
        </div>
    `;
    div.innerHTML = stringToInject;
    trackerCards.append(div);
  });
};

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    activateClickedButton(button);
    const clickedOption = button.dataset.option;
    renderCards(clickedOption);
  });
});

buttons[1].click();
