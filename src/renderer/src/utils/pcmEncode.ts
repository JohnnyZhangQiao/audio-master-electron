import { Base64 } from 'js-base64';

export function pcmToWav(source: string, sampleRate = 16000, numChannels = 1, bitsPerSample = 16) {
  //参数->（base64编码的pcm流，采样频率，声道数，采样位数）
  const header = {
    // OFFS SIZE NOTES
    chunkId: [0x52, 0x49, 0x46, 0x46], // 0    4    "RIFF" = 0x52494646
    chunkSize: 0, // 4    4    36+SubChunk2Size = 4+(8+SubChunk1Size)+(8+SubChunk2Size)
    format: [0x57, 0x41, 0x56, 0x45], // 8    4    "WAVE" = 0x57415645
    subChunk1Id: [0x66, 0x6d, 0x74, 0x20], // 12   4    "fmt " = 0x666d7420
    subChunk1Size: 16, // 16   4    16 for PCM
    audioFormat: 1, // 20   2    PCM = 1
    numChannels: numChannels, // 22   2    Mono = 1, Stereo = 2...
    sampleRate: sampleRate, // 24   4    8000, 44100...
    byteRate: 0, // 28   4    SampleRate*NumChannels*BitsPerSample/8
    blockAlign: 0, // 32   2    NumChannels*BitsPerSample/8
    bitsPerSample: bitsPerSample, // 34   2    8 bits = 8, 16 bits = 16
    subChunk2Id: [0x64, 0x61, 0x74, 0x61], // 36   4    "data" = 0x64617461
    subChunk2Size: 0, // 40   4    data size = NumSamples*NumChannels*BitsPerSample/8
  };
  function u32ToArray(i: number) {
    return [i & 0xff, (i >> 8) & 0xff, (i >> 16) & 0xff, (i >> 24) & 0xff];
  }
  function u16ToArray(i: number) {
    return [i & 0xff, (i >> 8) & 0xff];
  }
  const pcm = Base64.toUint8Array(`${source}`);
  header.blockAlign = (header.numChannels * header.bitsPerSample) >> 3;
  header.byteRate = header.blockAlign * header.sampleRate;
  header.subChunk2Size = pcm.length * (header.bitsPerSample >> 3);
  header.chunkSize = 36 + header.subChunk2Size;

  const wavHeader = header.chunkId.concat(
    u32ToArray(header.chunkSize),
    header.format,
    header.subChunk1Id,
    u32ToArray(header.subChunk1Size),
    u16ToArray(header.audioFormat),
    u16ToArray(header.numChannels),
    u32ToArray(header.sampleRate),
    u32ToArray(header.byteRate),
    u16ToArray(header.blockAlign),
    u16ToArray(header.bitsPerSample),
    header.subChunk2Id,
    u32ToArray(header.subChunk2Size),
  );
  const wavHeaderUnit8 = new Uint8Array(wavHeader);

  const mergedArray = new Uint8Array(wavHeaderUnit8.length + pcm.length);
  mergedArray.set(wavHeaderUnit8);
  mergedArray.set(pcm, wavHeaderUnit8.length);
  const blob = new Blob([mergedArray], { type: 'audio/wav' });
  const blobUrl = window.URL.createObjectURL(blob);
  return blobUrl;
}
