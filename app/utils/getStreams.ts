import { mediaDevices, MediaStream } from 'react-native-webrtc';

export default class GetStreams {
  static async getStream(): Promise<MediaStream | null> {
    let isFront = true;
    const sourceInfos: any = await mediaDevices.enumerateDevices();

    let videoSourceId;
    for (let i = 0; i < sourceInfos.length; i++) {
      const sourceInfo = sourceInfos[i];

      if (
        sourceInfo.kind === 'videoinput' &&
        sourceInfo.facing === (isFront ? 'front' : 'environment')
      ) {
        videoSourceId = sourceInfo.deviceId;
      }
    }

    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        mandatory: {
          minHeight: 480,
          minWidth: 640,
          minFrameRate: 30,
        },
        facingMode: isFront ? 'user' : 'environment',
        optional: [videoSourceId],
      },
    });

    if (typeof stream !== 'boolean') {
      return stream as MediaStream;
    }
    return null;
  }
}
