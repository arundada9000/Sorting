let item = document.getElementsByClassName("howto");
let show = document.getElementsByClassName("show");
let hide = document.getElementsByClassName("hide");

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

window.addEventListener("scroll", function () {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.querySelector(".progress-bar").style.height = scrollPercent + "%";
});

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
