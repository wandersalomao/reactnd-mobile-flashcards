export function getNumberOfCardsText(deck) {
    const { cards } = deck
    const numberOfCards = cards ? cards.length : 0
    return `${numberOfCards} ${numberOfCards > 1 ? 'cards' : 'card'}`
}