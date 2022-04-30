const Firestore = require('@google-cloud/firestore');

let options;
if (process.env.FIRESTORE_CLIENT_KEY && process.env.FIRESTORE_PROJECT_ID && process.env.FIRESTORE_CLIENT_EMAIL) {
    options = {
        key: process.env.FIRESTORE_PROJECT_ID,
        credentials: {
            client_email: process.env.FIRESTORE_CLIENT_EMAIL,
            private_key: process.env.FIRESTORE_CLIENT_KEY
        }
    }
} else {
    if (process.env.FIRESTORE_KEY_PATH) {
        try {
            const key = require(process.env.FIRESTORE_KEY_PATH);
            options = { 
                projectId: key.project_id,
                credentials: {
                    client_email: key.client_email,
                    private_key: key.private_key
                }
            }
        } catch(err) {
            //pass
        }
    }
}

module.exports = new class FirestoreClient {
    cache = new Map();
    constructor() {
        if (!options) {
            return;
        }
        this.db = new Firestore(options);
    }

    async get(key) {
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        const doc = await this.db.collection('responses').doc(key).get();
        if (doc.exists) {
            const data = doc.data();
            this.cache.set(key, data.value);
            return data.value;
        }
    }

    set(key, value) {
        return this.db.collection('responses').doc(key).set({ value }).then(() => {
            this.cache.set(key, value);
        });
    }

    delete(key) {
        return this.db.collection('responses').doc(key).delete().then(() => {
            this.cache.delete(key);
        });
    }
}