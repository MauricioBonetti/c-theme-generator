export function generateCss(data) {
    const variables = Object.entries(data).map(([key, value]) => {
        if(!value) return null;
        return `--${key}: ${value};`;
    }).filter(Boolean).join('\n\t');

    return `body {
    ${variables}
}`;
}