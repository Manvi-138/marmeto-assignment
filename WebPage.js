fetch(
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("URL not found");
    }
    return response.json();
  })
  .then((data) => {
    if (!data || !data.categories) {
      console.log("Category Not Found");
    }

    const productCategory = data.categories;
    const tabs = document.getElementById("category-tab");
    const nameCategory = document.getElementById("category-type");

    productCategory.forEach((category, value) => {
      const tab = document.createElement("button");
      tab.classList.add("categories-tab");
      tab.textContent = category.category_name;

      const content = document.createElement("div");
      content.classList.add("categories-content");

      category.category_products.forEach((product) => {
        const products = document.createElement("div");
        products.classList.add("categories-product");

        const productImg = document.createElement("div");
        productImg.classList.add("product-image");

        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.title;

        const badgeButton = document.createElement("button");
        badgeButton.classList.add("badge-button");
        badgeButton.textContent = product.badge_text || "";
        badgeButton.disabled = true;

        productImg.appendChild(img);
        productImg.appendChild(badgeButton);

        products.appendChild(productImg);

        const productTitle = document.createElement("h3");
        productTitle.id = "title";
        productTitle.textContent = `${product.title}`;
        products.appendChild(productTitle);

        const vendorName = document.createElement("li");
        vendorName.id = "vendor";
        vendorName.textContent = `${product.vendor}`;
        products.appendChild(vendorName);

        const prodctDetail = document.createElement("div");
        prodctDetail.id = "product-details";

        const price = document.createElement("li");
        price.id = "price";
        price.textContent = `Rs ${product.price}`;
        prodctDetail.appendChild(price);

        const compare = document.createElement("li");
        compare.id = "compare-price";
        compare.textContent = `${product.compare_at_price}.00`;
        prodctDetail.appendChild(compare);

        const offer = document.createElement("li");
        offer.id = "offer";

        const discount =
          ((product.compare_at_price - product.price) /
            product.compare_at_price) *
          100;
        offer.textContent = `${discount.toFixed(2)}% off`;

        prodctDetail.appendChild(offer);

        products.appendChild(prodctDetail);

        const button = document.createElement("button");
        button.id = "button";
        button.textContent = "Add to Cart";
        products.appendChild(button);

        content.appendChild(products);
      });

      tab.addEventListener("click", () => {
        document.querySelectorAll(".categories-content").forEach((content) => {
          content.style.display = "none";
        });

        content.style.display = "flex";
        document.querySelectorAll(".categories-tab").forEach((t) => {
          t.classList.remove("active");
        });

        tab.classList.add("active");
      });

      tabs.appendChild(tab);
      nameCategory.appendChild(content);

      if (value === 0) {
        tab.click();
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });
