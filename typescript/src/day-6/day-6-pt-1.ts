import { INPUT, TEST1, TEST2, TEST3, TEST4 } from './input';

const input = INPUT;

const checkMarker = (buffer: string[]) => new Set<string>(buffer).size === 4;

const buffer: string[] = [...input.slice(0, 4)];

const detectMarkerPosition = () => {
  if (checkMarker(buffer)) {
    return 4;
  }

  for (let i = 4; i < input.length; i++) {
    buffer.shift();
    buffer.push(input.charAt(i));

    if (checkMarker(buffer)) {
      return i + 1;
    }
  }
};

console.log(detectMarkerPosition());
