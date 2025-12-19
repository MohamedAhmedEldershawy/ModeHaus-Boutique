// 1. قاعدة بيانات المنتجات
const products = [
    {id:1, name:"Classic Beige Coat", price:150, img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop", desc:"Elegant wool blend coat."},
    {id:2, name:"Noir Silk Blouse", price:85, img:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=600&auto=format&fit=crop", desc:"Premium black silk blouse."},
    {id:3, name:"Tailored Trousers", price:120, img:"https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=600&auto=format&fit=crop", desc:"Classic fit trousers."},
    {id:4, name:"Evening Dress", price:290, img:"https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=600&auto=format&fit=crop", desc:"Stunning evening wear."},
    // تأكد إن دول موجودين:
   // ... المنتجات اللي قبل كده ...
    {
        id: 5, 
        name: "Casual Chic Set", 
        price: 180.00, 
      
        img: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?q=80&w=600&auto=format&fit=crop", 
        desc: "Comfortable yet stylish casual set for everyday wear."
    },
    // ... باقي المنتجات ...
    {id:6, name:"Summer Breeze", price:95, img:"https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop", desc:"Light summer outfit."}
];

// 2. تحديث أيقونة السلة
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let icon = document.getElementById('cart-count');
    if(icon) icon.innerText = cart.length;
}
updateCartCount();

// 3. إضافة للسلة
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = products.find(p => p.id === id);
    if(product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert("Product added to bag!");
    }
}

// 4. عرض تفاصيل المنتج (في صفحة product.html)
if(document.getElementById('product-detail')) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'));
    const product = products.find(p => p.id === id);
    
    if(product) {
        document.getElementById('p-img').src = product.img;
        document.getElementById('p-name').innerText = product.name;
        document.getElementById('p-price').innerText = "$" + product.price;
        document.getElementById('p-desc').innerText = product.desc;
        document.getElementById('add-btn').onclick = function() { addToCart(product.id); };
    }
}

// 5. عرض السلة (في صفحة cart.html)
if(document.getElementById('cart-items')) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let container = document.getElementById('cart-items');
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        container.innerHTML += `
            <tr>
                <td><div class="cart-info"><img src="${item.img}"><p>${item.name}</p></div></td>
                <td>$${item.price}</td>
                <td><a href="#" onclick="removeItem(${index})" style="color:red">Remove</a></td>
            </tr>
        `;
    });
    document.getElementById('total-price').innerText = "$" + total;
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

// 6. تشغيل السلايدر (لو موجود)
if(document.querySelector('.mySwiper')) {
    new Swiper(".mySwiper", {
        slidesPerView: 1, spaceBetween: 20, loop: true,
        pagination: { el: ".swiper-pagination", clickable: true },
        breakpoints: { 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
}

// 7. البوب أب
window.addEventListener('load', function() {
    if(document.getElementById('newsletterPopup')) {
        setTimeout(() => {
            document.getElementById('newsletterPopup').style.display = 'flex';
        }, 3000);
    }
});
function closePopup() { document.getElementById('newsletterPopup').style.display = 'none'; }