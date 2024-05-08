export default class Recorder {
    constructor(){
        this.capturer = new CCapture({
            framerate: 30,
            format: 'webm',
            verbose: false
        });

    }

    canvas(canvas){
        this.capturer.capture(canvas);
    }
    stop(){
        this.capturer.stop();
        this.capturer.save();
    }

}


