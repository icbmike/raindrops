export abstract class GameEntity {
    constructor(public components: Component[]) {}

    getComponent<T extends Component>(type: string) : T | undefined {
        return this.components.find(c => c.type === type) as T | undefined;
    }
}

export abstract class Component {
    abstract type: string;
}


export function findComponents<T extends Component>(gameEntities: GameEntity[], componentType: string): T[];
export function findComponents<T1 extends Component, T2 extends Component>(gameEntities: GameEntity[], componentType1: string, componentType2: string): [T1, T2][];

export function findComponents<T1 extends Component, T2 extends Component>(gameEntities: GameEntity[], componentType1: string, componentType2?: string): [T1, T2][] | T1[] {
    if(componentType2){
        return gameEntities.flatMap(ge => {
            const c1 = ge.getComponent<T1>(componentType1);
            const c2 = ge.getComponent<T2>(componentType2);
    
            return c1 && c2 ? [[c1, c2]]: [];
        })
    }
    
    return gameEntities.flatMap(ge => {
        const c = ge.getComponent<T1>(componentType1);

        return c ? [c]: [];
    })
    
}
