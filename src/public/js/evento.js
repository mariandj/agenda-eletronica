document.addEventListener('DOMContentLoaded', () => {
  const tabela = document.querySelector('table');
  if (!tabela) return;

  tabela.addEventListener('click', async (e) => {
    const alvo = e.target.closest('a,button');
    if (!alvo) return;

    const linha = alvo.closest('tr[data-id]');
    if (!linha) return;

    const id = linha.getAttribute('data-id');

    if (alvo.classList.contains('btn-edit')) {
      e.preventDefault(); 

      const tituloAtual = (linha.children[0]?.textContent || '').trim();
      const descAtual   = (linha.children[1]?.textContent || '').trim();

      const novoTitulo = prompt('Novo título:', tituloAtual);
      if (novoTitulo === null) return;

      const novaDesc = prompt('Nova descrição:', descAtual);
      if (novaDesc === null) return;

      try {
        const resp = await fetch(`/eventos/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ titulo: novoTitulo, descricao: novaDesc })
        });

        if (!resp.ok) {
          const erro = await resp.json().catch(() => ({}));
          alert('Erro ao atualizar: ' + (erro.error || resp.status));
          return;
        }

        if (linha.children[0]) linha.children[0].textContent = novoTitulo;
        if (linha.children[1]) linha.children[1].textContent = novaDesc;
      } catch (err) {
        alert('Erro de rede ao atualizar evento');
      }
    }

    if (alvo.classList.contains('btn-delete')) {
      e.preventDefault(); 

      if (!confirm('Tem certeza que deseja excluir este evento?')) return;

      try {
        const resp = await fetch(`/eventos/${id}`, { method: 'DELETE' });

        if (!resp.ok) {
          const erro = await resp.json().catch(() => ({}));
          alert('Erro ao excluir: ' + (erro.error || resp.status));
          return;
        }

        linha.remove();
      } catch (err) {
        alert('Erro de rede ao excluir evento');
      }
    }
  });
});

function getCookie(name) {
    return document.cookie
      .split('; ')
      .find(r => r.startsWith(name + '='))
      ?.split('=')[1] || '';
  }

  document.getElementById('filtrar-por-titulo').addEventListener('click', (e) => {
    e.preventDefault();
    const ultimo = decodeURIComponent(getCookie('ultimoTitulo') || '');
    const valor = prompt('Filtrar eventos pelo TÍTULO', ultimo);
    if (valor === null) return;              
    const q = valor.trim();
    if (!q) return;                         
    location.href = '/eventos/view/filtro?titulo=' + encodeURIComponent(q);
  });