#!/usr/bin/env node

/**
 * Test script to verify Plataformas API integration
 */

import 'dotenv/config';
import { fetchConferenceData, transformPlataformasData } from '../src/lib/plataformas-api.js';

async function testPlataformasAPI() {
  console.log('Testing Plataformas API integration...');

  try {
    // Use the conference slug from environment or default
    const conferenceSlug = process.env.PLANTAFORMAS_CONFERENCE_SLUG || 'SoberaniaDigital';

    console.log(`Fetching conference data for slug: ${conferenceSlug}`);

    const rawData = await fetchConferenceData(conferenceSlug);
    console.log('Raw data fetched successfully');
    console.log(`Conference: ${rawData?.title?.translation || 'N/A'}`);
    console.log(`Components found: ${rawData?.components?.length || 0}`);

    const transformedData = transformPlataformasData(rawData);
    console.log('\nTransformed data:');
    console.log(`Sessions: ${transformedData.sessoes.length}`);
    console.log(`Stands: ${transformedData.stands.length}`);

    if (transformedData.sessoes.length > 0) {
      console.log('\nFirst few sessions:');
      transformedData.sessoes.slice(0, 3).forEach((session, index) => {
        console.log(`  ${index + 1}. ${session.titulo} - ${session.dia} at ${session.inicio}`);
      });
    }

    console.log('\n✅ Plataformas API test completed successfully');
  } catch (error) {
    console.error('❌ Error testing Plataformas API:', error.message);
    process.exit(1);
  }
}

// Run the test if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}` || import.meta.url.startsWith('file://')) {
  testPlataformasAPI();
}
