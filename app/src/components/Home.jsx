import { create as ipfsHttpClient } from 'ipfs-http-client';
const Buffer = require('buffer').Buffer;

const projectId = '15c4356a6af7428c9972b868d8d23791';
const projectSecret = 'mnKA8ztoWBOCGdgYT756EtWGsTcVN0UF89vAqN4bKdoVBe9KSOvtCg';
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString('base64')}`;

const client = ipfsHttpClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      Authorization: auth,
    },
  });

export default function Home() {
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        console.log("The file uploaded is: ", file);

        console.log("The client is: ", client);
        const add = await client.add(file);
        console.log("The add is: ", add);
    }

    return (
        <div>
            <input
                type="file"
                placeholder="Upload"
                onChange={handleUpload}
            />
        </div>
    )
}