let parents = document.getElementsByClassName('likedpar')

for (let parent of parents) {
  let fullheart = parent.querySelector('.likedch')
  let append = true

  parent.addEventListener("click", () => {
    if (append) {
      fullheart.remove()

      let newheart = document.createElement('img')
      newheart.src = 'heart.png'
      newheart.style.width = '24px'
      newheart.className = 'likedch'

      parent.appendChild(newheart)
    } else {
      parent.innerHTML = ''
      parent.appendChild(fullheart)
    }

    append = !append
  })
}
// ===== Shop Filters =====
const searchInput = document.querySelector('.filters input[type="text"]');
const selects = document.querySelectorAll('.filters select');
const products = document.querySelectorAll('.product');
const bestBtn = document.querySelector('.filters a');

function filterProducts() {
  const searchValue = searchInput.value.trim();
  const categoryValue = selects[0].value;
  const sortValue = selects[1].value;

  let visibleProducts = [];

  products.forEach(product => {
    const name = product.querySelector('h3').innerText;
    const category = product.dataset.category;

    let show = true;

    // جستجو
    if (searchValue && !name.includes(searchValue)) {
      show = false;
    }

    // دسته‌بندی
    if (categoryValue !== 'همه دسته‌ها' && category !== categoryValue) {
      show = false;
    }

    product.style.display = show ? 'block' : 'none';

    if (show) visibleProducts.push(product);
  });

  // مرتب‌سازی
  if (sortValue === 'ارزان‌ترین') {
    visibleProducts.sort((a, b) => a.dataset.price - b.dataset.price);
  }

  if (sortValue === 'گران‌ترین') {
    visibleProducts.sort((a, b) => b.dataset.price - a.dataset.price);
  }

  if (sortValue === 'پرفروش‌ترین') {
    visibleProducts.sort((a, b) => b.dataset.rate - a.dataset.rate);
  }

  visibleProducts.forEach(p => p.parentElement.appendChild(p));
}

// رویدادها
searchInput.addEventListener('input', filterProducts);
selects.forEach(sel => sel.addEventListener('change', filterProducts));

// پرفروش‌ها
bestBtn.addEventListener('click', e => {
  e.preventDefault();
  products.forEach(p => {
    p.style.display = p.dataset.best === 'true' ? 'block' : 'none';
  });
});
