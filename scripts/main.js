function search() {
  const container = document.querySelector(".destinations-container");
  container.innerHTML = '<div class="spinner"></div>';
  spinner;

  setTimeout(() => {
    const destination = document.getElementById("destination").value.toLowerCase();
    const budget = Number(document.getElementById("budget").value);

    const filteredDestinations = destinations.filter((dest) => {
      const withinBudget = !budget || dest.price <= budget;
      const matchesDestination =
        destination === "" || dest.name.toLowerCase().includes(destination);
      return withinBudget && matchesDestination;
    });

    container.innerHTML = "";
    if (filteredDestinations.length > 0) {
      filteredDestinations.forEach((dest) => {
        const card = `
            <div class="destination-card">
              <img src="assets/images/${dest.image}" alt="${dest.name}">
              <h4>${dest.name}</h4>
              <p>${dest.description}</p>
              <button>Book Now for $${dest.price}</button>
            </div>
          `;
        container.innerHTML += card;
      });
    } else {
      container.innerHTML = "<p>No destinations match your search criteria.</p>";
    }
  }, 1000);
}

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;
  reveals.forEach((reveal) => {
    const revealTop = reveal.getBoundingClientRect().top;
    if (revealTop < windowHeight - 150) {
      reveal.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

const destinations = [
  {
    name: "Paris",
    price: 1200,
    image: "paris.jpg",
    description: "The city of lights awaits you!",
  },
  {
    name: "New York",
    price: 1500,
    image: "new-york.jpg",
    description: "Explore the city that never sleeps!",
  },
  {
    name: "Tokyo",
    price: 1400,
    image: "tokyo.jpg",
    description: "Discover the vibrant culture of Japan.",
  },
];

function renderDestinations() {
  const container = document.querySelector(".destinations-container");
  destinations.forEach((dest) => {
    const card = `
        <div class="destination-card">
          <img src="assets/images/${dest.image}" alt="${dest.name}">
          <h4>${dest.name}</h4>
          <p>${dest.description}</p>
          <button>Book Now for $${dest.price}</button>
        </div>
      `;
    container.innerHTML += card;
  });
}

document.addEventListener("DOMContentLoaded", renderDestinations);

let currentPage = 1;
const itemsPerPage = 3;

function renderPaginatedDestinations(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDestinations = destinations.slice(startIndex, endIndex);

  const container = document.querySelector(".destinations-container");
  container.innerHTML = "";

  paginatedDestinations.forEach((dest) => {
    const card = `
      <div class="destination-card">
        <img src="assets/images/${dest.image}" alt="${dest.name}" loading="lazy">
        <h4>${dest.name}</h4>
        <p>${dest.description}</p>
        <button>Book Now for $${dest.price}</button>
      </div>
    `;
    container.innerHTML += card;
  });

  updatePaginationControls();
}

function updatePaginationControls() {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";
  const totalPages = Math.ceil(destinations.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.className = i === currentPage ? "active" : "";
    button.addEventListener("click", () => {
      currentPage = i;
      renderPaginatedDestinations(currentPage);
    });
    pagination.appendChild(button);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderPaginatedDestinations(currentPage);
});

const darkModeToggle = document.getElementById("dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

const backToTop = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
