(function () {
  'use strict'
  // Arizalar VIAMED CRM'ga tushadi (viamed-api: /api/v1/public/web-lead) va operator Telegram guruhiga xabar ketadi.
  // 2-qadam (ixtiyoriy): bemor holati va tahlillari — faqat serverda saqlanadi, CRM orqali ochiladi.
  // CORS: viamed-api CORS_ORIGINS da sahifa domeni bo'lishi kerak.
  var API = window.LEAD_API || 'https://viamed.azimboyev.uz/api/v1/public/web-lead'
  var REVIEW = !!window.REVIEW_MODE // ko'rib chiqish nusxasi: hech narsa yuborilmaydi
  var MAX_FILES = 5
  var MAX_SIZE = 10 * 1024 * 1024
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
  function $(id) { return document.getElementById(id) }

  var lang = 'uz'
  try { var saved = localStorage.getItem('vm_lang'); if (saved === 'ru' || saved === 'uz') lang = saved } catch (e) {}
  if (/[?&]lang=ru\b/.test(location.search)) lang = 'ru'

  var params = new URLSearchParams(location.search)
  var utm = {
    source: (params.get('utm_source') || params.get('src') || 'genetik-landing').slice(0, 60),
    campaign: (params.get('utm_campaign') || '').slice(0, 80),
    content: (params.get('utm_content') || '').slice(0, 80)
  }

  var state = { plan: 'consult', token: '', name: '', files: [] }

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

    $('creds').innerHTML = t('creds').map(function (c) {
      return '<li><span class="ic">' + icon(c.icon) + '</span><div><b>' + esc(c.title) + '</b><span>' + esc(c.text) + '</span></div></li>'
    }).join('')
    $('story').innerHTML = t('story').map(function (p, i, a) {
      return '<p' + (i === a.length - 1 ? ' class="pull"' : '') + '>' + esc(p) + '</p>'
    }).join('')
    $('quote').hidden = !t('doc_quote')

    $('who-cards').innerHTML = t('who').map(function (c) {
      return '<div class="card"><div class="ic">' + icon(c.icon, 22) + '</div><h3>' + esc(c.title) + '</h3><p>' + esc(c.text) + '</p></div>'
    }).join('')
    $('steps').innerHTML = t('steps').map(function (s) { return '<li><b>' + esc(s[0]) + '</b><span>' + esc(s[1]) + '</span></li>' }).join('')

    $('plan-grid').innerHTML = C.plans.map(function (p, i) {
      var tx = L.plans[i]
      return '<div class="plan' + (p.featured ? ' feat' : '') + '">' + (p.featured ? '<span class="tag">' + esc(t('plan_badge')) + '</span>' : '') +
        '<h3>' + esc(p.name) + '</h3><div class="tl">' + esc(tx.tagline) + '</div>' +
        '<div class="price">' + money(p.price) + ' <small>' + esc(t('sum')) + '</small></div>' +
        '<ul>' + tx.items.map(function (x) { return '<li>' + esc(x) + '</li>' }).join('') + '</ul>' +
        '<a class="btn ' + (p.featured ? 'btn-primary' : 'btn-outline') + '" href="#yozilish" data-plan="' + p.key + '">' + esc(t('plan_cta')) + '</a></div>'
    }).join('')

    $('faq').innerHTML = t('faq').map(function (f) { return '<details><summary>' + esc(f[0]) + '</summary><p>' + esc(f[1]) + '</p></details>' }).join('')

    var chips = $('problem-chips')
    var cur = (chips.querySelector('input:checked') || {}).value
    chips.innerHTML = C.problemKeys.map(function (k, i) {
      return '<label class="chip"><input type="radio" name="problem" value="' + k + '"' + (k === cur ? ' checked' : '') + '><span>' + esc(L.problems[i]) + '</span></label>'
    }).join('')

    var week = $('week'), wv = week.value
    week.innerHTML = C.weekKeys.map(function (k, i) { return '<option value="' + esc(k) + '">' + esc(L.weeks[i]) + '</option>' }).join('')
    week.value = wv || ''

    renderPicked()
    if (state.name) $('s2-title').textContent = t('s2_title').replace('{name}', state.name)
    renderFiles()

    $('addr').innerHTML = '<b>' + esc(t('foot_addr')) + '</b>' + L.addresses.map(function (a) {
      return '<div>' + esc(a[0]) + ', ' + esc(a[1]) + '<br><small>' + esc(a[2]) + '</small></div>'
    }).join('')
  }

  function renderPicked() {
    var p = C.plans.filter(function (x) { return x.key === state.plan })[0]
    $('picked').hidden = !p
    if (p) $('picked-text').textContent = t('picked').replace('{plan}', p.name + ' · ' + money(p.price) + ' ' + t('sum'))
  }

  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      lang = b.dataset.lang
      try { localStorage.setItem('vm_lang', lang) } catch (e) {}
      render()
    })
  })

  // Tarif tugmasi formada shu tarifni belgilaydi; "maslahat" tugmasi — bepul maslahat
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-plan]')
    if (!a) return
    state.plan = a.dataset.plan
    renderPicked()
  })
  $('picked-x').addEventListener('click', function () { state.plan = 'consult'; renderPicked() })

  // Telefon: +998 XX XXX XX XX
  var phone = $('phone')
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
  phone.addEventListener('input', function () { phone.value = fmt(digits(phone.value)); $('f-phone').classList.remove('bad') })
  $('name').addEventListener('input', function () { $('f-name').classList.remove('bad') })

  function post(path, body) {
    if (REVIEW) return new Promise(function (res) { setTimeout(function () { res({ ok: true, token: 'review' }) }, 400) })
    return fetch(API + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      .then(function (r) { return r.json().catch(function () { return {} }).then(function (j) { if (!r.ok) { var e = new Error(j.message || r.status); e.status = r.status; throw e } return j }) })
  }

  /* --- 1-qadam --- */
  var form = $('lead-form'), alertBox = $('form-alert'), btn = $('submit')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    alertBox.classList.remove('show')
    var name = form.name.value.trim()
    var d = digits(phone.value)
    var ok = true
    if (name.length < 2) { $('f-name').classList.add('bad'); ok = false }
    if (d.length !== 9) { $('f-phone').classList.add('bad'); ok = false }
    if (!ok) { (name.length < 2 ? form.name : phone).focus(); return }
    var problem = (form.querySelector('input[name=problem]:checked') || {}).value || ''
    var wk = $('week').value
    btn.disabled = true
    btn.textContent = t('f_sending')
    post('', {
      name: name,
      phone: '+998' + d,
      plan: state.plan,
      problem: problem,
      weeks: wk && wk !== 'no' ? wk : '',
      pregnant: wk === 'no' ? 'no' : '',
      source: utm.source,
      campaign: utm.campaign,
      content: utm.content,
      website: form.website.value
    }).then(function (j) {
      state.token = j.token || ''
      state.name = name
      try { if (window.fbq) window.fbq('track', 'Lead') } catch (e2) {}
      form.hidden = true
      $('s2-title').textContent = t('s2_title').replace('{name}', name)
      $('details-form').hidden = false
      $('form-box').scrollIntoView({ behavior: 'smooth', block: 'start' })
    }).catch(function (err) {
      alertBox.textContent = err.status === 429 ? t('e_rate') : t('e_send')
      alertBox.classList.add('show')
    }).then(function () { btn.disabled = false; btn.textContent = t('f_submit') })
  })

  /* --- 2-qadam --- */
  function finish(withDetails) {
    $('ok-title').textContent = withDetails ? t('ok_title2') : t('ok_title').replace('{name}', state.name)
    $('ok-text').textContent = withDetails ? t('ok_text2') : t('ok_text')
    $('form-box').classList.add('sent')
  }
  $('details-skip').addEventListener('click', function () { finish(false) })

  function renderFiles() {
    $('file-list').innerHTML = state.files.map(function (f, i) {
      var st = f.status === 'ok' ? '<span class="st ok">✓</span>'
        : f.status === 'up' ? '<span class="st">' + esc(t('s2_sending')) + '</span>'
        : f.error ? '<span class="st bad">' + esc(t(f.error)) + '</span>' : '<span class="st">' + Math.max(1, Math.round(f.file.size / 1024)) + ' KB</span>'
      return '<li><span aria-hidden="true">' + (/pdf/.test(f.file.type) ? '📄' : '🖼') + '</span><span class="nm">' + esc(f.file.name) + '</span>' + st +
        (f.status ? '' : '<button type="button" data-rm="' + i + '" aria-label="✕">✕</button>') + '</li>'
    }).join('')
  }
  $('file-list').addEventListener('click', function (e) {
    var b = e.target.closest('[data-rm]')
    if (b) { state.files.splice(Number(b.dataset.rm), 1); renderFiles() }
  })
  $('files').addEventListener('change', function (e) {
    var list = Array.prototype.slice.call(e.target.files || [])
    $('details-alert').classList.remove('show')
    list.forEach(function (file) {
      if (state.files.length >= MAX_FILES) return showDetailsError(t('s2_max'))
      var item = { file: file }
      if (!/^image\//.test(file.type) && file.type !== 'application/pdf' && !/\.(pdf|heic|heif|jpe?g|png|webp)$/i.test(file.name)) item.error = 's2_bad_type'
      else if (file.size > MAX_SIZE && !/^image\/(jpeg|png|webp)$/.test(file.type)) item.error = 's2_too_big'
      state.files.push(item)
    })
    e.target.value = ''
    renderFiles()
  })

  // Telefondan olingan katta rasmlarni kichraytiramiz (o'qilishi saqlanadi, yuklash tezlashadi)
  function shrink(file) {
    if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size < 1.5 * 1024 * 1024 || !window.createImageBitmap) return Promise.resolve(file)
    return createImageBitmap(file).then(function (bmp) {
      var k = Math.min(1, 2400 / Math.max(bmp.width, bmp.height))
      var c = document.createElement('canvas')
      c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k)
      c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height)
      return new Promise(function (res) { c.toBlob(function (b) { res(b && b.size < file.size ? b : file) }, 'image/jpeg', 0.85) })
    }).catch(function () { return file })
  }
  function uploadOne(item) {
    item.status = 'up'; renderFiles()
    if (REVIEW) return new Promise(function (res) { setTimeout(function () { item.status = 'ok'; renderFiles(); res() }, 500) })
    return shrink(item.file).then(function (blob) {
      if (blob.size > MAX_SIZE) throw Object.assign(new Error('big'), { key: 's2_too_big' })
      var name = blob === item.file ? item.file.name : item.file.name.replace(/\.[^.]+$/, '') + '.jpg'
      return fetch(API + '/file?token=' + encodeURIComponent(state.token) + '&name=' + encodeURIComponent(name), {
        method: 'POST', headers: { 'Content-Type': 'application/octet-stream' }, body: blob
      })
    }).then(function (r) {
      if (!r.ok) throw Object.assign(new Error(String(r.status)), { key: r.status === 415 ? 's2_bad_type' : r.status === 413 ? 's2_too_big' : 's2_failed' })
      item.status = 'ok'
    }).catch(function (e) { item.status = ''; item.error = e.key || 's2_failed'; item.done = true })
      .then(renderFiles)
  }
  function showDetailsError(msg) { var a = $('details-alert'); a.textContent = msg; a.classList.add('show') }

  $('details-form').addEventListener('submit', function (e) {
    e.preventDefault()
    $('details-alert').classList.remove('show')
    var text = $('details').value.trim()
    var pending = state.files.filter(function (f) { return !f.error && f.status !== 'ok' })
    if (!text && !pending.length && !state.files.some(function (f) { return f.status === 'ok' })) return showDetailsError(t('s2_need'))
    if (!$('consent').checked) return showDetailsError(t('s2_need_consent'))
    var sb = $('details-submit')
    sb.disabled = true; sb.textContent = t('s2_sending')
    post('/details', { token: state.token, text: text, consent: true })
      .then(function () {
        return pending.reduce(function (p, item) { return p.then(function () { return uploadOne(item) }) }, Promise.resolve())
      })
      .then(function () { return post('/complete', { token: state.token }).catch(function () {}) })
      .then(function () {
        var failed = state.files.filter(function (f) { return f.error && f.done })
        // Yuklanmagan fayl qizil belgida qoladi: bemor uni olib tashlab, qolganini yuborishi mumkin
        if (failed.length) { failed.forEach(function (f) { f.done = false }); return showDetailsError(t('e_send')) }
        finish(true)
      })
      .catch(function (err) { showDetailsError(err.status === 410 ? err.message : t('e_send')) })
      .then(function () { sb.disabled = false; sb.textContent = t('s2_send') })
  })

  // Mobil pastki tugma: hero'dan o'tgach ko'rinadi, forma ko'rinayotganda yashirinadi
  var sticky = $('sticky')
  var heroGone = false, formSeen = false
  function upd() { sticky.classList.toggle('show', heroGone && !formSeen) }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { heroGone = !es[0].isIntersecting; upd() }).observe(document.querySelector('.hero'))
    new IntersectionObserver(function (es) { formSeen = es[0].isIntersecting; upd() }, { threshold: .15 }).observe($('yozilish'))
  }

  render()
})()
