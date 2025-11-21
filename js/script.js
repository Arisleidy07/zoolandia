

document.addEventListener("DOMContentLoaded", function () {

  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(31, 41, 55, 0.98)";
      navbar.style.padding = "0.5rem 0";
    } else {
      navbar.style.background = "rgba(31, 41, 55, 0.95)";
      navbar.style.padding = "1rem 0";
    }
  });


  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", function () {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    });
  }


  const counters = document.querySelectorAll(".counter");
  const speed = 200; 

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounter(counter), 1);
    } else {
      counter.innerText = target.toLocaleString();
    }
  };


  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          counter.innerText = "0";
          animateCounter(counter);
          counterObserver.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    counterObserver.observe(counter);
  });


  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;


      const successMessage = document.createElement("div");
      successMessage.className = "alert alert-success mt-3";
      successMessage.innerHTML = `<i class="bi bi-check-circle me-2"></i>¡Gracias por suscribirte! Te hemos enviado un correo a ${email}`;

      this.appendChild(successMessage);
      emailInput.value = "";

      // Remove message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    });
  }


  const filterButtons = document.querySelectorAll(".filter-buttons .btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {

      filterButtons.forEach((btn) => btn.classList.remove("active"));

      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        if (filterValue === "all") {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 10);
        } else {
          const category = item.getAttribute("data-category");
          if (category === filterValue) {
            item.style.display = "block";
            setTimeout(() => {
              item.style.opacity = "1";
              item.style.transform = "scale(1)";
            }, 10);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            setTimeout(() => {
              item.style.display = "none";
            }, 300);
          }
        }
      });
    });
  });


  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();


      const formData = new FormData(this);


      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Enviando...';
      submitBtn.disabled = true;

 
      setTimeout(() => {

        const formMessage = document.getElementById("formMessage");
        formMessage.classList.remove("d-none");


        this.reset();


        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;


        setTimeout(() => {
          formMessage.classList.add("d-none");
        }, 5000);
      }, 2000);
    });
  }


  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe all cards
  const cards = document.querySelectorAll(
    ".feature-card, .animal-card, .mission-card, .team-card, .gallery-card"
  );
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease";
    observer.observe(card);
  });

  // === Navbar Mobile Toggle ===
  const navbarToggler = document.querySelector(".navbar-toggler");
  if (navbarToggler) {
    navbarToggler.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  }


  const allCards = document.querySelectorAll(
    ".animal-card, .feature-card, .gallery-card"
  );
  allCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.zIndex = "10";
    });

    card.addEventListener("mouseleave", function () {
      this.style.zIndex = "1";
    });
  });


  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });


  const tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });


  const images = document.querySelectorAll(".animal-image, .gallery-img");
  images.forEach((img) => {
    img.style.opacity = "0";
    img.style.transition = "opacity 0.5s ease";

    setTimeout(() => {
      img.style.opacity = "1";
    }, 100);
  });


  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.5rem;
    `;

  document.body.appendChild(scrollToTopBtn);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = "flex";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  });

  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  scrollToTopBtn.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
  });

  scrollToTopBtn.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
  });


  console.log(
    "%cWelcome to Zoolandia! ",
    "color: #6366f1; font-size: 20px; font-weight: bold;"
  );
  console.log(
    "%cExplore the fascinating world of exotic animals!",
    "color: #8b5cf6; font-size: 14px;"
  );
});


const style = document.createElement("style");
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


fetch("footer.html")
  .then((response) => response.text())
  .then((data) => {
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) {
      footerPlaceholder.innerHTML = data;
    }
  })
  .catch((error) => console.error("Error cargando footer:", error));
