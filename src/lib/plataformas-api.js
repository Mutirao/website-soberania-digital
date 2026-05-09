/**
 * Service to fetch data from the Plataformas GraphQL API
 */

const PLATAFORMAS_API_URL = 'https://plantaformas.org/api';

/**
 * Fetch conference data from Plataformas API
 * @param {string} slug - The conference slug (e.g., 'SoberaniaDigital')
 * @returns {Promise<Object>} Conference data
 */
export async function fetchConferenceData(slug) {
  // GraphQL query to fetch conference with its meetings component
  const query = `
    query GetConference($slug: String!) {
      conference(slug: $slug) {
        id
        title {
          translation(locale: "pt")
        }
        shortDescription {
          translation(locale: "pt")
        }
        components {
          id
          name {
            translation(locale: "pt")
          }
          __typename
          ... on Meetings {
            meetings {
              edges {
                node {
                  id
                  title {
                    translation(locale: "pt")
                  }
                  description {
                    translation(locale: "pt")
                  }
                  startDate
                  endDate
                  address
                  registrationType
                  speakers {
                    id
                    name
                    affiliation
                    position
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(PLATAFORMAS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { slug }
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch conference data: ${response.statusText}`);
  }

  const { data, errors } = await response.json();
  
  if (errors) {
    console.error('GraphQL errors:', errors);
    throw new Error(`GraphQL errors: ${errors.map(e => e.message).join(', ')}`);
  }

  return data.conference;
}

/**
 * Transform Plataformas API data to match the expected format for the website
 * @param {Object} conferenceData - Raw data from Plataformas API
 * @returns {Object} Transformed data in the expected format
 */
export function transformPlataformasData(conferenceData) {
  if (!conferenceData) return { sessoes: [], stands: [] };

  // Find the meetings component
  const meetingsComponent = conferenceData.components.find(comp => comp.__typename === 'Meetings');
  
  if (!meetingsComponent || !meetingsComponent.meetings) {
    return { sessoes: [], stands: [] };
  }

  // Transform meetings to the expected session format
  const sessoes = meetingsComponent.meetings.edges.map(edge => {
    const meeting = edge.node;
    
    // Extract time from the startDate (format: 2026-05-18T08:00:00+00:00)
    const startDate = new Date(meeting.startDate);
    const startTime = `${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`;
    
    let endTime = '';
    if (meeting.endDate) {
      const endDate = new Date(meeting.endDate);
      endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Format date as DD/MM Dia (e.g., "18/05 Seg")
    const dayOfMonth = startDate.getDate().toString().padStart(2, '0');
    const month = (startDate.getMonth() + 1).toString().padStart(2, '0');
    const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const weekday = weekdays[startDate.getDay()];
    const dia = `${dayOfMonth}/${month} ${weekday}`;
    
    return {
      dia,
      local: meeting.address || 'Não especificado',
      inicio: startTime,
      fim: endTime,
      tipo: 'Mesa', // Default to 'Mesa', could be improved based on more details
      mesa: '', // Will likely be part of title
      titulo: meeting.title?.translation || 'Título não disponível',
      responsavel: '', // Not available from API
      notas: meeting.description?.translation || '',
      palestrantes: meeting.speakers?.map(s => ({
        nome: s.name || 'Nome não fornecido',
        organizacao: s.affiliation || '',
        papel: s.position || 'Palestrante',
        status: 'CONFIRMADO', // Default since API doesn't have status info
        obs: ''
      })) || []
    };
  });

  // Return data in the expected format
  return {
    geradoEm: new Date().toISOString(),
    sessoes,
    stands: [] // Stands are not available from the API in this format
  };
}

/**
 * Fetch and transform conference data from Plataformas API
 * @param {string} slug - Conference slug
 * @returns {Promise<Object>} Transformed conference data
 */
export async function fetchAndTransformConferenceData(slug) {
  try {
    const rawData = await fetchConferenceData(slug);
    return transformPlataformasData(rawData);
  } catch (error) {
    console.error('Error fetching and transforming conference data:', error);
    // Return empty data if API fails to prevent site crash
    return { sessoes: [], stands: [], geradoEm: new Date().toISOString() };
  }
}