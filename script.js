const form = document.querySelector(".form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const submitButton = document.getElementById(".button");
const errorMsg = document.querySelectorAll(".errorMsg");

// Form Validation

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateForm();
});

// Function to display error message.
function errorMessage(element, errMessage) {
  const inputParent = element.parentElement;
  const errorDisplay = inputParent.querySelector(".errorMsg");
  errorDisplay.textContent = errMessage;
  errorDisplay.style.color = "red";
  errorDisplay.style.fontSize = `${0.8}rem`;
}

// Function to remove error message

function successMessage(element) {
  const inputParent = element.parentElement;
  const errorDisplay = inputParent.querySelector(".errorMsg");
  errorDisplay.textContent = "";
}

// Function to check validity of email.
function isValidEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Function which validates form.
function validateForm() {
  let hasError = false;

  if (username.value.trim() == "") {
    errorMessage(username, "Username is required.");
    username.classList.add("error");
    hasError = true;
  } else {
    username.classList.remove("error");
    successMessage(username);
  }

  if (email.value.trim() == "") {
    errorMessage(email, "Email is required.");
    email.classList.add("error");
    hasError = true;
  } else if (!isValidEmail(email.value)) {
    errorMessage(email, "Provide a valid email");
    email.classList.add("error");
    hasError = true;
  } else {
    email.classList.remove("error");
    successMessage(email);
  }

  if (message.value.trim() == "") {
    errorMessage(message, "Kindly type a message.");
    message.classList.add("error");
    hasError = true;
  } else {
    message.classList.remove("error");
    successMessage(message);
  }

  // Show an alert if form validates correctly
  if (!hasError) {
    email.classList.remove("error");
    message.classList.remove("error");
    username.classList.remove("error");
    successMessage(email);
    successMessage(username);
    successMessage(message);

    setTimeout(() => {
      alert("Form submitted successfully.");
      form.reset();
    }, 50);
  }
}

// Provide real time updates as user is typing.

username.addEventListener("input", () => {
  if (username.value.trim() !== "") {
    username.classList.remove("error");
    successMessage(username);
  }
});

email.addEventListener("input", () => {
  if (email.value.trim() !== "") {
    email.classList.remove("error");
    successMessage(email);
  }
});

message.addEventListener("input", () => {
  if (message.value.trim() !== "") {
    message.classList.remove("error");
    successMessage(message);
  }
});

// Function for the tabs.
const tabs = document.querySelectorAll("[data-tab-target]");
const tabContents = document.querySelectorAll("[data-tab-content]");
const arrayTabContents = [...tabContents];
const arrayTabs = [...tabs]


tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    tabContents.forEach((tabContent) => {
      tabContent.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });

    target.classList.add("active");
    tab.classList.add("active");
    console.log(target);

  });
});

// Change tabs when the letter 'n' is clicked

document.addEventListener("keydown", (e) => {
    if (e.key === "n") {
        const activeContent = document.querySelector("[data-tab-content].active");
        
        const currentIndex = arrayTabContents.indexOf(activeContent);
        const nextIndex = (currentIndex + 1) % arrayTabContents.length;
        
        const nextContent = arrayTabContents[nextIndex];
        const nextTab = arrayTabs[nextIndex];
        
        arrayTabContents.forEach(tabContent => {
            tabContent.classList.remove("active");
        });

        arrayTabs.forEach(arrayTab => {
            arrayTab.classList.remove("active");
        });
        
        nextContent.classList.add("active");
        nextTab.classList.add("active");
    }
});


// Function for the accordion
const accordionItemHeaders = document.querySelectorAll(
  ".accordion-item-header"
);

accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener("click", () => {
    const currentlyActiveAccordionItemHeader = document.querySelector(
      ".accordion-item-header.active"
    );
    if (
      currentlyActiveAccordionItemHeader &&
      currentlyActiveAccordionItemHeader !== accordionItemHeader
    ) {
      currentlyActiveAccordionItemHeader.classList.toggle("active");
      currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    }

    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});
