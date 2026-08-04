// =====================================================================
// BEESIDE — CARRINHO (carrinho.html)
// Incluir depois de supabase-client.js e header.js
// =====================================================================

function beesideFormatarPrecoCarrinho(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function beesideSalvarCarrinho(cart) {
  localStorage.setItem("beeside_cart", JSON.stringify(cart));
  beesideUpdateCartCount();
}

function beesideItemCarrinhoHTML(item) {
  return `
    <article class="cart-item" data-slug="${item.slug}" data-price="${item.price}">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <span>BeeSide</span>
        <h2>${item.name}</h2>
        <strong>${beesideFormatarPrecoCarrinho(item.price)}</strong>
      </div>
      <div class="cart-quantity" aria-label="Quantidade do produto">
        <button type="button" class="cart-qty-btn" data-cart-action="minus" aria-label="Diminuir quantidade">−</button>
        <input type="number" value="${item.quantity}" min="1" aria-label="Quantidade">
        <button type="button" class="cart-qty-btn" data-cart-action="plus" aria-label="Aumentar quantidade">+</button>
      </div>
      <button type="button" class="cart-remove" data-cart-action="remove">Remover</button>
    </article>
  `;
}

function beesideRenderizarCarrinho() {
  const container = document.querySelector(".cart-items");
  const cart = beesideGetCart();

  if (!cart.length) {
    container.innerHTML = `<p class="cart-empty">Seu carrinho está vazio. <a href="produtos.html">Ver produtos</a></p>`;
  } else {
    container.innerHTML = cart.map(beesideItemCarrinhoHTML).join("");
  }

  beesideAtualizarResumo();
}

function beesideAtualizarResumo() {
  const cart = beesideGetCart();
  const subtotal = cart.reduce((soma, item) => soma + item.price * item.quantity, 0);

  document.getElementById("cartSubtotal").textContent = beesideFormatarPrecoCarrinho(subtotal);
  document.getElementById("cartTotal").textContent = beesideFormatarPrecoCarrinho(subtotal);
}

function beesideConfigurarEventosCarrinho() {
  const container = document.querySelector(".cart-items");

  container.addEventListener("click", (e) => {
    const botao = e.target.closest("[data-cart-action]");
    if (!botao) return;

    const artigo = botao.closest(".cart-item");
    const slug = artigo.dataset.slug;
    const cart = beesideGetCart();
    const item = cart.find((i) => i.slug === slug);
    if (!item) return;

    const acao = botao.dataset.cartAction;
    if (acao === "plus") item.quantity += 1;
    if (acao === "minus") item.quantity = Math.max(1, item.quantity - 1);
    if (acao === "remove") {
      const index = cart.indexOf(item);
      cart.splice(index, 1);
    }

    beesideSalvarCarrinho(cart);
    beesideRenderizarCarrinho();
  });

  container.addEventListener("change", (e) => {
    const input = e.target.closest('input[type="number"]');
    if (!input) return;
    const artigo = input.closest(".cart-item");
    const slug = artigo.dataset.slug;
    const cart = beesideGetCart();
    const item = cart.find((i) => i.slug === slug);
    if (!item) return;

    item.quantity = Math.max(1, parseInt(input.value, 10) || 1);
    beesideSalvarCarrinho(cart);
    beesideRenderizarCarrinho();
  });
}

async function beesideFinalizarCompra() {
  const cart = beesideGetCart();
  const feedback = document.querySelector(".cart-summary .form-feedback");

  if (!cart.length) {
    feedback.textContent = "Seu carrinho está vazio.";
    feedback.style.color = "#c0392b";
    return;
  }

  const { data } = await beeside.auth.getSession();
  if (!data.session) {
    feedback.textContent = "Faça login para finalizar sua compra.";
    feedback.style.color = "#c0392b";
    setTimeout(() => (window.location.href = "login.html"), 1200);
    return;
  }

  const subtotal = cart.reduce((soma, item) => soma + item.price * item.quantity, 0);

  const { data: pedido, error: erroPedido } = await beeside
    .from("orders")
    .insert({
      user_id: data.session.user.id,
      subtotal,
      total: subtotal,
      cep: document.getElementById("cartCep")?.value || null,
    })
    .select()
    .single();

  if (erroPedido) {
    feedback.textContent = "Não foi possível concluir a compra. Tente novamente.";
    feedback.style.color = "#c0392b";
    return;
  }

  const itensPedido = cart.map((item) => ({
    order_id: pedido.id,
    product_name: item.name,
    quantity: item.quantity,
    unit_price: item.price,
  }));

  await beeside.from("order_items").insert(itensPedido);

  localStorage.removeItem("beeside_cart");
  beesideUpdateCartCount();

  document.getElementById("purchaseAnimation")?.classList.add("is-active");
}

document.addEventListener("DOMContentLoaded", () => {
  beesideRenderizarCarrinho();
  beesideConfigurarEventosCarrinho();

  document.querySelector(".js-cart-buy")?.addEventListener("click", beesideFinalizarCompra);
  document.getElementById("closePurchaseAnimation")?.addEventListener("click", () => {
    document.getElementById("purchaseAnimation")?.classList.remove("is-active");
    beesideRenderizarCarrinho();
  });
});
