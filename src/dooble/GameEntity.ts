export abstract class GameEntity {
    constructor(public components: Component[]) {}

    getComponent<T extends Component>(type: string) : T | undefined {
        return this.components.find(c => c.type === type) as T | undefined;
    }
}

export abstract class Component {
    abstract type: string;
}

