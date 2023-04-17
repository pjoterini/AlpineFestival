// DATES GENERATOR - used to make date pickers work without hydration error.
// this can be potentially deleted after configuring type of rendering.

export const useDatesWithoutSeconds = () => {
  let preArrival: Date;
  let preDeparture: Date;
  preArrival = new Date();
  preArrival.setSeconds(0, 0);
  preDeparture = new Date();
  preDeparture.setSeconds(0, 0);

  return [preArrival, preDeparture];
};
