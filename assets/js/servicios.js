function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    element.classList.toggle('active');
    answer.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.querySelector(".mobile-nav-toggle"); // hamburguesa
    const menu = document.getElementById("mobileMenu");
    const overlay = document.getElementById("mobileMenuOverlay");
    const closeBtn = document.querySelector("#mobileMenu .close-menu"); // forzamos el selector a buscar dentro del menú

    function openMenu() {
        menu.classList.add("open");
        overlay.classList.add("open");
        toggle.classList.remove("bi-list");
        toggle.classList.add("bi-x");
    }

    function closeMenu() {
        menu.classList.remove("open");
        overlay.classList.remove("open");
        toggle.classList.remove("bi-x");
        toggle.classList.add("bi-list");
    }

    // Clic en hamburguesa abre o cierra
    toggle.addEventListener("click", function () {
        if (menu.classList.contains("open")) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Clic en la X cierra
    closeBtn.addEventListener("click", closeMenu);

    // Clic fuera del menú cierra
    overlay.addEventListener("click", closeMenu);
});

