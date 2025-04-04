let speech = new SpeechSynthesisUtterance();
export function useSpeach() {
    let useVoice = function (text: string) {
        let voices = speechSynthesis.getVoices();
        speech.voice = voices[20];
        speech.text = text;
        speech.lang = "en-US";
        // @ts-ignore
        speech.default = false;
        window.speechSynthesis.speak(speech);
    };

    return {
        useVoice,
    };
}