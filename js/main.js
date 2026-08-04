let topBtn = document.getElementById("topBtn");

window.onscroll = function () {
    if (topBtn) {
        if (document.documentElement.scrollTop > 200) {
            topBtn.style.display = "block";
        } else {
            topBtn.style.display = "none";
        }
    }
};

function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        preloader.style.display = "none";
    }
});

// ===============================
// HERO SLIDER
// ===============================

const slides = document.querySelectorAll(".slide");

if (slides.length > 0) {

    let current = 0;

    // Show first image
    slides[current].classList.add("active");

    setInterval(() => {

        slides[current].classList.remove("active");

        current++;

        if (current >= slides.length) {
            current = 0;
        }

        slides[current].classList.add("active");

    }, 5000);

}
// ===========================
// PROFESSIONAL MENU
// ===========================

const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const closeMenu = document.getElementById("closeMenu");

if (menuToggle && navbar) {
    menuToggle.onclick = () => {
        navbar.classList.add("active");
    };
}

if (closeMenu && navbar) {
    closeMenu.onclick = () => {
        navbar.classList.remove("active");
    };
}
// Submenu
document.querySelectorAll(".has-submenu > a").forEach(item => {

    item.onclick = function(e) {

        e.preventDefault();

        this.parentElement.classList.toggle("open");

    };

});    