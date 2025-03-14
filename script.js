document.addEventListener("DOMContentLoaded", function () {
    // Fixed Button Container
    const fixedButtonContainer = document.createElement("div");
    fixedButtonContainer.classList.add("fixed-buttons");
    document.body.appendChild(fixedButtonContainer);

    // Dark Mode Toggle Button
    const darkModeToggle = document.createElement("button");
    darkModeToggle.textContent = "🌙 Dark Mode";
    darkModeToggle.classList.add("btn", "btn-dark");
    fixedButtonContainer.appendChild(darkModeToggle);

    // Check saved dark mode preference and apply it
    if (localStorage.getItem("theme") === "dark" || localStorage.getItem("theme") === null) {
        document.body.classList.add("dark-mode");
        darkModeToggle.textContent = "☀️ Light Mode";
    }

    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
            darkModeToggle.textContent = "☀️ Light Mode";
        } else {
            localStorage.setItem("theme", "light");
            darkModeToggle.textContent = "🌙 Dark Mode";
        }
    });

    // Resume Download Button
    const resumeButton = document.createElement("a");
    resumeButton.textContent = "📄 Download Resume";
    resumeButton.href = "resume.docx"; // Ensure the file is in the project folder
    resumeButton.classList.add("btn", "btn-primary", "resume-btn");
    resumeButton.setAttribute("download", "Your_Resume.pdf");
    fixedButtonContainer.appendChild(resumeButton);

    // Smooth Scrolling for Nav Links
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            if (this.getAttribute("href").startsWith("#")) {
                event.preventDefault();
                const section = document.querySelector(this.getAttribute("href"));
                section.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    // Contact Form Validation
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                alert("Please fill in all fields before submitting.");
                return;
            }

            if (!validateEmail(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            alert("Message sent successfully!");
            form.reset();
        });
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Project Showcase Animation
    const projectCards = document.querySelectorAll(".card");

    let currentProjectIndex = 0;
    function showNextProject() {
        projectCards.forEach(card => card.classList.remove("highlight"));
        projectCards[currentProjectIndex].classList.add("highlight");
        currentProjectIndex = (currentProjectIndex + 1) % projectCards.length;
    }

    if (projectCards.length > 0) {
        setInterval(showNextProject, 3000);
    }
});

