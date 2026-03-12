/**
 * Variables Configuration
 * =======================
 *
 * CENTRAL PLACE TO DEFINE ALL SHARED VARIABLES
 *
 * This file defines all variables that can be shared across sections.
 * AI agents should read this file to understand what variables are available.
 *
 * USAGE:
 * 1. Define variables here with their default values and metadata
 * 2. Use them in any section with: const x = useVar('variableName', defaultValue)
 * 3. Update them with: setVar('variableName', newValue)
 */

import { type VarValue } from '@/stores';

/**
 * Variable definition with metadata
 */
export interface VariableDefinition {
    /** Default value */
    defaultValue: VarValue;
    /** Human-readable label */
    label?: string;
    /** Description for AI agents */
    description?: string;
    /** Variable type hint */
    type?: 'number' | 'text' | 'boolean' | 'select' | 'array' | 'object' | 'spotColor' | 'linkedHighlight';
    /** Unit (e.g., 'Hz', '°', 'm/s') - for numbers */
    unit?: string;
    /** Minimum value (for number sliders) */
    min?: number;
    /** Maximum value (for number sliders) */
    max?: number;
    /** Step increment (for number sliders) */
    step?: number;
    /** Display color for InlineScrubbleNumber / InlineSpotColor (e.g. '#D81B60') */
    color?: string;
    /** Options for 'select' type variables */
    options?: string[];
    /** Placeholder text for text inputs */
    placeholder?: string;
    /** Correct answer for cloze input validation */
    correctAnswer?: string;
    /** Whether cloze matching is case sensitive */
    caseSensitive?: boolean;
    /** Background color for inline components */
    bgColor?: string;
    /** Schema hint for object types (for AI agents) */
    schema?: string;
}

/**
 * =====================================================
 * 🎯 DEFINE YOUR VARIABLES HERE
 * =====================================================
 */
export const variableDefinitions: Record<string, VariableDefinition> = {
    // ========================================
    // SECTION 1: Graphs Are Everywhere
    // ========================================

    moleculeHighlight: {
        defaultValue: null,
        type: 'linkedHighlight',
        label: 'Molecule Highlight',
        description: 'Active highlight for molecule diagram',
        color: '#6366F1',
        bgColor: 'rgba(99, 102, 241, 0.15)',
    },

    // ========================================
    // SECTION 2: What Makes a Graph a Graph
    // ========================================

    selectedNode: {
        defaultValue: 'none',
        type: 'text',
        label: 'Selected Node',
        description: 'Currently selected node in the graph',
    },

    nodeCount: {
        defaultValue: 5,
        type: 'number',
        label: 'Number of Nodes',
        description: 'How many nodes in the example graph',
        min: 3,
        max: 8,
        step: 1,
        color: '#62D0AD',
    },

    edgeCount: {
        defaultValue: 6,
        type: 'number',
        label: 'Number of Edges',
        description: 'How many edges in the example graph',
        min: 2,
        max: 15,
        step: 1,
        color: '#8E90F5',
    },

    nodeDegree: {
        defaultValue: 2,
        type: 'number',
        label: 'Node Degree',
        description: 'Number of connections for a node',
        min: 0,
        max: 7,
        step: 1,
        color: '#F7B23B',
    },

    graphHighlight: {
        defaultValue: null,
        type: 'linkedHighlight',
        label: 'Graph Highlight',
        description: 'Active highlight for graph vocabulary',
        color: '#62D0AD',
        bgColor: 'rgba(98, 208, 173, 0.15)',
    },

    // Assessment questions Section 2
    answerNodeDefinition: {
        defaultValue: '',
        type: 'text',
        label: 'Node Definition Answer',
        description: 'Student answer for what a node represents',
        placeholder: '???',
        correctAnswer: 'entity',
        color: '#3B82F6',
    },

    answerEdgeDefinition: {
        defaultValue: '',
        type: 'select',
        label: 'Edge Definition Answer',
        description: 'Student answer for what an edge represents',
        placeholder: '???',
        correctAnswer: 'connection',
        options: ['entity', 'connection', 'number', 'label'],
        color: '#8E90F5',
    },

    answerDegreeCalculation: {
        defaultValue: '',
        type: 'text',
        label: 'Degree Calculation Answer',
        description: 'Student answer for degree of node B',
        placeholder: '???',
        correctAnswer: '3',
        color: '#F7B23B',
    },

    // ========================================
    // SECTION 3: Why Not Regular Neural Networks
    // ========================================

    gridSize: {
        defaultValue: 4,
        type: 'number',
        label: 'Grid Size',
        description: 'Size of the image grid',
        min: 2,
        max: 6,
        step: 1,
        color: '#62D0AD',
    },

    permutationIndex: {
        defaultValue: 0,
        type: 'number',
        label: 'Permutation Index',
        description: 'Which node ordering to show',
        min: 0,
        max: 5,
        step: 1,
        color: '#8E90F5',
    },

    dataType: {
        defaultValue: 'image',
        type: 'select',
        label: 'Data Type',
        description: 'Type of data being visualized',
        options: ['image', 'graph'],
        color: '#AC8BF9',
    },

    answerWhyNotGrid: {
        defaultValue: '',
        type: 'select',
        label: 'Why Not Grid Answer',
        description: 'Student answer for why graphs cant be grids',
        placeholder: '???',
        correctAnswer: 'no fixed order',
        options: ['too many nodes', 'no fixed order', 'edges are curved', 'nodes have colors'],
        color: '#62CCF9',
    },

    // ========================================
    // SECTION 4: Learning from Neighbors
    // ========================================

    messagePassingStep: {
        defaultValue: 0,
        type: 'number',
        label: 'Message Passing Step',
        description: 'Current step in message passing visualization',
        min: 0,
        max: 3,
        step: 1,
        color: '#62D0AD',
    },

    neighborhoodRadius: {
        defaultValue: 1,
        type: 'number',
        label: 'Neighborhood Radius',
        description: 'How many hops to consider as neighbors',
        min: 1,
        max: 3,
        step: 1,
        color: '#F7B23B',
    },

    focusNode: {
        defaultValue: 'A',
        type: 'select',
        label: 'Focus Node',
        description: 'Which node to focus on for neighborhood exploration',
        options: ['A', 'B', 'C', 'D', 'E'],
        color: '#8E90F5',
    },

    neighborHighlight: {
        defaultValue: null,
        type: 'linkedHighlight',
        label: 'Neighbor Highlight',
        description: 'Highlight for neighbor visualization',
        color: '#F7B23B',
        bgColor: 'rgba(247, 178, 59, 0.15)',
    },

    answerNeighborCount: {
        defaultValue: '',
        type: 'text',
        label: 'Neighbor Count Answer',
        description: 'Student answer for number of 1-hop neighbors',
        placeholder: '???',
        correctAnswer: '3',
        color: '#62D0AD',
    },

    answerMessagePassing: {
        defaultValue: '',
        type: 'select',
        label: 'Message Passing Answer',
        description: 'Student answer about message passing',
        placeholder: '???',
        correctAnswer: 'neighbors',
        options: ['all nodes', 'neighbors', 'random nodes', 'itself only'],
        color: '#8E90F5',
    },

    // ========================================
    // SECTION 5: Putting It Together
    // ========================================

    applicationExample: {
        defaultValue: 'social',
        type: 'select',
        label: 'Application Example',
        description: 'Which GNN application to show',
        options: ['social', 'molecule', 'recommendation'],
        color: '#AC8BF9',
    },

    answerGnnApplication: {
        defaultValue: '',
        type: 'select',
        label: 'GNN Application Answer',
        description: 'Student answer about GNN applications',
        placeholder: '???',
        correctAnswer: 'all of these',
        options: ['only molecules', 'only social networks', 'only recommendations', 'all of these'],
        color: '#62D0AD',
    },
};

/**
 * Get all variable names (for AI agents to discover)
 */
export const getVariableNames = (): string[] => {
    return Object.keys(variableDefinitions);
};

/**
 * Get a variable's default value
 */
export const getDefaultValue = (name: string): VarValue => {
    return variableDefinitions[name]?.defaultValue ?? 0;
};

/**
 * Get a variable's metadata
 */
export const getVariableInfo = (name: string): VariableDefinition | undefined => {
    return variableDefinitions[name];
};

/**
 * Get all default values as a record (for initialization)
 */
export const getDefaultValues = (): Record<string, VarValue> => {
    const defaults: Record<string, VarValue> = {};
    for (const [name, def] of Object.entries(variableDefinitions)) {
        defaults[name] = def.defaultValue;
    }
    return defaults;
};

/**
 * Get number props for InlineScrubbleNumber from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
export function numberPropsFromDefinition(def: VariableDefinition | undefined): {
    defaultValue?: number;
    min?: number;
    max?: number;
    step?: number;
    color?: string;
} {
    if (!def || def.type !== 'number') return {};
    return {
        defaultValue: def.defaultValue as number,
        min: def.min,
        max: def.max,
        step: def.step,
        ...(def.color ? { color: def.color } : {}),
    };
}

/**
 * Get cloze input props for InlineClozeInput from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx, or getExampleVariableInfo(name) in exampleBlocks.tsx.
 */
/**
 * Get cloze choice props for InlineClozeChoice from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function choicePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Get toggle props for InlineToggle from a variable definition.
 * Use with getVariableInfo(name) in blocks.tsx.
 */
export function togglePropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    if (!def || def.type !== 'select') return {};
    return {
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

export function clozePropsFromDefinition(def: VariableDefinition | undefined): {
    placeholder?: string;
    color?: string;
    bgColor?: string;
    caseSensitive?: boolean;
} {
    if (!def || def.type !== 'text') return {};
    return {
        ...(def.placeholder ? { placeholder: def.placeholder } : {}),
        ...(def.color ? { color: def.color } : {}),
        ...(def.bgColor ? { bgColor: def.bgColor } : {}),
        ...(def.caseSensitive !== undefined ? { caseSensitive: def.caseSensitive } : {}),
    };
}

/**
 * Get spot-color props for InlineSpotColor from a variable definition.
 * Extracts the `color` field.
 *
 * @example
 * <InlineSpotColor
 *     varName="radius"
 *     {...spotColorPropsFromDefinition(getVariableInfo('radius'))}
 * >
 *     radius
 * </InlineSpotColor>
 */
export function spotColorPropsFromDefinition(def: VariableDefinition | undefined): {
    color: string;
} {
    return {
        color: def?.color ?? '#8B5CF6',
    };
}

/**
 * Get linked-highlight props for InlineLinkedHighlight from a variable definition.
 * Extracts the `color` and `bgColor` fields.
 *
 * @example
 * <InlineLinkedHighlight
 *     varName="activeHighlight"
 *     highlightId="radius"
 *     {...linkedHighlightPropsFromDefinition(getVariableInfo('activeHighlight'))}
 * >
 *     radius
 * </InlineLinkedHighlight>
 */
export function linkedHighlightPropsFromDefinition(def: VariableDefinition | undefined): {
    color?: string;
    bgColor?: string;
} {
    return {
        ...(def?.color ? { color: def.color } : {}),
        ...(def?.bgColor ? { bgColor: def.bgColor } : {}),
    };
}

/**
 * Build the `variables` prop for FormulaBlock from variable definitions.
 *
 * Takes an array of variable names and returns the config map expected by
 * `<FormulaBlock variables={...} />`.
 *
 * @example
 * import { scrubVarsFromDefinitions } from './variables';
 *
 * <FormulaBlock
 *     latex="\scrub{mass} \times \scrub{accel}"
 *     variables={scrubVarsFromDefinitions(['mass', 'accel'])}
 * />
 */
export function scrubVarsFromDefinitions(
    varNames: string[],
): Record<string, { min?: number; max?: number; step?: number; color?: string }> {
    const result: Record<string, { min?: number; max?: number; step?: number; color?: string }> = {};
    for (const name of varNames) {
        const def = variableDefinitions[name];
        if (!def) continue;
        result[name] = {
            ...(def.min !== undefined ? { min: def.min } : {}),
            ...(def.max !== undefined ? { max: def.max } : {}),
            ...(def.step !== undefined ? { step: def.step } : {}),
            ...(def.color ? { color: def.color } : {}),
        };
    }
    return result;
}
