import type { RunCodeParams, RunResult, TestResult } from "@/types";

/**
 * Sandboxed JavaScript code runner.
 * Phase 4 will move execution to a Web Worker for isolation.
 */
export async function runCode(params: RunCodeParams): Promise<RunResult> {
  const { code, testCases } = params;
  const start = performance.now();
  const results: TestResult[] = [];

  for (let i = 0; i < testCases.length; i++) {
    const tc = testCases[i];
    try {
      const fn = new Function(`${code}; return typeof twoSum === 'function' ? twoSum : (typeof solution === 'function' ? solution : null);`)();
      if (typeof fn !== "function") {
        results.push({
          index: i,
          passed: false,
          input: tc.input,
          expected: tc.expected,
          error: "No solution function found (expected twoSum or solution)",
          hidden: tc.hidden,
        });
        continue;
      }

      const args = JSON.parse(tc.input.replace(/^\[\[/, "[").replace(/\]\]$/, "]"));
      const actual = fn(...(Array.isArray(args[0]) ? args : [args]));
      const actualStr = JSON.stringify(actual);
      const passed = actualStr === tc.expected;

      results.push({
        index: i,
        passed,
        input: tc.input,
        expected: tc.expected,
        actual: tc.hidden && !passed ? undefined : actualStr,
        hidden: tc.hidden,
      });
    } catch (err) {
      results.push({
        index: i,
        passed: false,
        input: tc.input,
        expected: tc.expected,
        error: err instanceof Error ? err.message : String(err),
        hidden: tc.hidden,
      });
    }
  }

  return {
    passed: results.every((r) => r.passed),
    results,
    runtimeMs: Math.round(performance.now() - start),
  };
}
