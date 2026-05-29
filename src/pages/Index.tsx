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
  directorName: string;
  hasAnalytics: boolean;
  hasPayments: boolean;
  hasCookies: boolean;
  hasFeedbackForm: boolean;
}

const DOCS = [
  { id: "privacy", label: "Политика конфиденциальности", icon: "Shield", required: true },
  { id: "cookie", label: "Политика использования cookies", icon: "Cookie", required: false },
  { id: "agreement", label: "Пользовательское соглашение", icon: "FileText", required: true },
  { id: "consent", label: "Согласие на обработку ПД", icon: "CheckSquare", required: false },
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

export default function Index() {
  const [section, setSection] = useState<Section>("home");
  const [step, setStep] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedDocs, setSelectedDocs] = useState<string[]>(["privacy", "agreement"]);
  const [form, setForm] = useState<FormData>({
    companyName: "",
    companyType: "ООО",
    website: "",
    email: "",
    phone: "",
    address: "",
    inn: "",
    directorName: "",
    hasAnalytics: true,
    hasPayments: false,
    hasCookies: true,
    hasFeedbackForm: true,
  });
  const [generated, setGenerated] = useState(false);

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
    const date = new Date().toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" });
    const company = form.companyName || "Организация";
    const site = form.website || "сайт";
    const email = form.email || "email@example.com";

    if (docId === "privacy") {
      return `ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ

${company} (далее — «Оператор»)

Дата: ${date}
Сайт: ${site}

1. ОБЩИЕ ПОЛОЖЕНИЯ

Настоящая политика конфиденциальности разработана в соответствии с Федеральным законом № 152-ФЗ «О персональных данных» и регулирует порядок обработки персональных данных пользователей сайта ${site}.

2. КАКИЕ ДАННЫЕ МЫ СОБИРАЕМ

Оператор может собирать следующие персональные данные:
— Имя и фамилия
— Адрес электронной почты
— Номер телефона${form.hasAnalytics ? "\n— Данные аналитики (IP-адрес, тип браузера, страницы посещений)" : ""}${form.hasPayments ? "\n— Платёжные реквизиты (обрабатываются платёжными системами)" : ""}

3. ЦЕЛИ ОБРАБОТКИ ДАННЫХ

Персональные данные обрабатываются в целях:
— Обратной связи с пользователем
— Исполнения договорных обязательств
— Улучшения качества сервиса

4. ПРАВОВЫЕ ОСНОВАНИЯ

Обработка персональных данных осуществляется на основании:
— Согласия субъекта персональных данных (ст. 6 152-ФЗ)
— Исполнения договора с субъектом персональных данных

5. ПЕРЕДАЧА ДАННЫХ ТРЕТЬИМ ЛИЦАМ

Оператор не передаёт персональные данные третьим лицам без согласия субъекта, за исключением случаев, предусмотренных законодательством РФ.

6. СРОКИ ХРАНЕНИЯ

Персональные данные хранятся не дольше, чем этого требуют цели их обработки, после чего подлежат уничтожению.

7. ПРАВА СУБЪЕКТОВ ПЕРСОНАЛЬНЫХ ДАННЫХ

Каждый пользователь вправе:
— Получить информацию об обработке его персональных данных
— Потребовать уточнения, блокировки или уничтожения данных
— Отозвать согласие на обработку персональных данных

8. КОНТАКТНАЯ ИНФОРМАЦИЯ

По вопросам обработки персональных данных обращайтесь: ${email}
${form.address ? "Адрес: " + form.address : ""}

${company}
${form.inn ? "ИНН: " + form.inn : ""}`;
    }

    if (docId === "agreement") {
      return `ПОЛЬЗОВАТЕЛЬСКОЕ СОГЛАШЕНИЕ

${company}
Сайт: ${site}
Дата вступления в силу: ${date}

1. ПРЕДМЕТ СОГЛАШЕНИЯ

Настоящее Пользовательское соглашение (далее — «Соглашение») регулирует отношения между ${company} (далее — «Администрация») и пользователями сайта ${site}.

Использование сайта означает полное и безоговорочное принятие условий настоящего Соглашения.

2. ПРАВА И ОБЯЗАННОСТИ ПОЛЬЗОВАТЕЛЯ

Пользователь обязуется:
— Предоставлять достоверную информацию при регистрации и использовании сервиса
— Не нарушать работу сайта и не предпринимать действий, способных причинить вред Администрации
— Соблюдать требования действующего законодательства РФ

3. ПРАВА И ОБЯЗАННОСТИ АДМИНИСТРАЦИИ

Администрация вправе:
— Изменять условия настоящего Соглашения в одностороннем порядке
— Ограничивать доступ пользователей, нарушающих условия Соглашения

4. ОГРАНИЧЕНИЕ ОТВЕТСТВЕННОСТИ

Сайт предоставляется «как есть». Администрация не несёт ответственности за:
— Перебои в работе сайта по техническим причинам
— Действия третьих лиц

5. ИНТЕЛЛЕКТУАЛЬНАЯ СОБСТВЕННОСТЬ

Все материалы сайта ${site} являются собственностью ${company} и защищены законодательством об интеллектуальной собственности.

6. ПРИМЕНИМОЕ ПРАВО

Настоящее Соглашение регулируется законодательством Российской Федерации.

7. КОНТАКТЫ

${company}
Email: ${email}
${form.phone ? "Телефон: " + form.phone : ""}
${form.address ? "Адрес: " + form.address : ""}`;
    }

    if (docId === "cookie") {
      return `ПОЛИТИКА ИСПОЛЬЗОВАНИЯ ФАЙЛОВ COOKIE

Сайт: ${site}
Дата: ${date}

1. ЧТО ТАКОЕ COOKIE

Файлы cookie — это небольшие текстовые файлы, которые сохраняются в вашем браузере при посещении сайта ${site}.

2. КАКИЕ COOKIE МЫ ИСПОЛЬЗУЕМ

— Технические cookie (необходимы для работы сайта)
${form.hasAnalytics ? "— Аналитические cookie (Яндекс.Метрика, Google Analytics)\n" : ""}— Функциональные cookie (запоминание настроек)

3. УПРАВЛЕНИЕ COOKIE

Вы можете отключить cookie в настройках вашего браузера. Обратите внимание, что это может повлиять на функциональность сайта.

4. КОНТАКТЫ

По вопросам использования cookie: ${email}`;
    }

    if (docId === "consent") {
      return `СОГЛАСИЕ НА ОБРАБОТКУ ПЕРСОНАЛЬНЫХ ДАННЫХ

Я, субъект персональных данных, настоящим даю своё согласие ${company} (сайт: ${site}) на обработку следующих персональных данных:
— Фамилия, имя, отчество
— Адрес электронной почты
— Номер телефона

ЦЕЛИ ОБРАБОТКИ:
— Ответ на обращение / заявку
— Информирование об услугах

СПОСОБЫ ОБРАБОТКИ:
Сбор, запись, систематизация, хранение, уточнение, извлечение, использование, передача, обезличивание, блокирование, удаление, уничтожение.

СРОК ДЕЙСТВИЯ СОГЛАСИЯ: 3 года с момента подписания или до отзыва согласия.

Я уведомлен(а) о праве отзыва настоящего согласия путём направления письменного уведомления на адрес: ${email}

Дата: _____________      Подпись: _____________`;
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

  return (
    <div className="min-h-screen bg-mesh font-sans">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => setSection("home")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#1a4fd6] flex items-center justify-center">
              <Icon name="FileCheck" size={16} className="text-white" />
            </div>
            <span className="font-bold text-[#0e1a2e] text-lg tracking-tight">
              Дока<span className="text-[#1a4fd6]">152</span>
            </span>
          </button>

          <div className="flex items-center gap-1">
            {(["home", "generator", "about"] as Section[]).map((s) => (
              <button
                key={s}
                onClick={() => { setSection(s); if (s === "generator") { setStep(1); setGenerated(false); } }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  section === s
                    ? "bg-[#1a4fd6] text-white"
                    : "text-gray-500 hover:text-[#0e1a2e] hover:bg-gray-50"
                }`}
              >
                {s === "home" ? "Главная" : s === "generator" ? "Генератор" : "О сервисе"}
              </button>
            ))}
          </div>
        </div>
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

            <h1 className="text-5xl md:text-6xl font-black text-[#0e1a2e] leading-tight mb-6 animate-fade-in animate-delay-100 opacity-0-init">
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                    <p className="font-semibold text-[#0e1a2e] text-sm leading-tight">{doc.label}</p>
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
                  <label className="text-sm font-semibold text-gray-600 block mb-1.5">Тип организации</label>
                  <select
                    value={form.companyType}
                    onChange={(e) => setForm({ ...form, companyType: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                  >
                    <option>ООО</option>
                    <option>ИП</option>
                    <option>АО</option>
                    <option>ПАО</option>
                    <option>НКО</option>
                    <option>Физическое лицо</option>
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
                      { key: "hasAnalytics", label: "Аналитика (Метрика, GA)", icon: "BarChart2" },
                      { key: "hasPayments", label: "Приём платежей", icon: "CreditCard" },
                      { key: "hasCookies", label: "Файлы cookie", icon: "Cookie" },
                      { key: "hasFeedbackForm", label: "Форма обратной связи", icon: "MessageSquare" },
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
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => {
                    if (!form.companyName || !form.website || !form.email) {
                      alert("Заполните обязательные поля: название организации, сайт и email");
                      return;
                    }
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

              <div className="mt-6 flex justify-between items-center">
                <button
                  onClick={() => { setStep(1); setGenerated(false); setForm({ companyName: "", companyType: "ООО", website: "", email: "", phone: "", address: "", inn: "", directorName: "", hasAnalytics: true, hasPayments: false, hasCookies: true, hasFeedbackForm: true }); }}
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
                { title: "Политика конфиденциальности", desc: "Обязательный документ, описывающий какие персональные данные собирает сайт, зачем и как они защищаются." },
                { title: "Пользовательское соглашение", desc: "Регулирует правила использования сайта, права и обязанности сторон, ответственность." },
                { title: "Политика использования cookies", desc: "Объясняет пользователям, какие файлы cookie использует сайт и как ими управлять." },
                { title: "Согласие на обработку ПД", desc: "Форма согласия, которую пользователь подписывает при отправке своих данных через сайт." },
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
      </footer>
    </div>
  );
}