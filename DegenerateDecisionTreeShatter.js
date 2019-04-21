let trees = [];

function check_iter(dimension, treedepth, points) {
    console.log("Input dimension:" + dimension + ",Tree depth:" + treedepth + ",Points:" + points);
    let labels = Math.pow(2, points.length);
    gettree(dimension, treedepth, [], new Set());
    for (let l = 0; l < labels; l++) {
        let r = treecheck(dimension, points, l);
        console.log(r);
    }
}

function treecheck(dimension, choice, label) {
    //console.log(dimension + ":" + choice + ":" + label);
    let l = label.toString(2).padStart(choice.length, '0');
    let labels = {};
    for (let c = 0; c < choice.length; c++) {
        let ch = choice[c].toString(2).padStart(dimension, '0');
        if (l.length >= c + 1) {
            if (l.charAt(c) === '1') {
                labels[ch] = "trueLabel";
            } else {
                labels[ch] = "falseLabel";
            }
        } else {
            labels[ch] = "falseLabel";
        }
    }

    //console.log(labels);

    let shattered = false;
    for (let t = 0; t < trees.length; t++) {
        let tree = trees[t];
        let toBeSeparated = new Set(choice);
        let dshatter = true;
        for (let d = 0; d < tree.length; d++) {
            let nSep = new Set();
            for (let tobe of toBeSeparated) {
                let ch = tobe.toString(2).padStart(dimension, '0');
                if (ch.charAt(tree[d]) === '0') {
                    toBeSeparated.delete(tobe);
                    nSep.add(labels[ch]);
                }
            }
            if (nSep.size > 1) {
                dshatter = false;
                break;
            }
        }
        if (dshatter) {
            let nSep = new Set();
            for (let remaining of toBeSeparated) {
                let ch = remaining.toString(2).padStart(dimension, '0');
                nSep.add(labels[ch]);
            }
            if (nSep.size <= 1) {
                shattered = true;
                console.log("Shattered by: " + tree + " Points:" + choice + " Label:" + l);
            }else{
                //console.log("SShattered by: " + tree + " Points:" + choice + " Label:" + l);
            }
        }else{
            //console.log("DShattered by: " + tree + " Points:" + choice + " Label:" + l);
        }
    }
    return shattered;
}

function gettree(d, treedepth, tree, treeSet) {
    if (treedepth == 0) {
        trees.push(tree);
        return 0;
    }
    for (let i = 0; i < d; i++) {
        if (!treeSet.has(i)) {
            let newtree = [...tree, i];
            let newSet = new Set(treeSet);
            newSet.add(i);
            gettree(d, treedepth - 1, newtree, newSet);
        }
    }
}

const args = process.argv.slice(2);
let TreeInternalNode = args[0];
let InputDimension = args[1];
let points = args[2];
let p = points.split(",").map(num => parseInt(num, 10));
console.log("Start time:" + new Date());
//check(4, 7, 4); // Dimension, VC, Tree Node Count
check_iter(InputDimension, TreeInternalNode, p);
console.log("End time:" + new Date());

//console.log(trees);
//console.log(choices);