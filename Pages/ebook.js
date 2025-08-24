// Category books data (sample)
const categoryBooks = [
  { title: 'The Ruins Of Gorlan', img: '../images/book-1.jpg', genre: 'thriller', price: '₹54.6', oldPrice: '₹70.00' },
  { title: 'Percy Jackson', img: '../images/book-2.jpg', genre: 'fantasy', price: '₹54.6', oldPrice: '₹70.00' },
  { title: 'Clever Lands', img: '../images/book-3.jpg', genre: 'education', price: '₹54.6', oldPrice: '₹70.00' },
  { title: 'Dick Francis', img: '../images/book-4.jpg', genre: 'nonfiction', price: '₹54.6', oldPrice: '₹70.00' },
  { title: 'The Giver', img: '../images/book-5.jpg', genre: 'thriller', price: '₹54.6', oldPrice: '₹70.00' },
  { title: 'Radical Gardening', img: '../images/book-6.jpg', genre: 'education', price: '₹54.6', oldPrice: '₹70.00' },
  { title: 'Wright Brothers', img: '../images/book-7.jpg', genre: 'nonfiction', price: '₹54.6', oldPrice: '₹70.00' },
  { title: 'Shattered', img: '../images/book-8.jpg', genre: 'thriller', price: '₹54.6', oldPrice: '₹70.00' },
  // More books (repeated and new)
  { title: 'Percy Jackson', img: '../images/book-2.jpg', genre: 'fantasy', price: '₹54.6', oldPrice: '₹70.00' },
  { title: 'Clever Lands', img: '../images/book-3.jpg', genre: 'education', price: '₹54.6', oldPrice: '₹70.00' },
  { title: 'Dick Francis', img: '../images/book-4.jpg', genre: 'nonfiction', price: '₹54.6', oldPrice: '₹70.00' },
  { title: 'The Giver', img: '../images/book-5.jpg', genre: 'thriller', price: '₹54.6', oldPrice: '₹70.00' },
  { title: 'Radical Gardening', img: '../images/book-6.jpg', genre: 'education', price: '₹54.6', oldPrice: '₹70.00' },
  { title: 'Wright Brothers', img: '../images/book-7.jpg', genre: 'nonfiction', price: '₹54.6', oldPrice: '₹70.00' },
  { title: 'Shattered', img: '../images/book-8.jpg', genre: 'thriller', price: '₹54.6', oldPrice: '₹70.00' },
  { title: 'The Ruins Of Gorlan', img: '../images/book-1.jpg', genre: 'thriller', price: '₹54.6', oldPrice: '₹70.00' }
];

let categoryBooksShown = 0;
const categoryBooksPerPage = 4;
let currentCategoryFilter = 'all';

function renderCategoryBooks(reset = false) {
  const grid = document.getElementById('category-books-grid');
  if (!grid) return;
  if (reset) {
    categoryBooksShown = 0;
    grid.innerHTML = '';
  }
  let filtered = categoryBooks.filter(b => currentCategoryFilter === 'all' || b.genre === currentCategoryFilter);
  let toShow = filtered.slice(0, categoryBooksShown + categoryBooksPerPage);
  grid.innerHTML = '';
  toShow.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book';
    card.innerHTML = `
      <figure>
        <a href="book-detail.html"><img src="${book.img}" alt="${book.title}" /></a>
      </figure>
      <h4>${book.title}</h4>
      <div class="genre">${book.genre.toUpperCase()}</div>
      <div class="price-row">
        <span class="price">${book.price}</span>
        <span class="old-price">${book.oldPrice}</span>
      </div>
    `;
    grid.appendChild(card);
  });
  categoryBooksShown = toShow.length;
  const loadMoreBtn = document.getElementById('load-more-category-books-btn');
  if (loadMoreBtn) {
    if (categoryBooksShown < filtered.length) {
      loadMoreBtn.style.display = 'inline-block';
      // Remove any previous message
      const msg = document.getElementById('all-books-loaded-msg');
      if (msg) msg.remove();
    } else {
      loadMoreBtn.style.display = 'none';
      // Show message that all books are loaded
      if (!document.getElementById('all-books-loaded-msg')) {
        const msg = document.createElement('div');
        msg.id = 'all-books-loaded-msg';
        msg.style = 'text-align:center; color:#888; margin-top:12px; font-size:1rem;';
        msg.textContent = 'Already loaded all the books.';
        grid.parentNode.insertBefore(msg, grid.nextSibling);
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  window.onload = function() {
    window.scrollTo(0, 0);
  };

  document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
    renderCategoryBooks(true);
    const filter = document.getElementById('category-filter');
    if (filter) {
      filter.addEventListener('change', function() {
        currentCategoryFilter = filter.value;
        renderCategoryBooks(true);
      });
    }
    const loadMoreBtn = document.getElementById('load-more-category-books-btn');
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function() {
        // Add click animation
        loadMoreBtn.style.transform = 'scale(0.96)';
        setTimeout(() => {
          loadMoreBtn.style.transform = '';
        }, 120);
        renderCategoryBooks();
      });
    }
    renderBooks(true);
    // Enable category card click filtering
    document.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', function() {
        const catText = card.querySelector('h3').textContent.trim().toLowerCase().replace('-', '').replace(' ', '-');
        currentCategory = catText === 'all' ? 'all' : catText;
        renderBooks(true);
        // Highlight selected category
        document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });
    const loadMoreBooksBtn = document.getElementById('load-more-books-btn');
    if (loadMoreBooksBtn) {
      loadMoreBooksBtn.addEventListener('click', function() {
        renderBooks();
      });
    }
    // Scroll categories right when arrow button is clicked
    const scrollBtn = document.getElementById('category-scroll-btn');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', function() {
        const grid = document.querySelector('.categories-grid');
        grid.scrollBy({ left: 200, behavior: 'smooth' });
      });
    }
  });
  renderCategoryBooks(true);
  const filter = document.getElementById('category-filter');
  if (filter) {
    filter.addEventListener('change', function() {
      currentCategoryFilter = filter.value;
      renderCategoryBooks(true);
    });
  }
  const loadMoreBtn = document.getElementById('load-more-category-books-btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      // Add click animation
      loadMoreBtn.style.transform = 'scale(0.96)';
      setTimeout(() => {
        loadMoreBtn.style.transform = '';
      }, 120);
      renderCategoryBooks();
    });
  }
});
// Demo book data
const books = [
  { title: 'Book 1', img: '../images/book-1.jpg', link: 'Pages/book-detail.html' },
  { title: 'Book 2', img: '../images/book-2.jpg', link: 'Pages/book-detail.html' },
  { title: 'Book 3', img: '../images/book-3.jpg', link: 'Pages/book-detail.html' },
  { title: 'Book 4', img: '../images/book-4.jpg', link: 'Pages/book-detail.html' },
  { title: 'Book 5', img: '../images/book-5.jpg', link: 'Pages/book-detail.html' },
  { title: 'Book 6', img: '../images/book-6.jpg', link: 'Pages/book-detail.html' },
  { title: 'Book 7', img: '../images/book-7.jpg', link: 'Pages/book-detail.html' },
  { title: 'Book 8', img: '../images/book-8.jpg', link: 'Pages/book-detail.html' }
];

let booksShown = 0;
const booksPerPage = 4;
let currentCategory = 'all';

function showBookDetails(book) {
  // Remove any existing modal
  const oldModal = document.querySelector('.book-details-modal');
  if (oldModal) oldModal.remove();
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'book-details-modal';
  modal.innerHTML = `
    <div class="book-details-content">
      <button class="book-details-close" title="Close">&times;</button>
      <img src="${book.img}" alt="${book.title}" />
      <h4>${book.title}</h4>
      <p>${book.desc}</p>
      <button class="btn-primary" style="margin-top:10px;">Add to Cart</button>
    </div>
  `;
  document.body.appendChild(modal);
  // Close modal on button click or background click
  modal.querySelector('.book-details-close').onclick = () => modal.remove();
  modal.onclick = e => { if (e.target === modal) modal.remove(); };
}

function renderBooks(reset = false) {
  const grid = document.getElementById('books-grid');
  if (reset) {
    booksShown = 0;
    grid.innerHTML = '';
  }
  grid.innerHTML = '';
  let toShow = books.slice(0, booksShown + booksPerPage);
  // No books/images rendered
  booksShown = toShow.length;
  document.getElementById('load-more-books-btn').style.display = booksShown < books.length ? 'inline-block' : 'none';
}

document.addEventListener('DOMContentLoaded', function() {
  renderBooks(true);
  // Enable category card click filtering
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
      const catText = card.querySelector('h3').textContent.trim().toLowerCase().replace('-', '').replace(' ', '-');
      currentCategory = catText === 'all' ? 'all' : catText;
      renderBooks(true);
      // Highlight selected category
      document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });
  document.getElementById('load-more-books-btn').addEventListener('click', function() {
    renderBooks();
  });
  // Scroll categories right when arrow button is clicked
  const scrollBtn = document.getElementById('category-scroll-btn');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', function() {
      const grid = document.querySelector('.categories-grid');
      grid.scrollBy({ left: 200, behavior: 'smooth' });
    });
  }
});
