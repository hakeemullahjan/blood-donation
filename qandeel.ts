// qandeel.ts

// Function to generate Fibonacci sequence up to n numbers
function fibonacci(n: number): number[] {
    const sequence: number[] = [0, 1];
    for (let i = 2; i < n; i++) {
        sequence.push(sequence[i - 1] + sequence[i - 2]);
    }
    return sequence;
}

// Example usage
const fibSequence = fibonacci(10);
console.log(fibSequence);