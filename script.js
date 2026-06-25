console.log("Привет! Скрипт подключен и работает.");
const dateSpan = document.getElementById("update-date");
const today = new Date();
dateSpan.textContent = today.toLocaleDateString("ru-RU");

const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

const burgerBtn = document.getElementById("burger-btn");
const nav = document.querySelector("nav");

burgerBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});
const toggleBtn = document.getElementById("toggle-btn");
const extraInfo = document.getElementById("extra-info");

toggleBtn.addEventListener("click", () => {
  extraInfo.classList.toggle("expanded");
  toggleBtn.textContent = extraInfo.classList.contains("expanded")
    ? "Скрыть"
    : "Показать больше";
});
const themeToggle = document.getElementById("theme-toggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  const isDark = document.body.classList.contains("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
}
const form = document.getElementById("contact-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");

  let isValid = true;

  if (nameInput.value.trim() === "") {
    nameError.textContent = "Введите имя";
    isValid = false;
  } else {
    nameError.textContent = "";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(emailInput.value.trim())) {
    emailError.textContent = "Введите корректный email";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  if (isValid) {
    alert("Форма заполнена верно! (отправка на сервер не настроена)");
    form.reset();
  }
});
const projects = [
  { id: 1, title: "Цветовой генератор настроения", category: "frontend", description: "Генератор случайных цветовых палитр." },
  { id: 2, title: "Калькулятор эстетики", category: "design", description: "На экране два подвижных ползунка (ширина и высота). Под ними динамически меняется прямоугольный блок." },
  { id: 3, title: "Кнопка-хамелион", category: "design", description: "Одна большая кнопка по центру экрана. При нажатии она меняет не только цвет, но и форму, размер шрифта и тень." },
  { id: 4, title: "Шрэк - оценка дизайна", category: "meme", description: "Большой портрет Шрэка. Под ним - 5 звёзд. При нажатии на звёзды меняется лицо Шрэка." },
  { id: 5, title: "Кот-булочка", category: "meme", description: "На белом фоне - крупный кот, свернутый калачиком. Вокруг него плавают кружочки с надписями теплота, убт, сон." }
  // ещё минимум 3 объекта
];
function createCard(project) {
  return `
    <article class="project-card" data-category="${project.category}">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
    </article>
  `;
}

function renderProjects(list) {
  const container = document.getElementById("projects-grid");
  container.innerHTML = list.map(createCard).join("");
}

renderProjects(projects);

const filterButtons = document.querySelectorAll(".filters button");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    const filtered = filter === "all"
      ? projects
      : projects.filter(p => p.category === filter);

    renderProjects(filtered);
  });
});
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(query)
  );
  renderProjects(filtered);
});
