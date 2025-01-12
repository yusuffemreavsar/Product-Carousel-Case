/*
Project Name: Insider Product Carousel Case
GitHub Repository: https://github.com/yusuffemreavsar/Insider-Product-Carousel-Case
Developer: Yusuf Emre Avsar
Date: 13/01/2025
*/

(() => {
    const init = () => {
      buildHTML();
      buildCSS();
      setEvents();
    };
  
    const buildHTML = () => {
      // HTML Section: Defining the structure of the recommendation carousel
      const html = `
                  <div class="recommendation-carousel">
                    <div class="carousel-container">
                      <div class="carousel-title">
                          <p>You Might Also Like</p>
                      </div>
                      <div class="products-wrapper">
                           <div class="left-direction-button">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242"><path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path></svg>
                          </div>
                          <div class="products"></div>
                          <div class="right-direction-button">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242"><path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path></svg>
                          </div>
                      </div>
                   </div>   
                  </div>
                   `;
  
      $('.product-detail').append(html);
    };
  
    // CSS Section: Defining and appending carousel-specific styles dynamically
    const buildCSS = () => {
      const css = `
                  .carousel-title{
                      margin-bottom:16px;
                  }
                  .carousel-title p{
                      font-size:32px;
                      line-height:43px;
                  }
                  .products-wrapper{
                      position:relative;  
                  }
                  .products{
                      display:flex;
                      overflow-x: hidden;
                      gap:5px;     
                  }
                 .product-title-text {
                     font-size: 12px;
                     line-height: 1.5em;
                      max-height: 3em;
                     overflow: hidden;
                     display: -webkit-box;
                     -webkit-box-orient: vertical;
                     -webkit-line-clamp: 2;
                     text-overflow: ellipsis;
                     white-space: normal;
                  }
                  .product-price-text{
                      font-size:16px;
                      font-weight:bold;
                      color:#193db0;
                  }             
                  .left-direction-button{
                       position: absolute;
                       left: -50px;
                       top: 100px;
                       cursor: pointer;
                       color: black;
                       z-index:1;      
                  }
                  .right-direction-button{
                      position: absolute;
                       right: -50px;
                       top: 100px;
                       cursor: pointer;
                       color: black;
                       transform: rotate(180deg);
                       display: inline-block;
                       z-index:1;
                  }
                  .product{
                      flex: 0 0 calc(100% / 7);
                      width: 210px;
                      position:relative;
                      font-size:12px;
                      background-color: white;  
                  }
                  .info{
                    margin-top:12px;
                    padding-left:12px;
                    padding-bottom:24px;
                  }
                  img{
                      width: 100%;
                      height: auto;
                      cursor:pointer;
                  }
                  .icon{
                    width: 16px;
                    height: 16px;
                    cursor: pointer;
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    }
                    @media (max-width: 1400px) {
                      .product{
                      flex: 0 0 calc(100% / 5);
                     }
                  }
                  @media (max-width: 990px) {
                    .left-direction-button {
                        left:10px;
                     }
                    .right-direction-button {
                        right:10px;
                     }
                      .product{
                      flex: 0 0 calc(100% / 4);
                  }
                  @media (max-width: 800px) {
                      .product{
                      flex: 0 0 calc(100% / 3);
                     }
                  @media (max-width: 650px) {
                      .product{
                      flex: 0 0 calc(100% / 2);
                     }
                  }
                  
      `;
      $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };
  
  
    // Events Section: Defining event listeners for the recommendation carousel
    const setEvents = () => {
      // Initializes the necessary functions when the document is ready
      $(document).ready(() => {
        initializeProducts();
        initializeFavorites();
        bindCarouselEvents();
        bindFavoriteEvents();
        bindProductClickEvents();
      });
    };
  
    // Functions Section: Contains functions for building, styling, fetching, and setting events for the carousel.
  
    // renderProduct: Renders a product card with an image, title, price, and icon.
    function renderProduct(element) {
      return `
              <div class="product" id="${element.id}">
                  <div class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20.576 19.483">
                          <path fill="none" stroke="#555" stroke-width="1.5px" d="M19.032 7.111c-.278-3.063-2.446-5.285-5.159-5.285a5.128 5.128 0 0 0-4.394 2.532 4.942 4.942 0 0 0-4.288-2.532C2.478 1.826.31 4.048.032 7.111a5.449 5.449 0 0 0 .162 2.008 8.614 8.614 0 0 0 2.639 4.4l6.642 6.031 6.755-6.027a8.615 8.615 0 0 0 2.639-4.4 5.461 5.461 0 0 0 .163-2.012z" transform="translate(.756 -1.076)"></path>
                      </svg>
                  </div>
                  <img src="${element.img}" alt="Image" data-url="${element.url || ''}">
                  <div class="info">
                      <p class="product-title-text">${element.name}</p>
                      <span class="product-price-text">${element.price} TL</span>
                  </div>
              </div>
          `;
    }
    // loadProducts: Loops through the product list and appends each product to the carousel.
    function loadProducts(products) {
      products.forEach(product => $(".products").append(renderProduct(product)));
    }
  
    // fetchProductsFromAPI: Fetches products data from the API, loads them into the carousel and stores them in localStorage for later use.
    function fetchProductsFromAPI() {
      const apiURL =
        "https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json";
  
      $.ajax({
        url: apiURL,
        method: "GET",
        success: (response) => {
          try {
            const products = JSON.parse(response);
            loadProducts(products);
            localStorage.setItem("products", JSON.stringify(products));
          } catch (error) {
            console.error("Error parsing the product data:", error);
          }
        },
        error: (error) => {
          console.error("Error fetching products from the API:", error);
        }
      });
    };
  
    // initializeProducts: Checks if products are stored in localStorage, loads them if available otherwise fetches them from the API.
    function initializeProducts() {
      try {
        const storedProducts = localStorage.getItem("products");
  
        if (storedProducts) {
          loadProducts(JSON.parse(storedProducts));
        } else {
          fetchProductsFromAPI();
        }
      } catch (error) {
        console.error("Error initializing products:", error);
      }
    };
  
    // bindCarouselEvents: Assign click events to carousel navigation buttons
    function bindCarouselEvents() {
      $(".left-direction-button").click((e) => handleCarouselClick(e, "left-direction-button"));
      $(".right-direction-button").click((e) => handleCarouselClick(e, "right-direction-button"));
    };
  
    // handleCarouselClick: Handles the carousel scrolling logic based on the direction (left or right)
    function handleCarouselClick(e, direction) {
      e.preventDefault();
      const element = $(".products");
      const cardWidth = $(".product").outerWidth(true);
      let val = element.scrollLeft();
  
      val += direction === "left-direction-button" ? -cardWidth - 5 : cardWidth + 5;
      element.animate({ scrollLeft: Math.round(val) }, 400);
      element.scrollLeft(Math.round(val));
    };
  
    // bindFavoriteEvents: Binds click events to favorite icons, triggering the toggleFavorite function
    function bindFavoriteEvents() {
      $(document).on("click", ".icon", function () {
        toggleFavorite($(this).closest(".product").attr("id"), $(this));
      });
    };
    // toggleFavorite: Toggles the favorite status of a product, updates the icon color, and saves the favorites to localStorage
    function toggleFavorite(productId, iconElement) {
      try {
        let favoriteProducts =
          JSON.parse(localStorage.getItem("favorite-products")) || [];
  
        if (!favoriteProducts.includes(productId)) {
          favoriteProducts.push(productId);
          iconElement.find("svg path").attr({
            fill: "blue",
            stroke: "blue",
          });
        } else {
          favoriteProducts = favoriteProducts.filter((id) => id !== productId);
          iconElement.find("svg path").attr({
            fill: "none",
            stroke: "#555",
          });
        }
  
        localStorage.setItem("favorite-products", JSON.stringify(favoriteProducts));
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    };
    // bindProductClickEvents: Adds click events to images to navigate to their "data-url"
    function bindProductClickEvents() {
      $("img").on("click", function () {
        const url = $(this).data("url");
        if (url) {
            window.open(url, "_blank");
        }
      });
    };
    // initializeFavorites: Initializes the favorite products by checking localStorage and updating the icons
    function initializeFavorites() {
      try {
        const favoriteProducts =
          JSON.parse(localStorage.getItem("favorite-products")) || [];
  
        favoriteProducts.forEach((productId) => {
          const productIcon = $(`#${productId} .icon svg path`);
          if (productIcon.length) {
            productIcon.attr({
              fill: "blue",
              stroke: "blue",
            });
          }
        });
      } catch (error) {
        console.error("Error initializing favorites:", error);
      }
    };
  
    //Init Function Call
    init();
  })();