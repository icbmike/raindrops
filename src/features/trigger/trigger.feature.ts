import { Feature } from "../../dooble/Feature";
import { triggerSourceStory, triggerStory } from "./trigger.story";
import { InteractiveSystem } from "./interactiveSystem";

export const triggerFeature: Feature = {
    systems: [InteractiveSystem],
    stories: [triggerStory, triggerSourceStory]
}