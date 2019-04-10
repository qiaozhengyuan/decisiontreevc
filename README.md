# Exhaustive Seach for VC Dimension of Degenerate Univariate Decision Tree
Implementation of exhaustive search of VC dimension for degenerate univariate decision tree. The child node for each internal node is always on the left side.

# Usage
node DegenerateDecisionTreeVC.js [TreeInternalNode] [InputDimension] [VcToCheck]

# Output
It will display the points that gets shattered by the tree if it finds a combination of [VcToCheck] points that are shattered by the tree.

# Example
>node DegenerateDecisionTreeVC.js 2 2 3
>	Start time:Wed Apr 10 2019 16:54:31 GMT+0800 (Singapore Standard Time)
>	Input dimension:2,Number of points:3,Tree depth:2
>	Shattered point: 0,1,3
>	3 shattered!
>	End time:Wed Apr 10 2019 16:54:31 GMT+0800 (Singapore Standard Time)