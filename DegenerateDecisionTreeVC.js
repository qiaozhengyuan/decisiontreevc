let choices = [];
let trees = [];

function check(d, N, td) {
    console.log("d" + d + ",N" + N + ",td" + td);
    let treedepth = td;
    let points = Math.pow(2, d);
    let labels = Math.pow(2, N);
    nextNum(N, 0, points, []);
    gettree(d, treedepth, [], new Set());

    let nShattered = false;

    console.log("total: " + choices.length);

    for (let c = 0; c < choices.length; c++) {
        if (c % 10000 === 0) {
            console.log(c / 10000);
        }
        let shattered = true;
        for (let l = 0; l < labels; l++) {
            if (!treecheck(d, choices[c], l)) {
                shattered = false;
                break;
            }
        }
        if (shattered) {
            nShattered = true;
            console.log("Shattered point: " + choices[c]);
            break;
        }
    }

    if (nShattered) {
        console.log(N + " shattered!");
    } else {
        console.log(N + " NOT shattered!");
    }
    return nShattered;
}

function check_iter(d, N, td) {
    console.log("Input dimension:" + d + ",Number of points:" + N + ",Tree depth:" + td);
    let treedepth = td;
    let points = Math.pow(2, d);
    let labels = Math.pow(2, N);
    gettree(d, treedepth, [], new Set());

    let nShattered = false;

    let choiceIter = nextChoice(N, 0, points, []);

    let c = 0;
    for (let choice of choiceIter) {
        //console.log(choice);
        c++;
        if (c % 10000 === 0) {
            console.log("Check time:" + new Date());
            console.log(c / 10000);
        }
        let shattered = true;
        for (let l = 0; l < labels; l++) {
            if (!treecheck(d, choice, l)) {
                shattered = false;
                break;
            }
        }
        if (shattered) {
            nShattered = true;
            console.log("Shattered point: " + choice);
            break;
        }
    }

    if (nShattered) {
        console.log(N + " shattered!");
    } else {
        console.log(N + " NOT shattered!");
    }
    return nShattered;
}

function* nextChoice(num, min, max, choice) {
    if (!num) {
        yield choice;
    }
    for (let i = min; i < max; i++) {
        newChoice = [...choice, i];
        yield* nextChoice(num - 1, i + 1, max, newChoice);
    }
}

function nextNum(num, min, max, choice) {
    if (!num) {
        choices.push(choice);
        return 0;
    }
    for (let i = min; i < max; i++) {
        newChoice = [...choice, i];
        nextNum(num - 1, i + 1, max, newChoice);
    }
}

function treecheck(dimension, choice, label) {
    //console.log("checking " + choice + " L:" + label);
    let l = label.toString(2).padStart(choice.length, '0');
    //console.log(l);
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
        //console.log("tree:" + tree);
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

        //console.log(toBeSeparated);
        //console.log(dshatter);

        if (dshatter) {
            let nSep = new Set();
            for (let remaining of toBeSeparated) {
                let ch = remaining.toString(2).padStart(dimension, '0');
                nSep.add(labels[ch]);
            }
            if (nSep.size <= 1) {
                shattered = true;

                //console.log("Shattered by: " + tree + " Points:" + choice + " Label:" + l);

                break;
            }
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
let VcToCheck = args[2];
console.log("Start time:" + new Date());
//check(4, 7, 4); // Dimension, VC, Tree Node Count
check_iter(InputDimension, VcToCheck, TreeInternalNode);
console.log("End time:" + new Date());

//console.log(trees);
//console.log(choices);