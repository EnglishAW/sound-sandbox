import { range } from "rambda"

export const getAttenuation = (cornerFrequency: number, sampleRate: number) => {
    const twoPiDeltaTFc = 2 * Math.PI * (1 / sampleRate) * cornerFrequency

    // return twoPiDeltaTFc / (twoPiDeltaTFc + 1)
    return twoPiDeltaTFc / (twoPiDeltaTFc + 1)
}

export const lowPassFilter = (cornerFrequency, audioBuffer: AudioBuffer) => {
    const { numberOfChannels, sampleRate } = audioBuffer

    // Low pass attenuation curve function
    const attenuation = getAttenuation(cornerFrequency, sampleRate)
    let avgDeltaAmp = 0
    let numSamples = 0
    // For all channels
    range(0, numberOfChannels).forEach((channel) => {

        // For each sample in channel buffer
        audioBuffer.getChannelData(channel).forEach((currAmplitude, i, channelBuffer) => {
            if (i === 0) { channelBuffer[i] = currAmplitude * attenuation; return }

            const prevAmplitude = channelBuffer[i - 1]
            const deltaAmplitude = currAmplitude - prevAmplitude
            avgDeltaAmp += deltaAmplitude
            numSamples++

            channelBuffer[i] = prevAmplitude + (attenuation * deltaAmplitude)
        })
    })
    console.log(avgDeltaAmp / numSamples)
    return audioBuffer
}