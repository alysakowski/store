const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const deslugify = (slug: string) => {
  return slug
    .split("-")
    .map((word) => capitalize(word))
    .join(" ");
};
