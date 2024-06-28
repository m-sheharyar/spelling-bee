export function stepReducer(step, action) {
  switch (action.type) {
    case "updateLevel": {
      const { score } = action.payload;
      let level;

      if (score < 5) {
        level = 0;
      } else if (score >= 5 && score < 13) {
        level = 1;
      } else if (score >= 13 && score < 21) {
        level = 2;
      } else if (score >= 21 && score < 40) {
        level = 3; // To handle cases above 35
      } else if (score >= 40 && score < 67) {
        level = 4; // To handle cases above 35
      } else if (score >= 67 && score < 107) {
        level = 5; // To handle cases above 35
      } else if (score >= 107 && score < 134) {
        level = 6; // To handle cases above 35
      } else if (score >= 134 && score < 187) {
        level = 7; // To handle cases above 35
      } else if (score >= 187) {
        level = 8; // To handle cases above 35
      }

      return {
        ...step,
        level,
      };
    }
    default:
      return step;
  }
}
