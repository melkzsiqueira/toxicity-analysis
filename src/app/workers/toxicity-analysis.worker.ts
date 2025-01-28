/// <reference lib="webworker" />

import { env, pipeline } from '@xenova/transformers';
import {
  MODEL_NAME,
  TOXICITY_THRESHOLD,
} from '../configurations/toxicity-analysis.config';

env.allowLocalModels = false;
env.useBrowserCache = false;

let textToxicityPipeline: any;

addEventListener('message', async ({ data }) => {
  const { type, payload } = data;

  if (type === 'initialize') {
    try {
      textToxicityPipeline = await pipeline('text-classification', MODEL_NAME);
      postMessage({ type: 'initialized', success: true });
    } catch (error: any) {
      postMessage({ type: 'error', error: error.message });
    }
  } else if (type === 'analyzeToxicity') {
    if (!textToxicityPipeline) {
      postMessage({ type: 'error', error: 'Pipeline not initialized' });
      return;
    }

    try {
      const results = await textToxicityPipeline(payload.text);
      const toxicity = getToxicityLevel(results);

      postMessage({ type: 'toxicity', result: toxicity });
    } catch (error: any) {
      postMessage({ type: 'error', error: error.message });
    }
  }
});

function getToxicityLevel(results: any[]): boolean {
  return !!results
    .map((result) => {
      if (result.score > TOXICITY_THRESHOLD) return result;
    })
    .reduce((maxToxicity, Toxicity) =>
      Toxicity.score > maxToxicity.score ? Toxicity.label : maxToxicity.label
    );
}
