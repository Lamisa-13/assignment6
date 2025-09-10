const categoriesList = document.querySelector(".categories ul");

fetch("https://openapi.programming-hero.com/api/categories")
.then(response => response.json())
.then(data => {
    const categories = data.categories;
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
        const plantDiv = document.createElement("div");
        plantDiv.classList.add("plant");
        plantDiv.innerHTML = `
        <img src="assets/hero-leaf1.png" alt="image of a plant" />
        <h3>${plant.name}</h3>
        <p>${plant.description}</p>
        <div class = "info">
            <span class = "plant-category">${plant.category}</span>
            <span class = "plant-price">Tk.${plant.price}</span>
        </div>
        <button id = "${plant.id}" class="btn">Add to Cart</button>`;
        items.appendChild(plantDiv);

    });

    const buttons = document.querySelectorAll(".btn");
    console.log(buttons);
    let cartItem = document.querySelector(".cart-items");
    let total = 0;
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            let id = button.getAttribute("id");
            fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
            .then(res => res.json())
            .then(data =>{
                let price = data.plants.price;
                let plantName = data.plants.name;

                let plantItem = document.createElement("div");
                plantItem.classList.add("plant-item");
                plantItem.innerHTML = `
                <div class = "plant-info">
                    <h4>${plantName}</h4>
                    <p>Tk.${price}</p>
                </div>
                <img class ="close-icon" src="assets/close.png" alt="close icon" />
                `;
                total += price;
                cartItem.appendChild(plantItem);
                document.querySelector("#total-amount").innerText = `${total.toFixed(2)}`;

                
            })
            .catch(error => console.log(error));
        });
    });

    cartItem.addEventListener("click", (e) => {
        if (e.target.classList.contains("close-icon")) {
            let itemPrice = parseFloat(
                e.target.previousElementSibling.children[1].innerText.replace("Tk.","")
            );
            console.log("Removed item price:", itemPrice);

            // Remove item from DOM
            e.target.parentElement.remove();

            // Update total
            total -= itemPrice;
            document.querySelector("#total-amount").innerText = `${total.toFixed(2)}`;
        }
    });


})
.catch(error => console.log(error));


categoriesList.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
        e.target.classList.add("active");
    }
    document.querySelectorAll(".categories ul li").forEach(li => {
        if (li !== e.target) {
            li.classList.remove("active");
        }
    });
});

