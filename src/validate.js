const validateTextSimple = ({ string, length, minLength = 5 }) =>
  string.length <= length && string.length >= minLength;

const validateText = ({ string, length, minLength = 5 }) => {
  /* 
    ratio1 =  special chars / letters
    ratio2 = num words / num chars
    ratio3 = special chars / num words
    ratio4 = 
  */
  if (!string) return false;
  const isLetter = /[A-Za-záéíóúÁÉÍÓÚàèìòùÀÈÌÒÙãẽĩõũÃẼĨÕŨÑÇç0-9$£]/;
  const isVowel = /[AEIOUaeiouáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙãẽĩõũÃẼĨÕŨ]/;
  const isSpecial = /\W/;

  const lettersCount = string.split("").filter(char => isLetter.test(char))
    .length;
  const specialCount = string
    .split("")
    .filter(char => isSpecial.test(char) && !isLetter.test(char)).length;
  const wordsCount = string.split(/\s+/).length;
  const vowelCount = string.split("").filter(char => isVowel.test(char)).length;
  const consonantCount = string
    .split("")
    .filter(char => isLetter.test(char) && !isVowel.test(char)).length;

  const specialPerLetter = specialCount / lettersCount;
  const wordsPerLetter = wordsCount / lettersCount;
  const specialPerWord = specialCount / wordsCount;
  const vowelPerConsonant = vowelCount / consonantCount;

  // valid sylab

  return (
    !!string &&
    string.length <= length &&
    string.length >= minLength &&
    // (specialPerLetter <= 0.6 && specialPerLetter >= 0.1) &&
    (wordsPerLetter <= 0.6 && wordsPerLetter >= 0.05) &&
    (specialPerWord <= 1.5 && specialPerWord >= 0.05) &&
    (vowelPerConsonant <= 2 && vowelPerConsonant >= 0.05) &&
    (vowelCount && wordsCount > 1)
  );
};

const validateLink = ({ string, length, minLength = 5 }) => {
  // "sms:/* phone number here */;body=/* body text here */"
  // whatsapp://send?abid=Alex&text=Test
  return (
    /^(sms|tel|mail|https|whatsapp):\/\/[^ "]+$/.test(string) &&
    string.length <= length &&
    string.length >= minLength
  );
};

const transformTitle = text => text.toUpperCase().substr(0, 50);

const specialWords = ["clt", "pj", "js", "r$"];

const titleCase = word => `${word[0].toUpperCase()}${word.substr(1)}`;

const transformText = text =>
  text
    .replace(/\s+/g, " ")
    .split(" ")
    .map((word, index) => {
      if (!word) return "";
      if (word.length > 3) return titleCase(word);
      const special = specialWords.indexOf(word.toLowerCase()) !== -1;
      if (special) return word.toUpperCase();
      if (!index) return titleCase(word);
      return word;
    })
    .join(" ")
    .substr(0, 100);

export { transformText, validateText, validateLink, transformTitle };
