// Fetch products from FakeStoreAPI
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Function to display products
function displayProducts(products) {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');

        const productImage = document.createElement('img');
        productImage.src = product.image;
        const productTitle = document.createElement('h3');
        productTitle.textContent = product.title;
        const productPrice = document.createElement('p');
        productPrice.textContent = `$${product.price}`;

        productItem.appendChild(productImage);
        productItem.appendChild(productTitle);
        productItem.appendChild(productPrice);

        productList.appendChild(productItem);
    });
}

function filterProductsByCategory(products, category) {
    if (category === '') {
        return products;
    } else {
        return products.filter(product => product.category === category);
    }
}

function searchProducts(products, searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    return products.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
}

function sortProducts(products, sortOrder) {
    if (sortOrder === 'asc') {
        return products.sort((a, b) => a.price - b.price);
    } else {
        return products.sort((a, b) => b.price - a.price);
    }
}

async function initialize() {
    const products = await fetchProducts();
    displayProducts(products);

    const categoryFilter = document.getElementById('categoryFilter');
    const sortOrder = document.getElementById('sortOrder');
    const searchInput = document.getElementById('searchInput');

    const categories = await fetchCategories();
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;
        const filteredProducts = filterProductsByCategory(products, selectedCategory);
        const sortedProducts = sortProducts(filteredProducts, sortOrder.value);
        displayProducts(sortedProducts);
    });

    sortOrder.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;
        const filteredProducts = filterProductsByCategory(products, selectedCategory);
        const sortedProducts = sortProducts(filteredProducts, sortOrder.value);
        displayProducts(sortedProducts);
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim();
        const searchedProducts = searchProducts(products, searchTerm);
        const sortedProducts = sortProducts(searchedProducts, sortOrder.value);
        displayProducts(sortedProducts);
    });
}

async function fetchCategories() {
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

initialize();
