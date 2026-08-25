// قائمة المنتجات المعروضة بالصور والروابط الخارجية
const products = [
    { 
        id: 1, 
        name: "قميص كاجوال رجالي قطن", 
        price: 450, 
        category: "men", 
        img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
        link: "https://www.amazon.eg/s?k=men+shirt"
    },
    { 
        id: 2, 
        name: "جاكيت جينز عصري رجالي", 
        price: 850, 
        category: "men", 
        img: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500",
        link: "https://www.amazon.eg/s?k=men+jacket"
    },
    { 
        id: 3, 
        name: "تيشيرت رياضي رجالي", 
        price: 290, 
        category: "men", 
        img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500",
        link: "https://www.amazon.eg/s?k=men+tshirt"
    },
    { 
        id: 4, 
        name: "فستان صيفي أنيق", 
        price: 650, 
        category: "women", 
        img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500",
        link: "https://www.amazon.eg/s?k=women+dress"
    },
    { 
        id: 5, 
        name: "حقيبة يد جلدية راقية", 
        price: 520, 
        category: "women", 
        img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500",
        link: "https://www.amazon.eg/s?k=women+bag"
    },
    { 
        id: 6, 
        name: "بلوزة كلاسيك حريمي", 
        price: 380, 
        category: "women", 
        img: "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500",
        link: "https://www.amazon.eg/s?k=women+blouse"
    },
    { 
        id: 7, 
        name: "طقم أطفال صيفي مريح", 
        price: 310, 
        category: "kids", 
        img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500",
        link: "https://www.amazon.eg/s?k=kids+clothes"
    },
    { 
        id: 8, 
        name: "جاكيت شتوي للأطفال", 
        price: 490, 
        category: "kids", 
        img: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=500",
        link: "https://www.amazon.eg/s?k=kids+jacket"
    }
];

let cart = [];

const productsContainer = document.getElementById('products-container');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalPrice = document.getElementById('cart-total-price');
const cartCount = document.getElementById('cart-count');
const themeToggle = document.getElementById('theme-toggle');

// عرض المنتجات مع زر الشراء المباشر وزر السلة
function displayProducts(items) {
    productsContainer.innerHTML = items.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <div class="price">${p.price} ج.م</div>
            <div style="display: flex; gap: 5px; flex-direction: column;">
                <button class="add-btn" onclick="addToCart(${p.id})">إضافة للسلة 🛒</button>
                <a href="${p.link}" target="_blank" style="text-decoration: none;">
                    <button class="add-btn" style="background-color: #28a745; margin-top: 5px;">مشاهدة في المتجر 🔗</button>
                </a>
            </div>
        </div>
    `).join('');
}

// تصفية المنتجات حسب الفئة
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        e.target.classList.add('active');
        const cat = e.target.dataset.category;
        displayProducts(cat === 'all' ? products : products.filter(p => p.category === cat));
    });
});

// إضافة للسلّة
window.addToCart = function(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCart();
};

function updateCart() {
    cartCount.innerText = cart.length;
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>${item.price} ج.م</span>
        </div>
    `).join('');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotalPrice.innerText = total;
}

// فتح وإغلاق السلة
cartBtn.onclick = () => cartModal.style.display = 'flex';
closeCart.onclick = () => cartModal.style.display = 'none';

// Dark Mode
themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.innerText = isDark ? '🌙' : '☀️';
});

// التشغيل الأول
displayProducts(products);
