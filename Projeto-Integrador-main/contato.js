// =====================================================================
// BEESIDE — FORMULÁRIO DE CONTATO (contato.html)
// Incluir depois de supabase-client.js
// =====================================================================
const formContato = document.querySelector(".contact-page-form");

if (formContato) {
  formContato.addEventListener("submit", async (e) => {
    e.preventDefault();
    const feedback = formContato.querySelector(".form-feedback");
    const botao = formContato.querySelector("button[type=submit]");

    const mensagem = {
      nome: document.getElementById("pageContactName").value.trim(),
      email: document.getElementById("pageContactEmail").value.trim(),
      telefone: document.getElementById("pageContactPhone").value.trim(),
      assunto: document.getElementById("pageContactSubject").value.trim(),
      mensagem: document.getElementById("pageContactMessage").value.trim(),
    };

    botao.disabled = true;
    feedback.textContent = "Enviando mensagem...";
    feedback.style.color = "#1c8a4c";

    const { error } = await beeside.from("contact_messages").insert(mensagem);

    botao.disabled = false;

    if (error) {
      feedback.textContent = "Não foi possível enviar sua mensagem. Tente novamente.";
      feedback.style.color = "#c0392b";
      return;
    }

    feedback.textContent = "Mensagem enviada! Nossa equipe vai te responder em breve.";
    feedback.style.color = "#1c8a4c";
    formContato.reset();
  });
}
