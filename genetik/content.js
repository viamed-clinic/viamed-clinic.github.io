// Sahifa matnlari: UZ (asosiy) + RU. Shifokor haqidagi faktlar — faqat audio va CEO tasdiqlagan ma'lumot.
// todo: true — hali tasdiqlanmagan qator (sariq rangda ko'rinadi, nashrdan oldin olib tashlanadi).
window.CONTENT = {
  // Narxlar va tarkib — src/landing/offer.ts va qabul-bot PLANS bilan bir xil (CEO, 2026-11-04)
  plans: [
    { key: 'start', name: 'NIPT Start', price: 2800000 },
    { key: 'standart', name: 'NIPT Standart', price: 4800000, featured: true },
    { key: 'full', name: 'NIPT Full checkup', price: 11000000 }
  ],
  // Server (viamed-api weblead.ts) bilan mos kalitlar
  weekKeys: ['', 'no', '<10', '10–12', '13–16', '17–20', '20+'],
  problemKeys: ['screening', 'infertility', 'miscarriage', 'family', 'premarital', 'results', 'other'],

  uz: {
    full_name: 'Jamoliddin Jalolovich Xo\'jaxmedov',
    meta_title: 'Bepul genetik maslahat va NIPT | VIAMED',
    photo_alt: 'Jamoliddin Jalolovich Xo\'jaxmedov, VIAMED bosh genetik shifokori',
    hero_role: 'VIAMED bosh genetik shifokori, PhD',
    hero_badge: 'Genetik maslahat — bepul',
    hero_h1: 'Sog\'lom farzand sari yo\'l <em>aniq tashxisdan</em> boshlanadi',
    hero_sub: 'Farzand ko\'rish qiyin bo\'lyaptimi, skriningda «xavf» chiqdimi yoki oilada genetik kasallik bormi — bosh genetik shifokorimiz Jamoliddin Jalolovich sababini aniqlashga va to\'g\'ri yo\'lni tanlashga yordam beradi.',
    cta_consult: 'Bepul maslahatga yozilish',
    cta_nipt: 'NIPT tariflari',
    hero_facts: [['award', 'Molekulyar genetika bo\'yicha PhD'], ['users', '10 000 dan ortiq bemor tekshirilgan'], ['dna', '2015-yildan genetik laboratoriya']],

    doc_eyebrow: 'Shifokor haqida',
    doc_title: 'Bosh genetik shifokor, onkogematolog, PhD',
    doc_lead: 'Molekulyar genetika bilan 10 yildan ortiq shug\'ullanadi. O\'zbekistonda xususiy sektorda genetik tashxisni yo\'lga qo\'ygan mutaxassislardan biri.',
    creds: [
      { icon: 'book', title: 'Moskvada klinik ordinatura', text: 'O\'tkir leykozlar bo\'limida molekulyar genetik tashxis va davolash protokollari bo\'yicha tayyorgarlik.' },
      { icon: 'award', title: 'PhD dissertatsiyasi', text: 'O\'zbekistonda o\'tkir limfoblast leykozda BCR-ABL onkogenining molekulyar tahlili — 8 yillik ilmiy ish.' },
      { icon: 'dna', title: '2015-yildan — o\'z genetika laboratoriyasi', text: 'O\'zbekistondagi ilk xususiy molekulyar genetika laboratoriyalaridan biriga asos solgan.' },
      { icon: 'search', title: 'Birinchilar qatorida joriy qilgan', text: 'NIPT, orqa miya mushak atrofiyasi (SMA) tashxisi, kariotip — xromosoma tekshiruvi.' },
      { icon: 'users', title: '10 000+ bemor va 100+ shogird', text: 'Bepushtlik sababini aniqlash uchun tekshirilgan bemorlar; genetika va gematologiya bo\'yicha shogirdlar.' }
    ],
    doc_quote: 'Tahlil topshirish — bu bir masala. Uni to\'g\'ri o\'qib, keyingi qadamni tushuntirib, bemorni natijagacha olib borish — asosiy masala.',
    doc_quote_by: 'Jamoliddin Jalolovich Xo\'jaxmedov',

    story_eyebrow: 'Nega aynan genetika',
    story_h2: 'Farzand kutish nimaligini o\'z hayotidan biladi',
    story: [
      'Jamoliddin Jalolovichning oilasi o\'n yildan ortiq farzand kutgan. Bu yillar davomida u ko\'p shifokorlarga borgan, turli davolarni olgan — sabab esa topilmagan.',
      'Moskvada ustozlari genetik tekshiruvdan o\'tishni maslahat berishgan. Tahlil bepushtlikning sababi kichik bir genetik o\'zgarishda ekanini ko\'rsatgan — o\'n yil izlangan javob aniq tekshiruvda topilgan.',
      'Shu tajriba uning kasbini belgilab berdi: har bir oila taxminiy emas, aniq javob olishi kerak.'
    ],

    who_eyebrow: 'Kimlarga kerak',
    who_h2: 'Qachon genetik bilan maslahatlashish kerak',
    who_lead: 'Biror holat sizga tanish bo\'lsa, maslahat ortiqcha xavotirni yo\'qotishga va to\'g\'ri qaror qabul qilishga yordam beradi.',
    who: [
      { icon: 'search', title: 'Skriningda «xavf» chiqdi', text: 'Daun, Patau, Terner sindromlari ehtimoli aytilgan bo\'lsa — NIPT bilan homiladorlikning 10-haftasidan aniqlashtirish mumkin.' },
      { icon: 'heart', title: 'Farzand ko\'rish qiyin bo\'lyapti', text: 'Yillar davomida homiladorlik bo\'lmasa, sababi genetik bo\'lishi mumkin. Avval sababni topamiz, keyin reja tuzamiz.' },
      { icon: 'drop', title: 'Homila erta tushib qolgan', text: 'Homiladorlik 10 haftagacha takror to\'xtagan bo\'lsa, genetik tekshiruv sababini ko\'rsatishi mumkin.' },
      { icon: 'users', title: 'Oilada genetik kasallik bor', text: 'Oldingi farzand kasal tug\'ilgan bo\'lsa, keyingi homiladorlikni oldindan rejalashtirib, sog\'lom farzand ko\'rishga yordam beramiz.' },
      { icon: 'calendar', title: 'Turmush qurish arafasida', text: 'Bo\'lajak juftlikning genetik tekshiruvi farzandlarda kasallik ehtimolini oldindan ko\'rsatadi.' },
      { icon: 'book', title: 'Natijangizni tushunolmadingiz', text: 'Boshqa joyda topshirilgan genetik tahlilni olib keling — shifokor o\'qib beradi va keyingi qadamni tushuntiradi.' }
    ],

    steps_eyebrow: 'Qanday o\'tadi',
    steps_h2: 'Maslahat — oddiy va tushunarli',
    steps: [
      ['Ariza qoldirasiz', 'Ismingiz va raqamingizni yozasiz — bir daqiqa vaqt oladi.'],
      ['Administrator qo\'ng\'iroq qiladi', 'Sizga qulay kun va vaqtni birga tanlaymiz.'],
      ['Shifokor bilan suhbat', 'Jamoliddin Jalolovich holatingizni va oldingi tahlillaringizni ko\'rib chiqadi, savollaringizga javob beradi.'],
      ['Natijagacha birga', 'Qaysi tekshiruv kerakligini tushuntiramiz va natijadan keyin ham keyingi qadamlarda yoningizda bo\'lamiz.']
    ],
    free_box: 'Genetik shifokor maslahati bepul',

    plans_h2: 'NIPT — homiladorlikda genetik tekshiruv',
    plans_lead: 'Ona qonidan olinadigan xavfsiz tekshiruv: homilaga hech qanday ta\'sir qilmaydi. Qaysi tarif sizga mosligini shifokor maslahatda aytib beradi.',
    plan_badge: 'Tavsiya etamiz',
    plan_cta: 'Shu tarifga yozilish',
    sum: 'so\'m',
    plans_note: 'NIPT topshirgan har bir bemorga natija bo\'yicha genetik shifokor maslahati bepul.',
    plans: [
      { tagline: 'Eng ko\'p uchraydigan sindrom va jins', items: ['Daun sindromi (21-trisomiya)', 'Bolaning jinsi'] },
      { tagline: '7 ta sindrom va barcha 46 xromosoma', items: ['Daun, Patau, Edvards sindromlari', 'Klaynfelter, Terner, Jekobs sindromlari', 'DiJorj sindromi (22q11.2)', 'X va Y xromosomalar, bolaning jinsi', 'Barcha 46 xromosoma bo\'yicha skrining'] },
      { tagline: '70 dan ortiq genetik kasallik', items: ['Standart tarifdagi barcha tekshiruvlar', '70 dan ortiq genetik kasallik bo\'yicha skrining', 'Eng to\'liq hisobot'] }
    ],

    faq_eyebrow: 'Savollar',
    faq_h2: 'Ko\'p beriladigan savollar',
    faq: [
      ['Maslahat haqiqatan bepulmi?', 'Ha. Genetik shifokor bilan maslahat uchun to\'lov olinmaydi. Tekshiruv kerak bo\'lsa, uning narxini oldindan aytamiz.'],
      ['NIPT qachon topshiriladi?', 'Homiladorlikning 10-haftasidan boshlab. Aniq muddatni shifokor sizning holatingizga qarab tavsiya qiladi.'],
      ['NIPT homilaga xavflimi?', 'Yo\'q. Tekshiruv uchun faqat onaning venasidan qon olinadi — oddiy qon tahlili kabi.'],
      ['Turmush o\'rtog\'im bilan kelsam bo\'ladimi?', 'Albatta. Ko\'p savollar ikkala oilaga ham tegishli bo\'ladi, shuning uchun birga kelishingizni tavsiya qilamiz.'],
      ['Oldingi tahlillarimni olib kelishim kerakmi?', 'Ha, UZI xulosalari, skrining natijalari va boshqa klinikalarda topshirilgan genetik tahlillar bo\'lsa — olib keling. Shifokor ularni ko\'rib chiqadi.']
    ],

    form_h2: 'Bepul maslahatga yoziling',
    form_lead: 'Ariza qoldiring — administratorimiz qo\'ng\'iroq qilib, qulay vaqtni kelishib oladi.',
    form_points: [['clock', 'Ish vaqtida tez qayta qo\'ng\'iroq qilamiz'], ['heart', 'Savollaringizga bemalol javob beramiz'], ['shield', 'Ma\'lumotlaringiz faqat yozilish uchun ishlatiladi']],
    f_name: 'Ismingiz',
    f_phone: 'Telefon raqamingiz',
    f_problem: 'Asosiy savolingiz',
    problems: ['Skriningda «xavf» chiqdi', 'Farzand ko\'rish qiyin', 'Homila tushgan / to\'xtagan', 'Oilada genetik kasallik', 'Turmush qurish oldidan', 'Tahlil natijasini tushunish', 'Boshqa savol'],
    e_problem: 'Asosiy savolni tanlang',
    picked: 'Tanlangan: {plan}',
    s2_title: 'Rahmat, {name}! Arizangiz qabul qilindi',
    s2_sub: 'Administrator tez orada qo\'ng\'iroq qiladi. Shifokor oldindan tayyorlanishi uchun vaziyatingizni yozib qoldirishingiz mumkin — bu ixtiyoriy.',
    s2_text: 'Vaziyatingizni qisqacha yozing',
    s2_pick: 'Tahlil yoki xulosani biriktirish',
    s2_files: 'Tahlillar, UZI yoki skrining xulosalari',
    s2_hint: 'PDF yoki rasm, 5 tagacha fayl, har biri 10 MB gacha.',
    s2_consent: 'Yozganlarim va hujjatlarim faqat shifokor ko\'rib chiqishi uchun klinikada saqlanishiga roziman.',
    s2_send: 'Shifokorga yuborish',
    s2_skip: 'Hozircha shart emas',
    s2_sending: 'Yuklanmoqda…',
    s2_need: 'Vaziyatni yozing yoki hujjat biriktiring',
    s2_need_consent: 'Saqlashga rozilikni belgilang',
    s2_too_big: '10 MB dan katta',
    s2_bad_type: 'faqat PDF yoki rasm',
    s2_failed: 'yuklanmadi',
    s2_max: 'Ko\'pi bilan 5 ta fayl',
    ok_title2: 'Rahmat! Shifokor ma\'lumotlaringizni oldindan ko\'rib chiqadi 💙',
    ok_text2: 'Administratorimiz tez orada qo\'ng\'iroq qilib, qulay vaqtni kelishib oladi.',
    opt_consult: 'Genetik maslahat',
    free: 'bepul',
    f_week: 'Homiladorlik muddati',
    f_submit: 'Maslahatga yozilish',
    f_sending: 'Yuborilmoqda…',
    f_note: 'Tugmani bosib, siz bilan bog\'lanishimizga rozilik bildirasiz.',
    e_name: 'Ismingizni yozing',
    e_phone: 'Raqamni to\'liq kiriting: +998 XX XXX XX XX',
    e_send: 'Ariza yuborilmadi. Iltimos, qayta urinib ko\'ring yoki bizga qo\'ng\'iroq qiling.',
    e_rate: 'Arizangiz allaqachon qabul qilingan. Tez orada qo\'ng\'iroq qilamiz 😊',
    ok_title: 'Rahmat, {name}! 💙',
    ok_text: 'Arizangiz qabul qilindi. Administratorimiz tez orada qo\'ng\'iroq qilib, qulay vaqtni kelishib oladi.',
    alt_tg: 'Telegram orqali yozish',
    sticky_cta: 'Bepul maslahatga yozilish',
    foot_about: 'VIAMED — molekulyar genetika klinikasi: tashxisdan natijagacha.',
    foot_license: 'SSV litsenziyasi',
    foot_license_link: 'Litsenziyani ko\'rish',
    foot_addr: 'Manzil',
    foot_contact: 'Bog\'lanish',
    addresses: [['Toshkent, Yunusobod tumani', 'Gullola ko\'chasi, 5a-uy', 'Genetik shifokor qabuli, UZI']],
    weeks: ['Tanlang (ixtiyoriy)', 'Homilador emasman / rejalashtiryapman', '10 haftagacha', '10–12 hafta', '13–16 hafta', '17–20 hafta', '20 haftadan ko\'p']
  },

  ru: {
    full_name: 'Жамолиддин Жалолович Ходжахмедов',
    meta_title: 'Бесплатная консультация генетика и НИПТ | VIAMED',
    photo_alt: 'Жамолиддин Жалолович Ходжахмедов, главный врач-генетик VIAMED',
    hero_role: 'Главный врач-генетик VIAMED, PhD',
    hero_badge: 'Консультация генетика — бесплатно',
    hero_h1: 'Путь к здоровому ребёнку начинается <em>с точного диагноза</em>',
    hero_sub: 'Не получается забеременеть, скрининг показал «риск» или в семье есть генетическое заболевание — наш главный генетик Жамолиддин Жалолович поможет найти причину и выбрать верный путь.',
    cta_consult: 'Записаться на бесплатную консультацию',
    cta_nipt: 'Тарифы НИПТ',
    hero_facts: [['award', 'PhD по молекулярной генетике'], ['users', 'Более 10 000 обследованных пациентов'], ['dna', 'Генетическая лаборатория с 2015 года']],

    doc_eyebrow: 'О враче',
    doc_title: 'Главный врач-генетик, онкогематолог, PhD',
    doc_lead: 'Более 10 лет занимается молекулярной генетикой. Один из специалистов, которые внедрили генетическую диагностику в частном секторе Узбекистана.',
    creds: [
      { icon: 'book', title: 'Клиническая ординатура в Москве', text: 'Подготовка в отделении острых лейкозов: молекулярно-генетическая диагностика и протоколы лечения.' },
      { icon: 'award', title: 'Диссертация PhD', text: '«Молекулярный анализ химерного онкогена BCR-ABL при остром лимфобластном лейкозе в Узбекистане» — 8 лет научной работы.' },
      { icon: 'dna', title: 'С 2015 года — своя лаборатория', text: 'Основал одну из первых частных молекулярно-генетических лабораторий в Узбекистане.' },
      { icon: 'search', title: 'Внедрил одним из первых', text: 'НИПТ, диагностику спинальной мышечной атрофии (СМА), кариотипирование.' },
      { icon: 'users', title: '10 000+ пациентов и 100+ учеников', text: 'Пациенты, обследованные для поиска причин бесплодия; ученики в генетике и гематологии.' }
    ],
    doc_quote: 'Сдать анализ — это одно. Правильно его прочитать, объяснить следующий шаг и довести пациента до результата — вот главное.',
    doc_quote_by: 'Жамолиддин Жалолович Ходжахмедов',

    story_eyebrow: 'Почему генетика',
    story_h2: 'Он знает, что такое ждать ребёнка',
    story: [
      'Семья Жамолиддина Жалоловича больше десяти лет ждала ребёнка. За эти годы он обошёл многих врачей, прошёл разное лечение — а причину так и не нашли.',
      'В Москве учителя посоветовали ему пройти генетическое обследование. Анализ показал, что причина бесплодия — в небольшом генетическом нарушении. Ответ, который искали десять лет, дал точный тест.',
      'Этот опыт определил его профессию: каждая семья должна получать не предположение, а точный ответ.'
    ],

    who_eyebrow: 'Кому нужно',
    who_h2: 'Когда стоит обратиться к генетику',
    who_lead: 'Если вам знакома одна из ситуаций, консультация поможет снять лишнюю тревогу и принять верное решение.',
    who: [
      { icon: 'search', title: 'Скрининг показал «риск»', text: 'Если назвали вероятность синдромов Дауна, Патау, Тернера — НИПТ поможет уточнить с 10-й недели беременности.' },
      { icon: 'heart', title: 'Не получается забеременеть', text: 'Если беременность не наступает годами, причина может быть генетической. Сначала находим причину, потом составляем план.' },
      { icon: 'drop', title: 'Были ранние выкидыши', text: 'Если беременность повторно прерывалась до 10 недель, генетическое обследование может показать причину.' },
      { icon: 'users', title: 'В семье есть генетическое заболевание', text: 'Если предыдущий ребёнок родился больным, заранее планируем следующую беременность, чтобы помочь родить здорового.' },
      { icon: 'calendar', title: 'Перед свадьбой', text: 'Генетическое обследование будущей пары заранее показывает риски для детей.' },
      { icon: 'book', title: 'Непонятен результат анализа', text: 'Принесите генетический анализ, сданный в другом месте, — врач его прочитает и объяснит следующий шаг.' }
    ],

    steps_eyebrow: 'Как проходит',
    steps_h2: 'Консультация — просто и понятно',
    steps: [
      ['Оставляете заявку', 'Имя и номер телефона — это займёт минуту.'],
      ['Администратор перезванивает', 'Вместе подбираем удобные день и время.'],
      ['Разговор с врачом', 'Жамолиддин Жалолович разберёт вашу ситуацию и прежние анализы, ответит на вопросы.'],
      ['Вместе до результата', 'Объясним, какое обследование нужно, и будем рядом на следующих шагах после результата.']
    ],
    free_box: 'Консультация врача-генетика бесплатна',

    plans_h2: 'НИПТ — генетический тест при беременности',
    plans_lead: 'Безопасный тест по крови матери: никак не влияет на плод. Какой тариф подходит вам, врач подскажет на консультации.',
    plan_badge: 'Рекомендуем',
    plan_cta: 'Записаться на этот тариф',
    sum: 'сум',
    plans_note: 'Каждой пациентке, сдавшей НИПТ, консультация генетика по результату — бесплатно.',
    plans: [
      { tagline: 'Самый частый синдром и пол ребёнка', items: ['Синдром Дауна (трисомия 21)', 'Пол ребёнка'] },
      { tagline: '7 синдромов и все 46 хромосом', items: ['Синдромы Дауна, Патау, Эдвардса', 'Синдромы Клайнфельтера, Тернера, Якобса', 'Синдром ДиДжорджи (22q11.2)', 'Хромосомы X и Y, пол ребёнка', 'Скрининг по всем 46 хромосомам'] },
      { tagline: 'Более 70 генетических заболеваний', items: ['Все исследования тарифа Standart', 'Скрининг более 70 генетических заболеваний', 'Самый полный отчёт'] }
    ],

    faq_eyebrow: 'Вопросы',
    faq_h2: 'Частые вопросы',
    faq: [
      ['Консультация действительно бесплатная?', 'Да. За консультацию врача-генетика оплата не берётся. Если понадобится обследование, мы заранее назовём его стоимость.'],
      ['Когда сдавать НИПТ?', 'Начиная с 10-й недели беременности. Точный срок врач порекомендует с учётом вашей ситуации.'],
      ['НИПТ опасен для плода?', 'Нет. Для теста берётся только кровь из вены матери — как при обычном анализе.'],
      ['Можно прийти вместе с мужем?', 'Конечно. Многие вопросы касаются обеих семей, поэтому рекомендуем приходить вместе.'],
      ['Нужно ли брать прежние анализы?', 'Да, если есть заключения УЗИ, результаты скрининга или генетические анализы из других клиник — возьмите их. Врач их посмотрит.']
    ],

    form_h2: 'Запишитесь на бесплатную консультацию',
    form_lead: 'Оставьте заявку — администратор перезвонит и согласует удобное время.',
    form_points: [['clock', 'Быстро перезваниваем в рабочее время'], ['heart', 'Спокойно ответим на все вопросы'], ['shield', 'Данные используются только для записи']],
    f_name: 'Ваше имя',
    f_phone: 'Номер телефона',
    f_problem: 'Ваш основной вопрос',
    problems: ['Скрининг показал «риск»', 'Не получается забеременеть', 'Была замершая / выкидыш', 'Генетическое заболевание в семье', 'Перед свадьбой', 'Понять результат анализа', 'Другой вопрос'],
    e_problem: 'Выберите основной вопрос',
    picked: 'Выбрано: {plan}',
    s2_title: 'Спасибо, {name}! Заявка принята',
    s2_sub: 'Администратор скоро перезвонит. Чтобы врач подготовился заранее, можете описать ситуацию — это по желанию.',
    s2_text: 'Коротко опишите ситуацию',
    s2_pick: 'Прикрепить анализ или заключение',
    s2_files: 'Анализы, заключения УЗИ или скрининга',
    s2_hint: 'PDF или фото, до 5 файлов, каждый до 10 МБ.',
    s2_consent: 'Согласна, чтобы мои сообщения и документы хранились в клинике только для просмотра врачом.',
    s2_send: 'Отправить врачу',
    s2_skip: 'Пока не нужно',
    s2_sending: 'Загружаем…',
    s2_need: 'Опишите ситуацию или прикрепите документ',
    s2_need_consent: 'Отметьте согласие на хранение',
    s2_too_big: 'больше 10 МБ',
    s2_bad_type: 'только PDF или фото',
    s2_failed: 'не загрузился',
    s2_max: 'Не больше 5 файлов',
    ok_title2: 'Спасибо! Врач заранее посмотрит ваши данные 💙',
    ok_text2: 'Администратор скоро перезвонит и согласует удобное время.',
    opt_consult: 'Консультация генетика',
    free: 'бесплатно',
    f_week: 'Срок беременности',
    f_submit: 'Записаться на консультацию',
    f_sending: 'Отправляем…',
    f_note: 'Нажимая кнопку, вы соглашаетесь, чтобы мы с вами связались.',
    e_name: 'Укажите имя',
    e_phone: 'Введите номер полностью: +998 XX XXX XX XX',
    e_send: 'Заявка не отправилась. Попробуйте ещё раз или позвоните нам.',
    e_rate: 'Ваша заявка уже принята. Скоро перезвоним 😊',
    ok_title: 'Спасибо, {name}! 💙',
    ok_text: 'Заявка принята. Администратор скоро перезвонит и согласует удобное время.',
    alt_tg: 'Написать в Telegram',
    sticky_cta: 'Бесплатная консультация',
    foot_about: 'VIAMED — клиника молекулярной генетики: от диагноза до результата.',
    foot_license: 'Лицензия МЗ',
    foot_license_link: 'Посмотреть лицензию',
    foot_addr: 'Адрес',
    foot_contact: 'Контакты',
    addresses: [['Ташкент, Юнусабадский район', 'ул. Гуллола, 5а', 'Приём врача-генетика, УЗИ']],
    weeks: ['Выберите (по желанию)', 'Не беременна / планирую', 'До 10 недель', '10–12 недель', '13–16 недель', '17–20 недель', 'Более 20 недель']
  }
}
