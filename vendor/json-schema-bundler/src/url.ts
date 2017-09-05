export default class Url {
    public static join(base: string, file: string, hash: string = null): string {
        return Url.resolve(base + '/' + file) + (hash ? '#' + hash : '');
    }

    public static relative(u1: string, u2: string) {
        const s1 = u1.split('/');
        const s2 = u2.split('/');

        while ((s2[0] !== undefined) && (s1.shift() === s2[0])) {
            s2.shift();
        }

        return s2.join('/');
    }

    public static extension(url: string) {
        const s = url.split('.');
        return s[s.length - 1];
    }

    public static resolve(url: string) {
        const path = url.split('/');

        // from https://github.com/defunctzombie/node-url
        let up = 0;

        for (let i = path.length; i > 0; i--) {
            const last = path[i];

            if (last === '.') {
                path.splice(i, 1);
            } else if (last === '..') {
                path.splice(i, 1);
                up++;
            } else if (up) {
                path.splice(i, 1);
                up--;
            }
        }

        return path.join('/');
    }

    // public static common(urls: string[]): string {
    //     return urls[0];
    // }

    public url: string;
    public path: string;
    public hash?: string;
    public base?: string;
    public file?: string;
    public isRelative?: boolean;

    constructor(url: string) {
        this.url = url.replace(/ /g, '%20');
        const hashSplit = this.url.split('#');
        this.path = hashSplit[0];
        this.hash = hashSplit[1];
        const pathSplit: string[] = this.path.split('/');
        this.file = pathSplit.pop();
        this.base = pathSplit.join('/');
        this.isRelative = pathSplit[1] === '' && pathSplit[0][pathSplit[0].length - 1] === ':';
    }
}
