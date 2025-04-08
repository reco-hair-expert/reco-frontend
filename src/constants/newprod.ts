import reco from "../../public/images/product.png";
import happyEnd from "../../public/images/happyEnd.png";
import recoOn from "../../public/images/recoOn.png";
import recoOil from "../../public/images/recoOil.png";
import termoControl from "../../public/images/termoControl.png";
import volUp from "../../public/images/volUp.png";
import everyDay from "../../public/images/everyDay.png";
import shampooHydrating from "../../public/images/shampooHydrating.png";
import botoxHairExpert from "../../public/images/botoxHairExpert.png";
import conditionerVol from "../../public/images/conditionerVol.png";
import shampooVol from "../../public/images/shampooVol.png";
import shampooDetox from "../../public/images/shampooDetox.png";

 const products = [
  {
    id: 1,
    name: "RECO",
    photo: reco,
    type: "Реконструктор",
    shortDescription: "Супервідновлення волосся за 20 хвилин.",
    description:
      "Інноваційний продукт для відновлення максимально пошкодженого волосся. Відновлює дисульфідні та водневі зв'язки у структурі волосся всього за 20 хвилин.",
    application:
      "Нанести на чисте вологе волосся, залишити на 20 хвилин, змити водою.",
    composition:
      "Aqua (Water), Bis-aminopropyl Diglysol Dimaleate, Sodium Benzonate, Macadamia Oil, Cottonseed-sweet Almond Oil, Olive Oil, Avocado Oil, Soybean Oil, Mango Butter And Cocoa Butter, Cocos Y (Coconut) Oil, Parfum (Fragrance), Phenoxyethanol, Polyquaternium-10, Citric Acid, Glycerin, Serine, Benzyl Salicylate, Tyhreonine, Peg-8, Coumarin, Ci 15510 (Orange 4), Helianthus Annuus (Sunflower) Seed Oil, Ppg-26-buteth-26 + запатентована формула Hair__expert",
    recommendation: "Підходить для відновлення сильно пошкодженого волосся.",
    sizes: {
      "15 ml": 600,
      "30 ml": 1200,
      "50 ml": 1800,
      "100 ml": 3240,
      "200 ml": 6000
    },
    badgeInfo: "Хіт продажів",
    isNew: true
  },
  {
    id: 2,
    name: "HAPPY END",
    photo: happyEnd,
    type: "Живлення",
    shortDescription: "Коктейль для блиску й захисту волосся.",
    description:
      "Коктейль для живлення, зволоження та блиску волосся. Зміцнює, захищає від UV-променів, надає м'якості та шовковистості.",
    application:
      "Нанести на вимите вологе волосся, рівномірно прочесати і залишити на 20 хвилин, ретельно змити водою.",
    composition:
      "Water (Aqua), Bis-Aminopropyl Diglycol Dimaleate, Propylene Glycol, Cetearyl Alcohol, Behentrimonium Methosulfate, Stearamidopropyl Dimethylamine, Hydrolyzed Soy Protein, Hydrolyzed Wheat Protein, Arginine HCL, Panthenol, Tocopheryl Acetate, Ascorbic Acid, Aloe Barbadensis Leaf Juice, Simmondsia Chinensis (Jojoba) Seed Oil, Cocos Nucifera (Coconut) Oil, Macadamia Ternifolia Seed Oil, Persea Gratissima (Avocado) Oil, Phytantriol, Guar Hydroxypropyltrimonium Chloride, Phenoxyethanol.",
    recommendation: "Для зволоження, зміцнення та блиску волосся.",
    sizes: {
      "15 ml": 720,
      "30 ml": 1440,
      "50 ml": 2160,
      "100 ml": 3960
    },
    badgeInfo: "Новинка",
    isNew: true
  },
  {
    id: 3,
    name: "REC ON BOOSTER",
    photo: recoOn,
    type: "Реконструктор",
    shortDescription: "Спрей-реконструктор для відновлення волосся.",
    description:
      "Спрей-реконструктор на основі унікальної формули RECO, що глибоко живить і відновлює структуру волосся. Ідеально підходить для пористого, жорсткого, ламкого та пошкодженого волосся.",
    application:
      "Нанести спрей на всю довжину волосся, відступивши від кореня 2-3 см. Рівномірно розподілити, зосереджуючись на пошкоджених ділянках.",
    composition:
      "Aqua (Water), Hydrolysed Keratin, Bis-aminopropyl Diglycol, Hydrolyzed Silk Protein, Aspartic Acid, Phenoxyethanol, Citric Acid, Serine, Threonine, Benzyl Salicylate, Sodium Pca, Sodium Lactate, Sodium Benzoate, Valine, Alanine, Proline, Isoleucine, Ethylhexylglycerin, Beta-carotene.",
    recommendation:
      "Цей продукт ідеально підходить для волосся, яке стало пористим, жорстким, ламким та пошкодженим, втративши свою природну енергію.",
    sizes: {
      "100 ml": 1560,
      "250 ml": 3120
    },
    badgeInfo: "Рекомендовано",
    isNew: false
  },
  {
    id: 4,
    name: "RecOil",
    photo: recoOil,
    type: "Олія",
    shortDescription: "Коктейль-олія для блиску та гладкості.",
    description:
      "Коктейль олій з екстрактами макадамії, інки, аргану, лісового горіха та інших натуральних компонентів. Має зволожуючі та поживні властивості.",
    application:
      "Нанести 1-2 краплі на вологе або сухе волосся для додаткового блиску та зволоження.",
    composition:
      "Macadamia Integrifolia Seed Oil, Plukenetia Volubilis Seed Oil, Argania Spinosa Kernel Oil, Corylus Avellana (Hazel) Seed Oil, Gossypium Herbaceum (Cotton) Seed Oil, Carapa Guianensis Seed Oil, Pentaclethra Macroloba Seed Oil, Mauritia Flexuosa Fruit Oil, Moringa Oleifera Seed Oil, Caryodendron Orinocense Seed Oil.",
    recommendation: "Для зволоження та захисту волосся від завивання.",
    sizes: {
      "15 ml": 720,
      "30 ml": 1440
    },
    badgeInfo: "Найкращий вибір",
    isNew: false
  },
  {
    id: 5,
    name: "TERMO CONTROL",
    photo: termoControl,
    type: "Термозахист",
    shortDescription: "Термозахисний спрей RECO для блиску і захисту.",
    description:
      "Універсальний термозахисний спрей з формулою RECO. Захищає волосся від високих температур, ультрафіолету, розгладжує кутикулу, зменшує пухнастість.",
    application: "Струсити флакон, рівномірно нанести на волосся, не змивати.",
    composition:
      "Aqua/Water/Eau, Coconut Oil, Pantenol, Amodimethicone, Polyquaternium-37, Propylene Glycol, Xylitylglucoside, Sodium Hydroxide, Anhydroxylitol, Xylitol, Dimethi-cone Peg-7 Phosphate, Ppg-1 Trideceth-6, Behentrimonium Chloride, Limonene, Xylose, Ethylhexylglycerin, Sorbitan Oleate, Isopropyl Alcohol, Cetrimonium Chloride, Glycerin, Hydrolyzed Vegetable Protein Pg-propyl Silanetriol, Benzyl Salicylate, Coumarin, Zingiber Officinale Root Extract/ Ginger Root Extract, Citral, Benzyl Alcohol, Citronellol, Leontopodium Alpinum Callus Culture Extract, Tocopherol, Citric Acid, Xanthan Gum, Dipeptide Diaminobutyroyl Benzylamide Diacetate, Parfum/fragrance.",
    recommendation:
      "Для захисту волосся перед укладанням феном, праскою або плойкою.",
    sizes: {
      "100 ml": 1440,
      "250 ml": 2880
    },
    badgeInfo: "Хіт продажів",
    isNew: true
  },
  {
    id: 6,
    name: "VOL UP",
    photo: volUp,
    type: "Об'єм",
    shortDescription: "Спрей-об'єм з УФ-захистом і доглядом.",
    description:
      "Спрей для прикореневого об'єму, що підходить для всіх типів волосся. Надає приголомшливого об'єму, блиску та має УФ-фільтр.",
    application:
      "Нанести 3-5 натискань спрею з відстані 10-15 см на корені волосся. Розподілити рівномірно, після чого висушити волосся.",
    composition:
      "Alcohol Denat. Polyquaternium-4, (Sd Alcohol 40-b) (Sda-ca-2877), Polysorbate 20, Aqua/Water, Pvp, Octylacrylamide/Acrylates/Butylaminoethyl Methacrylate Copolymer, Panthenol, Hedychium Coronarium Flower/Leaf/Stem Extract, Aminomethyl Propanol, Peg/ Ppg-18/18 Dimethicone, Triethyl Citrate, Betaine, Glycerin, Isopropyl Alcohol, Bisamino Peg/Ppg-41/3 Aminoethyl Pg-propyl, Peg-12, Sodium Chloride, Parfum (Fragrance), Benzyl Benzoate, Benzyl Alcohol, Hydroxycitronellal, Citronellol, Linalool, Hexyl Cinnamal, Cinnamyl Alcohol, Amyl Cinnamal, Butylphenyl Methylpropional.",
    recommendation:
      "Підходить для всіх типів волосся для створення об'єму та блиску.",
    sizes: {
      "100 ml": 1080,
      "250 ml": 2160
    },
    badgeInfo: "Рекомендовано",
    isNew: false
  },
  {
    id: 7,
    name: "EveryDay",
    photo: everyDay,
    type: "Маска",
    shortDescription: "Спрей EveryDay для блиску й гладкості.",
    description:
      "Засіб для щоденного догляду за волоссям. Розгладжує, усуває пухнастість і надає природного блиску. Формула з амінокислотами, колагеном та оліями.",
    application:
      "Нанести на чисте вологе волосся, залишити на 3-7 хвилин, змити водою.",
    composition:
      "Aqua (Water), Cetearyl Alcohol, Glycerin, Behentrimonium Chloride, Cetrimonium Chloride, Cocos Nucifera (Coconut) Oil, Prunus Armeniaca (Apricot) Kernel Oil, Panthenol, Propylene Glycol, PEG-40 Hydrogenated Castor Oil, Linoleic Acid, Tocopheryl Acetate, Retinyl Palmitate, Glycine Soya (Soybean) Oil, Tocopherol, Hydrolyzed Collagen, Helianthus Annuus (Sunflower) Seed Oil, Carbocysteine, Phenoxyethanol, Potassium Sorbate, Sodium Benzoate, Methylchloroisothiazolinone, Methylisothiazolinone, Lactic Acid.",
    recommendation:
      "Для щоденного догляду за волоссям, забезпечує гладкість і блиск.",
    sizes: {
      "50 ml": 600,
      "100 ml": 1140,
      "200 ml": 2160
    },
    badgeInfo: "Топ продажів",
    isNew: true
  },
  {
    id: 8,
    name: "SHAMPOO HYDRATING",
    photo: shampooHydrating,
    type: "Шампунь",
    shortDescription: "Шампунь для глибокого зволоження та відновлення.",
    description:
      "Шампунь для глибокого зволоження та делікатного догляду за сухим і пошкодженим волоссям. Формула з пантенолом, протеїнами шовку та керамідами.",
    application:
      "Нанести невелику кількість шампуню на вологе волосся, спінити масажними рухами, змити теплою водою. За потреби повторити.",
    composition:
      "Aqua, Sodium Cocoyl Isethionate, Cocamidopropyl Betaine, Sodium Lauroyl Methyl Isethionate, Panthenol, Betaine, Hydrolyzed Silk Protein, Ceramide NP, Aloe Barbadensis Leaf Extract, Simmondsia Chinensis Seed Oil, Argania Spinosa Kernel Oil, Hydrolyzed Keratin, Polyquaternium-10, Sodium Benzoate, Potassium Sorbate, Lactic Acid.",
    recommendation:
      "Для сухого та пошкодженого волосся, підходить для щоденного використання.",
    sizes: {
      "100 ml": 450,
      "250 ml": 900
    },
    badgeInfo: "Новинка",
    isNew: true
  },
  {
    id: 9,
    name: "BOTOX hair__expert",
    photo: botoxHairExpert,
    type: "Ботокс",
    shortDescription: "Засіб для ущільнення та сяяння волосся.",
    description:
      "Ефективний засіб для розгладження та ущільнення волосся. Відновлює пошкодження, ущільнює, усуває пухнастість, надає блиску та полегшує укладання.",
    application:
      "Нанести на чисте, майже сухе волосся, залишити на 20-40 хвилин, змити. Висушити феном і випрямити праскою (200-230°C).",
    composition:
      "Aqua, Ethanol, Cyclopentasiloxane, Propylene Glycol, Glycerin, Panthenol, Butyrospermum Parkii (Shea) Butter, Hydrolyzed Keratin, Behentrimonium Chloride, Mineral Oil, Plant Extract, Betaine.",
    recommendation:
      "Для сухого, ламкого, тонкого, пористого та неслухняного волосся. Також ідеально працює на здоровому волоссі.",
    sizes: {
      "100 ml": 2400,
      "200 ml": 4500
    },
    badgeInfo: "Хіт продажів",
    isNew: true
  },
  {
    id: 10,
    name: "CONDITIONER VOL",
    photo: conditionerVol,
    type: "Кондиціонер",
    shortDescription: "Кондиціонер для об'єму",
    description:
      "Легкий кондиціонер для тонкого та ослабленого волосся, що надає прикореневий об'єм без обтяження. Зволожує, зміцнює, відновлює структуру волосся.",
    application:
      "Нанести невелику кількість на чисте вологе волосся, розподілити по всій довжині, уникаючи коренів. Залишити на 2-3 хвилини, змити теплою водою.",
    composition:
      "Aqua (Water), Cetearyl Alcohol, Dicetyldimonium Chloride, Cetrimonium Chloride, Polyquaternium-37, Hydrolyzed Wheat Protein, Cocodimonium Hydroxypropyl Hydrolyzed Wheat Protein, Aloe Barbadensis (Aloe Vera) Extract, Simmondsia Chinensis (Jojoba) Seed Extract, Rosmarinus Officinalis (Rosemary) Extract, Anthemis Nobilis (Roman Chamomile) Flower Extract, Lawsonia Inermis (Henna) Extract, Hydrolyzed Wheat Starch, Panthenol, Phenoxyethanol, Chlorhexidine Digluconate.",
    recommendation:
      "Для тонкого та ослабленого волосся, підходить для щоденного використання.",
    sizes: {
      "200 ml": 840,
      "400 ml": 1560
    },
    badgeInfo: "Рекомендовано",
    isNew: false
  },
  {
    id: 11,
    name: "SHAMPOO VOL",
    photo: shampooVol,
    type: "Шампунь",
    shortDescription: "Шампунь для об'єму",
    description:
      "Шампунь для об'єму та зміцнення волосся. Делікатно очищує, надає прикореневий об'єм, зміцнює структуру та покращує еластичність.",
    application:
      "Нанести невелику кількість шампуню на вологе волосся, спінити масажними рухами, змити теплою водою. За потреби повторити.",
    composition:
      "Aqua, Sodium Laureth Sulfate, Decyl Glucoside, Cocamidopropyl Betaine, Glycerin, Hydrolyzed Wheat Protein, Panthenol, Chenopodium Quinoa Seed Extract, Simmondsia Chinensis (Jojoba) Seed Oil, Argania Spinosa Kernel Oil, Polyquaternium-10, Citric Acid, Sodium Chloride, Sodium Benzoate, Potassium Sorbate, Lactic Acid.",
    recommendation:
      "Для тонкого та ослабленого волосся, підходить для щоденного використання.",
    sizes: {
      "200 ml": 720,
      "400 ml": 1320
    },
    badgeInfo: "Новинка",
    isNew: true
  },
  {
    id: 12,
    name: "SHAMPOO DETOX",
    photo: shampooDetox,
    type: "Шампунь",
    shortDescription: "Шампунь детоксикації",
    description:
      "Шампунь глибокого очищення, який ефективно видаляє залишки стайлінгу, надлишки себуму, пил та токсини. Очищує без пересушування.",
    application:
      "Нанести невелику кількість шампуню на вологе волосся, спінити масажними рухами, особливо приділяючи увагу кореням. Змити теплою водою. За потреби повторити.",
    composition:
      "Aqua, Disodium Laureth Sulfosuccinate, Cocamidopropyl Betaine, Decyl Glucoside, Glyceryl Oleate, Aloe Barbadensis Leaf Juice, Panthenol, Chamomilla Recutita (Matricaria) Flower Extract, Simmondsia Chinensis (Jojoba) Seed Oil, Rosmarinus Officinalis (Rosemary) Leaf Extract, Hydrolyzed Rice Proten Citric Acid, Sodium Phytate, Sodium Benzoate, Potassium Sorbate Parfum (Natural Essential Oils), Linalool, Limonene",
    recommendation:
      "Для жирної шкіри голови та підготовки до доглядових процедур.",
    sizes: {
      "200 ml": 780,
      "400 ml": 1440
    },
    badgeInfo: "Рекомендовано",
    isNew: false
  }
];
