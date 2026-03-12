import { type ReactElement } from "react";
import { StackLayout, SplitLayout } from "@/components/layouts";
import { Block } from "@/components/templates";
import {
    EditableH1,
    EditableH2,
    EditableParagraph,
    InlineLinkedHighlight,
    InlineTooltip,
    NodeLinkDiagram,
    InteractionHintSequence,
} from "@/components/atoms";
import {
    getVariableInfo,
    linkedHighlightPropsFromDefinition,
} from "../variables";

// ── Molecule Structure: Caffeine ──────────────────────────────────────────────

const caffeineNodes = [
    { id: "C1", label: "C", group: "carbon", highlightId: "atom" },
    { id: "C2", label: "C", group: "carbon", highlightId: "atom" },
    { id: "C3", label: "C", group: "carbon", highlightId: "atom" },
    { id: "C4", label: "C", group: "carbon", highlightId: "atom" },
    { id: "C5", label: "C", group: "carbon", highlightId: "atom" },
    { id: "C6", label: "C", group: "carbon", highlightId: "atom" },
    { id: "C7", label: "C", group: "carbon", highlightId: "atom" },
    { id: "C8", label: "C", group: "carbon", highlightId: "atom" },
    { id: "N1", label: "N", group: "nitrogen", highlightId: "atom" },
    { id: "N2", label: "N", group: "nitrogen", highlightId: "atom" },
    { id: "N3", label: "N", group: "nitrogen", highlightId: "atom" },
    { id: "N4", label: "N", group: "nitrogen", highlightId: "atom" },
    { id: "O1", label: "O", group: "oxygen", highlightId: "atom" },
    { id: "O2", label: "O", group: "oxygen", highlightId: "atom" },
];

const caffeineLinks = [
    { source: "C1", target: "N1", highlightId: "bond" },
    { source: "C1", target: "N2", highlightId: "bond" },
    { source: "C1", target: "O1", highlightId: "bond" },
    { source: "C2", target: "N1", highlightId: "bond" },
    { source: "C2", target: "C3", highlightId: "bond" },
    { source: "C3", target: "N2", highlightId: "bond" },
    { source: "C3", target: "C4", highlightId: "bond" },
    { source: "C4", target: "N3", highlightId: "bond" },
    { source: "C4", target: "C5", highlightId: "bond" },
    { source: "C5", target: "N4", highlightId: "bond" },
    { source: "C5", target: "C6", highlightId: "bond" },
    { source: "C6", target: "N3", highlightId: "bond" },
    { source: "C6", target: "O2", highlightId: "bond" },
    { source: "C7", target: "N1", highlightId: "bond" },
    { source: "C8", target: "N4", highlightId: "bond" },
    { source: "N2", target: "N4", highlightId: "bond" },
];

const moleculeColors = {
    carbon: "#64748b",
    nitrogen: "#6366F1",
    oxygen: "#ef4444",
};

// ── Section Blocks ────────────────────────────────────────────────────────────

export const section1Blocks: ReactElement[] = [
    // Title
    <StackLayout key="layout-intro-title" maxWidth="xl">
        <Block id="intro-title" padding="lg">
            <EditableH1 id="h1-intro-title" blockId="intro-title">
                A Gentle Introduction to Graph Neural Networks
            </EditableH1>
        </Block>
    </StackLayout>,

    // Section heading
    <StackLayout key="layout-graphs-everywhere-heading" maxWidth="xl">
        <Block id="graphs-everywhere-heading" padding="md">
            <EditableH2 id="h2-graphs-everywhere" blockId="graphs-everywhere-heading">
                Graphs Are Everywhere
            </EditableH2>
        </Block>
    </StackLayout>,

    // Opening hook
    <StackLayout key="layout-graphs-hook" maxWidth="xl">
        <Block id="graphs-hook" padding="sm">
            <EditableParagraph id="para-graphs-hook" blockId="graphs-hook">
                Look around you. Your social connections, the roads in your city, the atoms in your morning coffee — they all share something in common. They are all naturally represented as{" "}
                <InlineTooltip
                    id="tooltip-graph"
                    tooltip="A mathematical structure consisting of objects (nodes) and the connections between them (edges)."
                >
                    graphs
                </InlineTooltip>
                . Before we can understand Graph Neural Networks, we need to see why graphs are such a powerful way to describe the world.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Molecule visualization with explanation
    <SplitLayout key="layout-molecule-viz" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="molecule-explanation" padding="sm">
                <EditableParagraph id="para-molecule-explanation" blockId="molecule-explanation">
                    Consider a molecule of caffeine — the compound that makes your morning coffee work its magic. In the diagram, each{" "}
                    <InlineLinkedHighlight
                        varName="moleculeHighlight"
                        highlightId="atom"
                        {...linkedHighlightPropsFromDefinition(getVariableInfo("moleculeHighlight"))}
                        color="#6366F1"
                    >
                        atom
                    </InlineLinkedHighlight>{" "}
                    is represented as a circle (called a node), and each{" "}
                    <InlineLinkedHighlight
                        varName="moleculeHighlight"
                        highlightId="bond"
                        {...linkedHighlightPropsFromDefinition(getVariableInfo("moleculeHighlight"))}
                        color="#64748b"
                    >
                        chemical bond
                    </InlineLinkedHighlight>{" "}
                    connecting two atoms is shown as a line (called an edge).
                </EditableParagraph>
            </Block>
            <Block id="molecule-interaction-guide" padding="sm">
                <EditableParagraph id="para-molecule-interaction" blockId="molecule-interaction-guide">
                    Drag any atom in the molecule to rearrange it. Hover over an atom to see which other atoms it connects to directly. Notice how the structure of connections — not just the positions — defines what the molecule is.
                </EditableParagraph>
            </Block>
        </div>
        <Block id="molecule-diagram" padding="sm" hasVisualization>
            <div className="relative">
                <NodeLinkDiagram
                    nodes={caffeineNodes}
                    links={caffeineLinks}
                    height={380}
                    groupColors={moleculeColors}
                    highlightVarName="moleculeHighlight"
                    chargeStrength={-200}
                    linkDistance={50}
                    minNodeRadius={18}
                    maxNodeRadius={22}
                    showLinkLabels={false}
                    showContainerBorder={false}
                />
                <InteractionHintSequence
                    hintKey="molecule-drag-hint"
                    steps={[
                        {
                            gesture: "drag",
                            label: "Drag any atom to explore",
                            position: { x: "50%", y: "45%" },
                        },
                    ]}
                />
            </div>
        </Block>
    </SplitLayout>,

    // Insight paragraph
    <StackLayout key="layout-molecule-insight" maxWidth="xl">
        <Block id="molecule-insight" padding="sm">
            <EditableParagraph id="para-molecule-insight" blockId="molecule-insight">
                This is the key insight: a graph captures relationships. Carbon atoms (gray) bond with nitrogen (purple) and oxygen (red) in specific patterns. These patterns determine everything about the molecule — its properties, how it interacts with your body, even its smell and taste. The same carbon atoms arranged differently would be an entirely different substance.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Transition to more examples
    <StackLayout key="layout-graphs-examples" maxWidth="xl">
        <Block id="graphs-examples" padding="sm">
            <EditableParagraph id="para-graphs-examples" blockId="graphs-examples">
                Graphs appear everywhere in the real world. Social networks are graphs where people are nodes and friendships are edges. Road maps are graphs where intersections are nodes and streets are edges. The internet is a graph where websites are nodes and hyperlinks are edges. Even your brain is a graph — neurons connected by synapses. Once you start seeing graphs, you cannot unsee them.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
