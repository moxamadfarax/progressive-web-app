import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const putNotesDb = await openDB("jate", 1);
  const tx = putNotesDb.transaction("jate", "readwrite");
  const store = tx.objectStore("jate");
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log("ur gud", result);
};

// Logic for a method that gets all the content from the database
export const getDb = async () => {
  const getNotesDb = await openDB("jate", 1);
  const tx = getNotesDb.transaction("jate", "readonly");
  const store = tx.objectStore("jate");
  const request = store.get(1);
  const result = await request;
  if (!result) {
    console.log("No data found.");
  }
  return null;
};

initdb();
