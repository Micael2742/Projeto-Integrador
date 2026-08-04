// =====================================================================
// BEESIDE — CABEÇALHO (login/logout + contador do carrinho)
// Incluir em TODAS as páginas, depois de supabase-client.js
// =====================================================================

// ---------- Contador do carrinho (lê o carrinho salvo no navegador) ----------
function beesideGetCart() {
  try {
    return JSON.parse(localStorage.getItem("beeside_cart") || "[]");
  } catch {
    return [];
  }
}

function beesideUpdateCartCount() {
  const cart = beesideGetCart();
  const total = cart.reduce((soma, item) => soma + item.quantity, 0);
  document.querySelectorAll("#cartCount").forEach((el) => {
    el.textContent = total;
  });
}

// ---------- Estado de login no botão "Entre e cadastre" ----------
async function beesideAtualizarBotaoUsuario() {
  const { data } = await beeside.auth.getSession();
  const session = data.session;
  const userBtn = document.querySelector(".user-btn");
  if (!userBtn) return;

  if (session) {
    const { data: perfil } = await beeside
      .from("profiles")
      .select("nome")
      .eq("id", session.user.id)
      .maybeSingle();

    const primeiroNome = (perfil?.nome || session.user.email).split(" ")[0];
    userBtn.setAttribute("href", "#");
    userBtn.querySelector(".user-btn-text").textContent = "Olá, " + primeiroNome;
    userBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      if (confirm("Deseja sair da sua conta?")) {
        await beeside.auth.signOut();
        window.location.href = "index.html";
      }
    });
  } else {
    userBtn.setAttribute("href", "login.html");
    userBtn.querySelector(".user-btn-text").textContent = "Entre e cadastre";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  beesideUpdateCartCount();
  beesideAtualizarBotaoUsuario();
});
