import { type ReactElement } from "react";
import { StackLayout, SplitLayout } from "@/components/layouts";
import { Block } from "@/components/templates";
import {
    EditableH2,
    EditableParagraph,
    InlineLinkedHighlight,
    InlineTooltip,
    InlineFeedback,
    InlineClozeChoice,
    NodeLinkDiagram,
    InteractionHintSequence,
} from "@/components/atoms";
import {
    getVariableInfo,
    linkedHighlightPropsFromDefinition,
    choicePropsFromDefinition,
} from "../variables";
import { useVar } from "@/stores";

// ── Simple Graph for Vocabulary ───────────────────────────────────────────────

const vocabularyNodes = [
    { id: "A", label: "A", group: "a", highlightId: "nodeA" },
    { id: "B", label: "B", group: "b", highlightId: "nodeB" },
    { id: "C", label: "C", group: "c", highlightId: "nodeC" },
    { id: "D", label: "D", group: "d", highlightId: "nodeD" },
    { id: "E", label: "E", group: "e", highlightId: "nodeE" },
];

const vocabularyLinks = [
    { source: "A", target: "B", highlightId: "edgeAB" },
    { source: "A", target: "C", highlightId: "edgeAC" },
    { source: "B", target: "C", highlightId: "edgeBC" },
    { source: "B", target: "D", highlightId: "edgeBD" },
    { source: "B", target: "E", highlightId: "edgeBE" },
    { source: "C", target: "D", highlightId: "edgeCD" },
];

const vocabularyColors = {
    a: "#62D0AD",
    b: "#8E90F5",
    c: "#F7B23B",
    d: "#AC8BF9",
    e: "#F8A0CD",
};

// ── Reactive Component to Show Degree ─────────────────────────────────────────

function DegreeDisplay() {
    const highlight = useVar("graphHighlight", null) as string | null;

    // Calculate degree based on highlighted node
    const getDegree = () => {
        if (!highlight) return null;
        const nodeId = highlight.replace("node", "");
        const degrees: Record<string, number> = {
            A: 2,
            B: 4,
            C: 3,
            D: 2,
            E: 1,
        };
        return { node: nodeId, degree: degrees[nodeId] || 0 };
    };

    const info = getDegree();

    if (!info) {
        return (
            <span className="text-slate-500 italic">
                Hover over a node to see its degree
            </span>
        );
    }

    return (
        <span className="font-medium" style={{ color: "#62D0AD" }}>
            Node {info.node} has degree {info.degree} (connected to {info.degree} other node{info.degree !== 1 ? "s" : ""})
        </span>
    );
}

// ── Section Blocks ────────────────────────────────────────────────────────────

export const section2Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-vocabulary-heading" maxWidth="xl">
        <Block id="vocabulary-heading" padding="md">
            <EditableH2 id="h2-vocabulary" blockId="vocabulary-heading">
                What Makes a Graph a Graph?
            </EditableH2>
        </Block>
    </StackLayout>,

    // Introduction to vocabulary
    <StackLayout key="layout-vocabulary-intro" maxWidth="xl">
        <Block id="vocabulary-intro" padding="sm">
            <EditableParagraph id="para-vocabulary-intro" blockId="vocabulary-intro">
                To work with graphs, we need a shared vocabulary. Fortunately, the concepts are intuitive — you have already seen them in action with the molecule. Let us make these ideas precise.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Interactive vocabulary graph
    <SplitLayout key="layout-vocabulary-viz" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="vocabulary-nodes" padding="sm">
                <EditableParagraph id="para-vocabulary-nodes" blockId="vocabulary-nodes">
                    A{" "}
                    <InlineLinkedHighlight
                        varName="graphHighlight"
                        highlightId="nodeB"
                        {...linkedHighlightPropsFromDefinition(getVariableInfo("graphHighlight"))}
                        color="#8E90F5"
                    >
                        node
                    </InlineLinkedHighlight>{" "}
                    (also called a vertex) represents an entity — a person, an atom, a city, or any object we care about. In the diagram, nodes are the colored circles labeled A through E.
                </EditableParagraph>
            </Block>
            <Block id="vocabulary-edges" padding="sm">
                <EditableParagraph id="para-vocabulary-edges" blockId="vocabulary-edges">
                    An{" "}
                    <InlineLinkedHighlight
                        varName="graphHighlight"
                        highlightId="edgeAB"
                        {...linkedHighlightPropsFromDefinition(getVariableInfo("graphHighlight"))}
                        color="#64748b"
                    >
                        edge
                    </InlineLinkedHighlight>{" "}
                    (also called a link) represents a connection or relationship between two nodes. The lines connecting the circles are edges. When node A has an edge to node B, we say they are{" "}
                    <InlineTooltip
                        id="tooltip-neighbors"
                        tooltip="Two nodes that share a direct edge between them"
                    >
                        neighbors
                    </InlineTooltip>
                    .
                </EditableParagraph>
            </Block>
            <Block id="vocabulary-degree" padding="sm">
                <EditableParagraph id="para-vocabulary-degree" blockId="vocabulary-degree">
                    The{" "}
                    <InlineTooltip
                        id="tooltip-degree"
                        tooltip="The number of edges connected to a node"
                    >
                        degree
                    </InlineTooltip>{" "}
                    of a node is simply how many edges connect to it — in other words, how many neighbors it has. Hover over any node in the diagram to see its degree: <DegreeDisplay />
                </EditableParagraph>
            </Block>
        </div>
        <Block id="vocabulary-graph" padding="sm" hasVisualization>
            <div className="relative">
                <NodeLinkDiagram
                    nodes={vocabularyNodes}
                    links={vocabularyLinks}
                    height={350}
                    groupColors={vocabularyColors}
                    highlightVarName="graphHighlight"
                    chargeStrength={-300}
                    linkDistance={90}
                    showLinkLabels={false}
                    showContainerBorder={false}
                />
                <InteractionHintSequence
                    hintKey="vocabulary-hover-hint"
                    steps={[
                        {
                            gesture: "hover",
                            label: "Hover to see connections",
                            position: { x: "50%", y: "50%" },
                        },
                    ]}
                />
            </div>
        </Block>
    </SplitLayout>,

    // Formal definition
    <StackLayout key="layout-formal-definition" maxWidth="xl">
        <Block id="formal-definition" padding="sm">
            <EditableParagraph id="para-formal-definition" blockId="formal-definition">
                Mathematicians define a graph G as a pair (V, E), where V is the set of nodes and E is the set of edges. In our example, V = {"{A, B, C, D, E}"} and E contains six edges connecting various pairs of nodes. This simple notation captures the entire structure of relationships.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Assessment question 1
    <StackLayout key="layout-assessment-edge" maxWidth="xl">
        <Block id="assessment-edge" padding="md">
            <EditableParagraph id="para-assessment-edge" blockId="assessment-edge">
                In a graph, an edge represents a{" "}
                <InlineFeedback
                    varName="answerEdgeDefinition"
                    correctValue="connection"
                    position="terminal"
                    successMessage="— exactly! Edges capture how nodes relate to each other"
                    failureMessage="— not quite"
                    hint="Think about what connects two nodes together"
                >
                    <InlineClozeChoice
                        varName="answerEdgeDefinition"
                        correctAnswer="connection"
                        options={["entity", "connection", "number", "label"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerEdgeDefinition"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Key takeaway
    <StackLayout key="layout-vocabulary-takeaway" maxWidth="xl">
        <Block id="vocabulary-takeaway" padding="sm">
            <EditableParagraph id="para-vocabulary-takeaway" blockId="vocabulary-takeaway">
                With just nodes, edges, and the concept of degree, we can describe remarkably complex structures. A molecule with hundreds of atoms, a social network with millions of users, or a road network spanning a continent — they all reduce to these three simple building blocks.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
