import { type ReactElement } from "react";
import { StackLayout, SplitLayout, GridLayout } from "@/components/layouts";
import { Block } from "@/components/templates";
import {
    EditableH2,
    EditableH3,
    EditableParagraph,
    InlineToggle,
    InlineFeedback,
    InlineClozeChoice,
    InteractionHintSequence,
} from "@/components/atoms";
import {
    getVariableInfo,
    togglePropsFromDefinition,
    choicePropsFromDefinition,
} from "../variables";
import { useVar } from "@/stores";

// ── Application Cards ─────────────────────────────────────────────────────────

function ApplicationCard({
    title,
    description,
    icon,
    examples,
    color,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    examples: string[];
    color: string;
}) {
    return (
        <div
            className="p-5 rounded-xl bg-white border-2 transition-all hover:shadow-md"
            style={{ borderColor: color }}
        >
            <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${color}20` }}
            >
                <div style={{ color }}>{icon}</div>
            </div>
            <h4 className="font-semibold text-slate-800 mb-2">{title}</h4>
            <p className="text-sm text-slate-600 mb-3">{description}</p>
            <div className="space-y-1">
                {examples.map((ex, i) => (
                    <div key={i} className="text-xs text-slate-500 flex items-center gap-2">
                        <div
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ backgroundColor: color }}
                        />
                        {ex}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── Interactive Application Showcase ──────────────────────────────────────────

function ApplicationShowcase() {
    const app = useVar("applicationExample", "social") as string;

    const applications: Record<
        string,
        { nodes: Array<{ id: string; x: number; y: number; label: string; color: string }>; edges: Array<{ from: string; to: string }>; description: string }
    > = {
        social: {
            nodes: [
                { id: "1", x: 100, y: 80, label: "You", color: "#62D0AD" },
                { id: "2", x: 50, y: 160, label: "Friend", color: "#8E90F5" },
                { id: "3", x: 150, y: 160, label: "Friend", color: "#8E90F5" },
                { id: "4", x: 25, y: 240, label: "?", color: "#F7B23B" },
                { id: "5", x: 100, y: 240, label: "?", color: "#F7B23B" },
            ],
            edges: [
                { from: "1", to: "2" },
                { from: "1", to: "3" },
                { from: "2", to: "4" },
                { from: "2", to: "5" },
                { from: "3", to: "5" },
            ],
            description: "GNNs predict who you might want to connect with based on mutual friends",
        },
        molecule: {
            nodes: [
                { id: "1", x: 100, y: 60, label: "C", color: "#64748b" },
                { id: "2", x: 60, y: 120, label: "O", color: "#ef4444" },
                { id: "3", x: 140, y: 120, label: "N", color: "#6366F1" },
                { id: "4", x: 60, y: 200, label: "H", color: "#94a3b8" },
                { id: "5", x: 140, y: 200, label: "H", color: "#94a3b8" },
            ],
            edges: [
                { from: "1", to: "2" },
                { from: "1", to: "3" },
                { from: "2", to: "4" },
                { from: "3", to: "5" },
            ],
            description: "GNNs predict molecular properties like toxicity or drug effectiveness",
        },
        recommendation: {
            nodes: [
                { id: "1", x: 50, y: 100, label: "👤", color: "#62D0AD" },
                { id: "2", x: 50, y: 200, label: "👤", color: "#62D0AD" },
                { id: "3", x: 150, y: 80, label: "🎬", color: "#8E90F5" },
                { id: "4", x: 150, y: 150, label: "🎬", color: "#8E90F5" },
                { id: "5", x: 150, y: 220, label: "?", color: "#F7B23B" },
            ],
            edges: [
                { from: "1", to: "3" },
                { from: "1", to: "4" },
                { from: "2", to: "3" },
                { from: "2", to: "4" },
                { from: "2", to: "5" },
            ],
            description: "GNNs suggest products or content based on connections between users and items",
        },
    };

    const currentApp = applications[app];

    return (
        <div className="bg-white rounded-lg p-4">
            <svg width="200" height="280" viewBox="0 0 200 280" className="mx-auto">
                {/* Edges */}
                {currentApp.edges.map((edge, i) => {
                    const from = currentApp.nodes.find((n) => n.id === edge.from)!;
                    const to = currentApp.nodes.find((n) => n.id === edge.to)!;
                    return (
                        <line
                            key={i}
                            x1={from.x}
                            y1={from.y}
                            x2={to.x}
                            y2={to.y}
                            stroke="#cbd5e1"
                            strokeWidth={2}
                        />
                    );
                })}

                {/* Nodes */}
                {currentApp.nodes.map((node) => (
                    <g key={node.id}>
                        <circle
                            cx={node.x}
                            cy={node.y}
                            r={24}
                            fill={node.color}
                            stroke="white"
                            strokeWidth={2}
                        />
                        <text
                            x={node.x}
                            y={node.y + 5}
                            textAnchor="middle"
                            fill="white"
                            fontSize="12"
                            fontWeight="bold"
                        >
                            {node.label}
                        </text>
                    </g>
                ))}
            </svg>
            <p className="text-sm text-slate-600 text-center mt-2">{currentApp.description}</p>
        </div>
    );
}

// ── Key Concepts Summary ──────────────────────────────────────────────────────

function KeyConceptCard({
    number,
    title,
    description,
}: {
    number: number;
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-4 items-start">
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                style={{ backgroundColor: "#62D0AD" }}
            >
                {number}
            </div>
            <div>
                <h4 className="font-semibold text-slate-800 mb-1">{title}</h4>
                <p className="text-sm text-slate-600">{description}</p>
            </div>
        </div>
    );
}

// ── Section Blocks ────────────────────────────────────────────────────────────

export const section5Blocks: ReactElement[] = [
    // Section heading
    <StackLayout key="layout-summary-heading" maxWidth="xl">
        <Block id="summary-heading" padding="md">
            <EditableH2 id="h2-summary" blockId="summary-heading">
                Putting It Together
            </EditableH2>
        </Block>
    </StackLayout>,

    // What we learned
    <StackLayout key="layout-summary-intro" maxWidth="xl">
        <Block id="summary-intro" padding="sm">
            <EditableParagraph id="para-summary-intro" blockId="summary-intro">
                We have journeyed from molecules to message passing. Let us consolidate what we have discovered about Graph Neural Networks.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Key concepts
    <StackLayout key="layout-key-concepts" maxWidth="xl">
        <Block id="key-concepts" padding="md">
            <div className="space-y-6 py-2">
                <KeyConceptCard
                    number={1}
                    title="Graphs capture relationships"
                    description="From molecules to social networks, graphs represent entities (nodes) and their connections (edges). The structure of relationships is what matters."
                />
                <KeyConceptCard
                    number={2}
                    title="Graphs have no natural order"
                    description="Unlike images with fixed pixel positions, there is no first or last node in a graph. This makes traditional neural networks ill-suited for graph data."
                />
                <KeyConceptCard
                    number={3}
                    title="Nodes learn from neighbors"
                    description="Graph Neural Networks work by passing messages between connected nodes. Each node gathers information from its neighbors to build a richer representation."
                />
            </div>
        </Block>
    </StackLayout>,

    // Real-world applications heading
    <StackLayout key="layout-applications-heading" maxWidth="xl">
        <Block id="applications-heading" padding="sm">
            <EditableH3 id="h3-applications" blockId="applications-heading">
                GNNs in the Real World
            </EditableH3>
        </Block>
    </StackLayout>,

    // Interactive application exploration
    <SplitLayout key="layout-applications-viz" ratio="1:1" gap="lg">
        <Block id="applications-text" padding="sm">
            <EditableParagraph id="para-applications-text" blockId="applications-text">
                Graph Neural Networks power many technologies you use daily. Explore different applications by selecting:{" "}
                <InlineToggle
                    id="toggle-application"
                    varName="applicationExample"
                    options={["social", "molecule", "recommendation"]}
                    {...togglePropsFromDefinition(getVariableInfo("applicationExample"))}
                />
                . In each case, the graph structure captures relationships that help make predictions — whether about friendships, chemical properties, or personal preferences.
            </EditableParagraph>
        </Block>
        <Block id="applications-viz" padding="sm" hasVisualization>
            <div className="relative">
                <ApplicationShowcase />
                <InteractionHintSequence
                    hintKey="application-toggle-hint"
                    steps={[
                        {
                            gesture: "click",
                            label: "Click to explore applications",
                            position: { x: "50%", y: "20%" },
                        },
                    ]}
                />
            </div>
        </Block>
    </SplitLayout>,

    // Application cards
    <GridLayout key="layout-application-cards" columns={3} gap="md">
        <Block id="card-social" padding="sm">
            <ApplicationCard
                title="Social Networks"
                description="Understanding communities and predicting connections"
                icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                    </svg>
                }
                examples={["Friend suggestions", "Community detection", "Influence analysis"]}
                color="#62D0AD"
            />
        </Block>
        <Block id="card-molecule" padding="sm">
            <ApplicationCard
                title="Drug Discovery"
                description="Predicting molecular properties and interactions"
                icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="8" cy="8" r="3" />
                        <circle cx="16" cy="16" r="3" />
                        <line x1="10" y1="10" x2="14" y2="14" />
                    </svg>
                }
                examples={["Toxicity prediction", "Drug-target interaction", "Molecule generation"]}
                color="#8E90F5"
            />
        </Block>
        <Block id="card-recommendation" padding="sm">
            <ApplicationCard
                title="Recommendations"
                description="Personalizing content and product suggestions"
                icon={
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
                    </svg>
                }
                examples={["Movie recommendations", "Product suggestions", "Content curation"]}
                color="#F7B23B"
            />
        </Block>
    </GridLayout>,

    // Final assessment
    <StackLayout key="layout-final-assessment" maxWidth="xl">
        <Block id="final-assessment" padding="md">
            <EditableParagraph id="para-final-assessment" blockId="final-assessment">
                Graph Neural Networks can be applied to{" "}
                <InlineFeedback
                    varName="answerGnnApplication"
                    correctValue="all of these"
                    position="terminal"
                    successMessage="— exactly! Any data with meaningful relationships can benefit from GNNs"
                    failureMessage="— think bigger"
                    hint="GNNs work wherever relationships between entities matter"
                >
                    <InlineClozeChoice
                        varName="answerGnnApplication"
                        correctAnswer="all of these"
                        options={["only molecules", "only social networks", "only recommendations", "all of these"]}
                        {...choicePropsFromDefinition(getVariableInfo("answerGnnApplication"))}
                    />
                </InlineFeedback>.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // Closing thoughts
    <StackLayout key="layout-closing" maxWidth="xl">
        <Block id="closing" padding="sm">
            <EditableParagraph id="para-closing" blockId="closing">
                You now have the foundational intuition for Graph Neural Networks. The key insight — that nodes learn by exchanging information with their neighbors — underpins an entire field of research. From here, you might explore specific architectures like Graph Convolutional Networks, Graph Attention Networks, or Message Passing Neural Networks. Each builds on these same principles while adding sophisticated ways to aggregate and transform neighborhood information.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    // What's next
    <StackLayout key="layout-next-steps" maxWidth="xl">
        <Block id="next-steps" padding="md">
            <EditableParagraph id="para-next-steps" blockId="next-steps">
                The next time you see a recommendation on Netflix, a suggested connection on LinkedIn, or hear about a new drug discovery — you will know that behind the scenes, a Graph Neural Network might be hard at work, learning from the beautiful structure of relationships that connect our world.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
