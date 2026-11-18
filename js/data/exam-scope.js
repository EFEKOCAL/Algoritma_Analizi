/*
 * exam-scope.js — Yaklaşan sınavın kapsamı.
 * Sitedeki bütün dersler vize kapsamındadır (1–7. hafta ve lab uygulamaları); kapsam dışı ders yok.
 * Hoca bir konuyu çıkarırsa buraya ekleyin:
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
    reason: {},
    lessons: {},
    chapters: {}
  };
})(window.OSLab = window.OSLab || {});
