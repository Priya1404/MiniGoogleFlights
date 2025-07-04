import { openDB } from 'idb';

const DB_NAME = 'flightCacheDB';
const STORE_NAME = 'flightResults';

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function cacheFlightResults(key: string, data: any) {
  const db = await getDB();
  await db.put(STORE_NAME, data, key);
}

export async function getCachedFlightResults(key: string) {
  const db = await getDB();
  return db.get(STORE_NAME, key);
}

export async function clearFlightCache() {
  const db = await getDB();
  await db.clear(STORE_NAME);
}
