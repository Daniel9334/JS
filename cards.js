// Deal function consisting of 5 cards
function dealHand() {
  const ranks = [
    // "2",
    // "3",
    // "4",
    // "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    // "J",
    // "Q",
    // "K",
    // "A",
  ];
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const deck = [];

  // Fill the deck cards
  for (const rank of ranks) {
    for (const suit of suits) {
      deck.push({ rank, suit });
    }
  }

  // Shuffle the deck
  shuffleArray(deck);

  // Deal a 5-card hand
  const hand = deck.slice(0, 5);
  return hand;
}

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Function to evaluate the poker hand
function evaluateHand(hand) {
  // Extract ranks and suits
  const ranks = hand.map((card) => card.rank);
  const suits = hand.map((card) => card.suit);

  // Count occurrences of each rank
  const rankCounts = ranks.reduce((acc, rank) => {
    acc[rank] = (acc[rank] || 0) + 1;
    return acc;
  }, {});

  // Check other card deals
  if (
    new Set(suits).size === 1 &&
    ranks.every((rank) => "AKQJ10".includes(rank))
  ) {
    return "Royal Flush";
  } else if (
    new Set(suits).size === 1 &&
    ranks.every((rank) => ranks.includes(rank) && rankCounts[rank] === 1) &&
    Math.max(...ranks) - Math.min(...ranks) === 4
  ) {
    return "Straight Flush";
  } else if (Object.values(rankCounts).includes(4)) {
    return "Four of a Kind";
  } else if (
    new Set(Object.values(rankCounts)).size === 2 &&
    Object.values(rankCounts).includes(2) &&
    Object.values(rankCounts).includes(3)
  ) {
    return "Full House";
  } else if (new Set(suits).size === 1) {
    return "Flush";
  } else if (
    new Set(ranks).size === ranks.length && // Check duplicate rank
    (ranks.every((rank) => "AKQJ10".includes(rank) || "98765".includes(rank)) ||
      (Math.max(...ranks) - Math.min(...ranks) === 4 && ranks.length === 5)) &&
    (!(
      "5432A".includes(ranks.join("")) &&
      ranks.some((rank) => "A2345".includes(rank))
    ) ||
      ranks.every((rank) => "98765".includes(rank)))
  ) {
    return "Straight";
  } else if (Object.values(rankCounts).includes(3)) {
    return "Three of a Kind";
  } else if (
    Object.values(rankCounts).filter((count) => count === 2).length === 2
  ) {
    return "Two Pair";
  } else if (Object.values(rankCounts).includes(2)) {
    return "One Pair";
  } else {
    return "High Card";
  }
}

// Run the program
function main() {
  const hand = dealHand();

  console.log("Your hand:");
  for (const card of hand) {
    console.log(`${card.rank} of ${card.suit}`);
  }

  // Evaluate and display the best poker set
  const pokerSet = evaluateHand(hand);
  console.log("\nBest Poker Set:", pokerSet);
}

main();
