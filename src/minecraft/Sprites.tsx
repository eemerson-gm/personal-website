import { NeuralNetwork } from 'brain.js';
import { useCallback, useMemo } from 'react';

export default function TestPage() {
  const net = useMemo(() => {
    return new NeuralNetwork({
      binaryThresh: 0.5,
      hiddenLayers: [1024], // array of ints for the sizes of the hidden layers in the network
      activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
      leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
    });
  }, []);

  const readImageToArray = (
    link: string,
    callback: (array: number[]) => void
  ) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = 16;
      canvas.height = 16;
      context?.drawImage(image, 0, 0);
      const bytes = context?.getImageData(0, 0, 16, 16).data;
      if (bytes) {
        callback(Array.from(bytes));
      }
    };
    image.src = link;
  };

  const onClick = useCallback(() => {
    const normalizedArrays = [] as number[][];
    [1, 2, 3, 4].forEach((num) => {
      readImageToArray(`/images/Untitled${num}.png`, (bytes) => {
        const normalizedBytes = bytes.map((num) => num / 255);
        normalizedArrays.push(normalizedBytes);
        if (num === 4) {
          net.train(
            [
              { input: [0], output: normalizedArrays[0] },
              { input: [1], output: normalizedArrays[1] },
              { input: [2], output: normalizedArrays[2] },
              { input: [3], output: normalizedArrays[3] },
            ],
            {
              log: true,
            }
          );
          const aiBytes = net.run([Math.random() * 3]) as Float32Array;
          if (aiBytes) {
            const colorBytes = Uint8ClampedArray.from(
              aiBytes.map((num: number) => num * 255)
            );
            console.log(colorBytes);
            const canvasData = new ImageData(colorBytes, 16, 16);
            const canvas = document.getElementById('test') as HTMLCanvasElement;
            const context = canvas.getContext('2d');
            canvas.width = 16;
            canvas.height = 16;
            context?.putImageData(canvasData, 0, 0);
          }
        }
      });
    });
  }, [net]);

  return (
    <>
      <canvas
        id='test'
        style={{ width: '128px', height: '128px', imageRendering: 'pixelated' }}
      />
      <button onClick={onClick}>Submit</button>
    </>
  );
}
