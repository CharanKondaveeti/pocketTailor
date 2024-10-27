function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function femaleAvatar() {
  const seeds = ["Jude", "Jessica", "Katherine"];
  const backgroundTypes = ["gradientLinear", "solid"];
  const backgroundColors = ["cc964d", "4ba5c3", "ee948f", "904e3f", "d38abd"];
  const clothingColors = [
    "6dbb58",
    "54d7c7",
    "456dff",
    "7555ca",
    "e24553",
    "f3b63a",
    "f55d81",
  ];
  const eyesOptions = [
    "glasses",
    "happy",
    "open",
    "sleep",
    "sunglasses",
    "wink",
  ];
  const femaleHairStyles = ["longHair", "shortHair"];
  const bodyTypes = ["checkered", "rounded", "small", "squared"];

  const selectedSeed = seed || getRandomElement(seeds);
  const backgroundType = getRandomElement(backgroundTypes);
  const backgroundColor = getRandomElement(backgroundColors);
  const clothingColor = getRandomElement(clothingColors);
  const eyeStyle = getRandomElement(eyesOptions);
  const hairStyle = getRandomElement(femaleHairStyles);
  const bodyType = getRandomElement(bodyTypes);

  return `https://api.dicebear.com/9.x/personas/svg?seed=${selectedSeed}&backgroundType=${backgroundType}&backgroundColor=${backgroundColor}&clothingColor=${clothingColor}&eyes=${eyeStyle}&body=${bodyType}`;
}

export default femaleAvatar;
