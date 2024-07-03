const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');
const display = document.getElementById('disble')

if(bar){
    bar.addEventListener('click',() =>{
        nav.classList.add('active');
    })
}
if(close){
    close.addEventListener('click',() =>{
        nav.classList.remove('active');
    })
}

function addToCart(){
    alert("Item is added to cart..")
}
// Function to remove a product from the cart
  function removeProduct(event) {
    event.preventDefault(); 
    let row = event.target.closest('tr');
    row.remove();
    updateCartTotal();
  }
  // Function to update the cart total
  function updateCartTotal() {
    let subtotal = 0;
    document.querySelectorAll('#cart tbody tr').forEach(row => {
      let price = parseFloat(row.cells[3].textContent.replace('₹', '')); // Get the price
      let quantity = parseInt(row.cells[4].querySelector('input').value); // Get the quantity
      subtotal += price * quantity; // Calculate subtotal
    });
    document.querySelector('#subtotal table tr:last-child td:last-child').textContent = '₹' + subtotal.toFixed(2); // Update total in the subtotal section
  }

  // Function to initialize event listeners
  function initialize() {
    // Add event listeners for removing products
    document.querySelectorAll('#cart tbody tr td:first-child a').forEach(link => {
      link.addEventListener('click', removeProduct);
    });

    // Add event listener for quantity change to update subtotal
    document.querySelectorAll('#cart tbody tr td:nth-child(5) input').forEach(input => {
      input.addEventListener('change', updateCartTotal);
    });
  }
  document.addEventListener('DOMContentLoaded', initialize);


  //for the index.html
  

  //cart.html
  