// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './20240926021957_salty_marauders.sql';
import m0001 from './20240926072838_busy_tyger_tiger.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001
    }
  }
  