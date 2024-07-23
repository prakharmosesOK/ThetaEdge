import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use(cors());

const serviceAccountId = 'srvacc_askzueg9mpwfayy6awh6dipwx';
const serviceAccountSecret = 'uq00479631y2j3w2e5v1tjrw80y667i0';
const TVA_SA_ID = 'srvacc_askzueg9mpwfayy6awh6dipwx';
const TVA_SA_SECRET = 'uq00479631y2j3w2e5v1tjrw80y667i0';

const assignedIngestors = {};


const getIngestors = async () => {
  const response = await fetch('https://api.thetavideoapi.com/ingestor/filter', {
    method: 'GET',
    headers: {
      'x-tva-sa-id': serviceAccountId,
      'x-tva-sa-secret': serviceAccountSecret
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch ingestors');
  }

  const data = await response.json();
  return data.body.ingestors;
};


const getLivestreams = async () => {
  const response = await fetch(`https://api.thetavideoapi.com/service_account/${serviceAccountId}/streams`, {
    method: 'GET',
    headers: {
      'x-tva-sa-id': serviceAccountId,
      'x-tva-sa-secret': serviceAccountSecret
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch livestreams');
  }

  const data = await response.json();
  return data.body.streams;
};


const assignIngestor = async (ingestorId, streamId) => {
  const response = await fetch(`https://api.thetavideoapi.com/ingestor/${ingestorId}/select`, {
    method: 'PUT',
    headers: {
      'x-tva-sa-id': serviceAccountId,
      'x-tva-sa-secret': serviceAccountSecret,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "tva_stream": streamId })
  });

  if (!response.ok) {
    throw new Error('Failed to assign ingestor');
  }

  const data = await response.json();
  return data;
};


const deselectIngestor = async (ingestorId) => {
  const response = await fetch(`https://api.thetavideoapi.com/ingestor/${ingestorId}/unselect`, {
    method: 'PUT',
    headers: {
      'x-tva-sa-id': serviceAccountId,
      'x-tva-sa-secret': serviceAccountSecret,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });

  if (!response.ok) {
    throw new Error('Failed to unselect ingestor');
  }

  const data = await response.json();
  return data;
};


app.post('/get-stream-details', async (req, res) => {
  const playerCount = req.body.count;


  try {
    const streams = await getLivestreams();
    const ingestors = await getIngestors();
    console.log('Streams:', streams);
    console.log('Ingestors:', ingestors);
    const assignments = [];
    for (let i = 0; i < Math.min(ingestors.length, playerCount); i++) {
      const stream = streams[i];
      const ingestor = ingestors[i];
      console.log('Assigning ingestor:', ingestor.id, 'to stream:', stream.id);
      const assignment = await assignIngestor(ingestor.id, stream.id);
      console.log('Assigned ingestor:', assignment);
      assignments.push({
        stream_id: stream.id,
        stream_server: assignment.body.stream_server,
        stream_key: assignment.body.stream_key
      });

     
      assignedIngestors[ingestor.id] = true;
    }

    res.json({ status: 'success', assignments });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

app.get('/remove-streams', async (req, res) => {
  const response = await fetch(`https://api.thetavideoapi.com/service_account/${serviceAccountId}/streams`, {
    method: 'GET',
    headers: {
      'x-tva-sa-id': serviceAccountId,
      'x-tva-sa-secret': serviceAccountSecret
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch livestreams');
  }

  const data = await response.json();
  const returnData = [];
  for(let i=0;i<data.body.streams.length;i++){

    if(data.body.streams[i].status == "off"){
      returnData.push(data.body.streams[i]);
    }
  } 
  return returnData;
});

app.post('/game-over', async (req, res) => {

  try {
    const ingestorIds = Object.keys(assignedIngestors);
    const unselectPromises = ingestorIds.map(ingestorId => deselectIngestor(ingestorId));
    await Promise.all(unselectPromises);

   
    ingestorIds.forEach(ingestorId => delete assignedIngestors[ingestorId]);

    res.json({ status: 'success', message: 'All assigned ingestors deselected' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});


app.post('/post-video', async (req, res) => {
  const video = req.body.video;
  console.log('video:', video);
  res.json({ status: 'success', message: 'Video received' });
});

app.use(bodyParser.json());

app.post('/upload-video', async (req, res) => {
    try {
        const { videoUrl } = req.body;

        const presignedUrlResponse = await fetch('https://api.thetavideoapi.com/upload', {
            method: 'POST',
            headers: {
                'x-tva-sa-id': TVA_SA_ID,
                'x-tva-sa-secret': TVA_SA_SECRET,
            }
        });

        const presignedUrlData = await presignedUrlResponse.json();
        const presignedUrl = presignedUrlData.body.uploads[0].presigned_url;

       
        const videoUploadResponse = await fetch(presignedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/octet-stream',
            },
            body: Buffer.from(videoUrl), 
        });

        if (!videoUploadResponse.ok) {
            throw new Error('Failed to upload the video');
        }

        
        const uploadId = presignedUrlData.body.uploads[0].id;
        const transcodeResponse = await fetch('https://api.thetavideoapi.com/video', {
            method: 'POST',
            headers: {
                'x-tva-sa-id': TVA_SA_ID,
                'x-tva-sa-secret': TVA_SA_SECRET,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                source_upload_id: uploadId,
                playback_policy: 'public',
                nft_collection: '0x5d0004fe2e0ec6d002678c7fa01026cabde9e793',
                metadata: { key: 'value' }
            }),
        });

        const transcodeData = await transcodeResponse.json();
        res.json(transcodeData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/videos', async (req, res) => {
    try {
        const videosResponse = await fetch(`https://api.thetavideoapi.com/video/${TVA_SA_ID}/list?page=1&number=100`, {
            method: 'GET',
            headers: {
                'x-tva-sa-id': TVA_SA_ID,
                'x-tva-sa-secret': TVA_SA_SECRET,
            },
        });

        const videosData = await videosResponse.json();
        res.json(videosData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
