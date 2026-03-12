import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";
useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

// Import section blocks
import { section1Blocks } from "./sections/Section1GraphsEverywhere";
import { section2Blocks } from "./sections/Section2GraphVocabulary";
import { section3Blocks } from "./sections/Section3WhyGNNs";
import { section4Blocks } from "./sections/Section4MessagePassing";
import { section5Blocks } from "./sections/Section5Summary";

/**
 * ------------------------------------------------------------------
 * A GENTLE INTRODUCTION TO GRAPH NEURAL NETWORKS
 * ------------------------------------------------------------------
 *
 * This lesson introduces the foundational concepts of Graph Neural Networks
 * to students with no prior knowledge. It covers:
 *
 * 1. Graphs Are Everywhere - Using molecules to show graphs in the real world
 * 2. What Makes a Graph a Graph - Vocabulary: nodes, edges, degree
 * 3. Why Can't We Just Use Regular Neural Networks - The ordering problem
 * 4. The Key Idea — Learning from Neighbors - Message passing intuition
 * 5. Putting It Together - Real-world applications and summary
 *
 * Target Audience: Post-secondary students (ages 17-20)
 * Prior Knowledge: None assumed
 * Key Challenge Addressed: Making graphs feel tangible, not abstract
 */

export const blocks: ReactElement[] = [
    ...section1Blocks,
    ...section2Blocks,
    ...section3Blocks,
    ...section4Blocks,
    ...section5Blocks,
];
