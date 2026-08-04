// =====================================================================
// BEESIDE — CATÁLOGO DE PRODUTOS (produtos.html)
// Incluir depois de supabase-client.js e header.js
// =====================================================================

function beesideFormatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function beesideCartaoProdutoHTML(produto) {
  const temDesconto = produto.price_old && produto.price_old > produto.price_new;
  return `
    <article class="product-card" data-product-id="${produto.slug}" data-price="${produto.price_new}">
      <div class="product-media">
        ${produto.badge ? `<span class="product-badge">${produto.badge}</span>` : ""}
        <button class="fav-btn" aria-label="Favoritar ${produto.name}" aria-pressed="false">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-9.5-8.8C.8 8 2 4.5 5.5 4c2-.3 3.7.7 4.5 2.2C10.8 4.7 12.5 3.7 14.5 4c3.5.5 4.7 4 3 7.2C19 15.6 12 20 12 20Z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>
        </button>
        <img src="${produto.image_url}" alt="${produto.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">${produto.brand || ""}</span>
        <h3 class="product-name">${produto.name}</h3>
        <div class="product-price">
          ${temDesconto ? `<span class="price-old">${beesideFormatarPreco(produto.price_old)}</span>` : ""}
          <span class="price-new">${beesideFormatarPreco(produto.price_new)}</span>
        </div>
        <button class="btn btn-add" data-add-to-cart>Adicionar ao carrinho</button>
      </div>
    </article>
  `;
}

function beesideAdicionarAoCarrinho(produto) {
  const cart = beesideGetCart();
  const existente = cart.find((item) => item.slug === produto.slug);
  if (existente) {
    existente.quantity += 1;
  } else {
    cart.push({
      slug: produto.slug,
      name: produto.name,
      price: produto.price_new,
      image: produto.image_url,
      quantity: 1,
    });
  }
  localStorage.setItem("beeside_cart", JSON.stringify(cart));
  beesideUpdateCartCount();
}

async function beesideCarregarProdutos() {
  const { data: produtos, error } = await beeside
    .from("products")
    .select("slug, name, brand, price_old, price_new, badge, image_url, categories(slug)")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Erro ao carregar produtos:", error.message);
    return;
  }

  // Agrupa produtos por categoria
  const porCategoria = {};
  produtos.forEach((p) => {
    const catSlug = p.categories?.slug || "outros";
    (porCategoria[catSlug] ||= []).push(p);
  });

  Object.entries(porCategoria).forEach(([catSlug, lista]) => {
    const grid = document.querySelector(`.product-grid[data-category="${catSlug}"]`);
    const contador = document.querySelector(`#${catSlug} .product-section-head span`);
    if (!grid) return;
    grid.innerHTML = lista.map(beesideCartaoProdutoHTML).join("");
    if (contador) contador.textContent = `${lista.length} produto${lista.length === 1 ? "" : "s"}`;
  });

  // Delegação de evento: um único listener cuida de todos os botões "Adicionar"
  document.querySelectorAll(".product-grid").forEach((grid) => {
    grid.addEventListener("click", (e) => {
      const botao = e.target.closest("[data-add-to-cart]");
      if (!botao) return;
      const artigo = botao.closest(".product-card");
      const slug = artigo.dataset.productId;
      const produto = produtos.find((p) => p.slug === slug);
      if (produto) {
        beesideAdicionarAoCarrinho(produto);
        botao.textContent = "Adicionado ✓";
        setTimeout(() => (botao.textContent = "Adicionar ao carrinho"), 1200);
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", beesideCarregarProdutos);
