
      // when input is changed
      document.querySelectorAll('.cartpage-qty').forEach(function (qty, idx) {
        qty.addEventListener('change', function (e) {
          qty.setAttribute("disabled", "disabled");
          $.post('/cart/update.json',
            `updates[${this.dataset.variant}]=${this.value}`
          ).done(function (data) {
            updateCartLineItems(data, idx, qty);
            qty.removeAttribute("disabled");
          })
        })
      })
      
      // when plus icon is clicked
      document.querySelectorAll('.custom-plus-qty').forEach(function (qty, idx) {
        qty.addEventListener('click', function (e) {
          qty.style.opacity = "0.3";
          let value = parseInt(qty.parentElement.querySelector(".cartpage-qty").value) + 1;
          $.post('/cart/update.json',
            `updates[${this.dataset.variant}]=${value}`
          ).done(function (data) {
            updateCartLineItems(data, idx, qty);
            qty.style.opacity = "1";
          })
        })
      })
      
      // when minus icon is clicked
      document.querySelectorAll('.custom-minus-qty').forEach(function (qty, idx) {
        qty.addEventListener('click', function (e) {
          qty.style.opacity = "0.3";
          let value = parseInt(qty.parentElement.querySelector(".cartpage-qty").value) - 1;
          $.post('/cart/update.json',
            `updates[${this.dataset.variant}]=${value}`
          ).done(function (data) {
            updateCartLineItems(data, idx, qty);
            qty.style.opacity = "1";
          })
        })
      })
      
      // when cross is clicked
      document.querySelectorAll('.cart__remove').forEach(function (qty, idx) {
        qty.addEventListener('click', function (e) {
          e.preventDefault()
          qty.parentElement.parentElement.remove();
          let id = qty.parentElement.parentElement.querySelector(".cartpage-qty");
          $.post('/cart/update.json',
            `updates[${id.dataset.variant}]=0`
          ).done(function (data) {
            document.querySelector(".cart-subtotal__price").innerText = (`$${data.items_subtotal_price / 100}.00`);
          })
        })
      })         

      function updateCartLineItems(data, idx, qty) {
        let updatedPrice = data.items[idx].final_line_price / 100;
        qty.parentElement.parentElement.parentElement.querySelector(".cartpage-item-price").innerText = (`$${updatedPrice}.00`);
        document.querySelector(".cart-subtotal__price").innerText = (`$${data.items_subtotal_price / 100}.00`);
      }
  
