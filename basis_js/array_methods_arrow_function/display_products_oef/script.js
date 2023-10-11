/*You have been given a list of products with their details, such as name, price, and category. 
You’re tasked with creating a webpage that allows users to filter products based on a price threshold, 
transform the product names to uppercase, 
and finally display the total price of the filtered products.*/

const products = [
  { name: "Laptop", price: 1000, category: "Electronics" },
  { name: "Shirt", price: 20, category: "Apparel" },
  { name: "Coffee Maker", price: 50, category: "Kitchen" },
  // ... add more products as needed
];

let filterNumber;
const productList = document.getElementById("productList");
const totalPrice = document.getElementById("totalPrice");

function displayProducts() {
  productList.innerHTML = "";
  filterInput = document.getElementById("priceThreshold");
  filterNumber = filterInput.value;
  const filtered = products.filter((product) => {
    return product.price <= filterNumber;
  });
  const totalPriceValue = filtered.reduce((acc, cv) => {
    return acc + cv.price;
  }, 0);
  const filteredProducts = filtered
    .map(({ name }) => {
      let htmlProduct = `<li>${name.toUpperCase()}</li>`;
      return htmlProduct;
    })
    .join("");
  productList.innerHTML += filteredProducts;
  totalPrice.innerText = totalPriceValue;
  filterInput.value = "";
}
