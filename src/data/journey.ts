import type { JourneyStep } from '../types'

export const journeySteps: JourneyStep[] = [
  {
    id: 1,
    eyebrow: 'O começo de tudo',
    title: 'O Primeiro Oi',
    question: 'Quem puxou a primeira conversa?',
    options: ['Ele', 'Ela', 'Os dois ao mesmo tempo', 'O destino'],
    answers: ['Ele'],
    successMessage:
      'Foi com uma simples conversa que começou uma das partes mais bonitas da minha vida.',
  },
  {
    id: 2,
    eyebrow: 'Quando nossos caminhos se cruzaram',
    title: 'O Primeiro Encontro',
    question: 'Quando foi nosso primeiro encontro?',
    options: [
      '31/12/2025 às 23:30',
      '01/01/2026 às 01:30',
      '01/01/2026 às 02:00',
      '01/01/2026 às 03:00',
    ],
    answers: ['01/01/2026 às 02:00'],
    successMessage:
      'Naquele momento, eu ainda não sabia tudo que viria… mas hoje eu sei que foi o começo de algo muito especial.',
  },
  {
    id: 3,
    eyebrow: 'Três palavras, um mundo inteiro',
    title: 'O Primeiro Eu Te Amo',
    question: 'Quem disse “eu te amo” primeiro?',
    options: ['Ele', 'Ela', 'Foi ao mesmo tempo', 'Ninguém lembra'],
    answers: ['Ela'],
    successMessage:
      'E desde então, essas palavras ficaram guardadas em uma parte muito especial do meu coração.',
  },
  {
    id: 4,
    eyebrow: 'Nosso sabor favorito',
    title: 'Nossa Sobremesa',
    question: 'Qual é nossa sobremesa preferida juntos?',
    options: [
      'Bombom de morango na travessa',
      'Paleta mexicana',
      'Barra de chocolate',
      'Brigadeiro',
    ],
    answers: ['Bombom de morango na travessa'],
    successMessage: 'Até as coisas simples ficam melhores quando são com você.',
  },
  {
    id: 5,
    eyebrow: 'Tudo que ainda vamos viver',
    title: 'Nosso Sonho',
    question: 'Qual é o sonho que eu quero viver com você?',
    options: [
      'Ter filhos seus',
      'Viajar o mundo',
      'Abrir uma empresa',
      'Ir para um cruzeiro',
    ],
    answers: ['Ter filhos seus', 'Viajar o mundo'],
    successMessage:
      'Meu sonho é viver muitos capítulos ao seu lado, construir uma vida bonita e colecionar momentos com você.',
  },
]
