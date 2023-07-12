import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { WriteStream, createWriteStream } from "fs";

export async function POST(request: Request) {
    // const audioData = req.body
    // console.log(req)
    // console.log(audioData)

    // console.log(request.body)

    const stream = request.body
    // await stream?.getReader().read().then((value) => {
    //     console.log(value)
    //     return value
    // })

    console.log((await stream?.getReader().read()).value[0])

    const writeStream = createWriteStream("./audio.mp3")

    stream?.pipeTo(writeStream)

    writeStream.on("finish", () => {
        console.log("Finished writing to file.")
    })
    // stream.on('readable', () => {
    // let chunk;
    // while (null !== (chunk = stream.read())) {
    //     console.log(`Received ${chunk.length} bytes of data.`);
    // }
    // });


    // res.status(200).json({ message: "Audio received" })
    return NextResponse.json({ message: "Audio received" })
}
