// app/api/downloadFile/[file_id]/route.ts

import { NextRequest, NextResponse } from 'next/server'; // Import NextRequest from 'next/server'
import fetch from 'node-fetch';

export async function GET(req: NextRequest, res: NextResponse) { // Use NextRequest and NextResponse
  // Extract the file_id from the URL path
  const file_id = req.nextUrl.searchParams.get('file_id'); // Use `nextUrl.searchParams` to get query params

  // Validate the file_id
  if (!file_id) {
    // Return a response with a 400 status code
    return new NextResponse(JSON.stringify({ error: 'A valid file ID is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
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

    // Set headers to prompt the browser to download the file
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Type', contentType);

    // Send the file content
    // Assuming you have the file content and file info
    return new NextResponse(fileContent, {
      status: 200, // or other appropriate status code
      headers: {
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Type': contentType,
      },
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
