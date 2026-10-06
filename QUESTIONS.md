# Accenture Drive Prep — Questions (Hours 3–14)

All practice questions from the presentation deck, organized by topic and hour block.

---

# Hours 3–4: Problem Types

## Topic 1 — Largest & Second Largest

### Q1. Second Largest Element
**Difficulty:** Easy

Given an array of integers `arr` of size `n`, find the second largest element. Duplicates of the maximum are allowed (i.e. if the array is `[10, 10, 5]`, answer is `10`). If fewer than 2 distinct positions exist, return a sentinel (`-1`).

**Input:** `arr = [10, 20, 4, 45, 99]`  
**Output:** `45`

**Note:** Second largest position after sorting descending.

**Hint:** Keep two variables — largest and second-largest — and update them in one pass.

---

### Q2. Second Largest Distinct Value
**Difficulty:** Medium

Find the second largest distinct value in the array. Ignore duplicates of the maximum: for `[10, 10, 5]` the answer is `5`. Return `-1` if all elements are equal.

**Input:** `arr = [12, 35, 1, 10, 34, 1]`  
**Output:** `34`

**Hint:** Same as basic extrema — but only accept a new max when `x` is strictly greater, and skip equals.

---

## Topic 2 — Missing & Duplicate

### Q3. Missing Number in 1..N
**Difficulty:** Easy

An array `nums` contains `n` distinct numbers taken from `0, 1, 2, ..., n`. Exactly one number is missing. Find it in linear time and without using extra space.

**Input:** `nums = [3, 0, 1]`  
**Output:** `2`

**Note:** `n = 3`, range is `0..3`.

**Hint:** Sum of `0..n` is known in closed form — the missing number is the difference.

---

### Q4. Find the Duplicate Number
**Difficulty:** Medium

Given an array `nums` of size `n + 1` where each element is an integer in `[1, n]` and at least one value appears twice, find the duplicated value without modifying the array and in better than O(n²) time. Follow-up: constant extra space.

**Input:** `nums = [1, 3, 4, 2, 2]`  
**Output:** `2`

**Hint:** Values are valid indices — the duplicate creates a cycle. Use Floyd tortoise & hare.

---

## Topic 3 — Array Rotation

### Q5. Rotate Array Left by K
**Difficulty:** Easy

Rotate the array to the left by `k` positions in place. Example: `[1,2,3,4,5]`, `k=2` becomes `[3,4,5,1,2]`. `k` may be larger than `n` — reduce it modulo `n` first.

**Input:** `arr = [1, 2, 3, 4, 5], k = 2`  
**Output:** `[3, 4, 5, 1, 2]`

**Hint:** Normalize `k` with `% n`, then use the three-reverse technique — no extra array needed.

---

### Q6. Check If One Array Is a Rotation of Another
**Difficulty:** Medium

Given two arrays `a` and `b` of the same length, determine whether `b` can be obtained by rotating `a`. Each element is an integer; arrays may contain duplicates.

**Input:** `a = [1, 2, 3, 4, 5], b = [3, 4, 5, 1, 2]`  
**Output:** `true`

**Hint:** Every rotation of `a` appears inside `a` concatenated with itself — substring search does the rest.

---

## Topic 4 — Frequency Counting

### Q7. Most Frequent Element
**Difficulty:** Easy

Given an unsorted array, return the element with the highest frequency. If several elements tie, return any one of them.

**Input:** `arr = [1, 3, 2, 1, 4, 1, 3]`  
**Output:** `1`

**Hint:** One hash-map pass: increment counts and track the running best as you go.

---

### Q8. First Non-Repeating Element
**Difficulty:** Medium

Return the first element in the array that occurs exactly once. If no such element exists, return `-1`.

**Input:** `arr = [9, 4, 9, 6, 7, 4]`  
**Output:** `6`

**Hint:** Count first, then walk the original order and return the first count-1 value.

---

## Topic 5 — Palindrome

### Q9. Basic Palindrome Check
**Difficulty:** Easy

Given a string `s`, determine whether it reads the same forwards and backwards. Consider only the characters present — no case folding or filtering in this variant.

**Input:** `s = "racecar"`  
**Output:** `true`

**Hint:** Two pointers from both ends — mismatch means false, otherwise move inward.

---

### Q10. Alphanumeric Palindrome (Ignore Case & Symbols)
**Difficulty:** Medium

Given a string, return `true` if it is a palindrome considering only alphanumeric characters and ignoring cases. Non-alphanumeric characters are skipped.

**Input:** `s = "A man, a plan, a canal: Panama"`  
**Output:** `true`

**Note:** Normalized form is `"amanaplanacanalpanama"`.

**Hint:** Same two pointers — but skip non-alphanumerics and compare lowercased characters.

---

## Topic 6 — Anagram

### Q11. Valid Anagram (Count Method)
**Difficulty:** Easy

Given two strings `s` and `t`, return `true` if `t` is an anagram of `s` — same characters with the same frequencies, different order. Assume lowercase English letters.

**Input:** `s = "anagram", t = "nagaram"`  
**Output:** `true`

**Hint:** Lengths must match; then +1 for each char in `s` and −1 for each in `t` — end at all zeros.

---

### Q12. Anagram Ignoring Case & Spaces
**Difficulty:** Medium

Return `true` if the two strings are anagrams after removing all spaces and converting to lowercase. Example: `"Dormitory"` and `"Dirty Room"` are anagrams.

**Input:** `s = "Dormitory", t = "Dirty Room"`  
**Output:** `true`

**Hint:** Drop spaces and lowercase while counting — no need to build new strings first.

---

## Topic 7 — Character & Word Frequency

### Q13. Character Frequency Map
**Difficulty:** Easy

Given a string, build and return the frequency of each character. For interview purposes, print or return every character with its count (order does not matter).

**Input:** `s = "accenture"`  
**Output:** `a:1, c:2, e:2, n:1, t:1, u:1`

**Hint:** `map[ch] += 1` for every character — one pass is enough.

---

### Q14. Most Frequent Word in a Sentence
**Difficulty:** Medium

Given a sentence, find the word that appears most often. Words are separated by whitespace; comparisons are case-insensitive; punctuation may be attached to words and should be ignored.

**Input:** `s = "the cat and the hat and the mat"`  
**Output:** `the`

**Hint:** Tokenize on letters only, lowercase everything, then reuse the most-frequent-element pattern.

---

## Topic 8 — String Manipulation

### Q15. Reverse Words in a Sentence
**Difficulty:** Easy

Given a string of words separated by spaces, reverse the order of the words. Leading/trailing spaces should be trimmed, and multiple spaces between words treated as a single separator.

**Input:** `s = "  the sky  is blue "`  
**Output:** `"blue is sky the"`

**Hint:** Split into words, then emit them from the end — join with single spaces.

---

### Q16. Remove Duplicate Characters (Preserve Order)
**Difficulty:** Medium

Given a string, remove duplicate characters so that each character appears only once, preserving the order of first occurrence.

**Input:** `s = "banana"`  
**Output:** `"ban"`

**Hint:** A seen-set decides keep/skip while you walk left to right — order falls out naturally.

---

# Hours 5–6: Core Algorithms

## Topic 9 — Searching

### Q17. Linear Search
**Difficulty:** Easy

Given an unsorted array `arr` and a target value, return the first index where target is found. Return `-1` if the target does not exist.

**Input:** `arr = [7, 3, 9, 1, 5], target = 9`  
**Output:** `2`

**Hint:** Walk left to right; return the first index where `arr[i]` equals the target.

---

### Q18. First and Last Occurrence
**Difficulty:** Medium

Given an array (may contain duplicates) and a target, return the first and last indices where target appears. If absent, return `[-1, -1]`.

**Input:** `arr = [5, 7, 7, 8, 8, 10], target = 8`  
**Output:** `[3, 4]`

**Hint:** One linear pass: record the first hit; keep updating last on every later hit.

---

## Topic 10 — Sorting

### Q19. Bubble Sort
**Difficulty:** Easy

Sort an array of integers in non-decreasing order using bubble sort. After each outer pass, the largest unsorted value “bubbles” to the end. Return the sorted array.

**Input:** `arr = [5, 1, 4, 2, 8]`  
**Output:** `[1, 2, 4, 5, 8]`

**Hint:** Repeatedly swap adjacent out-of-order pairs; stop early if a pass makes zero swaps.

---

### Q20. Selection Sort
**Difficulty:** Easy

Sort an array in non-decreasing order using selection sort: repeatedly select the minimum from the unsorted suffix and swap it into place.

**Input:** `arr = [64, 25, 12, 22, 11]`  
**Output:** `[11, 12, 22, 25, 64]`

**Hint:** For each index `i`, find the minimum in `arr[i..n-1]` and swap it with `arr[i]`.

---

## Topic 11 — Binary Search

### Q21. Binary Search (Iterative)
**Difficulty:** Easy

Given a sorted array in ascending order and a target, find the index of the target using binary search. Return `-1` if not present. Do it iteratively.

**Input:** `arr = [2, 5, 8, 12, 16, 23], target = 16`  
**Output:** `4`

**Note:** Array must be sorted — binary search assumes order.

**Hint:** Compare target with the middle element; discard half of the range each step.

---

### Q22. First Occurrence (Lower Bound)
**Difficulty:** Medium

In a sorted array with duplicates, return the index of the first (leftmost) occurrence of target using binary search. Return `-1` if absent.

**Input:** `arr = [1, 2, 2, 2, 3], target = 2`  
**Output:** `1`

**Hint:** When `arr[mid] == target`, still go left — keep searching for an earlier hit.

---

## Topic 12 — Functions

### Q23. Sum of Digits
**Difficulty:** Easy

Write a function that takes a non-negative integer and returns the sum of its digits. Example: `1234 → 10`.

**Input:** `n = 1234`  
**Output:** `10`

**Hint:** Repeatedly take `n % 10` (last digit) and `n //= 10` until `n` becomes 0.

---

### Q24. Palindrome Number Check
**Difficulty:** Easy

Write a function that returns `true` if an integer reads the same forwards and backwards (e.g. `121 → true`, `123 → false`).

**Input:** `n = 1221`  
**Output:** `true`

**Hint:** Reverse the digits with `% 10` / `/= 10`, then compare the reversed value to the original.

---

## Topic 13 — Recursion

### Q25. Factorial Using Recursion
**Difficulty:** Easy

Compute `n!` recursively. Define `0! = 1` and `1! = 1`. For `n < 0`, treat as invalid (return `-1` or throw).

**Input:** `n = 5`  
**Output:** `120`

**Hint:** base: `n <= 1 → 1`; recursive: `n * factorial(n - 1)`.

---

### Q26. Nth Fibonacci Number
**Difficulty:** Medium

Return the nth Fibonacci number recursively, where `F(0) = 0`, `F(1) = 1`, and `F(n) = F(n-1) + F(n-2)` for `n ≥ 2`.

**Input:** `n = 7`  
**Output:** `13`

**Note:** Sequence: `0, 1, 1, 2, 3, 5, 8, 13, …`

**Hint:** Two base cases (`0→0`, `1→1`) then sum the two recursive calls.

---

## Topic 14 — Basic Mathematical Problems

### Q27. GCD of Two Numbers
**Difficulty:** Easy

Compute the greatest common divisor (GCD) of two non-negative integers using the Euclidean algorithm.

**Input:** `a = 48, b = 18`  
**Output:** `6`

**Hint:** While `b ≠ 0`: replace `(a, b)` with `(b, a % b)`. When `b` is 0, `a` is the GCD.

---

### Q28. Check If a Number Is Prime
**Difficulty:** Medium

Return `true` if the integer `n` is prime (divisible only by 1 and itself), otherwise `false`. `n` may be small or large; handle `n < 2`.

**Input:** `n = 29`  
**Output:** `true`

**Note:** `n < 2 → false`. Only need to test divisors up to `√n`.

**Hint:** Reject `n < 2`; try dividing by 2, then odd `i` up to `√n` — any divisor means not prime.

---

# Hours 7–8: Application Problems

## Topic 15 — Hashing / Dictionaries

### Q29. Two Sum (Hash Map)
**Difficulty:** Easy

Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. You may assume exactly one solution exists and you cannot use the same element twice.

**Input:** `nums = [2, 7, 11, 15], target = 9`  
**Output:** `[0, 1]`

**Hint:** For each `nums[i]`, look up `target − nums[i]` in a map of already-seen values.

---

### Q30. Intersection of Two Arrays
**Difficulty:** Medium

Given two integer arrays, return their intersection as a list of unique elements (each value appears once even if repeated in input).

**Input:** `a = [1, 2, 2, 1], b = [2, 2]`  
**Output:** `[2]`

**Hint:** Put one array in a set; for each element of the other, collect if present, then dedupe.

---

## Topic 16 — Pair-Sum Problems

### Q31. Pair With Given Sum (Two Pointers)
**Difficulty:** Easy

Given a sorted array and a target sum, return `true` if any pair of elements adds up to the target. You may sort first if the input is unsorted.

**Input:** `arr = [1, 2, 4, 6, 8, 11], target = 10`  
**Output:** `true`

**Note:** Pair `(2, 8)` or `(4, 6)` both work.

**Hint:** Pointers at both ends: sum too small → move left up; too big → move right down.

---

### Q32. Closest Pair Sum
**Difficulty:** Medium

Given a sorted array and a target, find a pair whose sum is closest to the target. Return that sum (assume at least two elements). Ties: any valid sum is fine.

**Input:** `arr = [1, 3, 4, 7, 10], target = 15`  
**Output:** `14`

**Note:** Pair `(4, 10) → 14`; `(7, 10) → 17` is farther.

**Hint:** Same two-pointer walk — track the best `|sum − target|` seen so far.

---

## Topic 17 — Matrix Problems

### Q33. Transpose of a Matrix
**Difficulty:** Easy

Given an `m × n` matrix, compute its transpose: rows become columns and columns become rows. For square matrices, do it in place (swap across the diagonal).

**Input:** `mat = [[1, 2], [3, 4]]`  
**Output:** `[[1, 3], [2, 4]]`

**Hint:** Swap `mat[i][j]` with `mat[j][i]` for `i < j` (square case), or write into a new `n × m` matrix.

---

### Q34. Rotate Matrix 90° Clockwise
**Difficulty:** Medium

Rotate an `n × n` matrix by 90 degrees clockwise in place.

**Input:** `mat = [[1, 2], [3, 4]]`  
**Output:** `[[3, 1], [4, 2]]`

**Note:** Right becomes bottom; `(i, j) → (j, n-1-i)`.

**Hint:** Transpose first (swap across diagonal), then reverse each row.

---

## Topic 18 — 2D-Array Traversal

### Q35. Search in Row-Column Sorted Matrix
**Difficulty:** Medium

Given an `m × n` matrix where each row is sorted left→right and each column is sorted top→bottom, determine whether a target value exists. Do better than O(m × n).

**Input:** `mat = [[1, 4, 7], [2, 5, 8], [3, 6, 9]], target = 5`  
**Output:** `true`

**Hint:** Start at top-right (or bottom-left): smaller → go left, larger → go down.

---

### Q36. Spiral Order Traversal
**Difficulty:** Medium

Return all elements of an `m × n` matrix in spiral (clockwise) order starting from the top-left corner.

**Input:** `mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]`  
**Output:** `[1, 2, 3, 6, 9, 8, 7, 4, 5]`

**Hint:** Maintain top/bottom/left/right bounds; peel one layer at a time and shrink them.

---

## Topic 19 — Practical Problem-Solving

### Q37. Best Time to Buy and Sell Stock
**Difficulty:** Easy

Given daily prices of a stock, choose one day to buy and a different day in the future to sell to maximize profit. Return the maximum profit (`0` if no profit is possible).

**Input:** `prices = [7, 1, 5, 3, 6, 4]`  
**Output:** `5`

**Note:** Buy at 1, sell at 6 → profit 5.

**Hint:** Track the minimum price seen so far; at each day compute `price − min_so_far`.

---

### Q38. Maximum Subarray Sum (Kadane)
**Difficulty:** Medium

Given an integer array, find the contiguous subarray with the largest sum and return that sum. (At least one element — empty subarray is not allowed.)

**Input:** `nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]`  
**Output:** `6`

**Note:** Subarray `[4, -1, 2, 1]` sums to 6.

**Hint:** Kadane: `curr = max(x, curr + x)`; track the global max of `curr`.

---

# Hours 9–10: Interview-Level Patterns

## Topic 20 — Stack and Queue Applications

### Q39. Next Greater Element
**Difficulty:** Medium

Given an array of integers, for each element find the next greater element to its right (the first element that is strictly greater). If none exists, write `-1`.

**Input:** `nums = [2, 1, 2, 4, 3]`  
**Output:** `[4, 4, 4, -1, -1]`

**Note:** Output aligns index-wise with input.

**Hint:** Process left to right; keep indices whose answer is still unknown on a stack.

---

### Q40. Queue Using Two Stacks
**Difficulty:** Easy

Implement a FIFO queue using only two stacks (LIFO). Support `enqueue(x)` and `dequeue()`. Each operation must be O(1) amortized.

**Input:** `enqueue 1, 2, 3 · dequeue`  
**Output:** `1`

**Note:** Second dequeue returns 2.

**Hint:** Pour all of stack A onto stack B only when stack B is empty.

---

## Topic 21 — Balanced Parentheses

### Q41. Valid Parentheses
**Difficulty:** Easy

Given a string containing just the characters `(){}[]`, determine if the input string is valid: brackets must close the same type in the correct order.

**Input:** `s = "([{}])"`  
**Output:** `true`

**Note:** `s = "([)]"` would be false.

**Hint:** Push opening brackets; on a closer, check it matches the stack top.

---

### Q42. Longest Valid Parentheses
**Difficulty:** Medium

Given a string containing only the characters `(` and `)`, find the length of the longest valid (well-formed) contiguous substring.

**Input:** `s = ")()())"`  
**Output:** `4`

**Note:** Substring `"()()"` has length 4.

**Hint:** Keep a stack of indices with a `-1` base so each match measures `i − stack.top()`.

---

## Topic 22 — Two Pointers

### Q43. Remove Duplicates from Sorted Array
**Difficulty:** Easy

Given a sorted array, remove duplicates in place and return the new length. The first `k` elements of the array must hold the unique values.

**Input:** `nums = [1, 1, 2, 2, 3]`  
**Output:** `3 · nums becomes [1, 2, 3, ...]`

**Hint:** A slow pointer writes unique values; a fast pointer scans ahead.

---

### Q44. Container With Most Water
**Difficulty:** Medium

Given heights of vertical lines drawn at each index, pick two lines that together with the x-axis form a container holding the most water. Return the maximum area.

**Input:** `height = [1, 8, 6, 2, 5, 4, 8, 3, 7]`  
**Output:** `49`

**Note:** Lines at index 1 (h=8) and index 8 (h=7): min 7 × width 7 = 49.

**Hint:** Start at both ends; move the shorter line inward (a taller one may beat the lost width).

---

## Topic 23 — Sliding Window

### Q45. Maximum Sum Subarray of Size K
**Difficulty:** Easy

Given an array of integers and a window size `k`, find the contiguous subarray of length `k` with the largest sum. Assume `n >= k`.

**Input:** `arr = [2, 1, 5, 1, 3, 2], k = 3`  
**Output:** `9`

**Note:** Window `[5, 1, 3]` sums to 9.

**Hint:** Keep a running window sum: add the incoming element, subtract the one leaving.

---

### Q46. Longest Substring Without Repeating Characters
**Difficulty:** Medium

Given a string `s`, find the length of the longest contiguous substring that contains no repeated characters.

**Input:** `s = "abcabcbb"`  
**Output:** `3`

**Note:** Substring `"abc"` has length 3.

**Hint:** Expand right; if `s[r]` already appears in the window, advance left past its last index.

---

## Topic 24 — Prefix Sum

### Q47. Range Sum Query
**Difficulty:** Easy

Given an integer array, preprocess it once so each query `(l, r)` returns the sum of elements from index `l` to `r` inclusive in O(1).

**Input:** `nums = [1, 2, 3, 4], query(1, 3)`  
**Output:** `9`

**Note:** 2 + 3 + 4 = 9.

**Hint:** `pref[i]` = sum of `nums[0..i−1]`; the answer is `pref[r+1] − pref[l]`.

---

### Q48. Subarray Sum Equals K
**Difficulty:** Medium

Given an integer array `nums` and an integer `k`, return the number of contiguous subarrays whose sum equals `k`.

**Input:** `nums = [1, 1, 1], k = 2`  
**Output:** `2`

**Note:** Subarrays `[1,1]` at positions 0 and 1.

**Hint:** Count prefix sums seen so far: each time `pref − k` has appeared, a subarray ends here.

---

## Topic 25 — Greedy Approach

### Q49. Assign Cookies
**Difficulty:** Easy

Each child `i` has a greed factor `g[i]`; each cookie `j` has size `s[j]`. A child is content if some cookie with `s[j] >= g[i]` is assigned to them (one cookie per child). Maximize the number of content children.

**Input:** `g = [1, 2], s = [1, 2, 3]`  
**Output:** `2`

**Hint:** Sort both; give the smallest cookie that satisfies the least greedy remaining child.

---

### Q50. Jump Game
**Difficulty:** Medium

Each index of a non-negative array holds a maximum jump length. Return true if you can reach the last index starting from index 0.

**Input:** `nums = [2, 3, 1, 1, 4]`  
**Output:** `true`

**Note:** `[3, 2, 1, 0, 4]` → false.

**Hint:** Track the farthest index reachable so far; fail the moment you need to stand beyond it.

---

## Topic 26 — Choosing the Appropriate Data Structure

### Q51. Existence Queries with the Right Container
**Difficulty:** Easy

You get a static integer array and many queries asking whether a value exists in it. Preprocess once so each query answers in O(1).

**Input:** `nums = [4, 1, 7, 1], queries = [1, 5]`  
**Output:** `[true, false]`

**Hint:** Static + membership → HashSet built once; not a sorted array unless you also need order.

---

### Q52. Top K Frequent Elements
**Difficulty:** Medium

Given an integer array `nums` and an integer `k`, return the `k` most frequent elements (any order if tied).

**Input:** `nums = [1, 1, 1, 2, 2, 3], k = 2`  
**Output:** `[1, 2]`

**Note:** Counts: 1→3, 2→2, 3→1.

**Hint:** Frequency map first; then bucket by count (counts sum to n) and read buckets high→low.

---

# Hours 11–12: OOPs Concepts

## Topic 27 — Abstraction

### Q53. Abstract Shape with area()
**Difficulty:** Easy

Define a contract `Shape` with a single method `area()`. Provide `Circle` and `Rectangle` that implement it. Call `area()` only through `Shape` references and print both results.

**Input:** `radius = 2 · w = 3, h = 4`  
**Output:** `12.57 · 12`

**Note:** π × 2² ≈ 12.57.

**Hint:** The caller only knows `area()` — how each shape computes it stays hidden.

---

### Q54. Abstract Class with Shared Concrete Logic
**Difficulty:** Medium

Design an abstract class `Employee` with an abstract method `bonus()` and a concrete `describe()` that combines the name field with `bonus()`. Create `FullTime` and `Intern` subclasses and call `describe()` through an `Employee` reference.

**Input:** `FullTime("Ada", 1000), Intern("Bob", 100)`  
**Output:** `Ada bonus 1000 · Bob bonus 100`

**Hint:** State and reusable helpers live in the abstract base; only the varying hook is abstract.

---

## Topic 28 — Encapsulation

### Q55. Bank Account with Validated Access
**Difficulty:** Easy

Model a `BankAccount` with a private `balance`. Expose `deposit(amount)` and `withdraw(amount)` that reject non-positive amounts and overdrafts, plus a getter `getBalance()`. The field itself must not be settable from outside.

**Input:** `deposit(100), withdraw(150), deposit(-5)`  
**Output:** `100 · rejected · 100`

**Hint:** Keep the field private; force every change through validated methods.

---

### Q56. Private State with an Invariant (Range)
**Difficulty:** Medium

Implement a `Range` class that keeps `low` and `high` private. The constructor and `set(low, high)` must preserve the invariant `low <= high` (reject invalid input). Expose getters only — no setters that bypass checks.

**Input:** `Range(5, 2), then set(1, 9), getLow/getHigh`  
**Output:** `rejected · 1 · 9`

**Hint:** Every write path enforces the same rule; getters cannot change state.

---

## Topic 29 — Method Overloading

### Q57. Overloaded sum() Variants
**Difficulty:** Easy

Overload a method `sum` so it can add two integers, three integers, or all elements of an integer array. Call each version and print the results.

**Input:** `sum(1,2), sum(1,2,3), sum([1,2,3])`  
**Output:** `3 · 6 · 6`

**Note:** Resolved at compile time from the parameter list.

**Hint:** Overload = same name, different parameter types or counts.

---

### Q58. Constructor Overloading (Rectangle)
**Difficulty:** Medium

Create a `Rectangle` class with three constructors: no-arg (1×1), one-arg (square s×s), two-arg (w×h). Show which constructor runs for each call and the resulting dimensions.

**Input:** `Rectangle(), Rectangle(5), Rectangle(2,3)`  
**Output:** `1×1 · 5×5 · 2×3`

**Hint:** Different parameter counts/types select different constructors at compile time.

---

## Topic 30 — Inheritance

### Q59. Animal → Dog (is-a reuse)
**Difficulty:** Easy

Create an `Animal` base with a `name` field and `eat()`. Derive `Dog` that still uses `eat()` and adds `fetch()`. Instantiate `Dog` and call both methods.

**Input:** `Dog("Rex") → eat(), fetch()`  
**Output:** `Rex eats · Rex fetches`

**Hint:** Derived classes inherit members; add new behavior without editing the base.

---

### Q60. Multilevel Chain + Constructor Order
**Difficulty:** Medium

Build a chain `Vehicle → Car → ElectricCar`. Each constructor prints a message after chaining to its parent. Show the order of constructor calls when creating an `ElectricCar`.

**Input:** `new ElectricCar()`  
**Output:** `Vehicle() → Car() → ElectricCar()`

**Note:** Base subobject always constructs first.

**Hint:** Java: `super()` runs first · C++: base subobject builds before members.

---

## Topic 31 — Method Overriding

### Q61. Override speak() with Dynamic Dispatch
**Difficulty:** Easy

Define `Animal.speak()` that returns a generic sound. Override it in `Cat` to return `"Meow"`. Call `speak()` on an `Animal`-typed reference pointing to a `Cat` and show which version runs.

**Input:** `Animal a = new Cat(); a.speak()`  
**Output:** `Meow`

**Note:** Overriding is chosen at runtime from the object type, not the reference type.

**Hint:** Identical signature + non-static → the runtime type picks the method.

---

### Q62. Override with super — Extend, Don't Replace
**Difficulty:** Medium

`Dog` overrides `speak()` but first calls the parent version with `super`, then appends `" Woof"`. Show the combined output when `speak()` is invoked on a `Dog` held as an `Animal`.

**Input:** `Animal a = new Dog(); a.speak()`  
**Output:** `... Woof`

**Note:** Without super, the base behavior would be fully replaced.

**Hint:** `super.method()` runs the parent implementation; then add your extension.

---

## Topic 32 — Common Mistakes and Optimization

### Q63. Spot the OOP Bugs
**Difficulty:** Medium

A draft class design has four flaws: (1) `balance` is a public mutable field, (2) `withdraw` in a subclass uses a different signature so it overloads instead of overrides, (3) the subclass constructor forgets to call `super`, (4) `getTeam()` returns the internal mutable list. Identify each fix.

**Input:** `4 known flaws`  
**Output:** `4 fixes`

**Hint:** Write each fix as the concrete change you would make in review.

---

### Q64. Composition over Inheritance + Reuse
**Difficulty:** Medium

Model a team where a manager leads employees. Show why composition (`Manager has-a List<Employee>`) fits better than extending `Employee`, and implement the composition version that counts members.

**Input:** `Manager("Ada") with team [E1, E2]`  
**Output:** `Ada manages 2`

**Note:** Inheritance = is-a. Leading people is has-a, not is-a.

**Hint:** Hold collaborators as fields (composition) when the relationship is not strictly is-a.

---

# Hours 13–14: SQL Essentials

## Topic 33 — Filtering & Sorting

### Q65. Filter and Sort Top Earners
**Difficulty:** Easy

From `employees`, return name and salary for people earning more than 60000, ordered by salary highest first, limited to the top 3 rows.

**Input:** `WHERE salary > 60000 · ORDER BY salary DESC · LIMIT 3`  
**Output:** `Ada 90000 · Cy 70000 · Bob 55000*`

**Note:** *only rows meeting the filter; LIMIT 3 keeps the first 3 after sort.

**Hint:** Filter first (WHERE), sort next (ORDER BY), cut last (LIMIT).

---

### Q66. CASE Expressions for Labels
**Difficulty:** Easy

For every employee, return name and a band label: Senior if salary >= 80000, Mid if salary >= 50000, otherwise Junior. Order by name.

**Input:** `CASE on salary thresholds`  
**Output:** `Ada Senior · Bob Mid · Cy Mid`

**Hint:** CASE evaluates top to bottom — put the strictest branch first.

---

## Topic 34 — JOINs

### Q67. INNER JOIN Employees to Departments
**Difficulty:** Easy

List each employee name together with their department name. Keep only rows where both sides match (the employee has a department).

**Input:** `employees ⋈ departments ON dept_id = id`  
**Output:** `Ada–Engineering · Bob–Engineering · Cy–Sales`

**Hint:** JOIN ... ON equates the foreign key to the primary key.

---

### Q68. LEFT JOIN — Rows With No Match
**Difficulty:** Medium

Return every department name that has zero employees. Use a LEFT JOIN so departments without employees still appear.

**Input:** `departments LEFT JOIN employees WHERE e.id IS NULL`  
**Output:** `HR`

**Note:** Inner join would drop HR entirely.

**Hint:** LEFT JOIN keeps all left rows; filter where the right side is NULL.

---

## Topic 35 — GROUP BY & Aggregates

### Q69. Average Salary Per Department (HAVING)
**Difficulty:** Medium

Compute the average salary per department. Return only departments whose average exceeds 60000, sorted by average descending.

**Input:** `GROUP BY d.name · HAVING AVG(salary) > 60000`  
**Output:** `Engineering 72500 · Sales 70000`

**Hint:** WHERE filters rows; HAVING filters groups after aggregation.

---

### Q70. Order Count and Revenue Per Customer
**Difficulty:** Medium

Using customers and orders, return each customer’s name, number of orders, and total amount spent. Include customers with zero orders (show 0 and 0).

**Input:** `LEFT JOIN · GROUP BY customer · COUNT + SUM`  
**Output:** `Ann 2 350 · Ben 1 400 · Cal 0 0`

**Hint:** LEFT JOIN + COALESCE so missing orders become 0, not NULL.

---

## Topic 36 — Subqueries & EXISTS

### Q71. Second Highest Salary
**Difficulty:** Medium

Return the second-highest distinct salary from employees. If there is none, the result should be NULL.

**Input:** `MAX(salary) WHERE salary < MAX(salary)`  
**Output:** `70000`

**Note:** Top salary 90000; next distinct is 70000.

**Hint:** Take MAX over all salaries strictly below the overall maximum.

---

### Q72. EXISTS — Customers With Orders
**Difficulty:** Medium

Return the names of customers who have placed at least one order. Use EXISTS (not just JOIN) to show correlated-subquery style.

**Input:** `WHERE EXISTS (SELECT ... ORDER BY customer)`  
**Output:** `Ann · Ben`

**Note:** Cal has no orders → excluded.

**Hint:** EXISTS stops at the first matching inner row — often cheaper than IN.

---

## Topic 37 — Window Functions

### Q73. RANK Salary Within Department
**Difficulty:** Medium

For each employee, show name, department, salary, and a rank inside that department where the highest salary is rank 1 (ties share a rank).

**Input:** `RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC)`  
**Output:** `Ada 1 · Bob 2 · Cy 1`

**Note:** Cy is rank 1 in Sales (only earner).

**Hint:** PARTITION BY splits the window; ORDER BY ranks inside each part.

---

### Q74. Running Total of Order Amounts
**Difficulty:** Medium

List order_date and amount with a running total of amount ordered by date (each row sums itself and all earlier rows).

**Input:** `SUM(amount) OVER (ORDER BY order_date ...)`  
**Output:** `200 · 350 · 750`

**Hint:** `SUM() OVER (ORDER BY date ROWS UNBOUNDED PRECEDING)`.

---

## Topic 38 — Indexes & Query Optimization

### Q75. Composite Index for Filter + Sort
**Difficulty:** Medium

A dashboard runs `WHERE dept_id = 5 ORDER BY salary DESC` constantly. Design an index that serves both the filter and the sort, and note the tradeoff.

**Input:** `WHERE dept_id = 5 ORDER BY salary DESC`  
**Output:** `CREATE INDEX idx ON employees (dept_id, salary)`

**Hint:** Leftmost column first: equality column, then the sort column.

---

### Q76. Sargable Rewrite — YEAR() on a Column
**Difficulty:** Medium

The predicate `WHERE YEAR(order_date) = 2024` wraps the column in a function so an index on order_date cannot be used. Rewrite it as a half-open date range and avoid `SELECT *`.

**Input:** `WHERE YEAR(order_date) = 2024 · SELECT *`  
**Output:** `order_date >= 2024-01-01 AND < 2025-01-01`

**Note:** Sargable = the optimizer can use a range/index seek.

**Hint:** Never apply a function to the indexed column in WHERE; put bounds on the column instead.

---

## Pattern Cheat Sheet

### Hours 3–4 — Problem Types

| # | Pattern | When to use | Example |
|---|---------|-------------|---------|
| 01 | Single-pass extrema | Need min/max/second-best in one scan | Second largest, best score |
| 02 | Math identity / XOR | Missing or paired values in a known range | Missing number 0..n |
| 03 | Floyd cycle detection | Values act as pointers; duplicate or loop exists | Duplicate in 1..n array |
| 04 | Reversal technique | In-place rotate/shift with O(1) space | Rotate array by K |
| 05 | Hash frequency map | “Most / count / first unique” over a collection | Most frequent element, first non-repeating |
| 06 | Two pointers | Compare from both ends or shrink a window | Palindrome checks |
| 07 | Character-count signature | Anagrams / permutations of a fixed alphabet | Valid anagram (26-slot array) |
| 08 | Tokenize + rewrite | Reorder, filter, or map words/chars in a string | Reverse words, strip duplicates |

### Hours 5–6 — Core Algorithms

| # | Pattern | When to use | Example |
|---|---------|-------------|---------|
| 09 | Linear scan search | Unsorted data; find first match or all matches | Linear search, first/last occurrence |
| 10 | Comparison sort | Need ordered output; write O(n²) by hand | Bubble sort, selection sort |
| 11 | Binary search (halving) | Sorted array; find target / boundary in O(log n) | Iterative search, lower bound |
| 12 | Function decomposition | Reusable logic with clear input → output | digitSum(n), isPalindrome(n) |
| 13 | Recursion (base + smaller) | Problem reduces to same problem on n-1 / n-2 | Factorial, Fibonacci |
| 14 | Number theory / digits | GCD, primality, digit sums and reversals | Euclidean GCD, √n prime check |

### Hours 7–8 — Application Problems

| # | Pattern | When to use | Example |
|---|---------|-------------|---------|
| 15 | Hash lookup companion | Need O(1) “have I seen the complement / value?” | Two Sum with map, set intersection |
| 16 | Pair-sum two-pointer walk | Sorted ends meet a target sum (exact or closest) | Pair with sum, closest pair sum |
| 17 | Matrix reshape ops | Transpose or rotate without a second matrix | Transpose, 90° clockwise rotate |
| 18 | Matrix staircase search | Rows & columns sorted — eliminate one line per step | Top-right search in sorted matrix |
| 19 | Layer / boundary peel | Traverse rings, spirals, or borders | Spiral order traversal |
| 20 | Running optimum (1-pass DP) | Best buy-so-far or best subarray ending here | Stock profit, Kadane max subarray |

### Hours 9–10 — Interview-Level Patterns

| # | Pattern | When to use | Example |
|---|---------|-------------|---------|
| 21 | Stack & queue applications | Nesting, next-greater, FIFO with LIFO only | Next greater element, queue via stacks |
| 22 | Balanced delimiters | Match, nest, or measure bracket sequences | Valid parentheses, longest valid substring |
| 23 | Sliding window | Contiguous subarray/substring under a constraint | Max sum size k, longest unique substring |
| 24 | Prefix sum | Range sums or subarray-sum counts in O(1)/O(n) | Range query, subarray sum equals k |
| 25 | Greedy choice | Local optimum that never needs to backtrack | Assign cookies, jump game |
| 26 | Data structure selection | Access pattern decides the container | HashSet for membership, buckets for top-k |

### Hours 11–12 — OOPs Concepts

| # | Pattern | When to use | Example |
|---|---------|-------------|---------|
| 27 | Abstraction (hide how) | Clients should depend on a contract only | Shape.area(), Employee.bonus() |
| 28 | Encapsulation (guard state) | Invariants must hold against bad callers | Private balance, validated Range.set |
| 29 | Overloading (compile time) | Same name, different parameter lists | sum(a,b) vs sum(arr), constructors |
| 30 | Inheritance (is-a reuse) | Derived truly substitutes for the base | Dog is an Animal · Vehicle → Car |
| 31 | Overriding (runtime dispatch) | Same signature; behavior varies by type | Cat.speak(), super.speak() extension |
| 32 | OOP hygiene | Review pass: leaks, wrong signature, composition | Defensive copies, composition over inheritance |

### Hours 13–14 — SQL Essentials

| # | Pattern | When to use | Example |
|---|---------|-------------|---------|
| 33 | SQL filter & sort | WHERE → ORDER BY → LIMIT on one table | Top earners, CASE labels |
| 34 | SQL joins | Combine tables; keep unmatched with OUTER | Employee→dept, departments with no staff |
| 35 | SQL group & aggregate | Per-group COUNT/AVG/SUM filtered by HAVING | Avg salary by dept, revenue per customer |
| 36 | SQL subquery / EXISTS | Need a scalar, set, or correlated probe | 2nd highest salary, customers with orders |
| 37 | SQL window functions | Rank/running totals without collapsing rows | RANK per dept, SUM OVER running total |
| 38 | SQL indexing & sargability | Same result must run on a hot path | Composite (eq, sort), half-open date ranges |
