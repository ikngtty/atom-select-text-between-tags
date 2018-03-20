# select-text-between-tags
When the cursor **[I]** is as below,
```
<span> This is[I] a content. </span>
```
you type `⌘->`, and the selection **[~~]** is as below.
```
<span>[ This is a content. ]</span>
```
---
It analyzes hierarchical structure and finds immediate parent tags.  
So,
```
<div>
  <span> This is a content in span. </span>
  This is[I] a content in div.
  <span> This is a content in span. </span>
</div>
```
results in
```
<div>[
  <span> This is a content in span. </span>
  This is a content in div.
  <span> This is a content in span. </span>
]</div>
```

## Installation
```
apm install select-text-between-tags
```
