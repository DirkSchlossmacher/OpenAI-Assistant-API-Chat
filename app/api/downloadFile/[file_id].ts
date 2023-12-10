// pages/api/downloadFile/[file_id].ts

import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the file_id from the URL path
  const { file_id } = req.query;

  // Validate the file_id
  if (!file_id || typeof file_id !== 'string') {
    return res.status(400).json({ error: 'A valid file ID is required' });
  }

  // Construct the URL for the OpenAI API call
  const openaiUrl = `https://api.openai.com/v1/files/${file_id}/content`;

  try {
    // Make a GET request to the OpenAI API to retrieve the file content
    const openaiResponse = await fetch(openaiUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    // Check if the OpenAI API response is OK
    if (!openaiResponse.ok) {
      return res.status(openaiResponse.status).json({ error: 'Failed to retrieve file content from OpenAI' });
    }

    // Get the file content from the OpenAI API response
    const fileContent = await openaiResponse.text();

    // You would need to determine the file name and extension here
    // For example, you could store this information in a database or retrieve it from the OpenAI response
    // For this example, let's assume you have a function that can fetch this info based on the file_id
    const { fileName, contentType } = await getFileInfo(file_id);

    // Set headers to prompt the browser to download the file
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', contentType);

    // Send the file content
    res.send(fileContent);
  } catch (error) {
    // Handle any errors that occur during the API request
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Mock function to get file info - replace this with your actual logic to retrieve file info
async function getFileInfo(fileId: string) {
  // Your logic to determine the file name and content type goes here
  // For this example, we're returning a placeholder file name and a generic binary content type
  return {
    fileName: 'download.bin',
    contentType: 'application/octet-stream'
  };
}
