import type { QuizData } from "@/components/Quiz/types";

export const quizData: QuizData = {
  questions: [
    {
      id: 1,
      text: "Що для вас найважливіше у догляді за волоссям?",
      options: [
        {
          id: 1,
          text: "Відновлення",
          recommendedProducts: ["RECO", "Happy End", "RecOn Booster"]
        },
        {
          id: 2,
          text: "Об'єм",
          recommendedProducts: ["Volume Up", "EveryDay"]
        },
        {
          id: 3,
          text: "Зволоження",
          recommendedProducts: [
            "Shampoo Hydrating",
            "Spray Hydrating",
            "RecOil"
          ]
        },
        {
          id: 4,
          text: "Термозахист",
          recommendedProducts: ["Heat Protect", "Thermo Shield"]
        },
        {
          id: 5,
          text: "Жирність",
          recommendedProducts: ["Oil Control", "Pure Balance"]
        },
        {
          id: 6,
          text: "Щоденний догляд",
          recommendedProducts: ["EveryDay", "Quick Care"]
        }
      ]
    },
    {
      id: 2,
      text: "Який у вас тип шкіри голови?",
      options: [
        {
          id: 1,
          text: "Жирна",
          recommendedProducts: ["Oil Control", "Deep Cleanse"]
        },
        {
          id: 2,
          text: "Нормальна",
          recommendedProducts: ["EveryDay", "Shampoo Hydrating"]
        },
        {
          id: 3,
          text: "Суха",
          recommendedProducts: ["Moisture Plus", "Hydra Therapy"]
        }
      ]
    },
    {
      id: 3,
      text: "Наскільки волосся пошкоджено?",
      options: [
        {
          id: 1,
          text: "Легке пошкодження (сухість, тьмяність)",
          recommendedProducts: ["Moisture Cure", "Shine Booster"]
        },
        {
          id: 2,
          text: "Слабке пошкодження (ламкість, потреба в оновленні)",
          recommendedProducts: ["Happy End", "EveryDay", "Repair Complex"]
        },
        {
          id: 3,
          text: "Сильно пошкоджено (пористість, ламкість)",
          recommendedProducts: [
            "RECO",
            "Happy End",
            "RecOn Booster",
            "Intense Repair"
          ]
        }
      ]
    },
    {
      id: 4,
      text: "Яка проблема турбує найбільше?",
      options: [
        {
          id: 1,
          text: "Надмірна сухість",
          recommendedProducts: [
            "Shampoo Hydrating",
            "Spray Hydrating",
            "RecOil"
          ]
        },
        {
          id: 2,
          text: "Ламкість, посічені кінчики",
          recommendedProducts: ["Ends Repair", "Split Ends Therapy"]
        },
        {
          id: 3,
          text: "Відсутність об'єму",
          recommendedProducts: ["Volume Up", "Root Boost"]
        },
        {
          id: 4,
          text: "Надмірна жирність",
          recommendedProducts: ["Oil Control", "Purifying Shampoo"]
        },
        {
          id: 5,
          text: "Пухнастість та непослушність",
          recommendedProducts: ["Smooth Control", "Anti-Frizz Serum"]
        },
        {
          id: 6,
          text: "Випадіння волосся",
          recommendedProducts: ["Hair Growth", "Root Strengthener"]
        }
      ]
    },
    {
      id: 5,
      text: "Часті термовпливи (фен, праска тощо)?",
      options: [
        {
          id: 1,
          text: "Так, використовую часто",
          recommendedProducts: ["Heat Protect", "Thermo Shield", "Thermal Care"]
        },
        {
          id: 2,
          text: "Іноді",
          recommendedProducts: ["Heat Protect", "EveryDay"]
        },
        {
          id: 3,
          text: "Майже не використовую",
          recommendedProducts: []
        }
      ]
    },
    {
      id: 6,
      text: "Відновлення після фарбування чи освітлення?",
      options: [
        {
          id: 1,
          text: "Так, потребую відновлення",
          recommendedProducts: [
            "Color Revive",
            "Post-Color Care",
            "RecOn Booster"
          ]
        },
        {
          id: 2,
          text: "Не фарбую/не освітлюю волосся",
          recommendedProducts: []
        }
      ]
    }
  ]
};
