import { Component } from "../../dooble/Component";
import { Vector } from "../../physics/vector";
import { TransporterState } from "./TransporterState";

export class TransporterComponent extends Component {
    readonly type = 'TransporterComponent';

    public transportProgressPercent = 0;

    constructor(
        public state: TransporterState,
        public transporterId: string,
        public targetTransporter: string,
        public x: number,
        public y: number,
        public radius: number,
        public exitDirection: Vector,
    ) {
        super();
    }
}
