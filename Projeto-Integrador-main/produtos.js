// BeeSide - catalogo de produtos
const BEESIDE_CATALOGO = [
  { slug: "tenis-velocity-run", name: "Tênis Velocity Run", brand: "BeeSide Running", category: "tenis", price_old: 499.90, price_new: 399.90, badge: "-20% OFF", image_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=85&w=900&auto=format&fit=crop" },
  { slug: "tenis-urban-flex", name: "Tênis Urban Flex", brand: "BeeSide Lifestyle", category: "tenis", price_old: 429.90, price_new: 349.90, badge: "OFERTA", image_url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=85&w=900&auto=format&fit=crop" },
  { slug: "tenis-trail-force", name: "Tênis Trail Force", brand: "BeeSide Outdoor", category: "tenis", price_old: 649.90, price_new: 549.90, badge: "-15% OFF", image_url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=85&w=900&auto=format&fit=crop" },
  { slug: "camiseta-dry-motion", name: "Camiseta Dry Motion", brand: "BeeSide Training", category: "roupas", price_old: 149.90, price_new: 119.90, badge: "-20% OFF", image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=85&w=900&auto=format&fit=crop" },
  { slug: "short-performance", name: "Short Performance", brand: "BeeSide Training", category: "roupas", price_old: 169.90, price_new: 139.90, badge: "NOVIDADE", image_url: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=85&w=900&auto=format&fit=crop" },
  { slug: "jaqueta-active", name: "Jaqueta Active Wind", brand: "BeeSide Outdoor", category: "roupas", price_old: 399.90, price_new: 319.90, badge: "-20% OFF", image_url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=85&w=900&auto=format&fit=crop" },
  { slug: "garrafa-thermal", name: "Garrafa Thermal 750 ml", brand: "BeeSide Gear", category: "acessorios", price_old: 129.90, price_new: 99.90, badge: "MAIS VENDIDO", image_url: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=85&w=900&auto=format&fit=crop" },
  { slug: "relogio-active", name: "Relógio Active Sport", brand: "BeeSide Tech", category: "acessorios", price_old: 599.90, price_new: 479.90, badge: "-20% OFF", image_url: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=85&w=900&auto=format&fit=crop" },
  { slug: "oculos-pace", name: "Óculos Pace UV400", brand: "BeeSide Running", category: "acessorios", price_old: 219.90, price_new: 179.90, badge: "NOVIDADE", image_url: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=85&w=900&auto=format&fit=crop" },
  { slug: "bola-court-elite", name: "Bola Court Elite", brand: "Basquete", category: "equipamentos", price_old: 299.90, price_new: 249.90, badge: "-17% OFF", image_url: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=85&w=900&auto=format&fit=crop" },
  { slug: "halter-hex-10", name: "Halter Hexagonal 10 kg", brand: "BeeSide Strength", category: "equipamentos", price_old: 249.90, price_new: 209.90, badge: "OFERTA", image_url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=85&w=900&auto=format&fit=crop" },
  { slug: "tapete-training", name: "Tapete Training Pro", brand: "BeeSide Fitness", category: "equipamentos", price_old: 189.90, price_new: 149.90, badge: "-21% OFF", image_url: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=85&w=900&auto=format&fit=crop" },
  { slug: "whey-performance", name: "Whey Performance 900 g", brand: "BeeSide Nutrition", category: "suplementos", price_old: 199.90, price_new: 169.90, badge: "MAIS VENDIDO", image_url: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=85&w=900&auto=format&fit=crop" },
  { slug: "creatina-pure", name: "Creatina Pure 300 g", brand: "BeeSide Nutrition", category: "suplementos", price_old: 149.90, price_new: 119.90, badge: "-20% OFF", image_url: "https://images.unsplash.com/photo-1579722820903-4e8f6c85b3b8?q=85&w=900&auto=format&fit=crop" },
  { slug: "energy-protein-bar", name: "Kit Energy Protein Bar", brand: "BeeSide Nutrition", category: "suplementos", price_old: 89.90, price_new: 69.90, badge: "KIT 6 UN.", image_url: "https://images.unsplash.com/photo-1622484212850-eb596d769edc?q=85&w=900&auto=format&fit=crop" },
  { slug: "mochila-athlete", name: "Mochila Athlete 28 L", brand: "BeeSide Gear", category: "mochilas", price_old: 399.90, price_new: 329.90, badge: "-18% OFF", image_url: "https://images.unsplash.com/photo-1622560481156-01780990d8dc?q=85&w=900&auto=format&fit=crop" },
  { slug: "mochila-urban", name: "Mochila Urban Sport 22 L", brand: "BeeSide Lifestyle", category: "mochilas", price_old: 329.90, price_new: 279.90, badge: "NOVIDADE", image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=85&w=900&auto=format&fit=crop" }
];

function beesideFormatarPreco(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function beesideCartaoProdutoHTML(produto) {
  const temDesconto = produto.price_old && produto.price_old > produto.price_new;
  return `
    <article class="product-card" data-product-id="${produto.slug}" data-price="${produto.price_new}">
      <div class="product-media">
        ${produto.badge ? `<span class="product-badge">${produto.badge}</span>` : ""}
        <button class="fav-btn" type="button" aria-label="Favoritar ${produto.name}" aria-pressed="false">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-9.5-8.8C.8 8 2 4.5 5.5 4c2-.3 3.7.7 4.5 2.2C10.8 4.7 12.5 3.7 14.5 4c3.5.5 4.7 4 3 7.2C19 15.6 12 20 12 20Z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>
        </button>
        <img src="${produto.image_url}" alt="${produto.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">${produto.brand || "BeeSide"}</span>
        <h3 class="product-name">${produto.name}</h3>
        <div class="product-price">
          ${temDesconto ? `<span class="price-old">${beesideFormatarPreco(produto.price_old)}</span>` : ""}
          <span class="price-new">${beesideFormatarPreco(produto.price_new)}</span>
        </div>
        <button class="btn btn-add" type="button" data-add-to-cart>Adicionar ao carrinho</button>
      </div>
    </article>`;
}

function beesideAdicionarAoCarrinho(produto) {
  const cart = beesideGetCart();
  const existente = cart.find((item) => item.slug === produto.slug);
  if (existente) existente.quantity += 1;
  else cart.push({ slug: produto.slug, name: produto.name, price: produto.price_new, image: produto.image_url, quantity: 1 });
  localStorage.setItem("beeside_cart", JSON.stringify(cart));
  beesideUpdateCartCount();
}

function beesideRenderizarProdutos(produtos) {
  document.querySelectorAll(".product-grid[data-category]").forEach((grid) => {
    const categoria = grid.dataset.category;
    const lista = produtos.filter((produto) => produto.category === categoria);
    grid.innerHTML = lista.map(beesideCartaoProdutoHTML).join("");
    const contador = document.querySelector(`#${categoria} .product-section-head span`);
    if (contador) contador.textContent = `${lista.length} produto${lista.length === 1 ? "" : "s"}`;
  });
}

async function beesideCarregarProdutos() {
  let produtos = BEESIDE_CATALOGO;
  beesideRenderizarProdutos(produtos);

  try {
    if (typeof beeside !== "undefined") {
      const resposta = await beeside.from("products")
        .select("slug, name, brand, price_old, price_new, badge, image_url, categories(slug)")
        .eq("is_active", true).order("created_at", { ascending: true });
      if (!resposta.error && resposta.data?.length) {
        produtos = resposta.data.map((produto) => ({ ...produto, category: produto.categories?.slug || "outros" }));
      }
    }
  } catch (erro) {
    console.info("Catálogo local BeeSide carregado.", erro);
  }

  beesideRenderizarProdutos(produtos);
  document.querySelector("main")?.addEventListener("click", (evento) => {
    const favorito = evento.target.closest(".fav-btn");
    if (favorito) favorito.setAttribute("aria-pressed", favorito.getAttribute("aria-pressed") !== "true");
    const botao = evento.target.closest("[data-add-to-cart]");
    if (!botao) return;
    const slug = botao.closest(".product-card")?.dataset.productId;
    const produto = produtos.find((item) => item.slug === slug);
    if (!produto) return;
    beesideAdicionarAoCarrinho(produto);
    botao.textContent = "Adicionado ✓";
    setTimeout(() => { botao.textContent = "Adicionar ao carrinho"; }, 1200);
  });
}

document.addEventListener("DOMContentLoaded", beesideCarregarProdutos);
