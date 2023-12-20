import * as ort from "onnxruntime-web";

export default class OrtService {

    private URL = "http://localhost:3000/mobilenet_v2.ort"

    async execute() {
        const arrayBuffer = await fetch(this.URL).then((res) => res.arrayBuffer());
        const session = await ort.InferenceSession.create(new Uint8Array(arrayBuffer));
        const inputNames = session.inputNames
        const outputNames = session.outputNames
        const tensor = this.float32Array([1, 3, 224, 224], 0)
        const feeds = {[inputNames[0]]: tensor};
        const result = await session.run(feeds)
        outputNames.forEach((name) => {
            console.log(`${name}: ${result[name].data}`)
        })
    }

    private float32Array = (shape: number[], def: number): ort.Tensor => {
        const len = shape.reduce((p, c) => p * c)
        const aar = [...Array(len)].map(() => def)
        const inputData = Float32Array.from(aar);
        return new ort.Tensor('float32', inputData, shape)
    }
}
