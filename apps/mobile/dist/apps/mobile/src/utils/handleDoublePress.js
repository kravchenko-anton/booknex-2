export const doublePress = (callback) => {
    let lastTap = null;
    const delay = 300;
    return () => {
        const now = Date.now();
        if (lastTap && now - lastTap < delay) {
            callback();
        }
        else {
            lastTap = now;
        }
    };
};
//# sourceMappingURL=handleDoublePress.js.map