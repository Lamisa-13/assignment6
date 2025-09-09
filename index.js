fetch("https://openapi.programming-hero.com/api/categories")
.then(response => response.json())
.then(data => {
    const categories = data.categories;
    
    const categoriesList = document.querySelector(".categories ul");
    categories.forEach(category => {
        const li = document.createElement("li");
        li.textContent = category.category_name;
        categoriesList.appendChild(li);
    });
})
.catch(error => console.log(error));

fetch("https://openapi.programming-hero.com/api/plants")
.then(response => response.json())
.then(data => {
    const plants = data.plants
    const items = document.querySelector(".items")

    plants.forEach(plant => {
        const plantDiv = document.createElement("div")
        plantDiv.classList.add("plant")
        plantDiv.innerHTML = `
        <img src="assets/hero-leaf1.png" alt="image of a plant" />
        <h3>${plant.name}</h3>
        <p>${plant.description}</p>
        <div class = "info">
            <span class = "plant-category">${plant.category}</span>
            <span class = "plant-price">Tk.${plant.price}</span>
        </div>
        <button class="btn">Add to Cart</button>`;
        items.appendChild(plantDiv);
    });
})
.catch(error => console.log(error)) ;