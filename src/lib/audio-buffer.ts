import Fraction from "fraction.js";
import { sum } from "rambda";

export const getWhiteNoiseBuffer = (duration, audioContext) => {
    var arrayBuffer = audioContext.createBuffer(2, audioContext.sampleRate * duration, audioContext.sampleRate);

    // Fill the buffer with white noise;
    // just random values between -1.0 and 1.0
    for (var channel = 0; channel < arrayBuffer.numberOfChannels; channel++) {
        // This gives us the actual array that contains the data
        var nowBuffering = arrayBuffer.getChannelData(channel);
        for (var i = 0; i < arrayBuffer.length; i++) {
            // Math.random() is in [0; 1.0]
            // audio needs to be in [-1.0; 1.0]

            // White Noise
            nowBuffering[i] = Math.random() * 2 - 1;

            // Tone A 440
            // nowBuffering[i] = Math.sin(440 * i);
        }
    }

    return arrayBuffer
}

/**
 * Return the smallest number of samples that is evenly divisible by cycles 
 * @param sampleRate 
 * @param frequency 
 */
export const getFrequencyBufferSize = (sampleRate, frequency) => {
    // Ratio samples per cycle 
    const samplesPerCycle = new Fraction(sampleRate/frequency)

    return samplesPerCycle.n
}

export const getSineWaveBuffer = (frequency, duration, audioContext: AudioContext) => {
    var arrayBuffer = audioContext.createBuffer(2, audioContext.sampleRate * duration, audioContext.sampleRate);

    // Fill the buffer with white noise;
    // just random values between -1.0 and 1.0
    for (var channel = 0; channel < arrayBuffer.numberOfChannels; channel++) {
        // This gives us the actual array that contains the data
        var nowBuffering = arrayBuffer.getChannelData(channel);
        for (var i = 0; i < arrayBuffer.length; i++) {

            // Tone A 440
            nowBuffering[i] = Math.sin(2 * Math.PI * frequency * ((i % audioContext.sampleRate) / audioContext.sampleRate));
        }
    }

    return arrayBuffer
}

export const getSineWaveAmplitude = (frequency, maxAmplitude, time) => {
    return maxAmplitude * Math.sin(2 * Math.PI * frequency * time)
}
export const getSineWaveBufferArray = (frequency, amplitude, duration, sampleRate) => {
    const bufferArray = Float32Array.from({ length: sampleRate * duration }, (_, i) => i + 1)
    return bufferArray.map((_, i) => amplitude * Math.sin(2 * Math.PI * frequency * ((i % sampleRate) / sampleRate)))
}
export const getHarmonicSineWaveBufferArray = (frequency, harmonicGains: any[], sampleRate) => {
    const numberOfSamples = getFrequencyBufferSize(sampleRate, frequency)
    const bufferArray = Float32Array.from({ length: numberOfSamples }, (_, i) => i + 1)

    return bufferArray.map((_, timeIndex) => {
        const time = ((timeIndex % sampleRate) / sampleRate)
        let amplitude = 0

        for(let harmonicIndex = 0; harmonicIndex < harmonicGains.length; harmonicIndex++){
            amplitude += getSineWaveAmplitude(frequency * (harmonicIndex + 1),harmonicGains[harmonicIndex], time)
        }

        return amplitude
    })
}

export const mergeAudioArrayBuffer = (arrayBuffers: Array<Float32Array>) => {
    const waveCount = arrayBuffers.length
    let resultBuffer = Float32Array.from({length: arrayBuffers[0].length })
    for (var i = 0; i < arrayBuffers[0].length; i++) {
        const sampleIndex = i
        resultBuffer[i] = (sum(arrayBuffers.map((wave)=>wave[sampleIndex]))) / waveCount
    }

    return resultBuffer
}

export const bufferToCoordinates= (arrayBuffer: Float32Array, range, numberOfPoints) => {
    const sampleSection = arrayBuffer.slice(0, range)
    const mod = sampleSection.length / numberOfPoints
    let result = []
    for (var i = 0; i < sampleSection.length; i++) {
        if(i % mod === 0){
            result.push({x:i, y:arrayBuffer[i]})
        }
    }

    return result
}