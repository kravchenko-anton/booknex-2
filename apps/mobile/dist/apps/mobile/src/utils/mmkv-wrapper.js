import { storage } from '@/App';
export const zustandStorage = {
    setItem: (name, value) => storage.set(name, value),
    getItem: name => {
        const value = storage.getString(name);
        return value ?? null;
    },
    removeItem: name => storage.delete(name)
};
export const reduxStorage = {
    setItem: (key, value) => {
        storage.set(key, value);
        return Promise.resolve(true);
    },
    getItem: key => {
        const value = storage.getString(key);
        return Promise.resolve(value);
    },
    removeItem: key => {
        storage.delete(key);
        return Promise.resolve();
    }
};
//# sourceMappingURL=mmkv-wrapper.js.map