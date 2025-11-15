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
          const emailAtual = linha.children[1].textContent.trim();

          const novoNome = prompt('Novo nome:', nomeAtual);
          if (novoNome === null) return;

          const novoEmail = prompt('Novo e-mail:', emailAtual);
          if (novoEmail === null) return;

          try {
            const resp = await fetch(`/usuarios/${id}`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ nome: novoNome, email: novoEmail })
            });
            if (!resp.ok) {
              const erro = await resp.json().catch(() => ({}));
              alert('Erro ao atualizar: ' + (erro.error || resp.status));
              return;
            }
            linha.children[0].textContent = novoNome;
            linha.children[1].textContent = novoEmail;
          } catch (err) {
            alert('Erro de rede ao atualizar usuário');
          }
        }

        if (btn.classList.contains('btn-delete')) {
          e.preventDefault(); 
          if (!confirm('Tem certeza que deseja excluir este usuário?')) return;

          try {
            const resp = await fetch(`/usuarios/${id}`, { method: 'DELETE' });
            if (!resp.ok) {
              const erro = await resp.json().catch(() => ({}));
              alert('Erro ao excluir: ' + (erro.error || resp.status));
              return;
            }
            linha.remove();
          } catch (err) {
            alert('Erro de rede ao excluir usuário');
          }
        }
      });
    });