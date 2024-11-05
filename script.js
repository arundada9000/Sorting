let item = document.getElementsByClassName("howto");
let show = document.getElementsByClassName("show");
let hide = document.getElementsByClassName("hide");
let fastBtnFs = 16;

for (let i = 0; i < item.length; i++) {
  item[i].addEventListener("click", () => {
    let res = item[i].classList.toggle("active");
    if (res == true) {
      show[i].style.display = "none";
      hide[i].style.display = "block";
    } else {
      show[i].style.display = "block";
      hide[i].style.display = "none";
    }
  });
}

const navigation = document.querySelector(".nav-links1");
const container = document.querySelector(".container");
const containerRect = container.getBoundingClientRect();
const containerLeft = containerRect.left;

navigation.style.marginLeft = `${containerLeft}px`;
const navbar = document.querySelector("nav");
let prevScrollPos = window.pageYOffset;
window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.querySelector(".progress-bar").style.height = scrollPercent + "%";

  // for navbar show hide
  const currentScrollPos = window.pageYOffset;
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
  if (window.pageYOffset > 100) {
    backToTopBtn.style.display = "block";
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

// Observe each animated element
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
}
function randomGenerate() {
  if (sortBtn.textContent == "Sorting...") return;
  const random = Math.floor(Math.random() * 10) + 5;
  let randomNums = [];
  for (let i = 0; i < random; i++) {
    let rand = Math.floor(Math.random() * 100);
    randomNums.push(rand);
  }
  console.log(...randomNums);
  inputBox.value = randomNums.join(",");
}
