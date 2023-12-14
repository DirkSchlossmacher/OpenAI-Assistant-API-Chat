// app/api/downloadFile/[file_id]/route.ts

import { NextRequest, NextResponse } from 'next/server'; // Import NextRequest from 'next/server'
import fetch from 'node-fetch';

export async function GET(req: NextRequest, res: NextResponse) { // Use NextRequest and NextResponse
  // Extract the file_id from the URL path
  const file_id = req.nextUrl.searchParams.get('file_id'); // Use `nextUrl.searchParams` to get query params

  // Validate the file_id
  if (!file_id) {
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

    // Assume you have a function that can fetch this info based on the file_id
    const { fileName, contentType } = await getFileInfo(file_id);

    // Set headers to prompt the browser to download the file
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', contentType);

    // Send the file content
    return new Response(fileContent, {
      headers: res.getHeaders(), // Use the headers from the NextResponse object
    });
  } catch (error) {
    // Handle any errors that occur during the API request
    return res.status(500).json({ error: 'Internal Server Error' });
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
