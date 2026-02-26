/**
 * interactions.js
 * All interactive behavior: sidebar toggle, modals, filters, nav, form handling.
 * Must be called AFTER the DOM has been populated by renderer.js.
 */

/**
 * Initialize all interactive behavior.
 * @param {Map} projectDataMap - Map of project title -> {title, tech, description, link}
 */
export function initInteractions(projectDataMap) {
  initSidebarToggle();
  initTestimonialsModal();
  initPortfolioFilter();
  initProjectModal(projectDataMap);
  initContactForm();
  initPageNavigation();
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

function elementToggleFunc(elem) {
  elem.classList.toggle("active");
}

// ---------------------------------------------------------------------------
// Sidebar Toggle (mobile)
// ---------------------------------------------------------------------------

function initSidebarToggle() {
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// ---------------------------------------------------------------------------
// Testimonials Modal
// ---------------------------------------------------------------------------

function initTestimonialsModal() {
  const testimonialsItems = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");

  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  function testimonialsModalFunc() {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  for (let i = 0; i < testimonialsItems.length; i++) {
    testimonialsItems[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    });
  }

  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

// ---------------------------------------------------------------------------
// Portfolio Filter
// ---------------------------------------------------------------------------

function initPortfolioFilter() {
  // Custom select (mobile dropdown)
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");

  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });

  // Filter items
  const filterItems = document.querySelectorAll("[data-filter-item]");

  function filterFunc(selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "all") {
        filterItems[i].classList.add("active");
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }

  // Mobile select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }

  // Desktop filter buttons
  let lastClickedBtn = filterBtn[0];

  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// ---------------------------------------------------------------------------
// Project Modal
// ---------------------------------------------------------------------------

function initProjectModal(projectDataMap) {
  const projectItems = document.querySelectorAll("[data-project-item]");
  const projectModalContainer = document.querySelector("[data-project-modal-container]");
  const projectModalCloseBtn = document.querySelector("[data-project-modal-close-btn]");
  const projectOverlay = document.querySelector("[data-project-overlay]");

  const projectModalTitle = document.querySelector("[data-project-modal-title]");
  const projectModalTech = document.querySelector("[data-project-modal-tech]");
  const projectModalText = document.querySelector("[data-project-modal-text]");
  const projectModalLink = document.querySelector("[data-project-modal-link]");

  function projectModalFunc() {
    projectModalContainer.classList.toggle("active");
    projectOverlay.classList.toggle("active");
  }

  for (let i = 0; i < projectItems.length; i++) {
    projectItems[i].addEventListener("click", function (e) {
      e.preventDefault();

      const projectTitle = this.querySelector(".project-title").innerHTML;
      const project = projectDataMap.get(projectTitle);

      if (project) {
        projectModalTitle.innerHTML = project.title;
        projectModalTech.innerHTML = project.tech;
        projectModalText.innerHTML = `<p>${project.description}</p>`;
        projectModalLink.href = project.link;

        // Hide link if it's just a placeholder
        if (project.link === "#") {
          projectModalLink.style.display = "none";
        } else {
          projectModalLink.style.display = "flex";
        }

        projectModalFunc();
      }
    });
  }

  projectModalCloseBtn.addEventListener("click", projectModalFunc);
  projectOverlay.addEventListener("click", projectModalFunc);
}

// ---------------------------------------------------------------------------
// Contact Form
// ---------------------------------------------------------------------------

function initContactForm() {
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");
  const formSuccess = document.querySelector("[data-form-success]");
  const formError = document.querySelector("[data-form-error]");

  // Real-time validation
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }

  // Form submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Show loading state
    formBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon><span>Sending...</span>';
    formBtn.setAttribute("disabled", "");

    // Hide previous messages
    formSuccess.style.display = "none";
    formError.style.display = "none";

    try {
      const formData = new FormData(form);

      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success
        formSuccess.style.display = "block";
        form.reset();
        formBtn.innerHTML = '<ion-icon name="checkmark-outline"></ion-icon><span>Sent!</span>';

        // Reset button after 3 seconds
        setTimeout(() => {
          formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';
          formBtn.setAttribute("disabled", "");
        }, 3000);

      } else {
        throw new Error('Network response was not ok');
      }

    } catch (error) {
      // Error
      formError.style.display = "block";
      formBtn.innerHTML = '<ion-icon name="paper-plane"></ion-icon><span>Send Message</span>';

      // Re-enable button if form is valid
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      }
    }
  });
}

// ---------------------------------------------------------------------------
// Page Navigation
// ---------------------------------------------------------------------------

function initPageNavigation() {
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
      for (let i = 0; i < pages.length; i++) {
        if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
          pages[i].classList.add("active");
          navigationLinks[i].classList.add("active");
          window.scrollTo(0, 0);
        } else {
          pages[i].classList.remove("active");
          navigationLinks[i].classList.remove("active");
        }
      }
    });
  }
}
