// Custom cursor
inputBox.focus();
const cursor = document.querySelectorAll(".cursor");
let big_cursor = document.querySelector(".big");
let small_cursor = document.querySelector(".small");

const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
  document.documentElement.addEventListener("mousemove", (event) => {
    if (hasPointerCursor(event.target)) {
      big_cursor.classList.add("mouse-down");
      small_cursor.classList.add("mouse-down");
    } else {
      if (big_cursor.classList.contains("mouse-down")) {
        big_cursor.classList.remove("mouse-down");
        small_cursor.classList.remove("mouse-down");
      }
    }
    // cursor.forEach((item) => (item.style.opacity = hasPointerCursor(event.target)?0:1));

    big_cursor.style.top = event.clientY + window.scrollY + "px";
    big_cursor.style.left = event.clientX + window.scrollX + "px";

    setTimeout(() => {
      small_cursor.style.top = event.clientY + window.scrollY + "px";
      small_cursor.style.left = event.clientX + window.scrollX + "px";
    }, 150);
  });

  document.documentElement.addEventListener("mouseleave", () => {
    cursor.forEach((item) => (item.style.opacity = 0));
  });
  document.documentElement.addEventListener("mouseenter", () => {
    cursor.forEach((item) => (item.style.opacity = 1));
  });
} else {
  document.body.style.cursor = "auto";
}

document.body.addEventListener("mousedown", () => {
  big_cursor.classList.add("mouse-down");
});
document.body.addEventListener("mouseup", () => {
  big_cursor.classList.remove("mouse-down");
});

function hasPointerCursor(element) {
  while (element) {
    if (getComputedStyle(element).cursor === "pointer") {
      return true;
    }

    element = element.parentElement;
  }
  return false;
}
// code implementation in different languages
const languageSelector = document.querySelector(".language-selector");
const codeContainer = document.querySelector("#code-display");
const copyButton = document.querySelector(".language-copy-button");

document.addEventListener("DOMContentLoaded", function () {
  document.querySelector('button[data-language="c"]').click();

  if (window.innerWidth < 768) {
    document.querySelector('button[data-language="javascript"]').textContent =
      "js";
  }
  const date = new Date();
  document.getElementById("year").textContent = date.getFullYear();
});

languageSelector.addEventListener("click", (event) => {
  const selectedLanguage = event.target.dataset.language;
  codeContainer.style.display = "block";
  codeContainer.textContent = codeSnippets[selectedLanguage];

  codeContainer.style.animation = "none";
  codeContainer.offsetHeight;
  codeContainer.style.animation = "fadeInTopToBottom 1s forwards";
});

copyButton.addEventListener("click", () => {
  navigator.clipboard.writeText(codeContainer.textContent);
  copyButton.textContent = "Copied!";
  setTimeout(() => {
    copyButton.textContent = "Copy";
  }, 5000);
});

// for show hide of how to
let items = document.getElementsByClassName("howto");
let showButtons = document.getElementsByClassName("show");
let hideButtons = document.getElementsByClassName("hide");

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("click", () => {
    const ansSection = items[i].querySelector(".ans");
    const isActive = items[i].classList.toggle("active");

    if (isActive) {
      // Measure the full height needed for the answer section
      ansSection.style.maxHeight = ansSection.scrollHeight + "px";
      showButtons[i].style.display = "none";
      hideButtons[i].style.display = "block";
    } else {
      // Reset the max-height to 0 to collapse
      ansSection.style.maxHeight = 0;
      showButtons[i].style.display = "block";
      hideButtons[i].style.display = "none";
    }
  });
}

// yaha tak

const navigation = document.querySelector(".nav-links");
const container = document.querySelector(".container");

// navigationLeftReset();
// function navigationLeftReset() {
//   const containerRect = container.getBoundingClientRect();
//   const containerLeft = containerRect.left;
//   navigation.style.marginLeft = `${containerLeft}px`;
// }
// window.addEventListener("resize", navigationLeftReset);

// Custom right click context menu
const contextMenu = document.getElementById("context-menu");

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  contextMenu.style.display = "block";

  const x = event.clientX;
  const y = event.clientY;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const scrollX = window.scrollX;
  const menuWidth = contextMenu.offsetWidth;
  const menuHeight = contextMenu.offsetHeight;

  let left = x + scrollX;
  let top = y + scrollY;

  if (left + menuWidth > windowWidth + scrollX) {
    left = windowWidth + scrollX - menuWidth;
  }
  if (top + menuHeight > windowHeight + scrollY) {
    top = windowHeight + scrollY - menuHeight;
  }

  contextMenu.style.left = left + "px";
  contextMenu.style.top = top + "px";

  const submenus = contextMenu.querySelectorAll(".submenu");
  submenus.forEach((submenu) => {
    const parentLi = submenu.parentElement;
    parentLeft = parentLi.getBoundingClientRect();
    submenu.style.top = parentLi.offsetTop + "px";

    parentLi.addEventListener("mouseenter", () => {
      submenu.style.display = "flex";

      const submenuWidth = submenu.offsetWidth;

      if (parentLeft.right + submenuWidth > windowWidth + scrollX) {
        submenu.style.left = menuWidth - 2 * submenuWidth - 20 + "px";
      } else {
        submenu.style.left = menuWidth - 2 + "px";
      }
    });

    parentLi.addEventListener("mouseleave", () => {
      submenu.style.display = "none";
    });
  });
});

document.addEventListener("click", () => {
  contextMenu.style.display = "none";
});

// end context menu

const navbar = document.querySelector("nav");
let prevScrollPos = window.scrollY;
window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.querySelector(".progress-bar").style.height = scrollPercent + "%";

  // for navbar show hide
  const currentScrollPos = window.scrollY;
  if (window.innerWidth > 768) {
    if (prevScrollPos > currentScrollPos) {
      navbar.classList.remove("scrolled");
    } else {
      navbar.classList.add("scrolled");
    }
  }

  prevScrollPos = currentScrollPos;
});
// back to top
const backToTopBtn = document.getElementById("backToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    backToTopBtn.style.display = "flex";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Animation on scroll
const animatedElements = document.querySelectorAll(".scroll-animate");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-content");
      }
      //else {
      //   entry.target.classList.remove("show");
      // }
    });
  },
  {
    threshold: 0.5,
  }
);

animatedElements.forEach((element) => observer.observe(element));
// this much for observer

function copyToClipboard(button) {
  const codeBlock = button.nextElementSibling.querySelector("code");

  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = codeBlock.innerText;

  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextarea);

  button.textContent = "Copied!";
  setTimeout(() => {
    button.textContent = "Copy";
  }, 2000);
}
function sleep(ms) {
  if (ms > 0) return new Promise((resolve) => setTimeout(resolve, ms));
  else return;
}
fastBtn.addEventListener("click", () => {
  fastBtnFs += 1;
  fastBtn.style.fontSize = fastBtnFs + "px";
  if (ms <= 5) {
    fastBtn.style.fontSize = "16px";
  }
  ms = ms > 5 ? Math.abs(ms - 199) : (ms = 5);
  ms <= 5 ? (fastBtn.style.display = "none") : 1;
});
skipBtn.addEventListener("click", () => {
  ms = 0;
  displayBtn("none");
});
function displayBtn(dis) {
  fastBtn.style.display = dis;
  skipBtn.style.display = dis;
  fastBtn.style.fontSize = "1rem";
  fastBtnFs = 16;
}
inputBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter" && sortBtn.textContent === "Sort") sortBtn.click();
});
//Nav toggle
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
  document.querySelector(".menu-toggle").classList.toggle("active");

  if (navLinks.classList.contains("active")) {
    setTimeout(() => {
      document.addEventListener("click", handleOutsideClick);
    }, 1000);
  } else {
    document.removeEventListener("click", handleOutsideClick);
  }
}

function handleOutsideClick(event) {
  const navLinks = document.querySelector(".nav-links");
  const menuToggle = document.querySelector(".menu-toggle");

  if (!navLinks.contains(event.target)) {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");

    document.removeEventListener("click", handleOutsideClick);
  }
}

function randomGenerate() {
  if (sortBtn.textContent == "Sorting...") return;
  const random = Math.floor(Math.random() * 10) + 5;
  let randomNums = [];
  for (let i = 0; i < random; i++) {
    let rand = Math.floor(Math.random() * 100);
    randomNums.push(rand);
  }
  inputBox.value = randomNums.join(",");
}
