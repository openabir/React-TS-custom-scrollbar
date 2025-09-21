# Performance Benchmarking Guide

This document provides guidance on how to run performance benchmarks for the React Custom Scrollbar component and how to interpret the results.

## Running Benchmarks

To run the benchmarks, use the following command:

```bash
npm run benchmark
```

This will execute the benchmark suite and output the results to the console.

## Benchmark Suite

The benchmark suite includes the following tests:

1. **Small content** (100 items) - Tests rendering performance with a small amount of content
2. **Medium content** (1000 items) - Tests rendering performance with a medium amount of content
3. **Large content** (5000 items) - Tests rendering performance with a large amount of content
4. **Auto-hide enabled** - Tests performance with auto-hide functionality enabled
5. **Custom render functions** - Tests performance with custom rendering functions
6. **Accessibility features** - Tests performance with accessibility features enabled
7. **All features enabled** - Tests performance with all features enabled simultaneously

## Interpreting Results

The benchmark results will show operations per second for each test. Higher numbers are better.

Example output:

```
Render with small content (100 items) x 150 ops/sec ±1.20% (85 runs sampled)
Render with medium content (1000 items) x 25 ops/sec ±0.89% (65 runs sampled)
Render with large content (5000 items) x 5 ops/sec ±1.56% (30 runs sampled)
...
```

## Performance Recommendations

Based on benchmark results, consider the following recommendations:

1. **Content Size**: For optimal performance, limit the number of elements within the scrollable area. If you need to render thousands of items, consider using virtualization techniques.

2. **Auto-Hide**: The auto-hide feature adds a small performance overhead due to additional state management and animations. Only enable it when necessary.

3. **Custom Renderers**: Complex custom render functions can impact performance. Keep custom renderers as simple as possible.

4. **Accessibility**: While accessibility features add some overhead, they provide essential functionality for users with disabilities and should generally be enabled.

## Comparing Results

When making changes to the component, run benchmarks before and after to ensure you're not introducing performance regressions. Save the benchmark results in a file for comparison:

```bash
npm run benchmark > benchmark-results-before.txt
# Make changes
npm run benchmark > benchmark-results-after.txt
```

Then compare the results to ensure performance hasn't degraded significantly.
