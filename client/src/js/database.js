// TODO: Install the following package:
import { openDB } from 'idb';

// TODO: Complete the initDb() function below:
const initdb = async () => {
    openDB('contact-db', 1, {
        upgrade(db) {
            if (db.objectStoreNames.contains('contact-db')) {
                console.log('contact-db database already exists');
                return;
            }
        }
    })
};


// TODO: Complete the postDb() function below:
export const postDb = async (name, home, cell, email) => {
    console.log('Post to the database')
    const contactDb = await openDB('contact-db', 1);
    const tx = contactDb.transaction('contact-db', 'readwrite');
    const store = tx.objectStore('contact-db');
    const request = store.add({ name: name, home: home, cell: cell, email: email });
    const result = await request;
    console.log('Data saved to the database', result);
};

// TODO: Complete the getDb() function below:
export const getDb = async () => {
console.log('GET all from the database');
const contactDb = await openDB('contact-db',1);
const tx = contactDb.transaction('contact-db', 'readonly');
    const store = tx.objectStore('contact-db');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
  return result;
};

// TODO: Complete the deleteDb() function below:
export const deleteDb = async (id) => {
    console.log('DELETE from the database', id);
    const contactDb = await openDB('todos', 1);
    const tx = contactDb.transaction('todos', 'readwrite');
    const store = tx.objectStore('todos');
    const request = store.delete(id);
    const result = await request;
    console.log('result.value', result);
    return result;
};

initdb();
