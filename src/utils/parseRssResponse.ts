// src/utils/parseRssResponse.ts
import { XMLParser } from 'fast-xml-parser';

export async function parseXMLResponse(response: Response | any): Promise<any> {
  let xmlText: string | null = null;

  // 1. Si viene de fetchApi (Response cruda)
  if (response instanceof Response) {
    const rawText = await response.text();

    try {
      // Intentar parsear como JSON (AllOrigins)
      const json = JSON.parse(rawText);

      if (typeof json.contents === 'string') {
        if (json.contents.startsWith('data:application/rss+xml')) {
          // Caso base64 → decodificar
          const base64 = json.contents.split(',')[1];
          xmlText = atob(base64);
        } else {
          // Caso normal → XML directo en contents
          xmlText = json.contents;
        }
      }
    } catch {
      // No era JSON → asumir XML directo
      xmlText = rawText;
    }
  }

  // 2. Si ya te pasan el "data" procesado (caso responseArtist.data)
  else if (response?.contents) {
    if (response.contents.startsWith('data:application/rss+xml')) {
      const base64 = response.contents.split(',')[1];
      xmlText = atob(base64);
    } else {
      xmlText = response.contents;
    }
  }

  // 3. Si directamente es string (XML ya leído)
  else if (typeof response === 'string') {
    xmlText = response;
  }

  if (!xmlText) {
    throw new Error('RSS vacío o formato no reconocido');
  }

  // Parsear XML → objeto JS
  const parser = new XMLParser({
    ignoreAttributes: false,
    removeNSPrefix: true,
  });

  return parser.parse(xmlText);
}
