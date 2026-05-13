export function initRegistrationForm() {
  const FORM_URL = 'https://plantaformas.org/conferences/SoberaniaDigital/f/529/surveys/91/answer';
  const PAGE_URL = 'https://plantaformas.org/conferences/SoberaniaDigital/f/529/';

  const form = document.getElementById('form-inscricao') as HTMLFormElement | null;
  const btn = document.getElementById('btn-submit') as HTMLButtonElement | null;
  const sucesso = document.getElementById('form-sucesso');
  const erro = document.getElementById('form-erro');
  if (!form || !btn || !sucesso || !erro) return;

  function val(id: string): string {
    const el = form!.querySelector('#' + id) as HTMLInputElement | null;
    return el ? el.value.trim() : '';
  }

  function checked(id: string): boolean {
    const el = form!.querySelector('#' + id) as HTMLInputElement | null;
    return el ? el.checked : false;
  }

  function radioVal(name: string): string {
    const el = form!.querySelector('input[name="' + name + '"]:checked') as HTMLInputElement | null;
    return el ? el.value : '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    btn.disabled = true;
    btn.textContent = 'Enviando…';

    fetch(PAGE_URL, { credentials: 'include' })
      .then(function (r) { return r.text(); })
      .then(function (html: string) {
        const m = html.match(/name="csrf-token"\s+content="([^"]+)"/);
        if (!m) throw new Error('CSRF não encontrado');
        const csrf = m[1];

        const hm = html.match(/name="((?:fegjto|another_fake)[^"]+)"[^>]*Se é humano/);
        const honeypotName = hm ? hm[1] : '';

        const body = new URLSearchParams();
        body.set('authenticity_token', csrf);
        if (honeypotName) body.set(honeypotName, '');

        const fields = [
          { id: '870', v: val('nome') },
          { id: '871', v: val('data_nascimento') },
          { id: '872', v: val('cpf') },
          { id: '873', v: val('email') },
          { id: '874', v: val('telefone') },
          { id: '875', v: val('estado') },
          { id: '876', v: val('cidade') },
          { id: '877', v: val('comunidade') },
          { id: '878', v: val('coletivo_organizacao') },
          { id: '879', v: val('funcao_atuacao') }
        ];

        fields.forEach(function (f, i) {
          body.set('questionnaire[responses][' + i + '][question_id]', f.id);
          body.set('questionnaire[responses][' + i + '][body]', f.v || 'Não informado');
        });

        body.set('questionnaire[responses][10][question_id]', '880');
        var partIdx = 0;
        if (checked('participacao_dia18')) {
          body.set('questionnaire[responses][10][choices][' + partIdx + '][body]', 'Dia 18 de Maio');
          body.set('questionnaire[responses][10][choices][' + partIdx + '][answer_option_id]', '1818');
          partIdx++;
        }
        if (checked('participacao_dia19')) {
          body.set('questionnaire[responses][10][choices][' + partIdx + '][body]', 'Dia 19 de Maio');
          body.set('questionnaire[responses][10][choices][' + partIdx + '][answer_option_id]', '1819');
          partIdx++;
        }

        const condicoesMap: Record<string, { body: string; id: string }> = {
          'conta_propria':     { body: 'Consigo ir por conta própria', id: '1822' },
          'apoio_transporte':  { body: 'Preciso de Apoio com Transporte e Hospedagem para ir ao evento', id: '1823' },
          'convite_oficial':   { body: 'Preciso de Convite Oficial para viabilizar Transporte e Hospedagem pela minha organização', id: '1824' }
        };
        const condVal = radioVal('condicoes_deslocamento');
        const cond = condicoesMap[condVal];
        body.set('questionnaire[responses][11][question_id]', '881');
        if (cond) {
          body.set('questionnaire[responses][11][choices][][body]', cond.body);
          body.set('questionnaire[responses][11][choices][][answer_option_id]', cond.id);
        }

        body.set('questionnaire[tos_agreement]', checked('tos_agreement') ? '1' : '0');

        return fetch(FORM_URL, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString()
        });
      })
      .then(function (r) {
        if (r.redirected || r.ok) {
          form!.style.display = 'none';
          erro.classList.add('hidden');
          sucesso.classList.remove('hidden');
        } else {
          throw new Error('HTTP ' + r.status);
        }
      })
      .catch(function (err) {
        console.error('Erro inscrição:', err);
        form!.style.display = 'none';
        sucesso.classList.add('hidden');
        erro.classList.remove('hidden');
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = 'Enviar inscrição';
      });
  });

  const btnRetry = document.getElementById('btn-tentar-novamente');
  if (btnRetry) {
    btnRetry.addEventListener('click', function () {
      erro.classList.add('hidden');
      form.style.display = '';
    });
  }
}
