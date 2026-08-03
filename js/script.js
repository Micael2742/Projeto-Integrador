/* ==========================================================================
   BeeSide - Interações gerais em JavaScript puro
   ========================================================================== */

/* Formulário da página Sobre nós
   Por enquanto, o projeto não possui backend. Esta função impede um envio falso
   e indica onde a integração real com e-mail, banco de dados ou WhatsApp deve entrar. */
const contactForms = document.querySelectorAll(".about-contact-form, .contact-page-form, .js-prepared-form");

contactForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const feedback = form.querySelector(".form-feedback");

    if (feedback) {
      feedback.textContent = "Formulário preparado. Integre aqui o backend ou o fluxo oficial de WhatsApp para enviar a mensagem.";
    }
  });
});

/* Ações preparadas para botões que dependerão de backend no futuro. */
const preparedActions = document.querySelectorAll(".js-prepared-action");

preparedActions.forEach((button) => {
  button.addEventListener("click", () => {
    const feedback = button.parentElement.querySelector(".form-feedback");

    if (feedback) {
      feedback.textContent = "Ação preparada. Conecte o checkout, login e pagamento ao backend para finalizar.";
    }
  });
});

/* Animação visual de compra em tela inteira. */
const cartBuyButton = document.querySelector(".js-cart-buy");
const purchaseAnimation = document.querySelector("#purchaseAnimation");
const closePurchaseAnimation = document.querySelector("#closePurchaseAnimation");

if (cartBuyButton && purchaseAnimation) {
  cartBuyButton.addEventListener("click", () => {
    purchaseAnimation.classList.add("is-active");
    purchaseAnimation.classList.remove("is-complete");
    purchaseAnimation.setAttribute("aria-hidden", "false");

    window.setTimeout(() => {
      purchaseAnimation.classList.add("is-complete");
    }, 1320);
  });
}

if (closePurchaseAnimation && purchaseAnimation) {
  closePurchaseAnimation.addEventListener("click", () => {
    purchaseAnimation.classList.remove("is-active", "is-complete");
    purchaseAnimation.setAttribute("aria-hidden", "true");
  });
}

/* Carrinho visual: atualiza quantidades e totais apenas no front-end.
   Integração futura: substituir estes dados pelos itens reais vindos do backend. */
const cartItems = document.querySelectorAll(".cart-item");
const cartSubtotal = document.querySelector("#cartSubtotal");
const cartTotal = document.querySelector("#cartTotal");
const cartCount = document.querySelector("#cartCount");

function formatCurrency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function updateCartTotals() {
  if (!cartSubtotal || !cartTotal) return;

  const activeItems = document.querySelectorAll(".cart-item");
  let total = 0;
  let count = 0;

  activeItems.forEach((item) => {
    const price = Number(item.dataset.price || 0);
    const quantityInput = item.querySelector("input[type='number']");
    const quantity = Number(quantityInput?.value || 1);
    total += price * quantity;
    count += quantity;
  });

  cartSubtotal.textContent = formatCurrency(total);
  cartTotal.textContent = formatCurrency(total);

  if (cartCount) {
    cartCount.textContent = String(count);
  }
}

cartItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-cart-action]");
    if (!actionButton) return;

    const input = item.querySelector("input[type='number']");
    const action = actionButton.dataset.cartAction;

    if (action === "plus" && input) {
      input.value = String(Number(input.value || 1) + 1);
    }

    if (action === "minus" && input) {
      input.value = String(Math.max(1, Number(input.value || 1) - 1));
    }

    if (action === "remove") {
      item.remove();
    }

    updateCartTotals();
  });

  const quantityInput = item.querySelector("input[type='number']");
  quantityInput?.addEventListener("change", () => {
    quantityInput.value = String(Math.max(1, Number(quantityInput.value || 1)));
    updateCartTotals();
  });
});

updateCartTotals();
