// Local JavaScript runner for simple cases
export const runJavaScriptLocally = (code) => {
  try {
    // Create a safe execution environment
    const logs = [];

    // Override console.log to capture output
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      logs.push(args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' '));
    };

    // Execute the code
    const result = eval(code);

    // Restore console.log
    console.log = originalConsoleLog;

    // Return captured output and result
    const output = logs.length > 0 ? logs.join('\n') : '';
    const resultOutput = result !== undefined ? `\nReturn value: ${result}` : '';

    return {
      success: true,
      output: output + resultOutput || 'Program executed successfully with no output'
    };

  } catch (error) {
    return {
      success: false,
      output: `Runtime Error: ${error.message}\n\nStack trace:\n${error.stack}`
    };
  }
};

// Simple Python-like syntax runner (limited functionality)
export const runPythonLike = (code) => {
  try {
    // Basic Python print() to console.log() conversion
    let jsCode = code
      .replace(/print\((.*?)\)/g, 'console.log($1)')
      .replace(/def\s+(\w+)\s*\((.*?)\):/g, 'function $1($2) {')
      .replace(/if\s+(.*?):/g, 'if ($1) {')
      .replace(/else:/g, '} else {')
      .replace(/elif\s+(.*?):/g, '} else if ($1) {')
      .replace(/for\s+(\w+)\s+in\s+range\((\d+)\):/g, 'for (let $1 = 0; $1 < $2; $1++) {')
      .replace(/^\s*(.+)$/gm, (match, line) => {
        if (line.trim().endsWith(':')) return line.replace(/:$/, ' {');
        return line;
      });

    // Add closing braces for indented blocks (basic implementation)
    const lines = jsCode.split('\n');
    const result = [];
    const indentStack = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const indent = line.search(/\S/);

      if (indent === -1) {
        result.push(line);
        continue;
      }

      while (indentStack.length > 0 && indentStack[indentStack.length - 1] >= indent) {
        indentStack.pop();
        result.push(' '.repeat(indent) + '}');
      }

      if (line.trim().endsWith('{')) {
        indentStack.push(indent);
      }

      result.push(line);
    }

    // Close remaining braces
    while (indentStack.length > 0) {
      indentStack.pop();
      result.push('}');
    }

    return runJavaScriptLocally(result.join('\n'));

  } catch (error) {
    return {
      success: false,
      output: `Python-to-JS conversion error: ${error.message}`
    };
  }
};
