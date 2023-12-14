// app/api/downloadFile/[file_id]/route.ts

import { NextRequest, NextResponse } from 'next/server'; // Import NextRequest and NextResponse from 'next/server'
import fetch from 'node-fetch';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Extract the file_id from the URL path
  const { file_id } = req.query;

  // Validate the file_id
  if (!file_id) {
    res.status(400).json({ error: 'A valid file ID is required' });
    return;
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
      // Return a response with the status code from the OpenAI response
      return new NextResponse(JSON.stringify({ error: 'Failed to retrieve file content from OpenAI' }), {
        status: openaiResponse.status,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Get the file content from the OpenAI API response
    const fileContent = await openaiResponse.text();

    // Assume you have a function that can fetch this info based on the file_id
    const { fileName, contentType } = await getFileInfo(file_id);

    // Create a new response for the file download
    const headers = new Headers();
    headers.set('Content-Disposition', `attachment; filename="${fileName}"`);
    headers.set('Content-Type', contentType);

    return new NextResponse(fileContent, {
      status: 200, // or other appropriate status code
      headers: headers,
    });
  } catch (error) {
    // Handle any errors that occur during the API request
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// Mock function to get file info - replace this with your actual logic to retrieve file info
async function getFileInfo(fileId: string) {
  // Your logic to determine the file name and content type goes here
  return {
    fileName: 'download.bin',
    contentType: 'application/octet-stream'
  };
}
