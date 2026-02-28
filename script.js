

let recipes = [];

async function init() {
    const res = await fetch("./food.json");
    if (!res.ok) throw new Error("JSON kon niet geladen worden");
    recipes = await res.json();
    render();
}

function render() {
    const container = document.getElementById("recipes");
    container.innerHTML = "";

    recipes.forEach((recipe, index) => {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = recipe.photos?.[0] ?? "https://via.placeholder.com/300x200?text=Geen+Foto";

        const title = document.createElement("p");
        title.textContent = recipe.title;

        card.appendChild(img);
        card.appendChild(title);
        card.addEventListener("click", () => showRecipe(index));

        container.appendChild(card);
    });
}

function showRecipe(index) {
    const recipe = recipes[index];
    const detail = document.getElementById("detail");
    detail.innerHTML = `<h2>${recipe.title}</h2>`;

    if (!recipe.photos) {
        detail.innerHTML += "<p>Geen foto's beschikbaar.</p>";
        return;
    }

    recipe.photos.forEach(photo => {
        const img = document.createElement("img");
        img.src = photo;
        detail.appendChild(img);
    });

    detail.scrollIntoView({ behavior: "smooth", block: "start" });
}




document.getElementById("randomBtn").addEventListener("click", () => {
    const i = Math.floor(Math.random() * recipes.length);
    showRecipe(i);

    document.getElementById("detail").scrollIntoView({ behavior: "smooth", block: "start" });
});

init();
