/* =========================
   BÀI 1: SẢN PHẨM CÓ ẢNH
========================= */

const products = [
    { name: "Iphone 15", img: "images/sp1.jpg" },
    { name: "Samsung Galaxy S24", img: "images/sp2.jpg" },
    { name: "Macbook Pro 2023", img: "images/sp3.jpg" },
    { name: "AirPods Pro 2", img: "images/sp4.jpg" },
    { name: "Apple Watch S9", img: "images/sp5.jpg" }
];

function displayProducts(list) {
    const container = document.getElementById("productList");
    container.innerHTML = "";

    list.forEach(p => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
            </div>`;
    });
}

if (document.getElementById("productList")) displayProducts(products);

function searchProduct() {
    let text = document.getElementById("searchInput").value.trim().toLowerCase();
    const message = document.getElementById("message");

    const result = products.filter(p =>
        p.name.toLowerCase().includes(text)
    );

    if (result.length === 0) {
        message.innerText = "Không tìm thấy sản phẩm";
    } else {
        message.innerText = "";
    }

    displayProducts(result);
}

/* =========================
   BÀI 2: FORM ĐĂNG KÝ
========================= */

if (document.getElementById("registerForm")) {
    document.getElementById("registerForm").onsubmit = function(e) {
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let pass = document.getElementById("password").value;
        let agree = document.getElementById("agree").checked;
        let result = document.getElementById("result");

        if (!email.includes("@")) {
            result.innerText = "Email không hợp lệ!";
            return;
        }

        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(pass)) {
            result.innerText = "Mật khẩu không đủ mạnh!";
            return;
        }

        if (!agree) {
            result.innerText = "Bạn phải đồng ý điều khoản!";
            return;
        }

        localStorage.setItem("user", JSON.stringify({name, email}));
        result.innerText = "Đăng ký thành công!";
        result.style.color = "green";
    }
}

/* =========================
   BÀI 3: COUNTDOWN 10 PHÚT
========================= */

let interval = null;

function startCountdown() {
    let total = 600; // 10 phút

    clearInterval(interval);

    interval = setInterval(() => {
        let m = String(Math.floor(total / 60)).padStart(2, "0");
        let s = String(total % 60).padStart(2, "0");

        let timer = document.getElementById("timer");
        timer.innerText = `${m}:${s}`;

        if (total <= 60) timer.classList.add("timer-alert");

        if (total <= 0) {
            clearInterval(interval);
            document.getElementById("alertModal").style.display = "block";
        }

        total--;

    }, 1000);
}
