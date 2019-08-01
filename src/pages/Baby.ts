export class BeeKeeper {
    public hasMask: boolean;
}

export class ZooKeeper {
    // public nametag: string;
    constructor(public nametag: string) {

    }
}

export class Animal {
    public numLegs: number;
}

export class Bee extends Animal {
    public static keeper: BeeKeeper = new BeeKeeper();
}

export class Lion extends Animal {
    public static keeper: ZooKeeper = new ZooKeeper('zookeeper');
}


export interface AInterface<A, K> {
    new(): A;
    keeper: K;
}

export interface AProtoInterface<A, K> {
   new(): A;
   prototype: {
       keeper: K
       [key: string]: any
   };
   // prototype: {
   //     keeper: K
   // };
}
export function findKeeperProto<A extends Animal, K>(a: AProtoInterface<A, K>): K {
   return a.prototype.keeper;
}

export function findKeeper<A extends Animal, K>(a: AInterface<A, K>): K {
    return a.keeper;
}

