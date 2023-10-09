export const timestampToText = (timestamp: number) => {
  const mins = Math.floor(timestamp / (60 * 1000));
  const seconds = Math.floor(timestamp % (60 * 1000) / 1000);

  return `Fetched ${mins} mins ${seconds} seconds ago`
}