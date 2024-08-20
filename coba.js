function rumusDempsterShafer(m1, m2){
    let conflict = 0;
    for (let key1 in m1) {
        for (let key2 in m2) {
            if (!key1.split(',').some(v => key2.split(',').includes(v))) {
                conflict += m1[key1] * m2[key2];
            }
        }
    }

    let mCombined = {};
    for (let key1 in m1) {
        for (let key2 in m2) {
            let intersection = key1.split(',').filter(v => key2.split(',').includes(v)).sort().join(',');
            if (intersection) {
                if (!mCombined[intersection]) {
                    mCombined[intersection] = 0;
                }
                mCombined[intersection] += m1[key1] * m2[key2];
            }
        }
    }

    for (let key in mCombined) {
        mCombined[key] = mCombined[key] / (1 - conflict);
    }

    return mCombined;
}

