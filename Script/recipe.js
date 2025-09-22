 document.querySelector('.cta-glow').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#recipeContainer').scrollIntoView({
            behavior: 'smooth'
        });
    });
//------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const recipeContainer = document.getElementById('recipeContainer');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const modal = document.getElementById('recipeModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close');
    
    // Variable to store recipe data
    let recipeData;

    // Function to fetch recipe data
   function fetchRecipeData() {
    fetch('recipe.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            recipeData = data;
            // After data is loaded, initialize the page
            createCategorySections();
            renderRecipes(recipeData.recipes);
        })
        .catch(error => {
            console.error('Error fetching recipe data:', error);
            // Display error message to user
            recipeContainer.innerHTML = '<p>Failed to load recipes. Please try again later.</p>';
        });
}


    // Function to create category sections
    function createCategorySections() {
        const categories = [
            { id: 'breakfast', title: 'HEALTHY BREAKFAST RECIPES' },
            { id: 'lunch', title: 'HEALTHY LUNCH RECIPES' },
            { id: 'dinner', title: 'HEALTHY DINNER RECIPES' },
            { id: 'snacks', title: 'HEALTHY SNACKS AND DESSERTS RECIPES' },
            { id: 'protein', title: 'HEALTHY HIGH PROTEIN RECIPES' },
            { id: 'vegetarian', title: 'HEALTHY VEGETARIAN RECIPES' }
        ];
        
        categories.forEach(category => {
            const section = document.createElement('div');
            section.className = 'category-section';
            section.innerHTML = `<h2><u>${category.title}</u></h2><div class="card-container" data-category="${category.id}"></div>`;
            recipeContainer.appendChild(section);
        });
    }

    // Function to render recipe cards
    function renderRecipes(recipes) {
        // Clear all card containers
        const cardContainers = document.querySelectorAll('.card-container');
        cardContainers.forEach(container => {
            container.innerHTML = '';
        });
        
        // Group recipes by category
        const recipesByCategory = {};
        recipes.forEach(recipe => {
            if (!recipesByCategory[recipe.category]) {
                recipesByCategory[recipe.category] = [];
            }
            recipesByCategory[recipe.category].push(recipe);
        });
        
        // Render recipes in their respective category containers
        Object.keys(recipesByCategory).forEach(categoryId => {
            const container = document.querySelector(`.card-container[data-category="${categoryId}"]`);
            if (container) {
                recipesByCategory[categoryId].forEach(recipe => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.setAttribute('data-category', recipe.category);
                    
                    card.innerHTML = `
                        <img src="${recipe.image}" alt="${recipe.title}" />
                        <div class="card-content">
                            <h3>${recipe.title}</h3>
                            <p>${recipe.shortDescription}</p>
                            <a href="#" class="btn" data-id="${recipe.id}">Read More</a>
                        </div>
                    `;
                    
                    container.appendChild(card);
                });
            }
        });
        
        // Add event listeners to "Read More" buttons
        const readMoreButtons = document.querySelectorAll('.btn');
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const recipeId = parseInt(this.getAttribute('data-id'));
                openRecipeModal(recipeId);
            });
        });
    }

    // Function to open recipe modal
    function openRecipeModal(recipeId) {
        const recipe = recipeData.recipes.find(r => r.id === recipeId);
        
        if (recipe) {
            let nutritionHTML = '<table><tr><th>Nutrient</th><th>Amount</th></tr>';
            
            for (const [nutrient, amount] of Object.entries(recipe.nutrition)) {
                nutritionHTML += `<tr><td>${nutrient}</td><td>${amount}</td></tr>`;
            }
            
            nutritionHTML += '</table>';
            
            modalBody.innerHTML = `
                <h2>${recipe.title}</h2>
                <img src="${recipe.image}" alt="${recipe.title}" />
                <div class="ingredients">
                    <h3>Ingredients</h3>
                    <ul>
                        ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
                <div class="steps">
                    <h3>Steps</h3>
                    <ol>
                        ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
                <div class="nutrition">
                    <h3>Nutrition Information</h3>
                    ${nutritionHTML}
                </div>
            `;
            
            modal.style.display = 'block';
        }
    }

    // Function to filter recipes
    function filterRecipes() {
        if (!recipeData) return; // If data not loaded yet, do nothing
        
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        
        let filteredRecipes = recipeData.recipes;
        
        // Filter by search term
        if (searchTerm) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.title.toLowerCase().includes(searchTerm) || 
                recipe.shortDescription.toLowerCase().includes(searchTerm)
            );
        }
        
        // Filter by category
        if (selectedCategory !== 'all') {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.category === selectedCategory
            );
        }
        
        renderRecipes(filteredRecipes);
    }

    // Event listeners
    searchInput.addEventListener('input', filterRecipes);
    categoryFilter.addEventListener('change', filterRecipes);
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Fetch recipe data and initialize the page
    fetchRecipeData();
});
 // --------------------------------------------------- NEWSLETTER STORAGE (Footer for All Pages)----------------------------------------------------
  
  if (document.getElementById("newsletterForm")) {
    const form = document.getElementById("newsletterForm");
    const message = document.getElementById("newsletterMessage");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = document.getElementById("newsletterEmail").value.trim();

      if (email && email.includes("@") && email.includes(".")) {
        let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
        subscribers.push(email);
        localStorage.setItem("subscribers", JSON.stringify(subscribers));

        message.textContent = "Thank you for subscribing!";
        message.className = "success";
        message.style.display = "block";

        form.reset();
      } else {
        message.textContent = "Please enter a valid email address.";
        message.className = "error";
        message.style.display = "block";
      }
    });
  }
  if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(reg => console.log("Service Worker registered:", reg))
    .catch(err => console.log("Service Worker failed:", err));
}
