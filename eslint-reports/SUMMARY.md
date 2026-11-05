# Summary: @typescript-eslint/no-unused-vars, unused imports excluded

| Scenario | ESLint 8 total | imports in it | ESLint 8 (no imports) | ESLint 9 (no imports) | New in ESLint 9 | Gone in ESLint 9 |
|---|---|---|---|---|---|---|
| 1_part2-only | 242 | 120 | **122** | **172** | 62 | 12 |
| 2_vars-part1+part2 | 242 | 120 | **122** | **172** | 62 | 12 |
| 3_vars-part1+part2+imports | 182 | 60 | **122** | **172** | 62 | 12 |

Breakdown by kind (imports excluded):

- 1_part2-only: ESLint 8 {"function argument":117,"type/enum declaration":3,"type parameter":1,"class declaration":1}; ESLint 9 {"function argument":105,"catch parameter":62,"type/enum declaration":3,"type parameter":1,"class declaration":1}; new {"catch parameter":62}
- 2_vars-part1+part2: ESLint 8 {"function argument":117,"type/enum declaration":3,"type parameter":1,"class declaration":1}; ESLint 9 {"function argument":105,"catch parameter":62,"type/enum declaration":3,"type parameter":1,"class declaration":1}; new {"catch parameter":62}
- 3_vars-part1+part2+imports: ESLint 8 {"function argument":117,"type/enum declaration":3,"type parameter":1,"class declaration":1}; ESLint 9 {"function argument":105,"catch parameter":62,"type/enum declaration":3,"type parameter":1,"class declaration":1}; new {"catch parameter":62}
