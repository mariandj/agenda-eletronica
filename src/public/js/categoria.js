document.addEventListener('DOMContentLoaded', () => {
  const tabela = document.querySelector('table');
  if (!tabela) return; 

  tabela.addEventListener('click', async (e) => {
    const btn = e.target;
    const linha = btn.closest('tr[data-id]');
    if (!linha) return;
    const id = linha.getAttribute('data-id');

    if (btn.classList.contains('btn-edit')) {
      e.preventDefault();
      const nomeAtual = linha.children[0].textContent.trim();
      const corSpanTexto = linha.querySelector('.cor-texto');
      const corAtual = corSpanTexto ? corSpanTexto.textContent.trim() : '';

      const novoNome = prompt('Novo nome da categoria:', nomeAtual);
      if (novoNome === null) return;

      const novaCor = prompt('Nova cor (ex: #00A884):', corAtual);
      if (novaCor === null) return;

      try {
        const resp = await fetch(`/categorias/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: novoNome, cor: novaCor })
        });
        if (!resp.ok) {
          const erro = await resp.json().catch(() => ({}));
          alert('Erro ao atualizar: ' + (erro.error || resp.status));
          return;
        }

        linha.children[0].textContent = novoNome;
        if (corSpanTexto) corSpanTexto.textContent = novaCor;
        const quadrado = linha.querySelector('.cor-quadrado');
        if (quadrado) quadrado.style.backgroundColor = novaCor || 'transparent';
      } catch (err) {
        alert('Erro de rede ao atualizar categoria');
      }
    }

    if (btn.classList.contains('btn-delete')) {
      e.preventDefault();
      if (!confirm('Tem certeza que deseja excluir esta categoria?')) return;

      try {
        const resp = await fetch(`/categorias/${id}`, { method: 'DELETE' });
        if (!resp.ok) {
          const erro = await resp.json().catch(() => ({}));
          alert('Erro ao excluir: ' + (erro.error || resp.status));
          return;
        }
        linha.remove();
      } catch (err) {
        alert('Erro de rede ao excluir categoria');
      }
    }
  });
});