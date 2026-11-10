(function () {
  'use strict'
  // Arizalar mavjud oqimga ketadi: qabul-bot /api/lead → operator Telegram guruhi + leads.db.
  // CORS faqat viamed-clinic.github.io uchun ochiq — boshqa domenga ko'chirilsa nginx'ga qo'shish kerak.
  var ENDPOINT = 'https://viamed.azimboyev.uz/api/lead'
  var C = window.CONTENT
  var ICONS = {
    award: '<path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"/><path d="M8.2 13.9 7 23l5-3 5 3-1.2-9.1"/>',
    dna: '<path d="M2 15c6.7-6 13.3 0 20-6M2 9c6.7 6 13.3 0 20 6M5 10.5v3M9 9.2v5.6M15 9.2v5.6M19 10.5v3"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    check: '<path d="M5 12l5 5L20 7"/>',
    drop: '<path d="M12 2.7l5.7 5.6a8 8 0 1 1-11.3 0z"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'
  }
  function icon(name, size) {
    return '<svg width="' + (size || 20) + '" height="' + (size || 20) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.check) + '</svg>'
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] }) }
  function money(n) { return n.toLocaleString('ru-RU').replace(/,/g, ' ') }

  var lang = 'uz'
  try { var saved = localStorage.getItem('vm_lang'); if (saved === 'ru' || saved === 'uz') lang = saved } catch (e) {}
  if (/[?&]lang=ru\b/.test(location.search)) lang = 'ru'

  var params = new URLSearchParams(location.search)
  var utm = {
    source: (params.get('utm_source') || params.get('src') || 'genetik-landing').slice(0, 60),
    campaign: (params.get('utm_campaign') || '').slice(0, 80),
    content: (params.get('utm_content') || '').slice(0, 80)
  }

  function t(key) { var v = C[lang][key]; return v == null ? C.uz[key] : v }

  function render() {
    var L = C[lang]
    document.documentElement.lang = lang
    document.title = t('meta_title')
    document.querySelectorAll('[data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)) })
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.dataset.i18n) })
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) { el.innerHTML = t(el.dataset.i18nHtml) })
    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) { el.alt = t(el.dataset.i18nAlt) })
    document.querySelectorAll('[data-i18n-list]').forEach(function (el) {
      el.innerHTML = t(el.dataset.i18nList).map(function (x) {
        return '<li><span class="ic">' + icon(x[0], 18) + '</span><span>' + esc(x[1]) + '</span></li>'
      }).join('')
    })

    document.getElementById('creds').innerHTML = t('creds').map(function (c) {
      return '<li' + (c.todo ? ' class="todo" title="Tasdiqlanishi kerak"' : '') + '><span class="ic">' + icon(c.icon) + '</span><div><b>' + esc(c.title) + '</b><span>' + esc(c.text) + '</span></div></li>'
    }).join('')
    document.getElementById('story').innerHTML = t('story').map(function (p, i) {
      return '<p' + (i === t('story').length - 1 ? ' class="pull"' : '') + '>' + esc(p) + '</p>'
    }).join('')
    var q = t('doc_quote')
    document.getElementById('quote').hidden = !q

    document.getElementById('who-cards').innerHTML = t('who').map(function (c) {
      return '<div class="card"><div class="ic">' + icon(c.icon, 22) + '</div><h3>' + esc(c.title) + '</h3><p>' + esc(c.text) + '</p></div>'
    }).join('')

    document.getElementById('steps').innerHTML = t('steps').map(function (s) {
      return '<li><b>' + esc(s[0]) + '</b><span>' + esc(s[1]) + '</span></li>'
    }).join('')

    document.getElementById('plan-grid').innerHTML = C.plans.map(function (p, i) {
      var tx = L.plans[i]
      return '<div class="plan' + (p.featured ? ' feat' : '') + '">' + (p.featured ? '<span class="tag">' + esc(t('plan_badge')) + '</span>' : '') +
        '<h3>' + esc(p.name) + '</h3><div class="tl">' + esc(tx.tagline) + '</div>' +
        '<div class="price">' + money(p.price) + ' <small>' + esc(t('sum')) + '</small></div>' +
        '<ul>' + tx.items.map(function (x) { return '<li>' + esc(x) + '</li>' }).join('') + '</ul>' +
        '<a class="btn ' + (p.featured ? 'btn-primary' : 'btn-outline') + '" href="#yozilish" data-plan="' + p.key + '">' + esc(t('plan_cta')) + '</a></div>'
    }).join('')

    document.getElementById('faq').innerHTML = t('faq').map(function (f) {
      return '<details><summary>' + esc(f[0]) + '</summary><p>' + esc(f[1]) + '</p></details>'
    }).join('')

    var chips = document.getElementById('plan-chips')
    var cur = (chips.querySelector('input:checked') || {}).value || 'consult'
    var opts = [{ key: 'consult', label: t('opt_consult'), extra: '<small class="free">' + esc(t('free')) + '</small>' }].concat(C.plans.map(function (p) {
      return { key: p.key, label: p.name, extra: '<small>' + money(p.price) + ' ' + esc(t('sum')) + '</small>' }
    }))
    chips.innerHTML = opts.map(function (o) {
      return '<label class="chip"><input type="radio" name="plan" value="' + o.key + '"' + (o.key === cur ? ' checked' : '') + '><span>' + esc(o.label) + o.extra + '</span></label>'
    }).join('')

    var week = document.getElementById('week')
    var wv = week.value
    week.innerHTML = C.weeks.map(function (w, i) { return '<option value="' + i + '">' + esc(L.weeks[i]) + '</option>' }).join('')
    if (wv) week.value = wv

    document.getElementById('addr').innerHTML = '<b>' + esc(t('foot_addr')) + '</b>' + L.addresses.map(function (a) {
      return '<div>' + esc(a[0]) + ', ' + esc(a[1]) + '<br><small>' + esc(a[2]) + '</small></div>'
    }).join('')
  }

  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.dataset.lang
      try { localStorage.setItem('vm_lang', lang) } catch (e) {}
      render()
    })
  })

  // "Yozilish" tugmalari kerakli variantni formada tanlab qo'yadi
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-plan]')
    if (!a) return
    var r = document.querySelector('#plan-chips input[value="' + a.dataset.plan + '"]')
    if (r) r.checked = true
  })

  // Telefon: +998 XX XXX XX XX
  var phone = document.getElementById('phone')
  function digits(v) { var d = v.replace(/\D/g, ''); if (d.indexOf('998') === 0) d = d.slice(3); return d.slice(0, 9) }
  function fmt(d) {
    var out = '+998'
    if (d.length) out += ' ' + d.slice(0, 2)
    if (d.length > 2) out += ' ' + d.slice(2, 5)
    if (d.length > 5) out += ' ' + d.slice(5, 7)
    if (d.length > 7) out += ' ' + d.slice(7, 9)
    return out
  }
  phone.addEventListener('focus', function () { if (!phone.value) phone.value = '+998 ' })
  phone.addEventListener('input', function () { phone.value = fmt(digits(phone.value)); document.getElementById('f-phone').classList.remove('bad') })
  document.getElementById('name').addEventListener('input', function () { document.getElementById('f-name').classList.remove('bad') })

  var form = document.getElementById('lead-form')
  var alertBox = document.getElementById('form-alert')
  var btn = document.getElementById('submit')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    alertBox.classList.remove('show')
    var name = form.name.value.trim()
    var d = digits(phone.value)
    var ok = true
    if (name.length < 2) { document.getElementById('f-name').classList.add('bad'); ok = false }
    if (d.length !== 9) { document.getElementById('f-phone').classList.add('bad'); ok = false }
    if (!ok) { (name.length < 2 ? form.name : phone).focus(); return }

    var planKey = (form.querySelector('input[name=plan]:checked') || {}).value || 'consult'
    var plan = C.plans.filter(function (p) { return p.key === planKey })[0]
    var payload = {
      name: name,
      phone: '+998' + d,
      // qabul-bot faqat ma'lum tarif nomlarini qabul qiladi; maslahat = "Bilmayman, maslahat kerak"
      plan: plan ? plan.name : 'Bilmayman, maslahat kerak',
      week: C.weeks[Number(form.week.value) || 0],
      source: utm.source,
      campaign: utm.campaign,
      content: utm.content || (plan ? 'NIPT' : 'Bepul genetik maslahat'),
      website: form.website.value
    }
    btn.disabled = true
    btn.textContent = t('f_sending')
    // Ko'rib chiqish nusxasi (claude.ai havolasi): ariza yuborilmaydi, faqat natija ekrani ko'rsatiladi
    var send = window.REVIEW_MODE
      ? Promise.resolve({ ok: true, json: function () { return { ok: true } } })
      : fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    send
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json() })
      .then(function (j) {
        if (!j.ok) throw new Error('not ok')
        document.getElementById('ok-title').textContent = t('ok_title').replace('{name}', name)
        document.getElementById('form-box').classList.add('sent')
        try { if (window.fbq) window.fbq('track', 'Lead') } catch (e2) {}
      })
      .catch(function (err) {
        alertBox.textContent = String(err.message) === '429' ? t('e_rate') : t('e_send')
        alertBox.classList.add('show')
      })
      .then(function () { btn.disabled = false; btn.textContent = t('f_submit') })
  })

  // Mobil pastki tugma: hero'dan o'tgach ko'rinadi, forma ko'rinayotganda yashirinadi
  var sticky = document.getElementById('sticky')
  var heroGone = false, formSeen = false
  function upd() { sticky.classList.toggle('show', heroGone && !formSeen) }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { heroGone = !es[0].isIntersecting; upd() }).observe(document.querySelector('.hero'))
    new IntersectionObserver(function (es) { formSeen = es[0].isIntersecting; upd() }, { threshold: .15 }).observe(document.getElementById('yozilish'))
  }

  render()
})()
