import { type ReactElement } from "react";
import { StackLayout, SplitLayout } from "@/components/layouts";
import { Block } from "@/components/templates";
import {
    EditableH2,
    EditableH3,
    EditableParagraph,
    InlineFeedback,
    InlineClozeChoice,
    InlineScrubbleNumber,
    InteractionHintSequence,
} from "@/components/atoms";
import {
    getVariableInfo,
    numberPropsFromDefinition,
    choicePropsFromDefinition,
} from "../variables";
import { useVar } from "@/stores";

// ── Image Grid Visualization ──────────────────────────────────────────────────

function ImageGridVisualization() {
    const gridSize = useVar("gridSize", 4) as number;

    // Create a simple checkerboard pattern
    const cells = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        const isLight = (row + col) % 2 === 0;
        cells.push(
            <div
                key={i}
                className="aspect-square rounded-sm flex items-center justify-center text-xs font-medium"
                style={{
                    backgroundColor: isLight ? "#e2e8f0" : "#94a3b8",
                    color: isLight ? "#64748b" : "#f8fafc",
                }}
            >
                {i + 1}
            </div>
        );
    }

    return (
        <div className="p-4 rounded-lg bg-white">
            <div
                className="grid gap-1 mx-auto"
                style={{
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    maxWidth: 280,
                }}
            >
                {cells}
            </div>
            <p className="text-center text-sm text-slate-500 mt-3">
                {gridSize} × {gridSize} = {gridSize * gridSize} pixels, fixed positions
            </p>
        </div>
    );
}

// ── Graph Order Problem Visualization ─────────────────────────────────────────

function GraphOrderVisualization() {
    const permIndex = useVar("permutationIndex", 0) as number;

    const nodeLabels = ["A", "B", "C", "D"];
    const permutations = [
        [0, 1, 2, 3], // A B C D
        [1, 0, 2, 3], // B A C D
        [2, 1, 0, 3], // C B A D
        [3, 2, 1, 0], // D C B A
        [0, 2, 1, 3], // A C B D
        [1, 3, 0, 2], // B D A C
    ];

    const perm = permutations[permIndex % permutations.length];
    const orderedLabels = perm.map((i) => nodeLabels[i]);

    const nodeColors = ["#62D0AD", "#8E90F5", "#F7B23B", "#AC8BF9"];

    return (
        <div className="p-4 rounded-lg bg-white">
            <div className="flex justify-center gap-2 mb-4">
                {orderedLabels.map((label, idx) => (
                    <div
                        key={idx}
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                        style={{ backgroundColor: nodeColors[nodeLabels.indexOf(label)] }}
                    >
                        {label}
                    </div>
                ))}
            </div>
            <p className="text-center text-sm text-slate-500">
                Ordering {permIndex + 1} of 24 possible
            </p>
            <p className="text-center text-xs text-slate-400 mt-1">
                [{orderedLabels.join(", ")}]
            </p>
        </div>
    );
}

// ── Side by Side Comparison ───────────────────────────────────────────────────

function ComparisonVisualization() {
    return (
        <div className="grid grid-cols-2 gap-6">
            {/* Image side */}
            <div className="text-center">
                <div className="p-3 rounded-lg bg-slate-50 mb-2">
                    <div className="grid grid-cols-3 gap-1 w-24 mx-auto">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className="aspect-square rounded-sm"
                                style={{ backgroundColor: i % 2 === 0 ? "#94a3b8" : "#e2e8f0" }}
                            />
                        ))}
                    </div>
                </div>
                <p className="text-sm font-medium text-slate-700">Image</p>
                <p className="text-xs text-slate-500">Fixed grid order</p>
            </div>

            {/* Graph side */}
            <div className="text-center">
                <div className="p-3 rounded-lg bg-slate-50 mb-2">
                    <svg width="96" height="72" viewBox="0 0 96 72" className="mx-auto">
                        {/* Edges */}
                        <line x1="24" y1="20" x2="72" y2="20" stroke="#cbd5e1" strokeWidth="2" />
                        <line x1="24" y1="20" x2="48" y2="52" stroke="#cbd5e1" strokeWidth="2" />
                        <line x1="72" y1="20" x2="48" y2="52" stroke="#cbd5e1" strokeWidth="2" />
                        {/* Nodes */}
                        <circle cx="24" cy="20" r="12" fill="#62D0AD" />
                        <circle cx="72" cy="20" r="12" fill="#8E90F5" />
                        <circle cx="48" cy="52" r="12" fill="#F7B23B" />
                        <text x="24" y="24" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">A</text>
                        <text x="72" y="24" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">B</text>
                        <text x="48" y="56" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">C</text>
                    </svg>
                </div>
                <p className="text-sm font-medium text-slate-700">Graph</p>
                <p className="text-xs text-slate-500">No natural order</p>
            </div>
        </div>
    );
}

// ── Section Blocks ────────────────────────────────────────────────────────────

export const section3Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-why-gnn-heading" maxWidth="xl">
        <Block id="why-gnn-heading" padding="md">
            <EditableH2 id="h2-why-gnn" blockId="why-gnn-heading">
                Why Can't We Just Use Regular Neural Networks?
            </EditableH2>
        </Block>
    </StackLayout>,

    // The problem setup
    <StackLayout key="layout-why-gnn-intro" maxWidth="xl">
        <Block id="why-gnn-intro" padding="sm">
            <EditableParagraph id="para-why-gnn-intro" blockId="why-gnn-intro">
                Neural networks have revolutionized how computers understand images, text, and speech. If they work so well, why do we need special Graph Neural Networks? The answer lies in a fundamental difference between structured data like images and graph data.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Images have structure
    <StackLayout key="layout-image-structure-heading" maxWidth="xl">
        <Block id="image-structure-heading" padding="sm">
            <EditableH3 id="h3-image-structure" blockId="image-structure-heading">
                Images: Fixed, Ordered Structure
            </EditableH3>
        </Block>
    </StackLayout>,

    <SplitLayout key="layout-image-grid" ratio="1:1" gap="lg">
        <Block id="image-explanation" padding="sm">
            <EditableParagraph id="para-image-explanation" blockId="image-explanation">
                Consider a digital image. It is a{" "}
                <InlineScrubbleNumber
                    varName="gridSize"
                    {...numberPropsFromDefinition(getVariableInfo("gridSize"))}
                />
                {" "}×{" "}
                <InlineScrubbleNumber
                    varName="gridSize"
                    {...numberPropsFromDefinition(getVariableInfo("gridSize"))}
                />{" "}
                grid of pixels. Pixel 1 is always at the top-left. Pixel 2 is always to its right. This fixed arrangement means a neural network can learn that "eyes are usually in the upper half" or "corners have less detail." The position carries meaning.
            </EditableParagraph>
        </Block>
        <Block id="image-grid-viz" padding="sm" hasVisualization>
            <div className="relative">
                <ImageGridVisualization />
                <InteractionHintSequence
                    hintKey="grid-size-hint"
                    steps={[
                        {
                            gesture: "drag-horizontal",
                            label: "Scrub the grid size above",
                            position: { x: "50%", y: "20%" },
                        },
                    ]}
                />
            </div>
        </Block>
    </SplitLayout>,

    // Graphs have no fixed order
    <StackLayout key="layout-graph-order-heading" maxWidth="xl">
        <Block id="graph-order-heading" padding="sm">
            <EditableH3 id="h3-graph-order" blockId="graph-order-heading">
                Graphs: No Natural Order
            </EditableH3>
        </Block>
    </StackLayout>,

    <SplitLayout key="layout-graph-order" ratio="1:1" gap="lg">
        <Block id="graph-order-explanation" padding="sm">
            <EditableParagraph id="para-graph-order-explanation" blockId="graph-order-explanation">
                Graphs are fundamentally different. There is no "first" node. If we label nodes A, B, C, D, we could just as easily call them D, C, B, A. Scrub the ordering number to see different ways to list the same four nodes. With just 4 nodes, there are 24 possible orderings. With 100 nodes, there are more orderings than atoms in the universe.
            </EditableParagraph>
        </Block>
        <Block id="graph-order-viz" padding="sm" hasVisualization>
            <div className="relative">
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-4">
                        <span className="text-sm text-slate-600">Ordering:</span>
                        <InlineScrubbleNumber
                            varName="permutationIndex"
                            {...numberPropsFromDefinition(getVariableInfo("permutationIndex"))}
                            formatValue={(v) => `${v + 1}`}
                        />
                    </div>
                    <GraphOrderVisualization />
                </div>
                <InteractionHintSequence
                    hintKey="permutation-hint"
                    steps={[
                        {
                            gesture: "drag-horizontal",
                            label: "Scrub to change the order",
                            position: { x: "50%", y: "15%" },
                        },
                    ]}
                />
            </div>
        </Block>
    </SplitLayout>,

    // The core problem
    <StackLayout key="layout-core-problem" maxWidth="xl">
        <Block id="core-problem" padding="sm">
            <EditableParagraph id="para-core-problem" blockId="core-problem">
                This is the core problem: traditional neural networks expect data in a fixed order. They would treat [A, B, C, D] and [B, A, D, C] as completely different inputs, even though they represent the exact same graph. We need networks that understand graph structure regardless of how we number the nodes.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Side by side comparison
    <StackLayout key="layout-comparison-viz" maxWidth="md">
        <Block id="comparison-viz" padding="md" hasVisualization>
            <ComparisonVisualization />
        </Block>
    </StackLayout>,

    // Additional challenges
    <StackLayout key="layout-additional-challenges" maxWidth="xl">
        <Block id="additional-challenges" padding="sm">
            <EditableParagraph id="para-additional-challenges" blockId="additional-challenges">
                There are other challenges too. Graphs come in different sizes — one molecule might have 10 atoms, another might have 1000. Nodes have different numbers of neighbors — some are hubs with many connections, others are on the periphery with few. Standard neural networks struggle with all of this variability.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Assessment question
    <StackLayout key="layout-assessment-order" maxWidth="xl">
        <Block id="assessment-order" padding="md">
            <EditableParagraph id="para-assessment-order" blockId="assessment-order">
                The main reason graphs cannot be fed directly into traditional neural networks is that graphs have{" "}
                <InlineFeedback
                    varName="answerWhyNotGrid"
                    correctValue="no fixed order"
                    position="terminal"
                    successMessage="— exactly! Unlike pixels in an image, there is no natural first, second, or third node"
                    failureMessage="— not quite"
                    hint="Think about how we labeled nodes A, B, C, D arbitrarily"
                >
                    <InlineClozeChoice
                        varName="answerWhyNotGrid"
                        correctAnswer="no fixed order"
                        options={["too many nodes", "no fixed order", "edges are curved", "nodes have colors"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerWhyNotGrid"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Transition to solution
    <StackLayout key="layout-solution-hint" maxWidth="xl">
        <Block id="solution-hint" padding="sm">
            <EditableParagraph id="para-solution-hint" blockId="solution-hint">
                So how do we build neural networks that respect graph structure? The key insight is surprisingly simple: instead of trying to impose an order on nodes, we let each node learn from its neighbors. This is the foundation of Graph Neural Networks.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
