//binary search

function findHeavyBallPosition(balls) {
  // Check if the input array has only 8 elements
  if (balls.length !== 8) {
    console.error("Invalid number of balls. Please provide only 8 balls.");
    return;
  }

  // First weighing
  let leftPan = balls.slice(0, 4);
  let rightPan = balls.slice(4);

  let firstWeighing = compareWeights(leftPan, rightPan);

  if (firstWeighing === 0) {
    // If the two groups are equal, the heavy ball is among the remaining four
    let remainingGroup = balls.slice(0, 2);
    let secondGroup = balls.slice(2, 4);

    let secondWeighing = compareWeights(remainingGroup, secondGroup);

    if (secondWeighing === 0) {
      // If the remaining two balls are equal, the heavy ball is at position 8
      return 8;
    } else {
      // If not, return the heavier ball's position
      return secondWeighing === 1 ? 5 : 6;
    }
  } else {
    // If the first weighing shows a difference, the heavy ball is in the heavier group
    let heavierGroup = firstWeighing === 1 ? leftPan : rightPan;

    // Binary search within the heavier group
    let leftIndex = 0;
    let rightIndex = 3;

    while (leftIndex < rightIndex) {
      let midIndex = Math.floor((leftIndex + rightIndex) / 2);
      let leftHalf = heavierGroup.slice(leftIndex, midIndex + 1);
      let rightHalf = heavierGroup.slice(midIndex + 1);

      let thirdWeighing = compareWeights(leftHalf, rightHalf);

      if (thirdWeighing === 1) {
        // If the left half is heavier, search in the left half
        rightIndex = midIndex;
      } else {
        // If the right half is heavier or equal, search in the right half
        leftIndex = midIndex + 1;
      }
    }

    // The final index of the heavy ball within the heavier group
    return firstWeighing === 1 ? leftIndex : leftIndex + 4;
  }
}

function compareWeights(group1, group2) {
  let weight1 = group1.reduce((acc, ball) => acc + ball, 0);
  let weight2 = group2.reduce((acc, ball) => acc + ball, 0);

  if (weight1 === weight2) {
    return 0; // Both groups are equal
  } else if (weight1 > weight2) {
    return 1; // Group 1 is heavier
  } else {
    return -1; // Group 2 is heavier
  }
}

// Example usage
let balls = [1, 2, 1, 1, 1, 1, 1, 1];
let heavyBallPosition = findHeavyBallPosition(balls);
console.log("Heavy ball position is at index:", heavyBallPosition);
