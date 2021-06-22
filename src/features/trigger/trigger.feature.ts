import { Feature } from "../../dooble/Feature";
import { triggerSourceStory, triggerStory } from "./trigger.story";
import { InteractiveSystem } from "./interactiveSystem";

export const triggerFeature: Feature = {
    reducers: [InteractiveSystem],
    stories: [triggerStory, triggerSourceStory]
}