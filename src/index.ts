import {
  AchievementsCoreAdapter,
  REDIS_CREDENTIALS,
} from '@st-achievements/core';
import { StFirebaseApp } from '@st-api/firebase';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

import { AppModule } from './app.module.js';
import { API_KEY_SECRET } from './secrets.js';

dayjs.extend(customParseFormat);

const app = StFirebaseApp.create(AppModule, {
  adapter: new AchievementsCoreAdapter(),
  secrets: [API_KEY_SECRET, REDIS_CREDENTIALS],
  swagger: {
    documentBuilder: (document) =>
      document.addApiKey({
        name: 'x-api-key',
        type: 'apiKey',
        in: 'header',
        scheme: 'api_key',
      }),
    documentFactory: (document) => {
      document.security ??= [];
      document.security.push({
        api_key: [],
      });
      return document;
    },
  },
}).withHttpHandler();

export const usr_workout = {
  receiver: {
    http: app.getHttpHandler(),
  },
};
