// min = Minimum expected value
// max = Maximum expected value
// Function to normalize the values (MIN / MAX could be integrated)
interface NormalizeLoaderValueArgs {
  value: number;
  min: number;
  max: number;
}
export const normalizeLoaderValueArgs = ({value, min, max}: NormalizeLoaderValueArgs) => ((value - min) * 100) / (max - min);