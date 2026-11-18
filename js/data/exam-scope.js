/*
 * exam-scope.js — Yaklaşan sınavın kapsamı.
 * Vize: algoritma_analizi_H1_H2, Algoritma Performansı, Azalt ve Fethet, Kaba Kuvvet PDF'leri.
 * Özyinelemeli Algoritmaların Matematiksel Analizi ve Böl Fethet PDF'leri vize dışı.
 *   lessons:  '<bölüm>/<ders>': true                → dersin tamamı kapsam dışı
 *             '<bölüm>/<ders>': { from: 'Başlık' }  → o başlıktan sonraki kısım kapsam dışı
 *   chapters: '<bölüm>': true                       → bölümün tamamı kapsam dışı
 */
(function (OSLab) {
  'use strict';

  OSLab.examScope = {
    active: true,
    exam: 'Vize',
    label: 'Vize dışı',
    updated: '18 Kasım 2026',
    reason: {
      ch3: '"Özyinelemeli Algoritmaların Matematiksel Analizi" PDF\'i vize kapsamında değil.',
      ch8: '"Böl Fethet Algoritmaları" PDF\'i vize kapsamında değil.'
    },
    lessons: {
      'ch3/ozyineli': true,
      'ch3/hanoi': true
    },
    chapters: {
      ch8: true
    }
  };
})(window.OSLab = window.OSLab || {});
