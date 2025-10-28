console.log('lgpd.js carregado');

(function () {
  'use strict';

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  document.addEventListener('DOMContentLoaded', () => {
    try {
      // FADE-IN AO SCROLL
      const fadeEls = document.querySelectorAll('.fade-in');
      if (fadeEls.length > 0) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        fadeEls.forEach(el => observer.observe(el));
      }

      // CURIOSIDADES
      const curiosidades = [
        "A LGPD foi inspirada na GDPR europeia.",
        "Ela garante que todos os cidadãos possam controlar seus dados pessoais.",
        "Empresas podem ser multadas em milhões se descumprirem a LGPD.",
        "A ANPD é responsável por fiscalizar o cumprimento da LGPD no Brasil."
      ];
      const btnCuriosidade = document.getElementById('btnCuriosidade');
      const curiosidadeEl = document.getElementById('curiosidade');
      if (btnCuriosidade && curiosidadeEl) {
        btnCuriosidade.addEventListener('click', () => {
          const index = Math.floor(Math.random() * curiosidades.length);
          curiosidadeEl.textContent = curiosidades[index];
          if (window.AOS && typeof AOS.refresh === 'function') AOS.refresh();
        });
      }

      // QUIZ SIMPLES
      const quizBtns = document.querySelectorAll('.quiz-btn');
      const resultadoQuiz = document.getElementById('resultadoQuiz');
      if (quizBtns && quizBtns.length > 0 && resultadoQuiz) {
        quizBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            const text = (btn.textContent || '').trim().toLowerCase();
            if (text === 'lei geral de proteção de dados') {
              resultadoQuiz.textContent = '✅ Correto! LGPD significa Lei Geral de Proteção de Dados.';
              resultadoQuiz.style.color = '#4a00e0';
            } else {
              resultadoQuiz.textContent = '❌ Errado. Tente novamente!';
              resultadoQuiz.style.color = '#dc3545';
            }
          });
        });
      }

      // FORMULÁRIO DE EXCLUSÃO DE DADOS
      const formLgpd = document.getElementById('formLgpd');
      const mensagem = document.getElementById('mensagem');
      if (formLgpd && mensagem) {
        // prevenir múltiplos listeners (se recarregar módulo)
        formLgpd.addEventListener('submit', (e) => {
          e.preventDefault();
          const nome = (document.getElementById('nome') || {}).value || '';
          const email = (document.getElementById('email') || {}).value || '';

          if (nome.trim() && email.trim()) {
            const cardHtml = `
              <div class="card text-center mt-3 mx-auto" style="max-width:540px;">
                <div class="card-header bg-success text-white">
                  <i class="bi bi-check-circle"></i> Sucesso
                </div>
                <div class="card-body">
                  <h5 class="card-title">Solicitação de Exclusão Enviada</h5>
                  <p class="card-text">Olá ${escapeHtml(nome.trim())}, sua solicitação foi registrada com sucesso!</p>
                  <p class="card-text"><small class="text-muted">Um e-mail de confirmação será enviado para ${escapeHtml(email.trim())}.</small></p>
                </div>
              </div>
            `;
            mensagem.innerHTML = cardHtml;
            if (window.AOS && typeof AOS.refresh === 'function') AOS.refresh();
            formLgpd.reset();
          } else {
            mensagem.innerHTML = `
              <div class="alert alert-danger" role="alert">
                <i class="bi bi-exclamation-triangle"></i> Por favor, preencha todos os campos.
              </div>
            `;
          }
        });
      }

      // CONTADORES (opcional)
      const observerCounters = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !entry.target.classList.contains('animated')) {
              const targetValue = parseInt(statNumber.textContent, 10);
              if (!isNaN(targetValue)) {
                let start = 0;
                const duration = 2000;
                const increment = targetValue / (duration / 16);
                const timer = setInterval(() => {
                  start += increment;
                  if (start >= targetValue) {
                    statNumber.textContent = targetValue + '%';
                    clearInterval(timer);
                  } else {
                    statNumber.textContent = Math.floor(start) + '%';
                  }
                }, 16);
              }
              entry.target.classList.add('animated');
              obs.unobserve(entry.target);
            }
          }
        });
      }, { threshold: 0.5 });

      document.querySelectorAll('.card.stats').forEach(card => observerCounters.observe(card));

      // SMOOTH SCROLL PARA LINKS INTERNOS
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          const href = this.getAttribute('href');
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });

    } catch (err) {
      console.error('Erro em lgpd.js:', err);
    }
  });
})();