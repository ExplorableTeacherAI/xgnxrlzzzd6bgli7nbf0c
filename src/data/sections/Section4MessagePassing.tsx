import { type ReactElement } from "react";
import { StackLayout, SplitLayout } from "@/components/layouts";
import { Block } from "@/components/templates";
import {
    EditableH2,
    EditableParagraph,
    InlineTooltip,
    InlineFeedback,
    InlineClozeChoice,
    InlineToggle,
    InteractionHintSequence,
} from "@/components/atoms";
import {
    getVariableInfo,
    choicePropsFromDefinition,
    togglePropsFromDefinition,
} from "../variables";
import { useVar } from "@/stores";

// ── Neighborhood Visualization ────────────────────────────────────────────────

function NeighborhoodVisualization() {
    const focusNode = useVar("focusNode", "A") as string;

    // Define the graph structure
    const nodes = [
        { id: "A", x: 150, y: 100 },
        { id: "B", x: 80, y: 180 },
        { id: "C", x: 220, y: 180 },
        { id: "D", x: 50, y: 280 },
        { id: "E", x: 150, y: 280 },
    ];

    const edges = [
        { from: "A", to: "B" },
        { from: "A", to: "C" },
        { from: "B", to: "D" },
        { from: "B", to: "E" },
        { from: "C", to: "E" },
    ];

    // Calculate neighbors for each node
    const getNeighbors = (nodeId: string): string[] => {
        const neighbors: string[] = [];
        edges.forEach((edge) => {
            if (edge.from === nodeId) neighbors.push(edge.to);
            if (edge.to === nodeId) neighbors.push(edge.from);
        });
        return neighbors;
    };

    // Get 2-hop neighbors
    const getTwoHopNeighbors = (nodeId: string): string[] => {
        const oneHop = getNeighbors(nodeId);
        const twoHop = new Set<string>();
        oneHop.forEach((n) => {
            getNeighbors(n).forEach((nn) => {
                if (nn !== nodeId && !oneHop.includes(nn)) {
                    twoHop.add(nn);
                }
            });
        });
        return Array.from(twoHop);
    };

    const neighbors1 = getNeighbors(focusNode);
    const neighbors2 = getTwoHopNeighbors(focusNode);

    const getNodeColor = (nodeId: string): string => {
        if (nodeId === focusNode) return "#62D0AD";
        if (neighbors1.includes(nodeId)) return "#8E90F5";
        if (neighbors2.includes(nodeId)) return "#F7B23B";
        return "#94a3b8";
    };

    const getEdgeColor = (from: string, to: string): string => {
        const isFocusEdge =
            (from === focusNode && neighbors1.includes(to)) ||
            (to === focusNode && neighbors1.includes(from));
        if (isFocusEdge) return "#8E90F5";

        const isSecondHop =
            (neighbors1.includes(from) && neighbors2.includes(to)) ||
            (neighbors1.includes(to) && neighbors2.includes(from)) ||
            (neighbors1.includes(from) && neighbors1.includes(to) && from !== focusNode && to !== focusNode);
        if (isSecondHop) return "#F7B23B";

        return "#e2e8f0";
    };

    const nodePos = (id: string) => nodes.find((n) => n.id === id)!;

    return (
        <div className="bg-white rounded-lg p-4">
            <svg width="300" height="340" viewBox="0 0 300 340">
                {/* Edges */}
                {edges.map((edge, i) => {
                    const from = nodePos(edge.from);
                    const to = nodePos(edge.to);
                    return (
                        <line
                            key={i}
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke={getEdgeColor(edge.from, edge.to)}
                            strokeWidth={3}
                            style={{ transition: "stroke 0.3s ease" }}
                        />
                    );
                })}

                {/* Nodes */}
                {nodes.map((node) => (
                    <g key={node.id}>
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r={node.id === focusNode ? 28 : 24}
                            fill={getNodeColor(node.id)}
                            stroke="white"
                            strokeWidth={3}
                            style={{ transition: "all 0.3s ease" }}
                        />
                        <text
                            x={node.x}
                            y={node.y + 6}
                            textAnchor="middle"
                            fill="white"
                            fontSize="16"
                            fontWeight="bold"
                        >
                            {node.id}
                        </text>
                    </g>
                ))}
            </svg>

            {/* Legend */}
            <div className="flex justify-center gap-4 mt-2 text-sm">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#62D0AD" }} />
                    <span className="text-slate-600">Focus</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#8E90F5" }} />
                    <span className="text-slate-600">1-hop</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#F7B23B" }} />
                    <span className="text-slate-600">2-hop</span>
                </div>
            </div>
        </div>
    );
}

// ── Message Passing Animation ─────────────────────────────────────────────────

function MessagePassingVisualization() {
    const step = useVar("messagePassingStep", 0) as number;

    // Simple star graph: center A connected to B, C, D
    const centerX = 150;
    const centerY = 150;
    const radius = 80;

    const peripheryNodes = [
        { id: "B", angle: -90, value: 2, color: "#8E90F5" },
        { id: "C", angle: 30, value: 5, color: "#F7B23B" },
        { id: "D", angle: 150, value: 3, color: "#AC8BF9" },
    ];

    // Calculate center value based on step
    const getCenterValue = () => {
        if (step === 0) return "?";
        if (step === 1) return "→"; // Receiving messages
        if (step === 2) return "10"; // Sum: 2+5+3
        return "3.3"; // Average: 10/3
    };

    const getCenterColor = () => {
        if (step === 0) return "#94a3b8";
        if (step >= 2) return "#62D0AD";
        return "#62D0AD";
    };

    const getStepDescription = () => {
        switch (step) {
            case 0:
                return "Node A wants to learn about its neighborhood";
            case 1:
                return "A gathers information from neighbors B, C, D";
            case 2:
                return "A sums the values: 2 + 5 + 3 = 10";
            default:
                return "A averages to get its new representation: 10 ÷ 3 ≈ 3.3";
        }
    };

    return (
        <div className="bg-white rounded-lg p-4">
            <svg width="300" height="300" viewBox="0 0 300 300">
                {/* Edges */}
                {peripheryNodes.map((node, i) => {
                    const x = centerX + radius * Math.cos((node.angle * Math.PI) / 180);
                    const y = centerY + radius * Math.sin((node.angle * Math.PI) / 180);
                    return (
                        <line
                            key={i}
                            x1={centerX}
                            y1={centerY}
                            x2={x}
                            y2={y}
                            stroke={step >= 1 ? "#62D0AD" : "#e2e8f0"}
                            strokeWidth={step >= 1 ? 4 : 2}
                            style={{ transition: "all 0.3s ease" }}
                        />
                    );
                })}

                {/* Message arrows when gathering */}
                {step === 1 &&
                    peripheryNodes.map((node, i) => {
                        const x = centerX + radius * Math.cos((node.angle * Math.PI) / 180);
                        const y = centerY + radius * Math.sin((node.angle * Math.PI) / 180);
                        const midX = (centerX + x) / 2;
                        const midY = (centerY + y) / 2;
                        return (
                            <g key={`arrow-${i}`}>
                                <circle
                                    cx={midX}
                                    cy={midY}
                                    r={12}
                                    fill={node.color}
                                    className="animate-pulse"
                                />
                                <text
                                    x={midX}
                                    y={midY + 4}
                                    textAnchor="middle"
                                    fill="white"
                                    fontSize="10"
                                    fontWeight="bold"
                                >
                                    {node.value}
                                </text>
                            </g>
                        );
                    })}

                {/* Center node */}
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={32}
                    fill={getCenterColor()}
                    stroke="white"
                    strokeWidth={3}
                />
                <text
                    x={centerX}
                    y={centerY + 6}
                    textAnchor="middle"
                    fill="white"
                    fontSize={step <= 1 ? 20 : 14}
                    fontWeight="bold"
                >
                    {getCenterValue()}
                </text>

                {/* Periphery nodes */}
                {peripheryNodes.map((node, i) => {
                    const x = centerX + radius * Math.cos((node.angle * Math.PI) / 180);
                    const y = centerY + radius * Math.sin((node.angle * Math.PI) / 180);
                    return (
                        <g key={i}>
                            <circle
                                cx={x}
                                cy={y}
                                r={28}
                                fill={node.color}
                                stroke="white"
                                strokeWidth={3}
                            />
                            <text
                                x={x}
                                y={y - 4}
                                textAnchor="middle"
                                fill="white"
                                fontSize="14"
                                fontWeight="bold"
                            >
                                {node.id}
                            </text>
                            <text
                                x={x}
                                y={y + 12}
                                textAnchor="middle"
                                fill="white"
                                fontSize="12"
                            >
                                = {node.value}
                            </text>
                        </g>
                    );
                })}
            </svg>

            {/* Step indicator */}
            <div className="text-center mt-2">
                <p className="text-sm font-medium text-slate-700">{getStepDescription()}</p>
                <div className="flex justify-center gap-2 mt-2">
                    {[0, 1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className="w-2 h-2 rounded-full transition-all"
                            style={{
                                backgroundColor: s <= step ? "#62D0AD" : "#e2e8f0",
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── Reactive Neighbor Count Display ───────────────────────────────────────────

function NeighborCountDisplay() {
    const focusNode = useVar("focusNode", "A") as string;

    const neighborCounts: Record<string, { oneHop: number; twoHop: number }> = {
        A: { oneHop: 2, twoHop: 2 },
        B: { oneHop: 3, twoHop: 1 },
        C: { oneHop: 2, twoHop: 2 },
        D: { oneHop: 1, twoHop: 2 },
        E: { oneHop: 2, twoHop: 1 },
    };

    const counts = neighborCounts[focusNode] || { oneHop: 0, twoHop: 0 };

    return (
        <span>
            Node {focusNode} has{" "}
            <span style={{ color: "#8E90F5", fontWeight: 500 }}>{counts.oneHop}</span> direct neighbor
            {counts.oneHop !== 1 ? "s" : ""} and{" "}
            <span style={{ color: "#F7B23B", fontWeight: 500 }}>{counts.twoHop}</span> node
            {counts.twoHop !== 1 ? "s" : ""} at 2 hops away.
        </span>
    );
}

// ── Section Blocks ────────────────────────────────────────────────────────────

export const section4Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-message-heading" maxWidth="xl">
        <Block id="message-heading" padding="md">
            <EditableH2 id="h2-message-passing" blockId="message-heading">
                The Key Idea — Learning from Neighbors
            </EditableH2>
        </Block>
    </StackLayout>,

    // Core insight
    <StackLayout key="layout-message-intro" maxWidth="xl">
        <Block id="message-intro" padding="sm">
            <EditableParagraph id="para-message-intro" blockId="message-intro">
                Graph Neural Networks are built on a beautifully simple idea: a node should learn from its{" "}
                <InlineTooltip
                    id="tooltip-neighborhood"
                    tooltip="All nodes directly connected to a given node by an edge"
                >
                    neighborhood
                </InlineTooltip>
                . Instead of trying to flatten a graph into a sequence, we let information flow along edges. Each node gathers messages from its neighbors and uses them to update its own understanding.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Neighborhood exploration
    <SplitLayout key="layout-neighborhood-viz" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="neighborhood-explanation" padding="sm">
                <EditableParagraph id="para-neighborhood-explanation" blockId="neighborhood-explanation">
                    Select a focus node:{" "}
                    <InlineToggle
                        id="toggle-focus-node"
                        varName="focusNode"
                        options={["A", "B", "C", "D", "E"]}
                        {...togglePropsFromDefinition(getVariableInfo("focusNode"))}
                    />
                    . The diagram shows which nodes are directly connected (1-hop neighbors, in purple) and which are two steps away (2-hop neighbors, in amber).
                </EditableParagraph>
            </Block>
            <Block id="neighborhood-count" padding="sm">
                <EditableParagraph id="para-neighborhood-count" blockId="neighborhood-count">
                    <NeighborCountDisplay /> Click the node name above to explore different perspectives on the graph.
                </EditableParagraph>
            </Block>
        </div>
        <Block id="neighborhood-graph" padding="sm" hasVisualization>
            <div className="relative">
                <NeighborhoodVisualization />
                <InteractionHintSequence
                    hintKey="neighborhood-toggle-hint"
                    steps={[
                        {
                            gesture: "click",
                            label: "Click the node letter above",
                            position: { x: "50%", y: "15%" },
                        },
                    ]}
                />
            </div>
        </Block>
    </SplitLayout>,

    // Message passing explanation
    <StackLayout key="layout-message-passing-title" maxWidth="xl">
        <Block id="message-passing-title" padding="sm">
            <EditableParagraph id="para-message-passing-title" blockId="message-passing-title">
                This neighborhood structure is the foundation of{" "}
                <InlineTooltip
                    id="tooltip-message-passing"
                    tooltip="The process where nodes exchange information with their neighbors to build richer representations"
                >
                    message passing
                </InlineTooltip>
                . Let us see how a node learns from its neighbors step by step.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Message passing visualization
    <SplitLayout key="layout-message-passing-viz" ratio="1:1" gap="lg">
        <div className="space-y-4">
            <Block id="message-passing-steps" padding="sm">
                <EditableParagraph id="para-message-passing-steps" blockId="message-passing-steps">
                    Imagine each node holds a number representing some feature. Node A wants to learn about its surroundings. It asks each neighbor: "What is your value?" Then it combines these messages — perhaps by summing or averaging — to create its new representation.
                </EditableParagraph>
            </Block>
            <Block id="message-passing-control" padding="sm">
                <EditableParagraph id="para-message-passing-control" blockId="message-passing-control">
                    Scrub through the message passing steps to see the process unfold. The purple node B holds value 2, amber node C holds 5, and violet node D holds 3. Watch how A gathers and combines this information.
                </EditableParagraph>
            </Block>
        </div>
        <Block id="message-passing-graph" padding="sm" hasVisualization>
            <div className="relative">
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-4">
                        <span className="text-sm text-slate-600">Step:</span>
                        <input
                            type="range"
                            min="0"
                            max="3"
                            value={useVar("messagePassingStep", 0) as number}
                            onChange={(e) => {
                                const { useVariableStore } = require("@/stores");
                                useVariableStore.getState().setVariable("messagePassingStep", parseInt(e.target.value));
                            }}
                            className="w-48 accent-[#62D0AD]"
                        />
                    </div>
                    <MessagePassingVisualization />
                </div>
                <InteractionHintSequence
                    hintKey="message-step-hint"
                    steps={[
                        {
                            gesture: "drag-horizontal",
                            label: "Drag the slider to step through",
                            position: { x: "50%", y: "8%" },
                        },
                    ]}
                />
            </div>
        </Block>
    </SplitLayout>,

    // Why this works
    <StackLayout key="layout-why-works" maxWidth="xl">
        <Block id="why-works" padding="sm">
            <EditableParagraph id="para-why-works" blockId="why-works">
                This approach elegantly solves the ordering problem. It does not matter how we number the nodes — node A will always gather messages from the same set of neighbors. The structure of connections, not arbitrary labels, determines what information flows where. By stacking multiple rounds of message passing, nodes can learn about increasingly distant parts of the graph.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Assessment
    <StackLayout key="layout-assessment-message" maxWidth="xl">
        <Block id="assessment-message" padding="md">
            <EditableParagraph id="para-assessment-message" blockId="assessment-message">
                In a Graph Neural Network, each node updates its representation by gathering information from its{" "}
                <InlineFeedback
                    varName="answerMessagePassing"
                    correctValue="neighbors"
                    position="terminal"
                    successMessage="— exactly! This neighbor-based approach is what makes GNNs work on graphs of any size and structure"
                    failureMessage="— not quite"
                    hint="Think about which nodes can directly send messages to a given node"
                >
                    <InlineClozeChoice
                        varName="answerMessagePassing"
                        correctAnswer="neighbors"
                        options={["all nodes", "neighbors", "random nodes", "itself only"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerMessagePassing"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
