

export function isSpecialLine(text: string): boolean {
    const trimmed = text.trim();
    return (
        trimmed.startsWith("```") ||
        trimmed.endsWith("```") ||
        trimmed.startsWith("![](") ||
        trimmed.includes("|")
    );
}

export function estimateWrappedHeight(text: string, wrapWidth: number, lineHeight: number): number {
    if (isSpecialLine(text)) return 100;
    const lineLength = text.length;
    const wrapCount = Math.ceil(lineLength / wrapWidth) || 1;
    return wrapCount * lineHeight;
}
