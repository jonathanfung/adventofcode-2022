import { INPUT, TEST1, TEST2, TEST3, TEST4, TEST5, TEST6, TEST7, TEST8, TEST9 } from './input';

const input = INPUT;

const checkMarker = (buffer: string[], messageSize: number) =>
  new Set<string>(buffer).size === messageSize;

const detectMarkerPosition = (messageSize: number) => {
  const buffer: string[] = [...input.slice(0, messageSize)];

  if (checkMarker(buffer, messageSize)) {
    return messageSize;
  }

  for (let i = messageSize; i < input.length; i++) {
    buffer.shift();
    buffer.push(input.charAt(i));

    if (checkMarker(buffer, messageSize)) {
      return i + 1;
    }
  }
};

console.log(detectMarkerPosition(14));
