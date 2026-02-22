#!/usr/bin/env node
// generate-langs.js — generates all 45 language index.html pages

const fs = require("fs");
const path = require("path");

const langs = [
  { code:"en", flag:"🇺🇸", name:"English", title:"Pinterest Video Downloader – Free HD Download",
    desc:"Download Pinterest videos, GIFs and images for free in HD. No watermark, no login.",
    h1a:"Download Pinterest", h1b:"Videos & GIFs Free", sub:"Paste any Pinterest link and save videos, GIFs or images in HD — no watermark, no account needed.",
    badge:"✦ 100% Free · No Registration",
    T:{err_empty:"Please paste a Pinterest URL.",err_fail:"Could not download. Please try again.",err_server:"Server error.",btn_hd:"Download HD",btn_img:"Download Image",btn_open:"Open in Browser"},
    step1t:"Open the Pin",step1d:"Find the video or GIF on Pinterest and open the pin.",
    step2t:"Copy the Link",step2d:"Tap Share → Copy Link to get the pin URL.",
    step3t:"Paste & Download",step3d:"Paste the link above and click Download.",
    step4t:"Save to Device",step4d:"Click Download and the file saves to your device.",
    placeholder:"Paste Pinterest link here… (pinterest.com/pin/…)",
    btnLabel:"Download",pasteLabel:"📋 Paste",
    trustW:"No watermark",trustH:"HD quality",trustL:"No login",trustD:"All devices",trustF:"100% Free",
    faq1q:"How to download Pinterest video?",faq1a:"Copy the pin URL, paste it above, click Download, and save the file.",
    faq2q:"Is it free?",faq2a:"Yes, completely free with no limits.",
    faq3q:"What formats are supported?",faq3a:"Videos (MP4), GIFs, and images (JPG, PNG, WebP).",
    seoTitle:"Free Pinterest Video Downloader Online",
    seoP:"PinSave is a free online tool to download any public Pinterest video, GIF or image in HD quality — no watermark, no signup needed.",
    h2steps:"How to Download",h2feats:"Why Use PinSave?",h2faq:"FAQ",
  },
  { code:"hi", flag:"🇮🇳", name:"हिन्दी", title:"Pinterest वीडियो डाउनलोडर – मुफ्त HD | PinSave",
    desc:"Pinterest वीडियो, GIF और इमेज मुफ्त में HD क्वालिटी में डाउनलोड करें। कोई वॉटरमार्क नहीं।",
    h1a:"Pinterest", h1b:"वीडियो डाउनलोड करें", sub:"कोई भी Pinterest लिंक पेस्ट करें और वीडियो, GIF या इमेज बिना वॉटरमार्क के सेव करें।",
    badge:"✦ 100% मुफ्त · कोई रजिस्ट्रेशन नहीं",
    T:{err_empty:"कृपया Pinterest URL पेस्ट करें।",err_fail:"डाउनलोड नहीं हो सका। फिर कोशिश करें।",err_server:"सर्वर त्रुटि।",btn_hd:"HD डाउनलोड करें",btn_img:"इमेज डाउनलोड करें",btn_open:"ब्राउज़र में खोलें"},
    step1t:"पिन खोलें",step1d:"Pinterest पर वीडियो या GIF खोजें।",
    step2t:"लिंक कॉपी करें",step2d:"शेयर करें → लिंक कॉपी करें।",
    step3t:"पेस्ट करें",step3d:"लिंक ऊपर डालें और डाउनलोड करें।",
    step4t:"डिवाइस में सेव करें",step4d:"फ़ाइल सीधे डिवाइस में सेव होगी।",
    placeholder:"Pinterest लिंक यहाँ पेस्ट करें…",
    btnLabel:"डाउनलोड",pasteLabel:"📋 पेस्ट करें",
    trustW:"कोई वॉटरमार्क नहीं",trustH:"HD क्वालिटी",trustL:"लॉगिन नहीं",trustD:"सभी डिवाइस",trustF:"100% मुफ्त",
    faq1q:"Pinterest वीडियो कैसे डाउनलोड करें?",faq1a:"पिन URL कॉपी करें, ऊपर पेस्ट करें, डाउनलोड पर क्लिक करें।",
    faq2q:"क्या यह मुफ्त है?",faq2a:"हाँ, पूरी तरह मुफ्त, कोई सीमा नहीं।",
    faq3q:"कौन से फॉर्मेट सपोर्ट हैं?",faq3a:"वीडियो (MP4), GIF, और इमेज (JPG, PNG)।",
    seoTitle:"मुफ्त Pinterest वीडियो डाउनलोडर",
    seoP:"PinSave एक मुफ्त ऑनलाइन टूल है जो Pinterest वीडियो, GIF और इमेज HD में डाउनलोड करने देता है।",
    h2steps:"कैसे डाउनलोड करें",h2feats:"PinSave क्यों?",h2faq:"सामान्य प्रश्न",
  },
  { code:"es", flag:"🇪🇸", name:"Español", title:"Descargador de Videos Pinterest – HD Gratis | PinSave",
    desc:"Descarga videos, GIFs e imágenes de Pinterest gratis en HD. Sin marca de agua, sin registro.",
    h1a:"Descarga Videos de", h1b:"Pinterest Gratis", sub:"Pega cualquier enlace de Pinterest y descarga videos, GIFs o imágenes en HD — sin marca de agua.",
    badge:"✦ 100% Gratis · Sin Registro",
    T:{err_empty:"Por favor pega una URL de Pinterest.",err_fail:"No se pudo descargar. Inténtalo de nuevo.",err_server:"Error del servidor.",btn_hd:"Descargar HD",btn_img:"Descargar Imagen",btn_open:"Abrir en navegador"},
    step1t:"Abre el Pin",step1d:"Encuentra el video en Pinterest y ábrelo.",
    step2t:"Copia el enlace",step2d:"Toca Compartir → Copiar enlace.",
    step3t:"Pega y descarga",step3d:"Pega el enlace arriba y haz clic en Descargar.",
    step4t:"Guarda en tu dispositivo",step4d:"El archivo se guarda directamente.",
    placeholder:"Pega el enlace de Pinterest aquí…",
    btnLabel:"Descargar",pasteLabel:"📋 Pegar",
    trustW:"Sin marca de agua",trustH:"Calidad HD",trustL:"Sin registro",trustD:"Todos los dispositivos",trustF:"100% Gratis",
    faq1q:"¿Cómo descargar un video de Pinterest?",faq1a:"Copia la URL, pégala arriba y haz clic en Descargar.",
    faq2q:"¿Es gratuito?",faq2a:"Sí, completamente gratis sin límites.",
    faq3q:"¿Qué formatos soporta?",faq3a:"Videos (MP4), GIFs e imágenes (JPG, PNG).",
    seoTitle:"Descargador de Videos de Pinterest Gratis",seoP:"PinSave es una herramienta gratuita para descargar videos, GIFs e imágenes de Pinterest en alta calidad.",
    h2steps:"Cómo descargar",h2feats:"¿Por qué PinSave?",h2faq:"Preguntas frecuentes",
  },
  { code:"fr", flag:"🇫🇷", name:"Français", title:"Téléchargeur Vidéo Pinterest – HD Gratuit | PinSave",
    desc:"Téléchargez gratuitement des vidéos, GIFs et images Pinterest en HD. Sans filigrane, sans inscription.",
    h1a:"Téléchargez les Vidéos", h1b:"Pinterest Gratuitement", sub:"Collez n'importe quel lien Pinterest et téléchargez des vidéos, GIFs ou images en HD.",
    badge:"✦ 100% Gratuit · Sans Inscription",
    T:{err_empty:"Veuillez coller une URL Pinterest.",err_fail:"Échec du téléchargement. Réessayez.",err_server:"Erreur serveur.",btn_hd:"Télécharger HD",btn_img:"Télécharger l'image",btn_open:"Ouvrir dans le navigateur"},
    step1t:"Ouvrez le Pin",step1d:"Trouvez la vidéo sur Pinterest.",step2t:"Copiez le lien",step2d:"Appuyez sur Partager → Copier le lien.",
    step3t:"Collez et téléchargez",step3d:"Collez le lien ci-dessus et cliquez sur Télécharger.",step4t:"Enregistrez",step4d:"Le fichier est enregistré directement.",
    placeholder:"Collez le lien Pinterest ici…",btnLabel:"Télécharger",pasteLabel:"📋 Coller",
    trustW:"Sans filigrane",trustH:"Qualité HD",trustL:"Sans connexion",trustD:"Tous appareils",trustF:"100% Gratuit",
    faq1q:"Comment télécharger une vidéo Pinterest?",faq1a:"Copiez l'URL, collez-la ci-dessus et cliquez Télécharger.",faq2q:"Est-ce gratuit?",faq2a:"Oui, entièrement gratuit.",faq3q:"Quels formats?",faq3a:"Vidéos (MP4), GIFs, images (JPG, PNG).",
    seoTitle:"Meilleur téléchargeur vidéo Pinterest gratuit",seoP:"PinSave télécharge gratuitement des vidéos, GIFs et images Pinterest en HD.",
    h2steps:"Comment télécharger",h2feats:"Pourquoi PinSave?",h2faq:"Questions fréquentes",
  },
  { code:"de", flag:"🇩🇪", name:"Deutsch", title:"Pinterest Video Downloader – Kostenlos HD | PinSave",
    desc:"Lade Pinterest Videos, GIFs und Bilder kostenlos in HD herunter. Kein Wasserzeichen, keine Anmeldung.",
    h1a:"Pinterest Videos", h1b:"Kostenlos Herunterladen", sub:"Füge einen Pinterest-Link ein und lade Videos, GIFs oder Bilder in HD herunter – kein Wasserzeichen.",
    badge:"✦ 100% Kostenlos · Keine Registrierung",
    T:{err_empty:"Bitte füge eine Pinterest-URL ein.",err_fail:"Download fehlgeschlagen. Versuche es erneut.",err_server:"Serverfehler.",btn_hd:"HD Herunterladen",btn_img:"Bild Herunterladen",btn_open:"Im Browser öffnen"},
    step1t:"Pin öffnen",step1d:"Finde das Video auf Pinterest.",step2t:"Link kopieren",step2d:"Tippe auf Teilen → Link kopieren.",
    step3t:"Einfügen & Herunterladen",step3d:"Füge den Link oben ein und klicke Herunterladen.",step4t:"Auf Gerät speichern",step4d:"Die Datei wird direkt gespeichert.",
    placeholder:"Pinterest-Link hier einfügen…",btnLabel:"Herunterladen",pasteLabel:"📋 Einfügen",
    trustW:"Kein Wasserzeichen",trustH:"HD-Qualität",trustL:"Keine Anmeldung",trustD:"Alle Geräte",trustF:"100% Kostenlos",
    faq1q:"Wie lade ich Pinterest-Videos herunter?",faq1a:"URL kopieren, oben einfügen, Herunterladen klicken.",faq2q:"Ist es kostenlos?",faq2a:"Ja, völlig kostenlos.",faq3q:"Welche Formate?",faq3a:"Videos (MP4), GIFs, Bilder (JPG, PNG).",
    seoTitle:"Bester kostenloser Pinterest Video Downloader",seoP:"PinSave lädt Pinterest Videos, GIFs und Bilder kostenlos in HD herunter.",
    h2steps:"Wie herunterladen",h2feats:"Warum PinSave?",h2faq:"Häufige Fragen",
  },
  { code:"pt", flag:"🇧🇷", name:"Português", title:"Baixar Vídeos do Pinterest – HD Grátis | PinSave",
    desc:"Baixe vídeos, GIFs e imagens do Pinterest de graça em HD. Sem marca d'água, sem cadastro.",
    h1a:"Baixe Vídeos do", h1b:"Pinterest Grátis", sub:"Cole qualquer link do Pinterest e baixe vídeos, GIFs ou imagens em HD — sem marca d'água.",
    badge:"✦ 100% Grátis · Sem Cadastro",
    T:{err_empty:"Cole uma URL do Pinterest.",err_fail:"Falha no download. Tente novamente.",err_server:"Erro no servidor.",btn_hd:"Baixar HD",btn_img:"Baixar Imagem",btn_open:"Abrir no navegador"},
    step1t:"Abra o Pin",step1d:"Encontre o vídeo no Pinterest.",step2t:"Copie o link",step2d:"Compartilhar → Copiar link.",
    step3t:"Cole e baixe",step3d:"Cole o link acima e clique Baixar.",step4t:"Salve no dispositivo",step4d:"O arquivo é salvo diretamente.",
    placeholder:"Cole o link do Pinterest aqui…",btnLabel:"Baixar",pasteLabel:"📋 Colar",
    trustW:"Sem marca d'água",trustH:"Qualidade HD",trustL:"Sem login",trustD:"Todos dispositivos",trustF:"100% Grátis",
    faq1q:"Como baixar vídeo do Pinterest?",faq1a:"Copie a URL, cole acima, clique Baixar.",faq2q:"É gratuito?",faq2a:"Sim, completamente gratuito.",faq3q:"Quais formatos?",faq3a:"Vídeos (MP4), GIFs, imagens (JPG, PNG).",
    seoTitle:"Melhor baixador de vídeos Pinterest grátis",seoP:"PinSave baixa vídeos, GIFs e imagens do Pinterest em HD gratuitamente.",
    h2steps:"Como baixar",h2feats:"Por que PinSave?",h2faq:"Perguntas frequentes",
  },
  { code:"it", flag:"🇮🇹", name:"Italiano", title:"Downloader Video Pinterest – HD Gratis | PinSave",
    desc:"Scarica video, GIF e immagini Pinterest gratis in HD. Nessuna filigrana, nessuna registrazione.",
    h1a:"Scarica Video", h1b:"Pinterest Gratis", sub:"Incolla qualsiasi link Pinterest e scarica video, GIF o immagini in HD — senza filigrana.",
    badge:"✦ 100% Gratis · Nessuna Registrazione",
    T:{err_empty:"Incolla un URL di Pinterest.",err_fail:"Download fallito. Riprova.",err_server:"Errore server.",btn_hd:"Scarica HD",btn_img:"Scarica Immagine",btn_open:"Apri nel browser"},
    step1t:"Apri il Pin",step1d:"Trova il video su Pinterest.",step2t:"Copia il link",step2d:"Condividi → Copia link.",
    step3t:"Incolla e scarica",step3d:"Incolla il link sopra e clicca Scarica.",step4t:"Salva sul dispositivo",step4d:"Il file viene salvato direttamente.",
    placeholder:"Incolla il link Pinterest qui…",btnLabel:"Scarica",pasteLabel:"📋 Incolla",
    trustW:"Nessuna filigrana",trustH:"Qualità HD",trustL:"Nessun login",trustD:"Tutti i dispositivi",trustF:"100% Gratis",
    faq1q:"Come scaricare un video Pinterest?",faq1a:"Copia l'URL, incollalo sopra e clicca Scarica.",faq2q:"È gratuito?",faq2a:"Sì, completamente gratuito.",faq3q:"Quali formati?",faq3a:"Video (MP4), GIF, immagini (JPG, PNG).",
    seoTitle:"Miglior downloader video Pinterest gratuito",seoP:"PinSave scarica video, GIF e immagini Pinterest in HD gratuitamente.",
    h2steps:"Come scaricare",h2feats:"Perché PinSave?",h2faq:"Domande frequenti",
  },
  { code:"ru", flag:"🇷🇺", name:"Русский", title:"Скачать видео Pinterest – HD бесплатно | PinSave",
    desc:"Скачивайте видео, GIF и изображения Pinterest бесплатно в HD. Без водяного знака, без регистрации.",
    h1a:"Скачать Видео", h1b:"Pinterest Бесплатно", sub:"Вставьте любую ссылку Pinterest и скачайте видео, GIF или изображение в HD — без водяного знака.",
    badge:"✦ 100% Бесплатно · Без Регистрации",
    T:{err_empty:"Вставьте URL Pinterest.",err_fail:"Ошибка загрузки. Попробуйте снова.",err_server:"Ошибка сервера.",btn_hd:"Скачать HD",btn_img:"Скачать изображение",btn_open:"Открыть в браузере"},
    step1t:"Откройте пин",step1d:"Найдите видео на Pinterest.",step2t:"Скопируйте ссылку",step2d:"Поделиться → Копировать ссылку.",
    step3t:"Вставьте и скачайте",step3d:"Вставьте ссылку выше и нажмите Скачать.",step4t:"Сохраните на устройство",step4d:"Файл сохраняется напрямую.",
    placeholder:"Вставьте ссылку Pinterest сюда…",btnLabel:"Скачать",pasteLabel:"📋 Вставить",
    trustW:"Без водяного знака",trustH:"HD качество",trustL:"Без входа",trustD:"Все устройства",trustF:"100% Бесплатно",
    faq1q:"Как скачать видео Pinterest?",faq1a:"Скопируйте URL, вставьте выше, нажмите Скачать.",faq2q:"Это бесплатно?",faq2a:"Да, полностью бесплатно.",faq3q:"Какие форматы?",faq3a:"Видео (MP4), GIF, изображения (JPG, PNG).",
    seoTitle:"Лучший бесплатный загрузчик видео Pinterest",seoP:"PinSave скачивает видео, GIF и изображения Pinterest в HD бесплатно.",
    h2steps:"Как скачать",h2feats:"Почему PinSave?",h2faq:"Часто задаваемые вопросы",
  },
  { code:"ja", flag:"🇯🇵", name:"日本語", title:"Pinterestビデオダウンローダー – 無料HD | PinSave",
    desc:"PinterestのビデオやGIFを無料でHD品質でダウンロード。透かしなし、登録不要。",
    h1a:"Pinterestの動画を", h1b:"無料でダウンロード", sub:"PinterestのリンクをペーストしてHD品質で動画・GIF・画像を保存 — 透かしなし。",
    badge:"✦ 100%無料 · 登録不要",
    T:{err_empty:"PinterestのURLを貼り付けてください。",err_fail:"ダウンロードに失敗しました。もう一度試してください。",err_server:"サーバーエラー。",btn_hd:"HDダウンロード",btn_img:"画像ダウンロード",btn_open:"ブラウザで開く"},
    step1t:"ピンを開く",step1d:"PinterestでビデオやGIFを見つけます。",step2t:"リンクをコピー",step2d:"共有 → リンクをコピー。",
    step3t:"貼り付けてダウンロード",step3d:"上にリンクを貼り付けてダウンロードをクリック。",step4t:"デバイスに保存",step4d:"ファイルが直接保存されます。",
    placeholder:"PinterestリンクをここにペーストしてOください…",btnLabel:"ダウンロード",pasteLabel:"📋 ペースト",
    trustW:"透かしなし",trustH:"HD品質",trustL:"ログイン不要",trustD:"全デバイス対応",trustF:"100%無料",
    faq1q:"Pinterestの動画をダウンロードするには?",faq1a:"URLをコピーして上に貼り付け、ダウンロードをクリック。",faq2q:"無料ですか?",faq2a:"はい、完全無料です。",faq3q:"対応フォーマットは?",faq3a:"動画(MP4)、GIF、画像(JPG、PNG)。",
    seoTitle:"最高の無料Pinterestビデオダウンローダー",seoP:"PinSaveはPinterestの動画・GIF・画像を無料でHDダウンロードできます。",
    h2steps:"ダウンロード方法",h2feats:"PinSaveを使う理由",h2faq:"よくある質問",
  },
  { code:"ko", flag:"🇰🇷", name:"한국어", title:"Pinterest 동영상 다운로더 – 무료 HD | PinSave",
    desc:"Pinterest 동영상, GIF, 이미지를 무료로 HD 화질로 다운로드. 워터마크 없음, 로그인 불필요.",
    h1a:"Pinterest 동영상을", h1b:"무료로 다운로드", sub:"Pinterest 링크를 붙여넣고 워터마크 없이 HD 동영상·GIF·이미지를 저장하세요.",
    badge:"✦ 100% 무료 · 가입 불필요",
    T:{err_empty:"Pinterest URL을 붙여넣어 주세요.",err_fail:"다운로드 실패. 다시 시도해주세요.",err_server:"서버 오류.",btn_hd:"HD 다운로드",btn_img:"이미지 다운로드",btn_open:"브라우저에서 열기"},
    step1t:"핀 열기",step1d:"Pinterest에서 동영상을 찾습니다.",step2t:"링크 복사",step2d:"공유 → 링크 복사.",
    step3t:"붙여넣기 및 다운로드",step3d:"위에 링크를 붙여넣고 다운로드를 클릭.",step4t:"기기에 저장",step4d:"파일이 직접 저장됩니다.",
    placeholder:"Pinterest 링크를 여기에 붙여넣으세요…",btnLabel:"다운로드",pasteLabel:"📋 붙여넣기",
    trustW:"워터마크 없음",trustH:"HD 화질",trustL:"로그인 불필요",trustD:"모든 기기",trustF:"100% 무료",
    faq1q:"Pinterest 동영상을 어떻게 다운받나요?",faq1a:"URL 복사 후 위에 붙여넣고 다운로드 클릭.",faq2q:"무료인가요?",faq2a:"네, 완전 무료입니다.",faq3q:"어떤 형식을 지원하나요?",faq3a:"동영상(MP4), GIF, 이미지(JPG, PNG).",
    seoTitle:"최고의 무료 Pinterest 동영상 다운로더",seoP:"PinSave는 Pinterest 동영상·GIF·이미지를 무료로 HD 다운로드합니다.",
    h2steps:"다운로드 방법",h2feats:"PinSave를 쓰는 이유",h2faq:"자주 묻는 질문",
  },
  { code:"zh", flag:"🇨🇳", name:"中文", title:"Pinterest视频下载器 – 免费HD | PinSave",
    desc:"免费以高清质量下载Pinterest视频、GIF和图片。无水印，无需注册。",
    h1a:"免费下载", h1b:"Pinterest视频", sub:"粘贴任意Pinterest链接，免费下载高清视频、GIF或图片，无水印。",
    badge:"✦ 100%免费 · 无需注册",
    T:{err_empty:"请粘贴Pinterest网址。",err_fail:"下载失败，请重试。",err_server:"服务器错误。",btn_hd:"下载HD",btn_img:"下载图片",btn_open:"在浏览器中打开"},
    step1t:"打开Pin",step1d:"在Pinterest上找到视频。",step2t:"复制链接",step2d:"分享 → 复制链接。",
    step3t:"粘贴并下载",step3d:"将链接粘贴到上方，点击下载。",step4t:"保存到设备",step4d:"文件直接保存到您的设备。",
    placeholder:"在此粘贴Pinterest链接…",btnLabel:"下载",pasteLabel:"📋 粘贴",
    trustW:"无水印",trustH:"高清质量",trustL:"无需登录",trustD:"全设备支持",trustF:"100%免费",
    faq1q:"如何下载Pinterest视频?",faq1a:"复制URL，粘贴到上方，点击下载。",faq2q:"是免费的吗?",faq2a:"是的，完全免费。",faq3q:"支持哪些格式?",faq3a:"视频(MP4)、GIF、图片(JPG、PNG)。",
    seoTitle:"最佳免费Pinterest视频下载器",seoP:"PinSave可免费高清下载Pinterest视频、GIF和图片。",
    h2steps:"如何下载",h2feats:"为什么选PinSave",h2faq:"常见问题",
  },
  { code:"ar", flag:"🇸🇦", name:"العربية", title:"محمّل فيديو Pinterest – مجاني HD | PinSave",
    desc:"حمّل مقاطع فيديو وصور GIF وصور Pinterest مجانًا بجودة HD. بدون علامة مائية.",
    h1a:"حمّل فيديوهات", h1b:"Pinterest مجانًا", sub:"الصق أي رابط Pinterest وحمّل الفيديو أو GIF أو صورة بجودة HD.",
    badge:"✦ مجاني 100% · بدون تسجيل",
    T:{err_empty:"الصق رابط Pinterest.",err_fail:"فشل التنزيل. حاول مرة أخرى.",err_server:"خطأ في الخادم.",btn_hd:"تنزيل HD",btn_img:"تنزيل الصورة",btn_open:"فتح في المتصفح"},
    step1t:"افتح الدبوس",step1d:"ابحث عن الفيديو على Pinterest.",step2t:"انسخ الرابط",step2d:"مشاركة ← نسخ الرابط.",
    step3t:"الصق ونزّل",step3d:"الصق الرابط أعلاه واضغط تنزيل.",step4t:"احفظ على جهازك",step4d:"سيتم حفظ الملف مباشرة.",
    placeholder:"الصق رابط Pinterest هنا…",btnLabel:"تنزيل",pasteLabel:"📋 لصق",
    trustW:"بدون علامة مائية",trustH:"جودة HD",trustL:"بدون تسجيل",trustD:"جميع الأجهزة",trustF:"مجاني 100%",
    faq1q:"كيف أنزّل فيديو Pinterest?",faq1a:"انسخ الرابط والصقه أعلاه واضغط تنزيل.",faq2q:"هل هو مجاني?",faq2a:"نعم، مجاني تمامًا.",faq3q:"ما الصيغ المدعومة?",faq3a:"فيديو (MP4)، GIF، صور (JPG، PNG).",
    seoTitle:"أفضل محمّل فيديو Pinterest مجاني",seoP:"PinSave يحمّل فيديوهات وصور Pinterest مجانًا بجودة عالية.",
    h2steps:"كيفية التنزيل",h2feats:"لماذا PinSave?",h2faq:"أسئلة شائعة",
  },
  { code:"tr", flag:"🇹🇷", name:"Türkçe", title:"Pinterest Video İndirici – Ücretsiz HD | PinSave",
    desc:"Pinterest videolarını, GIF'leri ve resimleri ücretsiz HD kalitede indirin. Filigran yok, kayıt yok.",
    h1a:"Pinterest Videolarını", h1b:"Ücretsiz İndir", sub:"Herhangi bir Pinterest bağlantısını yapıştırın ve HD kalitede video, GIF veya resim kaydedin.",
    badge:"✦ %100 Ücretsiz · Kayıt Yok",
    T:{err_empty:"Lütfen Pinterest URL'si yapıştırın.",err_fail:"İndirme başarısız. Tekrar deneyin.",err_server:"Sunucu hatası.",btn_hd:"HD İndir",btn_img:"Resim İndir",btn_open:"Tarayıcıda Aç"},
    step1t:"Pin'i Aç",step1d:"Pinterest'te videoyu bulun.",step2t:"Bağlantıyı Kopyala",step2d:"Paylaş → Bağlantıyı Kopyala.",
    step3t:"Yapıştır ve İndir",step3d:"Bağlantıyı yapıştırın ve İndir'e tıklayın.",step4t:"Cihaza Kaydet",step4d:"Dosya doğrudan kaydedilir.",
    placeholder:"Pinterest bağlantısını buraya yapıştırın…",btnLabel:"İndir",pasteLabel:"📋 Yapıştır",
    trustW:"Filigran yok",trustH:"HD kalite",trustL:"Giriş yok",trustD:"Tüm cihazlar",trustF:"%100 Ücretsiz",
    faq1q:"Pinterest videosu nasıl indirilir?",faq1a:"URL'yi kopyalayın, yapıştırın ve İndir'e tıklayın.",faq2q:"Ücretsiz mi?",faq2a:"Evet, tamamen ücretsiz.",faq3q:"Hangi formatlar destekleniyor?",faq3a:"Video (MP4), GIF, resimler (JPG, PNG).",
    seoTitle:"En İyi Ücretsiz Pinterest Video İndirici",seoP:"PinSave, Pinterest videolarını, GIF'leri ve resimleri HD kalitede ücretsiz indirir.",
    h2steps:"Nasıl indirilir",h2feats:"Neden PinSave?",h2faq:"Sık sorulan sorular",
  },
  { code:"nl", flag:"🇳🇱", name:"Nederlands", title:"Pinterest Video Downloader – Gratis HD | PinSave",
    desc:"Download Pinterest video's, GIF's en afbeeldingen gratis in HD. Geen watermerk, geen registratie.",
    h1a:"Download Pinterest", h1b:"Video's Gratis", sub:"Plak een Pinterest link en download video's, GIF's of afbeeldingen in HD.",
    badge:"✦ 100% Gratis · Geen Registratie",
    T:{err_empty:"Plak een Pinterest URL.",err_fail:"Download mislukt. Probeer opnieuw.",err_server:"Serverfout.",btn_hd:"HD Downloaden",btn_img:"Afbeelding Downloaden",btn_open:"Openen in browser"},
    step1t:"Open de Pin",step1d:"Vind de video op Pinterest.",step2t:"Kopieer de link",step2d:"Delen → Link kopiëren.",
    step3t:"Plak en Download",step3d:"Plak de link hierboven en klik Downloaden.",step4t:"Sla op",step4d:"Het bestand wordt direct opgeslagen.",
    placeholder:"Plak Pinterest link hier…",btnLabel:"Downloaden",pasteLabel:"📋 Plakken",
    trustW:"Geen watermerk",trustH:"HD kwaliteit",trustL:"Geen login",trustD:"Alle apparaten",trustF:"100% Gratis",
    faq1q:"Hoe download ik een Pinterest video?",faq1a:"Kopieer de URL, plak hem hierboven en klik Downloaden.",faq2q:"Is het gratis?",faq2a:"Ja, volledig gratis.",faq3q:"Welke formaten?",faq3a:"Video's (MP4), GIF's, afbeeldingen (JPG, PNG).",
    seoTitle:"Beste gratis Pinterest video downloader",seoP:"PinSave downloadt Pinterest video's, GIF's en afbeeldingen gratis in HD.",
    h2steps:"Hoe downloaden",h2feats:"Waarom PinSave?",h2faq:"Veelgestelde vragen",
  },
  { code:"pl", flag:"🇵🇱", name:"Polski", title:"Downloader Wideo Pinterest – Bezpłatny HD | PinSave",
    desc:"Pobierz filmy, GIF-y i obrazy z Pinterest za darmo w jakości HD. Bez znaku wodnego.",
    h1a:"Pobierz Filmy", h1b:"Pinterest Za Darmo", sub:"Wklej link Pinterest i pobierz filmy, GIF-y lub obrazy w HD.",
    badge:"✦ 100% Bezpłatny · Bez Rejestracji",
    T:{err_empty:"Wklej URL Pinterest.",err_fail:"Pobieranie nieudane. Spróbuj ponownie.",err_server:"Błąd serwera.",btn_hd:"Pobierz HD",btn_img:"Pobierz obraz",btn_open:"Otwórz w przeglądarce"},
    step1t:"Otwórz Pin",step1d:"Znajdź film na Pinterest.",step2t:"Skopiuj link",step2d:"Udostępnij → Skopiuj link.",
    step3t:"Wklej i pobierz",step3d:"Wklej link powyżej i kliknij Pobierz.",step4t:"Zapisz na urządzenie",step4d:"Plik zostanie zapisany bezpośrednio.",
    placeholder:"Wklej link Pinterest tutaj…",btnLabel:"Pobierz",pasteLabel:"📋 Wklej",
    trustW:"Bez znaku wodnego",trustH:"Jakość HD",trustL:"Bez logowania",trustD:"Wszystkie urządzenia",trustF:"100% Bezpłatny",
    faq1q:"Jak pobrać film z Pinterest?",faq1a:"Skopiuj URL, wklej powyżej i kliknij Pobierz.",faq2q:"Czy jest bezpłatny?",faq2a:"Tak, całkowicie bezpłatny.",faq3q:"Jakie formaty?",faq3a:"Filmy (MP4), GIF-y, obrazy (JPG, PNG).",
    seoTitle:"Najlepszy bezpłatny downloader wideo Pinterest",seoP:"PinSave pobiera filmy, GIF-y i obrazy z Pinterest za darmo w HD.",
    h2steps:"Jak pobrać",h2feats:"Dlaczego PinSave?",h2faq:"Często zadawane pytania",
  },
  { code:"sv", flag:"🇸🇪", name:"Svenska", title:"Pinterest Video Nedladdare – Gratis HD | PinSave",
    desc:"Ladda ner Pinterest-videor, GIF:ar och bilder gratis i HD. Ingen vattenstämpel, ingen registrering.",
    h1a:"Ladda Ned", h1b:"Pinterest-videor Gratis", sub:"Klistra in en Pinterest-länk och ladda ned videor, GIF:ar eller bilder i HD.",
    badge:"✦ 100% Gratis · Ingen Registrering",
    T:{err_empty:"Klistra in en Pinterest-URL.",err_fail:"Nedladdning misslyckades. Försök igen.",err_server:"Serverfel.",btn_hd:"Ladda ned HD",btn_img:"Ladda ned bild",btn_open:"Öppna i webbläsare"},
    step1t:"Öppna pinnen",step1d:"Hitta videon på Pinterest.",step2t:"Kopiera länken",step2d:"Dela → Kopiera länk.",
    step3t:"Klistra in och ladda ned",step3d:"Klistra in länken ovan och klicka Ladda ned.",step4t:"Spara till enhet",step4d:"Filen sparas direkt.",
    placeholder:"Klistra in Pinterest-länk här…",btnLabel:"Ladda ned",pasteLabel:"📋 Klistra in",
    trustW:"Ingen vattenstämpel",trustH:"HD-kvalitet",trustL:"Ingen inloggning",trustD:"Alla enheter",trustF:"100% Gratis",
    faq1q:"Hur laddar jag ned en Pinterest-video?",faq1a:"Kopiera URL:en, klistra in ovan och klicka Ladda ned.",faq2q:"Är det gratis?",faq2a:"Ja, helt gratis.",faq3q:"Vilka format stöds?",faq3a:"Videor (MP4), GIF:ar, bilder (JPG, PNG).",
    seoTitle:"Bästa gratis Pinterest video nedladdaren",seoP:"PinSave laddar ned Pinterest-videor, GIF:ar och bilder gratis i HD.",
    h2steps:"Hur laddar man ned",h2feats:"Varför PinSave?",h2faq:"Vanliga frågor",
  },
  { code:"da", flag:"🇩🇰", name:"Dansk", title:"Pinterest Video Downloader – Gratis HD | PinSave",
    desc:"Download Pinterest-videoer, GIF'er og billeder gratis i HD. Ingen vandmærke, ingen registrering.",
    h1a:"Download", h1b:"Pinterest-videoer Gratis", sub:"Sæt et Pinterest-link ind og download videoer, GIF'er eller billeder i HD.",
    badge:"✦ 100% Gratis · Ingen Registrering",
    T:{err_empty:"Indsæt en Pinterest-URL.",err_fail:"Download mislykkedes. Prøv igen.",err_server:"Serverfejl.",btn_hd:"Download HD",btn_img:"Download billede",btn_open:"Åbn i browser"},
    step1t:"Åbn pin",step1d:"Find videoen på Pinterest.",step2t:"Kopiér linket",step2d:"Del → Kopiér link.",
    step3t:"Indsæt og download",step3d:"Indsæt linket ovenfor og klik Download.",step4t:"Gem på enhed",step4d:"Filen gemmes direkte.",
    placeholder:"Indsæt Pinterest-link her…",btnLabel:"Download",pasteLabel:"📋 Indsæt",
    trustW:"Intet vandmærke",trustH:"HD kvalitet",trustL:"Ingen login",trustD:"Alle enheder",trustF:"100% Gratis",
    faq1q:"Hvordan downloader jeg en Pinterest-video?",faq1a:"Kopiér URL, indsæt ovenfor og klik Download.",faq2q:"Er det gratis?",faq2a:"Ja, helt gratis.",faq3q:"Hvilke formater?",faq3a:"Videoer (MP4), GIF'er, billeder (JPG, PNG).",
    seoTitle:"Bedste gratis Pinterest video downloader",seoP:"PinSave downloader Pinterest-videoer, GIF'er og billeder gratis i HD.",
    h2steps:"Sådan downloader du",h2feats:"Hvorfor PinSave?",h2faq:"Ofte stillede spørgsmål",
  },
  { code:"no", flag:"🇳🇴", name:"Norsk", title:"Pinterest Video Nedlaster – Gratis HD | PinSave",
    desc:"Last ned Pinterest-videoer, GIF-er og bilder gratis i HD. Ingen vannmerke, ingen registrering.",
    h1a:"Last Ned", h1b:"Pinterest-videoer Gratis", sub:"Lim inn en Pinterest-lenke og last ned videoer, GIF-er eller bilder i HD.",
    badge:"✦ 100% Gratis · Ingen Registrering",
    T:{err_empty:"Lim inn en Pinterest-URL.",err_fail:"Nedlasting mislyktes. Prøv igjen.",err_server:"Serverfeil.",btn_hd:"Last ned HD",btn_img:"Last ned bilde",btn_open:"Åpne i nettleser"},
    step1t:"Åpne pinnen",step1d:"Finn videoen på Pinterest.",step2t:"Kopier lenken",step2d:"Del → Kopier lenke.",
    step3t:"Lim inn og last ned",step3d:"Lim inn lenken ovenfor og klikk Last ned.",step4t:"Lagre til enhet",step4d:"Filen lagres direkte.",
    placeholder:"Lim inn Pinterest-lenke her…",btnLabel:"Last ned",pasteLabel:"📋 Lim inn",
    trustW:"Ingen vannmerke",trustH:"HD kvalitet",trustL:"Ingen pålogging",trustD:"Alle enheter",trustF:"100% Gratis",
    faq1q:"Hvordan laster jeg ned en Pinterest-video?",faq1a:"Kopier URL, lim inn ovenfor og klikk Last ned.",faq2q:"Er det gratis?",faq2a:"Ja, helt gratis.",faq3q:"Hvilke formater?",faq3a:"Videoer (MP4), GIF-er, bilder (JPG, PNG).",
    seoTitle:"Beste gratis Pinterest video nedlaster",seoP:"PinSave laster ned Pinterest-videoer, GIF-er og bilder gratis i HD.",
    h2steps:"Slik laster du ned",h2feats:"Hvorfor PinSave?",h2faq:"Ofte stilte spørsmål",
  },
  { code:"fi", flag:"🇫🇮", name:"Suomi", title:"Pinterest Video Lataaja – Ilmainen HD | PinSave",
    desc:"Lataa Pinterest-videoita, GIF:ejä ja kuvia ilmaiseksi HD-laadulla. Ei vesileimaa, ei rekisteröitymistä.",
    h1a:"Lataa Pinterest", h1b:"-videoita Ilmaiseksi", sub:"Liitä Pinterest-linkki ja lataa videoita, GIF:ejä tai kuvia HD-laadulla.",
    badge:"✦ 100% Ilmainen · Ei Rekisteröitymistä",
    T:{err_empty:"Liitä Pinterest-URL.",err_fail:"Lataus epäonnistui. Yritä uudelleen.",err_server:"Palvelinvirhe.",btn_hd:"Lataa HD",btn_img:"Lataa kuva",btn_open:"Avaa selaimessa"},
    step1t:"Avaa pin",step1d:"Etsi video Pinterestistä.",step2t:"Kopioi linkki",step2d:"Jaa → Kopioi linkki.",
    step3t:"Liitä ja lataa",step3d:"Liitä linkki yllä ja napsauta Lataa.",step4t:"Tallenna laitteelle",step4d:"Tiedosto tallennetaan suoraan.",
    placeholder:"Liitä Pinterest-linkki tähän…",btnLabel:"Lataa",pasteLabel:"📋 Liitä",
    trustW:"Ei vesileimaa",trustH:"HD-laatu",trustL:"Ei kirjautumista",trustD:"Kaikki laitteet",trustF:"100% Ilmainen",
    faq1q:"Miten lataan Pinterest-videon?",faq1a:"Kopioi URL, liitä yllä ja napsauta Lataa.",faq2q:"Onko se ilmainen?",faq2a:"Kyllä, täysin ilmainen.",faq3q:"Mitkä tiedostomuodot?",faq3a:"Videot (MP4), GIF:t, kuvat (JPG, PNG).",
    seoTitle:"Paras ilmainen Pinterest-video lataaja",seoP:"PinSave lataa Pinterest-videoita, GIF:ejä ja kuvia ilmaiseksi HD-laadulla.",
    h2steps:"Kuinka ladata",h2feats:"Miksi PinSave?",h2faq:"Usein kysytyt kysymykset",
  },
  { code:"cs", flag:"🇨🇿", name:"Čeština", title:"Stahovač Videí Pinterest – Zdarma HD | PinSave",
    desc:"Stáhněte Pinterest videa, GIFy a obrázky zdarma v HD. Bez vodoznaku, bez registrace.",
    h1a:"Stáhněte Videa", h1b:"Pinterest Zdarma", sub:"Vložte odkaz Pinterest a stáhněte videa, GIFy nebo obrázky v HD.",
    badge:"✦ 100% Zdarma · Bez Registrace",
    T:{err_empty:"Vložte URL Pinterestu.",err_fail:"Stahování selhalo. Zkuste to znovu.",err_server:"Chyba serveru.",btn_hd:"Stáhnout HD",btn_img:"Stáhnout obrázek",btn_open:"Otevřít v prohlížeči"},
    step1t:"Otevřete pin",step1d:"Najděte video na Pinterestu.",step2t:"Zkopírujte odkaz",step2d:"Sdílet → Kopírovat odkaz.",
    step3t:"Vložte a stáhněte",step3d:"Vložte odkaz výše a klikněte Stáhnout.",step4t:"Uložte do zařízení",step4d:"Soubor se uloží přímo.",
    placeholder:"Vložte odkaz Pinterest sem…",btnLabel:"Stáhnout",pasteLabel:"📋 Vložit",
    trustW:"Bez vodoznaku",trustH:"HD kvalita",trustL:"Bez přihlášení",trustD:"Všechna zařízení",trustF:"100% Zdarma",
    faq1q:"Jak stáhnu video z Pinterestu?",faq1a:"Zkopírujte URL, vložte výše a klikněte Stáhnout.",faq2q:"Je to zdarma?",faq2a:"Ano, úplně zdarma.",faq3q:"Jaké formáty?",faq3a:"Videa (MP4), GIFy, obrázky (JPG, PNG).",
    seoTitle:"Nejlepší bezplatný stahovač videí Pinterest",seoP:"PinSave stahuje Pinterest videa, GIFy a obrázky zdarma v HD.",
    h2steps:"Jak stáhnout",h2feats:"Proč PinSave?",h2faq:"Časté otázky",
  },
  { code:"ro", flag:"🇷🇴", name:"Română", title:"Descarcator Video Pinterest – Gratuit HD | PinSave",
    desc:"Descarcă videoclipuri, GIF-uri și imagini Pinterest gratuit în HD. Fără filigran, fără înregistrare.",
    h1a:"Descarcă Videoclipuri", h1b:"Pinterest Gratuit", sub:"Lipește un link Pinterest și descarcă videoclipuri, GIF-uri sau imagini în HD.",
    badge:"✦ 100% Gratuit · Fără Înregistrare",
    T:{err_empty:"Lipește un URL Pinterest.",err_fail:"Descărcarea a eșuat. Încearcă din nou.",err_server:"Eroare server.",btn_hd:"Descarcă HD",btn_img:"Descarcă imagine",btn_open:"Deschide în browser"},
    step1t:"Deschide pin-ul",step1d:"Găsește videoclipul pe Pinterest.",step2t:"Copiază linkul",step2d:"Distribuie → Copiază link.",
    step3t:"Lipește și descarcă",step3d:"Lipește linkul mai sus și apasă Descarcă.",step4t:"Salvează pe dispozitiv",step4d:"Fișierul se salvează direct.",
    placeholder:"Lipește linkul Pinterest aici…",btnLabel:"Descarcă",pasteLabel:"📋 Lipire",
    trustW:"Fără filigran",trustH:"Calitate HD",trustL:"Fără autentificare",trustD:"Toate dispozitivele",trustF:"100% Gratuit",
    faq1q:"Cum descărc un videoclip Pinterest?",faq1a:"Copiază URL-ul, lipește-l mai sus și apasă Descarcă.",faq2q:"Este gratuit?",faq2a:"Da, complet gratuit.",faq3q:"Ce formate?",faq3a:"Videoclipuri (MP4), GIF-uri, imagini (JPG, PNG).",
    seoTitle:"Cel mai bun descărcător video Pinterest gratuit",seoP:"PinSave descarcă videoclipuri, GIF-uri și imagini Pinterest gratuit în HD.",
    h2steps:"Cum să descarci",h2feats:"De ce PinSave?",h2faq:"Întrebări frecvente",
  },
  { code:"hu", flag:"🇭🇺", name:"Magyar", title:"Pinterest Videó Letöltő – Ingyenes HD | PinSave",
    desc:"Töltsd le a Pinterest videókat, GIF-eket és képeket ingyen HD minőségben. Vízjel nélkül.",
    h1a:"Töltsd le a", h1b:"Pinterest Videókat Ingyen", sub:"Illeszd be a Pinterest linket és töltsd le a videókat, GIF-eket vagy képeket HD minőségben.",
    badge:"✦ 100% Ingyenes · Regisztráció Nélkül",
    T:{err_empty:"Illessz be egy Pinterest URL-t.",err_fail:"A letöltés sikertelen. Próbáld újra.",err_server:"Szerverhiba.",btn_hd:"HD letöltés",btn_img:"Kép letöltése",btn_open:"Megnyitás böngészőben"},
    step1t:"Nyisd meg a pint",step1d:"Keresd meg a videót a Pinteresten.",step2t:"Másold a linket",step2d:"Megosztás → Link másolása.",
    step3t:"Illeszd be és töltsd le",step3d:"Illeszd be a linket fent és kattints Letöltés.",step4t:"Mentés eszközre",step4d:"A fájl közvetlenül mentésre kerül.",
    placeholder:"Illeszd be a Pinterest linket ide…",btnLabel:"Letöltés",pasteLabel:"📋 Beillesztés",
    trustW:"Vízjel nélkül",trustH:"HD minőség",trustL:"Bejelentkezés nélkül",trustD:"Minden eszköz",trustF:"100% Ingyenes",
    faq1q:"Hogyan töltök le Pinterest videót?",faq1a:"Másold az URL-t, illeszd be fent és kattints Letöltés.",faq2q:"Ingyenes?",faq2a:"Igen, teljesen ingyenes.",faq3q:"Milyen formátumok?",faq3a:"Videók (MP4), GIF-ek, képek (JPG, PNG).",
    seoTitle:"Legjobb ingyenes Pinterest videó letöltő",seoP:"PinSave ingyenesen tölti le a Pinterest videókat, GIF-eket és képeket HD minőségben.",
    h2steps:"Hogyan tölts le",h2feats:"Miért PinSave?",h2faq:"Gyakran ismételt kérdések",
  },
  { code:"uk", flag:"🇺🇦", name:"Українська", title:"Завантажувач Відео Pinterest – HD Безкоштовно | PinSave",
    desc:"Завантажуйте відео, GIF та зображення Pinterest безкоштовно в HD. Без водяного знаку.",
    h1a:"Завантажте Відео", h1b:"Pinterest Безкоштовно", sub:"Вставте будь-яке посилання Pinterest і збережіть відео, GIF або зображення в HD.",
    badge:"✦ 100% Безкоштовно · Без Реєстрації",
    T:{err_empty:"Вставте URL Pinterest.",err_fail:"Помилка завантаження. Спробуйте знову.",err_server:"Помилка сервера.",btn_hd:"Завантажити HD",btn_img:"Завантажити зображення",btn_open:"Відкрити у браузері"},
    step1t:"Відкрийте пін",step1d:"Знайдіть відео на Pinterest.",step2t:"Скопіюйте посилання",step2d:"Поділитися → Копіювати посилання.",
    step3t:"Вставте та завантажте",step3d:"Вставте посилання вище і натисніть Завантажити.",step4t:"Збережіть на пристрій",step4d:"Файл зберігається безпосередньо.",
    placeholder:"Вставте посилання Pinterest тут…",btnLabel:"Завантажити",pasteLabel:"📋 Вставити",
    trustW:"Без водяного знаку",trustH:"HD якість",trustL:"Без входу",trustD:"Всі пристрої",trustF:"100% Безкоштовно",
    faq1q:"Як завантажити відео Pinterest?",faq1a:"Скопіюйте URL, вставте вище і натисніть Завантажити.",faq2q:"Це безкоштовно?",faq2a:"Так, повністю безкоштовно.",faq3q:"Які формати?",faq3a:"Відео (MP4), GIF, зображення (JPG, PNG).",
    seoTitle:"Найкращий безкоштовний завантажувач відео Pinterest",seoP:"PinSave завантажує відео, GIF та зображення Pinterest безкоштовно в HD.",
    h2steps:"Як завантажити",h2feats:"Чому PinSave?",h2faq:"Часті запитання",
  },
  { code:"id", flag:"🇮🇩", name:"Bahasa Indonesia", title:"Unduh Video Pinterest – HD Gratis | PinSave",
    desc:"Unduh video, GIF, dan gambar Pinterest gratis dalam kualitas HD. Tanpa watermark, tanpa daftar.",
    h1a:"Unduh Video", h1b:"Pinterest Gratis", sub:"Tempel tautan Pinterest dan simpan video, GIF, atau gambar dalam HD — tanpa watermark.",
    badge:"✦ 100% Gratis · Tanpa Daftar",
    T:{err_empty:"Tempel URL Pinterest.",err_fail:"Unduhan gagal. Coba lagi.",err_server:"Kesalahan server.",btn_hd:"Unduh HD",btn_img:"Unduh Gambar",btn_open:"Buka di Browser"},
    step1t:"Buka Pin",step1d:"Temukan video di Pinterest.",step2t:"Salin tautan",step2d:"Bagikan → Salin tautan.",
    step3t:"Tempel dan Unduh",step3d:"Tempel tautan di atas dan klik Unduh.",step4t:"Simpan ke Perangkat",step4d:"File tersimpan langsung.",
    placeholder:"Tempel tautan Pinterest di sini…",btnLabel:"Unduh",pasteLabel:"📋 Tempel",
    trustW:"Tanpa watermark",trustH:"Kualitas HD",trustL:"Tanpa login",trustD:"Semua perangkat",trustF:"100% Gratis",
    faq1q:"Cara mengunduh video Pinterest?",faq1a:"Salin URL, tempel di atas, klik Unduh.",faq2q:"Apakah gratis?",faq2a:"Ya, sepenuhnya gratis.",faq3q:"Format apa yang didukung?",faq3a:"Video (MP4), GIF, gambar (JPG, PNG).",
    seoTitle:"Pengunduh Video Pinterest Gratis Terbaik",seoP:"PinSave mengunduh video, GIF, dan gambar Pinterest gratis dalam kualitas HD.",
    h2steps:"Cara Mengunduh",h2feats:"Kenapa PinSave?",h2faq:"Pertanyaan Umum",
  },
  { code:"ms", flag:"🇲🇾", name:"Bahasa Melayu", title:"Muat Turun Video Pinterest – HD Percuma | PinSave",
    desc:"Muat turun video, GIF dan gambar Pinterest secara percuma dalam HD. Tanpa tera air, tanpa daftar.",
    h1a:"Muat Turun Video", h1b:"Pinterest Percuma", sub:"Tampal pautan Pinterest dan simpan video, GIF atau gambar dalam HD.",
    badge:"✦ 100% Percuma · Tanpa Daftar",
    T:{err_empty:"Tampal URL Pinterest.",err_fail:"Muat turun gagal. Cuba lagi.",err_server:"Ralat pelayan.",btn_hd:"Muat Turun HD",btn_img:"Muat Turun Gambar",btn_open:"Buka dalam Pelayar"},
    step1t:"Buka Pin",step1d:"Cari video di Pinterest.",step2t:"Salin pautan",step2d:"Kongsi → Salin pautan.",
    step3t:"Tampal dan Muat Turun",step3d:"Tampal pautan di atas dan klik Muat Turun.",step4t:"Simpan ke Peranti",step4d:"Fail disimpan terus.",
    placeholder:"Tampal pautan Pinterest di sini…",btnLabel:"Muat Turun",pasteLabel:"📋 Tampal",
    trustW:"Tanpa tera air",trustH:"Kualiti HD",trustL:"Tanpa log masuk",trustD:"Semua peranti",trustF:"100% Percuma",
    faq1q:"Cara muat turun video Pinterest?",faq1a:"Salin URL, tampal di atas, klik Muat Turun.",faq2q:"Adakah percuma?",faq2a:"Ya, sepenuhnya percuma.",faq3q:"Format apa disokong?",faq3a:"Video (MP4), GIF, gambar (JPG, PNG).",
    seoTitle:"Pemuat Turun Video Pinterest Percuma Terbaik",seoP:"PinSave memuat turun video, GIF dan gambar Pinterest percuma dalam HD.",
    h2steps:"Cara Muat Turun",h2feats:"Kenapa PinSave?",h2faq:"Soalan Lazim",
  },
  { code:"th", flag:"🇹🇭", name:"ภาษาไทย", title:"ดาวน์โหลดวิดีโอ Pinterest – HD ฟรี | PinSave",
    desc:"ดาวน์โหลดวิดีโอ GIF และรูปภาพ Pinterest ฟรีในคุณภาพ HD ไม่มีลายน้ำ ไม่ต้องสมัคร",
    h1a:"ดาวน์โหลดวิดีโอ", h1b:"Pinterest ฟรี", sub:"วางลิงก์ Pinterest แล้วบันทึกวิดีโอ GIF หรือรูปภาพใน HD โดยไม่มีลายน้ำ",
    badge:"✦ ฟรี 100% · ไม่ต้องสมัคร",
    T:{err_empty:"วางURL Pinterest",err_fail:"ดาวน์โหลดล้มเหลว โปรดลองอีกครั้ง",err_server:"ข้อผิดพลาดของเซิร์ฟเวอร์",btn_hd:"ดาวน์โหลด HD",btn_img:"ดาวน์โหลดรูปภาพ",btn_open:"เปิดในเบราว์เซอร์"},
    step1t:"เปิดปิน",step1d:"ค้นหาวิดีโอบน Pinterest",step2t:"คัดลอกลิงก์",step2d:"แชร์ → คัดลอกลิงก์",
    step3t:"วางและดาวน์โหลด",step3d:"วางลิงก์ด้านบนแล้วคลิกดาวน์โหลด",step4t:"บันทึกลงอุปกรณ์",step4d:"ไฟล์ถูกบันทึกโดยตรง",
    placeholder:"วางลิงก์ Pinterest ที่นี่…",btnLabel:"ดาวน์โหลด",pasteLabel:"📋 วาง",
    trustW:"ไม่มีลายน้ำ",trustH:"คุณภาพ HD",trustL:"ไม่ต้องเข้าสู่ระบบ",trustD:"ทุกอุปกรณ์",trustF:"ฟรี 100%",
    faq1q:"วิธีดาวน์โหลดวิดีโอ Pinterest?",faq1a:"คัดลอก URL วางด้านบน คลิกดาวน์โหลด",faq2q:"ฟรีหรือไม่?",faq2a:"ใช่ ฟรีทั้งหมด",faq3q:"รองรับรูปแบบใด?",faq3a:"วิดีโอ (MP4) GIF รูปภาพ (JPG PNG)",
    seoTitle:"ดาวน์โหลดวิดีโอ Pinterest ฟรีที่ดีที่สุด",seoP:"PinSave ดาวน์โหลดวิดีโอ GIF และรูปภาพ Pinterest ฟรีใน HD",
    h2steps:"วิธีดาวน์โหลด",h2feats:"ทำไมต้อง PinSave?",h2faq:"คำถามที่พบบ่อย",
  },
  { code:"vi", flag:"🇻🇳", name:"Tiếng Việt", title:"Tải Video Pinterest – HD Miễn Phí | PinSave",
    desc:"Tải video, GIF và hình ảnh Pinterest miễn phí chất lượng HD. Không watermark, không đăng ký.",
    h1a:"Tải Video", h1b:"Pinterest Miễn Phí", sub:"Dán link Pinterest và tải video, GIF hoặc hình ảnh HD — không watermark.",
    badge:"✦ Miễn Phí 100% · Không Đăng Ký",
    T:{err_empty:"Dán URL Pinterest.",err_fail:"Tải xuống thất bại. Thử lại.",err_server:"Lỗi máy chủ.",btn_hd:"Tải HD",btn_img:"Tải Hình Ảnh",btn_open:"Mở trong trình duyệt"},
    step1t:"Mở pin",step1d:"Tìm video trên Pinterest.",step2t:"Sao chép link",step2d:"Chia sẻ → Sao chép link.",
    step3t:"Dán và tải",step3d:"Dán link phía trên và nhấn Tải.",step4t:"Lưu vào thiết bị",step4d:"Tệp được lưu trực tiếp.",
    placeholder:"Dán link Pinterest tại đây…",btnLabel:"Tải xuống",pasteLabel:"📋 Dán",
    trustW:"Không watermark",trustH:"Chất lượng HD",trustL:"Không cần login",trustD:"Mọi thiết bị",trustF:"Miễn phí 100%",
    faq1q:"Cách tải video Pinterest?",faq1a:"Sao chép URL, dán phía trên, nhấn Tải.",faq2q:"Có miễn phí không?",faq2a:"Có, hoàn toàn miễn phí.",faq3q:"Hỗ trợ định dạng nào?",faq3a:"Video (MP4), GIF, hình ảnh (JPG, PNG).",
    seoTitle:"Trình tải video Pinterest miễn phí tốt nhất",seoP:"PinSave tải video, GIF và hình ảnh Pinterest miễn phí chất lượng HD.",
    h2steps:"Cách tải xuống",h2feats:"Tại sao PinSave?",h2faq:"Câu hỏi thường gặp",
  },
  { code:"el", flag:"🇬🇷", name:"Ελληνικά", title:"Λήψη Βίντεο Pinterest – Δωρεάν HD | PinSave",
    desc:"Κατεβάστε βίντεο, GIF και εικόνες Pinterest δωρεάν σε HD. Χωρίς υδατογράφημα.",
    h1a:"Κατεβάστε Βίντεο", h1b:"Pinterest Δωρεάν", sub:"Επικολλήστε έναν σύνδεσμο Pinterest και αποθηκεύστε βίντεο, GIF ή εικόνες σε HD.",
    badge:"✦ 100% Δωρεάν · Χωρίς Εγγραφή",
    T:{err_empty:"Επικολλήστε URL Pinterest.",err_fail:"Η λήψη απέτυχε. Δοκιμάστε ξανά.",err_server:"Σφάλμα διακομιστή.",btn_hd:"Λήψη HD",btn_img:"Λήψη Εικόνας",btn_open:"Άνοιγμα στον περιηγητή"},
    step1t:"Ανοίξτε το pin",step1d:"Βρείτε το βίντεο στο Pinterest.",step2t:"Αντιγράψτε τον σύνδεσμο",step2d:"Κοινοποίηση → Αντιγραφή συνδέσμου.",
    step3t:"Επικολλήστε και κατεβάστε",step3d:"Επικολλήστε τον σύνδεσμο παραπάνω και πατήστε Λήψη.",step4t:"Αποθηκεύστε",step4d:"Το αρχείο αποθηκεύεται άμεσα.",
    placeholder:"Επικολλήστε τον σύνδεσμο Pinterest εδώ…",btnLabel:"Λήψη",pasteLabel:"📋 Επικόλληση",
    trustW:"Χωρίς υδατογράφημα",trustH:"HD ποιότητα",trustL:"Χωρίς σύνδεση",trustD:"Όλες οι συσκευές",trustF:"100% Δωρεάν",
    faq1q:"Πώς κατεβάζω βίντεο Pinterest;",faq1a:"Αντιγράψτε URL, επικολλήστε παραπάνω, πατήστε Λήψη.",faq2q:"Είναι δωρεάν;",faq2a:"Ναι, εντελώς δωρεάν.",faq3q:"Ποιες μορφές;",faq3a:"Βίντεο (MP4), GIF, εικόνες (JPG, PNG).",
    seoTitle:"Καλύτερος δωρεάν downloader βίντεο Pinterest",seoP:"Το PinSave κατεβάζει βίντεο, GIF και εικόνες Pinterest δωρεάν σε HD.",
    h2steps:"Πώς να κατεβάσετε",h2feats:"Γιατί PinSave;",h2faq:"Συχνές ερωτήσεις",
  },
  // Simplified remaining languages
  { code:"he", flag:"🇮🇱", name:"עברית", title:"הורדת סרטוני Pinterest – HD בחינם | PinSave",
    desc:"הורד סרטונים, GIF ותמונות מ-Pinterest בחינם באיכות HD. ללא סימן מים.",
    h1a:"הורד סרטוני", h1b:"Pinterest בחינם", sub:"הדבק קישור Pinterest ושמור סרטונים, GIF או תמונות ב-HD.",
    badge:"✦ 100% חינם · ללא הרשמה",
    T:{err_empty:"הדבק URL של Pinterest.",err_fail:"ההורדה נכשלה. נסה שוב.",err_server:"שגיאת שרת.",btn_hd:"הורד HD",btn_img:"הורד תמונה",btn_open:"פתח בדפדפן"},
    step1t:"פתח את הפין",step1d:"מצא את הסרטון ב-Pinterest.",step2t:"העתק קישור",step2d:"שתף ← העתק קישור.",
    step3t:"הדבק והורד",step3d:"הדבק את הקישור ולחץ הורד.",step4t:"שמור למכשיר",step4d:"הקובץ נשמר ישירות.",
    placeholder:"הדבק קישור Pinterest כאן…",btnLabel:"הורד",pasteLabel:"📋 הדבק",
    trustW:"ללא סימן מים",trustH:"איכות HD",trustL:"ללא כניסה",trustD:"כל המכשירים",trustF:"100% חינם",
    faq1q:"איך מוריד סרטון מ-Pinterest?",faq1a:"העתק URL, הדבק למעלה, לחץ הורד.",faq2q:"האם זה חינם?",faq2a:"כן, לגמרי חינם.",faq3q:"אילו פורמטים?",faq3a:"סרטונים (MP4), GIF, תמונות (JPG, PNG).",
    seoTitle:"מוריד סרטוני Pinterest הטוב ביותר",seoP:"PinSave מוריד סרטונים, GIF ותמונות מ-Pinterest בחינם ב-HD.",
    h2steps:"איך להוריד",h2feats:"למה PinSave?",h2faq:"שאלות נפוצות",
  },
  { code:"fa", flag:"🇮🇷", name:"فارسی", title:"دانلود ویدیو Pinterest – رایگان HD | PinSave",
    desc:"ویدیوها، GIF‌ها و تصاویر Pinterest را رایگان با کیفیت HD دانلود کنید. بدون واترمارک.",
    h1a:"دانلود ویدیوهای", h1b:"Pinterest رایگان", sub:"لینک Pinterest را بچسبانید و ویدیو، GIF یا تصویر را در HD ذخیره کنید.",
    badge:"✦ ۱۰۰٪ رایگان · بدون ثبت‌نام",
    T:{err_empty:"لطفاً URL Pinterest را بچسبانید.",err_fail:"دانلود ناموفق بود. دوباره امتحان کنید.",err_server:"خطای سرور.",btn_hd:"دانلود HD",btn_img:"دانلود تصویر",btn_open:"باز کردن در مرورگر"},
    step1t:"پین را باز کنید",step1d:"ویدیو را در Pinterest پیدا کنید.",step2t:"لینک را کپی کنید",step2d:"اشتراک‌گذاری ← کپی لینک.",
    step3t:"بچسبانید و دانلود کنید",step3d:"لینک را در بالا بچسبانید و دانلود را بزنید.",step4t:"در دستگاه ذخیره کنید",step4d:"فایل مستقیم ذخیره می‌شود.",
    placeholder:"لینک Pinterest را اینجا بچسبانید…",btnLabel:"دانلود",pasteLabel:"📋 چسباندن",
    trustW:"بدون واترمارک",trustH:"کیفیت HD",trustL:"بدون ورود",trustD:"همه دستگاه‌ها",trustF:"۱۰۰٪ رایگان",
    faq1q:"چطور ویدیوی Pinterest را دانلود کنم؟",faq1a:"URL را کپی کنید، در بالا بچسبانید و دانلود را بزنید.",faq2q:"آیا رایگان است؟",faq2a:"بله، کاملاً رایگان.",faq3q:"چه فرمت‌هایی؟",faq3a:"ویدیو (MP4)، GIF، تصویر (JPG، PNG).",
    seoTitle:"بهترین دانلودر ویدیوی Pinterest رایگان",seoP:"PinSave ویدیوها، GIF‌ها و تصاویر Pinterest را رایگان با کیفیت HD دانلود می‌کند.",
    h2steps:"چگونه دانلود کنیم",h2feats:"چرا PinSave؟",h2faq:"سوالات متداول",
  },
  { code:"bn", flag:"🇧🇩", name:"বাংলা", title:"Pinterest ভিডিও ডাউনলোডার – বিনামূল্যে HD | PinSave",
    desc:"Pinterest ভিডিও, GIF এবং ছবি বিনামূল্যে HD মানে ডাউনলোড করুন। কোনো ওয়াটারমার্ক নেই।",
    h1a:"Pinterest ভিডিও", h1b:"বিনামূল্যে ডাউনলোড", sub:"যেকোনো Pinterest লিংক পেস্ট করুন এবং HD মানে ভিডিও, GIF বা ছবি সংরক্ষণ করুন।",
    badge:"✦ ১০০% বিনামূল্যে · কোনো নিবন্ধন নেই",
    T:{err_empty:"Pinterest URL পেস্ট করুন।",err_fail:"ডাউনলোড ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",err_server:"সার্ভার ত্রুটি।",btn_hd:"HD ডাউনলোড",btn_img:"ছবি ডাউনলোড",btn_open:"ব্রাউজারে খুলুন"},
    step1t:"পিন খুলুন",step1d:"Pinterest-এ ভিডিও খুঁজুন।",step2t:"লিংক কপি করুন",step2d:"শেয়ার → লিংক কপি করুন।",
    step3t:"পেস্ট করুন এবং ডাউনলোড করুন",step3d:"উপরে লিংক পেস্ট করুন এবং ডাউনলোড ক্লিক করুন।",step4t:"ডিভাইসে সংরক্ষণ করুন",step4d:"ফাইল সরাসরি সংরক্ষিত হয়।",
    placeholder:"এখানে Pinterest লিংক পেস্ট করুন…",btnLabel:"ডাউনলোড",pasteLabel:"📋 পেস্ট",
    trustW:"কোনো ওয়াটারমার্ক নেই",trustH:"HD মান",trustL:"কোনো লগইন নেই",trustD:"সব ডিভাইস",trustF:"১০০% বিনামূল্যে",
    faq1q:"Pinterest ভিডিও কীভাবে ডাউনলোড করব?",faq1a:"URL কপি করুন, উপরে পেস্ট করুন, ডাউনলোড ক্লিক করুন।",faq2q:"এটি কি বিনামূল্যে?",faq2a:"হ্যাঁ, সম্পূর্ণ বিনামূল্যে।",faq3q:"কোন ফরম্যাট সমর্থিত?",faq3a:"ভিডিও (MP4), GIF, ছবি (JPG, PNG)।",
    seoTitle:"সেরা বিনামূল্যে Pinterest ভিডিও ডাউনলোডার",seoP:"PinSave Pinterest ভিডিও, GIF এবং ছবি বিনামূল্যে HD মানে ডাউনলোড করে।",
    h2steps:"কীভাবে ডাউনলোড করবেন",h2feats:"কেন PinSave?",h2faq:"সাধারণ জিজ্ঞাসা",
  },
  { code:"ur", flag:"🇵🇰", name:"اردو", title:"Pinterest ویڈیو ڈاؤنلوڈر – مفت HD | PinSave",
    desc:"Pinterest ویڈیوز، GIFs اور تصاویر مفت HD معیار میں ڈاؤنلوڈ کریں۔ کوئی واٹر مارک نہیں۔",
    h1a:"Pinterest ویڈیوز", h1b:"مفت ڈاؤنلوڈ کریں", sub:"کوئی بھی Pinterest لنک پیسٹ کریں اور HD معیار میں ویڈیو، GIF یا تصویر محفوظ کریں۔",
    badge:"✦ 100% مفت · کوئی رجسٹریشن نہیں",
    T:{err_empty:"Pinterest URL پیسٹ کریں۔",err_fail:"ڈاؤنلوڈ ناکام۔ دوبارہ کوشش کریں۔",err_server:"سرور کی خرابی۔",btn_hd:"HD ڈاؤنلوڈ",btn_img:"تصویر ڈاؤنلوڈ",btn_open:"براؤزر میں کھولیں"},
    step1t:"پن کھولیں",step1d:"Pinterest پر ویڈیو تلاش کریں۔",step2t:"لنک کاپی کریں",step2d:"شیئر ← لنک کاپی کریں۔",
    step3t:"پیسٹ کریں اور ڈاؤنلوڈ کریں",step3d:"اوپر لنک پیسٹ کریں اور ڈاؤنلوڈ پر کلک کریں۔",step4t:"ڈیوائس میں محفوظ کریں",step4d:"فائل براہ راست محفوظ ہوتی ہے۔",
    placeholder:"یہاں Pinterest لنک پیسٹ کریں…",btnLabel:"ڈاؤنلوڈ",pasteLabel:"📋 پیسٹ",
    trustW:"کوئی واٹر مارک نہیں",trustH:"HD معیار",trustL:"کوئی لاگ ان نہیں",trustD:"تمام آلات",trustF:"100% مفت",
    faq1q:"Pinterest ویڈیو کیسے ڈاؤنلوڈ کریں؟",faq1a:"URL کاپی کریں، اوپر پیسٹ کریں، ڈاؤنلوڈ پر کلک کریں۔",faq2q:"کیا یہ مفت ہے؟",faq2a:"ہاں، مکمل طور پر مفت۔",faq3q:"کون سے فارمیٹس؟",faq3a:"ویڈیو (MP4)، GIF، تصاویر (JPG، PNG)۔",
    seoTitle:"بہترین مفت Pinterest ویڈیو ڈاؤنلوڈر",seoP:"PinSave Pinterest ویڈیوز، GIFs اور تصاویر مفت HD معیار میں ڈاؤنلوڈ کرتا ہے۔",
    h2steps:"ڈاؤنلوڈ کرنے کا طریقہ",h2feats:"PinSave کیوں؟",h2faq:"اکثر پوچھے گئے سوالات",
  },
  { code:"ta", flag:"🇮🇳", name:"தமிழ்", title:"Pinterest வீடியோ டவுன்லோடர் – இலவச HD | PinSave",
    desc:"Pinterest வீடியோக்கள், GIF மற்றும் படங்களை இலவசமாக HD தரத்தில் பதிவிறக்கவும்.",
    h1a:"Pinterest வீடியோக்களை", h1b:"இலவசமாக பதிவிறக்கவும்", sub:"Pinterest இணைப்பை ஒட்டி HD தரத்தில் வீடியோ, GIF அல்லது படங்களை சேமிக்கவும்.",
    badge:"✦ 100% இலவசம் · பதிவு தேவையில்லை",
    T:{err_empty:"Pinterest URL ஒட்டவும்.",err_fail:"பதிவிறக்கம் தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.",err_server:"சர்வர் பிழை.",btn_hd:"HD பதிவிறக்கம்",btn_img:"படம் பதிவிறக்கம்",btn_open:"உலாவியில் திற"},
    step1t:"பின் திறக்கவும்",step1d:"Pinterest இல் வீடியோவை கண்டுபிடிக்கவும்.",step2t:"இணைப்பை நகலெடுக்கவும்",step2d:"பகிர் → இணைப்பை நகலெடு.",
    step3t:"ஒட்டி பதிவிறக்கவும்",step3d:"மேலே இணைப்பை ஒட்டி பதிவிறக்கம் கிளிக் செய்யவும்.",step4t:"சாதனத்தில் சேமிக்கவும்",step4d:"கோப்பு நேரடியாக சேமிக்கப்படும்.",
    placeholder:"இங்கே Pinterest இணைப்பை ஒட்டவும்…",btnLabel:"பதிவிறக்கம்",pasteLabel:"📋 ஒட்டு",
    trustW:"வாட்டர்மார்க் இல்லை",trustH:"HD தரம்",trustL:"உள்நுழைவு இல்லை",trustD:"அனைத்து சாதனங்கள்",trustF:"100% இலவசம்",
    faq1q:"Pinterest வீடியோவை எப்படி பதிவிறக்குவது?",faq1a:"URL நகலெடுத்து மேலே ஒட்டி பதிவிறக்கம் கிளிக் செய்யவும்.",faq2q:"இது இலவசமா?",faq2a:"ஆம், முற்றிலும் இலவசம்.",faq3q:"எந்த வடிவங்கள்?",faq3a:"வீடியோ (MP4), GIF, படங்கள் (JPG, PNG).",
    seoTitle:"சிறந்த இலவச Pinterest வீடியோ டவுன்லோடர்",seoP:"PinSave Pinterest வீடியோக்கள், GIF மற்றும் படங்களை இலவசமாக HD இல் பதிவிறக்குகிறது.",
    h2steps:"எப்படி பதிவிறக்குவது",h2feats:"ஏன் PinSave?",h2faq:"அடிக்கடி கேட்கப்படும் கேள்விகள்",
  },
  { code:"te", flag:"🇮🇳", name:"తెలుగు", title:"Pinterest వీడియో డౌన్‌లోడర్ – ఉచిత HD | PinSave",
    desc:"Pinterest వీడియోలు, GIFలు మరియు చిత్రాలను ఉచితంగా HD నాణ్యతలో డౌన్‌లోడ్ చేయండి.",
    h1a:"Pinterest వీడియోలను", h1b:"ఉచితంగా డౌన్‌లోడ్ చేయండి", sub:"Pinterest లింక్‌ను పేస్ట్ చేసి HD నాణ్యతలో వీడియో, GIF లేదా చిత్రాలను సేవ్ చేయండి.",
    badge:"✦ 100% ఉచితం · రిజిస్ట్రేషన్ అవసరం లేదు",
    T:{err_empty:"Pinterest URL పేస్ట్ చేయండి.",err_fail:"డౌన్‌లోడ్ విఫలమైంది. మళ్ళీ ప్రయత్నించండి.",err_server:"సర్వర్ లోపం.",btn_hd:"HD డౌన్‌లోడ్",btn_img:"చిత్రం డౌన్‌లోడ్",btn_open:"బ్రౌజర్‌లో తెరవండి"},
    step1t:"పిన్ తెరవండి",step1d:"Pinterest లో వీడియో కనుగొనండి.",step2t:"లింక్ కాపీ చేయండి",step2d:"షేర్ → లింక్ కాపీ చేయండి.",
    step3t:"పేస్ట్ చేసి డౌన్‌లోడ్ చేయండి",step3d:"పై లింక్ పేస్ట్ చేసి డౌన్‌లోడ్ నొక్కండి.",step4t:"పరికరంలో సేవ్ చేయండి",step4d:"ఫైల్ నేరుగా సేవ్ అవుతుంది.",
    placeholder:"ఇక్కడ Pinterest లింక్ పేస్ట్ చేయండి…",btnLabel:"డౌన్‌లోడ్",pasteLabel:"📋 పేస్ట్",
    trustW:"వాటర్‌మార్క్ లేదు",trustH:"HD నాణ్యత",trustL:"లాగిన్ లేదు",trustD:"అన్ని పరికరాలు",trustF:"100% ఉచితం",
    faq1q:"Pinterest వీడియోను ఎలా డౌన్‌లోడ్ చేయాలి?",faq1a:"URL కాపీ చేసి, పై పేస్ట్ చేసి, డౌన్‌లోడ్ నొక్కండి.",faq2q:"ఇది ఉచితమా?",faq2a:"అవును, పూర్తిగా ఉచితం.",faq3q:"ఏ ఫార్మాట్‌లు?",faq3a:"వీడియో (MP4), GIF, చిత్రాలు (JPG, PNG).",
    seoTitle:"అత్యుత్తమ ఉచిత Pinterest వీడియో డౌన్‌లోడర్",seoP:"PinSave Pinterest వీడియోలు, GIFలు మరియు చిత్రాలను ఉచితంగా HD లో డౌన్‌లోడ్ చేస్తుంది.",
    h2steps:"ఎలా డౌన్‌లోడ్ చేయాలి",h2feats:"PinSave ఎందుకు?",h2faq:"తరచుగా అడిగే ప్రశ్నలు",
  },
  { code:"ml", flag:"🇮🇳", name:"മലയാളം", title:"Pinterest വീഡിയോ ഡൗൺലോഡർ – സൗജന്യ HD | PinSave",
    desc:"Pinterest വീഡിയോകൾ, GIF, ചിത്രങ്ങൾ HD ഗുണനിലവാരത്തിൽ സൗജന്യമായി ഡൗൺലോഡ് ചെയ്യുക.",
    h1a:"Pinterest വീഡിയോകൾ", h1b:"സൗജന്യമായി ഡൗൺലോഡ് ചെയ്യുക", sub:"Pinterest ലിങ്ക് ഒട്ടിക്കുക, HD ഗുണനിലവാരത്തിൽ വീഡിയോ, GIF അല്ലെങ്കിൽ ചിത്രങ്ങൾ സേവ് ചെയ്യുക.",
    badge:"✦ 100% സൗജന്യം · രജിസ്ട്രേഷൻ ആവശ്യമില്ല",
    T:{err_empty:"Pinterest URL ഒട്ടിക്കുക.",err_fail:"ഡൗൺലോഡ് പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക.",err_server:"സർവർ പിഴവ്.",btn_hd:"HD ഡൗൺലോഡ്",btn_img:"ചിത്രം ഡൗൺലോഡ്",btn_open:"ബ്രൗസറിൽ തുറക്കുക"},
    step1t:"പിൻ തുറക്കുക",step1d:"Pinterest-ൽ വീഡിയോ കണ്ടെത്തുക.",step2t:"ലിങ്ക് പകർത്തുക",step2d:"പങ്കിടുക → ലിങ്ക് പകർത്തുക.",
    step3t:"ഒട്ടിക്കുക, ഡൗൺലോഡ് ചെയ്യുക",step3d:"ലിങ്ക് മുകളിൽ ഒട്ടിക്കുക, ഡൗൺലോഡ് ക്ലിക്ക് ചെയ്യുക.",step4t:"ഉപകരണത്തിൽ സേവ് ചെയ്യുക",step4d:"ഫയൽ നേരിട്ട് സേവ് ആകും.",
    placeholder:"ഇവിടെ Pinterest ലിങ്ക് ഒട്ടിക്കുക…",btnLabel:"ഡൗൺലോഡ്",pasteLabel:"📋 ഒട്ടിക്കുക",
    trustW:"വാട്ടർമാർക്ക് ഇല്ല",trustH:"HD ഗുണനിലവാരം",trustL:"ലോഗിൻ ഇല്ല",trustD:"എല്ലാ ഉപകരണങ്ങളും",trustF:"100% സൗജന്യം",
    faq1q:"Pinterest വീഡിയോ എങ്ങനെ ഡൗൺലോഡ് ചെയ്യാം?",faq1a:"URL പകർത്തുക, മുകളിൽ ഒട്ടിക്കുക, ഡൗൺലോഡ് ക്ലിക്ക് ചെയ്യുക.",faq2q:"ഇത് സൗജന്യമാണോ?",faq2a:"അതെ, പൂർണ്ണ സൗജന്യം.",faq3q:"ഏത് ഫോർമാറ്റുകൾ?",faq3a:"വീഡിയോ (MP4), GIF, ചിത്രങ്ങൾ (JPG, PNG).",
    seoTitle:"മികച്ച സൗജന്യ Pinterest വീഡിയോ ഡൗൺലോഡർ",seoP:"PinSave Pinterest വീഡിയോകൾ, GIF, ചിത്രങ്ങൾ സൗജന്യമായി HD ൽ ഡൗൺലോഡ് ചെയ്യുന്നു.",
    h2steps:"എങ്ങനെ ഡൗൺലോഡ് ചെയ്യാം",h2feats:"എന്തുകൊണ്ട് PinSave?",h2faq:"പതിവ് ചോദ്യങ്ങൾ",
  },
  { code:"mr", flag:"🇮🇳", name:"मराठी", title:"Pinterest व्हिडिओ डाउनलोडर – मोफत HD | PinSave",
    desc:"Pinterest व्हिडिओ, GIF आणि प्रतिमा मोफत HD दर्जाने डाउनलोड करा. कोणताही वॉटरमार्क नाही.",
    h1a:"Pinterest व्हिडिओ", h1b:"मोफत डाउनलोड करा", sub:"कोणताही Pinterest लिंक पेस्ट करा आणि HD दर्जात व्हिडिओ, GIF किंवा प्रतिमा जतन करा.",
    badge:"✦ १००% मोफत · नोंदणी आवश्यक नाही",
    T:{err_empty:"Pinterest URL पेस्ट करा.",err_fail:"डाउनलोड अयशस्वी. पुन्हा प्रयत्न करा.",err_server:"सर्व्हर त्रुटी.",btn_hd:"HD डाउनलोड",btn_img:"प्रतिमा डाउनलोड",btn_open:"ब्राउझरमध्ये उघडा"},
    step1t:"पिन उघडा",step1d:"Pinterest वर व्हिडिओ शोधा.",step2t:"लिंक कॉपी करा",step2d:"शेअर करा → लिंक कॉपी करा.",
    step3t:"पेस्ट करा आणि डाउनलोड करा",step3d:"वरती लिंक पेस्ट करा आणि डाउनलोड क्लिक करा.",step4t:"डिव्हाइसवर जतन करा",step4d:"फाईल थेट जतन होते.",
    placeholder:"येथे Pinterest लिंक पेस्ट करा…",btnLabel:"डाउनलोड",pasteLabel:"📋 पेस्ट",
    trustW:"कोणताही वॉटरमार्क नाही",trustH:"HD दर्जा",trustL:"लॉगिन नाही",trustD:"सर्व डिव्हाइस",trustF:"१००% मोफत",
    faq1q:"Pinterest व्हिडिओ कसे डाउनलोड करावे?",faq1a:"URL कॉपी करा, वरती पेस्ट करा, डाउनलोड क्लिक करा.",faq2q:"हे मोफत आहे का?",faq2a:"होय, पूर्णपणे मोफत.",faq3q:"कोणते फॉरमॅट?",faq3a:"व्हिडिओ (MP4), GIF, प्रतिमा (JPG, PNG).",
    seoTitle:"सर्वोत्तम मोफत Pinterest व्हिडिओ डाउनलोडर",seoP:"PinSave Pinterest व्हिडिओ, GIF आणि प्रतिमा मोफत HD मध्ये डाउनलोड करते.",
    h2steps:"कसे डाउनलोड करायचे",h2feats:"PinSave का?",h2faq:"वारंवार विचारले जाणारे प्रश्न",
  },
  { code:"gu", flag:"🇮🇳", name:"ગુજરાતી", title:"Pinterest વિડિઓ ડાઉનલોડર – મફત HD | PinSave",
    desc:"Pinterest વિડિઓ, GIF અને છબીઓ મફત HD ગુણવત્તામાં ડાઉનલોડ કરો. કોઈ વોટરમાર્ક નહીં.",
    h1a:"Pinterest વિડિઓ", h1b:"મફત ડાઉનલોડ કરો", sub:"કોઈ Pinterest લિંક પેસ્ટ કરો અને HD ગુણવત્તામાં વિડિઓ, GIF અથવા છબી સાચવો.",
    badge:"✦ ૧૦૦% મફત · નોંધણી આવશ્યક નથી",
    T:{err_empty:"Pinterest URL પેસ્ટ કરો.",err_fail:"ડાઉનલોડ નિષ્ફળ. ફરી પ્રયાસ કરો.",err_server:"સર્વર ભૂલ.",btn_hd:"HD ડાઉનલોડ",btn_img:"છબી ડાઉનલોડ",btn_open:"બ્રાઉઝરમાં ખોલો"},
    step1t:"પિન ખોલો",step1d:"Pinterest પર વિડિઓ શોધો.",step2t:"લિંક કૉપિ કરો",step2d:"શેર → લિંક કૉપિ.",
    step3t:"પેસ્ટ કરો અને ડાઉનલોડ કરો",step3d:"ઉપર લિંક પેસ્ટ કરો અને ડાઉનલોડ ક્લિક કરો.",step4t:"ઉપકરણ પર સાચવો",step4d:"ફાઇલ સીધી સચવાય છે.",
    placeholder:"અહીં Pinterest લિંક પેસ્ટ કરો…",btnLabel:"ડાઉનલોડ",pasteLabel:"📋 પેસ્ટ",
    trustW:"કોઈ વોટરમાર્ક નહીં",trustH:"HD ગુણવત્તા",trustL:"કોઈ લૉગિન નહીં",trustD:"તમામ ઉપકરણો",trustF:"૧૦૦% મફત",
    faq1q:"Pinterest વિડિઓ કેવી રીતે ડાઉનલોડ કરવો?",faq1a:"URL કૉપિ કરો, ઉપર પેસ્ટ કરો, ડાઉનલોડ ક્લિક કરો.",faq2q:"શું આ મફત છે?",faq2a:"હા, સંપૂર્ણ મફત.",faq3q:"કઈ ફૉર્મેટ?",faq3a:"વિડિઓ (MP4), GIF, છબી (JPG, PNG).",
    seoTitle:"શ્રેષ્ઠ મફત Pinterest વિડિઓ ડાઉનલોડર",seoP:"PinSave Pinterest વિડિઓ, GIF અને છબીઓ મફત HD માં ડાઉનલોડ કરે છે.",
    h2steps:"ડાઉનલોડ કેવી રીતે કરવો",h2feats:"PinSave કેમ?",h2faq:"વારંવાર પૂછાતા પ્રશ્નો",
  },
  { code:"kn", flag:"🇮🇳", name:"ಕನ್ನಡ", title:"Pinterest ವೀಡಿಯೋ ಡೌನ್‌ಲೋಡರ್ – ಉಚಿತ HD | PinSave",
    desc:"Pinterest ವೀಡಿಯೋಗಳು, GIF ಮತ್ತು ಚಿತ್ರಗಳನ್ನು HD ಗುಣಮಟ್ಟದಲ್ಲಿ ಉಚಿತವಾಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ.",
    h1a:"Pinterest ವೀಡಿಯೋಗಳನ್ನು", h1b:"ಉಚಿತವಾಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ", sub:"Pinterest ಲಿಂಕ್ ಅನ್ನು ಅಂಟಿಸಿ ಮತ್ತು HD ನಲ್ಲಿ ವೀಡಿಯೋ, GIF ಅಥವಾ ಚಿತ್ರಗಳನ್ನು ಉಳಿಸಿ.",
    badge:"✦ 100% ಉಚಿತ · ನೋಂದಣಿ ಅಗತ್ಯವಿಲ್ಲ",
    T:{err_empty:"Pinterest URL ಅಂಟಿಸಿ.",err_fail:"ಡೌನ್‌ಲೋಡ್ ವಿಫಲವಾಯಿತು. ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",err_server:"ಸರ್ವರ್ ದೋಷ.",btn_hd:"HD ಡೌನ್‌ಲೋಡ್",btn_img:"ಚಿತ್ರ ಡೌನ್‌ಲೋಡ್",btn_open:"ಬ್ರೌಸರ್‌ನಲ್ಲಿ ತೆರೆಯಿರಿ"},
    step1t:"ಪಿನ್ ತೆರೆಯಿರಿ",step1d:"Pinterest ನಲ್ಲಿ ವೀಡಿಯೋ ಕಂಡುಹಿಡಿಯಿರಿ.",step2t:"ಲಿಂಕ್ ನಕಲಿಸಿ",step2d:"ಹಂಚಿಕೊಳ್ಳಿ → ಲಿಂಕ್ ನಕಲಿಸಿ.",
    step3t:"ಅಂಟಿಸಿ ಮತ್ತು ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ",step3d:"ಮೇಲೆ ಲಿಂಕ್ ಅಂಟಿಸಿ ಮತ್ತು ಡೌನ್‌ಲೋಡ್ ಕ್ಲಿಕ್ ಮಾಡಿ.",step4t:"ಸಾಧನದಲ್ಲಿ ಉಳಿಸಿ",step4d:"ಫೈಲ್ ನೇರವಾಗಿ ಉಳಿಯುತ್ತದೆ.",
    placeholder:"ಇಲ್ಲಿ Pinterest ಲಿಂಕ್ ಅಂಟಿಸಿ…",btnLabel:"ಡೌನ್‌ಲೋಡ್",pasteLabel:"📋 ಅಂಟಿಸಿ",
    trustW:"ವಾಟರ್‌ಮಾರ್ಕ್ ಇಲ್ಲ",trustH:"HD ಗುಣಮಟ್ಟ",trustL:"ಲಾಗಿನ್ ಇಲ್ಲ",trustD:"ಎಲ್ಲಾ ಸಾಧನಗಳು",trustF:"100% ಉಚಿತ",
    faq1q:"Pinterest ವೀಡಿಯೋ ಹೇಗೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಬೇಕು?",faq1a:"URL ನಕಲಿಸಿ, ಮೇಲೆ ಅಂಟಿಸಿ, ಡೌನ್‌ಲೋಡ್ ಕ್ಲಿಕ್ ಮಾಡಿ.",faq2q:"ಇದು ಉಚಿತವೇ?",faq2a:"ಹೌದು, ಸಂಪೂರ್ಣ ಉಚಿತ.",faq3q:"ಯಾವ ಸ್ವರೂಪಗಳು?",faq3a:"ವೀಡಿಯೋ (MP4), GIF, ಚಿತ್ರಗಳು (JPG, PNG).",
    seoTitle:"ಅತ್ಯುತ್ತಮ ಉಚಿತ Pinterest ವೀಡಿಯೋ ಡೌನ್‌ಲೋಡರ್",seoP:"PinSave Pinterest ವೀಡಿಯೋಗಳು, GIF ಮತ್ತು ಚಿತ್ರಗಳನ್ನು ಉಚಿತವಾಗಿ HD ನಲ್ಲಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡುತ್ತದೆ.",
    h2steps:"ಹೇಗೆ ಡೌನ್‌ಲೋಡ್ ಮಾಡಬೇಕು",h2feats:"ಏಕೆ PinSave?",h2faq:"ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
  },
  { code:"sw", flag:"🇰🇪", name:"Kiswahili", title:"Kipakuzi Cha Video Pinterest – HD Bure | PinSave",
    desc:"Pakua video za Pinterest, GIF na picha bure katika ubora wa HD. Bila alama ya maji.",
    h1a:"Pakua Video za", h1b:"Pinterest Bure", sub:"Bandika kiungo chochote cha Pinterest na uhifadhi video, GIF au picha kwa HD.",
    badge:"✦ Bure 100% · Hakuna Usajili",
    T:{err_empty:"Bandika URL ya Pinterest.",err_fail:"Upakuaji umeshindwa. Jaribu tena.",err_server:"Hitilafu ya seva.",btn_hd:"Pakua HD",btn_img:"Pakua Picha",btn_open:"Fungua kwenye kivinjari"},
    step1t:"Fungua pini",step1d:"Tafuta video kwenye Pinterest.",step2t:"Nakili kiungo",step2d:"Shiriki → Nakili kiungo.",
    step3t:"Bandika na pakua",step3d:"Bandika kiungo hapo juu na ubofye Pakua.",step4t:"Hifadhi kwenye kifaa",step4d:"Faili inahifadhiwa moja kwa moja.",
    placeholder:"Bandika kiungo cha Pinterest hapa…",btnLabel:"Pakua",pasteLabel:"📋 Bandika",
    trustW:"Bila alama ya maji",trustH:"Ubora wa HD",trustL:"Hakuna kuingia",trustD:"Vifaa vyote",trustF:"Bure 100%",
    faq1q:"Ninawezaje kupakua video ya Pinterest?",faq1a:"Nakili URL, ibandike hapo juu, ubofye Pakua.",faq2q:"Je, ni bure?",faq2a:"Ndiyo, bure kabisa.",faq3q:"Miundo ipi inayounga mkono?",faq3a:"Video (MP4), GIF, picha (JPG, PNG).",
    seoTitle:"Kipakuzi Bora Bure cha Video Pinterest",seoP:"PinSave hupakua video za Pinterest, GIF na picha bure kwa HD.",
    h2steps:"Jinsi ya Kupakua",h2feats:"Kwa Nini PinSave?",h2faq:"Maswali Yanayoulizwa Mara Kwa Mara",
  },
  { code:"ca", flag:"🏳️", name:"Català", title:"Baixador de Vídeos Pinterest – HD Gratuït | PinSave",
    desc:"Baixa vídeos, GIF i imatges de Pinterest gratuïtament en HD. Sense filigrana, sense registre.",
    h1a:"Baixa Vídeos de", h1b:"Pinterest Gratuïtament", sub:"Enganxa qualsevol enllaç de Pinterest i desa vídeos, GIF o imatges en HD.",
    badge:"✦ 100% Gratuït · Sense Registre",
    T:{err_empty:"Enganxa un URL de Pinterest.",err_fail:"Baixada fallida. Torna-ho a provar.",err_server:"Error del servidor.",btn_hd:"Baixar HD",btn_img:"Baixar Imatge",btn_open:"Obrir al navegador"},
    step1t:"Obre el pin",step1d:"Troba el vídeo a Pinterest.",step2t:"Copia l'enllaç",step2d:"Compartir → Copiar l'enllaç.",
    step3t:"Enganxa i baixa",step3d:"Enganxa l'enllaç a dalt i fes clic a Baixar.",step4t:"Desa al dispositiu",step4d:"El fitxer es desa directament.",
    placeholder:"Enganxa l'enllaç de Pinterest aquí…",btnLabel:"Baixar",pasteLabel:"📋 Enganxar",
    trustW:"Sense filigrana",trustH:"Qualitat HD",trustL:"Sense accés",trustD:"Tots els dispositius",trustF:"100% Gratuït",
    faq1q:"Com baixo un vídeo de Pinterest?",faq1a:"Copia la URL, enganxa-la a dalt i fes clic a Baixar.",faq2q:"És gratuït?",faq2a:"Sí, completament gratuït.",faq3q:"Quins formats?",faq3a:"Vídeos (MP4), GIF, imatges (JPG, PNG).",
    seoTitle:"Millor baixador gratuït de vídeos Pinterest",seoP:"PinSave baixa vídeos, GIF i imatges de Pinterest gratuïtament en HD.",
    h2steps:"Com baixar",h2feats:"Per què PinSave?",h2faq:"Preguntes freqüents",
  },
  { code:"af", flag:"🇿🇦", name:"Afrikaans", title:"Pinterest Video Aflaai – Gratis HD | PinSave",
    desc:"Laai Pinterest-video's, GIF's en prente gratis in HD-kwaliteit af. Geen watermerk.",
    h1a:"Laai Pinterest", h1b:"-video's Gratis af", sub:"Plak enige Pinterest-skakel en stoor video's, GIF's of prente in HD.",
    badge:"✦ 100% Gratis · Geen Registrasie",
    T:{err_empty:"Plak 'n Pinterest-URL.",err_fail:"Aflaai misluk. Probeer weer.",err_server:"Bedienerfout.",btn_hd:"Laai HD af",btn_img:"Laai Prent af",btn_open:"Maak in blaaier oop"},
    step1t:"Maak die speld oop",step1d:"Vind die video op Pinterest.",step2t:"Kopieer die skakel",step2d:"Deel → Kopieer skakel.",
    step3t:"Plak en laai af",step3d:"Plak die skakel hierbo en klik Aflaai.",step4t:"Stoor op toestel",step4d:"Die lêer word direk gestoor.",
    placeholder:"Plak Pinterest-skakel hier…",btnLabel:"Aflaai",pasteLabel:"📋 Plak",
    trustW:"Geen watermerk",trustH:"HD-kwaliteit",trustL:"Geen aanmelding",trustD:"Alle toestelle",trustF:"100% Gratis",
    faq1q:"Hoe laai ek 'n Pinterest-video af?",faq1a:"Kopieer die URL, plak dit hierbo en klik Aflaai.",faq2q:"Is dit gratis?",faq2a:"Ja, heeltemal gratis.",faq3q:"Watter formate?",faq3a:"Video's (MP4), GIF's, prente (JPG, PNG).",
    seoTitle:"Beste gratis Pinterest-video-aflaaiprogram",seoP:"PinSave laai Pinterest-video's, GIF's en prente gratis in HD af.",
    h2steps:"Hoe om af te laai",h2feats:"Waarom PinSave?",h2faq:"Gereelde vrae",
  },
  { code:"sk", flag:"🇸🇰", name:"Slovenčina", title:"Sťahovač Videa Pinterest – Zadarmo HD | PinSave",
    desc:"Stiahnite si Pinterest videá, GIFy a obrázky zadarmo v HD. Bez vodoznaku, bez registrácie.",
    h1a:"Stiahnite Videá", h1b:"Pinterest Zadarmo", sub:"Vložte odkaz Pinterest a stiahnite videá, GIFy alebo obrázky v HD.",
    badge:"✦ 100% Zadarmo · Bez Registrácie",
    T:{err_empty:"Vložte URL Pinterestu.",err_fail:"Sťahovanie zlyhalo. Skúste znova.",err_server:"Chyba servera.",btn_hd:"Stiahnuť HD",btn_img:"Stiahnuť obrázok",btn_open:"Otvoriť v prehliadači"},
    step1t:"Otvorte pin",step1d:"Nájdite video na Pintereste.",step2t:"Skopírujte odkaz",step2d:"Zdieľať → Kopírovať odkaz.",
    step3t:"Vložte a stiahnite",step3d:"Vložte odkaz vyššie a kliknite Stiahnuť.",step4t:"Uložte do zariadenia",step4d:"Súbor sa uloží priamo.",
    placeholder:"Vložte odkaz Pinterest sem…",btnLabel:"Stiahnuť",pasteLabel:"📋 Vložiť",
    trustW:"Bez vodoznaku",trustH:"HD kvalita",trustL:"Bez prihlásenia",trustD:"Všetky zariadenia",trustF:"100% Zadarmo",
    faq1q:"Ako stiahnem video z Pinterestu?",faq1a:"Skopírujte URL, vložte vyššie a kliknite Stiahnuť.",faq2q:"Je to zadarmo?",faq2a:"Áno, úplne zadarmo.",faq3q:"Aké formáty?",faq3a:"Videá (MP4), GIFy, obrázky (JPG, PNG).",
    seoTitle:"Najlepší bezplatný sťahovač videa Pinterest",seoP:"PinSave sťahuje Pinterest videá, GIFy a obrázky zadarmo v HD.",
    h2steps:"Ako stiahnuť",h2feats:"Prečo PinSave?",h2faq:"Časté otázky",
  },
  { code:"hr", flag:"🇭🇷", name:"Hrvatski", title:"Preuzimač Videa Pinterest – Besplatno HD | PinSave",
    desc:"Preuzmite Pinterest videozapise, GIF-ove i slike besplatno u HD-u. Bez vodenog žiga.",
    h1a:"Preuzmite Videozapise", h1b:"Pinterest Besplatno", sub:"Zalijepite Pinterest vezu i preuzmite videozapise, GIF-ove ili slike u HD-u.",
    badge:"✦ 100% Besplatno · Bez Registracije",
    T:{err_empty:"Zalijepite Pinterest URL.",err_fail:"Preuzimanje nije uspjelo. Pokušajte ponovo.",err_server:"Pogreška poslužitelja.",btn_hd:"Preuzmi HD",btn_img:"Preuzmi sliku",btn_open:"Otvori u pregledniku"},
    step1t:"Otvorite pin",step1d:"Pronađite videozapis na Pinterestu.",step2t:"Kopirajte vezu",step2d:"Dijeli → Kopiraj vezu.",
    step3t:"Zalijepite i preuzmite",step3d:"Zalijepite vezu gore i kliknite Preuzmi.",step4t:"Spremi na uređaj",step4d:"Datoteka se sprema izravno.",
    placeholder:"Zalijepite Pinterest vezu ovdje…",btnLabel:"Preuzmi",pasteLabel:"📋 Zalijepi",
    trustW:"Bez vodenog žiga",trustH:"HD kvaliteta",trustL:"Bez prijave",trustD:"Svi uređaji",trustF:"100% Besplatno",
    faq1q:"Kako preuzeti Pinterest video?",faq1a:"Kopirajte URL, zalijepite gore i kliknite Preuzmi.",faq2q:"Je li besplatno?",faq2a:"Da, potpuno besplatno.",faq3q:"Koji formati?",faq3a:"Videozapisi (MP4), GIF-ovi, slike (JPG, PNG).",
    seoTitle:"Najbolji besplatni preuzimač videa Pinterest",seoP:"PinSave preuzima Pinterest videozapise, GIF-ove i slike besplatno u HD-u.",
    h2steps:"Kako preuzeti",h2feats:"Zašto PinSave?",h2faq:"Česta pitanja",
  },
  { code:"bg", flag:"🇧🇬", name:"Български", title:"Изтегляне на Видео Pinterest – Безплатно HD | PinSave",
    desc:"Изтегляйте Pinterest видеа, GIF-ове и изображения безплатно в HD. Без воден знак.",
    h1a:"Изтегляйте Видеа от", h1b:"Pinterest Безплатно", sub:"Поставете Pinterest връзка и запазете видео, GIF или изображение в HD.",
    badge:"✦ 100% Безплатно · Без Регистрация",
    T:{err_empty:"Поставете Pinterest URL.",err_fail:"Изтеглянето е неуспешно. Опитайте отново.",err_server:"Грешка на сървъра.",btn_hd:"Изтегли HD",btn_img:"Изтегли изображение",btn_open:"Отвори в браузъра"},
    step1t:"Отворете пина",step1d:"Намерете видеото в Pinterest.",step2t:"Копирайте връзката",step2d:"Споделяне → Копиране на връзка.",
    step3t:"Поставете и изтеглете",step3d:"Поставете връзката по-горе и щракнете Изтегли.",step4t:"Запазете на устройство",step4d:"Файлът се запазва директно.",
    placeholder:"Поставете Pinterest връзка тук…",btnLabel:"Изтегли",pasteLabel:"📋 Постави",
    trustW:"Без воден знак",trustH:"HD качество",trustL:"Без вход",trustD:"Всички устройства",trustF:"100% Безплатно",
    faq1q:"Как да изтегля Pinterest видео?",faq1a:"Копирайте URL, поставете по-горе и натиснете Изтегли.",faq2q:"Безплатно ли е?",faq2a:"Да, напълно безплатно.",faq3q:"Кои формати?",faq3a:"Видеа (MP4), GIF-ове, изображения (JPG, PNG).",
    seoTitle:"Най-добрият безплатен изтеглящ Pinterest видео",seoP:"PinSave изтегля Pinterest видеа, GIF-ове и изображения безплатно в HD.",
    h2steps:"Как да изтеглите",h2feats:"Защо PinSave?",h2faq:"Често задавани въпроси",
  },
  { code:"pa", flag:"🇮🇳", name:"ਪੰਜਾਬੀ", title:"Pinterest ਵੀਡੀਓ ਡਾਊਨਲੋਡਰ – ਮੁਫ਼ਤ HD | PinSave",
    desc:"Pinterest ਵੀਡੀਓ, GIF ਅਤੇ ਤਸਵੀਰਾਂ ਮੁਫ਼ਤ HD ਗੁਣਵੱਤਾ ਵਿੱਚ ਡਾਊਨਲੋਡ ਕਰੋ। ਕੋਈ ਵਾਟਰਮਾਰਕ ਨਹੀਂ।",
    h1a:"Pinterest ਵੀਡੀਓ", h1b:"ਮੁਫ਼ਤ ਡਾਊਨਲੋਡ ਕਰੋ", sub:"ਕੋਈ ਵੀ Pinterest ਲਿੰਕ ਪੇਸਟ ਕਰੋ ਅਤੇ HD ਵਿੱਚ ਵੀਡੀਓ, GIF ਜਾਂ ਤਸਵੀਰਾਂ ਸੇਵ ਕਰੋ।",
    badge:"✦ ੧੦੦% ਮੁਫ਼ਤ · ਕੋਈ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਨਹੀਂ",
    T:{err_empty:"Pinterest URL ਪੇਸਟ ਕਰੋ।",err_fail:"ਡਾਊਨਲੋਡ ਅਸਫਲ। ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",err_server:"ਸਰਵਰ ਗਲਤੀ।",btn_hd:"HD ਡਾਊਨਲੋਡ",btn_img:"ਤਸਵੀਰ ਡਾਊਨਲੋਡ",btn_open:"ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਖੋਲ੍ਹੋ"},
    step1t:"ਪਿੰਨ ਖੋਲ੍ਹੋ",step1d:"Pinterest 'ਤੇ ਵੀਡੀਓ ਲੱਭੋ।",step2t:"ਲਿੰਕ ਕਾਪੀ ਕਰੋ",step2d:"ਸ਼ੇਅਰ ← ਲਿੰਕ ਕਾਪੀ ਕਰੋ।",
    step3t:"ਪੇਸਟ ਕਰੋ ਅਤੇ ਡਾਊਨਲੋਡ ਕਰੋ",step3d:"ਉੱਪਰ ਲਿੰਕ ਪੇਸਟ ਕਰੋ ਅਤੇ ਡਾਊਨਲੋਡ ਕਲਿੱਕ ਕਰੋ।",step4t:"ਡਿਵਾਈਸ ਵਿੱਚ ਸੇਵ ਕਰੋ",step4d:"ਫ਼ਾਈਲ ਸਿੱਧੀ ਸੇਵ ਹੁੰਦੀ ਹੈ।",
    placeholder:"ਇੱਥੇ Pinterest ਲਿੰਕ ਪੇਸਟ ਕਰੋ…",btnLabel:"ਡਾਊਨਲੋਡ",pasteLabel:"📋 ਪੇਸਟ",
    trustW:"ਕੋਈ ਵਾਟਰਮਾਰਕ ਨਹੀਂ",trustH:"HD ਗੁਣਵੱਤਾ",trustL:"ਕੋਈ ਲਾਗਇਨ ਨਹੀਂ",trustD:"ਸਾਰੇ ਡਿਵਾਈਸ",trustF:"੧੦੦% ਮੁਫ਼ਤ",
    faq1q:"Pinterest ਵੀਡੀਓ ਕਿਵੇਂ ਡਾਊਨਲੋਡ ਕਰੀਏ?",faq1a:"URL ਕਾਪੀ ਕਰੋ, ਉੱਪਰ ਪੇਸਟ ਕਰੋ, ਡਾਊਨਲੋਡ ਕਲਿੱਕ ਕਰੋ।",faq2q:"ਕੀ ਇਹ ਮੁਫ਼ਤ ਹੈ?",faq2a:"ਹਾਂ, ਪੂਰੀ ਤਰ੍ਹਾਂ ਮੁਫ਼ਤ।",faq3q:"ਕਿਹੜੇ ਫਾਰਮੈਟ?",faq3a:"ਵੀਡੀਓ (MP4), GIF, ਤਸਵੀਰਾਂ (JPG, PNG)।",
    seoTitle:"ਸਭ ਤੋਂ ਵਧੀਆ ਮੁਫ਼ਤ Pinterest ਵੀਡੀਓ ਡਾਊਨਲੋਡਰ",seoP:"PinSave Pinterest ਵੀਡੀਓ, GIF ਅਤੇ ਤਸਵੀਰਾਂ ਮੁਫ਼ਤ HD ਵਿੱਚ ਡਾਊਨਲੋਡ ਕਰਦਾ ਹੈ।",
    h2steps:"ਕਿਵੇਂ ਡਾਊਨਲੋਡ ਕਰੀਏ",h2feats:"PinSave ਕਿਉਂ?",h2faq:"ਅਕਸਰ ਪੁੱਛੇ ਜਾਂਦੇ ਸਵਾਲ",
  },
];

// ─── Generate HTML ────────────────────────────────────────────────────────────

const LANG_LINKS = langs.map(l => `<a href="/${l.code}/"${l.code === 'en' ? ' class="active"' : ''}>${l.flag} ${l.name}</a>`).join('\n        ');

function html(l) {
  const isRTL = ["ar","he","fa","ur"].includes(l.code);
  return `<!DOCTYPE html>
<html lang="${l.code}"${isRTL ? ' dir="rtl"' : ''}>
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${l.title}</title>
<meta name="description" content="${l.desc}"/>
<meta name="robots" content="index,follow"/>
<link rel="canonical" href="https://pindown.xizoa.com/${l.code}/"/>
<meta property="og:title" content="${l.title}"/>
<meta property="og:description" content="${l.desc}"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="https://pindown.xizoa.com/${l.code}/"/>
<meta name="twitter:card" content="summary_large_image"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="/assets/style.css"/>
</head>
<body>
<nav class="nav">
  <div class="wrap nav-inner">
    <a href="/" class="logo">
      <div class="logo-dot"><svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.43 7.63 11.17-.11-.95-.2-2.4.04-3.44.22-.94 1.41-5.97 1.41-5.97s-.36-.72-.36-1.78c0-1.67.97-2.91 2.17-2.91 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-.99 4-.28 1.19.6 2.17 1.78 2.17 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.21 0 1.03.4 2.14.89 2.74.1.12.11.22.08.34l-.33 1.36c-.05.22-.17.27-.4.16-1.5-.7-2.44-2.89-2.44-4.65 0-3.78 2.75-7.26 7.93-7.26 4.16 0 7.4 2.97 7.4 6.93 0 4.14-2.61 7.46-6.23 7.46-1.22 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15C9.57 23.81 10.76 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/></svg></div>
      Pin<span>Save</span>
    </a>
    <div class="lang-wrap">
      <button class="lang-btn" id="langBtn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/></svg>
        ${l.flag} ${l.name}
        <svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <div class="lang-menu" id="langMenu">
        ${LANG_LINKS}
      </div>
    </div>
  </div>
</nav>

<section class="hero">
  <div class="wrap">
    <div class="badge anim">${l.badge}</div>
    <h1 class="anim anim-d1">${l.h1a}<br/><em>${l.h1b}</em></h1>
    <p class="sub anim anim-d2">${l.sub}</p>
    <div class="card anim anim-d3">
      <div class="input-row">
        <input type="url" id="pinUrl" class="url-input" placeholder="${l.placeholder}" autocomplete="off" autocorrect="off"/>
        <button class="dl-btn" id="mainBtn" onclick="startDownload()">
          <span class="ico">⬇</span>
          <div class="spinner"></div>
          ${l.btnLabel}
        </button>
      </div>
      <div class="hint-row">
        <span class="hint">pinterest.com &amp; pin.it</span>
        <button class="paste-btn" onclick="pasteUrl()">${l.pasteLabel}</button>
      </div>
      <div class="err" id="errBox">
        <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span id="errTxt"></span>
      </div>
      <div class="result" id="resBox">
        <div class="result-inner">
          <div class="result-top">
            <img class="thumb" id="resThumb" src="" alt=""/>
            <div class="meta">
              <span class="type-badge tv" id="resBadge">VIDEO</span>
              <div class="result-title" id="resTitle"></div>
              <div class="result-desc" id="resDesc"></div>
            </div>
          </div>
          <div class="result-btns" id="resBtns"></div>
        </div>
      </div>
    </div>
    <div class="trust">
      <div class="trust-item"><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>${l.trustW}</div>
      <div class="trust-item"><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>${l.trustH}</div>
      <div class="trust-item"><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>${l.trustL}</div>
      <div class="trust-item"><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>${l.trustD}</div>
      <div class="trust-item"><svg fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>${l.trustF}</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <h2>${l.h2steps}</h2>
    <div class="steps">
      <div class="step"><div class="step-n">01</div><div class="step-t">${l.step1t}</div><p class="step-d">${l.step1d}</p></div>
      <div class="step"><div class="step-n">02</div><div class="step-t">${l.step2t}</div><p class="step-d">${l.step2d}</p></div>
      <div class="step"><div class="step-n">03</div><div class="step-t">${l.step3t}</div><p class="step-d">${l.step3d}</p></div>
      <div class="step"><div class="step-n">04</div><div class="step-t">${l.step4t}</div><p class="step-d">${l.step4d}</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="seo-block">
      <h2>${l.seoTitle}</h2>
      <p>${l.seoP}</p>
    </div>
  </div>
</section>

<section class="section" id="faq">
  <div class="wrap">
    <h2 style="text-align:center;margin-bottom:24px">${l.h2faq}</h2>
    <div class="faq-list">
      <div class="faq-item"><button class="faq-q">${l.faq1q}<svg class="chev" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></button><div class="faq-a"><div class="faq-body">${l.faq1a}</div></div></div>
      <div class="faq-item"><button class="faq-q">${l.faq2q}<svg class="chev" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></button><div class="faq-a"><div class="faq-body">${l.faq2a}</div></div></div>
      <div class="faq-item"><button class="faq-q">${l.faq3q}<svg class="chev" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></button><div class="faq-a"><div class="faq-body">${l.faq3a}</div></div></div>
    </div>
  </div>
</section>

<footer>
  <div class="wrap foot-inner">
    <a href="/" class="logo">
      <div class="logo-dot"><svg viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.43 7.63 11.17-.11-.95-.2-2.4.04-3.44.22-.94 1.41-5.97 1.41-5.97s-.36-.72-.36-1.78c0-1.67.97-2.91 2.17-2.91 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-.99 4-.28 1.19.6 2.17 1.78 2.17 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.06-4.88-5.01-4.88-3.41 0-5.42 2.56-5.42 5.21 0 1.03.4 2.14.89 2.74.1.12.11.22.08.34l-.33 1.36c-.05.22-.17.27-.4.16-1.5-.7-2.44-2.89-2.44-4.65 0-3.78 2.75-7.26 7.93-7.26 4.16 0 7.4 2.97 7.4 6.93 0 4.14-2.61 7.46-6.23 7.46-1.22 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15C9.57 23.81 10.76 24 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0z"/></svg></div>
      Pin<span>Save</span>
    </a>
    <div class="foot-links">
      <a href="/en/">English</a>
      <a href="/hi/">हिन्दी</a>
      <a href="/es/">Español</a>
      <a href="/ar/">العربية</a>
    </div>
    <p class="copy">© 2025 PinSave — Not affiliated with Pinterest, Inc.</p>
  </div>
</footer>

<script>window.T=${JSON.stringify(l.T)};</script>
<script src="/assets/app.js"></script>
</body>
</html>`;
}

// Write all files
// Write all files
let count = 0;
for (const l of langs) {
  const dir = path.join(__dirname, l.code);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), html(l), "utf8");
  count++;
  process.stdout.write(`\r✓ Generated ${count}/${langs.length}: /${l.code}/`);
}
console.log(`\n\n✅ All ${count} language pages generated!`);
