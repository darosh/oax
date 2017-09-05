export default function deep(obj: any) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    const temp = obj.constructor();

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            temp[key] = deep(obj[key]);
        }
    }

    return temp;
}
