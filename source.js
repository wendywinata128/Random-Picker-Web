//animation and choose type

let buttonType = document.querySelectorAll(".type");
let content = document.querySelector(".types");
let logo = document.querySelector(".fa-optin-monster");

buttonType.forEach((item, index) => {
  item.addEventListener("click", () => {
    removeSelectedType();
    item.classList.add("select");
    content.classList.add("select");

    if (logo.classList.contains("select")) {
      logo.classList.remove("select");
    } else {
      logo.classList.add("select");
    }
    showContent(index);
  });
});

const removeSelectedType = () => {
  buttonType.forEach((item) => {
    item.classList.remove("select");
  });
};

const showContent = (index) => {
  let content = document.querySelectorAll(".content");
  let tags = document.querySelector(".tags");

  if (index == 0) {
    content[index].style.height = "300px";
    content[index + 1].style.height = "0";
    tags.style.maxHeight = "1000px";
    tags.style.opacity = "1";
  } else {
    content[index].style.height = "250px";
    content[index - 1].style.height = "0";
    tags.style.maxHeight = "0";
    tags.style.opacity = "0";
  }
};

//random choice
let inputChoice = document.querySelector("textarea");
let tags = document.querySelector(".tags");

inputChoice.addEventListener("keyup", (event) => {
  let keyword = event.target.value;
  let arrayKeyword = keyword.split(",").filter((item) => item.trim());
  tags.innerHTML = "";

  arrayKeyword.forEach((key) => {
    let span = document.createElement("span");
    span.innerText = key;
    tags.appendChild(span);
  });

  if (event.key === "Enter") {
    startRandomChoice();

    inputChoice.value = inputChoice.value.replace(/\n/g, "");
  }
});

function startRandomChoice() {
  let tag = document.querySelectorAll(".tags span");
  let intervalNumber = 1;
  let intervalDelay = 100;

  const makeInterval = () => {
    let interval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * tag.length);
      intervalNumber += 1;

      tag[randomNumber].classList.add("highlight");

      setTimeout(() => {
        tag[randomNumber].classList.remove("highlight");
      }, 100);

      if (intervalNumber > 10 && intervalNumber % 10 == 0) {
        clearInterval(interval);
        intervalDelay += 100;
        makeInterval();
      }

      if (intervalNumber == 41) {
        clearInterval(interval);
        let randomNumber = Math.floor(Math.random() * tag.length);

        tag[randomNumber].classList.add("highlight");

        let winner = document.createElement("H3");

        winner.innerHTML = `The selected choice is ${tag[randomNumber].innerText}`;

        tags.appendChild(winner);
      }
    }, intervalDelay);
  };

  makeInterval();
}

//random number
let buttonRandomNumber = document.querySelector(".buttonRandomNumber");
let dialog = document.querySelector(".dialog");
let finalRandom = document.querySelector(".random-number");
let dialogClose = document.querySelector(".fa-window-close");

dialogClose.addEventListener("click", (_) => {
  dialog.classList.remove("active");
});

buttonRandomNumber.addEventListener("click", (_) => {
  let startNumber = +document.querySelector(".start").value;
  let endNumber = +document.querySelector(".end").value;

  if (startNumber > endNumber) {
    alert("Sorry, end number must higher than start number");
    return;
  }

  finalRandom.classList.add("animation");
  dialog.classList.add("active");

  const interval = setInterval(() => {
    let randomNumber =
      Math.floor(Math.random() * (endNumber - startNumber)) + startNumber;

    finalRandom.innerText = randomNumber;
    finalRandom.classList.add("animation");

    setTimeout(() => {
      finalRandom.classList.remove("animation");
    }, 200);
  }, 700);

  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      finalRandom.classList.add("animation");
    }, 700);
  }, 7000);
});

dialog.addEventListener("click", (event) => {
  if (event.target == dialog) {
    dialog.classList.remove("active");
  }
});
