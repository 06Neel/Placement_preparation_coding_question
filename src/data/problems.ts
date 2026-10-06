export type Lang = 'cpp' | 'java' | 'python'
export type AnswerLang = Lang | 'sql'

export type DiagramId =
  | 'extrema'
  | 'missing'
  | 'cycle'
  | 'rotation'
  | 'concat'
  | 'freq'
  | 'nonrepeat'
  | 'two-pointer'
  | 'normalize-pointer'
  | 'count'
  | 'normalize-count'
  | 'char-map'
  | 'word-count'
  | 'word-split'
  | 'seen-set'
  | 'linear-search'
  | 'first-last'
  | 'bubble-sort'
  | 'selection-sort'
  | 'binsearch'
  | 'lower-bound'
  | 'digit-sum'
  | 'num-palindrome'
  | 'fact-rec'
  | 'fib-rec'
  | 'gcd'
  | 'prime'
  | 'hash-two-sum'
  | 'intersection'
  | 'pair-two-pointer'
  | 'pair-closest'
  | 'transpose'
  | 'rotate-mat'
  | 'mat-search'
  | 'spiral'
  | 'stock'
  | 'kadane'
  | 'next-greater'
  | 'queue-stacks'
  | 'valid-parens'
  | 'longest-valid'
  | 'inplace-dedup'
  | 'container-water'
  | 'window-sum-k'
  | 'window-unique'
  | 'prefix-range'
  | 'prefix-count-k'
  | 'assign-cookies'
  | 'jump-game'
  | 'unique-set'
  | 'top-k'
  | 'abstraction'
  | 'encapsulation'
  | 'overload'
  | 'inherit'
  | 'override'
  | 'oops-mistakes'
  | 'sql-filter'
  | 'sql-join'
  | 'sql-group'
  | 'sql-subquery'
  | 'sql-window'
  | 'sql-index'

export interface TraceStep {
  step: string
  detail: string
}

export interface Problem {
  id: string
  number: number
  topicId: string
  topicTitle: string
  title: string
  difficulty: 'Easy' | 'Medium'
  statement: string
  inputLabel: string
  outputLabel: string
  note?: string
  hint: string
  diagram: DiagramId
  trace: TraceStep[]
  approach: string[]
  time: string
  space: string
  answers: Partial<Record<AnswerLang, string>>
}

export interface Topic {
  id: string
  index: number
  hours: string
  hoursTitle: string
  title: string
  subtitle: string
  problems: Problem[]
}

export const LANGS: { id: AnswerLang; label: string }[] = [
  { id: 'cpp', label: 'C++' },
  { id: 'java', label: 'Java' },
  { id: 'python', label: 'Python' },
  { id: 'sql', label: 'SQL' },
]

export const topics: Topic[] = [
  {
    id: 't1',
    index: 1,
    hours: 'Hours 3–4',
    hoursTitle: 'Problem Types',
    title: 'Largest & Second Largest',
    subtitle: 'Single-pass extrema tracking with duplicate handling',
    problems: [
      {
        id: 'p1',
        number: 1,
        topicId: 't1',
        topicTitle: 'Largest & Second Largest',
        title: 'Second Largest Element',
        difficulty: 'Easy',
        statement:
          'Given an array of integers arr of size n, find the second largest element. Duplicates of the maximum are allowed (i.e. if the array is [10, 10, 5], answer is 10). If fewer than 2 distinct positions exist, return a sentinel (-1).',
        inputLabel: 'arr = [10, 20, 4, 45, 99]',
        outputLabel: '45',
        note: 'Second largest position after sorting descending.',
        hint: 'Keep two variables — largest and second-largest — and update them in one pass.',
        diagram: 'extrema',
        trace: [
          { step: 'Init', detail: 'first = −∞, second = −∞' },
          { step: 'x=10', detail: 'first=10' },
          { step: 'x=20', detail: 'second=10, first=20' },
          { step: 'x=4', detail: 'second stays 10' },
          { step: 'x=45', detail: 'second=20, first=45' },
          { step: 'x=99', detail: 'second=45, first=99 → answer 45' },
        ],
        approach: [
          'Track first (largest) and second in one pass.',
          'When x >= first: shift first into second, then update first.',
          'Else if x >= second: update second only.',
          'O(n) time, O(1) extra space.',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int secondLargest(const vector<int>& arr) {
    if (arr.size() < 2) return -1;
    int first = INT_MIN, second = INT_MIN;
    for (int x : arr) {
        if (x >= first) {
            second = first;
            first = x;
        } else if (x >= second) {
            second = x;
        }
    }
    return second == INT_MIN ? -1 : second;
}

int main() {
    vector<int> arr = {10, 20, 4, 45, 99};
    cout << secondLargest(arr); // 45
    return 0;
}`,
          java: `public class Main {
    static int secondLargest(int[] arr) {
        if (arr.length < 2) return -1;
        int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
        for (int x : arr) {
            if (x >= first) {
                second = first;
                first = x;
            } else if (x >= second) {
                second = x;
            }
        }
        return second == Integer.MIN_VALUE ? -1 : second;
    }

    public static void main(String[] args) {
        int[] arr = {10, 20, 4, 45, 99};
        System.out.println(secondLargest(arr)); // 45
    }
}`,
          python: `def second_largest(arr):
    if len(arr) < 2:
        return -1
    first = second = float("-inf")
    for x in arr:
        if x >= first:
            second, first = first, x
        elif x >= second:
            second = x
    return -1 if second == float("-inf") else second

print(second_largest([10, 20, 4, 45, 99]))  # 45`,
        },
      },
      {
        id: 'p2',
        number: 2,
        topicId: 't1',
        topicTitle: 'Largest & Second Largest',
        title: 'Second Largest Distinct Value',
        difficulty: 'Medium',
        statement:
          'Find the second largest distinct value in the array. Ignore duplicates of the maximum: for [10, 10, 5] the answer is 5. Return -1 if all elements are equal.',
        inputLabel: 'arr = [12, 35, 1, 10, 34, 1]',
        outputLabel: '34',
        hint: 'Same as basic extrema — but only accept a new max when x is strictly greater, and skip equals.',
        diagram: 'extrema',
        trace: [
          { step: 'Init', detail: 'first = −∞, second = −∞' },
          { step: 'x=12', detail: 'first=12' },
          { step: 'x=35', detail: 'second=12, first=35' },
          { step: 'x=1,10', detail: 'second → 10' },
          { step: 'x=34', detail: 'second → 34 (≠ first)' },
          { step: 'x=1', detail: 'ignored (≤ second) → answer 34' },
        ],
        approach: [
          'Same two-variable scan as the basic problem.',
          'Only promote into first when x > first (strict).',
          'Only set second when x > second && x != first.',
          'Guarantees second is strictly smaller than first.',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int secondDistinct(const vector<int>& arr) {
    int first = INT_MIN, second = INT_MIN;
    for (int x : arr) {
        if (x > first) {
            second = first;
            first = x;
        } else if (x > second && x != first) {
            second = x;
        }
    }
    return second == INT_MIN ? -1 : second;
}

int main() {
    vector<int> arr = {12, 35, 1, 10, 34, 1};
    cout << secondDistinct(arr); // 34
    return 0;
}`,
          java: `public class Main {
    static int secondDistinct(int[] arr) {
        int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;
        for (int x : arr) {
            if (x > first) {
                second = first;
                first = x;
            } else if (x > second && x != first) {
                second = x;
            }
        }
        return second == Integer.MIN_VALUE ? -1 : second;
    }

    public static void main(String[] args) {
        int[] arr = {12, 35, 1, 10, 34, 1};
        System.out.println(secondDistinct(arr)); // 34
    }
}`,
          python: `def second_distinct(arr):
    first = second = float("-inf")
    for x in arr:
        if x > first:
            second, first = first, x
        elif x > second and x != first:
            second = x
    return -1 if second == float("-inf") else second

print(second_distinct([12, 35, 1, 10, 34, 1]))  # 34`,
        },
      },
    ],
  },
  {
    id: 't2',
    index: 2,
    hours: 'Hours 3–4',
    hoursTitle: 'Problem Types',
    title: 'Missing & Duplicate',
    subtitle: 'Math identity and Floyd cycle detection',
    problems: [
      {
        id: 'p3',
        number: 3,
        topicId: 't2',
        topicTitle: 'Missing & Duplicate',
        title: 'Missing Number in 1..N',
        difficulty: 'Easy',
        statement:
          'An array nums contains n distinct numbers taken from 0, 1, 2, ..., n. Exactly one number is missing. Find it in linear time and without using extra space.',
        inputLabel: 'nums = [3, 0, 1]',
        outputLabel: '2',
        note: 'n = 3, range is 0..3.',
        hint: 'Sum of 0..n is known in closed form — the missing number is the difference.',
        diagram: 'missing',
        trace: [
          { step: 'n', detail: 'array length = 3 → range 0..3' },
          { step: 'Expected', detail: '0+1+2+3 = 6' },
          { step: 'Actual', detail: '3+0+1 = 4' },
          { step: 'Gap', detail: '6 − 4 = 2 → missing 2' },
        ],
        approach: [
          'Expected sum of 0..n is n*(n+1)/2.',
          'Actual sum of the array is missing by exactly the gap.',
          'Answer = expected - actual. Watch overflow on large n (use long).',
          'XOR of indices vs values is an equally safe alternative.',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int missingNumber(vector<int>& nums) {
    int n = (int)nums.size();
    long long expected = 1LL * n * (n + 1) / 2;
    long long actual = 0;
    for (int x : nums) actual += x;
    return (int)(expected - actual);
}

int main() {
    vector<int> nums = {3, 0, 1};
    cout << missingNumber(nums); // 2
    return 0;
}`,
          java: `public class Main {
    static int missingNumber(int[] nums) {
        int n = nums.length;
        long expected = 1L * n * (n + 1) / 2;
        long actual = 0;
        for (int x : nums) actual += x;
        return (int)(expected - actual);
    }

    public static void main(String[] args) {
        int[] nums = {3, 0, 1};
        System.out.println(missingNumber(nums)); // 2
    }
}`,
          python: `def missing_number(nums):
    n = len(nums)
    expected = n * (n + 1) // 2
    return expected - sum(nums)

print(missing_number([3, 0, 1]))  # 2`,
        },
      },
      {
        id: 'p4',
        number: 4,
        topicId: 't2',
        topicTitle: 'Missing & Duplicate',
        title: 'Find the Duplicate Number',
        difficulty: 'Medium',
        statement:
          'Given an array nums of size n + 1 where each element is an integer in [1, n] and at least one value appears twice, find the duplicated value without modifying the array and in better than O(n²) time. Follow-up: constant extra space.',
        inputLabel: 'nums = [1, 3, 4, 2, 2]',
        outputLabel: '2',
        hint: 'Values are valid indices — the duplicate creates a cycle. Use Floyd tortoise & hare.',
        diagram: 'cycle',
        trace: [
          { step: 'Phase 1', detail: 'slow/fast meet inside the cycle' },
          { step: 'slow: 1→3→2→4→2…', detail: 'fast runs twice as fast' },
          { step: 'Meet', detail: 'both land on 2' },
          { step: 'Phase 2', detail: 'reset slow to nums[0], step both 1×' },
          { step: 'Entry', detail: 'meet again at 2 → duplicate' },
        ],
        approach: [
          'Treat values as indices into the array (all in 1..n).',
          'Floyd tortoise & hare: slow = a[slow], fast = a[a[fast]] until meet.',
          'Reset one pointer to start; advance both one step — meeting point is the duplicate.',
          'Proven cycle entry because the duplicate “points at” itself as index.',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int findDuplicate(vector<int>& nums) {
    int slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);
    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}

int main() {
    vector<int> nums = {1, 3, 4, 2, 2};
    cout << findDuplicate(nums); // 2
    return 0;
}`,
          java: `public class Main {
    static int findDuplicate(int[] nums) {
        int slow = nums[0], fast = nums[0];
        do {
            slow = nums[slow];
            fast = nums[nums[fast]];
        } while (slow != fast);
        slow = nums[0];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }

    public static void main(String[] args) {
        int[] nums = {1, 3, 4, 2, 2};
        System.out.println(findDuplicate(nums)); // 2
    }
}`,
          python: `def find_duplicate(nums):
    slow = fast = nums[0]
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    return slow

print(find_duplicate([1, 3, 4, 2, 2]))  # 2`,
        },
      },
    ],
  },
  {
    id: 't3',
    index: 3,
    hours: 'Hours 3–4',
    hoursTitle: 'Problem Types',
    title: 'Array Rotation',
    subtitle: 'In-place reverse method and rotation equivalence',
    problems: [
      {
        id: 'p5',
        number: 5,
        topicId: 't3',
        topicTitle: 'Array Rotation',
        title: 'Rotate Array Left by K',
        difficulty: 'Easy',
        statement:
          'Rotate the array to the left by k positions in place. Example: [1,2,3,4,5], k=2 becomes [3,4,5,1,2]. k may be larger than n — reduce it modulo n first.',
        inputLabel: 'arr = [1, 2, 3, 4, 5], k = 2',
        outputLabel: '[3, 4, 5, 1, 2]',
        hint: 'Normalize k with % n, then use the three-reverse technique — no extra array needed.',
        diagram: 'rotation',
        trace: [
          { step: 'Start', detail: '[1 2 3 4 5], k = 2' },
          { step: 'Rev 0..k', detail: '[2 1 | 3 4 5]' },
          { step: 'Rev k..n', detail: '[2 1 | 5 4 3]' },
          { step: 'Rev all', detail: '[3 4 5 1 2] ✓' },
        ],
        approach: [
          'Normalize: k = k % n so large k is safe.',
          'Reverse first k elements.',
          'Reverse remaining n-k elements.',
          'Reverse whole array — net effect is left rotation by k.',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

void rotateLeft(vector<int>& arr, int k) {
    int n = arr.size();
    if (n == 0) return;
    k %= n;
    if (k < 0) k += n;
    reverse(arr.begin(), arr.begin() + k);
    reverse(arr.begin() + k, arr.end());
    reverse(arr.begin(), arr.end());
}

int main() {
    vector<int> arr = {1, 2, 3, 4, 5};
    rotateLeft(arr, 2);
    for (int x : arr) cout << x << " "; // 3 4 5 1 2
    return 0;
}`,
          java: `public class Main {
    static void reverse(int[] arr, int i, int j) {
        while (i < j) {
            int t = arr[i];
            arr[i++] = arr[j];
            arr[j--] = t;
        }
    }

    static void rotateLeft(int[] arr, int k) {
        int n = arr.length;
        if (n == 0) return;
        k %= n;
        if (k < 0) k += n;
        reverse(arr, 0, k - 1);
        reverse(arr, k, n - 1);
        reverse(arr, 0, n - 1);
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5};
        rotateLeft(arr, 2);
        System.out.println(java.util.Arrays.toString(arr)); // [3, 4, 5, 1, 2]
    }
}`,
          python: `def rotate_left(arr, k):
    n = len(arr)
    if n == 0:
        return arr
    k %= n
    return arr[k:] + arr[:k]

print(rotate_left([1, 2, 3, 4, 5], 2))  # [3, 4, 5, 1, 2]`,
        },
      },
      {
        id: 'p6',
        number: 6,
        topicId: 't3',
        topicTitle: 'Array Rotation',
        title: 'Check If One Array Is a Rotation of Another',
        difficulty: 'Medium',
        statement:
          'Given two arrays a and b of the same length, determine whether b can be obtained by rotating a. Each element is an integer; arrays may contain duplicates.',
        inputLabel: 'a = [1, 2, 3, 4, 5], b = [3, 4, 5, 1, 2]',
        outputLabel: 'true',
        hint: 'Every rotation of a appears inside a concatenated with itself — substring search does the rest.',
        diagram: 'concat',
        trace: [
          { step: 'enc(a)', detail: '1,2,3,4,5,' },
          { step: 'a + a', detail: '1,2,3,4,5,1,2,3,4,5,' },
          { step: 'enc(b)', detail: '3,4,5,1,2,' },
          { step: 'Find', detail: 'enc(b) ⊂ a+a → true' },
        ],
        approach: [
          'Lengths must match or answer is false.',
          'Encode arrays as strings with a separator (avoids ambiguity like 12|3 vs 1|23).',
          'Concatenate a with itself: enc(a)+enc(a).',
          'b is a rotation iff enc(b) appears as a substring.',
        ],
        time: 'O(n)',
        space: 'O(n)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

string encode(const vector<int>& v) {
    string s;
    for (int x : v) s += to_string(x) + ",";
    return s;
}

bool isRotation(const vector<int>& a, const vector<int>& b) {
    if (a.size() != b.size()) return false;
    string sa = encode(a), sb = encode(b);
    return (sa + sa).find(sb) != string::npos;
}

int main() {
    vector<int> a = {1, 2, 3, 4, 5};
    vector<int> b = {3, 4, 5, 1, 2};
    cout << (isRotation(a, b) ? "true" : "false"); // true
    return 0;
}`,
          java: `public class Main {
    static String encode(int[] v) {
        StringBuilder sb = new StringBuilder();
        for (int x : v) sb.append(x).append(',');
        return sb.toString();
    }

    static boolean isRotation(int[] a, int[] b) {
        if (a.length != b.length) return false;
        String sa = encode(a), sb = encode(b);
        return (sa + sa).contains(sb);
    }

    public static void main(String[] args) {
        int[] a = {1, 2, 3, 4, 5};
        int[] b = {3, 4, 5, 1, 2};
        System.out.println(isRotation(a, b)); // true
    }
}`,
          python: `def is_rotation(a, b):
    if len(a) != len(b):
        return False
    sa = ",".join(map(str, a)) + ","
    sb = ",".join(map(str, b)) + ","
    return sb in sa + sa

print(is_rotation([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]))  # True`,
        },
      },
    ],
  },
  {
    id: 't4',
    index: 4,
    hours: 'Hours 3–4',
    hoursTitle: 'Problem Types',
    title: 'Frequency Counting',
    subtitle: 'Hash maps as the default tool for counting problems',
    problems: [
      {
        id: 'p7',
        number: 7,
        topicId: 't4',
        topicTitle: 'Frequency Counting',
        title: 'Most Frequent Element',
        difficulty: 'Easy',
        statement:
          'Given an unsorted array, return the element with the highest frequency. If several elements tie, return any one of them.',
        inputLabel: 'arr = [1, 3, 2, 1, 4, 1, 3]',
        outputLabel: '1',
        hint: 'One hash-map pass: increment counts and track the running best as you go.',
        diagram: 'freq',
        trace: [
          { step: '1', detail: '{1:1} best=1' },
          { step: '3,2', detail: '{3:1, 2:1} best still 1' },
          { step: '1', detail: '{1:2} best=1 (count 2)' },
          { step: '4,1', detail: '{1:3} best=1 (count 3)' },
          { step: '3', detail: '{3:2} → answer 1' },
        ],
        approach: [
          'Build a hash map: value → count in one pass.',
          'Track the best (value, count) while inserting to avoid a second scan.',
          'Ties are acceptable — first max encountered wins.',
        ],
        time: 'O(n)',
        space: 'O(n)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int mostFrequent(vector<int>& arr) {
    unordered_map<int, int> freq;
    int best = arr[0], bestCount = 0;
    for (int x : arr) {
        int c = ++freq[x];
        if (c > bestCount) {
            bestCount = c;
            best = x;
        }
    }
    return best;
}

int main() {
    vector<int> arr = {1, 3, 2, 1, 4, 1, 3};
    cout << mostFrequent(arr); // 1
    return 0;
}`,
          java: `public class Main {
    static int mostFrequent(int[] arr) {
        java.util.Map<Integer, Integer> freq = new java.util.HashMap<>();
        int best = arr[0], bestCount = 0;
        for (int x : arr) {
            int c = freq.merge(x, 1, Integer::sum);
            if (c > bestCount) {
                bestCount = c;
                best = x;
            }
        }
        return best;
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 2, 1, 4, 1, 3};
        System.out.println(mostFrequent(arr)); // 1
    }
}`,
          python: `from collections import Counter

def most_frequent(arr):
    freq = Counter(arr)
    return max(freq, key=freq.get)

print(most_frequent([1, 3, 2, 1, 4, 1, 3]))  # 1`,
        },
      },
      {
        id: 'p8',
        number: 8,
        topicId: 't4',
        topicTitle: 'Frequency Counting',
        title: 'First Non-Repeating Element',
        difficulty: 'Medium',
        statement:
          'Return the first element in the array that occurs exactly once. If no such element exists, return -1.',
        inputLabel: 'arr = [9, 4, 9, 6, 7, 4]',
        outputLabel: '6',
        hint: 'Count first, then walk the original order and return the first count-1 value.',
        diagram: 'nonrepeat',
        trace: [
          { step: 'Count', detail: '{9:2, 4:2, 6:1, 7:1}' },
          { step: 'Scan 9', detail: 'count 2 → skip' },
          { step: 'Scan 4', detail: 'count 2 → skip' },
          { step: 'Scan 9', detail: 'count 2 → skip' },
          { step: 'Scan 6', detail: 'count 1 → answer 6' },
        ],
        approach: [
          'Pass 1: count every value with a hash map.',
          'Pass 2: walk the original order and return the first value with count 1.',
          'Order is preserved because the second pass follows the input, not the map.',
        ],
        time: 'O(n)',
        space: 'O(n)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int firstNonRepeating(vector<int>& arr) {
    unordered_map<int, int> freq;
    for (int x : arr) freq[x]++;
    for (int x : arr)
        if (freq[x] == 1) return x;
    return -1;
}

int main() {
    vector<int> arr = {9, 4, 9, 6, 7, 4};
    cout << firstNonRepeating(arr); // 6
    return 0;
}`,
          java: `public class Main {
    static int firstNonRepeating(int[] arr) {
        java.util.Map<Integer, Integer> freq = new java.util.HashMap<>();
        for (int x : arr) freq.merge(x, 1, Integer::sum);
        for (int x : arr)
            if (freq.get(x) == 1) return x;
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {9, 4, 9, 6, 7, 4};
        System.out.println(firstNonRepeating(arr)); // 6
    }
}`,
          python: `from collections import Counter

def first_non_repeating(arr):
    freq = Counter(arr)
    for x in arr:
        if freq[x] == 1:
            return x
    return -1

print(first_non_repeating([9, 4, 9, 6, 7, 4]))  # 6`,
        },
      },
    ],
  },
  {
    id: 't5',
    index: 5,
    hours: 'Hours 3–4',
    hoursTitle: 'Problem Types',
    title: 'Palindrome',
    subtitle: 'Two pointers from both ends — basic and normalized variants',
    problems: [
      {
        id: 'p9',
        number: 9,
        topicId: 't5',
        topicTitle: 'Palindrome',
        title: 'Basic Palindrome Check',
        difficulty: 'Easy',
        statement:
          'Given a string s, determine whether it reads the same forwards and backwards. Consider only the characters present — no case folding or filtering in this variant.',
        inputLabel: 's = "racecar"',
        outputLabel: 'true',
        hint: 'Two pointers from both ends — mismatch means false, otherwise move inward.',
        diagram: 'two-pointer',
        trace: [
          { step: 'L↔R', detail: 'r ↔ r' },
          { step: 'L↔R', detail: 'a ↔ a' },
          { step: 'L↔R', detail: 'c ↔ c' },
          { step: 'L↔R', detail: 'e ↔ e' },
          { step: 'Cross', detail: 'pointers meet → true' },
        ],
        approach: [
          'Place one pointer at start, one at end.',
          'While left < right: if s[left] != s[right], not a palindrome.',
          'Otherwise move pointers inward and repeat.',
          'Empty string and single character are palindromes.',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

bool isPalindrome(const string& s) {
    int left = 0, right = (int)s.size() - 1;
    while (left < right) {
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    return true;
}

int main() {
    cout << (isPalindrome("racecar") ? "true" : "false"); // true
    return 0;
}`,
          java: `public class Main {
    static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("racecar")); // true
    }
}`,
          python: `def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

print(is_palindrome("racecar"))  # True`,
        },
      },
      {
        id: 'p10',
        number: 10,
        topicId: 't5',
        topicTitle: 'Palindrome',
        title: 'Alphanumeric Palindrome (Ignore Case & Symbols)',
        difficulty: 'Medium',
        statement:
          'Given a string, return true if it is a palindrome considering only alphanumeric characters and ignoring cases. Non-alphanumeric characters are skipped.',
        inputLabel: 's = "A man, a plan, a canal: Panama"',
        outputLabel: 'true',
        note: 'Normalized form is "amanaplanacanalpanama".',
        hint: 'Same two pointers — but skip non-alphanumerics and compare lowercased characters.',
        diagram: 'normalize-pointer',
        trace: [
          { step: 'L', detail: "skip to 'A'" },
          { step: 'R', detail: "skip to 'a'" },
          { step: 'cmp', detail: "tolower(A)==tolower(a) ✓" },
          { step: '…', detail: "skip ',', ':', spaces on both sides" },
          { step: 'Done', detail: 'all pairs match → true' },
        ],
        approach: [
          'Two pointers over the original string.',
          'Skip positions where !isalnum(c).',
          'Compare tolower(left) with tolower(right).',
          'No extra normalized string required.',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

bool isPalindrome(const string& s) {
    int left = 0, right = (int)s.size() - 1;
    while (left < right) {
        while (left < right && !isalnum((unsigned char)s[left])) left++;
        while (left < right && !isalnum((unsigned char)s[right])) right--;
        if (tolower((unsigned char)s[left]) != tolower((unsigned char)s[right]))
            return false;
        left++;
        right--;
    }
    return true;
}

int main() {
    string s = "A man, a plan, a canal: Panama";
    cout << (isPalindrome(s) ? "true" : "false"); // true
    return 0;
}`,
          java: `public class Main {
    static boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        while (left < right) {
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right)))
                return false;
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPalindrome("A man, a plan, a canal: Panama")); // true
    }
}`,
          python: `def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True

print(is_palindrome("A man, a plan, a canal: Panama"))  # True`,
        },
      },
    ],
  },
  {
    id: 't6',
    index: 6,
    hours: 'Hours 3–4',
    hoursTitle: 'Problem Types',
    title: 'Anagram',
    subtitle: 'Character-count signatures and normalization rules',
    problems: [
      {
        id: 'p11',
        number: 11,
        topicId: 't6',
        topicTitle: 'Anagram',
        title: 'Valid Anagram (Count Method)',
        difficulty: 'Easy',
        statement:
          'Given two strings s and t, return true if t is an anagram of s — same characters with the same frequencies, different order. Assume lowercase English letters.',
        inputLabel: 's = "anagram", t = "nagaram"',
        outputLabel: 'true',
        hint: 'Lengths must match; then +1 for each char in s and −1 for each in t — end at all zeros.',
        diagram: 'count',
        trace: [
          { step: 'Lengths', detail: '7 == 7 ✓' },
          { step: 's:anagram', detail: 'a:2 g:1 n:2 r:1 m:1' },
          { step: 't:nagaram', detail: 'subtract → all counts 0' },
          { step: 'Check', detail: 'every slot 0 → true' },
        ],
        approach: [
          'Different lengths → immediately false.',
          'Maintain a count array of size 26 (or a hash map for general alphabets).',
          'Increment for s, decrement for t in the same loop.',
          'If any count is non-zero at the end, not an anagram.',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

bool isAnagram(string s, string t) {
    if (s.size() != t.size()) return false;
    int cnt[26] = {0};
    for (int i = 0; i < (int)s.size(); i++) {
        cnt[s[i] - 'a']++;
        cnt[t[i] - 'a']--;
    }
    for (int c : cnt)
        if (c != 0) return false;
    return true;
}

int main() {
    cout << (isAnagram("anagram", "nagaram") ? "true" : "false"); // true
    return 0;
}`,
          java: `public class Main {
    static boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] cnt = new int[26];
        for (int i = 0; i < s.length(); i++) {
            cnt[s.charAt(i) - 'a']++;
            cnt[t.charAt(i) - 'a']--;
        }
        for (int c : cnt)
            if (c != 0) return false;
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isAnagram("anagram", "nagaram")); // true
    }
}`,
          python: `def is_anagram(s, t):
    if len(s) != len(t):
        return False
    cnt = [0] * 26
    for a, b in zip(s, t):
        cnt[ord(a) - ord('a')] += 1
        cnt[ord(b) - ord('a')] -= 1
    return all(c == 0 for c in cnt)

print(is_anagram("anagram", "nagaram"))  # True`,
        },
      },
      {
        id: 'p12',
        number: 12,
        topicId: 't6',
        topicTitle: 'Anagram',
        title: 'Anagram Ignoring Case & Spaces',
        difficulty: 'Medium',
        statement:
          'Return true if the two strings are anagrams after removing all spaces and converting to lowercase. Example: "Dormitory" and "Dirty Room" are anagrams.',
        inputLabel: 's = "Dormitory", t = "Dirty Room"',
        outputLabel: 'true',
        hint: 'Drop spaces and lowercase while counting — no need to build new strings first.',
        diagram: 'normalize-count',
        trace: [
          { step: 's', detail: 'Dormitory → dormitory (9 chars)' },
          { step: 't', detail: 'Dirty Room → dirtyroom (9 chars)' },
          { step: 'Count', detail: 'increment s, decrement t together' },
          { step: 'Result', detail: 'all 26 counts 0 → true' },
        ],
        approach: [
          'Normalize both strings: drop spaces, toLowerCase.',
          'If normalized lengths differ → false.',
          'Apply the same count-array check as the basic anagram problem.',
          'Normalization can be done in-line while counting — no new strings needed.',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

bool isAnagram(string s, string t) {
    int cnt[26] = {0};
    int used = 0;
    for (char ch : s) {
        if (ch == ' ') continue;
        cnt[tolower((unsigned char)ch) - 'a']++;
        used++;
    }
    for (char ch : t) {
        if (ch == ' ') continue;
        cnt[tolower((unsigned char)ch) - 'a']--;
        used--;
    }
    if (used != 0) return false;
    for (int c : cnt)
        if (c != 0) return false;
    return true;
}

int main() {
    cout << (isAnagram("Dormitory", "Dirty Room") ? "true" : "false"); // true
    return 0;
}`,
          java: `public class Main {
    static boolean isAnagram(String s, String t) {
        int[] cnt = new int[26];
        int used = 0;
        for (char ch : s.toCharArray()) {
            if (ch == ' ') continue;
            cnt[Character.toLowerCase(ch) - 'a']++;
            used++;
        }
        for (char ch : t.toCharArray()) {
            if (ch == ' ') continue;
            cnt[Character.toLowerCase(ch) - 'a']--;
            used--;
        }
        if (used != 0) return false;
        for (int c : cnt)
            if (c != 0) return false;
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isAnagram("Dormitory", "Dirty Room")); // true
    }
}`,
          python: `def is_anagram(s, t):
    cnt = [0] * 26
    used = 0
    for ch in s:
        if ch == ' ':
            continue
        cnt[ord(ch.lower()) - ord('a')] += 1
        used += 1
    for ch in t:
        if ch == ' ':
            continue
        cnt[ord(ch.lower()) - ord('a')] -= 1
        used -= 1
    return used == 0 and all(c == 0 for c in cnt)

print(is_anagram("Dormitory", "Dirty Room"))  # True`,
        },
      },
    ],
  },
  {
    id: 't7',
    index: 7,
    hours: 'Hours 3–4',
    hoursTitle: 'Problem Types',
    title: 'Character & Word Frequency',
    subtitle: 'Building maps over characters and tokenized words',
    problems: [
      {
        id: 'p13',
        number: 13,
        topicId: 't7',
        topicTitle: 'Character & Word Frequency',
        title: 'Character Frequency Map',
        difficulty: 'Easy',
        statement:
          'Given a string, build and return the frequency of each character. For interview purposes, print or return every character with its count (order does not matter).',
        inputLabel: 's = "accenture"',
        outputLabel: 'a:1, c:2, e:2, n:1, t:1, u:1',
        hint: 'map[ch] += 1 for every character — one pass is enough.',
        diagram: 'char-map',
        trace: [
          { step: 'a,c,c', detail: 'a:1  c:2' },
          { step: 'e,n,t', detail: 'e:1  n:1  t:1' },
          { step: 'u,r,e', detail: 'u:1  r:1  e:2' },
          { step: 'Final', detail: 'a:1 c:2 e:2 n:1 r:1 t:1 u:1' },
        ],
        approach: [
          'Single pass: map[ch] += 1 for every character.',
          'For a known alphabet, a fixed array of size 26/128 is faster than a hash map.',
          'Printing order depends on iteration order of the map.',
        ],
        time: 'O(n)',
        space: 'O(k), k = unique chars',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

void charFrequency(const string& s) {
    unordered_map<char, int> freq;
    for (char ch : s) freq[ch]++;
    vector<pair<char, int>> items(freq.begin(), freq.end());
    sort(items.begin(), items.end());
    for (auto [ch, c] : items)
        cout << ch << ":" << c << " ";
}

int main() {
    charFrequency("accenture"); // a:1 c:2 e:2 n:1 t:1 u:1
    return 0;
}`,
          java: `public class Main {
    static void charFrequency(String s) {
        java.util.Map<Character, Integer> freq = new java.util.TreeMap<>();
        for (char ch : s.toCharArray())
            freq.merge(ch, 1, Integer::sum);
        for (var e : freq.entrySet())
            System.out.print(e.getKey() + ":" + e.getValue() + " ");
    }

    public static void main(String[] args) {
        charFrequency("accenture"); // a:1 c:2 e:2 n:1 t:1 u:1
    }
}`,
          python: `from collections import Counter

def char_frequency(s):
    freq = Counter(s)
    for ch in sorted(freq):
        print(f"{ch}:{freq[ch]}", end=" ")

char_frequency("accenture")  # a:1 c:2 e:2 n:1 t:1 u:1`,
        },
      },
      {
        id: 'p14',
        number: 14,
        topicId: 't7',
        topicTitle: 'Character & Word Frequency',
        title: 'Most Frequent Word in a Sentence',
        difficulty: 'Medium',
        statement:
          'Given a sentence, find the word that appears most often. Words are separated by whitespace; comparisons are case-insensitive; punctuation may be attached to words and should be ignored.',
        inputLabel: 's = "the cat and the hat and the mat"',
        outputLabel: 'the',
        hint: 'Tokenize on letters only, lowercase everything, then reuse the most-frequent-element pattern.',
        diagram: 'word-count',
        trace: [
          { step: 'Tokens', detail: 'the cat and the hat and the mat' },
          { step: 'Lower', detail: 'same (already lowercase)' },
          { step: 'Counts', detail: 'the:3  and:2  cat/hat/mat:1' },
          { step: 'Max', detail: 'the (3) → answer' },
        ],
        approach: [
          'Tokenize: split on non-letter boundaries (or split + strip punctuation).',
          'Lowercase each token so "The" == "the".',
          'Count with a hash map; track max while inserting.',
          'Return the word that achieved the highest count.',
        ],
        time: 'O(n)',
        space: 'O(k), k = unique words',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

string mostFrequentWord(const string& s) {
    unordered_map<string, int> freq;
    string word, best;
    int bestCount = 0;
    auto flush = [&]() {
        if (word.empty()) return;
        for (char& ch : word) ch = tolower((unsigned char)ch);
        int c = ++freq[word];
        if (c > bestCount) {
            bestCount = c;
            best = word;
        }
        word.clear();
    };
    for (char ch : s) {
        if (isalpha((unsigned char)ch)) word += ch;
        else flush();
    }
    flush();
    return best;
}

int main() {
    cout << mostFrequentWord("the cat and the hat and the mat"); // the
    return 0;
}`,
          java: `public class Main {
    static String mostFrequentWord(String s) {
        java.util.Map<String, Integer> freq = new java.util.HashMap<>();
        String best = "";
        int bestCount = 0;
        for (String raw : s.toLowerCase().split("[^a-z]+")) {
            if (raw.isEmpty()) continue;
            int c = freq.merge(raw, 1, Integer::sum);
            if (c > bestCount) {
                bestCount = c;
                best = raw;
            }
        }
        return best;
    }

    public static void main(String[] args) {
        System.out.println(mostFrequentWord("the cat and the hat and the mat")); // the
    }
}`,
          python: `import re
from collections import Counter

def most_frequent_word(s):
    words = re.findall(r"[a-zA-Z]+", s.lower())
    freq = Counter(words)
    return max(freq, key=freq.get)

print(most_frequent_word("the cat and the hat and the mat"))  # the`,
        },
      },
    ],
  },
  {
    id: 't8',
    index: 8,
    hours: 'Hours 3–4',
    hoursTitle: 'Problem Types',
    title: 'String Manipulation',
    subtitle: 'Word-level reversal and order-preserving filtering',
    problems: [
      {
        id: 'p15',
        number: 15,
        topicId: 't8',
        topicTitle: 'String Manipulation',
        title: 'Reverse Words in a Sentence',
        difficulty: 'Easy',
        statement:
          'Given a string of words separated by spaces, reverse the order of the words. Leading/trailing spaces should be trimmed, and multiple spaces between words treated as a single separator.',
        inputLabel: 's = "  the sky  is blue "',
        outputLabel: '"blue is sky the"',
        hint: 'Split into words, then emit them from the end — join with single spaces.',
        diagram: 'word-split',
        trace: [
          { step: 'Trim+split', detail: '[the, sky, is, blue]' },
          { step: 'Walk end→start', detail: 'blue' },
          { step: '…', detail: 'blue is sky the' },
          { step: 'Join', detail: '"blue is sky the" ✓' },
        ],
        approach: [
          'Split into tokens (ignore empty pieces from extra spaces).',
          'Walk tokens from the end and join with single spaces.',
          'Alternative in-place on char arrays: reverse all, then reverse each word.',
        ],
        time: 'O(n)',
        space: 'O(n)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

string reverseWords(string s) {
    stringstream ss(s);
    string word, result;
    vector<string> words;
    while (ss >> word) words.push_back(word);
    for (int i = (int)words.size() - 1; i >= 0; i--) {
        if (!result.empty()) result += " ";
        result += words[i];
    }
    return result;
}

int main() {
    cout << reverseWords("  the sky  is blue "); // blue is sky the
    return 0;
}`,
          java: `public class Main {
    static String reverseWords(String s) {
        String[] words = s.trim().split("\\\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = words.length - 1; i >= 0; i--) {
            sb.append(words[i]);
            if (i > 0) sb.append(' ');
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        System.out.println(reverseWords("  the sky  is blue ")); // blue is sky the
    }
}`,
          python: `def reverse_words(s):
    return " ".join(s.split()[::-1])

print(reverse_words("  the sky  is blue "))  # blue is sky the`,
        },
      },
      {
        id: 'p16',
        number: 16,
        topicId: 't8',
        topicTitle: 'String Manipulation',
        title: 'Remove Duplicate Characters (Preserve Order)',
        difficulty: 'Medium',
        statement:
          'Given a string, remove duplicate characters so that each character appears only once, preserving the order of first occurrence.',
        inputLabel: 's = "banana"',
        outputLabel: '"ban"',
        hint: 'A seen-set decides keep/skip while you walk left to right — order falls out naturally.',
        diagram: 'seen-set',
        trace: [
          { step: 'b', detail: 'not seen → keep  → "b"' },
          { step: 'a', detail: 'not seen → keep  → "ba"' },
          { step: 'n', detail: 'not seen → keep  → "ban"' },
          { step: 'a,n,a', detail: 'already seen → skip' },
          { step: 'Done', detail: '"ban"' },
        ],
        approach: [
          'Walk left to right through the string.',
          'Keep a set of characters already emitted.',
          'If the current character is not in the set, append it and mark seen.',
          'Result contains first-occurrence order only.',
        ],
        time: 'O(n)',
        space: 'O(k), k = unique chars',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

string removeDuplicates(const string& s) {
    unordered_set<char> seen;
    string result;
    for (char ch : s) {
        if (seen.insert(ch).second) result += ch;
    }
    return result;
}

int main() {
    cout << removeDuplicates("banana"); // ban
    return 0;
}`,
          java: `public class Main {
    static String removeDuplicates(String s) {
        java.util.Set<Character> seen = new java.util.HashSet<>();
        StringBuilder sb = new StringBuilder();
        for (char ch : s.toCharArray()) {
            if (seen.add(ch)) sb.append(ch);
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        System.out.println(removeDuplicates("banana")); // ban
    }
}`,
          python: `def remove_duplicates(s):
    seen = set()
    result = []
    for ch in s:
        if ch not in seen:
            seen.add(ch)
            result.append(ch)
    return "".join(result)

print(remove_duplicates("banana"))  # ban`,
        },
      },
    ],
  },
  {
    id: 't9',
    index: 9,
    hours: 'Hours 5–6',
    hoursTitle: 'Core Algorithms',
    title: 'Searching',
    subtitle: 'Linear scan patterns and occurrence tracking',
    problems: [
      {
        id: 'p17',
        number: 17,
        topicId: 't9',
        topicTitle: 'Searching',
        title: 'Linear Search',
        difficulty: 'Easy',
        statement:
          'Given an unsorted array arr and a target value, return the first index where target is found. Return -1 if the target does not exist.',
        inputLabel: 'arr = [7, 3, 9, 1, 5], target = 9',
        outputLabel: '2',
        hint: 'Walk left to right; return the first index where arr[i] equals the target.',
        diagram: 'linear-search',
        trace: [
          { step: 'i=0', detail: '7 ≠ 9' },
          { step: 'i=1', detail: '3 ≠ 9' },
          { step: 'i=2', detail: '9 == 9 → return 2' },
        ],
        approach: [
          'Start at index 0 and compare arr[i] with target.',
          'On match, return i immediately (first occurrence).',
          'If the loop ends with no match, return -1.',
          'Works on unsorted data — no precondition.',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < (int)arr.size(); i++)
        if (arr[i] == target) return i;
    return -1;
}

int main() {
    vector<int> arr = {7, 3, 9, 1, 5};
    cout << linearSearch(arr, 9); // 2
    return 0;
}`,
          java: `public class Main {
    static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++)
            if (arr[i] == target) return i;
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {7, 3, 9, 1, 5};
        System.out.println(linearSearch(arr, 9)); // 2
    }
}`,
          python: `def linear_search(arr, target):
    for i, x in enumerate(arr):
        if x == target:
            return i
    return -1

print(linear_search([7, 3, 9, 1, 5], 9))  # 2`,
        },
      },
      {
        id: 'p18',
        number: 18,
        topicId: 't9',
        topicTitle: 'Searching',
        title: 'First and Last Occurrence',
        difficulty: 'Medium',
        statement:
          'Given an array (may contain duplicates) and a target, return the first and last indices where target appears. If absent, return [-1, -1].',
        inputLabel: 'arr = [5, 7, 7, 8, 8, 10], target = 8',
        outputLabel: '[3, 4]',
        hint: 'One linear pass: record the first hit; keep updating last on every later hit.',
        diagram: 'first-last',
        trace: [
          { step: 'Scan', detail: 'first = -1, last = -1' },
          { step: 'i=3, 8', detail: 'first = 3, last = 3' },
          { step: 'i=4, 8', detail: 'last = 4' },
          { step: 'End', detail: 'return [3, 4]' },
        ],
        approach: [
          'Initialize first = last = -1.',
          'On each match: if first is still -1, set it; always set last.',
          'Single pass — no need for binary search yet (preview for later).',
          'Return [first, last].',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> searchRange(vector<int>& arr, int target) {
    int first = -1, last = -1;
    for (int i = 0; i < (int)arr.size(); i++) {
        if (arr[i] == target) {
            if (first == -1) first = i;
            last = i;
        }
    }
    return {first, last};
}

int main() {
    vector<int> arr = {5, 7, 7, 8, 8, 10};
    auto r = searchRange(arr, 8);
    cout << r[0] << ", " << r[1]; // 3, 4
    return 0;
}`,
          java: `public class Main {
    static int[] searchRange(int[] arr, int target) {
        int first = -1, last = -1;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                if (first == -1) first = i;
                last = i;
            }
        }
        return new int[]{first, last};
    }

    public static void main(String[] args) {
        int[] arr = {5, 7, 7, 8, 8, 10};
        int[] r = searchRange(arr, 8);
        System.out.println(r[0] + ", " + r[1]); // 3, 4
    }
}`,
          python: `def search_range(arr, target):
    first = last = -1
    for i, x in enumerate(arr):
        if x == target:
            if first == -1:
                first = i
            last = i
    return [first, last]

print(search_range([5, 7, 7, 8, 8, 10], 8))  # [3, 4]`,
        },
      },
    ],
  },
  {
    id: 't10',
    index: 10,
    hours: 'Hours 5–6',
    hoursTitle: 'Core Algorithms',
    title: 'Sorting',
    subtitle: 'Elementary comparison sorts you should be able to write',
    problems: [
      {
        id: 'p19',
        number: 19,
        topicId: 't10',
        topicTitle: 'Sorting',
        title: 'Bubble Sort',
        difficulty: 'Easy',
        statement:
          'Sort an array of integers in non-decreasing order using bubble sort. After each outer pass, the largest unsorted value “bubbles” to the end. Return the sorted array.',
        inputLabel: 'arr = [5, 1, 4, 2, 8]',
        outputLabel: '[1, 2, 4, 5, 8]',
        hint: 'Repeatedly swap adjacent out-of-order pairs; stop early if a pass makes zero swaps.',
        diagram: 'bubble-sort',
        trace: [
          { step: 'Pass 1', detail: '[5,1,4,2,8] → [1,4,2,5,8]' },
          { step: 'Pass 2', detail: '→ [1,2,4,5,8]' },
          { step: 'Pass 3', detail: '→ [1,2,4,5,8] no swaps → done' },
          { step: 'Result', detail: '[1, 2, 4, 5, 8]' },
        ],
        approach: [
          'Outer loop runs up to n-1 times.',
          'Inner loop compares adjacent pairs and swaps if left > right.',
          'After pass i, the last i elements are fixed.',
          'Track swapped flag — exit early when sorted.',
        ],
        time: 'O(n²)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}

int main() {
    vector<int> arr = {5, 1, 4, 2, 8};
    bubbleSort(arr);
    for (int x : arr) cout << x << " "; // 1 2 4 5 8
    return 0;
}`,
          java: `public class Main {
    static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int t = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = t;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] arr = {5, 1, 4, 2, 8};
        bubbleSort(arr);
        System.out.println(java.util.Arrays.toString(arr)); // [1, 2, 4, 5, 8]
    }
}`,
          python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

print(bubble_sort([5, 1, 4, 2, 8]))  # [1, 2, 4, 5, 8]`,
        },
      },
      {
        id: 'p20',
        number: 20,
        topicId: 't10',
        topicTitle: 'Sorting',
        title: 'Selection Sort',
        difficulty: 'Easy',
        statement:
          'Sort an array in non-decreasing order using selection sort: repeatedly select the minimum from the unsorted suffix and swap it into place.',
        inputLabel: 'arr = [64, 25, 12, 22, 11]',
        outputLabel: '[11, 12, 22, 25, 64]',
        hint: 'For each index i, find the minimum in arr[i..n-1] and swap it with arr[i].',
        diagram: 'selection-sort',
        trace: [
          { step: 'i=0', detail: 'min=11 at idx 4 → swap → [11,25,12,22,64]' },
          { step: 'i=1', detail: 'min=12 → [11,12,25,22,64]' },
          { step: 'i=2', detail: 'min=22 → [11,12,22,25,64]' },
          { step: 'i=3', detail: 'already ordered → [11,12,22,25,64]' },
        ],
        approach: [
          'For i from 0 to n-2, assume minIndex = i.',
          'Scan j from i+1..n-1; update minIndex when arr[j] is smaller.',
          'Swap arr[i] with arr[minIndex] (skip if already i).',
          'Fixed cost ~n²/2 comparisons regardless of input order.',
        ],
        time: 'O(n²)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[minIdx]) minIdx = j;
        if (minIdx != i) swap(arr[i], arr[minIdx]);
    }
}

int main() {
    vector<int> arr = {64, 25, 12, 22, 11};
    selectionSort(arr);
    for (int x : arr) cout << x << " "; // 11 12 22 25 64
    return 0;
}`,
          java: `public class Main {
    static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++)
                if (arr[j] < arr[minIdx]) minIdx = j;
            if (minIdx != i) {
                int t = arr[i];
                arr[i] = arr[minIdx];
                arr[minIdx] = t;
            }
        }
    }

    public static void main(String[] args) {
        int[] arr = {64, 25, 12, 22, 11};
        selectionSort(arr);
        System.out.println(java.util.Arrays.toString(arr)); // [11, 12, 22, 25, 64]
    }
}`,
          python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

print(selection_sort([64, 25, 12, 22, 11]))  # [11, 12, 22, 25, 64]`,
        },
      },
    ],
  },
  {
    id: 't11',
    index: 11,
    hours: 'Hours 5–6',
    hoursTitle: 'Core Algorithms',
    title: 'Binary Search',
    subtitle: 'Halve the search space every step — O(log n)',
    problems: [
      {
        id: 'p21',
        number: 21,
        topicId: 't11',
        topicTitle: 'Binary Search',
        title: 'Binary Search (Iterative)',
        difficulty: 'Easy',
        statement:
          'Given a sorted array in ascending order and a target, find the index of the target using binary search. Return -1 if not present. Do it iteratively.',
        inputLabel: 'arr = [2, 5, 8, 12, 16, 23], target = 16',
        outputLabel: '4',
        note: 'Array must be sorted — binary search assumes order.',
        hint: 'Compare target with the middle element; discard half of the range each step.',
        diagram: 'binsearch',
        trace: [
          { step: 'lo=0 hi=5', detail: 'mid=2, arr[2]=8 < 16 → lo=3' },
          { step: 'lo=3 hi=5', detail: 'mid=4, arr[4]=16 == 16 → return 4' },
        ],
        approach: [
          'Maintain inclusive range [lo, hi].',
          'mid = lo + (hi - lo) / 2 (avoids overflow).',
          'arr[mid] < target → search right half; > target → left half.',
          'Equal → return mid; empty range → -1.',
        ],
        time: 'O(log n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int binarySearch(vector<int>& arr, int target) {
    int lo = 0, hi = (int)arr.size() - 1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return -1;
}

int main() {
    vector<int> arr = {2, 5, 8, 12, 16, 23};
    cout << binarySearch(arr, 16); // 4
    return 0;
}`,
          java: `public class Main {
    static int binarySearch(int[] arr, int target) {
        int lo = 0, hi = arr.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {2, 5, 8, 12, 16, 23};
        System.out.println(binarySearch(arr, 16)); // 4
    }
}`,
          python: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

print(binary_search([2, 5, 8, 12, 16, 23], 16))  # 4`,
        },
      },
      {
        id: 'p22',
        number: 22,
        topicId: 't11',
        topicTitle: 'Binary Search',
        title: 'First Occurrence (Lower Bound)',
        difficulty: 'Medium',
        statement:
          'In a sorted array with duplicates, return the index of the first (leftmost) occurrence of target using binary search. Return -1 if absent.',
        inputLabel: 'arr = [1, 2, 2, 2, 3], target = 2',
        outputLabel: '1',
        hint: 'When arr[mid] == target, still go left — keep searching for an earlier hit.',
        diagram: 'lower-bound',
        trace: [
          { step: 'lo=0 hi=4', detail: 'mid=2, arr[2]=2 == target → ans=2, hi=1' },
          { step: 'lo=0 hi=1', detail: 'mid=0, arr[0]=1 < 2 → lo=1' },
          { step: 'lo=1 hi=1', detail: 'mid=1, arr[1]=2 → ans=1, hi=0' },
          { step: 'Done', detail: 'return 1' },
        ],
        approach: [
          'Like normal binary search, but on match record ans = mid.',
          'On match, also set hi = mid - 1 to look left.',
          'Continue until range is empty; return ans (or -1).',
          'This is the classic lower_bound idea.',
        ],
        time: 'O(log n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int firstOccurrence(vector<int>& arr, int target) {
    int lo = 0, hi = (int)arr.size() - 1, ans = -1;
    while (lo <= hi) {
        int mid = lo + (hi - lo) / 2;
        if (arr[mid] == target) {
            ans = mid;
            hi = mid - 1;
        } else if (arr[mid] < target) lo = mid + 1;
        else hi = mid - 1;
    }
    return ans;
}

int main() {
    vector<int> arr = {1, 2, 2, 2, 3};
    cout << firstOccurrence(arr, 2); // 1
    return 0;
}`,
          java: `public class Main {
    static int firstOccurrence(int[] arr, int target) {
        int lo = 0, hi = arr.length - 1, ans = -1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (arr[mid] == target) {
                ans = mid;
                hi = mid - 1;
            } else if (arr[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return ans;
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 2, 2, 3};
        System.out.println(firstOccurrence(arr, 2)); // 1
    }
}`,
          python: `def first_occurrence(arr, target):
    lo, hi, ans = 0, len(arr) - 1, -1
    while lo <= hi:
        mid = lo + (hi - lo) // 2
        if arr[mid] == target:
            ans = mid
            hi = mid - 1
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return ans

print(first_occurrence([1, 2, 2, 2, 3], 2))  # 1`,
        },
      },
    ],
  },
  {
    id: 't12',
    index: 12,
    hours: 'Hours 5–6',
    hoursTitle: 'Core Algorithms',
    title: 'Functions',
    subtitle: 'Clear inputs, clear outputs — reusable building blocks',
    problems: [
      {
        id: 'p23',
        number: 23,
        topicId: 't12',
        topicTitle: 'Functions',
        title: 'Sum of Digits',
        difficulty: 'Easy',
        statement:
          'Write a function that takes a non-negative integer and returns the sum of its digits. Example: 1234 → 10.',
        inputLabel: 'n = 1234',
        outputLabel: '10',
        hint: 'Repeatedly take n % 10 (last digit) and n //= 10 until n becomes 0.',
        diagram: 'digit-sum',
        trace: [
          { step: 'n=1234', detail: 'digit 4, sum=4 → n=123' },
          { step: 'n=123', detail: 'digit 3, sum=7 → n=12' },
          { step: 'n=12', detail: 'digit 2, sum=9 → n=1' },
          { step: 'n=1', detail: 'digit 1, sum=10 → n=0' },
          { step: 'Return', detail: '10' },
        ],
        approach: [
          'Function signature: int digitSum(int n).',
          'Accumulate n % 10 while dividing n by 10.',
          'Loop ends when n == 0; return the accumulator.',
          'Edge: n = 0 → 0 (loop never runs, sum stays 0).',
        ],
        time: 'O(d), d = number of digits',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int digitSum(int n) {
    if (n < 0) n = -n;
    int sum = 0;
    while (n > 0) {
        sum += n % 10;
        n /= 10;
    }
    return sum;
}

int main() {
    cout << digitSum(1234); // 10
    return 0;
}`,
          java: `public class Main {
    static int digitSum(int n) {
        if (n < 0) n = -n;
        int sum = 0;
        while (n > 0) {
            sum += n % 10;
            n /= 10;
        }
        return sum;
    }

    public static void main(String[] args) {
        System.out.println(digitSum(1234)); // 10
    }
}`,
          python: `def digit_sum(n):
    n = abs(n)
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total

print(digit_sum(1234))  # 10`,
        },
      },
      {
        id: 'p24',
        number: 24,
        topicId: 't12',
        topicTitle: 'Functions',
        title: 'Palindrome Number Check',
        difficulty: 'Easy',
        statement:
          'Write a function that returns true if an integer reads the same forwards and backwards (e.g. 121 → true, 123 → false).',
        inputLabel: 'n = 1221',
        outputLabel: 'true',
        hint: 'Reverse the digits with % 10 / /= 10, then compare the reversed value to the original.',
        diagram: 'num-palindrome',
        trace: [
          { step: 'n=1221', detail: 'rev: 1 → 12 → 122 → 1221' },
          { step: 'Compare', detail: 'rev 1221 == original 1221' },
          { step: 'Return', detail: 'true' },
        ],
        approach: [
          'Handle negatives → false by definition.',
          'Build rev = rev * 10 + n % 10 while n > 0.',
          'Compare rev with the original value.',
          'Avoid converting to string (works on digits only).',
        ],
        time: 'O(d)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

bool isPalindromeNum(int n) {
    if (n < 0) return false;
    long long orig = n, rev = 0;
    while (n > 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    return rev == orig;
}

int main() {
    cout << (isPalindromeNum(1221) ? "true" : "false"); // true
    return 0;
}`,
          java: `public class Main {
    static boolean isPalindromeNum(int n) {
        if (n < 0) return false;
        long orig = n, rev = 0;
        int x = n;
        while (x > 0) {
            rev = rev * 10 + x % 10;
            x /= 10;
        }
        return rev == orig;
    }

    public static void main(String[] args) {
        System.out.println(isPalindromeNum(1221)); // true
    }
}`,
          python: `def is_palindrome_num(n):
    if n < 0:
        return False
    orig, rev, x = n, 0, n
    while x > 0:
        rev = rev * 10 + x % 10
        x //= 10
    return rev == orig

print(is_palindrome_num(1221))  # True`,
        },
      },
    ],
  },
  {
    id: 't13',
    index: 13,
    hours: 'Hours 5–6',
    hoursTitle: 'Core Algorithms',
    title: 'Recursion',
    subtitle: 'Base case + smaller subproblem — nothing else',
    problems: [
      {
        id: 'p25',
        number: 25,
        topicId: 't13',
        topicTitle: 'Recursion',
        title: 'Factorial Using Recursion',
        difficulty: 'Easy',
        statement:
          'Compute n! recursively. Define 0! = 1 and 1! = 1. For n < 0, treat as invalid (return -1 or throw).',
        inputLabel: 'n = 5',
        outputLabel: '120',
        hint: 'base: n <= 1 → 1; recursive: n * factorial(n - 1).',
        diagram: 'fact-rec',
        trace: [
          { step: 'fact(5)', detail: '5 * fact(4)' },
          { step: 'fact(4)', detail: '4 * fact(3)' },
          { step: 'fact(3)', detail: '3 * fact(2)' },
          { step: 'fact(2)', detail: '2 * fact(1)' },
          { step: 'fact(1)', detail: 'base → 1' },
          { step: 'Unwind', detail: '2→6→24→120' },
        ],
        approach: [
          'Base case: if n <= 1 return 1.',
          'Recursive case: return n * f(n - 1).',
          'Call stack depth is n — fine for interview-sized n.',
          'Watch overflow for large n (long long / BigInteger).',
        ],
        time: 'O(n)',
        space: 'O(n) call stack',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

long long factorial(int n) {
    if (n < 0) return -1;
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

int main() {
    cout << factorial(5); // 120
    return 0;
}`,
          java: `public class Main {
    static long factorial(int n) {
        if (n < 0) return -1;
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(factorial(5)); // 120
    }
}`,
          python: `def factorial(n):
    if n < 0:
        return -1
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120`,
        },
      },
      {
        id: 'p26',
        number: 26,
        topicId: 't13',
        topicTitle: 'Recursion',
        title: 'Nth Fibonacci Number',
        difficulty: 'Medium',
        statement:
          'Return the nth Fibonacci number recursively, where F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n ≥ 2.',
        inputLabel: 'n = 7',
        outputLabel: '13',
        note: 'Sequence: 0, 1, 1, 2, 3, 5, 8, 13, …',
        hint: 'Two base cases (0→0, 1→1) then sum the two recursive calls.',
        diagram: 'fib-rec',
        trace: [
          { step: 'fib(7)', detail: 'fib(6) + fib(5)' },
          { step: 'Left spine', detail: 'fib(6)→fib(5)→fib(4)→…→fib(1)' },
          { step: 'Bases', detail: 'fib(0)=0, fib(1)=1' },
          { step: 'Combine', detail: '… 5+8 = 13' },
          { step: 'Answer', detail: '13' },
        ],
        approach: [
          'Base cases: fib(0)=0, fib(1)=1.',
          'Return fib(n-1) + fib(n-2).',
          'Naive recursion is O(2^n) — mention memoization in interviews.',
          'Interview follow-up: bottom-up DP or matrix exponentiation.',
        ],
        time: 'O(2^n) naive',
        space: 'O(n) call stack',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int fib(int n) {
    if (n < 0) return -1;
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

int main() {
    cout << fib(7); // 13
    return 0;
}`,
          java: `public class Main {
    static int fib(int n) {
        if (n < 0) return -1;
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }

    public static void main(String[] args) {
        System.out.println(fib(7)); // 13
    }
}`,
          python: `def fib(n):
    if n < 0:
        return -1
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(7))  # 13`,
        },
      },
    ],
  },
  {
    id: 't14',
    index: 14,
    hours: 'Hours 5–6',
    hoursTitle: 'Core Algorithms',
    title: 'Basic Mathematical Problems',
    subtitle: 'GCD, primes, and the arithmetic you must not fumble',
    problems: [
      {
        id: 'p27',
        number: 27,
        topicId: 't14',
        topicTitle: 'Basic Mathematical Problems',
        title: 'GCD of Two Numbers',
        difficulty: 'Easy',
        statement:
          'Compute the greatest common divisor (GCD) of two non-negative integers using the Euclidean algorithm.',
        inputLabel: 'a = 48, b = 18',
        outputLabel: '6',
        hint: 'While b ≠ 0: replace (a, b) with (b, a % b). When b is 0, a is the GCD.',
        diagram: 'gcd',
        trace: [
          { step: '48, 18', detail: '48 % 18 = 12 → (18, 12)' },
          { step: '18, 12', detail: '18 % 12 = 6 → (12, 6)' },
          { step: '12, 6', detail: '12 % 6 = 0 → (6, 0)' },
          { step: 'b=0', detail: 'GCD = 6' },
        ],
        approach: [
          'Euclidean identity: gcd(a, b) = gcd(b, a % b).',
          'Base: if b == 0, return a.',
          'Loop or recurse until b becomes 0.',
          'LCM can be derived: a / gcd(a,b) * b.',
        ],
        time: 'O(log min(a,b))',
        space: 'O(1) iterative',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int gcd(int a, int b) {
    while (b != 0) {
        int t = b;
        b = a % b;
        a = t;
    }
    return a;
}

int main() {
    cout << gcd(48, 18); // 6
    return 0;
}`,
          java: `public class Main {
    static int gcd(int a, int b) {
        while (b != 0) {
            int t = b;
            b = a % b;
            a = t;
        }
        return a;
    }

    public static void main(String[] args) {
        System.out.println(gcd(48, 18)); // 6
    }
}`,
          python: `def gcd(a, b):
    while b != 0:
        a, b = b, a % b
    return a

print(gcd(48, 18))  # 6`,
        },
      },
      {
        id: 'p28',
        number: 28,
        topicId: 't14',
        topicTitle: 'Basic Mathematical Problems',
        title: 'Check If a Number Is Prime',
        difficulty: 'Medium',
        statement:
          'Return true if the integer n is prime (divisible only by 1 and itself), otherwise false. n may be small or large; handle n < 2.',
        inputLabel: 'n = 29',
        outputLabel: 'true',
        note: 'n < 2 → false. Only need to test divisors up to √n.',
        hint: 'Reject n < 2; try dividing by 2, then odd i up to √n — any divisor means not prime.',
        diagram: 'prime',
        trace: [
          { step: 'n=29', detail: 'n ≥ 2, not divisible by 2' },
          { step: 'i=3', detail: '29 % 3 ≠ 0' },
          { step: 'i=5', detail: '5*5=25 ≤ 29, 29 % 5 ≠ 0' },
          { step: 'i=7', detail: '7*7=49 > 29 → stop' },
          { step: 'Result', detail: 'no divisor → prime' },
        ],
        approach: [
          'n < 2 → false; n is 2 or 3 → true; even or divisible by 3 → false.',
          'Check odd i from 5 while i * i <= n.',
          'If n % i == 0 for any i, not prime.',
          '√n bound keeps it fast for interview limits.',
        ],
        time: 'O(√n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

bool isPrime(int n) {
    if (n < 2) return false;
    if (n % 2 == 0) return n == 2;
    for (int i = 3; i * i <= n; i += 2)
        if (n % i == 0) return false;
    return true;
}

int main() {
    cout << (isPrime(29) ? "true" : "false"); // true
    return 0;
}`,
          java: `public class Main {
    static boolean isPrime(int n) {
        if (n < 2) return false;
        if (n % 2 == 0) return n == 2;
        for (int i = 3; i * i <= n; i += 2)
            if (n % i == 0) return false;
        return true;
    }

    public static void main(String[] args) {
        System.out.println(isPrime(29)); // true
    }
}`,
          python: `def is_prime(n):
    if n < 2:
        return False
    if n % 2 == 0:
        return n == 2
    i = 3
    while i * i <= n:
        if n % i == 0:
            return False
        i += 2
    return True

print(is_prime(29))  # True`,
        },
      },
    ],
  },
  {
    id: 't15',
    index: 15,
    hours: 'Hours 7–8',
    hoursTitle: 'Application Problems',
    title: 'Hashing / Dictionaries',
    subtitle: 'Maps and sets as first-choice containers',
    problems: [
      {
        id: 'p29',
        number: 29,
        topicId: 't15',
        topicTitle: 'Hashing / Dictionaries',
        title: 'Two Sum (Hash Map)',
        difficulty: 'Easy',
        statement:
          'Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. You may assume exactly one solution exists and you cannot use the same element twice.',
        inputLabel: 'nums = [2, 7, 11, 15], target = 9',
        outputLabel: '[0, 1]',
        hint: 'For each nums[i], look up target − nums[i] in a map of already-seen values.',
        diagram: 'hash-two-sum',
        trace: [
          { step: 'i=0, 2', detail: 'need 7 · map empty · store 2→0' },
          { step: 'i=1, 7', detail: 'need 2 · found at 0 → [0, 1]' },
        ],
        approach: [
          'Walk the array once with a value→index hash map.',
          'For nums[i], compute complement = target − nums[i].',
          'If complement is already in the map, return both indices.',
          'Otherwise insert nums[i] and continue.',
        ],
        time: 'O(n)',
        space: 'O(n)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < (int)nums.size(); i++) {
        int need = target - nums[i];
        if (seen.count(need)) return {seen[need], i};
        seen[nums[i]] = i;
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    auto r = twoSum(nums, 9);
    cout << r[0] << ", " << r[1]; // 0, 1
    return 0;
}`,
          java: `public class Main {
    static int[] twoSum(int[] nums, int target) {
        java.util.Map<Integer, Integer> seen = new java.util.HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (seen.containsKey(need))
                return new int[]{seen.get(need), i};
            seen.put(nums[i], i);
        }
        return new int[]{};
    }

    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int[] r = twoSum(nums, 9);
        System.out.println(r[0] + ", " + r[1]); // 0, 1
    }
}`,
          python: `def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        need = target - x
        if need in seen:
            return [seen[need], i]
        seen[x] = i
    return []

print(two_sum([2, 7, 11, 15], 9))  # [0, 1]`,
        },
      },
      {
        id: 'p30',
        number: 30,
        topicId: 't15',
        topicTitle: 'Hashing / Dictionaries',
        title: 'Intersection of Two Arrays',
        difficulty: 'Medium',
        statement:
          'Given two integer arrays, return their intersection as a list of unique elements (each value appears once even if repeated in input).',
        inputLabel: 'a = [1, 2, 2, 1], b = [2, 2]',
        outputLabel: '[2]',
        hint: 'Put one array in a set; for each element of the other, collect if present, then dedupe.',
        diagram: 'intersection',
        trace: [
          { step: 'set(a)', detail: '{1, 2}' },
          { step: 'b: 2', detail: 'in set → add 2' },
          { step: 'b: 2', detail: 'already collected → skip' },
          { step: 'Result', detail: '[2]' },
        ],
        approach: [
          'Build a hash set from array a.',
          'Walk b; if element is in the set, add to a result set.',
          'Convert result set to list for unique output.',
          'Order does not matter unless specified.',
        ],
        time: 'O(n + m)',
        space: 'O(n)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> intersection(vector<int>& a, vector<int>& b) {
    unordered_set<int> inA(a.begin(), a.end());
    unordered_set<int> res;
    for (int x : b)
        if (inA.count(x)) res.insert(x);
    return vector<int>(res.begin(), res.end());
}

int main() {
    vector<int> a = {1, 2, 2, 1}, b = {2, 2};
    auto r = intersection(a, b);
    for (int x : r) cout << x << " "; // 2
    return 0;
}`,
          java: `public class Main {
    static java.util.List<Integer> intersection(int[] a, int[] b) {
        java.util.Set<Integer> inA = new java.util.HashSet<>();
        for (int x : a) inA.add(x);
        java.util.Set<Integer> res = new java.util.LinkedHashSet<>();
        for (int x : b)
            if (inA.contains(x)) res.add(x);
        return new java.util.ArrayList<>(res);
    }

    public static void main(String[] args) {
        int[] a = {1, 2, 2, 1}, b = {2, 2};
        System.out.println(intersection(a, b)); // [2]
    }
}`,
          python: `def intersection(a, b):
    in_a = set(a)
    res = []
    seen = set()
    for x in b:
        if x in in_a and x not in seen:
            seen.add(x)
            res.append(x)
    return res

print(intersection([1, 2, 2, 1], [2, 2]))  # [2]`,
        },
      },
    ],
  },
  {
    id: 't16',
    index: 16,
    hours: 'Hours 7–8',
    hoursTitle: 'Application Problems',
    title: 'Pair-Sum Problems',
    subtitle: 'Find two values that meet a target sum',
    problems: [
      {
        id: 'p31',
        number: 31,
        topicId: 't16',
        topicTitle: 'Pair-Sum Problems',
        title: 'Pair With Given Sum (Two Pointers)',
        difficulty: 'Easy',
        statement:
          'Given a sorted array and a target sum, return true if any pair of elements adds up to the target. You may sort first if the input is unsorted.',
        inputLabel: 'arr = [1, 2, 4, 6, 8, 11], target = 10',
        outputLabel: 'true',
        note: 'Pair (2, 8) or (4, 6) both work.',
        hint: 'Pointers at both ends: sum too small → move left up; too big → move right down.',
        diagram: 'pair-two-pointer',
        trace: [
          { step: 'L=1 R=11', detail: 'sum=12 > 10 → R--' },
          { step: 'L=1 R=8', detail: 'sum=9 < 10 → L++' },
          { step: 'L=2 R=8', detail: 'sum=10 == target → true' },
        ],
        approach: [
          'Sort if needed (or assume sorted for the two-pointer form).',
          'L = 0, R = n − 1.',
          'sum < target → L++; sum > target → R--; equal → true.',
          'If L and R cross, no pair exists.',
        ],
        time: 'O(n log n) if sorting · O(n) if already sorted',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

bool pairWithSum(vector<int> arr, int target) {
    sort(arr.begin(), arr.end());
    int L = 0, R = (int)arr.size() - 1;
    while (L < R) {
        int sum = arr[L] + arr[R];
        if (sum == target) return true;
        if (sum < target) L++;
        else R--;
    }
    return false;
}

int main() {
    cout << (pairWithSum({1, 2, 4, 6, 8, 11}, 10) ? "true" : "false"); // true
    return 0;
}`,
          java: `public class Main {
    static boolean pairWithSum(int[] arr, int target) {
        java.util.Arrays.sort(arr);
        int L = 0, R = arr.length - 1;
        while (L < R) {
            int sum = arr[L] + arr[R];
            if (sum == target) return true;
            if (sum < target) L++;
            else R--;
        }
        return false;
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 4, 6, 8, 11};
        System.out.println(pairWithSum(arr, 10)); // true
    }
}`,
          python: `def pair_with_sum(arr, target):
    arr = sorted(arr)
    L, R = 0, len(arr) - 1
    while L < R:
        s = arr[L] + arr[R]
        if s == target:
            return True
        if s < target:
            L += 1
        else:
            R -= 1
    return False

print(pair_with_sum([1, 2, 4, 6, 8, 11], 10))  # True`,
        },
      },
      {
        id: 'p32',
        number: 32,
        topicId: 't16',
        topicTitle: 'Pair-Sum Problems',
        title: 'Closest Pair Sum',
        difficulty: 'Medium',
        statement:
          'Given a sorted array and a target, find a pair whose sum is closest to the target. Return that sum (assume at least two elements). Ties: any valid sum is fine.',
        inputLabel: 'arr = [1, 3, 4, 7, 10], target = 15',
        outputLabel: '14',
        note: 'Pair (4, 10) → 14; (7, 10) → 17 is farther.',
        hint: 'Same two-pointer walk — track the best |sum − target| seen so far.',
        diagram: 'pair-closest',
        trace: [
          { step: 'L=1 R=10', detail: 'sum=11, diff=4 → best=11' },
          { step: 'L=3 R=10', detail: 'sum=13, diff=2 → best=13' },
          { step: 'L=4 R=10', detail: 'sum=14, diff=1 → best=14' },
          { step: 'L=7 R=10', detail: 'sum=17, diff=2 → keep 14' },
          { step: 'Done', detail: 'return 14' },
        ],
        approach: [
          'Sort if needed; L = 0, R = n − 1.',
          'Track bestSum and minDiff = |sum − target|.',
          'Always move the pointer on the side that reduces the sum gap.',
          'Return bestSum after the walk.',
        ],
        time: 'O(n log n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int closestPairSum(vector<int>& arr, int target) {
    int L = 0, R = (int)arr.size() - 1;
    int best = arr[L] + arr[R];
    while (L < R) {
        int sum = arr[L] + arr[R];
        if (abs(sum - target) < abs(best - target)) best = sum;
        if (sum < target) L++;
        else R--;
    }
    return best;
}

int main() {
    vector<int> arr = {1, 3, 4, 7, 10};
    cout << closestPairSum(arr, 15); // 14
    return 0;
}`,
          java: `public class Main {
    static int closestPairSum(int[] arr, int target) {
        int L = 0, R = arr.length - 1;
        int best = arr[L] + arr[R];
        while (L < R) {
            int sum = arr[L] + arr[R];
            if (Math.abs(sum - target) < Math.abs(best - target)) best = sum;
            if (sum < target) L++;
            else R--;
        }
        return best;
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 4, 7, 10};
        System.out.println(closestPairSum(arr, 15)); // 14
    }
}`,
          python: `def closest_pair_sum(arr, target):
    L, R = 0, len(arr) - 1
    best = arr[L] + arr[R]
    while L < R:
        s = arr[L] + arr[R]
        if abs(s - target) < abs(best - target):
            best = s
        if s < target:
            L += 1
        else:
            R -= 1
    return best

print(closest_pair_sum([1, 3, 4, 7, 10], 15))  # 14`,
        },
      },
    ],
  },
  {
    id: 't17',
    index: 17,
    hours: 'Hours 7–8',
    hoursTitle: 'Application Problems',
    title: 'Matrix Problems',
    subtitle: 'Transpose, rotate, and reshape in place',
    problems: [
      {
        id: 'p33',
        number: 33,
        topicId: 't17',
        topicTitle: 'Matrix Problems',
        title: 'Transpose of a Matrix',
        difficulty: 'Easy',
        statement:
          'Given an m × n matrix, compute its transpose: rows become columns and columns become rows. For square matrices, do it in place (swap across the diagonal).',
        inputLabel: 'mat = [[1, 2], [3, 4]]',
        outputLabel: '[[1, 3], [2, 4]]',
        hint: 'Swap mat[i][j] with mat[j][i] for i < j (square case), or write into a new n × m matrix.',
        diagram: 'transpose',
        trace: [
          { step: 'Start', detail: '[[1, 2], [3, 4]]' },
          { step: 'Swap (0,1)', detail: '2 ↔ 3' },
          { step: 'Result', detail: '[[1, 3], [2, 4]]' },
        ],
        approach: [
          'Square: for i in 0..n-1, for j in i+1..n-1, swap mat[i][j] and mat[j][i].',
          'Rectangular: allocate result[j][i] = mat[i][j].',
          'Only visit upper (or lower) triangle once to avoid double-swap.',
        ],
        time: 'O(m × n)',
        space: 'O(1) square · O(m × n) general',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

void transposeSquare(vector<vector<int>>& mat) {
    int n = mat.size();
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            swap(mat[i][j], mat[j][i]);
}

int main() {
    vector<vector<int>> mat = {{1, 2}, {3, 4}};
    transposeSquare(mat);
    for (auto& row : mat) {
        for (int x : row) cout << x << " ";
        cout << "\\n";
    }
    // 1 3
    // 2 4
    return 0;
}`,
          java: `public class Main {
    static void transposeSquare(int[][] mat) {
        int n = mat.length;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                int t = mat[i][j];
                mat[i][j] = mat[j][i];
                mat[j][i] = t;
            }
    }

    public static void main(String[] args) {
        int[][] mat = {{1, 2}, {3, 4}};
        transposeSquare(mat);
        for (int[] row : mat)
            System.out.println(java.util.Arrays.toString(row));
        // [1, 3]
        // [2, 4]
    }
}`,
          python: `def transpose_square(mat):
    n = len(mat)
    for i in range(n):
        for j in range(i + 1, n):
            mat[i][j], mat[j][i] = mat[j][i], mat[i][j]
    return mat

print(transpose_square([[1, 2], [3, 4]]))  # [[1, 3], [2, 4]]`,
        },
      },
      {
        id: 'p34',
        number: 34,
        topicId: 't17',
        topicTitle: 'Matrix Problems',
        title: 'Rotate Matrix 90° Clockwise',
        difficulty: 'Medium',
        statement:
          'Rotate an n × n matrix by 90 degrees clockwise in place.',
        inputLabel: 'mat = [[1, 2], [3, 4]]',
        outputLabel: '[[3, 1], [4, 2]]',
        note: 'Right becomes bottom; (i, j) → (j, n-1-i).',
        hint: 'Transpose first (swap across diagonal), then reverse each row.',
        diagram: 'rotate-mat',
        trace: [
          { step: 'Start', detail: '[[1, 2], [3, 4]]' },
          { step: 'Transpose', detail: '[[1, 3], [2, 4]]' },
          { step: 'Reverse rows', detail: '[[3, 1], [4, 2]]' },
        ],
        approach: [
          'Step 1: transpose — swap mat[i][j] with mat[j][i].',
          'Step 2: reverse every row left↔right.',
          'Equivalent to the (i,j) → (j, n-1-i) remap done carefully.',
          'No extra matrix required.',
        ],
        time: 'O(n²)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

void rotate90(vector<vector<int>>& mat) {
    int n = mat.size();
    for (int i = 0; i < n; i++)
        for (int j = i + 1; j < n; j++)
            swap(mat[i][j], mat[j][i]);
    for (auto& row : mat) reverse(row.begin(), row.end());
}

int main() {
    vector<vector<int>> mat = {{1, 2}, {3, 4}};
    rotate90(mat);
    for (auto& row : mat) {
        for (int x : row) cout << x << " ";
        cout << "\\n";
    }
    // 3 1
    // 4 2
    return 0;
}`,
          java: `public class Main {
    static void rotate90(int[][] mat) {
        int n = mat.length;
        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++) {
                int t = mat[i][j];
                mat[i][j] = mat[j][i];
                mat[j][i] = t;
            }
        for (int[] row : mat) {
            int L = 0, R = row.length - 1;
            while (L < R) {
                int t = row[L];
                row[L++] = row[R];
                row[R--] = t;
            }
        }
    }

    public static void main(String[] args) {
        int[][] mat = {{1, 2}, {3, 4}};
        rotate90(mat);
        for (int[] row : mat)
            System.out.println(java.util.Arrays.toString(row));
        // [3, 1]
        // [4, 2]
    }
}`,
          python: `def rotate90(mat):
    n = len(mat)
    for i in range(n):
        for j in range(i + 1, n):
            mat[i][j], mat[j][i] = mat[j][i], mat[i][j]
    for row in mat:
        row.reverse()
    return mat

print(rotate90([[1, 2], [3, 4]]))  # [[3, 1], [4, 2]]`,
        },
      },
    ],
  },
  {
    id: 't18',
    index: 18,
    hours: 'Hours 7–8',
    hoursTitle: 'Application Problems',
    title: '2D-Array Traversal',
    subtitle: 'Walk rows, columns, boundaries, and spirals',
    problems: [
      {
        id: 'p35',
        number: 35,
        topicId: 't18',
        topicTitle: '2D-Array Traversal',
        title: 'Search in Row-Column Sorted Matrix',
        difficulty: 'Medium',
        statement:
          'Given an m × n matrix where each row is sorted left→right and each column is sorted top→bottom, determine whether a target value exists. Do better than O(m × n).',
        inputLabel: 'mat = [[1, 4, 7], [2, 5, 8], [3, 6, 9]], target = 5',
        outputLabel: 'true',
        hint: 'Start at top-right (or bottom-left): smaller → go left, larger → go down.',
        diagram: 'mat-search',
        trace: [
          { step: 'Start (0,2)', detail: '7 > 5 → go left' },
          { step: '(0,1)', detail: '4 < 5 → go down' },
          { step: '(1,1)', detail: '5 == 5 → true' },
        ],
        approach: [
          'Begin at the top-right corner (row 0, col n−1).',
          'If current > target, eliminate the column (move left).',
          'If current < target, eliminate the row (move down).',
          'Match → true; leave bounds → false. At most m + n steps.',
        ],
        time: 'O(m + n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

bool searchMatrix(vector<vector<int>>& mat, int target) {
    int r = 0, c = (int)mat[0].size() - 1;
    while (r < (int)mat.size() && c >= 0) {
        if (mat[r][c] == target) return true;
        if (mat[r][c] > target) c--;
        else r++;
    }
    return false;
}

int main() {
    vector<vector<int>> mat = {{1, 4, 7}, {2, 5, 8}, {3, 6, 9}};
    cout << (searchMatrix(mat, 5) ? "true" : "false"); // true
    return 0;
}`,
          java: `public class Main {
    static boolean searchMatrix(int[][] mat, int target) {
        int r = 0, c = mat[0].length - 1;
        while (r < mat.length && c >= 0) {
            if (mat[r][c] == target) return true;
            if (mat[r][c] > target) c--;
            else r++;
        }
        return false;
    }

    public static void main(String[] args) {
        int[][] mat = {{1, 4, 7}, {2, 5, 8}, {3, 6, 9}};
        System.out.println(searchMatrix(mat, 5)); // true
    }
}`,
          python: `def search_matrix(mat, target):
    r, c = 0, len(mat[0]) - 1
    while r < len(mat) and c >= 0:
        if mat[r][c] == target:
            return True
        if mat[r][c] > target:
            c -= 1
        else:
            r += 1
    return False

print(search_matrix([[1, 4, 7], [2, 5, 8], [3, 6, 9]], 5))  # True`,
        },
      },
      {
        id: 'p36',
        number: 36,
        topicId: 't18',
        topicTitle: '2D-Array Traversal',
        title: 'Spiral Order Traversal',
        difficulty: 'Medium',
        statement:
          'Return all elements of an m × n matrix in spiral (clockwise) order starting from the top-left corner.',
        inputLabel: 'mat = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]',
        outputLabel: '[1, 2, 3, 6, 9, 8, 7, 4, 5]',
        hint: 'Maintain top/bottom/left/right bounds; peel one layer at a time and shrink them.',
        diagram: 'spiral',
        trace: [
          { step: 'Top row', detail: '1 2 3 → shrink top' },
          { step: 'Right col', detail: '6 9 → shrink right' },
          { step: 'Bottom', detail: '8 7 → shrink bottom' },
          { step: 'Left', detail: '4 → shrink left' },
          { step: 'Center', detail: '5 → done' },
        ],
        approach: [
          'Bounds: top, bottom, left, right.',
          'Go right along top → top++; down right col → right--;',
          'left along bottom (if top ≤ bottom) → bottom--; up left col → left++.',
          'Stop when bounds cross.',
        ],
        time: 'O(m × n)',
        space: 'O(1) extra (besides output)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> spiralOrder(vector<vector<int>>& mat) {
    vector<int> res;
    if (mat.empty()) return res;
    int top = 0, bottom = (int)mat.size() - 1;
    int left = 0, right = (int)mat[0].size() - 1;
    while (top <= bottom && left <= right) {
        for (int c = left; c <= right; c++) res.push_back(mat[top][c]);
        top++;
        for (int r = top; r <= bottom; r++) res.push_back(mat[r][right]);
        right--;
        if (top <= bottom) {
            for (int c = right; c >= left; c--) res.push_back(mat[bottom][c]);
            bottom--;
        }
        if (left <= right) {
            for (int r = bottom; r >= top; r--) res.push_back(mat[r][left]);
            left++;
        }
    }
    return res;
}

int main() {
    vector<vector<int>> mat = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
    auto r = spiralOrder(mat);
    for (int x : r) cout << x << " "; // 1 2 3 6 9 8 7 4 5
    return 0;
}`,
          java: `public class Main {
    static java.util.List<Integer> spiralOrder(int[][] mat) {
        java.util.List<Integer> res = new java.util.ArrayList<>();
        if (mat.length == 0) return res;
        int top = 0, bottom = mat.length - 1;
        int left = 0, right = mat[0].length - 1;
        while (top <= bottom && left <= right) {
            for (int c = left; c <= right; c++) res.add(mat[top][c]);
            top++;
            for (int r = top; r <= bottom; r++) res.add(mat[r][right]);
            right--;
            if (top <= bottom) {
                for (int c = right; c >= left; c--) res.add(mat[bottom][c]);
                bottom--;
            }
            if (left <= right) {
                for (int r = bottom; r >= top; r--) res.add(mat[r][left]);
                left++;
            }
        }
        return res;
    }

    public static void main(String[] args) {
        int[][] mat = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        System.out.println(spiralOrder(mat)); // [1, 2, 3, 6, 9, 8, 7, 4, 5]
    }
}`,
          python: `def spiral_order(mat):
    if not mat:
        return []
    res = []
    top, bottom = 0, len(mat) - 1
    left, right = 0, len(mat[0]) - 1
    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            res.append(mat[top][c])
        top += 1
        for r in range(top, bottom + 1):
            res.append(mat[r][right])
        right -= 1
        if top <= bottom:
            for c in range(right, left - 1, -1):
                res.append(mat[bottom][c])
            bottom -= 1
        if left <= right:
            for r in range(bottom, top - 1, -1):
                res.append(mat[r][left])
            left += 1
    return res

print(spiral_order([[1, 2, 3], [4, 5, 6], [7, 8, 9]]))
# [1, 2, 3, 6, 9, 8, 7, 4, 5]`,
        },
      },
    ],
  },
  {
    id: 't19',
    index: 19,
    hours: 'Hours 7–8',
    hoursTitle: 'Application Problems',
    title: 'Practical Problem-Solving',
    subtitle: 'Classic one-pass patterns that show up in real screens',
    problems: [
      {
        id: 'p37',
        number: 37,
        topicId: 't19',
        topicTitle: 'Practical Problem-Solving',
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        statement:
          'Given daily prices of a stock, choose one day to buy and a different day in the future to sell to maximize profit. Return the maximum profit (0 if no profit is possible).',
        inputLabel: 'prices = [7, 1, 5, 3, 6, 4]',
        outputLabel: '5',
        note: 'Buy at 1, sell at 6 → profit 5.',
        hint: 'Track the minimum price seen so far; at each day compute price − min_so_far.',
        diagram: 'stock',
        trace: [
          { step: '7', detail: 'min=7, profit=0' },
          { step: '1', detail: 'min=1, profit=0' },
          { step: '5', detail: 'profit=4 → best=4' },
          { step: '3', detail: 'min=1, profit=2 → keep 4' },
          { step: '6', detail: 'profit=5 → best=5' },
          { step: '4', detail: 'profit=3 → answer 5' },
        ],
        approach: [
          'One pass left to right.',
          'Track minPrice = cheapest buy day so far.',
          'Profit today = prices[i] − minPrice; keep the max.',
          'If price falls, update minPrice (never sell at a loss more than 0).',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX, best = 0;
    for (int p : prices) {
        minPrice = min(minPrice, p);
        best = max(best, p - minPrice);
    }
    return best;
}

int main() {
    vector<int> prices = {7, 1, 5, 3, 6, 4};
    cout << maxProfit(prices); // 5
    return 0;
}`,
          java: `public class Main {
    static int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE, best = 0;
        for (int p : prices) {
            minPrice = Math.min(minPrice, p);
            best = Math.max(best, p - minPrice);
        }
        return best;
    }

    public static void main(String[] args) {
        int[] prices = {7, 1, 5, 3, 6, 4};
        System.out.println(maxProfit(prices)); // 5
    }
}`,
          python: `def max_profit(prices):
    min_price = float("inf")
    best = 0
    for p in prices:
        min_price = min(min_price, p)
        best = max(best, p - min_price)
    return best

print(max_profit([7, 1, 5, 3, 6, 4]))  # 5`,
        },
      },
      {
        id: 'p38',
        number: 38,
        topicId: 't19',
        topicTitle: 'Practical Problem-Solving',
        title: 'Maximum Subarray Sum (Kadane)',
        difficulty: 'Medium',
        statement:
          'Given an integer array, find the contiguous subarray with the largest sum and return that sum. (At least one element — empty subarray is not allowed.)',
        inputLabel: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]',
        outputLabel: '6',
        note: 'Subarray [4, -1, 2, 1] sums to 6.',
        hint: 'Kadane: curr = max(x, curr + x); track the global max of curr.',
        diagram: 'kadane',
        trace: [
          { step: '-2', detail: 'curr=-2, best=-2' },
          { step: '1', detail: 'curr=max(1, -1)=1, best=1' },
          { step: '-3, 4', detail: 'curr=-2 → 4, best=4' },
          { step: '-1, 2, 1', detail: 'curr=3→5→6, best=6' },
          { step: '-5, 4', detail: 'curr=1→5, best stays 6' },
          { step: 'Answer', detail: '6' },
        ],
        approach: [
          'Initialize curr = best = nums[0].',
          'For each x: curr = max(x, curr + x) — restart if dropping hurts.',
          'best = max(best, curr).',
          'Works with all-negative arrays (picks the largest single element).',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int maxSubArray(vector<int>& nums) {
    int curr = nums[0], best = nums[0];
    for (int i = 1; i < (int)nums.size(); i++) {
        curr = max(nums[i], curr + nums[i]);
        best = max(best, curr);
    }
    return best;
}

int main() {
    vector<int> nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    cout << maxSubArray(nums); // 6
    return 0;
}`,
          java: `public class Main {
    static int maxSubArray(int[] nums) {
        int curr = nums[0], best = nums[0];
        for (int i = 1; i < nums.length; i++) {
            curr = Math.max(nums[i], curr + nums[i]);
            best = Math.max(best, curr);
        }
        return best;
    }

    public static void main(String[] args) {
        int[] nums = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
        System.out.println(maxSubArray(nums)); // 6
    }
}`,
          python: `def max_sub_array(nums):
    curr = best = nums[0]
    for x in nums[1:]:
        curr = max(x, curr + x)
        best = max(best, curr)
    return best

print(max_sub_array([-2, 1, -3, 4, -1, 2, 1, -5, 4]))  # 6`,
        },
      },
    ],
  },
  {
    id: 't20',
    index: 20,
    hours: 'Hours 9–10',
    hoursTitle: 'Interview-Level Patterns',
    title: 'Stack and Queue Applications',
    subtitle: 'Monotonic stacks and FIFO discipline',
    problems: [
      {
        id: 'p39',
        number: 39,
        topicId: 't20',
        topicTitle: 'Stack and Queue Applications',
        title: 'Next Greater Element',
        difficulty: 'Medium',
        statement:
          'Given an array of integers, for each element find the next greater element to its right (the first element that is strictly greater). If none exists, write −1.',
        inputLabel: 'nums = [2, 1, 2, 4, 3]',
        outputLabel: '[4, 4, 4, -1, -1]',
        note: 'Output aligns index-wise with input.',
        hint: 'Process left to right; keep indices whose answer is still unknown on a stack.',
        diagram: 'next-greater',
        trace: [
          { step: 'i=0, 2', detail: 'stack empty · push 0' },
          { step: 'i=1, 1', detail: '1 < 2 · push 1' },
          { step: 'i=2, 2', detail: '2 > 1 → ans[1]=2 · 2≯2 · push' },
          { step: 'i=3, 4', detail: '4 > 2 → ans[2]=4 · 4 > 2 → ans[0]=4' },
          { step: 'i=4, 3', detail: '3 < 4 · push · leftovers → −1' },
        ],
        approach: [
          'Scan left to right with a stack of indices awaiting an answer.',
          'While stack non-empty and nums[i] > nums[top]: record answer, pop.',
          'Push i. Indices still on the stack at the end get −1.',
        ],
        time: 'O(n)',
        space: 'O(n)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> nextGreater(vector<int>& nums) {
    int n = nums.size();
    vector<int> ans(n, -1);
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && nums[i] > nums[st.top()]) {
            ans[st.top()] = nums[i];
            st.pop();
        }
        st.push(i);
    }
    return ans;
}

int main() {
    vector<int> nums = {2, 1, 2, 4, 3};
    auto r = nextGreater(nums);
    for (int x : r) cout << x << " "; // 4 4 4 -1 -1
    return 0;
}`,
          java: `public class Main {
    static int[] nextGreater(int[] nums) {
        int n = nums.length;
        int[] ans = new int[n];
        java.util.Arrays.fill(ans, -1);
        java.util.ArrayDeque<Integer> st = new java.util.ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!st.isEmpty() && nums[i] > nums[st.peek()]) {
                ans[st.pop()] = nums[i];
            }
            st.push(i);
        }
        return ans;
    }

    public static void main(String[] args) {
        int[] r = nextGreater(new int[]{2, 1, 2, 4, 3});
        for (int x : r) System.out.print(x + " "); // 4 4 4 -1 -1
    }
}`,
          python: `def next_greater(nums):
    n = len(nums)
    ans = [-1] * n
    st = []
    for i in range(n):
        while st and nums[i] > nums[st[-1]]:
            ans[st.pop()] = nums[i]
        st.append(i)
    return ans

print(next_greater([2, 1, 2, 4, 3]))  # [4, 4, 4, -1, -1]`,
        },
      },
      {
        id: 'p40',
        number: 40,
        topicId: 't20',
        topicTitle: 'Stack and Queue Applications',
        title: 'Queue Using Two Stacks',
        difficulty: 'Easy',
        statement:
          'Implement a FIFO queue using only two stacks (LIFO). Support enqueue(x) and dequeue(). Each operation must be O(1) amortized.',
        inputLabel: 'enqueue 1, 2, 3 · dequeue',
        outputLabel: '1',
        note: 'Second dequeue returns 2.',
        hint: 'Pour all of stack A onto stack B only when stack B is empty.',
        diagram: 'queue-stacks',
        trace: [
          { step: 'enq 1,2,3', detail: 'inStack = [3, 2, 1] (3 on top)' },
          { step: 'deq', detail: 'out empty → move in→out' },
          { step: 'after move', detail: 'outStack = [1, 2, 3] (1 on top)' },
          { step: 'pop out', detail: 'return 1' },
          { step: 'deq again', detail: 'pop out → 2' },
        ],
        approach: [
          'Two stacks: inStack for enqueue, outStack for dequeue.',
          'Enqueue always pushes onto inStack.',
          'Dequeue: if outStack is empty, pop everything from inStack onto outStack.',
          'Then pop outStack. Each element is moved at most twice → amortized O(1).',
        ],
        time: 'O(1) amortized per operation',
        space: 'O(n)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

struct Queue2Stacks {
    stack<int> inS, outS;

    void enqueue(int x) { inS.push(x); }

    int dequeue() {
        if (outS.empty()) {
            while (!inS.empty()) {
                outS.push(inS.top());
                inS.pop();
            }
        }
        int v = outS.top();
        outS.pop();
        return v;
    }
};

int main() {
    Queue2Stacks q;
    q.enqueue(1); q.enqueue(2); q.enqueue(3);
    cout << q.dequeue() << " " << q.dequeue(); // 1 2
    return 0;
}`,
          java: `public class Main {
    static class Queue2Stacks {
        java.util.ArrayDeque<Integer> in = new java.util.ArrayDeque<>();
        java.util.ArrayDeque<Integer> out = new java.util.ArrayDeque<>();

        void enqueue(int x) { in.push(x); }

        int dequeue() {
            if (out.isEmpty()) {
                while (!in.isEmpty()) out.push(in.pop());
            }
            return out.pop();
        }
    }

    public static void main(String[] args) {
        Queue2Stacks q = new Queue2Stacks();
        q.enqueue(1); q.enqueue(2); q.enqueue(3);
        System.out.println(q.dequeue() + " " + q.dequeue()); // 1 2
    }
}`,
          python: `class Queue2Stacks:
    def __init__(self):
        self.in_s = []
        self.out_s = []

    def enqueue(self, x):
        self.in_s.append(x)

    def dequeue(self):
        if not self.out_s:
            while self.in_s:
                self.out_s.append(self.in_s.pop())
        return self.out_s.pop()

q = Queue2Stacks()
q.enqueue(1); q.enqueue(2); q.enqueue(3)
print(q.dequeue(), q.dequeue())  # 1 2`,
        },
      },
    ],
  },
  {
    id: 't21',
    index: 21,
    hours: 'Hours 9–10',
    hoursTitle: 'Interview-Level Patterns',
    title: 'Balanced Parentheses',
    subtitle: 'Match, nest, and measure bracket validity',
    problems: [
      {
        id: 'p41',
        number: 41,
        topicId: 't21',
        topicTitle: 'Balanced Parentheses',
        title: 'Valid Parentheses',
        difficulty: 'Easy',
        statement:
          'Given a string containing just the characters ( ) { } [ ], determine if the input string is valid: brackets must close the same type in the correct order.',
        inputLabel: 's = "([{}])"',
        outputLabel: 'true',
        note: 's = "([)]" would be false.',
        hint: 'Push opening brackets; on a closer, check it matches the stack top.',
        diagram: 'valid-parens',
        trace: [
          { step: '(', detail: 'push ( → stack [(]' },
          { step: '[', detail: 'push [ → stack [(,[]' },
          { step: '{', detail: 'push { → stack [(,[,{]' },
          { step: '}', detail: '{ matches · pop' },
          { step: '])', detail: 'both match · stack empty → true' },
        ],
        approach: [
          'Scan left to right.',
          'Opening bracket → push it.',
          'Closing bracket → stack must be non-empty and top must be its partner.',
          'Valid only if the stack is empty at the end.',
        ],
        time: 'O(n)',
        space: 'O(n)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    unordered_map<char, char> match = {{')','('}, {']','['}, {'}','{'}};
    for (char c : s) {
        if (!match.count(c)) st.push(c);
        else {
            if (st.empty() || st.top() != match[c]) return false;
            st.pop();
        }
    }
    return st.empty();
}

int main() {
    cout << boolalpha << isValid("([{}])"); // true
    return 0;
}`,
          java: `public class Main {
    static boolean isValid(String s) {
        java.util.Deque<Character> st = new java.util.ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') st.push(c);
            else {
                if (st.isEmpty()) return false;
                char top = st.pop();
                if (c == ')' && top != '(') return false;
                if (c == ']' && top != '[') return false;
                if (c == '}' && top != '{') return false;
            }
        }
        return st.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println(isValid("([{}])")); // true
    }
}`,
          python: `def is_valid(s):
    st = []
    match = {')': '(', ']': '[', '}': '{'}
    for c in s:
        if c not in match:
            st.append(c)
        elif not st or st.pop() != match[c]:
            return False
    return not st

print(is_valid("([{}])"))  # True`,
        },
      },
      {
        id: 'p42',
        number: 42,
        topicId: 't21',
        topicTitle: 'Balanced Parentheses',
        title: 'Longest Valid Parentheses',
        difficulty: 'Medium',
        statement:
          'Given a string containing only the characters ( and ), find the length of the longest valid (well-formed) contiguous substring.',
        inputLabel: 's = ")()())"',
        outputLabel: '4',
        note: 'Substring "()()" has length 4.',
        hint: 'Keep a stack of indices with a −1 base so each match measures i − stack.top().',
        diagram: 'longest-valid',
        trace: [
          { step: 'i=0 )', detail: 'stack [-1] · unmatched · push 0' },
          { step: 'i=1 (', detail: 'push 1 → [-1? no, base was cleared] → [0,1]' },
          { step: 'i=2 )', detail: 'pop · len = 2 − 0 = 2 · best=2' },
          { step: 'i=3 (', detail: 'push → [0,3]' },
          { step: 'i=4 )', detail: 'pop · len = 4 − 0 = 4 · best=4' },
          { step: 'i=5 )', detail: 'stack empty → push 5 as new base' },
        ],
        approach: [
          'Stack starts with base index −1.',
          '"(" pushes its index. ")" pops the top (a match or the base).',
          'If the stack becomes empty after a pop, push i as the new base.',
          'Otherwise best = max(best, i − stack.top()).',
        ],
        time: 'O(n)',
        space: 'O(n)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int longestValidParentheses(string s) {
    stack<int> st;
    st.push(-1);
    int best = 0;
    for (int i = 0; i < (int)s.size(); i++) {
        if (s[i] == '(') st.push(i);
        else {
            st.pop();
            if (st.empty()) st.push(i);
            else best = max(best, i - st.top());
        }
    }
    return best;
}

int main() {
    cout << longestValidParentheses(")()())"); // 4
    return 0;
}`,
          java: `public class Main {
    static int longestValidParentheses(String s) {
        java.util.Deque<Integer> st = new java.util.ArrayDeque<>();
        st.push(-1);
        int best = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '(') st.push(i);
            else {
                st.pop();
                if (st.isEmpty()) st.push(i);
                else best = Math.max(best, i - st.peek());
            }
        }
        return best;
    }

    public static void main(String[] args) {
        System.out.println(longestValidParentheses(")()())")); // 4
    }
}`,
          python: `def longest_valid(s):
    st = [-1]
    best = 0
    for i, c in enumerate(s):
        if c == '(':
            st.append(i)
        else:
            st.pop()
            if not st:
                st.append(i)
            else:
                best = max(best, i - st[-1])
    return best

print(longest_valid(")()())"))  # 4`,
        },
      },
    ],
  },
  {
    id: 't22',
    index: 22,
    hours: 'Hours 9–10',
    hoursTitle: 'Interview-Level Patterns',
    title: 'Two Pointers',
    subtitle: 'Converging or writing indices over one pass',
    problems: [
      {
        id: 'p43',
        number: 43,
        topicId: 't22',
        topicTitle: 'Two Pointers',
        title: 'Remove Duplicates from Sorted Array',
        difficulty: 'Easy',
        statement:
          'Given a sorted array, remove duplicates in place and return the new length. The first k elements of the array must hold the unique values.',
        inputLabel: 'nums = [1, 1, 2, 2, 3]',
        outputLabel: '3 · nums becomes [1, 2, 3, ...]',
        hint: 'A slow pointer writes unique values; a fast pointer scans ahead.',
        diagram: 'inplace-dedup',
        trace: [
          { step: 'write=0', detail: 'nums[0]=1 · keep' },
          { step: 'i=1, 1', detail: 'dup · skip' },
          { step: 'i=2, 2', detail: 'new → nums[1]=2 · write=2' },
          { step: 'i=3, 2', detail: 'dup · skip' },
          { step: 'i=4, 3', detail: 'new → nums[2]=3 · k=3' },
        ],
        approach: [
          'write = 0. For each i from 1: if nums[i] != nums[write], write++, copy.',
          'Unique values are packed at the front.',
          'Return write as the new length.',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    int w = 0;
    for (int i = 1; i < (int)nums.size(); i++)
        if (nums[i] != nums[w]) nums[++w] = nums[i];
    return w + 1;
}

int main() {
    vector<int> nums = {1, 1, 2, 2, 3};
    int k = removeDuplicates(nums);
    cout << k << " · ";
    for (int i = 0; i < k; i++) cout << nums[i] << " "; // 3 · 1 2 3
    return 0;
}`,
          java: `public class Main {
    static int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int w = 0;
        for (int i = 1; i < nums.length; i++)
            if (nums[i] != nums[w]) nums[++w] = nums[i];
        return w + 1;
    }

    public static void main(String[] args) {
        int[] nums = {1, 1, 2, 2, 3};
        int k = removeDuplicates(nums);
        for (int i = 0; i < k; i++) System.out.print(nums[i] + " "); // 1 2 3
        System.out.println("k=" + k);
    }
}`,
          python: `def remove_duplicates(nums):
    if not nums:
        return 0
    w = 0
    for i in range(1, len(nums)):
        if nums[i] != nums[w]:
            w += 1
            nums[w] = nums[i]
    return w + 1

nums = [1, 1, 2, 2, 3]
k = remove_duplicates(nums)
print(k, nums[:k])  # 3 [1, 2, 3]`,
        },
      },
      {
        id: 'p44',
        number: 44,
        topicId: 't22',
        topicTitle: 'Two Pointers',
        title: 'Container With Most Water',
        difficulty: 'Medium',
        statement:
          'Given heights of vertical lines drawn at each index, pick two lines that together with the x-axis form a container holding the most water. Return the maximum area.',
        inputLabel: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]',
        outputLabel: '49',
        note: 'Lines at index 1 (h=8) and index 8 (h=7): min 7 × width 7 = 49.',
        hint: 'Start at both ends; move the shorter line inward (a taller one may beat the lost width).',
        diagram: 'container-water',
        trace: [
          { step: 'L=0 R=8', detail: 'area=1×8=8 · move L (1<7)' },
          { step: 'L=1 R=8', detail: 'area=7×7=49 · best=49 · move R' },
          { step: 'L=1 R=7', detail: 'area=3×6=18 · move R' },
          { step: 'L=1 R=6', detail: 'area=8×5=40 · move R' },
          { step: 'ends meet', detail: 'answer 49' },
        ],
        approach: [
          'L = 0, R = n − 1, best = 0.',
          'Area = min(h[L], h[R]) × (R − L); update best.',
          'Advance the pointer at the shorter line (the only way to improve).',
          'Stop when L meets R.',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int maxArea(vector<int>& h) {
    int L = 0, R = (int)h.size() - 1, best = 0;
    while (L < R) {
        best = max(best, min(h[L], h[R]) * (R - L));
        if (h[L] < h[R]) L++;
        else R--;
    }
    return best;
}

int main() {
    vector<int> h = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    cout << maxArea(h); // 49
    return 0;
}`,
          java: `public class Main {
    static int maxArea(int[] h) {
        int L = 0, R = h.length - 1, best = 0;
        while (L < R) {
            best = Math.max(best, Math.min(h[L], h[R]) * (R - L));
            if (h[L] < h[R]) L++;
            else R--;
        }
        return best;
    }

    public static void main(String[] args) {
        int[] h = {1, 8, 6, 2, 5, 4, 8, 3, 7};
        System.out.println(maxArea(h)); // 49
    }
}`,
          python: `def max_area(h):
    L, R, best = 0, len(h) - 1, 0
    while L < R:
        best = max(best, min(h[L], h[R]) * (R - L))
        if h[L] < h[R]:
            L += 1
        else:
            R -= 1
    return best

print(max_area([1, 8, 6, 2, 5, 4, 8, 3, 7]))  # 49`,
        },
      },
    ],
  },
  {
    id: 't23',
    index: 23,
    hours: 'Hours 9–10',
    hoursTitle: 'Interview-Level Patterns',
    title: 'Sliding Window',
    subtitle: 'Fixed and variable windows over contiguous spans',
    problems: [
      {
        id: 'p45',
        number: 45,
        topicId: 't23',
        topicTitle: 'Sliding Window',
        title: 'Maximum Sum Subarray of Size K',
        difficulty: 'Easy',
        statement:
          'Given an array of integers and a window size k, find the contiguous subarray of length k with the largest sum. Assume n >= k.',
        inputLabel: 'arr = [2, 1, 5, 1, 3, 2], k = 3',
        outputLabel: '9',
        note: 'Window [5, 1, 3] sums to 9.',
        hint: 'Keep a running window sum: add the incoming element, subtract the one leaving.',
        diagram: 'window-sum-k',
        trace: [
          { step: 'first window', detail: '2+1+5 = 8 · best=8' },
          { step: 'slide +5−2', detail: '1+5+1 = 7 · keep 8' },
          { step: 'slide +1−1', detail: '5+1+3 = 9 · best=9' },
          { step: 'slide +3−5', detail: '1+3+2 = 6 · keep 9' },
          { step: 'done', detail: 'answer 9' },
        ],
        approach: [
          'Build the sum of the first window arr[0..k-1].',
          'For each slide: sum += incoming − outgoing.',
          'Track the maximum sum seen.',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int maxSumK(vector<int>& arr, int k) {
    int sum = 0;
    for (int i = 0; i < k; i++) sum += arr[i];
    int best = sum;
    for (int i = k; i < (int)arr.size(); i++) {
        sum += arr[i] - arr[i - k];
        best = max(best, sum);
    }
    return best;
}

int main() {
    vector<int> arr = {2, 1, 5, 1, 3, 2};
    cout << maxSumK(arr, 3); // 9
    return 0;
}`,
          java: `public class Main {
    static int maxSumK(int[] arr, int k) {
        int sum = 0;
        for (int i = 0; i < k; i++) sum += arr[i];
        int best = sum;
        for (int i = k; i < arr.length; i++) {
            sum += arr[i] - arr[i - k];
            best = Math.max(best, sum);
        }
        return best;
    }

    public static void main(String[] args) {
        System.out.println(maxSumK(new int[]{2, 1, 5, 1, 3, 2}, 3)); // 9
    }
}`,
          python: `def max_sum_k(arr, k):
    s = sum(arr[:k])
    best = s
    for i in range(k, len(arr)):
        s += arr[i] - arr[i - k]
        best = max(best, s)
    return best

print(max_sum_k([2, 1, 5, 1, 3, 2], 3))  # 9`,
        },
      },
      {
        id: 'p46',
        number: 46,
        topicId: 't23',
        topicTitle: 'Sliding Window',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        statement:
          'Given a string s, find the length of the longest contiguous substring that contains no repeated characters.',
        inputLabel: 's = "abcabcbb"',
        outputLabel: '3',
        note: 'Substring "abc" has length 3.',
        hint: 'Expand right; if s[r] already appears in the window, advance left past its last index.',
        diagram: 'window-unique',
        trace: [
          { step: 'r=0..2', detail: 'a b c · window "abc" · best=3' },
          { step: 'r=3, a', detail: 'dup · left = last(a)+1 → "bca"' },
          { step: 'r=4, b', detail: 'left jumps · window "cab" · best=3' },
          { step: 'r=5..7', detail: 'keep size 3 · answer 3' },
        ],
        approach: [
          'Window [left, right] holds unique characters.',
          'Store last index of each character in a map/array.',
          'On a repeat at s[right], set left = max(left, lastIndex + 1).',
          'Update best with right − left + 1.',
        ],
        time: 'O(n)',
        space: 'O(min(n, alphabet))',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> last;
    int left = 0, best = 0;
    for (int right = 0; right < (int)s.size(); right++) {
        if (last.count(s[right]) && last[s[right]] >= left)
            left = last[s[right]] + 1;
        last[s[right]] = right;
        best = max(best, right - left + 1);
    }
    return best;
}

int main() {
    cout << lengthOfLongestSubstring("abcabcbb"); // 3
    return 0;
}`,
          java: `public class Main {
    static int lengthOfLongestSubstring(String s) {
        java.util.Map<Character, Integer> last = new java.util.HashMap<>();
        int left = 0, best = 0;
        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            if (last.containsKey(c) && last.get(c) >= left)
                left = last.get(c) + 1;
            last.put(c, right);
            best = Math.max(best, right - left + 1);
        }
        return best;
    }

    public static void main(String[] args) {
        System.out.println(lengthOfLongestSubstring("abcabcbb")); // 3
    }
}`,
          python: `def length_of_longest_substring(s):
    last = {}
    left = best = 0
    for right, c in enumerate(s):
        if c in last and last[c] >= left:
            left = last[c] + 1
        last[c] = right
        best = max(best, right - left + 1)
    return best

print(length_of_longest_substring("abcabcbb"))  # 3`,
        },
      },
    ],
  },
  {
    id: 't24',
    index: 24,
    hours: 'Hours 9–10',
    hoursTitle: 'Interview-Level Patterns',
    title: 'Prefix Sum',
    subtitle: 'Precompute once, answer ranges in O(1)',
    problems: [
      {
        id: 'p47',
        number: 47,
        topicId: 't24',
        topicTitle: 'Prefix Sum',
        title: 'Range Sum Query',
        difficulty: 'Easy',
        statement:
          'Given an integer array, preprocess it once so each query (l, r) returns the sum of elements from index l to r inclusive in O(1).',
        inputLabel: 'nums = [1, 2, 3, 4], query(1, 3)',
        outputLabel: '9',
        note: '2 + 3 + 4 = 9.',
        hint: 'pref[i] = sum of nums[0..i−1]; the answer is pref[r+1] − pref[l].',
        diagram: 'prefix-range',
        trace: [
          { step: 'build pref', detail: '[0, 1, 3, 6, 10]' },
          { step: 'query(1,3)', detail: 'pref[4] − pref[1]' },
          { step: 'compute', detail: '10 − 1 = 9' },
        ],
        approach: [
          'pref[0] = 0; pref[i] = pref[i−1] + nums[i−1] (length n+1).',
          'sum(l..r) = pref[r+1] − pref[l].',
          'O(n) build, O(1) per query.',
        ],
        time: 'O(n) build · O(1) per query',
        space: 'O(n)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> nums = {1, 2, 3, 4};
    vector<long long> pref = {0};
    for (int x : nums) pref.push_back(pref.back() + x);
    auto query = [&](int l, int r) { return pref[r + 1] - pref[l]; };
    cout << query(1, 3); // 9
    return 0;
}`,
          java: `public class Main {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3, 4};
        long[] pref = new long[nums.length + 1];
        for (int i = 0; i < nums.length; i++)
            pref[i + 1] = pref[i] + nums[i];
        int l = 1, r = 3;
        System.out.println(pref[r + 1] - pref[l]); // 9
    }
}`,
          python: `nums = [1, 2, 3, 4]
pref = [0]
for x in nums:
    pref.append(pref[-1] + x)

def query(l, r):
    return pref[r + 1] - pref[l]

print(query(1, 3))  # 9`,
        },
      },
      {
        id: 'p48',
        number: 48,
        topicId: 't24',
        topicTitle: 'Prefix Sum',
        title: 'Subarray Sum Equals K',
        difficulty: 'Medium',
        statement:
          'Given an integer array nums and an integer k, return the number of contiguous subarrays whose sum equals k.',
        inputLabel: 'nums = [1, 1, 1], k = 2',
        outputLabel: '2',
        note: 'Subarrays [1,1] at positions 0 and 1.',
        hint: 'Count prefix sums seen so far: each time pref − k has appeared, a subarray ends here.',
        diagram: 'prefix-count-k',
        trace: [
          { step: 'pref=1', detail: 'count {1:1} · need 1−2=−1 · 0' },
          { step: 'pref=2', detail: 'need 0 · seen 0 → +1 · count 1' },
          { step: 'pref=3', detail: 'need 1 · seen 1 → +1 · count 2' },
          { step: 'done', detail: 'answer 2' },
        ],
        approach: [
          'Walk the array with a running prefix sum.',
          'In a hash map, record how often each prefix value occurred.',
          'Answer increases by count.get(pref − k).',
          'Initialize map with {0: 1} so subarrays starting at index 0 count.',
        ],
        time: 'O(n)',
        space: 'O(n)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> seen;
    seen[0] = 1;
    int pref = 0, ans = 0;
    for (int x : nums) {
        pref += x;
        if (seen.count(pref - k)) ans += seen[pref - k];
        seen[pref]++;
    }
    return ans;
}

int main() {
    vector<int> nums = {1, 1, 1};
    cout << subarraySum(nums, 2); // 2
    return 0;
}`,
          java: `public class Main {
    static int subarraySum(int[] nums, int k) {
        java.util.Map<Integer, Integer> seen = new java.util.HashMap<>();
        seen.put(0, 1);
        int pref = 0, ans = 0;
        for (int x : nums) {
            pref += x;
            ans += seen.getOrDefault(pref - k, 0);
            seen.put(pref, seen.getOrDefault(pref, 0) + 1);
        }
        return ans;
    }

    public static void main(String[] args) {
        System.out.println(subarraySum(new int[]{1, 1, 1}, 2)); // 2
    }
}`,
          python: `def subarray_sum(nums, k):
    seen = {0: 1}
    pref = ans = 0
    for x in nums:
        pref += x
        ans += seen.get(pref - k, 0)
        seen[pref] = seen.get(pref, 0) + 1
    return ans

print(subarray_sum([1, 1, 1], 2))  # 2`,
        },
      },
    ],
  },
  {
    id: 't25',
    index: 25,
    hours: 'Hours 9–10',
    hoursTitle: 'Interview-Level Patterns',
    title: 'Greedy Approach',
    subtitle: 'Take the locally optimal step — and know it is enough',
    problems: [
      {
        id: 'p49',
        number: 49,
        topicId: 't25',
        topicTitle: 'Greedy Approach',
        title: 'Assign Cookies',
        difficulty: 'Easy',
        statement:
          'Each child i has a greed factor g[i]; each cookie j has size s[j]. A child is content if some cookie with s[j] >= g[i] is assigned to them (one cookie per child). Maximize the number of content children.',
        inputLabel: 'g = [1, 2], s = [1, 2, 3]',
        outputLabel: '2',
        hint: 'Sort both; give the smallest cookie that satisfies the least greedy remaining child.',
        diagram: 'assign-cookies',
        trace: [
          { step: 'sort', detail: 'g=[1,2] · s=[1,2,3]' },
          { step: 'child 1', detail: 'cookie 1 ≥ 1 · take · count=1' },
          { step: 'child 2', detail: 'cookie 2 ≥ 2 · take · count=2' },
          { step: 'done', detail: 'answer 2' },
        ],
        approach: [
          'Sort g ascending and s ascending.',
          'Two pointers: try to satisfy the hungriest unsatisfied child with the smallest cookie that works.',
          'If cookie fits, advance both; else advance cookie only.',
        ],
        time: 'O(n log n + m log m)',
        space: 'O(1) extra',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int findContentChildren(vector<int>& g, vector<int>& s) {
    sort(g.begin(), g.end());
    sort(s.begin(), s.end());
    int i = 0, j = 0;
    while (i < (int)g.size() && j < (int)s.size()) {
        if (s[j] >= g[i]) i++;
        j++;
    }
    return i;
}

int main() {
    vector<int> g = {1, 2}, s = {1, 2, 3};
    cout << findContentChildren(g, s); // 2
    return 0;
}`,
          java: `public class Main {
    static int findContentChildren(int[] g, int[] s) {
        java.util.Arrays.sort(g);
        java.util.Arrays.sort(s);
        int i = 0, j = 0;
        while (i < g.length && j < s.length) {
            if (s[j] >= g[i]) i++;
            j++;
        }
        return i;
    }

    public static void main(String[] args) {
        System.out.println(findContentChildren(new int[]{1, 2}, new int[]{1, 2, 3})); // 2
    }
}`,
          python: `def find_content_children(g, s):
    g.sort()
    s.sort()
    i = j = 0
    while i < len(g) and j < len(s):
        if s[j] >= g[i]:
            i += 1
        j += 1
    return i

print(find_content_children([1, 2], [1, 2, 3]))  # 2`,
        },
      },
      {
        id: 'p50',
        number: 50,
        topicId: 't25',
        topicTitle: 'Greedy Approach',
        title: 'Jump Game',
        difficulty: 'Medium',
        statement:
          'Each index of a non-negative array holds a maximum jump length. Return true if you can reach the last index starting from index 0.',
        inputLabel: 'nums = [2, 3, 1, 1, 4]',
        outputLabel: 'true',
        note: '[3, 2, 1, 0, 4] → false.',
        hint: 'Track the farthest index reachable so far; fail the moment you need to stand beyond it.',
        diagram: 'jump-game',
        trace: [
          { step: 'i=0, 2', detail: 'far = max(far, 0+2) = 2' },
          { step: 'i=1, 3', detail: 'far = 4 · last index → true' },
          { step: 'i=2, 1', detail: 'far stays 4' },
          { step: 'i=3, 1', detail: 'far = 4' },
          { step: 'done', detail: 'far ≥ n−1 → true' },
        ],
        approach: [
          'far = 0: the furthest index we can currently reach.',
          'For each i ≤ far: far = max(far, i + nums[i]).',
          'If far ≥ n − 1 → true. If i exceeds far before finishing → false.',
        ],
        time: 'O(n)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

bool canJump(vector<int>& nums) {
    int far = 0, n = nums.size();
    for (int i = 0; i < n && i <= far; i++) {
        far = max(far, i + nums[i]);
        if (far >= n - 1) return true;
    }
    return n <= 1;
}

int main() {
    vector<int> nums = {2, 3, 1, 1, 4};
    cout << boolalpha << canJump(nums); // true
    return 0;
}`,
          java: `public class Main {
    static boolean canJump(int[] nums) {
        int far = 0, n = nums.length;
        for (int i = 0; i < n && i <= far; i++) {
            far = Math.max(far, i + nums[i]);
            if (far >= n - 1) return true;
        }
        return n <= 1;
    }

    public static void main(String[] args) {
        System.out.println(canJump(new int[]{2, 3, 1, 1, 4})); // true
    }
}`,
          python: `def can_jump(nums):
    far = 0
    n = len(nums)
    for i in range(n):
        if i > far:
            return False
        far = max(far, i + nums[i])
        if far >= n - 1:
            return True
    return n <= 1

print(can_jump([2, 3, 1, 1, 4]))  # True`,
        },
      },
    ],
  },
  {
    id: 't26',
    index: 26,
    hours: 'Hours 9–10',
    hoursTitle: 'Interview-Level Patterns',
    title: 'Choosing the Appropriate Data Structure',
    subtitle: 'Match the access pattern to the container',
    problems: [
      {
        id: 'p51',
        number: 51,
        topicId: 't26',
        topicTitle: 'Choosing the Appropriate Data Structure',
        title: 'Existence Queries with the Right Container',
        difficulty: 'Easy',
        statement:
          'You get a static integer array and many queries asking whether a value exists in it. Preprocess once so each query answers in O(1).',
        inputLabel: 'nums = [4, 1, 7, 1], queries = [1, 5]',
        outputLabel: '[true, false]',
        hint: 'Static + membership → HashSet built once; not a sorted array unless you also need order.',
        diagram: 'unique-set',
        trace: [
          { step: 'build set', detail: '{4, 1, 7}' },
          { step: 'query 1', detail: '1 ∈ set → true' },
          { step: 'query 5', detail: '5 ∉ set → false' },
        ],
        approach: [
          'Pick the container by access pattern: membership → hash set.',
          'Build the set once in O(n).',
          'Answer each query in O(1). Sorting + binary search only if order/range queries are also required.',
        ],
        time: 'O(n) build · O(1) per query',
        space: 'O(n)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

vector<bool> answerQueries(vector<int>& nums, vector<int>& queries) {
    unordered_set<int> seen(nums.begin(), nums.end());
    vector<bool> out;
    for (int q : queries) out.push_back(seen.count(q));
    return out;
}

int main() {
    vector<int> nums = {4, 1, 7, 1}, qs = {1, 5};
    auto r = answerQueries(nums, qs);
    cout << boolalpha << r[0] << " " << r[1]; // true false
    return 0;
}`,
          java: `public class Main {
    static boolean[] answerQueries(int[] nums, int[] queries) {
        java.util.Set<Integer> seen = new java.util.HashSet<>();
        for (int x : nums) seen.add(x);
        boolean[] out = new boolean[queries.length];
        for (int i = 0; i < queries.length; i++)
            out[i] = seen.contains(queries[i]);
        return out;
    }

    public static void main(String[] args) {
        boolean[] r = answerQueries(new int[]{4, 1, 7, 1}, new int[]{1, 5});
        System.out.println(r[0] + " " + r[1]); // true false
    }
}`,
          python: `def answer_queries(nums, queries):
    seen = set(nums)
    return [q in seen for q in queries]

print(answer_queries([4, 1, 7, 1], [1, 5]))  # [True, False]`,
        },
      },
      {
        id: 'p52',
        number: 52,
        topicId: 't26',
        topicTitle: 'Choosing the Appropriate Data Structure',
        title: 'Top K Frequent Elements',
        difficulty: 'Medium',
        statement:
          'Given an integer array nums and an integer k, return the k most frequent elements (any order if tied).',
        inputLabel: 'nums = [1, 1, 1, 2, 2, 3], k = 2',
        outputLabel: '[1, 2]',
        note: 'Counts: 1→3, 2→2, 3→1.',
        hint: 'Frequency map first; then bucket by count (counts sum to n) and read buckets high→low.',
        diagram: 'top-k',
        trace: [
          { step: 'count', detail: '{1:3, 2:2, 3:1}' },
          { step: 'buckets', detail: 'idx3:[1] idx2:[2] idx1:[3]' },
          { step: 'read 3→2', detail: 'take 1, then 2 → k=2' },
        ],
        approach: [
          'Build a frequency map in O(n).',
          'Bucket elements by count: buckets[c] holds values with frequency c.',
          'Scan counts from high to low and collect until k items.',
          'Avoids an O(n log n) full sort when counts are dense in 0..n.',
        ],
        time: 'O(n)',
        space: 'O(n)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> freq;
    for (int x : nums) freq[x]++;
    vector<vector<int>> buckets(nums.size() + 1);
    for (auto& [v, c] : freq) buckets[c].push_back(v);
    vector<int> out;
    for (int c = buckets.size() - 1; c >= 0 && (int)out.size() < k; c--)
        for (int v : buckets[c]) {
            out.push_back(v);
            if ((int)out.size() == k) break;
        }
    return out;
}

int main() {
    vector<int> nums = {1, 1, 1, 2, 2, 3};
    auto r = topKFrequent(nums, 2);
    for (int x : r) cout << x << " "; // 1 2
    return 0;
}`,
          java: `public class Main {
    static int[] topKFrequent(int[] nums, int k) {
        java.util.Map<Integer, Integer> freq = new java.util.HashMap<>();
        for (int x : nums) freq.put(x, freq.getOrDefault(x, 0) + 1);
        @SuppressWarnings("unchecked")
        java.util.List<Integer>[] buckets = new java.util.List[nums.length + 1];
        for (int i = 0; i < buckets.length; i++)
            buckets[i] = new java.util.ArrayList<>();
        for (var e : freq.entrySet()) buckets[e.getValue()].add(e.getKey());
        int[] out = new int[k];
        int idx = 0;
        for (int c = buckets.length - 1; c >= 0 && idx < k; c--)
            for (int v : buckets[c]) {
                if (idx == k) break;
                out[idx++] = v;
            }
        return out;
    }

    public static void main(String[] args) {
        int[] r = topKFrequent(new int[]{1, 1, 1, 2, 2, 3}, 2);
        for (int x : r) System.out.print(x + " "); // 1 2
    }
}`,
          python: `def top_k_frequent(nums, k):
    freq = {}
    for x in nums:
        freq[x] = freq.get(x, 0) + 1
    buckets = [[] for _ in range(len(nums) + 1)]
    for v, c in freq.items():
        buckets[c].append(v)
    out = []
    for c in range(len(buckets) - 1, 0, -1):
        out.extend(buckets[c])
        if len(out) >= k:
            break
    return out[:k]

print(top_k_frequent([1, 1, 1, 2, 2, 3], 2))  # [1, 2]`,
        },
      },
    ],
  },
  {
    id: 't27',
    index: 27,
    hours: 'Hours 11–12',
    hoursTitle: 'OOPs Concepts',
    title: 'Abstraction',
    subtitle: 'Hide how; show what',
    problems: [
      {
        id: 'p53',
        number: 53,
        topicId: 't27',
        topicTitle: 'Abstraction',
        title: 'Abstract Shape with area()',
        difficulty: 'Easy',
        statement:
          'Define a contract Shape with a single method area(). Provide Circle and Rectangle that implement it. Call area() only through Shape references and print both results.',
        inputLabel: 'radius = 2 · w = 3, h = 4',
        outputLabel: '12.57 · 12',
        note: 'π × 2² ≈ 12.57.',
        hint: 'The caller only knows area() — how each shape computes it stays hidden.',
        diagram: 'abstraction',
        trace: [
          { step: 'client', detail: 'holds Shape references only' },
          { step: 'Circle.area', detail: 'π r² → 12.57' },
          { step: 'Rectangle.area', detail: 'w × h → 12' },
        ],
        approach: [
          'Declare a contract (interface / pure virtual) with the operation.',
          'Each concrete type implements the contract its own way.',
          'Client code depends only on the contract, never on the details.',
          'Adding a new shape means a new class — the client stays unchanged.',
        ],
        time: 'O(1) per call (design win, not runtime)',
        space: 'O(1) per object',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

struct Shape {
    virtual double area() const = 0;
    virtual ~Shape() = default;
};

struct Circle : Shape {
    double r;
    explicit Circle(double r) : r(r) {}
    double area() const override { const double PI = acos(-1.0); return PI * r * r; }
};

struct Rectangle : Shape {
    double w, h;
    Rectangle(double w, double h) : w(w), h(h) {}
    double area() const override { return w * h; }
};

int main() {
    vector<unique_ptr<Shape>> shapes;
    shapes.push_back(make_unique<Circle>(2));
    shapes.push_back(make_unique<Rectangle>(3, 4));
    cout << fixed << setprecision(2);
    for (auto& s : shapes) cout << s->area() << " "; // 12.57 12.00
    return 0;
}`,
          java: `interface Shape { double area(); }

class Circle implements Shape {
    private final double r;
    Circle(double r) { this.r = r; }
    public double area() { return Math.PI * r * r; }
}

class Rectangle implements Shape {
    private final double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    public double area() { return w * h; }
}

public class Main {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(2), new Rectangle(3, 4) };
        for (Shape s : shapes)
            System.out.printf("%.2f ", s.area()); // 12.57 12.00
    }
}`,
          python: `from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self): ...

class Circle(Shape):
    def __init__(self, r): self.r = r
    def area(self): return 3.14159265 * self.r ** 2

class Rectangle(Shape):
    def __init__(self, w, h): self.w, self.h = w, h
    def area(self): return self.w * self.h

for s in [Circle(2), Rectangle(3, 4)]:
    print(f"{s.area():.2f}", end=" ")  # 12.57 12.00`,
        },
      },
      {
        id: 'p54',
        number: 54,
        topicId: 't27',
        topicTitle: 'Abstraction',
        title: 'Abstract Class with Shared Concrete Logic',
        difficulty: 'Medium',
        statement:
          'Design an abstract class Employee with an abstract method bonus() and a concrete describe() that combines the name field with bonus(). Create FullTime and Intern subclasses and call describe() through an Employee reference.',
        inputLabel: 'FullTime("Ada", 1000), Intern("Bob", 100)',
        outputLabel: 'Ada bonus 1000 · Bob bonus 100',
        hint: 'State and reusable helpers live in the abstract base; only the varying hook is abstract.',
        diagram: 'abstraction',
        trace: [
          { step: 'base', detail: 'name field + concrete describe()' },
          { step: 'FullTime', detail: 'bonus() → 1000' },
          { step: 'Intern', detail: 'bonus() → 100' },
          { step: 'describe()', detail: 'shared code, different bonus' },
        ],
        approach: [
          'Abstract class: common fields + concrete methods + one or more abstract hooks.',
          'Subclasses implement only the hook (bonus here).',
          'describe() is written once in the base and never duplicated.',
          'Callers use Employee-typed references (same as interfaces).',
        ],
        time: 'O(1) per call',
        space: 'O(1) per object',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

struct Employee {
    string name;
    explicit Employee(string n) : name(n) {}
    virtual int bonus() const = 0;
    string describe() const {
        return name + " bonus " + to_string(bonus());
    }
    virtual ~Employee() = default;
};

struct FullTime : Employee {
    int b;
    FullTime(string n, int b) : Employee(n), b(b) {}
    int bonus() const override { return b; }
};

struct Intern : Employee {
    int b;
    Intern(string n, int b) : Employee(n), b(b) {}
    int bonus() const override { return b; }
};

int main() {
    vector<unique_ptr<Employee>> team;
    team.push_back(make_unique<FullTime>("Ada", 1000));
    team.push_back(make_unique<Intern>("Bob", 100));
    for (auto& e : team) cout << e->describe() << " | "; 
    // Ada bonus 1000 | Bob bonus 100 |
    return 0;
}`,
          java: `abstract class Employee {
    protected final String name;
    Employee(String name) { this.name = name; }
    abstract int bonus();
    String describe() { return name + " bonus " + bonus(); }
}

class FullTime extends Employee {
    private final int b;
    FullTime(String n, int b) { super(n); this.b = b; }
    int bonus() { return b; }
}

class Intern extends Employee {
    private final int b;
    Intern(String n, int b) { super(n); this.b = b; }
    int bonus() { return b; }
}

public class Main {
    public static void main(String[] args) {
        Employee[] team = { new FullTime("Ada", 1000), new Intern("Bob", 100) };
        for (Employee e : team) System.out.print(e.describe() + " | ");
        // Ada bonus 1000 | Bob bonus 100 |
    }
}`,
          python: `from abc import ABC, abstractmethod

class Employee(ABC):
    def __init__(self, name):
        self.name = name
    @abstractmethod
    def bonus(self): ...
    def describe(self):
        return f"{self.name} bonus {self.bonus()}"

class FullTime(Employee):
    def __init__(self, name, b):
        super().__init__(name)
        self.b = b
    def bonus(self):
        return self.b

class Intern(Employee):
    def __init__(self, name, b):
        super().__init__(name)
        self.b = b
    def bonus(self):
        return self.b

for e in [FullTime("Ada", 1000), Intern("Bob", 100)]:
    print(e.describe(), end=" | ")  # Ada bonus 1000 | Bob bonus 100 |`,
        },
      },
    ],
  },
  {
    id: 't28',
    index: 28,
    hours: 'Hours 11–12',
    hoursTitle: 'OOPs Concepts',
    title: 'Encapsulation',
    subtitle: 'Bundle state; guard every mutation',
    problems: [
      {
        id: 'p55',
        number: 55,
        topicId: 't28',
        topicTitle: 'Encapsulation',
        title: 'Bank Account with Validated Access',
        difficulty: 'Easy',
        statement:
          'Model a BankAccount with a private balance. Expose deposit(amount) and withdraw(amount) that reject non-positive amounts and overdrafts, plus a getter getBalance(). The field itself must not be settable from outside.',
        inputLabel: 'deposit(100), withdraw(150), deposit(-5)',
        outputLabel: '100 · rejected · 100',
        hint: 'Keep the field private; force every change through validated methods.',
        diagram: 'encapsulation',
        trace: [
          { step: 'deposit(100)', detail: 'valid · balance = 100' },
          { step: 'withdraw(150)', detail: '150 > 100 · rejected' },
          { step: 'deposit(-5)', detail: 'non-positive · rejected' },
          { step: 'getBalance()', detail: '100' },
        ],
        approach: [
          'Mark the field private (or protected) — no direct outside write.',
          'All mutations go through public methods that check rules.',
          'Getters expose read-only views (return copies for mutable data).',
          'Invariants (balance ≥ 0) can never be broken by clients.',
        ],
        time: 'O(1) per call',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

class BankAccount {
    double balance = 0;
public:
    bool deposit(double amt) {
        if (amt <= 0) return false;
        balance += amt;
        return true;
    }
    bool withdraw(double amt) {
        if (amt <= 0 || amt > balance) return false;
        balance -= amt;
        return true;
    }
    double getBalance() const { return balance; }
};

int main() {
    BankAccount acc;
    acc.deposit(100);
    cout << (acc.withdraw(150) ? "ok" : "rejected") << " ";
    cout << (acc.deposit(-5) ? "ok" : "rejected") << " ";
    cout << acc.getBalance(); // rejected rejected 100
    return 0;
}`,
          java: `public class Main {
    static class BankAccount {
        private double balance = 0;

        boolean deposit(double amt) {
            if (amt <= 0) return false;
            balance += amt;
            return true;
        }
        boolean withdraw(double amt) {
            if (amt <= 0 || amt > balance) return false;
            balance -= amt;
            return true;
        }
        double getBalance() { return balance; }
    }

    public static void main(String[] args) {
        BankAccount acc = new BankAccount();
        acc.deposit(100);
        System.out.print((acc.withdraw(150) ? "ok" : "rejected") + " ");
        System.out.print((acc.deposit(-5) ? "ok" : "rejected") + " ");
        System.out.print(acc.getBalance()); // rejected rejected 100
    }
}`,
          python: `class BankAccount:
    def __init__(self):
        self.__balance = 0

    def deposit(self, amt):
        if amt <= 0:
            return False
        self.__balance += amt
        return True

    def withdraw(self, amt):
        if amt <= 0 or amt > self.__balance:
            return False
        self.__balance -= amt
        return True

    def get_balance(self):
        return self.__balance

acc = BankAccount()
acc.deposit(100)
print("rejected" if not acc.withdraw(150) else "ok", end=" ")
print("rejected" if not acc.deposit(-5) else "ok", end=" ")
print(acc.get_balance())  # rejected rejected 100`,
        },
      },
      {
        id: 'p56',
        number: 56,
        topicId: 't28',
        topicTitle: 'Encapsulation',
        title: 'Private State with an Invariant (Range)',
        difficulty: 'Medium',
        statement:
          'Implement a Range class that keeps low and high private. The constructor and set(low, high) must preserve the invariant low <= high (reject invalid input). Expose getters only — no setters that bypass checks.',
        inputLabel: 'Range(5, 2), then set(1, 9), getLow/getHigh',
        outputLabel: 'rejected · 1 · 9',
        hint: 'Every write path enforces the same rule; getters cannot change state.',
        diagram: 'encapsulation',
        trace: [
          { step: 'Range(5,2)', detail: '5 > 2 · invariant fails · reject' },
          { step: 'set(1,9)', detail: '1 <= 9 · store' },
          { step: 'getLow/getHigh', detail: '1 · 9 (read-only)' },
        ],
        approach: [
          'Fields private; no public field writes.',
          'One private validate(low, high) helper used by constructor and setters.',
          'Invalid calls return false / throw — state stays consistent.',
          'Getters only read; optional getSpan() derived helper is fine.',
        ],
        time: 'O(1) per operation',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

class Range {
    int low = 0, high = 0;
    bool valid(int l, int h) const { return l <= h; }
public:
    Range() = default;
    Range(int l, int h) {
        if (valid(l, h)) { low = l; high = h; }
        else cerr << "rejected\\n";
    }
    bool set(int l, int h) {
        if (!valid(l, h)) return false;
        low = l; high = h;
        return true;
    }
    int getLow() const { return low; }
    int getHigh() const { return high; }
};

int main() {
    Range r(5, 2);           // rejected
    cout << (r.set(1, 9) ? "ok" : "rejected") << " ";
    cout << r.getLow() << " " << r.getHigh(); // ok 1 9
    return 0;
}`,
          java: `public class Main {
    static class Range {
        private int low, high;
        private static boolean valid(int l, int h) { return l <= h; }

        Range(int l, int h) {
            if (valid(l, h)) { low = l; high = h; }
            else System.out.println("rejected");
        }
        boolean set(int l, int h) {
            if (!valid(l, h)) return false;
            low = l; high = h;
            return true;
        }
        int getLow() { return low; }
        int getHigh() { return high; }
    }

    public static void main(String[] args) {
        Range r = new Range(5, 2); // rejected
        System.out.print((r.set(1, 9) ? "ok" : "rejected") + " ");
        System.out.print(r.getLow() + " " + r.getHigh()); // ok 1 9
    }
}`,
          python: `class Range:
    def __init__(self, low=None, high=None):
        self.__low = 0
        self.__high = 0
        if low is not None:
            if not self.__valid(low, high):
                print("rejected")
            else:
                self.__low, self.__high = low, high

    @staticmethod
    def __valid(l, h):
        return l <= h

    def set(self, low, high):
        if not self.__valid(low, high):
            return False
        self.__low, self.__high = low, high
        return True

    def get_low(self): return self.__low
    def get_high(self): return self.__high

r = Range(5, 2)  # rejected
print("ok" if r.set(1, 9) else "rejected", end=" ")
print(r.get_low(), r.get_high())  # ok 1 9`,
        },
      },
    ],
  },
  {
    id: 't29',
    index: 29,
    hours: 'Hours 11–12',
    hoursTitle: 'OOPs Concepts',
    title: 'Method Overloading',
    subtitle: 'Same name, different signatures — compile time',
    problems: [
      {
        id: 'p57',
        number: 57,
        topicId: 't29',
        topicTitle: 'Method Overloading',
        title: 'Overloaded sum() Variants',
        difficulty: 'Easy',
        statement:
          'Overload a method sum so it can add two integers, three integers, or all elements of an integer array. Call each version and print the results.',
        inputLabel: 'sum(1,2), sum(1,2,3), sum([1,2,3])',
        outputLabel: '3 · 6 · 6',
        note: 'Resolved at compile time from the parameter list.',
        hint: 'Overload = same name, different parameter types or counts.',
        diagram: 'overload',
        trace: [
          { step: 'sum(1,2)', detail: '2-arg overload → 3' },
          { step: 'sum(1,2,3)', detail: '3-arg overload → 6' },
          { step: 'sum(arr)', detail: 'array overload → 6' },
        ],
        approach: [
          'Same method name, different parameter lists (types or arity).',
          'Compiler picks the overload from the call site arguments.',
          'Return type alone cannot distinguish overloads.',
          'Python has no true overloading — use *args / defaults or distinct names.',
        ],
        time: 'O(k) where k is the operand count',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

int sum(int a, int b) { return a + b; }
int sum(int a, int b, int c) { return a + b + c; }
int sum(const vector<int>& v) {
    int s = 0;
    for (int x : v) s += x;
    return s;
}

int main() {
    cout << sum(1, 2) << " ";
    cout << sum(1, 2, 3) << " ";
    cout << sum({1, 2, 3}); // 3 6 6
    return 0;
}`,
          java: `public class Main {
    static int sum(int a, int b) { return a + b; }
    static int sum(int a, int b, int c) { return a + b + c; }
    static int sum(int[] v) {
        int s = 0;
        for (int x : v) s += x;
        return s;
    }

    public static void main(String[] args) {
        System.out.print(sum(1, 2) + " ");
        System.out.print(sum(1, 2, 3) + " ");
        System.out.print(sum(new int[]{1, 2, 3})); // 3 6 6
    }
}`,
          python: `def sum(*args):
    if len(args) == 1 and isinstance(args[0], (list, tuple)):
        return sum(args[0])
    return __builtins__["sum"](args)

# Python resolves by runtime shape (no compile-time overloading)
print(sum(1, 2), sum(1, 2, 3), sum([1, 2, 3]))  # 3 6 6`,
        },
      },
      {
        id: 'p58',
        number: 58,
        topicId: 't29',
        topicTitle: 'Method Overloading',
        title: 'Constructor Overloading (Rectangle)',
        difficulty: 'Medium',
        statement:
          'Create a Rectangle class with three constructors: no-arg (1×1), one-arg (square s×s), two-arg (w×h). Show which constructor runs for each call and the resulting dimensions.',
        inputLabel: 'Rectangle(), Rectangle(5), Rectangle(2,3)',
        outputLabel: '1×1 · 5×5 · 2×3',
        hint: 'Different parameter counts/types select different constructors at compile time.',
        diagram: 'overload',
        trace: [
          { step: 'Rectangle()', detail: '0-arg → 1×1' },
          { step: 'Rectangle(5)', detail: '1-arg → 5×5' },
          { step: 'Rectangle(2,3)', detail: '2-arg → 2×3' },
        ],
        approach: [
          'Write multiple constructors with distinct signatures.',
          'Chain them with this(...)/: delegation to avoid duplicated init.',
          'Overloading is compile-time; chosen from the new(...) arguments.',
        ],
        time: 'O(1) per construction',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

struct Rectangle {
    int w, h;
    Rectangle() : w(1), h(1) {}
    explicit Rectangle(int s) : w(s), h(s) {}
    Rectangle(int w, int h) : w(w), h(h) {}
    string dims() const { return to_string(w) + "x" + to_string(h); }
};

int main() {
    Rectangle a, b(5), c(2, 3);
    cout << a.dims() << " " << b.dims() << " " << c.dims();
    // 1x1 5x5 2x3
    return 0;
}`,
          java: `public class Main {
    static class Rectangle {
        final int w, h;
        Rectangle() { this(1, 1); }
        Rectangle(int s) { this(s, s); }
        Rectangle(int w, int h) { this.w = w; this.h = h; }
        String dims() { return w + "x" + h; }
    }

    public static void main(String[] args) {
        Rectangle a = new Rectangle();
        Rectangle b = new Rectangle(5);
        Rectangle c = new Rectangle(2, 3);
        System.out.println(a.dims() + " " + b.dims() + " " + c.dims());
        // 1x1 5x5 2x3
    }
}`,
          python: `class Rectangle:
    def __init__(self, *args):
        if len(args) == 0:
            self.w = self.h = 1
        elif len(args) == 1:
            self.w = self.h = args[0]
        else:
            self.w, self.h = args
    def dims(self):
        return f"{self.w}x{self.h}"

# Emulated overloading via *args (Python has no true constructor overloads)
print(Rectangle().dims(), Rectangle(5).dims(), Rectangle(2, 3).dims())
# 1x1 5x5 2x3`,
        },
      },
    ],
  },
  {
    id: 't30',
    index: 30,
    hours: 'Hours 11–12',
    hoursTitle: 'OOPs Concepts',
    title: 'Inheritance',
    subtitle: 'is-a reuse from base to derived',
    problems: [
      {
        id: 'p59',
        number: 59,
        topicId: 't30',
        topicTitle: 'Inheritance',
        title: 'Animal → Dog (is-a reuse)',
        difficulty: 'Easy',
        statement:
          'Create an Animal base with a name field and eat(). Derive Dog that still uses eat() and adds fetch(). Instantiate Dog and call both methods.',
        inputLabel: 'Dog("Rex") → eat(), fetch()',
        outputLabel: 'Rex eats · Rex fetches',
        hint: 'Derived classes inherit members; add new behavior without editing the base.',
        diagram: 'inherit',
        trace: [
          { step: 'new Dog("Rex")', detail: 'base fields constructed' },
          { step: 'eat()', detail: 'inherited from Animal' },
          { step: 'fetch()', detail: 'new in Dog' },
        ],
        approach: [
          'Base holds shared state and behavior (name, eat).',
          'Derived declares is-a with Dog : Animal / extends Animal.',
          'Dog gets everything in Animal plus its own members.',
          'Override only when the behavior must differ.',
        ],
        time: 'O(1) per call',
        space: 'O(1) per object',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

struct Animal {
    string name;
    explicit Animal(string n) : name(n) {}
    void eat() const { cout << name << " eats"; }
};

struct Dog : Animal {
    explicit Dog(string n) : Animal(n) {}
    void fetch() const { cout << " · " << name << " fetches"; }
};

int main() {
    Dog rex("Rex");
    rex.eat();
    rex.fetch(); // Rex eats · Rex fetches
    return 0;
}`,
          java: `public class Main {
    static class Animal {
        final String name;
        Animal(String name) { this.name = name; }
        void eat() { System.out.print(name + " eats"); }
    }

    static class Dog extends Animal {
        Dog(String name) { super(name); }
        void fetch() { System.out.print(" · " + name + " fetches"); }
    }

    public static void main(String[] args) {
        Dog rex = new Dog("Rex");
        rex.eat();
        rex.fetch(); // Rex eats · Rex fetches
    }
}`,
          python: `class Animal:
    def __init__(self, name):
        self.name = name
    def eat(self):
        print(self.name, "eats", end="")

class Dog(Animal):
    def fetch(self):
        print(" ·", self.name, "fetches", end="")

rex = Dog("Rex")
rex.eat()
rex.fetch()  # Rex eats · Rex fetches`,
        },
      },
      {
        id: 'p60',
        number: 60,
        topicId: 't30',
        topicTitle: 'Inheritance',
        title: 'Multilevel Chain + Constructor Order',
        difficulty: 'Medium',
        statement:
          'Build a chain Vehicle → Car → ElectricCar. Each constructor prints a message after chaining to its parent. Show the order of constructor calls when creating an ElectricCar.',
        inputLabel: 'new ElectricCar()',
        outputLabel: 'Vehicle() → Car() → ElectricCar()',
        note: 'Base subobject always constructs first.',
        hint: 'Java: super() runs first · C++: base subobject builds before members.',
        diagram: 'inherit',
        trace: [
          { step: 'ElectricCar()', detail: 'asks for Car() first' },
          { step: 'Car()', detail: 'asks for Vehicle() first' },
          { step: 'Vehicle()', detail: 'prints · returns up' },
          { step: 'Car body', detail: 'prints · returns up' },
          { step: 'ElectricCar body', detail: 'prints last' },
        ],
        approach: [
          'Each constructor implicitly or explicitly chains to the parent.',
          'Order is always root → … → leaf (outside-in).',
          'In Java, the implicit super() is the first statement if omitted.',
          'In C++, the base class initializer list runs before member initializers.',
        ],
        time: 'O(depth) construction',
        space: 'O(depth) call stack during init',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

struct Vehicle {
    Vehicle() { cout << "Vehicle() "; }
    virtual ~Vehicle() = default;
};

struct Car : Vehicle {
    Car() { cout << "Car() "; }
};

struct ElectricCar : Car {
    ElectricCar() { cout << "ElectricCar()"; }
};

int main() {
    ElectricCar e;
    // Vehicle() Car() ElectricCar()
    return 0;
}`,
          java: `public class Main {
    static class Vehicle {
        Vehicle() { System.out.print("Vehicle() "); }
    }
    static class Car extends Vehicle {
        Car() { System.out.print("Car() "); }
    }
    static class ElectricCar extends Car {
        ElectricCar() { System.out.print("ElectricCar()"); }
    }

    public static void main(String[] args) {
        new ElectricCar(); // Vehicle() Car() ElectricCar()
    }
}`,
          python: `class Vehicle:
    def __init__(self):
        print("Vehicle()", end=" ")

class Car(Vehicle):
    def __init__(self):
        super().__init__()
        print("Car()", end=" ")

class ElectricCar(Car):
    def __init__(self):
        super().__init__()
        print("ElectricCar()", end="")

ElectricCar()  # Vehicle() Car() ElectricCar()`,
        },
      },
    ],
  },
  {
    id: 't31',
    index: 31,
    hours: 'Hours 11–12',
    hoursTitle: 'OOPs Concepts',
    title: 'Method Overriding',
    subtitle: 'Same signature, new behavior — runtime',
    problems: [
      {
        id: 'p61',
        number: 61,
        topicId: 't31',
        topicTitle: 'Method Overriding',
        title: 'Override speak() with Dynamic Dispatch',
        difficulty: 'Easy',
        statement:
          'Define Animal.speak() that returns a generic sound. Override it in Cat to return "Meow". Call speak() on an Animal-typed reference pointing to a Cat and show which version runs.',
        inputLabel: 'Animal a = new Cat(); a.speak()',
        outputLabel: 'Meow',
        note: 'Overriding is chosen at runtime from the object type, not the reference type.',
        hint: 'Identical signature + non-static → the runtime type picks the method.',
        diagram: 'override',
        trace: [
          { step: 'ref type', detail: 'Animal a' },
          { step: 'object type', detail: 'Cat' },
          { step: 'a.speak()', detail: 'dispatch → Cat.speak → Meow' },
        ],
        approach: [
          'Child declares the same signature (return type compatible).',
          'In C++ mark the base method virtual; in Java override is implicit.',
          'Call through a base reference → runtime type decides (dynamic dispatch).',
          'Overload differs: different signature, chosen at compile time.',
        ],
        time: 'O(1)',
        space: 'O(1)',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

struct Animal {
    virtual string speak() const { return "..."; }
    virtual ~Animal() = default;
};

struct Cat : Animal {
    string speak() const override { return "Meow"; }
};

int main() {
    Animal* a = new Cat();
    cout << a->speak(); // Meow
    delete a;
    return 0;
}`,
          java: `public class Main {
    static class Animal {
        String speak() { return "..."; }
    }
    static class Cat extends Animal {
        @Override
        String speak() { return "Meow"; }
    }

    public static void main(String[] args) {
        Animal a = new Cat();
        System.out.println(a.speak()); // Meow
    }
}`,
          python: `class Animal:
    def speak(self):
        return "..."

class Cat(Animal):
    def speak(self):
        return "Meow"

a = Cat()
print(a.speak())  # Meow (methods always dispatch on the object type)`,
        },
      },
      {
        id: 'p62',
        number: 62,
        topicId: 't31',
        topicTitle: 'Method Overriding',
        title: 'Override with super — Extend, Don’t Replace',
        difficulty: 'Medium',
        statement:
          'Dog overrides speak() but first calls the parent version with super, then appends " Woof". Show the combined output when speak() is invoked on a Dog held as an Animal.',
        inputLabel: 'Animal a = new Dog(); a.speak()',
        outputLabel: '... Woof',
        note: 'Without super, the base behavior would be fully replaced.',
        hint: 'super.method() runs the parent implementation; then add your extension.',
        diagram: 'override',
        trace: [
          { step: 'a.speak()', detail: 'runtime type Dog' },
          { step: 'super.speak()', detail: 'returns "…"' },
          { step: 'append', detail: '"… Woof"' },
        ],
        approach: [
          'Override with the exact same signature.',
          'Call super.speak() to reuse base logic instead of copying it.',
          'Concatenate or post-process the parent result.',
          'Return the combined string — base behavior preserved and extended.',
        ],
        time: 'O(1)',
        space: 'O(1) output',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

struct Animal {
    virtual string speak() const { return "..."; }
    virtual ~Animal() = default;
};

struct Dog : Animal {
    string speak() const override {
        return Animal::speak() + " Woof";
    }
};

int main() {
    Animal* a = new Dog();
    cout << a->speak(); // ... Woof
    delete a;
    return 0;
}`,
          java: `public class Main {
    static class Animal {
        String speak() { return "..."; }
    }
    static class Dog extends Animal {
        @Override
        String speak() { return super.speak() + " Woof"; }
    }

    public static void main(String[] args) {
        Animal a = new Dog();
        System.out.println(a.speak()); // ... Woof
    }
}`,
          python: `class Animal:
    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return super().speak() + " Woof"

a = Dog()
print(a.speak())  # ... Woof`,
        },
      },
    ],
  },
  {
    id: 't32',
    index: 32,
    hours: 'Hours 11–12',
    hoursTitle: 'OOPs Concepts',
    title: 'Common Mistakes and Optimization',
    subtitle: 'What interviewers watch for',
    problems: [
      {
        id: 'p63',
        number: 63,
        topicId: 't32',
        topicTitle: 'Common Mistakes and Optimization',
        title: 'Spot the OOP Bugs',
        difficulty: 'Medium',
        statement:
          'A draft class design has four flaws: (1) balance is a public mutable field, (2) withdraw in a subclass uses a different signature so it overloads instead of overrides, (3) the subclass constructor forgets to call super, (4) getTeam() returns the internal mutable list. Identify each fix.',
        inputLabel: '4 known flaws',
        outputLabel: '4 fixes',
        hint: 'Write each fix as the concrete change you would make in review.',
        diagram: 'oops-mistakes',
        trace: [
          { step: 'public field', detail: '→ private + getter/validated setter' },
          { step: 'wrong signature', detail: '→ same params/return · @Override / virtual' },
          { step: 'missing super()', detail: '→ chain base constructor first' },
          { step: 'leaks list', detail: '→ return unmodifiable copy / defensive copy' },
        ],
        approach: [
          'Private state + methods (encapsulation) — never public mutable fields.',
          'Overriding requires the identical signature; mismatches silently overload.',
          'Always chain to a base constructor (super/this) before body runs.',
          'Do not expose internal collections — return copies or unmodifiable views.',
        ],
        time: 'review-only',
        space: 'n/a',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

class Account {
    double balance = 0;                 // fix 1: was public
public:
    bool withdraw(double amt) {         // exact signature to override
        if (amt > balance) return false;
        balance -= amt;
        return true;
    }
    double getBalance() const { return balance; }
};

class SafeAccount : public Account {
public:
    SafeAccount() : Account() {}        // fix 3: explicit base call
    bool withdraw(double amt) override { // fix 2: same signature + override
        return Account::withdraw(min(amt, 1000.0));
    }
};

int main() {
    SafeAccount a;
    cout << (a.withdraw(-1) ? "ok" : "no"); // no (validated)
    return 0;
}`,
          java: `public class Main {
    static class Account {
        private double balance = 0;          // fix 1
        boolean withdraw(double amt) {       // signature to override
            if (amt > balance) return false;
            balance -= amt;
            return true;
        }
        double getBalance() { return balance; }
    }

    static class SafeAccount extends Account {
        SafeAccount() { super(); }           // fix 3
        @Override
        boolean withdraw(double amt) {       // fix 2: exact override
            return super.withdraw(Math.min(amt, 1000));
        }
    }

    static class Team {
        private final java.util.List<String> members =
            new java.util.ArrayList<>();
        java.util.List<String> getMembers() { // fix 4
            return java.util.Collections.unmodifiableList(members);
        }
    }

    public static void main(String[] args) {
        SafeAccount a = new SafeAccount();
        System.out.println(a.withdraw(-1)); // false
    }
}`,
          python: `class Account:
    def __init__(self):
        self.__balance = 0          # fix 1: name-mangled private
    def withdraw(self, amt):        # exact signature to override
        if amt > self.__balance:
            return False
        self.__balance -= amt
        return True
    def get_balance(self):
        return self.__balance

class SafeAccount(Account):
    def __init__(self):
        super().__init__()          # fix 3: explicit chain
    def withdraw(self, amt):        # fix 2: same signature = override
        return super().withdraw(min(amt, 1000))

class Team:
    def __init__(self):
        self.__members = []
    def get_members(self):          # fix 4: defensive copy
        return list(self.__members)

a = SafeAccount()
print(a.withdraw(-1))  # False`,
        },
      },
      {
        id: 'p64',
        number: 64,
        topicId: 't32',
        topicTitle: 'Common Mistakes and Optimization',
        title: 'Composition over Inheritance + Reuse',
        difficulty: 'Medium',
        statement:
          'Model a team where a manager leads employees. Show why composition (Manager has-a List<Employee>) fits better than extending Employee, and implement the composition version that counts members.',
        inputLabel: 'Manager("Ada") with team [E1, E2]',
        outputLabel: 'Ada manages 2',
        note: 'Inheritance = is-a. Leading people is has-a, not is-a.',
        hint: 'Hold collaborators as fields (composition) when the relationship is not strictly is-a.',
        diagram: 'oops-mistakes',
        trace: [
          { step: 'inherit?', detail: 'Manager is not an Employee → wrong tree' },
          { step: 'compose', detail: 'Manager holds List<Employee> team' },
          { step: 'add E1, E2', detail: 'team grows' },
          { step: 'count', detail: 'Ada manages 2' },
        ],
        approach: [
          'Reserve extends for true is-a with substitutability.',
          'Use a field (has-a) for collaboration — teams, loggers, formatters.',
          'Keep heavy helpers as shared instances instead of new-per-call.',
          'Prefer immutable collaborators; return copies from getters.',
        ],
        time: 'O(1) add · O(1) count',
        space: 'O(m) team size',
        answers: {
          cpp: `#include <bits/stdc++.h>
using namespace std;

struct Employee {
    string name;
    explicit Employee(string n) : name(n) {}
};

struct Manager {
    string name;
    vector<Employee> team;
    Manager(string n) : name(n) {}
    void add(const Employee& e) { team.push_back(e); }
    void report() const {
        cout << name << " manages " << team.size();
    }
};

int main() {
    Manager m("Ada");
    m.add(Employee("E1"));
    m.add(Employee("E2"));
    m.report(); // Ada manages 2
    return 0;
}`,
          java: `public class Main {
    static class Employee {
        final String name;
        Employee(String name) { this.name = name; }
    }

    static class Manager {                 // composition, not extends
        final String name;
        private final java.util.List<Employee> team = new java.util.ArrayList<>();
        Manager(String name) { this.name = name; }
        void add(Employee e) { team.add(e); }
        void report() { System.out.println(name + " manages " + team.size()); }
    }

    public static void main(String[] args) {
        Manager m = new Manager("Ada");
        m.add(new Employee("E1"));
        m.add(new Employee("E2"));
        m.report(); // Ada manages 2
    }
}`,
          python: `class Employee:
    def __init__(self, name):
        self.name = name

class Manager:                      # composition, not inheritance
    def __init__(self, name):
        self.name = name
        self.team = []              # has-a
    def add(self, e):
        self.team.append(e)
    def report(self):
        print(f"{self.name} manages {len(self.team)}")

m = Manager("Ada")
m.add(Employee("E1"))
m.add(Employee("E2"))
m.report()  # Ada manages 2`,
        },
      },
    ],
  },
  {
    id: 't33',
    index: 33,
    hours: 'Hours 13–14',
    hoursTitle: 'SQL Essentials',
    title: 'Filtering & Sorting',
    subtitle: 'WHERE, ORDER BY, LIMIT, and CASE',
    problems: [
      {
        id: 'p65',
        number: 65,
        topicId: 't33',
        topicTitle: 'Filtering & Sorting',
        title: 'Filter and Sort Top Earners',
        difficulty: 'Easy',
        statement:
          'From employees, return name and salary for people earning more than 60000, ordered by salary highest first, limited to the top 3 rows.',
        inputLabel: 'WHERE salary > 60000 · ORDER BY salary DESC · LIMIT 3',
        outputLabel: 'Ada 90000 · Cy 70000 · Bob 55000*',
        note: '*only rows meeting the filter; LIMIT 3 keeps the first 3 after sort.',
        hint: 'Filter first (WHERE), sort next (ORDER BY), cut last (LIMIT).',
        diagram: 'sql-filter',
        trace: [
          { step: 'WHERE', detail: 'salary > 60000 → Ada, Cy' },
          { step: 'ORDER BY', detail: 'DESC → Ada, Cy' },
          { step: 'LIMIT 3', detail: 'only 2 rows survive · return both' },
        ],
        approach: [
          'SQL logical order: FROM → WHERE → SELECT → ORDER BY → LIMIT.',
          'WHERE filters rows before ordering (use column names, not aliases).',
          'ORDER BY salary DESC puts highest first; ASC is default.',
          'LIMIT n caps the result after sorting.',
        ],
        time: 'O(n log n) sort · O(n) with index',
        space: 'O(result) + sort buffer',
        answers: {
          sql: `-- employees(id, name, dept_id, salary)
SELECT name, salary
FROM employees
WHERE salary > 60000
ORDER BY salary DESC
LIMIT 3;`,
        },
      },
      {
        id: 'p66',
        number: 66,
        topicId: 't33',
        topicTitle: 'Filtering & Sorting',
        title: 'CASE Expressions for Labels',
        difficulty: 'Easy',
        statement:
          'For every employee, return name and a band label: Senior if salary >= 80000, Mid if salary >= 50000, otherwise Junior. Order by name.',
        inputLabel: 'CASE on salary thresholds',
        outputLabel: 'Ada Senior · Bob Mid · Cy Mid',
        hint: 'CASE evaluates top to bottom — put the strictest branch first.',
        diagram: 'sql-filter',
        trace: [
          { step: 'Ada 90000', detail: '≥ 80000 → Senior' },
          { step: 'Bob 55000', detail: '≥ 50000 → Mid' },
          { step: 'Cy 70000', detail: '≥ 50000 → Mid' },
        ],
        approach: [
          'CASE is SQL’s if/else inside expressions (SELECT, ORDER BY, etc.).',
          'Branches are checked in order; first true wins.',
          'End with ELSE for the fallback and END to close.',
          'Alias the result (AS band) for a clean column name.',
        ],
        time: 'O(n)',
        space: 'O(1) extra',
        answers: {
          sql: `SELECT name,
  CASE
    WHEN salary >= 80000 THEN 'Senior'
    WHEN salary >= 50000 THEN 'Mid'
    ELSE 'Junior'
  END AS band
FROM employees
ORDER BY name;`,
        },
      },
    ],
  },
  {
    id: 't34',
    index: 34,
    hours: 'Hours 13–14',
    hoursTitle: 'SQL Essentials',
    title: 'JOINs',
    subtitle: 'Combine tables on a key — INNER vs OUTER',
    problems: [
      {
        id: 'p67',
        number: 67,
        topicId: 't34',
        topicTitle: 'JOINs',
        title: 'INNER JOIN Employees to Departments',
        difficulty: 'Easy',
        statement:
          'List each employee name together with their department name. Keep only rows where both sides match (the employee has a department).',
        inputLabel: 'employees ⋈ departments ON dept_id = id',
        outputLabel: 'Ada–Engineering · Bob–Engineering · Cy–Sales',
        hint: 'JOIN ... ON equates the foreign key to the primary key.',
        diagram: 'sql-join',
        trace: [
          { step: 'Ada, dept 1', detail: 'matches Engineering' },
          { step: 'Bob, dept 1', detail: 'matches Engineering' },
          { step: 'Cy, dept 2', detail: 'matches Sales' },
          { step: 'HR', detail: 'no employees · INNER drops it' },
        ],
        approach: [
          'INNER JOIN keeps only rows with a match on both tables.',
          'ON uses equality: e.dept_id = d.id.',
          'Alias tables (e, d) for shorter, clearer SQL.',
          'Need unmatched rows? Use LEFT/RIGHT JOIN instead.',
        ],
        time: 'O(n + m) hash join · O(n log n) sort-merge',
        space: 'O(min(n, m)) for hash table',
        answers: {
          sql: `-- employees(id, name, dept_id, salary)
-- departments(id, name)
SELECT e.name AS employee, d.name AS department
FROM employees e
INNER JOIN departments d
  ON d.id = e.dept_id
ORDER BY e.name;`,
        },
      },
      {
        id: 'p68',
        number: 68,
        topicId: 't34',
        topicTitle: 'JOINs',
        title: 'LEFT JOIN — Rows With No Match',
        difficulty: 'Medium',
        statement:
          'Return every department name that has zero employees. Use a LEFT JOIN so departments without employees still appear.',
        inputLabel: 'departments LEFT JOIN employees WHERE e.id IS NULL',
        outputLabel: 'HR',
        note: 'Inner join would drop HR entirely.',
        hint: 'LEFT JOIN keeps all left rows; filter where the right side is NULL.',
        diagram: 'sql-join',
        trace: [
          { step: 'LEFT JOIN', detail: 'all departments kept' },
          { step: 'Engineering', detail: 'has employees · e.id ≠ NULL' },
          { step: 'HR', detail: 'no match · e.id IS NULL ✓' },
        ],
        approach: [
          'FROM departments LEFT JOIN employees: every department row survives.',
          'Rows with no employees get NULLs on the right columns.',
          'WHERE e.id IS NULL keeps only the unmatched departments.',
          'Do not put that filter in the ON clause of an inner-style condition.',
        ],
        time: 'O(n + m)',
        space: 'O(n)',
        answers: {
          sql: `SELECT d.name AS department
FROM departments d
LEFT JOIN employees e
  ON e.dept_id = d.id
WHERE e.id IS NULL;`,
        },
      },
    ],
  },
  {
    id: 't35',
    index: 35,
    hours: 'Hours 13–14',
    hoursTitle: 'SQL Essentials',
    title: 'GROUP BY & Aggregates',
    subtitle: 'COUNT, SUM, AVG with HAVING',
    problems: [
      {
        id: 'p69',
        number: 69,
        topicId: 't35',
        topicTitle: 'GROUP BY & Aggregates',
        title: 'Average Salary Per Department (HAVING)',
        difficulty: 'Medium',
        statement:
          'Compute the average salary per department. Return only departments whose average exceeds 60000, sorted by average descending.',
        inputLabel: 'GROUP BY d.name · HAVING AVG(salary) > 60000',
        outputLabel: 'Engineering 72500 · Sales 70000',
        hint: 'WHERE filters rows; HAVING filters groups after aggregation.',
        diagram: 'sql-group',
        trace: [
          { step: 'group', detail: 'Engineering [90000, 55000] · Sales [70000]' },
          { step: 'AVG', detail: '72500 · 70000' },
          { step: 'HAVING', detail: 'both > 60000 · keep' },
          { step: 'ORDER BY', detail: '72500 first' },
        ],
        approach: [
          'Aggregate with AVG/COUNT/SUM after GROUP BY splits the rows.',
          'HAVING applies a condition on the aggregate result.',
          'Non-aggregated SELECT columns must appear in GROUP BY.',
          'WHERE (pre-filter rows) runs before grouping; HAVING after.',
        ],
        time: 'O(n) scan · O(g log g) to sort groups',
        space: 'O(g) hash of groups',
        answers: {
          sql: `SELECT d.name AS department,
       ROUND(AVG(e.salary), 2) AS avg_salary
FROM employees e
JOIN departments d ON d.id = e.dept_id
GROUP BY d.name
HAVING AVG(e.salary) > 60000
ORDER BY avg_salary DESC;`,
        },
      },
      {
        id: 'p70',
        number: 70,
        topicId: 't35',
        topicTitle: 'GROUP BY & Aggregates',
        title: 'Order Count and Revenue Per Customer',
        difficulty: 'Medium',
        statement:
          'Using customers and orders, return each customer’s name, number of orders, and total amount spent. Include customers with zero orders (show 0 and 0).',
        inputLabel: 'LEFT JOIN · GROUP BY customer · COUNT + SUM',
        outputLabel: 'Ann 2 350 · Ben 1 400 · Cal 0 0',
        hint: 'LEFT JOIN + COALESCE so missing orders become 0, not NULL.',
        diagram: 'sql-group',
        trace: [
          { step: 'Ann', detail: 'orders 200 + 150 → count 2, sum 350' },
          { step: 'Ben', detail: 'order 400 → count 1, sum 400' },
          { step: 'Cal', detail: 'no rows · LEFT JOIN gives NULLs' },
          { step: 'COALESCE', detail: 'NULL → 0 · 0' },
        ],
        approach: [
          'LEFT JOIN orders so customers without orders are kept.',
          'GROUP BY customer id/name aggregates their rows.',
          'COUNT(o.id) counts matches only (NULLs skipped); SUM needs COALESCE.',
          'Non-aggregated columns must be in the GROUP BY clause.',
        ],
        time: 'O(n + m)',
        space: 'O(customers)',
        answers: {
          sql: `-- customers(id, name)
-- orders(id, customer_id, amount, order_date)
SELECT c.name,
       COUNT(o.id) AS orders,
       COALESCE(SUM(o.amount), 0) AS total
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
GROUP BY c.id, c.name
ORDER BY total DESC;`,
        },
      },
    ],
  },
  {
    id: 't36',
    index: 36,
    hours: 'Hours 13–14',
    hoursTitle: 'SQL Essentials',
    title: 'Subqueries & EXISTS',
    subtitle: 'Queries inside queries',
    problems: [
      {
        id: 'p71',
        number: 71,
        topicId: 't36',
        topicTitle: 'Subqueries & EXISTS',
        title: 'Second Highest Salary',
        difficulty: 'Medium',
        statement:
          'Return the second-highest distinct salary from employees. If there is none, the result should be NULL.',
        inputLabel: 'MAX(salary) WHERE salary < MAX(salary)',
        outputLabel: '70000',
        note: 'Top salary 90000; next distinct is 70000.',
        hint: 'Take MAX over all salaries strictly below the overall maximum.',
        diagram: 'sql-subquery',
        trace: [
          { step: 'inner', detail: 'MAX(salary) = 90000' },
          { step: 'outer WHERE', detail: 'salary < 90000 → 55000, 70000' },
          { step: 'outer MAX', detail: '70000' },
        ],
        approach: [
          'Scalar subquery: inner query returns one value for the outer WHERE.',
          'MAX(salary) where salary < overall MAX skips the top value.',
          'DENSE_RANK() OVER (ORDER BY salary DESC) = 2 is the window variant.',
          'LIMIT 1 OFFSET 1 after DISTINCT + ORDER BY is another portable form.',
        ],
        time: 'Two scans · O(n)',
        space: 'O(1) scalar subquery',
        answers: {
          sql: `SELECT MAX(salary) AS second_highest
FROM employees
WHERE salary < (SELECT MAX(salary) FROM employees);`,
        },
      },
      {
        id: 'p72',
        number: 72,
        topicId: 't36',
        topicTitle: 'Subqueries & EXISTS',
        title: 'EXISTS — Customers With Orders',
        difficulty: 'Medium',
        statement:
          'Return the names of customers who have placed at least one order. Use EXISTS (not just JOIN) to show correlated-subquery style.',
        inputLabel: 'WHERE EXISTS (SELECT ... ORDER BY customer)',
        outputLabel: 'Ann · Ben',
        note: 'Cal has no orders → excluded.',
        hint: 'EXISTS stops at the first matching inner row — often cheaper than IN.',
        diagram: 'sql-subquery',
        trace: [
          { step: 'Ann', detail: 'inner finds order → TRUE' },
          { step: 'Ben', detail: 'inner finds order → TRUE' },
          { step: 'Cal', detail: 'inner empty → FALSE · skip' },
        ],
        approach: [
          'Correlated EXISTS: inner query references the outer row (c.id).',
          'As soon as one matching order is found, the customer is kept.',
          'Usually better than IN when the right side is large and NULL-safe.',
          'NOT EXISTS is the anti-join for “customers with zero orders”.',
        ],
        time: 'Early-exit probe per customer · index-friendly',
        space: 'O(1) per probe',
        answers: {
          sql: `SELECT c.name
FROM customers c
WHERE EXISTS (
  SELECT 1
  FROM orders o
  WHERE o.customer_id = c.id
)
ORDER BY c.name;`,
        },
      },
    ],
  },
  {
    id: 't37',
    index: 37,
    hours: 'Hours 13–14',
    hoursTitle: 'SQL Essentials',
    title: 'Window Functions',
    subtitle: 'Ranking and running totals without collapsing rows',
    problems: [
      {
        id: 'p73',
        number: 73,
        topicId: 't37',
        topicTitle: 'Window Functions',
        title: 'RANK Salary Within Department',
        difficulty: 'Medium',
        statement:
          'For each employee, show name, department, salary, and a rank inside that department where the highest salary is rank 1 (ties share a rank).',
        inputLabel: 'RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC)',
        outputLabel: 'Ada 1 · Bob 2 · Cy 1',
        note: 'Cy is rank 1 in Sales (only earner).',
        hint: 'PARTITION BY splits the window; ORDER BY ranks inside each part.',
        diagram: 'sql-window',
        trace: [
          { step: 'PARTITION dept 1', detail: 'Ada 90k · Bob 55k' },
          { step: 'RANK within part', detail: 'Ada → 1 · Bob → 2' },
          { step: 'PARTITION dept 2', detail: 'Cy → 1' },
        ],
        approach: [
          'Window functions keep every row (no GROUP BY collapse).',
          'PARTITION BY starts a new ranking per department.',
          'ORDER BY salary DESC inside OVER decides the ranking order.',
          'RANK ties share a number and skip; DENSE_RANK does not skip; ROW_NUMBER always unique.',
        ],
        time: 'O(n log n) to sort partitions',
        space: 'O(n)',
        answers: {
          sql: `SELECT name, dept_id, salary,
  RANK() OVER (
    PARTITION BY dept_id
    ORDER BY salary DESC
  ) AS rnk
FROM employees
ORDER BY dept_id, rnk;`,
        },
      },
      {
        id: 'p74',
        number: 74,
        topicId: 't37',
        topicTitle: 'Window Functions',
        title: 'Running Total of Order Amounts',
        difficulty: 'Medium',
        statement:
          'List order_date and amount with a running total of amount ordered by date (each row sums itself and all earlier rows).',
        inputLabel: 'SUM(amount) OVER (ORDER BY order_date ...)',
        outputLabel: '200 · 350 · 750',
        hint: 'SUM() OVER (ORDER BY date ROWS UNBOUNDED PRECEDING).',
        diagram: 'sql-window',
        trace: [
          { step: '01-05 200', detail: 'running = 200' },
          { step: '01-10 150', detail: '200 + 150 = 350' },
          { step: '02-01 400', detail: '350 + 400 = 750' },
        ],
        approach: [
          'OVER (ORDER BY ...) defines an ordered window across rows.',
          'ROWS UNBOUNDED PRECEDING grows the window from the first row.',
          'Without ROWS/ RANGE, the default frame is peers-only — avoid for running totals.',
          'Also works: RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.',
        ],
        time: 'O(n log n) sort · single pass after',
        space: 'O(n)',
        answers: {
          sql: `SELECT order_date, amount,
  SUM(amount) OVER (
    ORDER BY order_date
    ROWS UNBOUNDED PRECEDING
  ) AS running_total
FROM orders
ORDER BY order_date;`,
        },
      },
    ],
  },
  {
    id: 't38',
    index: 38,
    hours: 'Hours 13–14',
    hoursTitle: 'SQL Essentials',
    title: 'Indexes & Query Optimization',
    subtitle: 'Same answer, faster plan',
    problems: [
      {
        id: 'p75',
        number: 75,
        topicId: 't38',
        topicTitle: 'Indexes & Query Optimization',
        title: 'Composite Index for Filter + Sort',
        difficulty: 'Medium',
        statement:
          'A dashboard runs WHERE dept_id = 5 ORDER BY salary DESC constantly. Design an index that serves both the filter and the sort, and note the tradeoff.',
        inputLabel: 'WHERE dept_id = 5 ORDER BY salary DESC',
        outputLabel: 'CREATE INDEX idx ON employees (dept_id, salary)',
        hint: 'Leftmost column first: equality column, then the sort column.',
        diagram: 'sql-index',
        trace: [
          { step: 'need', detail: 'seek on dept_id = 5' },
          { step: 'then', detail: 'salary already sorted in index' },
          { step: 'tradeoff', detail: 'slower INSERT/UPDATE/DELETE on the table' },
        ],
        approach: [
          'Composite index (dept_id, salary): equality column first, sort second.',
          'The engine can seek dept_id = 5 and read salary in order — no filesort.',
          'A function on the column (YEAR(date)) breaks index use — keep columns bare.',
          'Tradeoff: every write must update the index; too many indexes hurt writes.',
        ],
        time: 'O(log n) seek + matches · vs O(n log n) scan',
        space: 'Index size on disk',
        answers: {
          sql: `CREATE INDEX idx_emp_dept_salary
  ON employees (dept_id, salary);

-- Now this runs as an index range scan (no separate sort):
SELECT name, salary
FROM employees
WHERE dept_id = 5
ORDER BY salary DESC;`,
        },
      },
      {
        id: 'p76',
        number: 76,
        topicId: 't38',
        topicTitle: 'Indexes & Query Optimization',
        title: 'Sargable Rewrite — YEAR() on a Column',
        difficulty: 'Medium',
        statement:
          'The predicate WHERE YEAR(order_date) = 2024 wraps the column in a function so an index on order_date cannot be used. Rewrite it as a half-open date range and avoid SELECT *.',
        inputLabel: 'WHERE YEAR(order_date) = 2024 · SELECT *',
        outputLabel: 'order_date >= 2024-01-01 AND < 2025-01-01',
        note: 'Sargable = the optimizer can use a range/index seek.',
        hint: 'Never apply a function to the indexed column in WHERE; put bounds on the column instead.',
        diagram: 'sql-index',
        trace: [
          { step: 'old', detail: 'YEAR(order_date) = 2024 → full scan' },
          { step: 'new', detail: 'range on raw column → index seek' },
          { step: 'SELECT *', detail: 'list only needed columns (covering)' },
        ],
        approach: [
          'Half-open range: >= start AND < next-year start (midnight-safe).',
          'Column stays bare so a normal B-tree on order_date is usable.',
          'Select only required columns; a covering index avoids table lookups.',
          'Same idea: avoid leading-wildcard LIKE, implicit casts, and OR-heavy filters.',
        ],
        time: 'O(log n + k) range · was O(n) scan',
        space: 'O(1) extra',
        answers: {
          sql: `-- Slow (non-sargable):
--   SELECT * FROM orders
--   WHERE YEAR(order_date) = 2024;

-- Fast:
SELECT id, customer_id, amount
FROM orders
WHERE order_date >= '2024-01-01'
  AND order_date <  '2025-01-01'
ORDER BY order_date;`,
        },
      },
    ],
  },
]

export type Slide =
  | { kind: 'title' }
  | { kind: 'section'; hours: string; hoursTitle: string }
  | { kind: 'topic'; topic: Topic }
  | { kind: 'question'; topic: Topic; problem: Problem }
  | { kind: 'answer'; topic: Topic; problem: Problem }
  | { kind: 'patterns' }
  | { kind: 'closing' }

export const patterns = [
  {
    id: 'extrema',
    name: 'Single-pass extrema',
    when: 'Need min/max/second-best in one scan',
    example: 'Second largest, best score',
  },
  {
    id: 'identity',
    name: 'Math identity / XOR',
    when: 'Missing or paired values in a known range',
    example: 'Missing number 0..n',
  },
  {
    id: 'cycle',
    name: 'Floyd cycle detection',
    when: 'Values act as pointers; duplicate or loop exists',
    example: 'Duplicate in 1..n array',
  },
  {
    id: 'reverse',
    name: 'Reversal technique',
    when: 'In-place rotate/shift with O(1) space',
    example: 'Rotate array by K',
  },
  {
    id: 'frequency',
    name: 'Hash frequency map',
    when: '“Most / count / first unique” over a collection',
    example: 'Most frequent element, first non-repeating',
  },
  {
    id: 'two-pointer',
    name: 'Two pointers',
    when: 'Compare from both ends or shrink a window',
    example: 'Palindrome checks',
  },
  {
    id: 'count-sig',
    name: 'Character-count signature',
    when: 'Anagrams / permutations of a fixed alphabet',
    example: 'Valid anagram (26-slot array)',
  },
  {
    id: 'string-rewrite',
    name: 'Tokenize + rewrite',
    when: 'Reorder, filter, or map words/chars in a string',
    example: 'Reverse words, strip duplicates',
  },
  {
    id: 'linear-search',
    name: 'Linear scan search',
    when: 'Unsorted data; find first match or all matches',
    example: 'Linear search, first/last occurrence',
  },
  {
    id: 'comparison-sort',
    name: 'Comparison sort',
    when: 'Need ordered output; write O(n²) by hand',
    example: 'Bubble sort, selection sort',
  },
  {
    id: 'binary-search',
    name: 'Binary search (halving)',
    when: 'Sorted array; find target / boundary in O(log n)',
    example: 'Iterative search, lower bound',
  },
  {
    id: 'function-decompose',
    name: 'Function decomposition',
    when: 'Reusable logic with clear input → output',
    example: 'digitSum(n), isPalindrome(n)',
  },
  {
    id: 'recursion',
    name: 'Recursion (base + smaller)',
    when: 'Problem reduces to same problem on n-1 / n-2',
    example: 'Factorial, Fibonacci',
  },
  {
    id: 'number-theory',
    name: 'Number theory / digits',
    when: 'GCD, primality, digit sums and reversals',
    example: 'Euclidean GCD, √n prime check',
  },
  {
    id: 'hash-lookup',
    name: 'Hash lookup companion',
    when: 'Need O(1) “have I seen the complement / value?”',
    example: 'Two Sum with map, set intersection',
  },
  {
    id: 'pair-walk',
    name: 'Pair-sum two-pointer walk',
    when: 'Sorted ends meet a target sum (exact or closest)',
    example: 'Pair with sum, closest pair sum',
  },
  {
    id: 'matrix-ops',
    name: 'Matrix reshape ops',
    when: 'Transpose or rotate without a second matrix',
    example: 'Transpose, 90° clockwise rotate',
  },
  {
    id: 'matrix-stair',
    name: 'Matrix staircase search',
    when: 'Rows & columns sorted — eliminate one line per step',
    example: 'Top-right search in sorted matrix',
  },
  {
    id: 'layer-peel',
    name: 'Layer / boundary peel',
    when: 'Traverse rings, spirals, or borders',
    example: 'Spiral order traversal',
  },
  {
    id: 'running-opt',
    name: 'Running optimum (1-pass DP)',
    when: 'Best buy-so-far or best subarray ending here',
    example: 'Stock profit, Kadane max subarray',
  },
  {
    id: 'stack-queue',
    name: 'Stack & queue applications',
    when: 'Nesting, next-greater, FIFO with LIFO only',
    example: 'Next greater element, queue via stacks',
  },
  {
    id: 'balanced-delims',
    name: 'Balanced delimiters',
    when: 'Match, nest, or measure bracket sequences',
    example: 'Valid parentheses, longest valid substring',
  },
  {
    id: 'sliding-window',
    name: 'Sliding window',
    when: 'Contiguous subarray/substring under a constraint',
    example: 'Max sum size k, longest unique substring',
  },
  {
    id: 'prefix-sum',
    name: 'Prefix sum',
    when: 'Range sums or subarray-sum counts in O(1)/O(n)',
    example: 'Range query, subarray sum equals k',
  },
  {
    id: 'greedy',
    name: 'Greedy choice',
    when: 'Local optimum that never needs to backtrack',
    example: 'Assign cookies, jump game',
  },
  {
    id: 'ds-choice',
    name: 'Data structure selection',
    when: 'Access pattern decides the container',
    example: 'HashSet for membership, buckets for top-k',
  },
  {
    id: 'abstraction',
    name: 'Abstraction (hide how)',
    when: 'Clients should depend on a contract only',
    example: 'Shape.area(), Employee.bonus()',
  },
  {
    id: 'encapsulation',
    name: 'Encapsulation (guard state)',
    when: 'Invariants must hold against bad callers',
    example: 'Private balance, validated Range.set',
  },
  {
    id: 'overload-ct',
    name: 'Overloading (compile time)',
    when: 'Same name, different parameter lists',
    example: 'sum(a,b) vs sum(arr), constructors',
  },
  {
    id: 'inheritance',
    name: 'Inheritance (is-a reuse)',
    when: 'Derived truly substitutes for the base',
    example: 'Dog is an Animal · Vehicle → Car',
  },
  {
    id: 'override-rt',
    name: 'Overriding (runtime dispatch)',
    when: 'Same signature; behavior varies by type',
    example: 'Cat.speak(), super.speak() extension',
  },
  {
    id: 'oop-hygiene',
    name: 'OOP hygiene',
    when: 'Review pass: leaks, wrong signature, composition',
    example: 'Defensive copies, composition over inheritance',
  },
  {
    id: 'sql-filter',
    name: 'SQL filter & sort',
    when: 'WHERE → ORDER BY → LIMIT on one table',
    example: 'Top earners, CASE labels',
  },
  {
    id: 'sql-join',
    name: 'SQL joins',
    when: 'Combine tables; keep unmatched with OUTER',
    example: 'Employee→dept, departments with no staff',
  },
  {
    id: 'sql-groupby',
    name: 'SQL group & aggregate',
    when: 'Per-group COUNT/AVG/SUM filtered by HAVING',
    example: 'Avg salary by dept, revenue per customer',
  },
  {
    id: 'sql-subquery',
    name: 'SQL subquery / EXISTS',
    when: 'Need a scalar, set, or correlated probe',
    example: '2nd highest salary, customers with orders',
  },
  {
    id: 'sql-window',
    name: 'SQL window functions',
    when: 'Rank/running totals without collapsing rows',
    example: 'RANK per dept, SUM OVER running total',
  },
  {
    id: 'sql-index',
    name: 'SQL indexing & sargability',
    when: 'Same result must run on a hot path',
    example: 'Composite (eq, sort), half-open date ranges',
  },
] as const

export function buildSlides(): Slide[] {
  const slides: Slide[] = [{ kind: 'title' }]
  let currentHours = ''
  for (const topic of topics) {
    if (topic.hours !== currentHours) {
      currentHours = topic.hours
      slides.push({
        kind: 'section',
        hours: topic.hours,
        hoursTitle: topic.hoursTitle,
      })
    }
    slides.push({ kind: 'topic', topic })
    for (const problem of topic.problems) {
      slides.push({ kind: 'question', topic, problem })
      slides.push({ kind: 'answer', topic, problem })
    }
  }
  slides.push({ kind: 'patterns' })
  slides.push({ kind: 'closing' })
  return slides
}

export function slideLabel(slide: Slide): string {
  switch (slide.kind) {
    case 'title':
      return 'Title'
    case 'section':
      return 'Section'
    case 'topic':
      return `Topic ${slide.topic.index}`
    case 'question':
      return `Q${slide.problem.number}`
    case 'answer':
      return `A${slide.problem.number}`
    case 'patterns':
      return 'Cheat sheet'
    case 'closing':
      return 'Closing'
  }
}

export function slideTitle(slide: Slide): string {
  switch (slide.kind) {
    case 'title':
      return 'Accenture Drive Prep'
    case 'section':
      return `${slide.hours}: ${slide.hoursTitle}`
    case 'topic':
      return slide.topic.title
    case 'question':
      return slide.problem.title
    case 'answer':
      return `Solution — ${slide.problem.title}`
    case 'patterns':
      return 'Pattern cheat sheet'
    case 'closing':
      return 'You are ready'
  }
}
