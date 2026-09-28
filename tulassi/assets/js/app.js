(() => {
  "use strict";
  const SESSION_KEY = "tulassi.profile.v1";
  const BOOKING_PREFIX = "tulassi.bookings.v1.";
  const page = document.body.dataset.page;
  const byId = (id) => document.getElementById(id);
  const storage = {
    get(area, key) { try { return area.getItem(key); } catch { return null; } },
    set(area, key, value) { try { area.setItem(key, value); return true; } catch { return false; } },
    remove(area, key) { try { area.removeItem(key); } catch { /* storage may be blocked */ } }
  };
  const profile = (() => {
    try {
      const parsed = JSON.parse(storage.get(sessionStorage, SESSION_KEY));
      return parsed && typeof parsed.name === "string" && typeof parsed.email === "string" ? parsed : null;
    } catch { return null; }
  })();
  if (page !== "login" && !profile) { location.replace("index.html"); return; }
  if (page === "login" && profile) { location.replace("dashboard.html"); return; }
  function key() { return BOOKING_PREFIX + profile.email.toLowerCase(); }
  function bookings() {
    try {
      const data = JSON.parse(storage.get(localStorage, key()) || "[]");
      return Array.isArray(data) ? data.filter(item => item && typeof item.date === "string" && typeof item.time === "string" && typeof item.service === "string") : [];
    } catch { return []; }
  }
  function clearErrors(form) {
    byId("form-error").hidden = true;
    form.querySelectorAll("[aria-invalid]").forEach(node => node.removeAttribute("aria-invalid"));
    form.querySelectorAll(".field-error").forEach(node => { node.textContent = ""; });
  }
  function showErrors(form, errors) {
    const entries = Object.entries(errors);
    entries.forEach(([id, message]) => {
      const input = byId(id);
      input.setAttribute("aria-invalid", "true");
      byId(id + "-error").textContent = message;
    });
    const banner = byId("form-error");
    banner.textContent = "Confira os campos indicados e tente novamente.";
    banner.hidden = false;
    byId(entries[0][0]).focus();
  }
  function login() {
    const form = byId("login-form");
    form.addEventListener("submit", event => {
      event.preventDefault(); clearErrors(form);
      const name = byId("nome").value.trim().replace(/\s+/g, " ");
      const email = byId("email").value.trim().toLowerCase();
      const errors = {};
      if (name.length < 2) errors.nome = "Informe um nome com pelo menos 2 caracteres.";
      if (!byId("email").validity.valid || !email) errors.email = "Informe um e-mail válido.";
      if (Object.keys(errors).length) return showErrors(form, errors);
      if (!storage.set(sessionStorage, SESSION_KEY, JSON.stringify({ name, email }))) {
        const banner = byId("form-error"); banner.textContent = "Este navegador bloqueou os dados da demonstração. Permita o armazenamento e tente novamente."; banner.hidden = false; return;
      }
      location.assign("dashboard.html");
    });
  }
  function localDate(iso) {
    const [year, month, day] = iso.split("-").map(Number);
    const value = new Date(year, month - 1, day);
    if (!year || !month || !day || value.getFullYear() !== year || value.getMonth() !== month - 1 || value.getDate() !== day) return null;
    return value;
  }
  function dashboard() {
    byId("welcome-name").textContent = profile.name.split(" ")[0];
    const items = bookings().sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
    const body = byId("session-rows");
    byId("session-count").textContent = items.length === 1 ? "1 solicitação" : `${items.length} solicitações`;
    byId("empty-state").hidden = items.length !== 0;
    items.forEach(item => {
      const date = localDate(item.date);
      if (!date) return;
      const row = document.createElement("tr");
      const values = [`${new Intl.DateTimeFormat("pt-BR").format(date)} · ${item.time}`, item.service, item.mode || "Presencial"];
      values.forEach(value => { const cell = document.createElement("td"); cell.textContent = value; row.append(cell); });
      const status = document.createElement("td"); const badge = document.createElement("span"); badge.className = "badge"; badge.textContent = "Salvo neste navegador"; status.append(badge); row.append(status); body.append(row);
    });
    if (new URLSearchParams(location.search).get("salvo") === "1") {
      const status = byId("status-message"); status.textContent = "Solicitação salva neste navegador. Confira os dados abaixo."; status.hidden = false; status.focus();
      history.replaceState(null, "", location.pathname);
    }
  }
  function schedule() {
    const form = byId("schedule-form");
    const today = new Date();
    const dateInput = byId("data");
    dateInput.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    form.addEventListener("submit", event => {
      event.preventDefault(); clearErrors(form);
      const service = byId("servico").value;
      const date = dateInput.value;
      const time = byId("horario").value;
      const mode = form.elements.modalidade.value;
      const errors = {};
      if (!service) errors.servico = "Selecione um tipo de sessão.";
      const selected = localDate(date);
      if (!selected || date < dateInput.min) errors.data = "Escolha uma data válida a partir de hoje.";
      const minutes = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time);
      if (!minutes || time < "08:00" || time > "18:00" || Number(minutes[2]) % 30 !== 0) errors.horario = "Escolha um horário entre 08h e 18h, a cada 30 minutos.";
      if (selected && date === dateInput.min && minutes && new Date().getHours() * 60 + new Date().getMinutes() >= Number(minutes[1]) * 60 + Number(minutes[2])) errors.horario = "Escolha um horário futuro.";
      if (!byId("ciente").checked) errors.ciente = "Confirme que entendeu o caráter demonstrativo.";
      if (Object.keys(errors).length) return showErrors(form, errors);
      const item = { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, service, date, time, mode, notes: byId("observacoes").value.trim().slice(0, 300) };
      const saved = storage.set(localStorage, key(), JSON.stringify([...bookings(), item]));
      if (!saved) { const banner = byId("form-error"); banner.textContent = "Não foi possível salvar. Verifique o espaço e as permissões do navegador e tente novamente."; banner.hidden = false; banner.focus(); return; }
      location.assign("dashboard.html?salvo=1");
    });
  }
  document.querySelectorAll("[data-logout]").forEach(link => link.addEventListener("click", event => { event.preventDefault(); storage.remove(sessionStorage, SESSION_KEY); location.assign("index.html"); }));
  if (page === "login") login();
  if (page === "dashboard") dashboard();
  if (page === "schedule") schedule();
})();
