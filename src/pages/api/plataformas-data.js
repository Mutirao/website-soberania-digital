/**
 * API endpoint to fetch conference data from Plataformas API
 * This allows client-side apps to fetch data without CORS issues
 */

import { fetchAndTransformConferenceData } from '~/lib/plataformas-api';

export async function GET() {
  try {
    // Extract slug from URL parameters or use default
    // The actual slug would be determined by the route - this is a simplified version
    const conferenceData = await fetchAndTransformConferenceData('SoberaniaDigital');
    
    return new Response(JSON.stringify(conferenceData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=3600' // Cache for 1 hour
      }
    });
  } catch (error) {
    console.error('Error in Plataformas API endpoint:', error);
    
    return new Response(JSON.stringify({
      error: 'Failed to fetch conference data',
      message: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}