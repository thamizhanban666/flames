const flamer = (str1, str2) => {
  const arr = ['F', 'L', 'A', 'M', 'E', 'S'];
  const removeable = [];
    const map1 = {}
    const map2 = {}

    for (let i = 0; i < str1.length; i++)
        if (str1[i] !== ' ') {
            let char = str1[i].toLowerCase()
            if (map1[char]) map1[char] += 1;
            else map1[char] = 1;
        }
    for (let i = 0; i < str2.length; i++)
        if (str2[i] !== ' ') {
            let char = str2[i].toLowerCase()
            if (map2[char]) map2[char] += 1;
            else map2[char] = 1;
        }
        
        for (let char in map1)
            if (map2[char]) {
                while (map1[char]>0 && map2[char]>0) {
                    map1[char] -= 1;
                    map2[char] -= 1;
                }
            }
        
    
    let count = 0;
    for(let char in map1) count += map1[char]
    for(let char in map2) count += map2[char]


    let temp = [];
    const len = arr.length
    for (let i = 1; i < len; i++) {
        const removeCount = count % (len - i + 1)
        if (removeCount - 1 === -1) {
          removeable.push(arr.pop())
        }
        else {
          temp = arr.splice(0, removeCount);
          arr.push(...temp);
          removeable.push(arr.pop())
        }
  }    

  return [removeable, arr[0]];
}

export default flamer;