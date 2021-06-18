import { Feature } from "../../dooble/feature";
import { triggerSourceStory, triggerStory } from "./trigger.story";
import { InteractiveSystem } from "./interactiveSystem";

export const triggerFeature: Feature = {
    gameEntities: [],
    reducers: [InteractiveSystem],
    stories: [triggerStory, triggerSourceStory]
}