import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "home" | "generator" | "about";

interface FormData {
  companyName: string;
  companyType: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  inn: string;
  ogrn: string;
  hasAnalytics: boolean;
  hasPayments: boolean;
  hasCookies: boolean;
  hasFeedbackForm: boolean;
  hasMailing: boolean;
  hasPublishing: boolean;
  hasAccount: boolean;
  thirdParties: string;
  retentionPeriod: string;
  formData: string;
  analyticsServices: string;
  // privacy
  contractData: string;
  accountData: string;
  paymentData: string;
  deliveryData: string;
  mailingDataList: string;
  securityMeasures: string;
  crossBorder: string;
  // cookie
  cookieMechanism: string;
  policyLink: string;
  // consentForms
  consentPurposes: string;
  // consentMailing
  mailingChannels: string;
  mailingMessageTypes: string;
  // consentDistribution
  distributionPurpose: string;
  distributionData: string;
  distributionConditions: string;
  // agreement
  agreementPurpose: string;
  accountOrder: string;
  orderPayment: string;
  liability: string;
}

const ph = (label: string) => `[УКАЗАТЬ ${label}]`;

const DOCS = [
  { id: "privacy", label: "Политика обработки персональных данных", icon: "Shield", required: true },
  { id: "cookie", label: "Политика использования файлов cookie", icon: "Cookie", required: false },
  { id: "consentForms", label: "Согласие на обработку ПДн для форм сайта", icon: "FileSignature", required: true },
  { id: "consentCookie", label: "Согласие на обработку ПДн (cookie и веб-аналитика)", icon: "BarChart2", required: false },
  { id: "consentMailing", label: "Согласие на получение рекламной рассылки", icon: "Mail", required: false },
  { id: "consentDistribution", label: "Согласие на распространение ПДн", icon: "Share2", required: false },
  { id: "agreement", label: "Пользовательское соглашение / оферта", icon: "FileText", required: false },
];

const STEPS = [
  { num: "01", title: "Заполните форму", desc: "Укажите данные вашей организации и сайта" },
  { num: "02", title: "Выберите документы", desc: "Отметьте нужные документы из комплекта" },
  { num: "03", title: "Скачайте готовый пакет", desc: "Получите документы в PDF, Word или TXT" },
];

const FAQ = [
  {
    q: "Почему документы бесплатные?",
    a: "Мы убеждены, что соблюдение 152-ФЗ должно быть доступным для всех. Сервис создан, чтобы помочь малому и среднему бизнесу без лишних расходов.",
  },
  {
    q: "Мои данные передаются на сервер?",
    a: "Нет. Все данные обрабатываются прямо в вашем браузере. Мы не храним и не передаём введённую информацию.",
  },
  {
    q: "Подходят ли документы для проверок Роскомнадзора?",
    a: "Документы составлены с учётом актуальных требований 152-ФЗ и подходят для большинства стандартных сайтов.",
  },
  {
    q: "Какие форматы скачивания доступны?",
    a: "Вы можете скачать документы в формате Word (.docx), PDF и обычном текстовом формате (.txt).",
  },
];

const defaultForm: FormData = {
    companyName: "",
    companyType: "юридическое лицо",
    website: "",
    email: "",
    phone: "",
    address: "",
    inn: "",
    ogrn: "",
    hasAnalytics: true,
    hasPayments: false,
    hasCookies: true,
    hasFeedbackForm: true,
    hasMailing: false,
    hasPublishing: false,
    hasAccount: false,
    thirdParties: "Хостинг-провайдер, сервис веб-аналитики, CRM-система",
    retentionPeriod: "3 года или до отзыва согласия",
    formData: "Имя, телефон, email",
    analyticsServices: "Яндекс.Метрика, cookie",
    contractData: "ФИО, телефон, email, адрес доставки, состав заказа",
    accountData: "Имя, email, телефон, логин, история заказов",
    paymentData: "ФИО, email, телефон, сумма и состав заказа",
    deliveryData: "ФИО, телефон, адрес доставки",
    mailingDataList: "Имя, email, телефон",
    securityMeasures: "Разграничение доступа, пароли, HTTPS, резервное копирование, договоры с обработчиками, антивирусная защита",
    crossBorder: "Зарубежные сервисы не используются",
    cookieMechanism: "Кнопка «Настройки cookie» в баннере сайта",
    policyLink: "Размещена в футере сайта",
    consentPurposes: "Обработка заявки/обращения, обратная связь, подготовка предложения, заключение и исполнение договора",
    mailingChannels: "Email, SMS, мессенджеры, push-уведомления",
    mailingMessageTypes: "Новости, акции, специальные предложения, промокоды, информация о товарах и услугах",
    distributionPurpose: "Размещение отзыва, кейса, фото на сайте",
    distributionData: "ФИО, должность, компания, фото, текст отзыва",
    distributionConditions: "Не установлены",
    agreementPurpose: "Публичная оферта",
    accountOrder: "Пользователь регистрируется по email и паролю, может удалить аккаунт через обращение в поддержку",
    orderPayment: "Заказ оформляется на сайте, оплата онлайн, сроки и порядок доставки указаны в карточке товара, возврат по законодательству РФ",
    liability: "Сайт предоставляется «как есть». Оператор не несёт ответственности за перебои в работе по техническим причинам и действия третьих лиц, не нарушая права потребителей",
};

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [step, setStep] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDocs, setSelectedDocs] = useState<string[]>(["privacy", "consentForms"]);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [generated, setGenerated] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);

  const toggleDoc = (id: string) => {
    setSelectedDocs((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    if (!form.companyName || !form.website || !form.email) return;
    setGenerated(true);
    setStep(3);
  };

  const generateDocContent = (docId: string): string => {
    const company = form.companyName || ph("ПОЛНОЕ НАИМЕНОВАНИЕ ОПЕРАТОРА");
    const site = form.website || ph("ДОМЕН САЙТА");
    const email = form.email || ph("EMAIL");
    const inn = form.inn || ph("ИНН");
    const ogrn = form.ogrn || ph("ОГРН/ОГРНИП");
    const address = form.address || ph("ЮРИДИЧЕСКИЙ/ПОЧТОВЫЙ АДРЕС");
    const status = form.companyType || ph("ЮЛ / ИП / САМОЗАНЯТЫЙ / ФИЗЛИЦО");
    const services = form.analyticsServices.trim() || ph("СЕРВИСЫ");
    const thirdParties = form.thirdParties.trim() || ph("ХОСТИНГ-ПРОВАЙДЕР, CRM, СЕРВИС РАССЫЛКИ, ПЛАТЕЖНЫЙ АГРЕГАТОР, КУРЬЕРСКАЯ СЛУЖБА, ОНЛАЙН-ЧАТ, АНАЛИТИКА, ПОДРЯДЧИКИ");
    const thirdPartiesShort = form.thirdParties.trim() || ph("CRM, ХОСТИНГ, СЕРВИС РАССЫЛКИ, ПЛАТЕЖНЫЙ АГРЕГАТОР, КУРЬЕРСКУЮ СЛУЖБУ, ПОДРЯДЧИКОВ ИЛИ УКАЗАТЬ «НЕ ПЕРЕДАЮТСЯ», ЕСЛИ ЭТО ТАК");
    const retention = form.retentionPeriod.trim() || ph("СРОК");
    const formFields = form.formData.trim() || ph("ДАННЫЕ ПО ФОРМАМ: имя, телефон, email, комментарий, город, адрес, файл, IP, user agent и т.д.");
    const contractData = form.contractData.trim() || ph("ПДН, НАПРИМЕР: ФИО, телефон, email, адрес доставки, состав заказа");
    const accountData = form.accountData.trim() || ph("ПДН, НАПРИМЕР: имя, email, телефон, логин, история заказов");
    const paymentData = form.paymentData.trim() || ph("ПДН, ПЕРЕДАВАЕМЫЕ ПЛАТЕЖНОМУ АГРЕГАТОРУ");
    const deliveryData = form.deliveryData.trim() || ph("ПДН, НАПРИМЕР: ФИО, телефон, адрес доставки");
    const mailingDataList = form.mailingDataList.trim() || ph("ПДН, НАПРИМЕР: имя, email, телефон, мессенджер");
    const securityMeasures = form.securityMeasures.trim() || ph("МЕРЫ, НАПРИМЕР: разграничение доступа, пароли, HTTPS, резервное копирование, договоры с обработчиками, журналирование, антивирусная защита");
    const crossBorder = form.crossBorder.trim() || ph("ЕСТЬ ЛИ ЗАРУБЕЖНЫЕ СЕРВИСЫ И СТРАНЫ");
    const cookieMechanism = form.cookieMechanism.trim() || ph("МЕХАНИЗМ: «Настройки cookie»");
    const policyLink = form.policyLink.trim() || ph("ССЫЛКУ");
    const consentPurposes = form.consentPurposes.trim() || ph("ЦЕЛИ ПО ФОРМАМ");
    const mailingChannels = form.mailingChannels.trim() || ph("EMAIL, SMS, ТЕЛЕФОННЫЕ ЗВОНКИ, МЕССЕНДЖЕРЫ, PUSH, ИНЫЕ КАНАЛЫ");
    const mailingMessageTypes = form.mailingMessageTypes.trim() || ph("УКАЗАТЬ");
    const distributionPurpose = form.distributionPurpose.trim() || ph("КОНКРЕТНУЮ ЦЕЛЬ");
    const distributionData = form.distributionData.trim() || ph("ФИО, имя, должность, компания, фото, видео, текст отзыва, ссылка на профиль и т.д.");
    const distributionConditions = form.distributionConditions.trim() || ph("УСЛОВИЯ/ЗАПРЕТЫ ИЛИ «НЕ УСТАНОВЛЕНЫ»");
    const agreementPurpose = form.agreementPurpose.trim() || ph("ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ / ПУБЛИЧНАЯ ОФЕРТА");
    const accountOrder = form.accountOrder.trim() || ph("ПОРЯДОК РЕГИСТРАЦИИ И УДАЛЕНИЯ АККАУНТА");
    const orderPayment = form.orderPayment.trim() || ph("ТОВАРЫ/УСЛУГИ, ЦЕНЫ, ПОРЯДОК ОПЛАТЫ, СРОКИ, ДОСТАВКУ, ВОЗВРАТЫ");
    const liability = form.liability.trim() || ph("РЕАЛЬНЫЕ ОГРАНИЧЕНИЯ, НЕ НАРУШАЮЩИЕ ПРАВА ПОТРЕБИТЕЛЕЙ");

    if (docId === "privacy") {
      return `Документ 1. Политика обработки персональных данных

1. Общие положения
1.1. Настоящая Политика обработки персональных данных определяет порядок обработки и защиты персональных данных пользователей сайта ${site} (далее - Сайт).
1.2. Политика разработана в целях соблюдения требований законодательства Российской Федерации о персональных данных.
1.3. Используя Сайт и/или направляя сведения через формы Сайта, пользователь подтверждает, что ознакомился с настоящей Политикой. Если для конкретной формы требуется согласие, обработка осуществляется после получения отдельного согласия пользователя.
1.4. Оператор не собирает специальные категории персональных данных и биометрические персональные данные, если иное прямо не указано в отдельном согласии и фактических формах Сайта.

2. Сведения об операторе
Оператор персональных данных: ${company}.
Статус оператора: ${status}.
ИНН: ${inn}. ОГРН/ОГРНИП: ${ogrn}.
Адрес: ${address}.
Email для обращений по вопросам персональных данных: ${email}.
Сайт: ${site}.

3. Основные термины
Персональные данные - любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу.
Обработка персональных данных - любое действие или совокупность действий с персональными данными, включая сбор, запись, систематизацию, накопление, хранение, уточнение, использование, передачу, обезличивание, блокирование, удаление и уничтожение.
Пользователь - физическое лицо, посещающее Сайт и/или направляющее данные через формы Сайта.
Cookie - небольшие фрагменты данных, сохраняемые на устройстве пользователя и используемые Сайтом или подключенными сервисами.

4. Категории субъектов персональных данных
Оператор может обрабатывать персональные данные следующих категорий субъектов:
- посетители Сайта;
- пользователи, направляющие заявки или обращения;
- клиенты и потенциальные клиенты;
- подписчики рассылок, если рассылка используется;
- пользователи личного кабинета, если он предусмотрен;
- кандидаты на вакансии, если на Сайте есть форма вакансии;
- лица, чьи отзывы, фото, кейсы или иные сведения публикуются на Сайте, если такая публикация осуществляется.

5. Цели обработки и состав персональных данных
Оператор обрабатывает персональные данные только для конкретных целей. Фактический перечень данных должен соответствовать реальным формам Сайта.

5.1. Обработка заявки, обратной связи или запроса пользователя: ${formFields}.
5.2. Обратный звонок: ${ph("ПДН, НАПРИМЕР: имя, телефон")}.
5.3. Заключение и исполнение договора/заказа, если применимо: ${contractData}.
5.4. Регистрация и использование личного кабинета, если применимо: ${accountData}.
5.5. Онлайн-оплата, если применимо: ${paymentData}. Оператор не хранит полные данные банковских карт, если иное не предусмотрено фактическим процессом.
5.6. Доставка, если применимо: ${deliveryData}.
5.7. Рассылка информационных или рекламных сообщений, если применимо: ${mailingDataList}.
5.8. Веб-аналитика, обеспечение работоспособности и безопасности Сайта: IP-адрес, cookie-идентификаторы, user agent, сведения о браузере и устройстве, дата и время посещения, источник перехода, действия на Сайте. Конкретные сервисы: ${services}.
5.9. Рассмотрение откликов на вакансии, если применимо: ${ph("ПДН, НАПРИМЕР: ФИО, телефон, email, резюме, опыт работы")}.
5.10. Публикация отзывов, фото, кейсов или профилей, если применимо: только на основании отдельного согласия на распространение персональных данных.

6. Правовые основания обработки
Правовыми основаниями обработки являются: согласие субъекта персональных данных; заключение и исполнение договора; исполнение обязанностей, предусмотренных законодательством; законный интерес оператора в обеспечении работоспособности и безопасности Сайта; иные основания, предусмотренные законодательством Российской Федерации, если они применимы к фактическому процессу обработки.

7. Способы и действия с персональными данными
Оператор может совершать с персональными данными следующие действия: сбор, запись, систематизация, накопление, хранение, уточнение, использование, передача, обезличивание, блокирование, удаление и уничтожение.
Обработка может осуществляться как с использованием средств автоматизации, так и без использования таких средств.

8. Сроки обработки и хранения
Персональные данные хранятся не дольше, чем этого требуют цели обработки, если иной срок не предусмотрен законом или договором.
Ориентировочные сроки должны быть заполнены оператором:
- заявки и обращения: ${retention};
- договорные и бухгалтерские документы: ${ph("СРОК С УЧЕТОМ ЗАКОНА")};
- данные личного кабинета: ${retention};
- данные рассылки: до отзыва согласия или ${retention};
- cookie/аналитические данные: ${ph("СРОКИ ПО СЕРВИСАМ")};
- резюме кандидатов: ${retention}.

9. Порядок уничтожения персональных данных
По достижении целей обработки, истечении сроков хранения или при отзыве согласия, если отсутствуют иные законные основания для обработки, персональные данные удаляются или уничтожаются способом, исключающим дальнейшее восстановление, либо обезличиваются.

10. Cookie и веб-аналитика
Сайт может использовать cookie и аналогичные технологии. Подробные условия описаны в Политике использования файлов cookie. Необязательные аналитические, маркетинговые и функциональные cookie должны загружаться только после получения согласия пользователя, если это применимо к фактической настройке Сайта.

11. Передача третьим лицам
Оператор может поручать обработку или передавать персональные данные третьим лицам только при наличии правового основания и в объеме, необходимом для конкретной цели.
Категории третьих лиц: ${thirdParties}.
Передаваемые данные и цели передачи: ${ph("ПО КАЖДОМУ ТРЕТЬЕМУ ЛИЦУ")}.

12. Трансграничная передача
Трансграничная передача персональных данных осуществляется только при наличии законного основания и после выполнения необходимых требований законодательства. На дату публикации Политики: ${crossBorder}.

13. Меры защиты персональных данных
Оператор принимает необходимые правовые, организационные и технические меры для защиты персональных данных от неправомерного доступа, уничтожения, изменения, блокирования, копирования, предоставления, распространения и иных неправомерных действий. Конкретные меры включают: ${securityMeasures}.

14. Права субъекта персональных данных
Субъект персональных данных вправе получать сведения об обработке своих персональных данных, требовать уточнения, блокирования или уничтожения данных, отзывать согласие, возражать против обработки в случаях, предусмотренных законом, а также обжаловать действия или бездействие оператора.

15. Порядок направления запросов и отзыва согласия
Запросы и отзывы согласий направляются на email: ${email} или по адресу: ${address}.
В запросе рекомендуется указать ФИО, контакт для ответа, суть обращения и сведения, позволяющие идентифицировать заявителя.

16. Изменение Политики
Оператор вправе обновлять Политику. Новая редакция вступает в силу с момента размещения на Сайте, если иной срок не указан в новой редакции. Пользователям рекомендуется периодически проверять актуальную редакцию Политики.

17. Контакты оператора
По вопросам обработки персональных данных можно обратиться: ${email}, ${address}, ${form.phone || ph("ТЕЛЕФОН ПРИ НАЛИЧИИ")}.`;
    }

    if (docId === "cookie") {
      return `Документ 2. Политика использования файлов cookie

1. Общие положения
Настоящая Политика использования файлов cookie описывает, какие cookie и аналогичные технологии могут использоваться на сайте ${site}, для каких целей они применяются и как пользователь может управлять своим выбором.

2. Что такое cookie
Cookie - это небольшие текстовые файлы, которые сохраняются на устройстве пользователя при посещении сайта. Они помогают обеспечить работу сайта, запомнить настройки, анализировать посещаемость и, если применимо, показывать релевантную рекламу.

3. Категории cookie
Сайт может использовать следующие категории cookie:
- необходимые cookie: нужны для работы сайта и не отключаются через баннер;
- функциональные cookie: помогают запомнить настройки пользователя;
- аналитические cookie: помогают оценивать посещаемость и поведение пользователей;
- маркетинговые cookie: используются для рекламы и оценки эффективности рекламных кампаний.
Необязательные cookie должны загружаться только после согласия пользователя, если они используются.

4. Какие данные могут собираться
С помощью cookie и скриптов могут обрабатываться: IP-адрес, cookie-идентификатор, сведения о браузере, операционной системе и устройстве, дата и время посещения, источник перехода, просмотренные страницы, события и действия на сайте.

5. Таблица cookie
Название | Провайдер | Цель | Срок | Тип
${ph("COOKIE")} | ${ph("ПРОВАЙДЕРА")} | Необходимая работа сайта / аналитика / маркетинг / функциональность | ${ph("СРОК")} | Необходимая / функциональная / аналитическая / маркетинговая
[например, cookie сервиса аналитики] | ${ph("СЕРВИС")} | Сбор обезличенной статистики посещений и действий пользователей | ${ph("СРОК")} | Аналитическая
[например, cookie рекламного пикселя] | ${ph("СЕРВИС")} | Оценка эффективности рекламы и настройка рекламных аудиторий | ${ph("СРОК")} | Маркетинговая

6. Сервисы аналитики, рекламы, call-tracking и онлайн-чата
На Сайте могут использоваться следующие сервисы: ${services}. До получения согласия пользователя не должны загружаться необязательные аналитические и маркетинговые скрипты, если это применимо.

7. Управление cookie
Пользователь может принять все cookie, отклонить необязательные cookie или настроить категории cookie в баннере. Пользователь также может ограничить или удалить cookie в настройках браузера, однако это может повлиять на работу отдельных функций сайта.

8. Отзыв согласия
Пользователь может изменить выбор cookie через ссылку/кнопку ${cookieMechanism} на сайте или направить обращение на ${email}.

9. Связь с Политикой ПДн
Обработка данных, полученных через cookie и аналогичные технологии, осуществляется в соответствии с Политикой обработки персональных данных, размещенной по адресу: ${policyLink}.`;
    }

    if (docId === "consentForms") {
      return `Документ 3. Согласие на обработку персональных данных для форм сайта

Я, пользователь сайта ${site}, свободно, своей волей и в своем интересе даю согласие ${company}, ИНН ${inn}, адрес: ${address}, email: ${email}, на обработку моих персональных данных.
Цели обработки: обработка заявки/обращения, обратная связь, предоставление ответа, подготовка предложения, заключение и исполнение договора/заказа, а также иные конкретные цели, указанные рядом с соответствующей формой: ${consentPurposes}.
Перечень персональных данных: ${formFields}.
Действия с персональными данными: сбор, запись, систематизация, накопление, хранение, уточнение, использование, передача, обезличивание, блокирование, удаление и уничтожение.
Способы обработки: с использованием средств автоматизации и без использования таких средств.
Третьи лица/категории третьих лиц, которым могут передаваться данные: ${thirdPartiesShort}.
Срок действия согласия: до достижения целей обработки, до истечения срока хранения ${retention} или до отзыва согласия, если отсутствуют иные законные основания для обработки.
Я уведомлен(а), что могу отозвать согласие, направив обращение на email ${email} или по адресу ${address}. Отзыв согласия не влияет на законность обработки, осуществленной до его получения.`;
    }

    if (docId === "consentCookie") {
      return `Документ 4. Согласие на обработку персональных данных в целях cookie и веб-аналитики

Я, пользователь сайта ${site}, даю согласие ${company} на обработку персональных данных и онлайн-идентификаторов с использованием cookie и аналогичных технологий.
Цели обработки: обеспечение работы сайта, сохранение выбранных настроек, анализ посещаемости и действий пользователей, улучшение сайта, оценка эффективности рекламы и настройка рекламных аудиторий, если соответствующие категории cookie выбраны пользователем.
Перечень данных: IP-адрес, cookie-идентификаторы, user agent, сведения о браузере, устройстве и операционной системе, дата и время посещения, источник перехода, просмотренные страницы, события и действия на сайте.
Сервисы и третьи лица: ${services}.
Срок действия согласия: до изменения пользователем настроек cookie, до отзыва согласия или ${retention}.
Согласие может быть отозвано через настройки cookie на сайте ${cookieMechanism} или путем обращения на ${email}.`;
    }

    if (docId === "consentMailing") {
      return `Документ 5. Согласие на получение рекламной рассылки

Я, пользователь сайта ${site}, свободно, своей волей и в своем интересе даю согласие ${company} на получение рекламных и информационных сообщений.
Каналы рассылки: ${mailingChannels}.
Виды сообщений: новости, акции, специальные предложения, промокоды, информация о товарах/услугах, приглашения на мероприятия и иные рекламные сообщения: ${mailingMessageTypes}.
Обрабатываемые данные: ${mailingDataList}.
Срок действия согласия: до отзыва согласия или ${retention}.
Я понимаю, что согласие на рекламную рассылку не является обязательным условием покупки товара, получения услуги или направления основной заявки, если иное не предусмотрено законом.
Я могу отказаться от рассылки по ссылке «Отписаться» в сообщении, путем ответа на сообщение, через настройки аккаунта [ЕСЛИ ЕСТЬ] или направив обращение на ${email}. После отказа оператор прекращает направление рекламных сообщений по соответствующему каналу.`;
    }

    if (docId === "consentDistribution") {
      return `Документ 6. Согласие на обработку персональных данных, разрешенных для распространения

Я, ${ph("ФИО СУБЪЕКТА")}, контакт: ${ph("КОНТАКТ")}, свободно, своей волей и в своем интересе даю согласие ${company}, ИНН ${inn}, адрес: ${address}, на обработку персональных данных, разрешенных мной для распространения.
Сайт/страницы публикации: ${site}.
Цель публикации: размещение отзыва, кейса, фото/видео, информации о специалисте, клиентском опыте или иной материал: ${distributionPurpose}.
Перечень персональных данных, разрешенных для распространения: ${distributionData}.
Условия и запреты распространения: ${distributionConditions}.
Срок действия согласия: ${retention} или до отзыва согласия.
Я уведомлен(а), что могу потребовать прекратить распространение моих персональных данных, направив обращение на ${email} или по адресу ${address}.`;
    }

    if (docId === "agreement") {
      return `Документ 7. Пользовательское соглашение / публичная оферта (каркас)

1. Предмет
Настоящий документ регулирует порядок использования сайта ${site} и, если применимо, порядок заказа товаров/услуг, регистрации личного кабинета и оплаты. Конкретное назначение документа: ${agreementPurpose}.

2. Сведения о владельце сайта
${company}, ИНН ${inn}, ОГРН/ОГРНИП ${ogrn}, адрес: ${address}, email: ${email}.

3. Регистрация и личный кабинет
Раздел применяется, если на сайте есть личный кабинет. Пользователь обязуется предоставлять достоверные данные и сохранять конфиденциальность учетных данных. ${accountOrder}.

4. Заказ, оплата и исполнение
Раздел применяется, если сайт принимает заказы или оплату. ${orderPayment}.

5. Ограничения ответственности
${liability}.

6. Персональные данные
Обработка персональных данных осуществляется в соответствии с Политикой обработки персональных данных и отдельными согласиями пользователя. Согласие на обработку ПДн, согласие на рекламную рассылку и согласие на cookie не должны объединяться с акцептом оферты.

7. Изменение условий
${ph("ПОРЯДОК ИЗМЕНЕНИЯ УСЛОВИЙ И УВЕДОМЛЕНИЯ ПОЛЬЗОВАТЕЛЕЙ")}.`;
    }

    return "";
  };

  const downloadDoc = (docId: string, format: "txt" | "docx" | "pdf") => {
    const content = generateDocContent(docId);
    const doc = DOCS.find((d) => d.id === docId);
    const filename = `${doc?.label || docId}`;

    if (format === "txt") {
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === "docx") {
      const rtfContent = `{\\rtf1\\ansi\\deff0 {\\fonttbl{\\f0 Times New Roman;}} \\f0\\fs24 ${content.replace(/\n/g, "\\par ")}}`;
      const blob = new Blob([rtfContent], { type: "application/msword" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${filename}.doc`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === "pdf") {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`<html><head><title>${filename}</title>
          <style>body{font-family:Arial,sans-serif;font-size:12pt;line-height:1.6;padding:40px;max-width:800px;margin:0 auto;}
          pre{white-space:pre-wrap;font-family:inherit;}</style></head>
          <body><pre>${content}</pre></body></html>`);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => { printWindow.print(); }, 300);
      }
    }
  };

  const downloadAll = (format: "txt" | "docx" | "pdf") => {
    selectedDocs.forEach((id, i) => {
      setTimeout(() => downloadDoc(id, format), i * 400);
    });
  };

  const allDetailFields: { key: keyof FormData; label: string; placeholder: string; show: boolean }[] = [
    { key: "formData", label: "Состав данных по формам", placeholder: "Имя, телефон, email", show: form.hasFeedbackForm },
    { key: "consentPurposes", label: "Цели обработки данных по формам", placeholder: "Обработка заявки, обратная связь, подготовка предложения", show: form.hasFeedbackForm },
    { key: "analyticsServices", label: "Сервисы аналитики", placeholder: "Яндекс.Метрика, Google Analytics, пиксели", show: form.hasAnalytics || form.hasCookies },
    { key: "cookieMechanism", label: "Механизм управления cookie на сайте", placeholder: "Например: кнопка «Настройки cookie»", show: form.hasCookies },
    { key: "policyLink", label: "Ссылка на Политику обработки ПДн", placeholder: "https://example.ru/privacy", show: form.hasCookies },
    { key: "paymentData", label: "Данные для онлайн-оплаты", placeholder: "ФИО, email, телефон, сумма заказа", show: form.hasPayments },
    { key: "contractData", label: "Данные для договора/заказа", placeholder: "ФИО, телефон, email, адрес доставки, состав заказа", show: form.hasPayments },
    { key: "deliveryData", label: "Данные для доставки", placeholder: "ФИО, телефон, адрес доставки", show: form.hasPayments },
    { key: "accountData", label: "Данные личного кабинета", placeholder: "Имя, email, телефон, логин, история заказов", show: form.hasAccount },
    { key: "accountOrder", label: "Порядок регистрации и удаления аккаунта", placeholder: "Опишите как пользователь регистрируется и удаляет аккаунт", show: form.hasAccount },
    { key: "orderPayment", label: "Условия заказа и оплаты", placeholder: "Товары/услуги, цены, оплата, сроки, доставка, возвраты", show: form.hasPayments },
    { key: "agreementPurpose", label: "Назначение документа (соглашение/оферта)", placeholder: "Пользовательское соглашение или публичная оферта", show: form.hasPayments || form.hasAccount },
    { key: "liability", label: "Ограничения ответственности", placeholder: "Реальные ограничения, не нарушающие права потребителей", show: form.hasPayments || form.hasAccount },
    { key: "mailingChannels", label: "Каналы рассылки", placeholder: "Email, SMS, мессенджеры, push", show: form.hasMailing },
    { key: "mailingMessageTypes", label: "Виды рекламных сообщений", placeholder: "Акции, спецпредложения, новости, промокоды", show: form.hasMailing },
    { key: "mailingDataList", label: "Данные для рассылки", placeholder: "Имя, email, телефон, аккаунт в мессенджере", show: form.hasMailing },
    { key: "distributionPurpose", label: "Цель публикации данных", placeholder: "Размещение отзыва, кейса, фото на сайте", show: form.hasPublishing },
    { key: "distributionData", label: "Какие данные публикуются", placeholder: "ФИО, должность, компания, фото, текст отзыва", show: form.hasPublishing },
    { key: "distributionConditions", label: "Условия и запреты публикации", placeholder: "Условия/запреты или «не установлены»", show: form.hasPublishing },
    { key: "thirdParties", label: "Третьи лица, которым передаются данные", placeholder: "CRM, хостинг, сервис рассылки — или «не передаются»", show: true },
    { key: "retentionPeriod", label: "Срок хранения данных", placeholder: "Например: 3 года или до отзыва согласия", show: true },
    { key: "securityMeasures", label: "Меры защиты данных", placeholder: "Разграничение доступа, пароли, HTTPS, резервное копирование", show: true },
    { key: "crossBorder", label: "Трансграничная передача (зарубежные сервисы)", placeholder: "Есть ли зарубежные сервисы и в какие страны", show: true },
  ];
  const detailFields = allDetailFields.filter((f) => f.show);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = (["home", "generator", "about"] as Section[]);
  const navLabel = (s: Section) => s === "home" ? "Главная" : s === "generator" ? "Генератор" : "О сервисе";

  const handleNav = (s: Section) => {
    setSection(s);
    if (s === "generator") { setStep(1); setGenerated(false); }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-mesh font-sans">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1a4fd6] flex items-center justify-center">
              <Icon name="FileCheck" size={16} className="text-white" />
            </div>
            <span className="font-bold text-[#0e1a2e] text-lg tracking-tight">
              Дока<span className="text-[#1a4fd6]">152</span>
            </span>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((s) => (
              <button
                key={s}
                onClick={() => handleNav(s)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  section === s
                    ? "bg-[#1a4fd6] text-white"
                    : "text-gray-500 hover:text-[#0e1a2e] hover:bg-gray-50"
                }`}
              >
                {navLabel(s)}
              </button>
            ))}
          </div>

          {/* Burger button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-all"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Меню"
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-md px-4 py-3 flex flex-col gap-1">
            {navItems.map((s) => (
              <button
                key={s}
                onClick={() => handleNav(s)}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  section === s
                    ? "bg-[#1a4fd6] text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {navLabel(s)}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* === HOME === */}
      {section === "home" && (
        <main>
          {/* HERO */}
          <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#1a4fd6] text-xs font-semibold px-4 py-2 rounded-full mb-8 animate-fade-in">
              <Icon name="Zap" size={12} />
              Бесплатно · Без регистрации · Данные не покидают браузер
            </div>

            <h1 className="md:text-6xl text-[#0e1a2e] leading-tight mb-6 animate-fade-in animate-delay-100 opacity-0-init font-bold text-2xl">
              Документы для сайта<br />
              <span className="text-gradient">по 152-ФЗ</span><br />
              <span className="font-serif italic font-normal text-4xl md:text-5xl text-gray-500">за 5 минут</span>
            </h1>

            <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10 animate-fade-in animate-delay-200 opacity-0-init">
              Генерируйте юридически грамотные документы: политику конфиденциальности, пользовательское соглашение и согласие на обработку персональных данных.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in animate-delay-300 opacity-0-init">
              <button
                onClick={() => setSection("generator")}
                className="flex items-center gap-2 bg-[#1a4fd6] hover:bg-[#1540b8] text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-200"
              >
                <Icon name="Sparkles" size={18} />
                Создать документы
              </button>
              <button
                onClick={() => setSection("about")}
                className="flex items-center gap-2 text-gray-600 hover:text-[#1a4fd6] font-medium px-6 py-4 rounded-xl border border-gray-200 hover:border-blue-200 transition-all bg-white"
              >
                <Icon name="Info" size={16} />
                Узнать подробнее
              </button>
            </div>
          </section>

          {/* DOCS PREVIEW */}
          <section className="max-w-6xl mx-auto px-6 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {DOCS.map((doc, i) => (
                <div
                  key={doc.id}
                  className={`card-glass rounded-2xl p-5 flex flex-col gap-3 animate-fade-in opacity-0-init cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1`}
                  style={{ animationDelay: `${0.1 + i * 0.1}s` }}
                  onClick={() => setSection("generator")}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Icon name={doc.icon} size={20} className="text-[#1a4fd6]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#0e1a2e] leading-tight text-sm">{doc.label}</p>
                    {doc.required && (
                      <span className="text-[10px] text-[#1a4fd6] font-semibold bg-blue-50 px-2 py-0.5 rounded-full mt-1 inline-block">Обязательно</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* STEPS */}
          <section className="bg-white border-y border-gray-100 py-20">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-3xl font-black text-center text-[#0e1a2e] mb-12">
                Как это работает
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {STEPS.map((s, i) => (
                  <div key={i} className="flex flex-col items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#1a4fd6] text-white flex items-center justify-center font-black text-lg">
                      {s.num}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0e1a2e] text-lg mb-1">{s.title}</h3>
                      <p className="text-gray-500 text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="max-w-6xl mx-auto px-6 py-20">
            <h2 className="text-3xl font-black text-[#0e1a2e] mb-10 text-center">Частые вопросы</h2>
            <div className="max-w-2xl mx-auto space-y-3">
              {FAQ.map((item, i) => (
                <div
                  key={i}
                  className="card-glass rounded-2xl overflow-hidden"
                >
                  <button
                    className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-semibold text-[#0e1a2e]"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{item.q}</span>
                    <Icon
                      name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                      size={18}
                      className="text-gray-400 flex-shrink-0 transition-transform"
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-4">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="max-w-6xl mx-auto px-6 pb-20">
            <div className="bg-[#1a4fd6] rounded-3xl p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 40%)"
              }} />
              <h2 className="text-3xl font-black text-white mb-3 relative">
                Начните прямо сейчас — это бесплатно
              </h2>
              <p className="text-blue-200 mb-8 relative">Регистрация не нужна. Данные остаются в вашем браузере.</p>
              <button
                onClick={() => setSection("generator")}
                className="bg-white text-[#1a4fd6] font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all hover:scale-105 relative"
              >
                Создать документы бесплатно
              </button>
            </div>
          </section>
        </main>
      )}

      {/* === GENERATOR === */}
      {section === "generator" && (
        <main className="max-w-3xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-[#0e1a2e] mb-2">Генератор документов</h1>
            <p className="text-gray-500">Заполните форму и получите готовый пакет документов</p>
          </div>

          {/* Stepper */}
          <div className="flex items-center gap-2 mb-10">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s ? "bg-[#1a4fd6] text-white" : "bg-gray-100 text-gray-400"
                }`}>
                  {step > s ? <Icon name="Check" size={14} /> : s}
                </div>
                <span className={`text-sm font-medium hidden sm:inline ${step >= s ? "text-[#1a4fd6]" : "text-gray-400"}`}>
                  {s === 1 ? "Данные" : s === 2 ? "Документы" : "Скачать"}
                </span>
                {s < 3 && <div className={`h-px w-8 ${step > s ? "bg-[#1a4fd6]" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="card-glass rounded-2xl p-8 animate-fade-in">
              <h2 className="font-bold text-[#0e1a2e] text-xl mb-6">Данные организации</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-600 block mb-1.5">Название организации *</label>
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    placeholder="ООО «Компания»"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a4fd6] transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1.5">Статус оператора</label>
                  <select
                    value={form.companyType}
                    onChange={(e) => setForm({ ...form, companyType: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                  >
                    <option value="юридическое лицо">Юридическое лицо</option>
                    <option value="ИП">Индивидуальный предприниматель</option>
                    <option value="самозанятый">Самозанятый</option>
                    <option value="физическое лицо">Физическое лицо</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1.5">ИНН</label>
                  <input
                    type="text"
                    value={form.inn}
                    onChange={(e) => setForm({ ...form, inn: e.target.value })}
                    placeholder="7700000000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a4fd6] transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1.5">ОГРН / ОГРНИП</label>
                  <input
                    type="text"
                    value={form.ogrn}
                    onChange={(e) => setForm({ ...form, ogrn: e.target.value })}
                    placeholder="1234567890123"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a4fd6] transition-all bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-600 block mb-1.5">Адрес сайта *</label>
                  <input
                    type="text"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="https://example.ru"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a4fd6] transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1.5">Email для связи *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="info@company.ru"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a4fd6] transition-all bg-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1.5">Телефон</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+7 (999) 000-00-00"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a4fd6] transition-all bg-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-semibold text-gray-600 block mb-1.5">Юридический адрес</label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="г. Москва, ул. Примерная, д. 1"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a4fd6] transition-all bg-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm font-semibold text-gray-600 mb-3">Что использует ваш сайт?</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: "hasFeedbackForm", label: "Формы с данными", icon: "MessageSquare" },
                      { key: "hasCookies", label: "Файлы cookie", icon: "Cookie" },
                      { key: "hasAnalytics", label: "Аналитика (Метрика, GA)", icon: "BarChart2" },
                      { key: "hasPayments", label: "Приём платежей", icon: "CreditCard" },
                      { key: "hasMailing", label: "Рекламная рассылка", icon: "Mail" },
                      { key: "hasPublishing", label: "Публикация отзывов / фото", icon: "Share2" },
                    ].map(({ key, label, icon }) => (
                      <label
                        key={key}
                        className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          form[key as keyof FormData]
                            ? "border-[#1a4fd6] bg-blue-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form[key as keyof FormData] as boolean}
                          onChange={(e) => setForm({ ...form, [key]: e.target.checked })}
                          className="sr-only"
                        />
                        <Icon name={icon} size={16} className={form[key as keyof FormData] ? "text-[#1a4fd6]" : "text-gray-400"} />
                        <span className="text-sm font-medium text-[#0e1a2e]">{label}</span>
                        {form[key as keyof FormData] && <Icon name="Check" size={14} className="ml-auto text-[#1a4fd6]" />}
                      </label>
                    ))}
                  </div>
                </div>

                {detailFields.length > 0 && (
                  <div className="md:col-span-2 pt-2">
                    <p className="text-sm font-semibold text-gray-600 mb-1">Дополнительные данные для документов</p>
                    <p className="text-xs text-gray-400">Необязательно. Поля появляются в зависимости от того, что использует ваш сайт. Если оставить поле пустым, в документе останется метка <span className="text-[#1a4fd6] font-medium">[УКАЗАТЬ ...]</span> для самостоятельного заполнения.</p>
                  </div>
                )}
                {detailFields.map((f) => (
                  <div className="md:col-span-2 animate-fade-in" key={f.key}>
                    <label className="text-sm font-semibold text-gray-600 block mb-1.5">{f.label}</label>
                    <input
                      type="text"
                      value={form[f.key] as string}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      placeholder={f.placeholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#1a4fd6] transition-all bg-white"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => {
                    if (!form.companyName || !form.website || !form.email) {
                      alert("Заполните обязательные поля: название организации, сайт и email");
                      return;
                    }
                    const auto: string[] = ["privacy"];
                    if (form.hasFeedbackForm) auto.push("consentForms");
                    if (form.hasCookies) auto.push("cookie");
                    if (form.hasAnalytics) auto.push("consentCookie");
                    if (form.hasMailing) auto.push("consentMailing");
                    if (form.hasPublishing) auto.push("consentDistribution");
                    if (form.hasPayments || form.hasAccount) auto.push("agreement");
                    setSelectedDocs(auto);
                    setStep(2);
                  }}
                  className="flex items-center gap-2 bg-[#1a4fd6] hover:bg-[#1540b8] text-white font-semibold px-6 py-3 rounded-xl transition-all"
                >
                  Далее
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="card-glass rounded-2xl p-8 animate-fade-in">
              <h2 className="font-bold text-[#0e1a2e] text-xl mb-2">Выберите документы</h2>
              <p className="text-gray-500 text-sm mb-6">Отметьте нужные документы для вашего сайта</p>

              <div className="space-y-3 mb-8">
                {DOCS.map((doc) => (
                  <label
                    key={doc.id}
                    className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                      selectedDocs.includes(doc.id)
                        ? "border-[#1a4fd6] bg-blue-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedDocs.includes(doc.id)}
                      onChange={() => toggleDoc(doc.id)}
                      className="sr-only"
                    />
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      selectedDocs.includes(doc.id) ? "bg-[#1a4fd6]" : "bg-gray-100"
                    }`}>
                      <Icon name={doc.icon} size={18} className={selectedDocs.includes(doc.id) ? "text-white" : "text-gray-400"} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#0e1a2e]">{doc.label}</p>
                      {doc.required && <span className="text-xs text-[#1a4fd6] font-medium">Обязательный документ по 152-ФЗ</span>}
                    </div>
                    <button
                      onClick={(e) => { e.preventDefault(); setPreviewDoc(doc.id); }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1a4fd6] hover:bg-blue-100 transition-all flex-shrink-0"
                    >
                      <Icon name="Eye" size={14} />
                      Просмотр
                    </button>
                    <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selectedDocs.includes(doc.id) ? "bg-[#1a4fd6] border-[#1a4fd6]" : "border-gray-300"
                    }`}>
                      {selectedDocs.includes(doc.id) && <Icon name="Check" size={12} className="text-white" />}
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 text-gray-500 hover:text-[#0e1a2e] font-medium px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 transition-all bg-white"
                >
                  <Icon name="ArrowLeft" size={16} />
                  Назад
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={selectedDocs.length === 0}
                  className="flex items-center gap-2 bg-[#1a4fd6] hover:bg-[#1540b8] disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-all"
                >
                  <Icon name="Sparkles" size={16} />
                  Сгенерировать
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && generated && (
            <div className="animate-fade-in">
              <div className="card-glass rounded-2xl p-6 mb-6 flex items-center gap-4 border-green-100 bg-green-50/50">
                <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Icon name="CheckCircle" size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="font-bold text-[#0e1a2e]">Документы готовы!</p>
                  <p className="text-sm text-gray-500">Сгенерировано {selectedDocs.length} {selectedDocs.length === 1 ? "документ" : "документа"} для {form.companyName}</p>
                </div>
              </div>

              {/* Download all */}
              <div className="card-glass rounded-2xl p-6 mb-4">
                <h3 className="font-bold text-[#0e1a2e] mb-4">Скачать всё одним архивом</h3>
                <div className="flex flex-wrap gap-3">
                  {(["docx", "pdf", "txt"] as const).map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => downloadAll(fmt)}
                      className="flex items-center gap-2 border border-gray-200 hover:border-[#1a4fd6] hover:bg-blue-50 text-[#0e1a2e] font-semibold px-5 py-2.5 rounded-xl transition-all text-sm bg-white"
                    >
                      <Icon name="Download" size={15} className="text-[#1a4fd6]" />
                      Все в .{fmt.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Individual docs */}
              <div className="space-y-3">
                {selectedDocs.map((id) => {
                  const doc = DOCS.find((d) => d.id === id)!;
                  return (
                    <div key={id} className="card-glass rounded-2xl p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                          <Icon name={doc.icon} size={17} className="text-[#1a4fd6]" />
                        </div>
                        <p className="font-semibold text-[#0e1a2e] text-sm">{doc.label}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => setPreviewDoc(id)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all border border-gray-200 text-[#0e1a2e] hover:border-[#1a4fd6] hover:bg-blue-50 bg-white"
                        >
                          <Icon name="Eye" size={12} className="text-[#1a4fd6]" />
                          Предпросмотр
                        </button>
                        {(["docx", "pdf", "txt"] as const).map((fmt) => (
                          <button
                            key={fmt}
                            onClick={() => downloadDoc(id, fmt)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                              fmt === "docx"
                                ? "bg-[#1a4fd6] text-white hover:bg-[#1540b8]"
                                : fmt === "pdf"
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            <Icon name="Download" size={12} />
                            .{fmt.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-wrap gap-3 mb-4">
                <button
                  onClick={() => { setGenerated(false); setStep(1); }}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#0e1a2e] font-medium px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all bg-white text-sm"
                >
                  <Icon name="ArrowLeft" size={15} />
                  Изменить данные
                </button>
                <button
                  onClick={() => { setGenerated(false); setStep(2); }}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#0e1a2e] font-medium px-4 py-2.5 rounded-xl border border-gray-200 hover:border-gray-300 transition-all bg-white text-sm"
                >
                  <Icon name="ListChecks" size={15} />
                  Изменить документы
                </button>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => { setStep(1); setGenerated(false); setForm(defaultForm); }}
                  className="text-sm text-gray-500 hover:text-[#1a4fd6] font-medium transition-colors"
                >
                  ← Создать новый пакет
                </button>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Icon name="Lock" size={12} />
                  Данные не отправляются на сервер
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* === ABOUT === */}
      {section === "about" && (
        <main className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-black text-[#0e1a2e] mb-4">О сервисе</h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Дока152 — бесплатный инструмент для владельцев сайтов, которым нужно соответствовать требованиям 152-ФЗ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {[
              { icon: "Shield", title: "152-ФЗ «О персональных данных»", desc: "Документы составлены с учётом актуальных требований российского законодательства о защите персональных данных.", color: "blue" },
              { icon: "Lock", title: "Данные остаются у вас", desc: "Всё генерируется прямо в браузере. Мы не видим и не храним ничего, что вы вводите в форму.", color: "green" },
              { icon: "Zap", title: "Быстро и бесплатно", desc: "Никакой регистрации, никаких платежей. Просто заполните форму и скачайте готовые документы.", color: "yellow" },
              { icon: "Download", title: "Удобные форматы", desc: "Скачивайте документы в Word (.docx), PDF для печати или TXT для самостоятельного редактирования.", color: "purple" },
            ].map((item, i) => (
              <div key={i} className="card-glass rounded-2xl p-6 flex gap-4">
                <div className={`w-11 h-11 rounded-2xl flex-shrink-0 flex items-center justify-center ${
                  item.color === "blue" ? "bg-blue-100" :
                  item.color === "green" ? "bg-green-100" :
                  item.color === "yellow" ? "bg-amber-100" : "bg-purple-100"
                }`}>
                  <Icon name={item.icon} size={20} className={
                    item.color === "blue" ? "text-[#1a4fd6]" :
                    item.color === "green" ? "text-green-600" :
                    item.color === "yellow" ? "text-amber-600" : "text-purple-600"
                  } />
                </div>
                <div>
                  <h3 className="font-bold text-[#0e1a2e] mb-1.5">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-black text-[#0e1a2e] mb-4">Какие документы генерируем</h2>
            <div className="space-y-4">
              {[
                { title: "Политика обработки персональных данных", desc: "Раскрывает реквизиты оператора, цели, состав ПДн, основания, сроки, третьих лиц и права субъекта." },
                { title: "Политика использования файлов cookie", desc: "Описывает категории cookie, провайдеров, управление согласием и порядок отзыва." },
                { title: "Согласие на обработку ПДн для форм", desc: "Отдельное согласие для форм сайта: кто даёт, кому, цели, данные, срок, отзыв." },
                { title: "Согласие на cookie и веб-аналитику", desc: "Для необязательной аналитики и маркетинговых cookie: IP, cookie ID, события, провайдеры." },
                { title: "Согласие на рекламную рассылку", desc: "Отдельное добровольное согласие на рекламные сообщения по разным каналам." },
                { title: "Согласие на распространение ПДн", desc: "Для публикации отзывов, фото, кейсов и профилей на сайте." },
                { title: "Пользовательское соглашение / оферта", desc: "Каркас для личного кабинета, заказа, оплаты и оказания услуг через сайт." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 py-4 border-b border-gray-50 last:border-0">
                  <div className="w-6 h-6 rounded-full bg-[#1a4fd6] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-semibold text-[#0e1a2e] mb-1">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-black text-[#0e1a2e] mb-2">Разработчик сервиса</h2>
            <p className="text-gray-500 mb-6">
              Сервис разработал{" "}
              <a href="https://vladimir-kozlov.ru" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1a4fd6] hover:underline">
                Мр.Владимир
              </a>
              . Связаться можно по любому из контактов ниже.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: "https://vladimir-kozlov.ru", icon: "Globe", title: "Сайт", value: "vladimir-kozlov.ru" },
                { href: "https://vk.ru/vladimir_kozlove", icon: "Users", title: "ВКонтакте", value: "vk.ru/vladimir_kozlove" },
                { href: "https://vk.cc/cPdh5I", icon: "MessageCircle", title: "МАКС", value: "Перейти" },
                { href: "https://t.me/vladimir_kozlove", icon: "Send", title: "Телеграм", value: "@vladimir_kozlove" },
                { href: "mailto:vladimirkozlove@yandex.ru", icon: "Mail", title: "Почта", value: "vladimirkozlove@yandex.ru" },
              ].map((s) => (
                <a
                  key={s.title}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#1a4fd6] hover:bg-blue-50 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-white transition-colors">
                    <Icon name={s.icon} size={18} className="text-[#1a4fd6]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">{s.title}</p>
                    <p className="text-sm font-semibold text-[#0e1a2e] truncate">{s.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-500 mb-6">Готовы создать документы для вашего сайта?</p>
            <button
              onClick={() => setSection("generator")}
              className="inline-flex items-center gap-2 bg-[#1a4fd6] hover:bg-[#1540b8] text-white font-semibold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-200"
            >
              <Icon name="Sparkles" size={18} />
              Открыть генератор
            </button>
          </div>
        </main>
      )}

      {/* FOOTER */}
      <footer className="border-t border-gray-100 bg-white mt-8">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1a4fd6] flex items-center justify-center">
              <Icon name="FileCheck" size={13} className="text-white" />
            </div>
            <span className="font-bold text-[#0e1a2e]">Дока<span className="text-[#1a4fd6]">152</span></span>
          </div>
          <p className="text-gray-400 text-sm text-center">
            Бесплатный генератор документов для соответствия 152-ФЗ
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Icon name="Lock" size={11} />
            Данные не передаются
          </div>
        </div>
        <div className="border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500 text-center">
              Сервис разработал{" "}
              <a href="https://vladimir-kozlov.ru" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#1a4fd6] hover:underline">
                Мр.Владимир
              </a>
            </p>
            <div className="flex items-center gap-2">
              {[
                { href: "https://vk.ru/vladimir_kozlove", icon: "Users", title: "ВКонтакте" },
                { href: "https://vk.cc/cPdh5I", icon: "MessageCircle", title: "МАКС" },
                { href: "https://t.me/vladimir_kozlove", icon: "Send", title: "Телеграм" },
                { href: "mailto:vladimirkozlove@yandex.ru", icon: "Mail", title: "Почта" },
              ].map((s) => (
                <a
                  key={s.title}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.title}
                  className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#1a4fd6] hover:border-[#1a4fd6] hover:bg-blue-50 transition-all"
                >
                  <Icon name={s.icon} size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* PREVIEW MODAL */}
      {previewDoc && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Icon name={DOCS.find((d) => d.id === previewDoc)?.icon || "FileText"} size={17} className="text-[#1a4fd6]" />
                </div>
                <p className="font-semibold text-[#0e1a2e] text-sm truncate">{DOCS.find((d) => d.id === previewDoc)?.label}</p>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center flex-shrink-0 transition-colors"
              >
                <Icon name="X" size={18} className="text-gray-500" />
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-5 flex-1">
              <pre className="whitespace-pre-wrap font-sans text-sm text-[#0e1a2e] leading-relaxed">{generateDocContent(previewDoc)}</pre>
            </div>
            <div className="flex flex-wrap gap-2 px-6 py-4 border-t border-gray-100">
              {(["docx", "pdf", "txt"] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => downloadDoc(previewDoc, fmt)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all border border-gray-200 text-[#0e1a2e] hover:border-[#1a4fd6] hover:bg-blue-50 bg-white"
                >
                  <Icon name="Download" size={12} className="text-[#1a4fd6]" />
                  Скачать .{fmt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}